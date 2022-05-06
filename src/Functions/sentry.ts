import { Sentry } from 'react-native-sentry'
import DeviceInfo from 'react-native-device-info'
import Config from 'react-native-config'

let dsn = Config.SENTRY_DSN

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
    environment: Config.SENTRY_ENVIRONMENT
  })

  Sentry.setUserContext({
    ...user
  })
}

export default setupSentry
