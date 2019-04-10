import { AsyncStorage } from 'react-native'

class Auth {
  static getToken() {
    return AsyncStorage.getItem('token')
  }

  static getRefreshToken() {
    return AsyncStorage.getItem('refreshToken')
  }

  static getCurrentUser() {
    return AsyncStorage.getItem('currentUser')
  }

  static gettingStartedProgress() {
    return AsyncStorage.getItem('gettingStartedProgress')
  }

  static getMobileDeviceInfo() {
    return AsyncStorage.getItem('mobileDeviceInfo')
  }

  static getCurrentSchemaVersion() {
    return AsyncStorage.getItem('schema_version')
  }

  static getS3Keys() {
    return AsyncStorage.getItem('S3_KEYS')
  }

  static setToken(token: string) {
    AsyncStorage.setItem('token', token)
  }

  static setCurrentSchemaVersion(version: string) {
    return AsyncStorage.setItem('schema_version', version)
  }

  static setRefreshToken(token: string) {
    return AsyncStorage.setItem('refreshToken', token)
  }

  static setGettingStartedProgress(step: string) {
    return AsyncStorage.setItem('gettingStartedProgress', step)
  }

  static setCurrentUser(user: any) {
    AsyncStorage.removeItem('currentUser')
    return AsyncStorage.setItem('currentUser', JSON.stringify(user))
  }

  static setS3Keys(keys) {
    return AsyncStorage.setItem('S3_KEYS', JSON.stringify(keys))
  }

  static setMobileDeviceInfo(mobileDeviceInfo: any) {
    return AsyncStorage.setItem(
      'mobileDeviceInfo',
      JSON.stringify(mobileDeviceInfo)
    )
  }

  static clearToken() {
    return AsyncStorage.removeItem('token')
  }

  static clearVault() {
    return AsyncStorage.multiRemove([
      'token',
      'refreshToken',
      'currentUser',
      'mobileDeviceInfo'
    ])
  }
}

export default Auth
