import React from 'react'
import Header from '../Components/Header/BaseHeader'
import GenericListIndex from '../Components/Generic/ListIndex'
import { ListCompanyNotificationsGQL } from '../graphql/queries/business'
import { ChangeNotificationReadStatus } from '../graphql/mutations/business'
import moment from 'moment'
import { color } from '../Style/Color'
import { Mutation } from 'react-apollo'
import { UserContext } from '../context/UserContext'

interface IProps {
  navigation: any
  user: any
}

class NotificationScreen extends React.PureComponent<IProps> {
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <Header
          title="Notifications"
          leftIconTitle="md-arrow-back"
          leftIconType="Ionicons"
          hideRightMenu
          onPressLeftIcon={() => navigation.goBack()}
        />
      )
    }
  }

  determineListItemBorderRightColor = (element: string, actionType: string) => {
    let _element = element.replace(/\s/, '').toLowerCase(),
      _actionType = `${actionType[0].toUpperCase()}${actionType
        .substr(1)
        .toLowerCase()}`

    return color[`${_element}${_actionType}`] || color.defaultNotificationColor
  }

  parseData = (item: any) => {
    return [
      {
        firstTopText: `${item.element[0].toUpperCase()}${item.element.substr(
          1
        )} ${item.actionType.toLowerCase()}`,
        bottomLeftFirstText: item.elementData,
        bottomRightText: `${moment(item.date).calendar()}`,
        coloredBorder: true,
        borderRightColor: this.determineListItemBorderRightColor(
          item.element,
          item.actionType
        ),
        style: item.readStatus == 'unread' ? { backgroundColor: '#e1f5fe' } : {}
      }
    ]
  }

  onClickNotification = (item: any, changeStatus: (obj: any) => void) => {
    changeStatus({
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
        proxy.writeQuery({
          query: ListCompanyNotificationsGQL,
          variables: {
            after: null,
            first: 10,
            companyId: this.props.user.company.id
          },
          data
        })
      }
    })
  }

  render() {
    return (
      <Mutation
        mutation={ChangeNotificationReadStatus}
        onCompleted={res => console.log('This is ', res)}
      >
        {changeStatus => (
          <GenericListIndex
            navigation={this.props.navigation}
            graphqlQuery={ListCompanyNotificationsGQL}
            graphqlQueryResultKey="listCompanyNotifications"
            parseItemData={this.parseData}
            onItemPress={item => this.onClickNotification(item, changeStatus)}
            emptyListText={`All notifications for an Order, Invoice, Special offer, Product or Billing will be shown here. \n\nYou should start seeing notifications once they are sent.`}
            headerText="All your notifications will appear here"
            showFab={false}
          />
        )}
      </Mutation>
    )
  }
}

const _NotificationScreen: any = props => (
  <UserContext.Consumer>
    {({ user }) => <NotificationScreen {...props} user={user} />}
  </UserContext.Consumer>
)

export default _NotificationScreen
