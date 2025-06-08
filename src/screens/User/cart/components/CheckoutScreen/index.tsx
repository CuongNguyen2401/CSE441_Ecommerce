import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  YStack,
  XStack,
  Text,
  Button,
  ScrollView,
  Image,
  Card,
  H4,
  Separator,
  Input,
  Label,
  RadioGroup,
  Checkbox,
  Form,
  View,
  Spinner,
} from 'tamagui';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {NavigationRoutes} from 'navigation/types';
import {useOrderStore} from 'store/order/useOrderStore';
import {useCreateOrder} from 'queries/order/useCreateOrder';
import {OrderPayload} from 'queries/order/types';
import {Alert} from 'react-native';

// Mock addresses for demonstration until user profile integration
const addresses = [
  {
    id: 1,
    name: 'John Doe',
    street: '123 Main St',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    country: 'United States',
    phone: '(555) 123-4567',
    isDefault: true,
  },
];

const paymentMethods = [
  {id: 'credit', name: 'Credit Card'},
  {id: 'paypal', name: 'PayPal'},
  {id: 'applepay', name: 'Apple Pay'},
];

const CheckoutScreen = () => {
  const navigation = useNavigation();
  const {
    orderItems,
    subtotal,
    couponCode,
    customerName,
    email,
    phoneNumber,
    address,
    note,
    clearCart,
  } = useOrderStore();

  const [selectedAddress, setSelectedAddress] = useState(
    addresses[0]?.id.toString(),
  );
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [saveCard, setSaveCard] = useState(false);

  const {createOrder, isCreating, error} = useCreateOrder(); // Calculate totals
  const shippingCost: number = 0; // Free shipping for now
  const tax: number = subtotal * 0.1; // 10% tax
  const promoDiscount: number = 0; // No promo discount for now (until coupon validation is implemented)
  const total: number = subtotal + shippingCost + tax - promoDiscount;

  const handleAddAddress = () => {
    navigation.navigate(NavigationRoutes.MAIN, {
      screen: NavigationRoutes.PROFILE_TAB,
      params: {screen: NavigationRoutes.ADD_ADDRESS},
    });
  };
  const prepareOrderData = (): OrderPayload => {
    const selectedAddressObj = addresses.find(
      addr => addr.id.toString() === selectedAddress,
    );

    if (!selectedAddressObj) {
      throw new Error('No shipping address selected');
    }

    return {
      customerName: selectedAddressObj.name,
      email: email || 'customer@example.com', // Fallback email
      phoneNumber: selectedAddressObj.phone,
      address: `${selectedAddressObj.street}, ${selectedAddressObj.city}, ${selectedAddressObj.state} ${selectedAddressObj.zip}, ${selectedAddressObj.country}`,
      note: note || '',
      couponCode: couponCode || '',
      orderItems: orderItems,
    };
  };
  const handlePlaceOrder = () => {
    try {
      // Validate inputs
      if (paymentMethod === 'credit') {
        if (!cardNumber || !cardName || !cardExpiry || !cardCvv) {
          Alert.alert('Validation Error', 'Please fill in all card details');
          return;
        }
      }

      if (orderItems.length === 0) {
        Alert.alert('Cart Empty', 'Your cart is empty');
        return;
      }

      const orderData = prepareOrderData();

      // Create the order
      createOrder(orderData, {
        onSuccess: response => {
          // Clear the cart after successful order creation
          clearCart();

          // Navigate to success screen
          navigation.navigate(NavigationRoutes.PAYMENT_SUCCESS, {
            orderId: response.id || 1, // Fallback orderId if response doesn't have id
          });
        },
        onError: err => {
          Alert.alert(
            'Order Failed',
            err.response?.data?.message || 'Failed to create order',
          );
        },
      });
    } catch (error: any) {
      Alert.alert('Error', error.message || 'An error occurred');
    }
  };

  return (
    <ScrollView flex={1} backgroundColor="$background">
      <YStack padding="$4" gap="$4">
        <H4>Checkout</H4>
        {/* Order Summary */}
        <Card bordered padding="$3">
          <YStack gap="$2">
            <Text fontSize="$3" fontWeight="bold">
              Order Summary
            </Text>
            <YStack gap="$2">
              {orderItems.map((item, index) => (
                <XStack key={index} gap="$3">
                  <Image
                    source={{uri: item.image}}
                    width={50}
                    height={50}
                    objectFit="cover"
                    borderRadius="$2"
                  />
                  <YStack flex={1}>
                    <Text fontSize="$3" numberOfLines={1}>
                      {item.productName}
                    </Text>
                    <Text fontSize="$2" color="$gray10">
                      Qty: {item.quantity}
                    </Text>
                  </YStack>
                  <Text fontSize="$3" fontWeight="bold">
                    ${((item.price || 0) * (item.quantity || 0)).toFixed(2)}
                  </Text>
                </XStack>
              ))}
            </YStack>
            <Separator marginVertical="$1" />
            <XStack justifyContent="space-between">
              <Text fontSize="$3" color="$gray10">
                Subtotal
              </Text>
              <Text fontSize="$3">${subtotal.toFixed(2)}</Text>
            </XStack>
            <XStack justifyContent="space-between">
              <Text fontSize="$3" color="$gray10">
                Shipping
              </Text>
              <Text fontSize="$3">
                {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
              </Text>
            </XStack>
            <XStack justifyContent="space-between">
              <Text fontSize="$3" color="$gray10">
                Tax
              </Text>
              <Text fontSize="$3">${tax.toFixed(2)}</Text>
            </XStack>
            {promoDiscount > 0 && (
              <XStack justifyContent="space-between">
                <Text fontSize="$3" color="$green10">
                  Discount
                </Text>
                <Text fontSize="$3" color="$green10">
                  -${promoDiscount.toFixed(2)}
                </Text>
              </XStack>
            )}
            <Separator marginVertical="$1" />
            <XStack justifyContent="space-between">
              <Text fontSize="$4" fontWeight="bold">
                Total
              </Text>
              <Text fontSize="$4" fontWeight="bold" color="$blue10">
                ${total.toFixed(2)}
              </Text>
            </XStack>
          </YStack>
        </Card>
        {/* Shipping Address */}
        <Card bordered padding="$3">
          <YStack gap="$3">
            <XStack justifyContent="space-between" alignItems="center">
              <Text fontSize="$3" fontWeight="bold">
                Shipping Address
              </Text>
              <Button size="$2" onPress={handleAddAddress}>
                <Icon name="add" size={16} />
                <Text>Add New</Text>
              </Button>
            </XStack>

            {addresses.length === 0 ? (
              <Text fontSize="$3" color="$gray10">
                No addresses saved
              </Text>
            ) : (
              <RadioGroup
                value={selectedAddress}
                onValueChange={setSelectedAddress}>
                <YStack gap="$2">
                  {addresses.map(address => (
                    <XStack key={address.id} gap="$2" alignItems="flex-start">
                      <RadioGroup.Item
                        value={address.id.toString()}
                        id={`address-${address.id}`}>
                        <RadioGroup.Indicator />
                      </RadioGroup.Item>
                      <YStack flex={1}>
                        <Text fontSize="$3" fontWeight="bold">
                          {address.name}
                        </Text>
                        <Text fontSize="$2">{address.street}</Text>
                        <Text fontSize="$2">{`${address.city}, ${address.state} ${address.zip}`}</Text>
                        <Text fontSize="$2">{address.country}</Text>
                        <Text fontSize="$2">{address.phone}</Text>
                        {address.isDefault && (
                          <Text fontSize="$2" color="$blue10" marginTop="$1">
                            Default Address
                          </Text>
                        )}
                      </YStack>
                    </XStack>
                  ))}
                </YStack>
              </RadioGroup>
            )}
          </YStack>
        </Card>
        {/* Payment Method */}
        <Card bordered padding="$3">
          <YStack gap="$3">
            <Text fontSize="$3" fontWeight="bold">
              Payment Method
            </Text>

            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <YStack gap="$2">
                {paymentMethods.map(method => (
                  <XStack key={method.id} gap="$2" alignItems="center">
                    <RadioGroup.Item
                      value={method.id}
                      id={`payment-${method.id}`}>
                      <RadioGroup.Indicator />
                    </RadioGroup.Item>
                    <Label htmlFor={`payment-${method.id}`} fontSize="$3">
                      {method.name}
                    </Label>
                  </XStack>
                ))}
              </YStack>
            </RadioGroup>

            {paymentMethod === 'credit' && (
              <Form>
                <YStack gap="$3" marginTop="$2">
                  <YStack gap="$1">
                    <Label htmlFor="cardNumber" fontSize="$2">
                      Card Number
                    </Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChangeText={setCardNumber}
                      keyboardType="number-pad"
                    />
                  </YStack>

                  <YStack gap="$1">
                    <Label htmlFor="cardName" fontSize="$2">
                      Name on Card
                    </Label>
                    <Input
                      id="cardName"
                      placeholder="John Doe"
                      value={cardName}
                      onChangeText={setCardName}
                    />
                  </YStack>

                  <XStack gap="$2">
                    <YStack gap="$1" flex={1}>
                      <Label htmlFor="cardExpiry" fontSize="$2">
                        Expiry Date
                      </Label>
                      <Input
                        id="cardExpiry"
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChangeText={setCardExpiry}
                      />
                    </YStack>

                    <YStack gap="$1" flex={1}>
                      <Label htmlFor="cardCvv" fontSize="$2">
                        CVV
                      </Label>
                      <Input
                        id="cardCvv"
                        placeholder="123"
                        value={cardCvv}
                        onChangeText={setCardCvv}
                        keyboardType="number-pad"
                        secureTextEntry
                      />
                    </YStack>
                  </XStack>

                  <XStack gap="$2" alignItems="center">
                    <Checkbox
                      id="saveCard"
                      checked={saveCard}
                      onCheckedChange={checked => setSaveCard(!!checked)}>
                      <Checkbox.Indicator>
                        <Text>✓</Text>
                      </Checkbox.Indicator>
                    </Checkbox>
                    <Label htmlFor="saveCard" fontSize="$2">
                      Save card for future payments
                    </Label>
                  </XStack>
                </YStack>
              </Form>
            )}
          </YStack>
        </Card>
        {/* Place Order Button */}
        <Button
          size="$4"
          themeInverse
          onPress={handlePlaceOrder}
          disabled={isCreating || orderItems.length === 0}>
          {isCreating ? (
            <XStack gap="$2" alignItems="center">
              <Spinner size="small" color="$color" />
              <Text>Creating Order...</Text>
            </XStack>
          ) : (
            'Place Order'
          )}
        </Button>
      </YStack>
    </ScrollView>
  );
};

export default CheckoutScreen;
