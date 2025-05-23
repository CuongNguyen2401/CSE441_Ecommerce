import type {ParamListBase} from '@react-navigation/native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NavigationRoutes} from 'navigation/types';
import {useGetProductById} from 'queries/product/useGetProductById';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Button,
  Card,
  H2,
  H4,
  Image,
  Paragraph,
  ScrollView,
  Separator,
  Spinner,
  Tabs,
  Text,
  XStack,
  YStack,
} from 'tamagui';

type ProductDetailsParams = {
  productId: number;
};

// Mock data only for related products and UI states that don't come from the API
const mockRelatedProducts = [
  {
    id: 2,
    name: 'Wireless Earbuds',
    price: 89.99,
    image: 'https://placekitten.com/200/200',
  },
  {
    id: 3,
    name: 'Bluetooth Speaker',
    price: 79.99,
    image: 'https://placekitten.com/201/201',
  },
  {
    id: 4,
    name: 'Audio Cable',
    price: 19.99,
    image: 'https://placekitten.com/202/202',
  },
];

const ProductDetailScreen = () => {
  const navigation = useNavigation();
  const route =
    useRoute<
      RouteProp<ParamListBase & {params: ProductDetailsParams}, 'params'>
    >();
  const {productId} = route.params;

  // Fetch product data
  const {product, isPending} = useGetProductById({productId});

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    // In a real app, you would add the product to the cart
    console.log(`Added ${quantity} ${product?.name} to cart`);
    //navigation.navigate('CartTab');
  };

  const handleBuyNow = () => {
    // In a real app, you would add the product to the cart and navigate to checkout
    console.log(`Buying ${quantity} ${product?.name}`);
    navigation.navigate(NavigationRoutes.CHECKOUT);
  };

  if (isPending || !product) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <Spinner size="large" color="$blue10" />
      </YStack>
    );
  }

  // Convert product image to an array if it's a single string
  const productImages = Array.isArray(product.image)
    ? product.image
    : [product.image];

  return (
    <ScrollView flex={1} backgroundColor="$background">
      <YStack>
        {/* Product Images */}
        <YStack height={400}>
          <Image
            source={{uri: productImages[selectedImage]}}
            width="100%"
            height="100%"
            objectFit="cover"
          />
        </YStack>

        {/* Image Thumbnails */}
        {productImages.length > 1 && (
          <XStack padding="$2" gap="$2" justifyContent="center">
            {productImages.map((image: any, index: any) => (
              <Button
                key={`image-${index}`}
                width={60}
                height={60}
                borderRadius="$2"
                borderWidth={selectedImage === index ? 2 : 0}
                borderColor="$blue10"
                padding={0}
                onPress={() => setSelectedImage(index)}>
                <Image
                  source={{uri: image}}
                  width="100%"
                  height="100%"
                  objectFit="cover"
                  borderRadius="$1"
                />
              </Button>
            ))}
          </XStack>
        )}

        {/* Product Info */}
        <YStack padding="$4" gap="$4">
          <YStack>
            <H2 fontWeight="bold">{product.name}</H2>

            <XStack alignItems="center" gap="$2" marginTop="$2">
              <XStack alignItems="center">
                <Icon name="star" size={18} color="#FFD700" />
                <Text fontSize="$3" marginLeft="$1">
                  {product.ratings || 0}
                </Text>
              </XStack>
              <Text fontSize="$2" color="$gray10">
                (Reviews)
              </Text>
            </XStack>

            <XStack alignItems="center" gap="$2" marginTop="$2">
              {product.salePrice ? (
                <>
                  <Text fontSize="$6" fontWeight="bold" color="$blue10">
                    ${product.salePrice.toFixed(2)}
                  </Text>
                  <Text
                    fontSize="$3"
                    color="$gray10"
                    textDecorationLine="line-through">
                    ${product.price.toFixed(2)}
                  </Text>
                  <Text fontSize="$3" color="$green10" fontWeight="bold">
                    Save ${(product.price - product.salePrice).toFixed(2)}
                  </Text>
                </>
              ) : (
                <Text fontSize="$6" fontWeight="bold" color="$blue10">
                  ${product.price.toFixed(2)}
                </Text>
              )}
            </XStack>

            {/* Stock Status */}
            <XStack marginTop="$2">
              <Text
                fontSize="$3"
                color={product.quantity > 0 ? '$green10' : '$red10'}
                fontWeight="bold">
                {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
              </Text>
            </XStack>
          </YStack>

          {/* Quantity Selector */}
          <XStack alignItems="center" gap="$4">
            <Text fontSize="$3" fontWeight="bold">
              Quantity:
            </Text>
            <XStack
              borderWidth={1}
              borderColor="$gray8"
              borderRadius="$4"
              alignItems="center">
              <Button
                size="$3"
                backgroundColor="transparent"
                borderColor="transparent"
                onPress={() => setQuantity(Math.max(1, quantity - 1))}>
                <Icon name="remove" size={20} />
              </Button>
              <Text fontSize="$3" paddingHorizontal="$2">
                {quantity}
              </Text>
              <Button
                size="$3"
                backgroundColor="transparent"
                borderColor="transparent"
                onPress={() => setQuantity(quantity + 1)}>
                <Icon name="add" size={20} />
              </Button>
            </XStack>
          </XStack>

          {/* Add to Cart & Buy Now */}
          <XStack gap="$2">
            <Button
              flex={1}
              backgroundColor="$blue5"
              color="$blue10"
              fontWeight="bold"
              size="$4"
              disabled={product.quantity <= 0}
              onPress={handleAddToCart}>
              <Icon name="shopping-cart" size={20} color="#3B82F6" />
              <Text color="$blue10" marginLeft="$1">
                Add to Cart
              </Text>
            </Button>
            <Button
              flex={1}
              backgroundColor="$blue10"
              fontWeight="bold"
              size="$4"
              disabled={product.quantity <= 0}
              onPress={handleBuyNow}>
              <Icon name="flash-on" size={20} color="white" />
              <Text color="white" marginLeft="$1">
                Buy Now
              </Text>
            </Button>
          </XStack>

          <Separator />

          {/* Product Description */}
          <YStack gap="$2">
            <H4>Description</H4>
            <Paragraph>{product.description}</Paragraph>
          </YStack>

          <Separator />

          {/* Product Details */}
          <Tabs
            defaultValue="description"
            orientation="horizontal"
            flexDirection="column">
            <Tabs.List>
              <Tabs.Tab value="description">
                <Text>Description</Text>
              </Tabs.Tab>
              <Tabs.Tab value="specifications">
                <Text>Specifications</Text>
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Content value="description">
              <YStack padding="$2" gap="$2">
                <Paragraph>{product.description}</Paragraph>
              </YStack>
            </Tabs.Content>

            <Tabs.Content value="specifications">
              <YStack padding="$2" gap="$2">
                <Text>Category: {product.category.name}</Text>
                <Text>Quantity Available: {product.quantity}</Text>
                <Text>Status: {product.productStatus}</Text>
              </YStack>
            </Tabs.Content>
          </Tabs>

          <Separator />

          {/* Related Products */}
          <YStack gap="$2">
            <H4>Related Products</H4>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <XStack gap="$3" paddingVertical="$2">
                {mockRelatedProducts.map(relatedProduct => (
                  <Card
                    key={relatedProduct.id}
                    elevate
                    bordered
                    width={150}
                    onPress={() => {
                      navigation.navigate(NavigationRoutes.PRODUCT_DETAILS, {
                        productId: relatedProduct.id,
                      });
                    }}>
                    <Image
                      source={{uri: relatedProduct.image}}
                      width="100%"
                      height={100}
                      objectFit="cover"
                    />
                    <YStack padding="$2" gap="$1">
                      <Text fontSize="$2" numberOfLines={1} fontWeight="bold">
                        {relatedProduct.name}
                      </Text>
                      <Text fontSize="$3" color="$blue10" fontWeight="bold">
                        ${relatedProduct.price.toFixed(2)}
                      </Text>
                    </YStack>
                  </Card>
                ))}
              </XStack>
            </ScrollView>
          </YStack>
        </YStack>
      </YStack>
    </ScrollView>
  );
};

export default ProductDetailScreen;
