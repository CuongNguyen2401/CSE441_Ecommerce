import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {NavigationRoutes} from 'navigation/types';
import {orderApis} from 'queries/cart';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Button, Card, Circle, H2, Text, YStack, Spinner} from 'tamagui';

type PaymentSuccessParams = {
  orderId: number;
};

const PaymentSuccessScreen = () => {
  const navigation = useNavigation();
  const route =
    useRoute<RouteProp<Record<string, PaymentSuccessParams>, string>>();
  const {orderId} = route.params as PaymentSuccessParams;

  const [isLoading, setIsLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const formattedOrderId = `#${orderId.toString().padStart(6, '0')}`;

  // In a real application, this would use a proper query hook
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setIsLoading(true);
        const response = await orderApis.getOrderById(orderId.toString());
        setOrderDetails(response.data);
        setError(null);
      } catch (err: any) {
        console.error('Failed to fetch order details:', err);
        setError('Could not load order details');
      } finally {
        setIsLoading(false);
      }
    };

    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

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

      {isLoading ? (
        <Card
          bordered
          width="100%"
          padding="$4"
          alignItems="center"
          justifyContent="center"
          height={200}>
          <Spinner size="large" />
          <Text fontSize="$3" marginTop="$2">
            Loading order details...
          </Text>
        </Card>
      ) : error ? (
        <Card bordered width="100%" padding="$4">
          <Text color="$red10">{error}</Text>
        </Card>
      ) : (
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
              <Text fontSize="$3">
                {orderDetails?.paymentMethod || 'Credit Card (•••• 1234)'}
              </Text>
            </YStack>

            <YStack gap="$1">
              <Text fontSize="$2" color="$gray10">
                Shipping Address
              </Text>
              {orderDetails?.shippingAddress ? (
                <>
                  <Text fontSize="$3">{orderDetails.shippingAddress.name}</Text>
                  <Text fontSize="$3">
                    {orderDetails.shippingAddress.street}
                  </Text>
                  <Text fontSize="$3">
                    {`${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.state} ${orderDetails.shippingAddress.zip}`}
                  </Text>
                  <Text fontSize="$3">
                    {orderDetails.shippingAddress.country}
                  </Text>
                </>
              ) : (
                <Text fontSize="$3">Address information not available</Text>
              )}
            </YStack>

            {orderDetails?.orderItems && (
              <YStack gap="$1">
                <Text fontSize="$2" color="$gray10">
                  Order Items
                </Text>
                <Text fontSize="$3">
                  {orderDetails.orderItems.length} items
                </Text>
                <Text fontSize="$3" fontWeight="bold" color="$blue10">
                  Total: ${orderDetails.total?.toFixed(2) || '0.00'}
                </Text>
              </YStack>
            )}
          </YStack>
        </Card>
      )}

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
