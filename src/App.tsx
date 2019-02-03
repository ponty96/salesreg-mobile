import React from 'react'
import { View, StatusBar } from 'react-native'
import { Root } from 'native-base'
import { ApolloProvider } from 'react-apollo'
import client from './client'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import Routes from './Navigation/Routes'
import Auth from './services/auth'
import { AuthenticateClientGQL } from './graphql/client-mutations/authenticate'
import { UserContext } from './context/UserContext'
import { appReducers } from './store/reducers'
import setupSentry from './Functions/sentry'
import ViewOverflow from 'react-native-view-overflow'
import Config from 'react-native-config'
import {
  Root as NotificationRoot,
  NotificationBanner
} from './Components/NotificationBanner'

const store = createStore(appReducers, applyMiddleware(thunk, logger))

export default class App extends React.Component {
  state = {
    loading: true,
    user: {},
    resetUserContext: user => this.setState({ user: user || {} })
  }

  async componentDidMount() {
    this.authenticate()
    this.setState({ loading: true })

    let banner = NotificationBanner({
      title: 'Success created',
      subtitle: 'Yaga ooo'
    })

    setTimeout(() => {
      banner.show({ duration: 10000, bannerPosition: 'bottom' })
    }, 2000)

    setTimeout(() => {
      banner.show({ duration: 10000, bannerPosition: 'top' })
    }, 4000)
  }

  authenticate = async () => {
    const token = await Auth.getToken()
    const refreshToken = await Auth.getRefreshToken()
    if (token && refreshToken) {
      const user = JSON.parse(await Auth.getCurrentUser())
      if (Config.NODE_ENVIRONMENT != 'development') {
        setupSentry(user)
      }
      client.mutate({
        mutation: AuthenticateClientGQL,
        variables: { user: user }
      })
      this.setState({ loading: false, user })
    } else {
      this.setState({ loading: false })
    }
  }

  render() {
    let { user, resetUserContext } = this.state
    return (
      // check if user is on IphoneX and use View
      <ViewOverflow style={{ flex: 1 }}>
        <NotificationRoot>
          <View style={{ paddingTop: 0, flex: 1 }}>
            <Provider store={store}>
              <UserContext.Provider value={{ user, resetUserContext }}>
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
