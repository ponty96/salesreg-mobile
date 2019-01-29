import { AppRegistry } from 'react-native'
import App from './App'
import { YellowBox } from 'react-native'
import { persistor } from './client'

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
  'Module RNDocumentPicker',
  'Class RCTCxxModule'
])

persistor.restore()

AppRegistry.registerComponent('salesreg', () => App)
