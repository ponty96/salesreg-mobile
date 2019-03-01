import React from 'react'
import { View, StatusBar } from 'react-native'
import { Root } from 'native-base'
import { ApolloProvider } from 'react-apollo'
import client from './client'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import firebase from 'react-native-firebase'

import Routes from './Navigation/Routes'
import Auth from './services/auth'
import { AuthenticateClientGQL } from './graphql/client-mutations/authenticate'
import { UserContext } from './context/UserContext'
import { appReducers } from './store/reducers'
import setupSentry from './Functions/sentry'
import ViewOverflow from 'react-native-view-overflow'
import Config from 'react-native-config'
import { Root as NotificationRoot } from './Components/NotificationBanner'
import {
  upsertMobileDevice,
  upsertWhenTokenChanges
} from './services/MobileDevice'

const store = createStore(appReducers, applyMiddleware(thunk, logger))

export default class App extends React.Component {
  private onTokenRefreshListener: any

  state = {
    loading: true,
    user: {},
    gettingStartedProgress: null,
    resetUserContext: user => this.setState({ user: user || {} }),
    resetGettingStartedProgress: gettingStartedProgress =>
      this.setState({ gettingStartedProgress: gettingStartedProgress || null })
  }

  async componentDidMount() {
    this.authenticate()
    this.setState({ loading: true })
  }

  componentWillUnmount() {
    this.onTokenRefreshListener && this.onTokenRefreshListener()
  }

  handleTokenChanged = (client: any, user: any) => {
    this.onTokenRefreshListener = firebase
      .messaging()
      .onTokenRefresh(fcmToken => {
        upsertWhenTokenChanges(fcmToken, user, client)
      })
  }

  authenticate = async () => {
    const token = await Auth.getToken()
    const refreshToken = await Auth.getRefreshToken()

    if (token && refreshToken) {
      const user = JSON.parse(await Auth.getCurrentUser())
      const gettingStartedProgress = await Auth.gettingStartedProgress()
      if (Config.NODE_ENVIRONMENT != 'development') {
        setupSentry(user)
      }
      client.mutate({
        mutation: AuthenticateClientGQL,
        variables: { user: user }
      })
      this.setState({
        loading: false,
        user,
        gettingStartedProgress: gettingStartedProgress || null
      })

      upsertMobileDevice(client, user)
      this.handleTokenChanged(client, user)
    } else {
      this.setState({ loading: false })
    }
  }

  render() {
    let {
      user,
      resetUserContext,
      gettingStartedProgress,
      resetGettingStartedProgress
    } = this.state
    return (
      // check if user is on IphoneX and use View
      <ViewOverflow style={{ flex: 1 }}>
        <NotificationRoot>
          <View style={{ paddingTop: 0, flex: 1 }}>
            <Provider store={store}>
              <UserContext.Provider
                value={{
                  user,
                  resetUserContext,
                  gettingStartedProgress,
                  resetGettingStartedProgress
                }}
              >
                <ApolloProvider client={client}>
                  <Root>
                    <StatusBar barStyle="light-content" />
                    <Routes client={client} />
                  </Root>
                </ApolloProvider>
              </UserContext.Provider>
            </Provider>
          </View>
        </NotificationRoot>
      </ViewOverflow>
    )
  }
}
