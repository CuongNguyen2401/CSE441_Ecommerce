export interface Auth {
  accessToken: string;
  refreshToken: string;
}
export enum LoginKey {
  USERNAME = 'email',
  PASSWORD = 'password',
}

export interface LoginPayload {
  [LoginKey.USERNAME]: string;
  [LoginKey.PASSWORD]: string;
}
export interface RefreshTokenPayload {
  token: string;
}
