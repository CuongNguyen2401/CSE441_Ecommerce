import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {NavigationRoutes} from 'navigation/types';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Button, Card, Circle, H2, Text, YStack} from 'tamagui';

type PaymentSuccessParams = {
  orderId: number;
};

const PaymentSuccessScreen = () => {
  const navigation = useNavigation();
  const route =
    useRoute<RouteProp<Record<string, PaymentSuccessParams>, string>>();
  const {orderId} = route.params as PaymentSuccessParams;

  const formattedOrderId = `#${orderId.toString().padStart(6, '0')}`;

  const currentDate = new Date();
  const deliveryDate = new Date(currentDate);
  deliveryDate.setDate(currentDate.getDate() + 5);

  const formattedDeliveryDate = deliveryDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const handleViewOrder = () => {
    navigation.navigate(NavigationRoutes.MAIN, {
      screen: NavigationRoutes.ORDERS_TAB,
      params: {screen: NavigationRoutes.ORDER_DETAILS, params: {orderId}},
    });
  };

  const handleContinueShopping = () => {
    navigation.navigate(NavigationRoutes.MAIN, {
      screen: NavigationRoutes.HOME_TAB,
      params: {screen: NavigationRoutes.HOME},
    });
  };

  return (
    <YStack
      flex={1}
      backgroundColor="$background"
      padding="$4"
      gap="$6"
      justifyContent="center"
      alignItems="center">
      <YStack alignItems="center" gap="$4">
        <Circle size={100} backgroundColor="$green5">
          <Icon name="check-circle" size={60} color="#22C55E" />
        </Circle>

        <H2 textAlign="center" color="$green10">
          Payment Successful!
        </H2>

        <Text fontSize="$3" textAlign="center" color="$gray10">
          Your order has been placed successfully.
        </Text>
      </YStack>

      <Card bordered width="100%" padding="$4">
        <YStack gap="$4">
          <YStack gap="$1">
            <Text fontSize="$2" color="$gray10">
              Order ID
            </Text>
            <Text fontSize="$4" fontWeight="bold">
              {formattedOrderId}
            </Text>
          </YStack>

          <YStack gap="$1">
            <Text fontSize="$2" color="$gray10">
              Estimated Delivery
            </Text>
            <Text fontSize="$3">{formattedDeliveryDate}</Text>
          </YStack>

          <YStack gap="$1">
            <Text fontSize="$2" color="$gray10">
              Payment Method
            </Text>
            <Text fontSize="$3">Credit Card (•••• 1234)</Text>
          </YStack>

          <YStack gap="$1">
            <Text fontSize="$2" color="$gray10">
              Shipping Address
            </Text>
            <Text fontSize="$3">John Doe</Text>
            <Text fontSize="$3">123 Main St, New York, NY 10001</Text>
            <Text fontSize="$3">United States</Text>
          </YStack>
        </YStack>
      </Card>

      <YStack gap="$3" width="100%">
        <Button size="$4" themeInverse onPress={handleViewOrder}>
          View Order
        </Button>

        <Button variant="outlined" size="$4" onPress={handleContinueShopping}>
          Continue Shopping
        </Button>
      </YStack>

      <YStack alignItems="center" gap="$2" marginTop="$4">
        <Text fontSize="$2" color="$gray10">
          A confirmation email has been sent to your email address.
        </Text>
        <Text fontSize="$2" color="$gray10">
          Thank you for shopping with us!
        </Text>
      </YStack>
    </YStack>
  );
};

export default PaymentSuccessScreen;
