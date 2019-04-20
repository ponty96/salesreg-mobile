import React from 'react'
import { Mutation } from 'react-apollo'

import { PushNotificationContext } from '../context/PushNotificationContext'
import notificationNavigationHandler from '../Functions/notificationNavigationHandler'
import {
  ListCompanyNotificationsGQL,
  GetUnreadCompanyNotificationsCount
} from '../graphql/queries/business'
import { ChangeNotificationReadStatus } from '../graphql/mutations/business'

interface IProps {
  data: any
  id: number
  navigation: any
  user: any
  changeStatus: (obj: any) => void
}

class PushNotificationContainer extends React.PureComponent<IProps> {
  componentDidUpdate(prevProps) {
    if (this.props.id != prevProps.id && this.props.navigation) {
      this.reduceNotificationCount(this.props.data)
      notificationNavigationHandler(
        this.props.data,
        this.props.navigation,
        'app-notification'
      )
    } else if (
      this.props.navigation != prevProps.navigation &&
      !prevProps.navigation &&
      this.props.data
    ) {
      this.reduceNotificationCount(this.props.data)
      notificationNavigationHandler(
        this.props.data,
        this.props.navigation,
        'app-notification'
      )
    }
  }

  reduceNotificationCount = item => {
    this.props.changeStatus({
      variables: { notificationId: item.id },
      optimisticResponse: {
        __typename: 'Mutation',
        changeNotificationReadStatus: {
          success: true,
          fieldErrors: [],
          __typename: 'MutationResponse',
          data: {
            id: item.id,
            __typename: 'Notification',
            readStatus: 'read'
          }
        }
      },
      update: (proxy, { data: { changeNotificationReadStatus } }) => {
        const data = proxy.readQuery({
          query: ListCompanyNotificationsGQL,
          variables: {
            after: null,
            first: 10,
            companyId: this.props.user.company.id
          }
        })
        const _unreadNotificationData = proxy.readQuery({
          query: GetUnreadCompanyNotificationsCount,
          variables: {
            companyId: this.props.user.company.id
          }
        })
        let _edges = data.listCompanyNotifications.edges.map(edge => {
          if (edge.node.id == item.id) {
            return {
              ...edge,
              node: {
                ...edge.node,
                readStatus: changeNotificationReadStatus.data.readStatus
              }
            }
          }
          return edge
        })
        data.listCompanyNotifications.edges = _edges
        _unreadNotificationData.getUnreadCompanyNotificationsCount.data.count =
          _unreadNotificationData.getUnreadCompanyNotificationsCount.data
            .count - 1
        proxy.writeQuery({
          query: ListCompanyNotificationsGQL,
          variables: {
            after: null,
            first: 10,
            companyId: this.props.user.company.id
          },
          data
        })
        proxy.writeQuery({
          query: GetUnreadCompanyNotificationsCount,
          variables: {
            companyId: this.props.user.company.id
          },
          data: _unreadNotificationData
        })
      }
    })
  }

  render() {
    return this.props.children
  }
}

const _PushNotificationContainer: any = props => {
  return (
    <Mutation
      mutation={ChangeNotificationReadStatus}
      refetchQueries={[
        {
          query: GetUnreadCompanyNotificationsCount,
          variables: {
            companyId: props.user && props.user.company && props.user.company.id
          }
        }
      ]}
      onCompleted={() => null}
    >
      {changeStatus => (
        <PushNotificationContext.Consumer>
          {({ id, data, navigation }) => (
            <PushNotificationContainer
              {...props}
              data={data}
              id={id}
              user={props.user}
              changeStatus={changeStatus}
              navigation={navigation}
            />
          )}
        </PushNotificationContext.Consumer>
      )}
    </Mutation>
  )
}

export default _PushNotificationContainer
