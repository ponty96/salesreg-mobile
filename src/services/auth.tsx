import { AsyncStorage } from 'react-native';

class Auth {
  static getToken() {
    return AsyncStorage.getItem('token');
  }

  static getRefreshToken() {
    return AsyncStorage.getItem('refreshToken');
  }

  static getCurrentUser() {
    return AsyncStorage.getItem('currentUser');
  }

  static setToken(token: string) {
    AsyncStorage.setItem('token', token);
  }

  static setRefreshToken(token: string) {
    return AsyncStorage.setItem('refreshToken', token);
  }

  static setCurrentUser(user: any) {
    AsyncStorage.removeItem('currentUser');
    return AsyncStorage.setItem('currentUser', JSON.stringify(user));
  }

  static clearToken() {
    return AsyncStorage.removeItem('token');
  }

  static clearVault() {
    return AsyncStorage.multiRemove(['token', 'refreshToken', 'currentUser']);
  }
}

export default Auth;
