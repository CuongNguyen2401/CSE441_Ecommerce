import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { H4, ScrollView, Text, XStack, YStack } from 'tamagui';
import { useHomeScreen } from '../../useHomeScreen';

export const Categories = () => {
  const {
    state: {categories},
    handlers: {handleCategoryPress},
  } = useHomeScreen();

  return (
    <YStack>
      <H4 marginBottom="$2">Shop by Category</H4>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <XStack gap="$3" paddingVertical="$2">
          {categories.map(category => (
            <YStack
              key={category.id}
              alignItems="center"
              gap="$1"
              onPress={() => handleCategoryPress(category)}>
              <XStack
                width={70}
                height={70}
                borderRadius={35}
                backgroundColor="$blue5"
                alignItems="center"
                justifyContent="center">
                <Icon name={category.icon} size={30} color="#3B82F6" />
              </XStack>
              <Text fontSize="$2" textAlign="center">
                {category.name}
              </Text>
            </YStack>
          ))}
        </XStack>
      </ScrollView>
    </YStack>
  );
};
