import Constants from 'expo-constants';

export enum API_KEYS {
  PROFILE_BY_ID = 'profile_by_id',
  USER_INFO = 'user_info',

  //PRODUCTS
  All_PRODUCTS = 'products',
  PRODUCT_DETAILS = 'product_details/:id',
  PRODUCT_BY_ID = 'product_by_id',
  PRODUCT_BY_CATEGORY = 'product_by_category',
  PRODUCT_BY_SEARCH = 'product_by_search',
}

export const API_URL = Constants.expoConfig?.extra?.apiUrl;
