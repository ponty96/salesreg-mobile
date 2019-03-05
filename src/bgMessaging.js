import firebase from 'react-native-firebase'

export default async message => {
  let {
    data: { id, action_type, element, element_data }
  } = message

  const notification = new firebase.notifications.Notification()
    .setNotificationId(id)
    .setTitle(
      `${element[0].toUpperCase()}${element.substr(
        1
      )} ${action_type.toLowerCase()}`
    )
    .setBody(element_data)
    .setSound('default')
    .setData(message.data)
    .android.setAutoCancel(true)
    .android.setSmallIcon('@drawable/ic_stat_yipcart_logo_icon_white')
    .android.setChannelId('all-notifications')

  firebase.notifications().displayNotification(notification)
  return Promise.resolve()
}
