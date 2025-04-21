import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
    AuthStackParamList,
    HomeStackParamList,
    MainTabParamList,
    OrdersStackParamList,
    ProductsStackParamList,
    ProfileStackParamList,
    RootStackParamList,
} from './types';

// Import screens
// Auth screens
import LoginScreen from '../screens/Auth/Login/LoginScreen';
import RegisterScreen from '../screens/Auth/SignUp/RegisterScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgotPassword/ForgotPasswordScreen';

// Home screens
import HomeScreen from '../screens/home/HomeScreen';

// Product screens
import ProductDetailsScreen from '../screens/products/ProductDetailsScreen';
import ProductsScreen from '../screens/products/ProductsScreen';
// TODO: Implement these screens
const CategoryProductsScreen = () => <></>;
const SearchScreen = () => <></>;

// Cart screens
import CartScreen from '../screens/cart/CartScreen';
import CheckoutScreen from '../screens/cart/CheckoutScreen';
import PaymentSuccessScreen from '../screens/cart/PaymentSuccessScreen';

// Order screens
import OrdersScreen from '../screens/orders/OrdersScreen';

// Profile screens
import AboutScreen from '../screens/profile/AboutScreen';
import AddAddressScreen from '../screens/profile/AddAddressScreen';
import AddressesScreen from '../screens/profile/AddressesScreen';
import EditAddressScreen from '../screens/profile/EditAddressScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import SettingsScreen from '../screens/profile/SettingsScreen';

// Create navigators
const RootStack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const ProductsStack = createNativeStackNavigator<ProductsStackParamList>();
const OrdersStack = createNativeStackNavigator<OrdersStackParamList>();
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

// Auth navigator
const AuthNavigator = () => {
    return (
        <AuthStack.Navigator screenOptions={{headerShown: false}}>
            <AuthStack.Screen name="Login" component={LoginScreen}/>
            <AuthStack.Screen name="Register" component={RegisterScreen}/>
            <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen}/>
        </AuthStack.Navigator>
    );
};

// Home stack navigator
const HomeStackNavigator = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={HomeScreen} options={{title: 'Home'}}/>
            <HomeStack.Screen
                name="ProductDetails"
                component={ProductDetailsScreen}
                options={{title: 'Product Details'}}
            />
            <HomeStack.Screen
                name="CategoryProducts"
                component={CategoryProductsScreen}
                options={({route}) => ({title: route.params.category})}
            />
            <HomeStack.Screen name="Search" component={SearchScreen} options={{title: 'Search'}}/>
        </HomeStack.Navigator>
    );
};

// Products stack navigator
const ProductsStackNavigator = () => {
    return (
        <ProductsStack.Navigator>
            <ProductsStack.Screen name="Products" component={ProductsScreen} options={{title: 'Products'}}/>
            <ProductsStack.Screen
                name="ProductDetails"
                component={ProductDetailsScreen}
                options={{title: 'Product Details'}}
            />
            <ProductsStack.Screen
                name="CategoryProducts"
                component={CategoryProductsScreen}
                options={({route}) => ({title: route.params.category})}
            />
            <ProductsStack.Screen name="Search" component={SearchScreen} options={{title: 'Search'}}/>
        </ProductsStack.Navigator>
    );
};

// Orders stack navigator
const OrdersStackNavigator = () => {
    return (
        <OrdersStack.Navigator>
            <OrdersStack.Screen name="Orders" component={OrdersScreen} options={{title: 'My Orders'}}/>
            {/*<OrdersStack.Screen*/}
            {/*    name="OrderDetails"*/}
            {/*    // component={OrderDetailsScreen}*/}
            {/*    options={{title: 'Order Details'}}*/}
            {/*/>*/}
            <OrdersStack.Screen name="Checkout" component={CheckoutScreen} options={{title: 'Checkout'}}/>
            <OrdersStack.Screen
                name="PaymentSuccess"
                component={PaymentSuccessScreen}
                options={{title: 'Payment Successful'}}
            />
        </OrdersStack.Navigator>
    );
};

// Profile stack navigator
const ProfileStackNavigator = () => {
    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen name="Profile" component={ProfileScreen} options={{title: 'My Profile'}}/>
            <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} options={{title: 'Edit Profile'}}/>
            <ProfileStack.Screen name="Addresses" component={AddressesScreen} options={{title: 'My Addresses'}}/>
            <ProfileStack.Screen name="AddAddress" component={AddAddressScreen} options={{title: 'Add Address'}}/>
            <ProfileStack.Screen
                name="EditAddress"
                component={EditAddressScreen}
                options={{title: 'Edit Address'}}
            />
            <ProfileStack.Screen name="Settings" component={SettingsScreen} options={{title: 'Settings'}}/>
            <ProfileStack.Screen name="About" component={AboutScreen} options={{title: 'About'}}/>
        </ProfileStack.Navigator>
    );
};

// Main tab navigator
const MainTabNavigator = () => {
    return (
        <MainTab.Navigator
            screenOptions={({route}) => {
                return ({
                    tabBarIcon: ({color, size}) => {
                        let iconName = '';

                        if (route.name === 'HomeTab') {
                            iconName = 'home';
                        } else if (route.name === 'ProductsTab') {
                            iconName = 'shopping-bag';
                        } else if (route.name === 'CartTab') {
                            iconName = 'shopping-cart';
                        } else if (route.name === 'OrdersTab') {
                            iconName = 'receipt';
                        } else if (route.name === 'ProfileTab') {
                            iconName = 'person';
                        }

                        return <Icon name={iconName} size={size} color={color}/>;
                    },
                    tabBarActiveTintColor: '#007BFF',
                    tabBarInactiveTintColor: 'gray',
                });
            }}
        >
            <MainTab.Screen
                name="HomeTab"
                component={HomeStackNavigator}
                options={{headerShown: false, title: 'Home'}}
            />
            <MainTab.Screen
                name="ProductsTab"
                component={ProductsStackNavigator}
                options={{headerShown: false, title: 'Products'}}
            />
            <MainTab.Screen
                name="CartTab"
                component={CartScreen}
                options={{title: 'Cart'}}
            />
            <MainTab.Screen
                name="OrdersTab"
                component={OrdersStackNavigator}
                options={{headerShown: false, title: 'Orders'}}
            />
            <MainTab.Screen
                name="ProfileTab"
                component={ProfileStackNavigator}
                options={{headerShown: false, title: 'Profile'}}
            />
        </MainTab.Navigator>
    );
};

// Root navigator
const AppNavigator = () => {
    // This would be replaced with actual auth state
    const isAuthenticated = false;

    return (
        <NavigationContainer>
            <RootStack.Navigator screenOptions={{headerShown: false}}>
                {/*{isAuthenticated ? (*/}
                {/*    <RootStack.Screen name="Main" component={MainTabNavigator}/>*/}
                {/*) : (*/}
                {/*    <RootStack.Screen name="Auth" component={AuthNavigator}/>*/}
                {/*)}*/}
                <RootStack.Screen name="Main" component={MainTabNavigator}/>
                <RootStack.Screen
                    name="ForgotPassword"
                    component={ForgotPasswordScreen}
                    options={{headerShown: true, title: 'Forgot Password'}}
                />
                <RootStack.Screen
                    name="ProductDetails"
                    component={ProductDetailsScreen}
                    options={{headerShown: true, title: 'Product Details'}}
                />
                <RootStack.Screen
                    name="Checkout"
                    component={CheckoutScreen}
                    options={{headerShown: true, title: 'Checkout'}}
                />
                <RootStack.Screen
                    name="PaymentSuccess"
                    component={PaymentSuccessScreen}
                    options={{headerShown: true, title: 'Payment Successful'}}
                />
            </RootStack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
