import {useNavigation} from '@react-navigation/native';
import {NavigationRoutes} from 'navigation/types';
import {useGetAllCategories} from 'queries/category/useGetAllCategories';
import {ProductResponse} from 'queries/product/types';
import {useGetAllProducts} from 'queries/product/useGetAllProducts';
import React, {useMemo, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Adapt,
  Card,
  Image,
  Input,
  ScrollView,
  Select,
  Separator,
  Sheet,
  Text,
  XStack,
  YStack,
} from 'tamagui';

const sortOptions = [
  {id: 1, name: 'Newest'},
  {id: 2, name: 'Price: Low to High'},
  {id: 3, name: 'Price: High to Low'},
];

const ProductScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSort, setSelectedSort] = useState('Newest');

  const {products} = useGetAllProducts({enabled: true});
  const {categories} = useGetAllCategories();

  const categoriesWithAll = useMemo(() => {
    if (!categories) return [];
    return [
      {id: -1, name: 'All', description: 'Get all products'},
      ...categories,
    ];
  }, [categories]);

  // Filtering and sorting logic
  const filteredProducts: ProductResponse[] = useMemo(() => {
    if (!products) return [];

    let result = [...products];

    if (searchQuery) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (selectedCategory && selectedCategory !== 'All') {
      result = result.filter(
        product => product.category.name === selectedCategory,
      );
    }

    switch (selectedSort) {
      case 'Price: Low to High':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'Price: High to Low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'Newest':
      default:
        result.sort(
          (a, b) =>
            new Date(b.createdDate).getTime() -
            new Date(a.createdDate).getTime(),
        );
        break;
    }

    return result;
  }, [products, searchQuery, selectedCategory, selectedSort]);

  const handleProductPress = (product: ProductResponse) => {
    navigation.navigate(NavigationRoutes.PRODUCT_DETAILS, {
      productId: product.id,
    });
  };

  return (
    <YStack flex={1} backgroundColor="$background">
      <YStack padding="$4" gap="$4">
        {/* Search Bar */}
        <XStack
          backgroundColor="$backgroundHover"
          borderRadius="$4"
          padding="$2"
          alignItems="center"
          gap="$2">
          <Icon name="search" size={24} color="#999" />
          <Input
            flex={1}
            placeholder="Search products..."
            borderWidth={0}
            backgroundColor="transparent"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </XStack>

        {/* Filters */}
        <XStack justifyContent="space-between" alignItems="center">
          <Select
            value={selectedCategory}
            onValueChange={setSelectedCategory}
            disablePreventBodyScroll>
            <Select.Trigger
              width={180}
              iconAfter={<Icon name="arrow-drop-down" size={20} />}>
              <Select.Value placeholder="Select category" />
            </Select.Trigger>

            <Adapt when="sm" platform="touch">
              <Sheet modal dismissOnSnapToBottom>
                <Sheet.Frame>
                  <Sheet.ScrollView>
                    <Adapt.Contents />
                  </Sheet.ScrollView>
                </Sheet.Frame>
                <Sheet.Overlay />
              </Sheet>
            </Adapt>

            <Select.Content>
              <Select.ScrollUpButton />
              <Select.Viewport>
                <Select.Group>
                  {categoriesWithAll.map((category, index) => (
                    <Select.Item
                      key={category.id}
                      value={category.name}
                      index={index}>
                      <Select.ItemText>{category.name}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Group>
              </Select.Viewport>
              <Select.ScrollDownButton />
            </Select.Content>
          </Select>

          <Select
            value={selectedSort}
            onValueChange={setSelectedSort}
            disablePreventBodyScroll>
            <Select.Trigger
              width={180}
              iconAfter={<Icon name="arrow-drop-down" size={20} />}>
              <Select.Value placeholder="Sort by" />
            </Select.Trigger>

            <Adapt when="sm" platform="touch">
              <Sheet modal dismissOnSnapToBottom>
                <Sheet.Frame>
                  <Sheet.ScrollView>
                    <Adapt.Contents />
                  </Sheet.ScrollView>
                </Sheet.Frame>
                <Sheet.Overlay />
              </Sheet>
            </Adapt>

            <Select.Content>
              <Select.ScrollUpButton />
              <Select.Viewport>
                <Select.Group>
                  {sortOptions.map((option, index) => (
                    <Select.Item
                      key={option.id}
                      value={option.name}
                      index={index}>
                      <Select.ItemText>{option.name}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Group>
              </Select.Viewport>
              <Select.ScrollDownButton />
            </Select.Content>
          </Select>
        </XStack>

        <Separator />

        {/* Product Grid */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 160}}>
          <XStack
            padding={0}
            flexWrap="wrap"
            justifyContent="space-between"
            overflow="visible" // <-- Important
          >
            {filteredProducts.map(product => (
              <Card
                key={product.id}
                elevate
                bordered
                width="48%"
                marginBottom="$3"
                onPress={() => handleProductPress(product)}
                style={{
                  elevation: 4, // Android shadow
                  backgroundColor: 'white',
                  boxShadow: 'none',
                }}>
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

          {filteredProducts?.length === 0 && (
            <YStack height={300} justifyContent="center" alignItems="center">
              <Icon name="search-off" size={48} color="#ccc" />
              <Text fontSize="$4" color="$gray10" marginTop="$2">
                No products found
              </Text>
            </YStack>
          )}
        </ScrollView>
      </YStack>
    </YStack>
  );
};

export default ProductScreen;
