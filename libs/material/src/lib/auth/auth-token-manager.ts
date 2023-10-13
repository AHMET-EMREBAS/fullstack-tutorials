import { AuthTokenObject } from '@techbir/common';

const EMPTY_TOKEN = '';

export class AuthTokenManager {
  static setToken(tokenObj: AuthTokenObject) {
    localStorage.setItem(AuthTokenObject.NAME, tokenObj.authToken);
  }

  static getToken() {
    const token = localStorage.getItem(AuthTokenObject.NAME);
    if (token) {
      return new AuthTokenObject({ [AuthTokenObject.NAME]: token });
    }
    return undefined;
  }

  static remove() {
    localStorage.setItem(AuthTokenObject.NAME, EMPTY_TOKEN);
  }
}
