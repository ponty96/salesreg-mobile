import { AppRegistry } from 'react-native'
import App from './App'
import { YellowBox } from 'react-native'
import RNPaystack from 'react-native-paystack'
import { persistor } from './client'
import Config from 'react-native-config'

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
  'Module RNDocumentPicker',
  'Class RCTCxxModule'
])

persistor.restore()

RNPaystack.init({
  publicKey: Config.PAYSTACK_PUBLIC_KEY
})

AppRegistry.registerComponent('salesreg', () => App)
