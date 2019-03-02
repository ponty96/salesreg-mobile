import DeviceInfo from 'react-native-device-info'
import { Platform } from 'react-native'

import {
  UpsertMobileDevice,
  DisableMobileDeviceNotification
} from '../graphql/mutations/user'
import FirebaseNotificationWrapper from '../Functions/FirebaseNotificationWrapper'
import Auth from './auth'

export const upsertMobileDevice = (client: any, user: any) => {
  FirebaseNotificationWrapper.requestPermission().then(
    ({ fcmToken, currentEnabilityState, previousEnabilityState }) => {
      if (previousEnabilityState == false && currentEnabilityState == true) {
        let mobileDevice = {
          appVersion: DeviceInfo.getVersion(),
          brand: DeviceInfo.getBrand(),
          buildNumber: `${DeviceInfo.getBuildNumber()}`,
          deviceToken: fcmToken,
          lastActive: `${DeviceInfo.getLastUpdateTime()}`,
          mobileOs: Platform.OS,
          notificationEnabled: currentEnabilityState,
          userId: user.id
        }

        client.mutate({
          mutation: UpsertMobileDevice,
          variables: { mobileDevice }
        })
      }
    }
  )
}

export const upsertWhenTokenChanges = async (token, user, client) => {
  let mobileDevice = {
    appVersion: DeviceInfo.getVersion(),
    brand: DeviceInfo.getBrand(),
    buildNumber: `${DeviceInfo.getBuildNumber()}`,
    deviceToken: token,
    lastActive: `${DeviceInfo.getLastUpdateTime()}`,
    mobileOs: Platform.OS,
    notificationEnabled: true,
    userId: user.id
  }

  client.mutate({
    mutation: UpsertMobileDevice,
    variables: { mobileDevice }
  })

  let mobileDeviceInfo = JSON.parse(await Auth.getMobileDeviceInfo()),
    _mobileDeviceInfo = mobileDeviceInfo || {}

  Auth.setMobileDeviceInfo({
    ..._mobileDeviceInfo,
    token,
    notificationEnabled: true
  })
}

export const disableMobileDeviceNotification = async (
  client: any,
  user: any
) => {
  let { token } = JSON.parse(await Auth.getMobileDeviceInfo())
  client
    .mutate({
      mutation: DisableMobileDeviceNotification,
      variables: { deviceToken: token, userId: user.id }
    })
    .then(data => console.log(`Mehn i commot this thing `, data))

  setTimeout(() => Auth.clearVault(), 10)
}
