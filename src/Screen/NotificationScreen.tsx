import React from 'react'
import Header from '../Components/Header/BaseHeader'
import GenericListIndex from '../Components/Generic/ListIndex'
import { ListCompanySalesGQL } from '../graphql/queries/order'
import moment from 'moment'
import { color } from '../Style/Color'

interface IProps {
  navigation: any
}

const NOTIFICATIONS = {
  element: 'Order',
  actionType: 'Created',
  date: 'Tue Feb 26 2019 15:24:33 GMT+0100 (West Africa Standard Time)',
  notificationItems: [
    {
      changedTo: 'OR001',
      itemId: 'OR001',
      itemType: 'Order',
      current: 'OR002'
    }
  ]
}

export default class NotificationScreen extends React.PureComponent<IProps> {
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

  parseData = () => {
    return [
      {
        firstTopText: `${
          NOTIFICATIONS.element
        } ${NOTIFICATIONS.actionType.toLowerCase()}`,
        bottomLeftFirstText: `OR001`,
        bottomRightText: `${moment(NOTIFICATIONS.date).calendar()}`,
        coloredBorder: true,
        borderRightColor: this.determineListItemBorderRightColor(
          NOTIFICATIONS.element,
          NOTIFICATIONS.actionType
        )
      }
    ]
  }

  onClickNotification = (item: any) => {
    console.log(item)
  }

  render() {
    return (
      <GenericListIndex
        navigation={this.props.navigation}
        graphqlQuery={ListCompanySalesGQL}
        graphqlQueryResultKey="listCompanySales"
        parseItemData={this.parseData}
        onItemPress={this.onClickNotification}
        emptyListText={`All notifications for an Order, Invoice, Special offer, Product or Billing will be shown here. \n\nYou should start seeing notifications once they are sent.`}
        headerText="All your notifications will appear here"
        showFab={false}
      />
    )
  }
}
