import React from 'react'
import { View, StatusBar } from 'react-native'
import { Root } from 'native-base'
import { ApolloProvider } from 'react-apollo'
import client from './client'

import Routes from './Navigation/Routes'
import Auth from './services/auth'
import { AuthenticateClientGQL } from './graphql/client-mutations/authenticate'
import { UserContext } from './context/UserContext'

export default class App extends React.Component {
  state = {
    loading: true,
    user: {},
    resetUserContext: () => this.setState({ user: {} })
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
      await client.resetStore()
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
      <View style={{ flex: 1, paddingTop: 0 }}>
        <UserContext.Provider value={{ user, resetUserContext }}>
          <ApolloProvider client={client}>
            <Root>
              <StatusBar barStyle="light-content" />
              <Routes client={client} />
            </Root>
          </ApolloProvider>
        </UserContext.Provider>
      </View>
    )
  }
}
