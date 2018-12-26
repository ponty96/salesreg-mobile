import { Sentry } from 'react-native-sentry'
import DeviceInfo from 'react-native-device-info'

let dsn = 'https://3be412aa24be4c9f8b5fffcf9ef2cff2@sentry.io/1359820'

function setupSentry(user) {
  Sentry.config(dsn).install()
  addBuildContext(user)
}

const addBuildContext = user => {
  Sentry.setTagsContext({
    appVersion: DeviceInfo.getVersion(),
    buildNumber: DeviceInfo.getBuildNumber(),
    deviceInfo: {
      systemName: DeviceInfo.getSystemName(),
      systemVersion: DeviceInfo.getSystemVersion(),
      deviceName: DeviceInfo.getDeviceName()
    }
  })

  Sentry.setTagsContext({
    environment: 'staging'
  })

  Sentry.setUserContext({
    ...user
  })
}

export default setupSentry
