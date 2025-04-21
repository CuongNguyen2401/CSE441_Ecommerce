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
  View
} from 'tamagui';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Mock data for demonstration
const cartItems = [
  { 
    id: 1, 
    productId: 1,
    name: 'Wireless Headphones', 
    price: 149.99, 
    quantity: 1, 
    image: 'https://placekitten.com/200/200',
    color: 'Black',
    inStock: true
  },
  { 
    id: 2, 
    productId: 3,
    name: 'Bluetooth Speaker', 
    price: 79.99, 
    quantity: 2, 
    image: 'https://placekitten.com/201/201',
    color: 'Blue',
    inStock: true
  },
  { 
    id: 3, 
    productId: 5,
    name: 'Smartphone Case', 
    price: 19.99, 
    quantity: 1, 
    image: 'https://placekitten.com/202/202',
    color: 'Clear',
    inStock: false
  }
];

const CartScreen = () => {
  const navigation = useNavigation();
  const [items, setItems] = useState(cartItems);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);

  // Calculate subtotal
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Shipping cost (free over $100)
  const shippingCost = subtotal > 100 ? 0 : 9.99;
  
  // Tax (8.5%)
  const tax = subtotal * 0.085;
  
  // Total
  const total = subtotal + shippingCost + tax - promoDiscount;

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleRemoveItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleApplyPromo = () => {
    // In a real app, you would validate the promo code with an API
    if (promoCode.toLowerCase() === 'discount20') {
      setPromoApplied(true);
      setPromoDiscount(subtotal * 0.2); // 20% discount
    } else {
      setPromoApplied(false);
      setPromoDiscount(0);
    }
  };

  const handleCheckout = () => {
    navigation.navigate('Checkout');
  };

  const handleContinueShopping = () => {
    navigation.navigate('ProductsTab');
  };

  return (
    <YStack flex={1} backgroundColor="$background">
      <ScrollView flex={1}>
        <YStack padding="$4" space="$4">
          <H4>Shopping Cart ({items.length} items)</H4>

          {items.length === 0 ? (
            <YStack height={300} justifyContent="center" alignItems="center">
              <Icon name="shopping-cart" size={64} color="#ccc" />
              <Text fontSize="$4" color="$gray10" marginTop="$2">
                Your cart is empty
              </Text>
              <Button
                marginTop="$4"
                size="$4"
                themeInverse
                onPress={handleContinueShopping}
              >
                Start Shopping
              </Button>
            </YStack>
          ) : (
            <>
              {/* Cart Items */}
              <YStack space="$3">
                {items.map(item => (
                  <Card key={item.id} bordered padding="$3">
                    <XStack space="$3">
                      <Image
                        source={{ uri: item.image }}
                        width={80}
                        height={80}
                        resizeMode="cover"
                        borderRadius="$2"
                      />
                      <YStack flex={1} space="$1">
                        <Text fontSize="$3" fontWeight="bold" numberOfLines={1}>
                          {item.name}
                        </Text>
                        <Text fontSize="$2" color="$gray10">
                          Color: {item.color}
                        </Text>
                        <Text fontSize="$4" color="$blue10" fontWeight="bold">
                          ${item.price.toFixed(2)}
                        </Text>
                        
                        {!item.inStock && (
                          <Text fontSize="$2" color="$red10">
                            Out of Stock
                          </Text>
                        )}
                        
                        <XStack justifyContent="space-between" alignItems="center" marginTop="$2">
                          <XStack alignItems="center" space="$1">
                            <Button
                              size="$2"
                              onPress={() => handleQuantityChange(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Icon name="remove" size={16} />
                            </Button>
                            <Text fontSize="$3" width={30} textAlign="center">{item.quantity}</Text>
                            <Button
                              size="$2"
                              onPress={() => handleQuantityChange(item.id, item.quantity + 1)}
                            >
                              <Icon name="add" size={16} />
                            </Button>
                          </XStack>
                          
                          <Button
                            size="$2"
                            variant="outlined"
                            onPress={() => handleRemoveItem(item.id)}
                          >
                            <Icon name="delete" size={16} color="$red10" />
                          </Button>
                        </XStack>
                      </YStack>
                    </XStack>
                  </Card>
                ))}
              </YStack>

              {/* Promo Code */}
              <Card bordered padding="$3">
                <YStack space="$2">
                  <Text fontSize="$3" fontWeight="bold">Promo Code</Text>
                  <XStack space="$2">
                    <Input
                      flex={1}
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChangeText={setPromoCode}
                    />
                    <Button onPress={handleApplyPromo}>
                      Apply
                    </Button>
                  </XStack>
                  
                  {promoApplied && (
                    <Text fontSize="$2" color="$green10">
                      Promo code applied! 20% discount.
                    </Text>
                  )}
                </YStack>
              </Card>

              {/* Order Summary */}
              <Card bordered padding="$3">
                <YStack space="$2">
                  <Text fontSize="$3" fontWeight="bold">Order Summary</Text>
                  
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
                  
                  {promoDiscount > 0 && (
                    <XStack justifyContent="space-between">
                      <Text fontSize="$3" color="$green10">Discount</Text>
                      <Text fontSize="$3" color="$green10">-${promoDiscount.toFixed(2)}</Text>
                    </XStack>
                  )}
                  
                  <Separator marginVertical="$1" />
                  
                  <XStack justifyContent="space-between">
                    <Text fontSize="$4" fontWeight="bold">Total</Text>
                    <Text fontSize="$4" fontWeight="bold" color="$blue10">
                      ${total.toFixed(2)}
                    </Text>
                  </XStack>
                </YStack>
              </Card>

              {/* Checkout Button */}
              <Button
                size="$4"
                themeInverse
                onPress={handleCheckout}
                marginTop="$2"
              >
                Proceed to Checkout
              </Button>
              
              <Button
                variant="outlined"
                size="$4"
                onPress={handleContinueShopping}
                marginTop="$2"
              >
                Continue Shopping
              </Button>
            </>
          )}
        </YStack>
      </ScrollView>
    </YStack>
  );
};

export default CartScreen;