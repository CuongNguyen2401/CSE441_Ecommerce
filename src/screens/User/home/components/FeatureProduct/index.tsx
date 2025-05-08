import React from 'react';
import {Button, Card, H4, Image, Text, XStack, YStack} from 'tamagui';
import {useHomeScreen} from '../../useHomeScreen';

export const FeaturedProducts = () => {
  const {
    state: {products},
    handlers: {handleProductPress},
  } = useHomeScreen();

  return (
    <YStack>
      <XStack
        justifyContent="space-between"
        alignItems="center"
        marginBottom="$2">
        <H4>Featured Products</H4>
        <Button variant="outlined">
          <Text color="$blue10">See All</Text>
        </Button>
      </XStack>
      <XStack flexWrap="wrap" justifyContent="space-between">
        {products.map(product => (
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
