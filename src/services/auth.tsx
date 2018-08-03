import { AsyncStorage } from 'react-native'

class Auth {
  public static getToken() {
    return AsyncStorage.getItem('token')
  }

  public static getRefreshToken() {
    return AsyncStorage.getItem('refreshToken')
  }

  public static getCurrentUser() {
    return AsyncStorage.getItem('currentUser')
  }

  public static setToken(token: string) {
    AsyncStorage.setItem('token', token)
  }

  public static setRefreshToken(token: string) {
    return AsyncStorage.setItem('refreshToken', token)
  }

  public static setCurrentUser(user: any) {
    return AsyncStorage.setItem('currentUser', JSON.stringify(user))
  }

  public static clearToken() {
    return AsyncStorage.removeItem('token')
  }

  public static clearVault() {
    return AsyncStorage.multiRemove(['token', 'refreshToken', 'currentUser'])
  }
}

export default Auth
