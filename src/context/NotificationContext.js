import React from 'react'

export const NotificationContext = React.createContext({
  style: 'success',
  title: '',
  subtitle: '',
  trigger: Date.now(),
  timeout: 5000,
  setNotificationBanner: params => null
})
