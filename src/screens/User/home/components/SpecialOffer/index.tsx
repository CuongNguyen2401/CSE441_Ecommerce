import React, {useEffect, useRef, useState} from 'react';
import {Card, H4, Image, ScrollView, Text, XStack, YStack} from 'tamagui';
import {useHomeScreen} from '../../useHomeScreen';
import {ScrollView as RNScrollView} from 'react-native';

export const SpecialOffer = () => {
  const {
    state: {saleProducts},
  } = useHomeScreen();
  const scrollRef = useRef<RNScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardWidth = 300 + 12; // card width + margin gap

  useEffect(() => {
    if (!saleProducts?.length) return;

    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % saleProducts.length;
      scrollRef.current?.scrollTo({
        x: nextIndex * (cardWidth * 0.9),
        animated: true,
      });
      setCurrentIndex(nextIndex);
    }, 3000); // Slide every 3 seconds

    return () => clearInterval(interval);
  }, [currentIndex, saleProducts]);

  return (
    <YStack paddingHorizontal="$3">
      <H4 marginBottom="$2">Special Offers</H4>

      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingRight: 10}} // Ensure right spacing
      >
        <XStack gap="$3" paddingVertical="$2">
          {saleProducts?.map(sale => (
            <Card
              key={sale?.id}
              elevate
              bordered
              borderRadius="$6"
              overflow="hidden"
              width={260}
              height={150}
              marginLeft={6}
              backgroundColor="$background"
              style={{
                shadowColor: '#000', // Optional for custom shadow
                shadowOffset: {width: 0, height: 6},
                shadowOpacity: 0.8,
                shadowRadius: 10,
                elevation: 3, // For Android
              }}>
              <Image
                source={{uri: sale?.image}}
                width="100%"
                height="100%"
                resizeMode="cover"
                position="absolute"
              />

              <Card.Footer padded backgroundColor="rgba(0,0,0,0.4)">
                <YStack>
                  <Text color="white" fontSize="$5" fontWeight="bold">
                    {sale?.name}
                  </Text>
                  <Text color="white" fontSize="$3">
                    {sale?.description}
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
