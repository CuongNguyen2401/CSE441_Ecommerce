import {NavigatorScreenParams} from '@react-navigation/native';

// Auth Stack
export type AuthStackParamList = {
    Login: undefined;
    Register: undefined;
    ForgotPassword: undefined;
};

// Main Tab Navigator
export type MainTabParamList = {
    HomeTab: NavigatorScreenParams<HomeStackParamList>;
    ProductsTab: NavigatorScreenParams<ProductsStackParamList>;
    CartTab: undefined;
    OrdersTab: NavigatorScreenParams<OrdersStackParamList>;
    ProfileTab: NavigatorScreenParams<ProfileStackParamList>;
};

// Home Stack
export type HomeStackParamList = {
    Home: undefined;
    ProductDetails: { productId: number };
    CategoryProducts: { category: string };
    Search: { query?: string };
};

// Products Stack
export type ProductsStackParamList = {
    Products: undefined;
    ProductDetails: { productId: number };
    CategoryProducts: { category: string };
    Search: { query?: string };
};

// Orders Stack
export type OrdersStackParamList = {
    Orders: undefined;
    OrderDetails: { orderId: number };
    Checkout: undefined;
    PaymentSuccess: { orderId: number };
};

// Profile Stack
export type ProfileStackParamList = {
    Profile: undefined;
    EditProfile: undefined;
    Addresses: undefined;
    AddAddress: undefined;
    EditAddress: { addressId: number };
    Settings: undefined;
    About: undefined;
};

// Root Navigator
export type RootStackParamList = {
    Auth: NavigatorScreenParams<AuthStackParamList>;
    Main: NavigatorScreenParams<MainTabParamList>;
    ForgotPassword: NavigatorScreenParams<AuthStackParamList>;
    ProductDetails: { productId: number };
    Checkout: undefined;
    PaymentSuccess: { orderId: number };
};

// Utility type for useNavigation hook
declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {
        }
    }
}