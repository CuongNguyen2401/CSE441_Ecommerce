import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
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
  View
} from 'tamagui';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Mock data for demonstration
const cartItems = [
  { 
    id: 1, 
    name: 'Wireless Headphones', 
    price: 149.99, 
    quantity: 1, 
    image: 'https://placekitten.com/200/200',
  },
  { 
    id: 2, 
    name: 'Bluetooth Speaker', 
    price: 79.99, 
    quantity: 2, 
    image: 'https://placekitten.com/201/201',
  }
];

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
    isDefault: true
  }
];

const paymentMethods = [
  { id: 'credit', name: 'Credit Card' },
  { id: 'paypal', name: 'PayPal' },
  { id: 'applepay', name: 'Apple Pay' }
];

const CheckoutScreen = () => {
  const navigation = useNavigation();
  const [selectedAddress, setSelectedAddress] = useState(addresses[0]?.id);
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [saveCard, setSaveCard] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculate order summary
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shippingCost = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.085;
  const total = subtotal + shippingCost + tax;

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      navigation.navigate('PaymentSuccess', { orderId: Math.floor(Math.random() * 1000000) });
    }, 2000);
  };

  const handleAddAddress = () => {
    navigation.navigate('AddAddress');
  };

  return (
    <ScrollView flex={1} backgroundColor="$background">
      <YStack padding="$4" space="$4">
        <H4>Checkout</H4>

        {/* Order Summary */}
        <Card bordered padding="$3">
          <YStack space="$2">
            <Text fontSize="$3" fontWeight="bold">Order Summary</Text>
            
            <YStack space="$2">
              {cartItems.map(item => (
                <XStack key={item.id} space="$3">
                  <Image
                    source={{ uri: item.image }}
                    width={50}
                    height={50}
                    resizeMode="cover"
                    borderRadius="$2"
                  />
                  <YStack flex={1}>
                    <Text fontSize="$3" numberOfLines={1}>{item.name}</Text>
                    <Text fontSize="$2" color="$gray10">Qty: {item.quantity}</Text>
                  </YStack>
                  <Text fontSize="$3" fontWeight="bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </Text>
                </XStack>
              ))}
            </YStack>
            
            <Separator marginVertical="$1" />
            
            <XStack justifyContent="space-between">
              <Text fontSize="$3" color="$gray10">Subtotal</Text>
              <Text fontSize="$3">${subtotal.toFixed(2)}</Text>
            </XStack>
            
            <XStack justifyContent="space-between">
              <Text fontSize="$3" color="$gray10">Shipping</Text>
              <Text fontSize="$3">
                {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
              </Text>
            </XStack>
            
            <XStack justifyContent="space-between">
              <Text fontSize="$3" color="$gray10">Tax</Text>
              <Text fontSize="$3">${tax.toFixed(2)}</Text>
            </XStack>
            
            <Separator marginVertical="$1" />
            
            <XStack justifyContent="space-between">
              <Text fontSize="$4" fontWeight="bold">Total</Text>
              <Text fontSize="$4" fontWeight="bold" color="$blue10">
                ${total.toFixed(2)}
              </Text>
            </XStack>
          </YStack>
        </Card>

        {/* Shipping Address */}
        <Card bordered padding="$3">
          <YStack space="$3">
            <XStack justifyContent="space-between" alignItems="center">
              <Text fontSize="$3" fontWeight="bold">Shipping Address</Text>
              <Button size="$2" onPress={handleAddAddress}>
                <Icon name="add" size={16} />
                <Text>Add New</Text>
              </Button>
            </XStack>

            {addresses.length === 0 ? (
              <Text fontSize="$3" color="$gray10">No addresses saved</Text>
            ) : (
              <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
                <YStack space="$2">
                  {addresses.map(address => (
                    <XStack key={address.id} space="$2" alignItems="flex-start">
                      <RadioGroup.Item value={address.id} id={`address-${address.id}`}>
                        <RadioGroup.Indicator />
                      </RadioGroup.Item>
                      <YStack flex={1}>
                        <Text fontSize="$3" fontWeight="bold">{address.name}</Text>
                        <Text fontSize="$2">{address.street}</Text>
                        <Text fontSize="$2">{`${address.city}, ${address.state} ${address.zip}`}</Text>
                        <Text fontSize="$2">{address.country}</Text>
                        <Text fontSize="$2">{address.phone}</Text>
                        {address.isDefault && (
                          <Text fontSize="$2" color="$blue10" marginTop="$1">Default Address</Text>
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
          <YStack space="$3">
            <Text fontSize="$3" fontWeight="bold">Payment Method</Text>
            
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <YStack space="$2">
                {paymentMethods.map(method => (
                  <XStack key={method.id} space="$2" alignItems="center">
                    <RadioGroup.Item value={method.id} id={`payment-${method.id}`}>
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
                <YStack space="$3" marginTop="$2">
                  <YStack space="$1">
                    <Label htmlFor="cardNumber" fontSize="$2">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChangeText={setCardNumber}
                      keyboardType="number-pad"
                    />
                  </YStack>
                  
                  <YStack space="$1">
                    <Label htmlFor="cardName" fontSize="$2">Name on Card</Label>
                    <Input
                      id="cardName"
                      placeholder="John Doe"
                      value={cardName}
                      onChangeText={setCardName}
                    />
                  </YStack>
                  
                  <XStack space="$2">
                    <YStack space="$1" flex={1}>
                      <Label htmlFor="cardExpiry" fontSize="$2">Expiry Date</Label>
                      <Input
                        id="cardExpiry"
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChangeText={setCardExpiry}
                      />
                    </YStack>
                    
                    <YStack space="$1" flex={1}>
                      <Label htmlFor="cardCvv" fontSize="$2">CVV</Label>
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
                  
                  <XStack space="$2" alignItems="center">
                    <Checkbox 
                      id="saveCard" 
                      checked={saveCard} 
                      onCheckedChange={(checked) => setSaveCard(!!checked)}
                    >
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
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Place Order'}
        </Button>
      </YStack>
    </ScrollView>
  );
};

export default CheckoutScreen;