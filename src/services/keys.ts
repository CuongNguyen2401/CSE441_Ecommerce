import Constants from 'expo-constants';

export enum API_KEYS {
  PROFILE_BY_ID = 'PROFILE_BY_ID',
  USER_INFO = 'USER_INFO',
}

export const API_URL = Constants.expoConfig?.extra?.apiUrl;
