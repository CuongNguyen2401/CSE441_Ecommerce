import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { lazy } from 'react';
import { NavigationRoutes, OrdersStackParamList } from '../types';
import OrdersScreen from '@screens/orders/OrdersScreen';
const CheckoutScreen = lazy(() => import('@screens/cart/CheckoutScreen'));
const PaymentSuccessScreen = lazy(() => import('@screens/cart/PaymentSuccessScreen'));

const OrdersStack = createNativeStackNavigator<OrdersStackParamList>();

const OrdersStackNavigator = () => {
  return (
    <OrdersStack.Navigator>
      <OrdersStack.Screen
        name={NavigationRoutes.ORDERS}
        component={OrdersScreen}
        options={{title: 'My Orders'}}
      />
      {/*<OrdersStack.Screen*/}
      {/*    name="OrderDetails"*/}
      {/*    // component={OrderDetailsScreen}*/}
      {/*    options={{title: 'Order Details'}}*/}
      {/*/>*/}
      <OrdersStack.Screen
        name={NavigationRoutes.CHECKOUT}  
        component={CheckoutScreen}
        options={{title: 'Checkout'}}
      />
      <OrdersStack.Screen
        name={NavigationRoutes.PAYMENT_SUCCESS}  
        component={PaymentSuccessScreen}
        options={{title: 'Payment Successful'}}
      />
    </OrdersStack.Navigator>
  );
};

export default OrdersStackNavigator;
