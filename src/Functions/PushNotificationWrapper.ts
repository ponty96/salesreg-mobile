import Auth from '../services/auth'

class PushNotificationWrapper {
  private fcmToken: string | null

  constructor() {
    this.fcmToken = null
  }

  setFCMToken = fcmToken => {
    this.fcmToken = fcmToken
  }

  requestPermission = async (): Promise<{
    fcmToken: string | null
    previousEnabilityState: boolean
    currentEnabilityState: boolean
  }> => {
    let mobileDeviceInfo = JSON.parse(await Auth.getMobileDeviceInfo()),
      _mobileDeviceInfo = mobileDeviceInfo || {}

    await Auth.setMobileDeviceInfo({
      ..._mobileDeviceInfo,
      token: this.fcmToken || '',
      notificationEnabled: true
    })

    return Promise.resolve({
      fcmToken: this.fcmToken || '',
      previousEnabilityState:
        this.fcmToken == _mobileDeviceInfo.token
          ? _mobileDeviceInfo.notificationEnabled || false
          : false,
      currentEnabilityState: true
    })
  }
}

let _pushNotificationWrapper = new PushNotificationWrapper()

export default _pushNotificationWrapper
