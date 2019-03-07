import React from 'react'

export const PushNotificationContext = React.createContext({
  data: null,
  onSetPushNotificationData: data => null,
  id: Date.now(),
  navigation: null,
  onSetNavigation: navigation => null
})
