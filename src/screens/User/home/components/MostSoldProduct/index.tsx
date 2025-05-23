import React from 'react';
import {Button, Card, H4, Image, Spinner, Text, XStack, YStack} from 'tamagui';
import {useHomeScreen} from '../../useHomeScreen';
import {useNavigation} from '@react-navigation/native';
import {HomeStackParamList, NavigationRoutes} from 'navigation/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useGetMostSoldProducts} from 'queries/product/useGetMostSoldProducts';

export const FeaturedProducts = () => {
  const {mostSoldProducts, isPending} = useGetMostSoldProducts({enabled: true});
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const handleProductPress = (productId: number) => {
    navigation.navigate(NavigationRoutes.PRODUCT_DETAILS, {
      productId,
    });
  };

  const handleSeeAll = () => {
    // Navigate to the Products tab
    navigation.navigate(NavigationRoutes.CATEGORY_PRODUCTS, {
      category: 'All',
    });
  };

  // Handle loading state
  if (isPending) {
    return (
      <YStack height={200} justifyContent="center" alignItems="center">
        <Spinner size="large" color="$blue10" />
      </YStack>
    );
  }

  // Handle empty state
  if (!mostSoldProducts || mostSoldProducts.length === 0) {
    return (
      <YStack height={200} justifyContent="center" alignItems="center">
        <Text color="$gray10">No featured products available</Text>
      </YStack>
    );
  }

  return (
    <YStack>
      <XStack
        justifyContent="space-between"
        alignItems="center"
        marginBottom="$2">
        <H4>Featured Products</H4>
        <Button variant="outlined" onPress={handleSeeAll}>
          <Text color="$blue10">See All</Text>
        </Button>
      </XStack>
      <XStack flexWrap="wrap" justifyContent="space-between">
        {mostSoldProducts.map(product => (
          <Card
            key={product.id}
            elevate
            bordered
            width="48%"
            marginBottom="$3"
            onPress={() => handleProductPress(product.id)}>
            <Image
              source={{uri: product.image}}
              width="100%"
              height={150}
              objectFit="cover"
            />
            <YStack padding="$2" gap="$1">
              <Text fontSize="$3" numberOfLines={1} fontWeight="bold">
                {product.name}
              </Text>
              <Text fontSize="$2" color="$gray10" numberOfLines={1}>
                {product.category.name}
              </Text>
              <Text fontSize="$4" color="$blue10" fontWeight="bold">
                ${product.price.toFixed(2)}
              </Text>
            </YStack>
          </Card>
        ))}
      </XStack>
    </YStack>
  );
};
