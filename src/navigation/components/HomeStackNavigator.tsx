import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {lazy} from 'react';
import {HomeStackParamList, NavigationRoutes} from '../types';
import HomeScreen from '@screens/User/home/HomeScreen';

// Lazy load secondary screens
const ProductDetailsScreen = lazy(
  () => import('@screens/User/products/components/ProductDetailScreen'),
);
const CategoryProductsScreen = lazy(
  () => import('@screens/User/products/components/CategoryProductScreen'),
);
// const SearchScreen = lazy(() => import('@screens/products/SearchScreen'));

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name={NavigationRoutes.HOME}
        component={HomeScreen}
        options={{title: 'Home'}}
      />
      <HomeStack.Screen
        name={NavigationRoutes.PRODUCT_DETAILS}
        component={ProductDetailsScreen}
        options={{title: 'Product Details'}}
      />
      <HomeStack.Screen
        name={NavigationRoutes.CATEGORY_PRODUCTS}
        component={CategoryProductsScreen}
        options={({route}) => ({title: route.params.category})}
      />
      {/* <HomeStack.Screen name="Search" component={SearchScreen} options={{ title: 'Search' }} /> */}
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
