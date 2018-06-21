import React from 'react';
import { StatusBar } from 'react-native';
import { Root } from 'native-base';

import Routes from './Navigation/Routes';

export default class App extends React.Component {
  render() {
    return (
      <Root>
        <StatusBar barStyle="light-content" />
        <Routes />
      </Root>
    );
  }
}
