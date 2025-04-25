import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { lazy } from 'react';
import LoginScreen from '@screens/Auth/Login';
import { AuthStackParamList, NavigationRoutes } from '../types';

// Lazy load screens
const RegisterScreen = lazy(() => import('@screens/Auth/SignUp'));
const ForgotPasswordScreen = lazy(() => import('@screens/Auth/ForgotPassword'));

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{headerShown: false}}>
    <AuthStack.Screen name={NavigationRoutes.LOGIN} component={LoginScreen} />
    <AuthStack.Screen name={NavigationRoutes.REGISTER} component={RegisterScreen} />
    <AuthStack.Screen name={NavigationRoutes.FORGOT_PASSWORD}  component={ForgotPasswordScreen} />
  </AuthStack.Navigator>
);

export default AuthNavigator;
