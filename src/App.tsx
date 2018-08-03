import { AppLoading, Font } from 'expo';
import { Root } from 'native-base';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { StatusBar } from 'react-native';
import client from './client';

import { AuthenticateClientGQL } from './graphql/client-mutations/authenticate';
import Routes from './Navigation/Routes';
import Auth from './services/auth';

export default class App extends React.Component {
  public state = {
    loading: true
  };
  public async componentDidMount() {
    await Font.loadAsync({
      SourceSansPro: require('../Fonts/SourceSansPro-Regular.ttf'),
      SourceSansPro_Semibold: require('../Fonts/SourceSansPro-Semibold.ttf'),
      SourceSansPro_Bold: require('../Fonts/SourceSansPro-Bold.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
    });

    this.authenticate();
    this.setState({ loading: true });
  }
  public authenticate = async () => {
    const token = await Auth.getToken();
    const refreshToken = await Auth.getRefreshToken();
    if (token && refreshToken) {
      await client.resetStore();
      client.mutate({ mutation: AuthenticateClientGQL });
      this.setState({ loading: false });
    } else {
      this.setState({ loading: false });
    }
  };
  public render() {
    if (this.state.loading) {
      return (
        <Root>
          <AppLoading />
        </Root>
      );
    }
    return (
      <ApolloProvider client={client}>
        <Root>
          <StatusBar barStyle="light-content" />
          <Routes client={client} />
        </Root>
      </ApolloProvider>
    );
  }
}
