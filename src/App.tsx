import React from 'react'
import { StatusBar } from 'react-native'
import { Font, AppLoading } from 'expo'
import { Root } from 'native-base'
import { ApolloProvider } from 'react-apollo'
import client from './client'

import Routes from './Navigation/Routes'
import Auth from './services/auth'
import { AuthenticateClientGQL } from './graphql/client-mutations/authenticate'

export default class App extends React.Component {
  state = {
    loading: true
  }
  async componentDidMount() {
    await Font.loadAsync({
      SourceSansPro: require('../fonts/SourceSansPro-Regular.ttf'),
      SourceSansPro_Semibold: require('../fonts/SourceSansPro-Semibold.ttf'),
      SourceSansPro_Bold: require('../fonts/SourceSansPro-Bold.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
    })

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
    if (this.state.loading) {
      return (
        <Root>
          <AppLoading />
        </Root>
      )
    }
    return (
      <ApolloProvider client={client}>
        <Root>
          <StatusBar barStyle="light-content" />
          <Routes client={client} />
        </Root>
      </ApolloProvider>
    )
  }
}
