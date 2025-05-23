import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {H4, ScrollView, Spinner, Text, XStack, YStack} from 'tamagui';
import {useGetAllCategories} from 'queries/category/useGetAllCategories';
import {useNavigation} from '@react-navigation/native';
import {HomeStackParamList, NavigationRoutes} from 'navigation/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CategoryResponse} from 'queries/category/types';

// Map category names to Material Icons
const getCategoryIcon = (categoryName: string): string => {
  const iconMap: Record<string, string> = {
    Electronics: 'devices',
    Clothing: 'checkroom',
    'Home & Kitchen': 'kitchen',
    Books: 'menu-book',
    Sports: 'sports-basketball',
    Toys: 'toys',
    Beauty: 'spa',
    Health: 'fitness-center',
    Automotive: 'directions-car',
    Garden: 'grass',
    Grocery: 'local-grocery-store',
    'Pet Supplies': 'pets',
  };

  return iconMap[categoryName] || 'category';
};

export const Categories = () => {
  const {categories, isPending} = useGetAllCategories({enabled: true});
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const handleCategoryPress = (category: CategoryResponse) => {
    navigation.navigate(NavigationRoutes.CATEGORY_PRODUCTS, {
      category: category.name,
    });
  };

  if (isPending) {
    return (
      <YStack height={150} justifyContent="center" alignItems="center">
        <Spinner size="large" color="$blue10" />
      </YStack>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <YStack height={150} justifyContent="center" alignItems="center">
        <Text color="$gray10">No categories available</Text>
      </YStack>
    );
  }

  return (
    <YStack>
      <H4 marginBottom="$2">Shop by Category</H4>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <XStack gap="$3" paddingVertical="$2">
          {categories.map((category: CategoryResponse) => (
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
                <Icon
                  name={getCategoryIcon(category.name)}
                  size={30}
                  color="#3B82F6"
                />
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
