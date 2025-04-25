import {NavigatorScreenParams} from '@react-navigation/native';

// Navigation Routes Enum
export enum NavigationRoutes {
  // Root Stack Routes
  AUTH = 'Auth',
  MAIN = 'Main',
  FORGOT_PASSWORD = 'ForgotPassword',
  PRODUCT_DETAILS = 'ProductDetails',
  CHECKOUT = 'Checkout',
  PAYMENT_SUCCESS = 'PaymentSuccess',

  // Auth Stack Routes
  LOGIN = 'Login',
  REGISTER = 'Register',

  // Main Tab Routes
  HOME_TAB = 'HomeTab',
  PRODUCTS_TAB = 'ProductsTab',
  CART_TAB = 'CartTab',
  ORDERS_TAB = 'OrdersTab',
  PROFILE_TAB = 'ProfileTab',

  // Home Stack Routes
  HOME = 'Home',
  CATEGORY_PRODUCTS = 'CategoryProducts',
  SEARCH = 'Search',

  // Products Stack Routes
  PRODUCTS = 'Products',

  // Orders Stack Routes
  ORDERS = 'Orders',
  ORDER_DETAILS = 'OrderDetails',

  // Profile Stack Routes
  PROFILE = 'Profile',
  EDIT_PROFILE = 'EditProfile',
  ADDRESSES = 'Addresses',
  ADD_ADDRESS = 'AddAddress',
  EDIT_ADDRESS = 'EditAddress',
  SETTINGS = 'Settings',
  ABOUT = 'About',
}
// Root Navigator
export type RootStackParamList = {
  [NavigationRoutes.AUTH]: NavigatorScreenParams<AuthStackParamList>;
  [NavigationRoutes.MAIN]: NavigatorScreenParams<MainTabParamList>;
  [NavigationRoutes.FORGOT_PASSWORD]: NavigatorScreenParams<AuthStackParamList>;
  [NavigationRoutes.PRODUCT_DETAILS]: {productId: number};
  [NavigationRoutes.CHECKOUT]: undefined;
  [NavigationRoutes.PAYMENT_SUCCESS]: {orderId: number};
};

// Auth Stack
export type AuthStackParamList = {
  [NavigationRoutes.LOGIN]: {email?: string};
  [NavigationRoutes.REGISTER]: undefined;
  [NavigationRoutes.FORGOT_PASSWORD]: {email?: string};
};

// Main Tab Navigator
export type MainTabParamList = {
  [NavigationRoutes.HOME_TAB]: NavigatorScreenParams<HomeStackParamList>;
  [NavigationRoutes.PRODUCTS_TAB]: NavigatorScreenParams<ProductsStackParamList>;
  [NavigationRoutes.CART_TAB]: undefined;
  [NavigationRoutes.ORDERS_TAB]: NavigatorScreenParams<OrdersStackParamList>;
  [NavigationRoutes.PROFILE_TAB]: NavigatorScreenParams<ProfileStackParamList>;
};

// Home Stack
export type HomeStackParamList = {
  [NavigationRoutes.HOME]: undefined;
  [NavigationRoutes.PRODUCT_DETAILS]: {productId: number};
  [NavigationRoutes.CATEGORY_PRODUCTS]: {category: string};
  [NavigationRoutes.SEARCH]: {query?: string};
};

// Products Stack
export type ProductsStackParamList = {
  [NavigationRoutes.PRODUCTS]: undefined;
  [NavigationRoutes.PRODUCT_DETAILS]: {productId: number};
  [NavigationRoutes.CATEGORY_PRODUCTS]: {category: string};
  [NavigationRoutes.SEARCH]: {query?: string};
};

// Orders Stack
export type OrdersStackParamList = {
  [NavigationRoutes.ORDERS]: undefined;
  [NavigationRoutes.ORDER_DETAILS]: {orderId: number};
  [NavigationRoutes.CHECKOUT]: undefined;
  [NavigationRoutes.PAYMENT_SUCCESS]: {orderId: number};
};

// Profile Stack
export type ProfileStackParamList = {
  [NavigationRoutes.PROFILE]: undefined;
  [NavigationRoutes.EDIT_PROFILE]: undefined;
  [NavigationRoutes.ADDRESSES]: undefined;
  [NavigationRoutes.ADD_ADDRESS]: undefined;
  [NavigationRoutes.EDIT_ADDRESS]: {addressId: number};
  [NavigationRoutes.SETTINGS]: undefined;
  [NavigationRoutes.ABOUT]: undefined;
};

// Utility type for useNavigation hook
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
