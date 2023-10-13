export class AuthTokenObject {
  static NAME = 'authToken';

  authToken = '';
  constructor(obj?: Partial<AuthTokenObject>) {
    Object.assign(this, obj);
  }

  toString() {
    return this.authToken;
  }
}

export interface BasicAuthController {
  login(username: string, password: string): Promise<AuthTokenObject> | never;
}
