import Constants from 'expo-constants';

export const BASE_URL =
  process.env.API_URL || Constants.expoConfig?.extra?.apiUrl; // Fallback to default if env var is not set

export const APP_APIS = {
  PRODUCT: `${BASE_URL}api/v1/products`,
  USER: `${BASE_URL}api/v1/users`,
  ORDER: `${BASE_URL}api/v1/orders`,
  NOTIFICATION: `${BASE_URL}api/v1/notifications`,
  CATEGORY: `${BASE_URL}api/v1/categories`,
  CLOUDINARY: `${BASE_URL}cloudinary`,
  PAYMENT: `${BASE_URL}api/v1/vnpayment`,
  ROLE: `${BASE_URL}api/v1/roles`,
  RATING: `${BASE_URL}api/v1/ratings`,
  PERMISSION: `${BASE_URL}api/v1/permissions`,
  COUPON: `${BASE_URL}api/v1/coupons`,
  AUTH: `${BASE_URL}api/v1/auth`,
};
