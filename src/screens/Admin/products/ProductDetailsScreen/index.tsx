import React, {useState} from 'react';
import {Alert} from 'react-native';
import {
  YStack,
  XStack,
  Text,
  Button,
  ScrollView,
  Card,
  H3,
  H4,
  Spinner,
  Image,
  Separator,
} from 'tamagui';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

import {useGetProductById} from 'queries/product/useGetProductById';
import {useDeleteProduct} from 'queries/product/useDeleteProduct';
import {RootStackParamList, NavigationRoutes} from 'navigation/types';

type ProductDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  NavigationRoutes.PRODUCT_DETAILS_ADMIN
>;

const ProductDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<ProductDetailsScreenRouteProp>();
  const {productId} = route.params;

  const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false);
  // Hooks
  const {product, isPending: isLoading} = useGetProductById({productId});
  const {deleteProduct, isDeleting} = useDeleteProduct();

  const handleEdit = () => {
    navigation.navigate(NavigationRoutes.EDIT_PRODUCT, {productId});
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Product',
      'Are you sure you want to delete this product? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteProduct([productId.toString()], {
              onSuccess: () => {
                Alert.alert('Success', 'Product deleted successfully!', [
                  {
                    text: 'OK',
                    onPress: () => navigation.goBack(),
                  },
                ]);
              },
              onError: (error: any) => {
                Alert.alert(
                  'Error',
                  error.response?.data?.message || 'Failed to delete product',
                );
              },
            });
          },
        },
      ],
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <Spinner size="large" />
        <Text marginTop="$2">Loading product details...</Text>
      </YStack>
    );
  }

  if (!product) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center" padding="$4">
        <Icon name="error" size={48} color="#ef4444" />
        <Text fontSize="$6" fontWeight="bold" marginTop="$2">
          Product not found
        </Text>
        <Text color="$gray10" textAlign="center" marginTop="$2">
          The product you're looking for could not be found.
        </Text>
        <Button
          marginTop="$4"
          onPress={() => navigation.goBack()}
          backgroundColor="$blue8">
          Go Back
        </Button>
      </YStack>
    );
  }

  return (
    <ScrollView flex={1} backgroundColor="$background">
      <YStack padding="$4" gap="$4">
        {/* Header */}
        <XStack alignItems="center" justifyContent="space-between">
          <XStack alignItems="center" gap="$3" flex={1}>
            <H3 flex={1} numberOfLines={1}>
              Product Details
            </H3>
          </XStack>

          {/* Action Buttons */}
          <XStack gap="$2">
            <Button size="$3" backgroundColor="$blue8" onPress={handleEdit}>
              <Icon name="edit" size={16} color="white" />
            </Button>
            <Button
              size="$3"
              backgroundColor="$red8"
              onPress={handleDelete}
              disabled={isDeleting}>
              {isDeleting ? (
                <Spinner size="small" color="white" />
              ) : (
                <Icon name="delete" size={16} color="white" />
              )}
            </Button>
          </XStack>
        </XStack>

        {/* Product Image and Basic Info */}
        <Card bordered padding="$4">
          <YStack gap="$4">
            <XStack gap="$4" alignItems="flex-start">
              {/* Product Image */}
              <YStack alignItems="center">
                {product.image ? (
                  <Image
                    source={{uri: product.image}}
                    width={120}
                    height={120}
                    borderRadius="$3"
                    objectFit="cover"
                  />
                ) : (
                  <YStack
                    width={120}
                    height={120}
                    backgroundColor="$gray3"
                    borderRadius="$3"
                    borderWidth={2}
                    borderColor="$gray6"
                    borderStyle="dashed"
                    justifyContent="center"
                    alignItems="center">
                    <Icon name="image" size={40} color="#999" />
                  </YStack>
                )}
              </YStack>

              {/* Basic Product Info */}
              <YStack flex={1} gap="$2">
                <H4>{product.name}</H4>

                <XStack alignItems="center" gap="$2">
                  <Text
                    backgroundColor={
                      product.productStatus === 'ACTIVE' ? '$green3' : '$gray3'
                    }
                    color={
                      product.productStatus === 'ACTIVE'
                        ? '$green10'
                        : '$gray10'
                    }
                    paddingHorizontal="$2"
                    paddingVertical="$1"
                    borderRadius="$2"
                    fontSize="$2"
                    fontWeight="bold">
                    {product.productStatus}
                  </Text>
                </XStack>

                <XStack gap="$3" alignItems="center">
                  <YStack>
                    <Text color="$gray10" fontSize="$2">
                      Price
                    </Text>
                    <Text fontSize="$5" fontWeight="bold" color="$green10">
                      {formatPrice(product.price)}
                    </Text>
                  </YStack>

                  {product.salePrice && (
                    <YStack>
                      <Text color="$gray10" fontSize="$2">
                        Sale Price
                      </Text>
                      <Text fontSize="$4" fontWeight="bold" color="$red10">
                        {formatPrice(product.salePrice)}
                      </Text>
                    </YStack>
                  )}
                </XStack>

                <XStack gap="$3">
                  <YStack>
                    <Text color="$gray10" fontSize="$2">
                      Quantity
                    </Text>
                    <Text fontSize="$4" fontWeight="bold">
                      {product.quantity}
                    </Text>
                  </YStack>

                  <YStack>
                    <Text color="$gray10" fontSize="$2">
                      Rating
                    </Text>
                    <XStack alignItems="center" gap="$1">
                      <Icon name="star" size={16} color="#fbbf24" />
                      <Text fontSize="$3" fontWeight="bold">
                        {product.ratings ? product.ratings.toFixed(1) : 'N/A'}
                      </Text>
                    </XStack>
                  </YStack>
                </XStack>
              </YStack>
            </XStack>

            {/* Description */}
            {product.description && (
              <>
                <Separator />
                <YStack gap="$2">
                  <Text fontSize="$4" fontWeight="bold">
                    Description
                  </Text>
                  <Text color="$gray11" lineHeight="$1">
                    {product.description}
                  </Text>
                </YStack>
              </>
            )}
          </YStack>
        </Card>

        {/* Category and Additional Info */}
        <Card bordered padding="$4">
          <YStack gap="$3">
            <Text fontSize="$4" fontWeight="bold">
              Product Information
            </Text>

            <YStack gap="$2">
              <XStack justifyContent="space-between">
                <Text color="$gray10">Category:</Text>
                <Text fontWeight="500">{product.category.name}</Text>
              </XStack>

              <XStack justifyContent="space-between">
                <Text color="$gray10">Slug:</Text>
                <Text fontWeight="500" fontSize="$2">
                  {product.slug}
                </Text>
              </XStack>

              <XStack justifyContent="space-between">
                <Text color="$gray10">Product ID:</Text>
                <Text fontWeight="500" fontSize="$2">
                  #{product.id}
                </Text>
              </XStack>
            </YStack>
          </YStack>
        </Card>

        {/* Timestamps */}
        <Card bordered padding="$4">
          <YStack gap="$3">
            <Text fontSize="$4" fontWeight="bold">
              Timestamps
            </Text>

            <YStack gap="$2">
              <YStack gap="$1">
                <Text color="$gray10" fontSize="$2">
                  Created Date:
                </Text>
                <Text fontSize="$3">{formatDate(product?.createdDate)}</Text>
                <Text color="$gray9" fontSize="$2">
                  by {product.createdBy}
                </Text>
              </YStack>

              <YStack gap="$1">
                <Text color="$gray10" fontSize="$2">
                  Last Modified:
                </Text>
                <Text fontSize="$3">{formatDate(product.modifiedDate)}</Text>
                <Text color="$gray9" fontSize="$2">
                  by {product.modifiedBy}
                </Text>
              </YStack>
            </YStack>
          </YStack>
        </Card>

        {/* Related Products */}
        {product.relatedProducts && product.relatedProducts.length > 0 && (
          <Card bordered padding="$4">
            <YStack gap="$3">
              <Text fontSize="$4" fontWeight="bold">
                Related Products
              </Text>
              <YStack gap="$2">
                {product.relatedProducts.map((relatedId, index) => (
                  <Text key={index} color="$gray11" fontSize="$3">
                    Product ID: {relatedId}
                  </Text>
                ))}
              </YStack>
            </YStack>
          </Card>
        )}

        {/* Action Buttons */}
        <XStack gap="$3" marginTop="$2">
          <Button flex={1} backgroundColor="$blue8" onPress={handleEdit}>
            <XStack gap="$2" alignItems="center">
              <Icon name="edit" size={20} color="white" />
              <Text color="white" fontWeight="bold">
                Edit Product
              </Text>
            </XStack>
          </Button>

          <Button
            flex={1}
            backgroundColor="$red8"
            onPress={handleDelete}
            disabled={isDeleting}>
            {isDeleting ? (
              <XStack gap="$2" alignItems="center">
                <Spinner size="small" color="white" />
                <Text color="white" fontWeight="bold">
                  Deleting...
                </Text>
              </XStack>
            ) : (
              <XStack gap="$2" alignItems="center">
                <Icon name="delete" size={20} color="white" />
                <Text color="white" fontWeight="bold">
                  Delete Product
                </Text>
              </XStack>
            )}
          </Button>
        </XStack>
      </YStack>
    </ScrollView>
  );
};

export default ProductDetailsScreen;
