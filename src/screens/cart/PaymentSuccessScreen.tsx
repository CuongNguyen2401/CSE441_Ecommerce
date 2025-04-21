import React, { useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { 
  YStack, 
  XStack, 
  Text, 
  Button, 
  Image,
  H2,
  H4,
  Card,
  Circle
} from 'tamagui';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PaymentSuccessScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { orderId } = route.params || { orderId: Math.floor(Math.random() * 1000000) };

  // Format the order ID to be more readable
  const formattedOrderId = `#${orderId.toString().padStart(6, '0')}`;
  
  // Get current date for estimated delivery
  const currentDate = new Date();
  const deliveryDate = new Date(currentDate);
  deliveryDate.setDate(currentDate.getDate() + 5); // Delivery in 5 days
  
  const formattedDeliveryDate = deliveryDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const handleViewOrder = () => {
    navigation.navigate('OrderDetails', { orderId });
  };

  const handleContinueShopping = () => {
    navigation.navigate('HomeTab');
  };

  return (
    <YStack flex={1} backgroundColor="$background" padding="$4" space="$6" justifyContent="center" alignItems="center">
      <YStack alignItems="center" space="$4">
        <Circle size={100} backgroundColor="$green5">
          <Icon name="check-circle" size={60} color="#22C55E" />
        </Circle>
        
        <H2 textAlign="center" color="$green10">Payment Successful!</H2>
        
        <Text fontSize="$3" textAlign="center" color="$gray10">
          Your order has been placed successfully.
        </Text>
      </YStack>

      <Card bordered width="100%" padding="$4">
        <YStack space="$4">
          <YStack space="$1">
            <Text fontSize="$2" color="$gray10">Order ID</Text>
            <Text fontSize="$4" fontWeight="bold">{formattedOrderId}</Text>
          </YStack>
          
          <YStack space="$1">
            <Text fontSize="$2" color="$gray10">Estimated Delivery</Text>
            <Text fontSize="$3">{formattedDeliveryDate}</Text>
          </YStack>
          
          <YStack space="$1">
            <Text fontSize="$2" color="$gray10">Payment Method</Text>
            <Text fontSize="$3">Credit Card (•••• 1234)</Text>
          </YStack>
          
          <YStack space="$1">
            <Text fontSize="$2" color="$gray10">Shipping Address</Text>
            <Text fontSize="$3">John Doe</Text>
            <Text fontSize="$3">123 Main St, New York, NY 10001</Text>
            <Text fontSize="$3">United States</Text>
          </YStack>
        </YStack>
      </Card>

      <YStack space="$3" width="100%">
        <Button
          size="$4"
          themeInverse
          onPress={handleViewOrder}
        >
          View Order
        </Button>
        
        <Button
          variant="outlined"
          size="$4"
          onPress={handleContinueShopping}
        >
          Continue Shopping
        </Button>
      </YStack>

      <YStack alignItems="center" space="$2" marginTop="$4">
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