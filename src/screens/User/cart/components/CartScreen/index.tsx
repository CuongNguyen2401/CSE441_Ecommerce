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
  Spinner,
} from 'tamagui';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {NavigationRoutes} from 'navigation/types';
import {useCartScreen} from '../../useCartScreen';
import {useValidateCoupon} from 'queries/order/useValidateCoupon';
import {useOrderStore} from 'store/order/useOrderStore';

const CartScreen = () => {
  const navigation = useNavigation();
  const [promoCode, setPromoCode] = useState('');

  // Get cart data from store
  const {
    orderItems: items,
    subtotal,
    removeItem,
    updateItemQuantity,
    couponCode: appliedCouponCode,
  } = useOrderStore();

  // Coupon validation
  const {
    validateCoupon,
    validCoupon,
    isValidating: isValidatingCoupon,
    error: couponError,
    clearError,
  } = useValidateCoupon();

  // Calculate additional costs
  const shippingCost = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const promoDiscount = validCoupon
    ? subtotal * (validCoupon.discount || 0)
    : 0;
  const total = subtotal + shippingCost + tax - promoDiscount;

  const handleQuantityChange = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateItemQuantity(index, newQuantity);
  };

  const handleRemoveItem = (index: number) => {
    removeItem(index);
  };

  const handleApplyPromo = () => {
    clearError();
    validateCoupon(promoCode);
  };

  // Apply the coupon after validation
  React.useEffect(() => {
    if (validCoupon) {
      // Update the coupon code in store
      useOrderStore.setState({couponCode: validCoupon.code});
      setPromoCode('');
    }
  }, [validCoupon]);

  const removePromo = () => {
    useOrderStore.setState({couponCode: ''});
    setPromoCode('');
  };

  const handleCheckout = () => {
    navigation.navigate(NavigationRoutes.CHECKOUT);
  };

  const handleContinueShopping = () => {
    navigation.navigate(NavigationRoutes.MAIN, {
      screen: NavigationRoutes.HOME_TAB,
      params: {screen: NavigationRoutes.HOME},
    });
  };

  return (
    <YStack flex={1} backgroundColor="$background">
      <ScrollView flex={1}>
        <YStack padding="$4" gap="$4">
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
                onPress={handleContinueShopping}>
                Start Shopping
              </Button>
            </YStack>
          ) : (
            <>
              {/* Cart Items */}
              <YStack gap="$3">
                {items.map((item, index) => (
                  <Card key={`item-${index}`} bordered padding="$3">
                    <XStack gap="$3">
                      <Image
                        source={{uri: item.image}}
                        width={80}
                        height={80}
                        objectFit="cover"
                        borderRadius="$2"
                      />
                      <YStack flex={1} gap="$1">
                        <Text fontSize="$3" fontWeight="bold" numberOfLines={1}>
                          {item.productName}
                        </Text>
                        <Text fontSize="$4" color="$blue10" fontWeight="bold">
                          ${(item.price || 0).toFixed(2)}
                        </Text>

                        <XStack
                          justifyContent="space-between"
                          alignItems="center"
                          marginTop="$2">
                          <XStack alignItems="center" gap="$1">
                            <Button
                              size="$2"
                              onPress={() =>
                                handleQuantityChange(
                                  index,
                                  (item.quantity || 1) - 1,
                                )
                              }
                              disabled={(item.quantity || 1) <= 1}>
                              <Icon name="remove" size={16} />
                            </Button>
                            <Text fontSize="$3" width={30} textAlign="center">
                              {item.quantity || 1}
                            </Text>
                            <Button
                              size="$2"
                              onPress={() =>
                                handleQuantityChange(
                                  index,
                                  (item.quantity || 1) + 1,
                                )
                              }>
                              <Icon name="add" size={16} />
                            </Button>
                          </XStack>

                          <Button
                            size="$2"
                            variant="outlined"
                            onPress={() => handleRemoveItem(index)}>
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
                <YStack gap="$2">
                  <Text fontSize="$3" fontWeight="bold">
                    Promo Code
                  </Text>
                  <XStack gap="$2">
                    <Input
                      flex={1}
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChangeText={setPromoCode}
                    />
                    <Button
                      onPress={handleApplyPromo}
                      disabled={isValidatingCoupon || !promoCode.trim()}>
                      {isValidatingCoupon ? <Spinner size="small" /> : 'Apply'}
                    </Button>
                  </XStack>
                  {couponError && (
                    <Text fontSize="$2" color="$red10">
                      {couponError}
                    </Text>
                  )}
                  {appliedCouponCode && (
                    <XStack gap="$2" alignItems="center">
                      <Text fontSize="$2" color="$green10">
                        Promo code '{appliedCouponCode}' applied!
                      </Text>
                      <Button
                        size="$1"
                        variant="outlined"
                        onPress={removePromo}>
                        <Icon name="close" size={14} />
                      </Button>
                    </XStack>
                  )}
                </YStack>
              </Card>
              {/* Order Summary */}
              <Card bordered padding="$3">
                <YStack gap="$2">
                  <Text fontSize="$3" fontWeight="bold">
                    Order Summary
                  </Text>

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
                      {shippingCost === 0
                        ? 'Free'
                        : `$${shippingCost.toFixed(2)}`}
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
              {/* Checkout Button */}
              <Button
                size="$4"
                themeInverse
                onPress={handleCheckout}
                marginTop="$2"
                disabled={items.length === 0}>
                Proceed to Checkout
              </Button>
              <Button
                variant="outlined"
                size="$4"
                onPress={handleContinueShopping}
                marginTop="$2">
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
