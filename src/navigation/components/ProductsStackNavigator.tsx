import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { lazy } from 'react';
import { NavigationRoutes, ProductsStackParamList } from '../types';

// Import base screen
import ProductsScreen from '@screens/User/products/components/ProductScreen';

// Lazy load secondary screens
const ProductDetailsScreen = lazy(() => import('@screens/User/products/components/ProductDetailScreen'));
const CategoryProductsScreen = lazy(() => import('@screens/User/products/components/CategoryProductScreen'));
// const SearchScreen = lazy(() => import('@screen/products/SearchScreen'));

const ProductsStack = createNativeStackNavigator<ProductsStackParamList>();

const ProductsStackNavigator = () => {
  return (
    <ProductsStack.Navigator>
      <ProductsStack.Screen name={NavigationRoutes.PRODUCTS} component={ProductsScreen} options={{ title: 'Products' }} />
      <ProductsStack.Screen
        name={NavigationRoutes.PRODUCT_DETAILS}
        component={ProductDetailsScreen}
        options={{ title: 'Product Details' }}
      />
      <ProductsStack.Screen
        name={NavigationRoutes.CATEGORY_PRODUCTS}
        component={CategoryProductsScreen}
        options={({ route }) => ({ title: route.params.category })}
      />
      {/* <ProductsStack.Screen name="Search" component={SearchScreen} options={{ title: 'Search' }} /> */}
    </ProductsStack.Navigator>
  );
};

export default ProductsStackNavigator;
