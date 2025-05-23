import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {lazy} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {MainTabParamList, NavigationRoutes} from '../types';

// Import navigators
import HomeStackNavigator from './HomeStackNavigator';
import ProductsStackNavigator from './ProductsStackNavigator';
import OrdersStackNavigator from './OrdersStackNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';

// Lazy load screens
const CartScreen = lazy(() => import('@screens/User/cart/CartScreen'));

const MainTab = createBottomTabNavigator<MainTabParamList>();

// Tab bar icon component
const getTabBarIcon = (route: string, color: string, size: number) => {
  let iconName = '';

  if (route === NavigationRoutes.HOME_TAB) {
    iconName = 'home';
  } else if (route === NavigationRoutes.PRODUCTS_TAB) {
    iconName = 'shopping-bag';
  } else if (route === NavigationRoutes.CART_TAB) {
    iconName = 'shopping-cart';
  } else if (route === NavigationRoutes.ORDERS_TAB) {
    iconName = 'receipt';
  } else if (route === NavigationRoutes.PROFILE_TAB) {
    iconName = 'person';
  }

  return <Icon name={iconName} size={size} color={color} />;
};

const MainTabNavigator = () => {
  return (
    <MainTab.Navigator
      screenOptions={({route}) => {
        return {
          tabBarIcon: ({color, size}) => getTabBarIcon(route.name, color, size),
          tabBarActiveTintColor: '#007BFF',
          tabBarInactiveTintColor: 'gray',
        };
      }}>
      <MainTab.Screen
        name={NavigationRoutes.HOME_TAB}
        component={HomeStackNavigator}
        options={{headerShown: false, title: 'Home'}}
      />
      <MainTab.Screen
        name={NavigationRoutes.PRODUCTS_TAB}
        component={ProductsStackNavigator}
        options={{headerShown: false, title: 'Products'}}
      />
      <MainTab.Screen
        name={NavigationRoutes.CART_TAB}
        component={CartScreen}
        options={{title: 'Cart'}}
      />
      <MainTab.Screen
        name={NavigationRoutes.ORDERS_TAB}
        component={OrdersStackNavigator}
        options={{headerShown: false, title: 'Orders'}}
      />
      <MainTab.Screen
        name={NavigationRoutes.PROFILE_TAB}
        component={ProfileStackNavigator}
        options={{headerShown: false, title: 'Profile'}}
      />
    </MainTab.Navigator>
  );
};

export default MainTabNavigator;
