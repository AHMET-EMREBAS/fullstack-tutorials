import { AuthTokenObject } from '@techbir/common';

export class AuthTokenManager {
  static setToken(tokenObj: AuthTokenObject) {
    localStorage.setItem(AuthTokenObject.NAME, tokenObj.toString());
  }

  static getToken() {
    const token = localStorage.getItem(AuthTokenObject.NAME);
    if (token) {
      return new AuthTokenObject({ [AuthTokenObject.NAME]: token });
    }
    return undefined;
  }

  static remove() {
    localStorage.setItem(AuthTokenObject.NAME, '');
  }
}
