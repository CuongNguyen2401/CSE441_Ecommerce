import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {lazy, Suspense} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {RootStackParamList, NavigationRoutes} from './types';
import AuthNavigator from './components/AuthNavigator';
import MainTabNavigator from './components/MainTabNavigator';

// Lazy load screens for direct navigation
const ForgotPasswordScreen = lazy(() => import('@screens/Auth/ForgotPassword'));
const ProductDetailsScreen = lazy(
  () => import('@screens/User/products/components/ProductDetailScreen'),
);
const CheckoutScreen = lazy(
  () => import('@screens/User/cart/components/CheckoutScreen'),
);
const PaymentSuccessScreen = lazy(
  () => import('@screens/User/cart/components/PaymentSuccessScreen'),
);
// Admin screens
const AdminProductsScreen = lazy(
  () => import('@screens/Admin/products/ProductManagementScreen'),
);
const CreateProductScreen = lazy(
  () => import('@screens/Admin/products/CreateProductScreen'),
);
const EditProductScreen = lazy(
  () => import('@screens/Admin/products/EditProductScreen'),
);
const ProductDetailsAdminScreen = lazy(
  () => import('@screens/Admin/products/ProductDetailsScreen'),
);

const RootStack = createNativeStackNavigator<RootStackParamList>();

const LoadingScreen = () => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <ActivityIndicator size="large" color="#007BFF" />
  </View>
);

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Suspense fallback={<LoadingScreen />}>
        <RootStack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName={NavigationRoutes.AUTH}>
          <RootStack.Screen
            name={NavigationRoutes.AUTH}
            component={AuthNavigator}
          />
          <RootStack.Screen
            name={NavigationRoutes.MAIN}
            component={MainTabNavigator}
          />
          <RootStack.Screen
            name={NavigationRoutes.FORGOT_PASSWORD}
            component={ForgotPasswordScreen}
            options={{headerShown: true, title: 'Forgot Password'}}
          />
          <RootStack.Screen
            name={NavigationRoutes.PRODUCT_DETAILS}
            component={ProductDetailsScreen}
            options={{headerShown: true, title: 'Product Details'}}
          />
          <RootStack.Screen
            name={NavigationRoutes.CHECKOUT}
            component={CheckoutScreen}
            options={{headerShown: true, title: 'Checkout'}}
          />
          <RootStack.Screen
            name={NavigationRoutes.PAYMENT_SUCCESS}
            component={PaymentSuccessScreen}
            options={{headerShown: true, title: 'Payment Successful'}}
          />
          <RootStack.Screen
            name={NavigationRoutes.ADMIN_PRODUCTS}
            component={AdminProductsScreen}
            options={{headerShown: true, title: 'Product Management'}}
          />
          <RootStack.Screen
            name={NavigationRoutes.CREATE_PRODUCT}
            component={CreateProductScreen}
            options={{headerShown: true, title: 'Create Product'}}
          />
          <RootStack.Screen
            name={NavigationRoutes.EDIT_PRODUCT}
            component={EditProductScreen}
            options={{headerShown: true, title: 'Edit Product'}}
          />
          <RootStack.Screen
            name={NavigationRoutes.PRODUCT_DETAILS_ADMIN}
            component={ProductDetailsAdminScreen}
            options={{headerShown: true, title: 'Product Details'}}
          />
        </RootStack.Navigator>
      </Suspense>
    </NavigationContainer>
  );
};

export default AppNavigator;
