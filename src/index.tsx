import React from 'react'
import { AppRegistry } from 'react-native'
import App from './App'
import { YellowBox } from 'react-native'
import { persistor } from './client'
import { PushNotificationContext } from './context/PushNotificationContext'
import '@babel/polyfill'

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
  'Module RNDocumentPicker',
  'Class RCTCxxModule'
])

persistor.restore()

export default class Index extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  state = {
    data: null,
    onSetPushNotificationData: data => this.setState({ data, id: Date.now() }),
    id: Date.now(),
    navigation: null,
    onSetNavigation: navigation => this.setState({ navigation })
  }

  render() {
    return (
      <PushNotificationContext.Provider value={this.state}>
        <App {...this.props} />
      </PushNotificationContext.Provider>
    )
  }
}

AppRegistry.registerComponent('salesreg', () => Index)
