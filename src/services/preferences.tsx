import { AsyncStorage } from 'react-native'

class Preferences {
  static hideOrderStatusHint() {
    return AsyncStorage.setItem('hideOrderStatusHint', 'true')
  }
  static getOrderStatusHintPref() {
    return AsyncStorage.getItem('hideOrderStatusHint')
  }
}

export default Preferences
