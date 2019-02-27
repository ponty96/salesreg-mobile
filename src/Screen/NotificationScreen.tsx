import React from 'react'
import Header from '../Components/Header/BaseHeader'
import GenericListIndex from '../Components/Generic/ListIndex'
import { ListCompanyNotificationsGQL } from '../graphql/queries/business'
import moment from 'moment'
import { color } from '../Style/Color'

interface IProps {
  navigation: any
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
        graphqlQuery={ListCompanyNotificationsGQL}
        graphqlQueryResultKey="listCompanyNotifications"
        parseItemData={this.parseData}
        onItemPress={this.onClickNotification}
        emptyListText={`All notifications for an Order, Invoice, Special offer, Product or Billing will be shown here. \n\nYou should start seeing notifications once they are sent.`}
        headerText="All your notifications will appear here"
        showFab={false}
      />
    )
  }
}
