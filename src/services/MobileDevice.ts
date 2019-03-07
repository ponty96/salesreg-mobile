import DeviceInfo from 'react-native-device-info'
import { Platform } from 'react-native'

import {
  UpsertMobileDevice,
  DisableMobileDeviceNotification
} from '../graphql/mutations/user'
import pushNotificationWrapper from '../Functions/PushNotificationWrapper'
import Auth from './auth'

export const upsertMobileDevice = (client: any, user: any) => {
  pushNotificationWrapper
    .requestPermission()
    .then(({ fcmToken, currentEnabilityState, previousEnabilityState }) => {
      if (previousEnabilityState == false && currentEnabilityState == true) {
        let mobileDevice = {
          appVersion: DeviceInfo.getVersion(),
          brand: DeviceInfo.getBrand(),
          buildNumber: `${DeviceInfo.getBuildNumber()}`,
          deviceToken: fcmToken,
          mobileOs: Platform.OS,
          notificationEnabled: currentEnabilityState,
          userId: user.id
        }

        client.mutate({
          mutation: UpsertMobileDevice,
          variables: { mobileDevice }
        })
      }
    })
}

export const disableMobileDeviceNotification = async (
  client: any,
  user: any
) => {
  let { token } = JSON.parse(await Auth.getMobileDeviceInfo())
  client.mutate({
    mutation: DisableMobileDeviceNotification,
    variables: { deviceToken: token, userId: user.id }
  })

  setTimeout(() => Auth.clearVault(), 10)
}
