import React from 'react'
import { View, StyleSheet } from 'react-native'
import Header from '../Components/Header/BaseHeader'
import GenericListIndex from '../Components/Generic/ListIndex'
import {
  ListCompanyNotificationsGQL,
  GetUnreadCompanyNotificationsCount
} from '../graphql/queries/business'
import { ChangeNotificationReadStatus } from '../graphql/mutations/business'
import moment from 'moment'
import { color } from '../Style/Color'
import { Mutation } from 'react-apollo'
import { UserContext } from '../context/UserContext'
import notificationNavigationHandler from '../Functions/notificationNavigationHandler'
import Icon from '../Atom/Icon'

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
        .toLowerCase()
        .replace(/\s/, '')}`

    return color[`${_element}${_actionType}`] || color.defaultNotificationColor
  }

  getImageRenderingData = (
    element,
    actionType
  ): {
    tagIconName: string
    tagIconType: any
    tagBackgroundColor: string
    display: string
  } => {
    let data = {
      tagIconName: 'tag',
      tagIconType: 'MaterialCommunityIcons',
      tagBackgroundColor: '#3669d4',
      display: 'block'
    }
    switch (element.toLowerCase()) {
      case 'order':
        if (actionType.toLowerCase() == 'created') {
          data.tagBackgroundColor = '#3669d4'
        } else if (actionType.toLowerCase() == 'refund') {
          data.display = 'none'
        } else {
          data.tagBackgroundColor = '#0f912d'
        }
        break
      case 'invoice':
        data.tagIconName = 'receipt'
        data.tagIconType = 'MaterialIcons'
        if (actionType.toLowerCase() == 'created') {
          data.tagBackgroundColor = '#3669d4'
        } else if (actionType.toLowerCase() == 'payment') {
          data.tagBackgroundColor = '#0f922c'
        } else if (actionType.toLowerCase() == 'due') {
          data.tagBackgroundColor = '#d00202'
        }
        break
      case 'product':
        data.tagIconName = 'content-copy'
        data.tagIconType = 'MaterialCommunityIcons'
        if (actionType.toLowerCase() == 'updated') {
          data.tagBackgroundColor = '#3669d4'
        } else if (actionType.toLowerCase() == 'restocked') {
          data.tagBackgroundColor = '#fba618'
        } else if (
          actionType.toLowerCase().indexOf('needs') != -1 &&
          actionType.toLowerCase().indexOf('restock') != -1
        ) {
          data.tagBackgroundColor = '#d00300'
        }
        break
      case 'billing':
        data.tagIconName = 'cash'
        data.tagIconType = 'MaterialCommunityIcons'
        if (actionType.toLowerCase().indexOf('due') != -1) {
          data.tagBackgroundColor = '#d00202'
        } else if (
          actionType.toLowerCase().indexOf('paid') != -1 &&
          actionType.toLowerCase().indexOf('settlement') != -1
        ) {
          data.tagBackgroundColor = '#0f922c'
        }
        break
    }
    return data
  }

  renderImage = (element, actionType) => {
    let {
      tagIconName,
      tagIconType,
      tagBackgroundColor,
      display
    } = this.getImageRenderingData(element, actionType)
    return (
      <View>
        <View style={styles.imageContainer}>
          <Icon
            name="ios-notifications"
            type="Ionicons"
            style={styles.bellIcon}
          />
        </View>
        {display == 'block' && (
          <View
            style={[
              styles.tagContainer,
              { backgroundColor: tagBackgroundColor }
            ]}
          >
            <Icon
              name={tagIconName}
              type={tagIconType}
              style={styles.tagIcon}
            />
          </View>
        )}
      </View>
    )
  }

  parseData = (item: any) => {
    return [
      {
        firstTopText: `${item.element[0].toUpperCase()}${item.element.substr(
          1
        )} ${item.actionType.toLowerCase()}`,
        bottomLeftFirstText: item.message,
        topLeftTextStyle: { fontFamily: 'AvenirNext-DemiBold' },
        bottomRightText: `${moment(item.date).calendar()}`,
        style: {
          marginLeft: 20,
          backgroundColor: 'transparent',
          borderBottomColor: 'transparent'
        },
        containerStyle:
          item.readStatus == 'unread'
            ? {
                backgroundColor: '#f0f4fd',
                paddingHorizontal: 16,
                marginHorizontal: 0
              }
            : { paddingHorizontal: 16, marginHorizontal: 0 },
        icon: this.renderImage(item.element, item.actionType)
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
    notificationNavigationHandler(
      item,
      this.props.navigation,
      'fail-safe-notification'
    )
  }

  render() {
    return (
      <Mutation
        mutation={ChangeNotificationReadStatus}
        refetchQueries={[
          {
            query: GetUnreadCompanyNotificationsCount,
            variables: { companyId: this.props.user.company.id }
          }
        ]}
        onCompleted={() => null}
      >
        {changeStatus => (
          <GenericListIndex
            navigation={this.props.navigation}
            fetchPolicy="cache-and-network"
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

_NotificationScreen.navigationOptions = NotificationScreen.navigationOptions

export default _NotificationScreen

const styles = StyleSheet.create({
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#d9dde6',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bellIcon: {
    fontSize: 30,
    color: '#afb3bc'
  },
  tagContainer: {
    width: 15,
    height: 15,
    borderRadius: 10,
    position: 'absolute',
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tagIcon: {
    fontSize: 10,
    color: '#fff'
  }
})
