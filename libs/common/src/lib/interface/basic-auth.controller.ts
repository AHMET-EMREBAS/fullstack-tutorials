export type AuthToken = {
  authToken: string;
};

export interface BasicAuthController {
  login(username: string, password: string): Promise<AuthToken> | never;
}
