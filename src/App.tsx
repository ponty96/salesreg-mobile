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
import NotificationAtom from './Atom/NotificationAtom'
import { NotificationContext } from './context/NotificationContext'

const store = createStore(appReducers, applyMiddleware(thunk, logger))

export default class App extends React.Component {
  state = {
    loading: true,
    user: {},
    resetUserContext: user => this.setState({ user: user || {} }),
    notification: {
      style: 'success',
      title: '',
      subtitle: '',
      trigger: Date.now(),
      timeout: 5000,
      setNotificationBanner: ({ title, subtitle, style, timeout }) =>
        this.setState({
          notification: {
            title,
            subtitle,
            trigger: Date.now(),
            style,
            timeout
          }
        })
    }
  }

  async componentDidMount() {
    this.authenticate()
    this.setState({ loading: true })
  }

  authenticate = async () => {
    const token = await Auth.getToken()
    const refreshToken = await Auth.getRefreshToken()
    if (token && refreshToken) {
      const user = JSON.parse(await Auth.getCurrentUser())
      setupSentry(user)
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
      <NotificationContext.Provider value={this.state.notification}>
        <NotificationAtom />
        <View style={{ flex: 1, paddingTop: 0 }}>
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
      </NotificationContext.Provider>
    )
  }
}
