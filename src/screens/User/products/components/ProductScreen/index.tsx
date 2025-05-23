import {useNavigation} from '@react-navigation/native';
import {NavigationRoutes} from 'navigation/types';
import {useGetAllCategories} from 'queries/category/useGetAllCategories';
import {ProductResponse} from 'queries/product';
import {useGetAllProducts} from 'queries/product/useGetAllProducts';
import React, {useEffect, useState} from 'react';
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

// Mock data for demonstration
// const products = [
//   {
//     id: 1,
//     name: 'Wireless Headphones',
//     price: 99.99,
//     image: 'https://placekitten.com/200/200',
//     category: 'Electronics',
//   },
//   {
//     id: 2,
//     name: 'Smart Watch',
//     price: 199.99,
//     image: 'https://placekitten.com/201/201',
//     category: 'Electronics',
//   },
//   {
//     id: 3,
//     name: 'Bluetooth Speaker',
//     price: 79.99,
//     image: 'https://placekitten.com/202/202',
//     category: 'Electronics',
//   },
//   {
//     id: 4,
//     name: 'Laptop Backpack',
//     price: 49.99,
//     image: 'https://placekitten.com/203/203',
//     category: 'Accessories',
//   },
//   {
//     id: 5,
//     name: 'Smartphone',
//     price: 699.99,
//     image: 'https://placekitten.com/204/204',
//     category: 'Electronics',
//   },
//   {
//     id: 6,
//     name: 'Wireless Charger',
//     price: 29.99,
//     image: 'https://placekitten.com/205/205',
//     category: 'Electronics',
//   },
//   {
//     id: 7,
//     name: 'Fitness Tracker',
//     price: 89.99,
//     image: 'https://placekitten.com/206/206',
//     category: 'Electronics',
//   },
//   {
//     id: 8,
//     name: 'Portable Power Bank',
//     price: 39.99,
//     image: 'https://placekitten.com/207/207',
//     category: 'Electronics',
//   },
// ];

const sortOptions = [
  {id: 1, name: 'Newest'},
  {id: 2, name: 'Price: Low to High'},
  {id: 3, name: 'Price: High to Low'},
  {id: 4, name: 'Popularity'},
];

const ProductScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedSort, setSelectedSort] = useState('Newest');
  const {products, isError, isPending, error} = useGetAllProducts({
    enabled: true,
  });
  const [filteredProducts, setFilteredProducts] = useState<ProductResponse[]>(
    products || [],
  );
  const {categories} = useGetAllCategories({enabled: true});

  useEffect(() => {
    if (products) {
      setFilteredProducts(products);
    }
  }, [products]);

  console.log('Categories:', categories);
  console.log('Products:', products);

  const handleSearch = (query: React.SetStateAction<string>) => {
    setSearchQuery(query);
    filterProducts(query, selectedCategory);
  };

  const handleCategoryChange = (category: React.SetStateAction<string>) => {
    setSelectedCategory(category);
    filterProducts(searchQuery, category);
  };

  const filterProducts = (
    query: React.SetStateAction<string>,
    category: React.SetStateAction<string>,
  ) => {
    let filtered = products;

    if (query) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query.toString().toLowerCase()),
      );
    }

    if (category && category !== 'All Categories') {
      filtered = filtered.filter(product => product.category.name === category);
    }

    setFilteredProducts(filtered);
  };

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
            onChangeText={handleSearch}
          />
        </XStack>

        {/* Filters */}
        <XStack justifyContent="space-between" alignItems="center">
          <Select
            value={selectedCategory}
            onValueChange={handleCategoryChange}
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
                  {categories?.map((category, index) => (
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <XStack flexWrap="wrap" justifyContent="space-between">
            {filteredProducts.map(product => (
              <Card
                key={product.id}
                elevate
                bordered
                width="48%"
                marginBottom="$3"
                onPress={() => handleProductPress(product)}>
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

          {filteredProducts.length === 0 && (
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
