import firebase from 'react-native-firebase'

export default async message => {
  let {
    data: { id, actionType, element, elementData }
  } = message

  console.log('No think am oooo ', message)
  const notification = new firebase.notifications.Notification()
    .setNotificationId(id)
    .setTitle(
      `${element[0].toUpperCase()}${element.substr(
        1
      )} ${actionType.toLowerCase()}`
    )
    .setBody(elementData)
    .setSound('default')
    .setData(message.data)
    .android.setAutoCancel(true)
    .android.setSmallIcon('@drawable/ic_stat_yipcart_logo_icon_white')
    .android.setChannelId('all-notifications')

  firebase.notifications().displayNotification(notification)
  return Promise.resolve()
}
