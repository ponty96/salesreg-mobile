import React from 'react'

export const UserContext = React.createContext({
  user: {},
  gettingStartedProgress: null,
  resetUserContext: user => null,
  resetGettingStartedProgress: gettingStartedProgress => null
})
