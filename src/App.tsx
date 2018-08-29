import React from 'react'
import { StatusBar, SafeAreaView } from 'react-native'
import { Root } from 'native-base'
import { ApolloProvider } from 'react-apollo'
import client from './client'
import { color } from './Style/Color'

import Routes from './Navigation/Routes'
import Auth from './services/auth'
import { AuthenticateClientGQL } from './graphql/client-mutations/authenticate'

export default class App extends React.Component {
  state = {
    loading: true
  }
  async componentDidMount() {
    this.authenticate()
    this.setState({ loading: true })
  }
  authenticate = async () => {
    const token = await Auth.getToken()
    const refreshToken = await Auth.getRefreshToken()
    if (token && refreshToken) {
      await client.resetStore()
      client.mutate({ mutation: AuthenticateClientGQL })
      this.setState({ loading: false })
    } else {
      this.setState({ loading: false })
    }
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: color.primary }}>
        <ApolloProvider client={client}>
          <Root>
            <StatusBar barStyle="light-content" />
            <Routes client={client} />
          </Root>
        </ApolloProvider>
      </SafeAreaView>
    )
  }
}
