import React from 'react';
import {Card, H4, Image, ScrollView, Text, XStack, YStack} from 'tamagui';
import {useHomeScreen} from '../../useHomeScreen';

export const SpecialOffer = () => {
  const {
    state: {promotions},
  } = useHomeScreen();

  return (
    <YStack>
      <H4 marginBottom="$2">Special Offers</H4>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <XStack gap="$3" paddingVertical="$2">
          {promotions.map(promo => (
            <Card
              key={promo.id}
              elevate
              bordered
              width={300}
              height={150}
              scale={0.9}
              hoverStyle={{scale: 0.925}}
              pressStyle={{scale: 0.875}}>
              <Card.Background>
                <Image
                  source={{uri: promo.image}}
                  width="100%"
                  height="100%"
                  objectFit="cover"
                />
              </Card.Background>
              <Card.Footer padded>
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
