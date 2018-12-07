import { AppRegistry } from 'react-native'
import App from './App'
import { YellowBox } from 'react-native'
import RNPaystack from 'react-native-paystack'

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
  'Module RNDocumentPicker',
  'Class RCTCxxModule'
])

RNPaystack.init({
  publicKey: 'pk_test_1367835f58c5ed8899339866baae45a3343999e9'
})

AppRegistry.registerComponent('salesreg', () => App)
