export interface Auth {
  accessToken: string;
  refreshToken: string;
}
export enum LoginKey {
  USERNAME = 'username',
  PASSWORD = 'password',
}

export interface LoginPayload {
  [LoginKey.USERNAME]: string;
  [LoginKey.PASSWORD]: string;
}
export interface RefreshTokenPayload {
  token: string;
}

export interface UpdateUserInfoPayload {
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  gender: string;
  phoneNumber: string;
  address: string;
  email: string;
  status: string;
}

export interface UpdateProfileRequest {
  userData: UpdateUserInfoPayload;
  avatarFile?: {
    uri: string;
    type: string;
    name: string;
  } | null;
}

export interface CreateUserPayload {
  username: string; 
  password: string; 
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string; 
}