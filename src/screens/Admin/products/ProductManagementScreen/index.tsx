import { useNavigation } from '@react-navigation/native';
import { NavigationRoutes } from 'navigation/types';
import { useGetAllCategories } from 'queries/category/useGetAllCategories';
import { ProductStatus } from 'queries/product/types';
import { useGetAllProducts } from 'queries/product/useGetAllProducts';
import React, { useState } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Adapt,
  Button,
  Card,
  H3,
  Image,
  Input,
  ScrollView,
  Select,
  Sheet,
  Spinner,
  Text,
  XStack,
  YStack,
} from 'tamagui';

const ProductManagementScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [page, setPage] = useState(1);

  // Fetch data
  const {products, isPending: isLoadingProducts} = useGetAllProducts({
    enabled: true,
  });
  const {categories} = useGetAllCategories();

  // Filter products
  const filteredProducts =
    products?.filter(product => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'All' ||
        product.category.name === selectedCategory;
      const matchesStatus =
        selectedStatus === 'All' || product.productStatus === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    }) || [];

  const handleCreateProduct = () => {
    navigation.navigate(NavigationRoutes.CREATE_PRODUCT);
  };

  const handleEditProduct = (productId: number) => {
    navigation.navigate(NavigationRoutes.EDIT_PRODUCT, {productId});
  };

  const getStatusBadgeColor = (status: ProductStatus) => {
    switch (status) {
      case 'ACTIVE':
        return {backgroundColor: '$green5', color: '$green10'};
      case 'INACTIVE':
        return {backgroundColor: '$red5', color: '$red10'};
      default:
        return {backgroundColor: '$gray5', color: '$gray10'};
    }
  };

  // Fetch more data when reaching the end
  const fetchMoreData = () => {
    if (!isLoadingProducts) {
      setPage(prev => prev + 1);
    }
  };

  if (isLoadingProducts && page === 1) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <Spinner size="large" color="$blue10" />
        <Text marginTop="$2">Loading products...</Text>
      </YStack>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <YStack flex={1} backgroundColor="$background">
        <YStack flex={1} padding="$4" gap="$4">
          {/* Header */}
          <XStack justifyContent="space-between" alignItems="center">
            <H3>Product Management</H3>
            <Button
              size="$3"
              backgroundColor="$blue8"
              color="white"
              onPress={handleCreateProduct}>
              <Icon name="add" size={18} color="white" />
              <Text color="white">Add Product</Text>
            </Button>
          </XStack>

          {/* Filters */}
          <Card bordered padding="$3">
            <YStack gap="$3">
              {/* Search */}
              <XStack
                backgroundColor="$backgroundHover"
                borderRadius="$4"
                padding="$2"
                alignItems="center"
                gap="$2">
                <Icon name="search" size={20} color="#999" />
                <Input
                  flex={1}
                  placeholder="Search products..."
                  borderWidth={0}
                  backgroundColor="transparent"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </XStack>

              {/* Category and Status Filters */}
              <XStack gap="$3">
                {/* Category Filter */}
                <YStack flex={1} gap="$1">
                  <Text fontSize="$3" color="$gray10">
                    Category
                  </Text>
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}>
                    <Select.Trigger
                      iconAfter={<Icon name="keyboard-arrow-down" size={20} />}>
                      <Select.Value />
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

                    <Select.Content zIndex={200000}>
                      <Select.ScrollUpButton />
                      <Select.Viewport>
                        <Select.Group>
                          <Select.Item index={0} value="All">
                            <Select.ItemText>All Categories</Select.ItemText>
                          </Select.Item>
                          {categories?.map((category, index) => (
                            <Select.Item
                              key={category.id}
                              index={index + 1}
                              value={category.name}>
                              <Select.ItemText>{category.name}</Select.ItemText>
                            </Select.Item>
                          ))}
                        </Select.Group>
                      </Select.Viewport>
                      <Select.ScrollDownButton />
                    </Select.Content>
                  </Select>
                </YStack>

                {/* Status Filter */}
                <YStack flex={1} gap="$1">
                  <Text fontSize="$3" color="$gray10">
                    Status
                  </Text>
                  <Select
                    value={selectedStatus}
                    onValueChange={setSelectedStatus}>
                    <Select.Trigger
                      iconAfter={<Icon name="keyboard-arrow-down" size={20} />}>
                      <Select.Value />
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

                    <Select.Content zIndex={200000}>
                      <Select.ScrollUpButton />
                      <Select.Viewport>
                        <Select.Group>
                          <Select.Item index={0} value="All">
                            <Select.ItemText>All Status</Select.ItemText>
                          </Select.Item>
                          <Select.Item index={1} value="ACTIVE">
                            <Select.ItemText>Active</Select.ItemText>
                          </Select.Item>
                          <Select.Item index={2} value="INACTIVE">
                            <Select.ItemText>Inactive</Select.ItemText>
                          </Select.Item>
                        </Select.Group>
                      </Select.Viewport>
                      <Select.ScrollDownButton />
                    </Select.Content>
                  </Select>
                </YStack>
              </XStack>
            </YStack>
          </Card>

          {/* Product Stats */}
          <XStack gap="$3">
            <Card flex={1} padding="$3" backgroundColor="$blue2">
              <Text fontSize="$2" color="$gray10">
                Total Products
              </Text>
              <Text fontSize="$5" fontWeight="bold" color="$blue10">
                {products?.length || 0}
              </Text>
            </Card>
            <Card flex={1} padding="$3" backgroundColor="$green2">
              <Text fontSize="$2" color="$gray10">
                Active
              </Text>
              <Text fontSize="$5" fontWeight="bold" color="$green10">
                {products?.filter(p => p.productStatus === 'ACTIVE').length ||
                  0}
              </Text>
            </Card>
            <Card flex={1} padding="$3" backgroundColor="$red2">
              <Text fontSize="$2" color="$gray10">
                Inactive
              </Text>
              <Text fontSize="$5" fontWeight="bold" color="$red10">
                {products?.filter(p => p.productStatus === 'INACTIVE').length ||
                  0}
              </Text>
            </Card>
          </XStack>

          {/* Products List */}
          <FlatList
            style={{flex: 1, gap: 4}}
            data={filteredProducts}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <Card key={item.id} bordered padding="$3" marginBottom="$3">
                <XStack gap="$3" alignItems="center">
                  <Image
                    source={{uri: item.image}}
                    width={60}
                    height={60}
                    borderRadius="$3"
                    objectFit="cover"
                  />

                  {/* Product Info */}
                  <YStack flex={1} gap="$1" padding={'$2'} margin={'$1'}>
                    <XStack
                      justifyContent="space-between"
                      alignItems="flex-start">
                      <YStack flex={1}>
                        <Text fontSize="$4" fontWeight="bold" numberOfLines={1}>
                          {item.name}
                        </Text>
                        <Text fontSize="$3" color="$gray10">
                          {item.category.name}
                        </Text>
                      </YStack>
                      <Text
                        fontSize="$2"
                        fontWeight="bold"
                        paddingHorizontal="$2"
                        paddingVertical="$1"
                        borderRadius="$2"
                        {...getStatusBadgeColor(item.productStatus)}>
                        {item.productStatus}
                      </Text>
                    </XStack>

                    <XStack justifyContent="space-between" alignItems="center">
                      <YStack>
                        <XStack gap="$2" alignItems="center">
                          <Text fontSize="$4" fontWeight="bold" color="$blue10">
                            ${item.price.toFixed(2)}
                          </Text>
                          {item.salePrice && (
                            <Text
                              fontSize="$3"
                              color="$gray9"
                              textDecorationLine="line-through">
                              ${item.salePrice.toFixed(2)}
                            </Text>
                          )}
                        </XStack>
                        <Text fontSize="$2" color="$gray10">
                          Stock: {item.quantity}
                        </Text>
                      </YStack>

                      <XStack gap="$2">
                        <Button
                          size="$2"
                          backgroundColor="$gray5"
                          color="$gray11"
                          onPress={() => handleEditProduct(item.id)}>
                          <Icon name="edit" size={16} />
                        </Button>
                        <Button
                          size="$2"
                          backgroundColor="$blue5"
                          color="$blue11"
                          onPress={() =>
                            navigation.navigate(
                              NavigationRoutes.PRODUCT_DETAILS_ADMIN,
                              {productId: item.id},
                            )
                          }>
                          <Icon name="visibility" size={16} />
                        </Button>
                      </XStack>
                    </XStack>
                  </YStack>
                </XStack>
              </Card>
            )}
            ListEmptyComponent={
              <Card padding="$4" alignItems="center">
                <Icon name="inventory" size={48} color="#ccc" />
                <Text fontSize="$4" color="$gray10" marginTop="$2">
                  No products found
                </Text>
                <Text fontSize="$3" color="$gray9" textAlign="center">
                  {searchQuery ||
                  selectedCategory !== 'All' ||
                  selectedStatus !== 'All'
                    ? 'Try adjusting your filters'
                    : 'Start by creating your first product'}
                </Text>
              </Card>
            }
            onEndReached={fetchMoreData}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              isLoadingProducts && filteredProducts.length > 0 ? (
                <YStack alignItems="center" padding="$4">
                  <Spinner size="small" color="$blue10" />
                  <Text marginTop="$2">Loading more products...</Text>
                </YStack>
              ) : null
            }
            contentContainerStyle={{padding: 4, paddingBottom: 20}}
            showsVerticalScrollIndicator={false}
          />
        </YStack>
      </YStack>
    </SafeAreaView>
  );
};

export default ProductManagementScreen;
