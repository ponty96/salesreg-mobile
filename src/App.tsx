import React from 'react'
import { StatusBar } from 'react-native'
import { Font, AppLoading } from 'expo'
import { Root } from 'native-base'

import Routes from './Navigation/Routes'

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
    this.setState({ loading: false })
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
      <Root>
        <StatusBar barStyle="light-content" />
        <Routes />
      </Root>
    )
  }
}
