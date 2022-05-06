import Auth from '../services/auth'
import firebase from 'react-native-firebase'
import { Platform } from 'react-native'

class FirebaseNotificationWrapper {
  static requestPermission = async (): Promise<{
    fcmToken: string | null
    previousEnabilityState: boolean
    currentEnabilityState: boolean
  }> => {
    let mobileDeviceInfo = JSON.parse(await Auth.getMobileDeviceInfo()),
      _mobileDeviceInfo = mobileDeviceInfo || {}

    try {
      let hasPermission = await firebase.messaging().hasPermission(),
        fcmToken = ''
      if (!hasPermission) {
        await firebase.messaging().requestPermission()
        Platform.OS == 'ios' &&
          firebase.messaging().ios.registerForRemoteNotifications()
        fcmToken = await firebase.messaging().getToken()
      } else {
        fcmToken = await firebase.messaging().getToken()
      }
      await Auth.setMobileDeviceInfo({
        ..._mobileDeviceInfo,
        token: fcmToken,
        notificationEnabled: true
      })
      return Promise.resolve({
        fcmToken,
        previousEnabilityState:
          fcmToken == _mobileDeviceInfo.token
            ? _mobileDeviceInfo.notificationEnabled || false
            : false,
        currentEnabilityState: true
      })
    } catch (e) {
      if (_mobileDeviceInfo.notificationEnabled) {
        await Auth.setMobileDeviceInfo({
          ..._mobileDeviceInfo,
          notificationEnabled: true
        })
        return Promise.resolve({
          fcmToken: _mobileDeviceInfo.token,
          previousEnabilityState:
            _mobileDeviceInfo.notificationEnabled || false,
          currentEnabilityState: true
        })
      } else {
        await Auth.setMobileDeviceInfo({
          ..._mobileDeviceInfo,
          notificationEnabled: false
        })
        return Promise.resolve({
          fcmToken: null,
          previousEnabilityState:
            _mobileDeviceInfo.notificationEnabled || false,
          currentEnabilityState: false
        })
      }
    }
  }
}

export default FirebaseNotificationWrapper
