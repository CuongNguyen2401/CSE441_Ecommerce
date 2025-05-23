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
  View,
  Spinner,
} from 'tamagui';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {NavigationRoutes} from 'navigation/types';
import {useCart} from 'context/CartContext';
import {useValidateCoupon} from 'queries/cart';

const CartScreen = () => {
  const navigation = useNavigation();
  const {
    state: {
      items,
      subtotal,
      shippingCost,
      tax,
      promoDiscount,
      total,
      promoCode: appliedPromoCode,
    },
    removeItem,
    updateItemQuantity,
    applyPromo,
    removePromo,
  } = useCart();

  const [promoCode, setPromoCode] = useState('');
  const {
    validateCoupon,
    isValidating,
    error: couponError,
    validCoupon,
    clearError,
  } = useValidateCoupon();

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateItemQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id: number) => {
    removeItem(id);
  };

  const handleApplyPromo = () => {
    clearError();
    validateCoupon(promoCode);
  };

  // Apply the coupon after validation
  React.useEffect(() => {
    if (validCoupon) {
      applyPromo(validCoupon.code, subtotal * validCoupon.discount);
    }
  }, [validCoupon, subtotal, applyPromo]);

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
                {items.map(item => (
                  <Card key={item.id} bordered padding="$3">
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
                          {item.name}
                        </Text>
                        {item.color && (
                          <Text fontSize="$2" color="$gray10">
                            Color: {item.color}
                          </Text>
                        )}
                        <Text fontSize="$4" color="$blue10" fontWeight="bold">
                          ${(item.salePrice || item.price).toFixed(2)}
                        </Text>

                        {!item.inStock && (
                          <Text fontSize="$2" color="$red10">
                            Out of Stock
                          </Text>
                        )}

                        <XStack
                          justifyContent="space-between"
                          alignItems="center"
                          marginTop="$2">
                          <XStack alignItems="center" gap="$1">
                            <Button
                              size="$2"
                              onPress={() =>
                                handleQuantityChange(item.id, item.quantity - 1)
                              }
                              disabled={item.quantity <= 1}>
                              <Icon name="remove" size={16} />
                            </Button>
                            <Text fontSize="$3" width={30} textAlign="center">
                              {item.quantity}
                            </Text>
                            <Button
                              size="$2"
                              onPress={() =>
                                handleQuantityChange(item.id, item.quantity + 1)
                              }>
                              <Icon name="add" size={16} />
                            </Button>
                          </XStack>

                          <Button
                            size="$2"
                            variant="outlined"
                            onPress={() => handleRemoveItem(item.id)}>
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
                      disabled={isValidating || !promoCode.trim()}>
                      {isValidating ? <Spinner size="small" /> : 'Apply'}
                    </Button>
                  </XStack>

                  {couponError && (
                    <Text fontSize="$2" color="$red10">
                      {couponError}
                    </Text>
                  )}

                  {appliedPromoCode && (
                    <XStack gap="$2" alignItems="center">
                      <Text fontSize="$2" color="$green10">
                        Promo code '{appliedPromoCode}' applied!
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
