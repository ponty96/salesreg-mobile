import React from 'react'
import ApolloClient from "apollo-boost";
import { ApolloProvider } from 'react-apollo';

import Routes from './Navigation/Routes'

const client = new ApolloClient({uri: 'https://github.com'});

export default class App extends React.Component {
  render() {
      return <ApolloProvider client={client}>
          <Routes />
      </ApolloProvider>
  }
}
