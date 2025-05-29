import React from 'react';
import {Card, H4, Image, ScrollView, Text, XStack, YStack} from 'tamagui';
import {useHomeScreen} from '../../useHomeScreen';

export const SpecialOffer = () => {
  const {
    state: {promotions},
  } = useHomeScreen();

  return (
    <YStack paddingHorizontal="$3">
      <H4 marginBottom="$2">Special Offers</H4>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingRight: 16}} // Ensure right spacing
      >
        <XStack gap="$3" paddingVertical="$2">
          {promotions.map(promo => (
            <Card
              key={promo.id}
              elevate
              bordered
              borderRadius="$6"
              overflow="hidden"
              width={300}
              height={150}
              marginLeft={6}
              backgroundColor="$background"
              style={{
                shadowColor: '#000', // Optional for custom shadow
                shadowOffset: {width: 0, height: 4},
                shadowOpacity: 0.3,
                shadowRadius: 6,
                elevation: 5, // For Android
              }}>
              <Image
                source={{uri: promo.image}}
                width="100%"
                height="100%"
                resizeMode="cover"
                position="absolute"
              />

              <Card.Footer padded backgroundColor="rgba(0,0,0,0.4)">
                <YStack>
                  <Text color="white" fontSize="$5" fontWeight="bold">
                    {promo.title}
                  </Text>
                  <Text color="white" fontSize="$3">
                    {promo.description}
                  </Text>
                </YStack>
              </Card.Footer>
            </Card>
          ))}
        </XStack>
      </ScrollView>
    </YStack>
  );
};
