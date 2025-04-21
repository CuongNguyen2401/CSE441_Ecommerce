import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { ParamListBase } from '@react-navigation/native';

type ProductDetailsParams = {
  productId: number;
};
import { 
  YStack, 
  XStack, 
  Text, 
  Button, 
  ScrollView,
  Image,
  Card,
  H2,
  H4,
  Paragraph,
  Separator,
  Tabs,
  Spinner,
  View
} from 'tamagui';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Mock data for demonstration
const product = {
  id: 1,
  name: 'Wireless Noise Cancelling Headphones',
  price: 199.99,
  discountPrice: 149.99,
  rating: 4.5,
  reviewCount: 128,
  description: 'Experience premium sound quality with these wireless noise cancelling headphones. Features include 30-hour battery life, comfortable over-ear design, and advanced noise cancellation technology.',
  features: [
    'Active Noise Cancellation',
    'Bluetooth 5.0 Connectivity',
    '30-hour Battery Life',
    'Quick Charge (5 min = 3 hours playback)',
    'Built-in Microphone for Calls',
    'Voice Assistant Compatible'
  ],
  specifications: [
    { name: 'Brand', value: 'SoundMaster' },
    { name: 'Model', value: 'WH-1000XM4' },
    { name: 'Color', value: 'Black' },
    { name: 'Weight', value: '254g' },
    { name: 'Connectivity', value: 'Bluetooth 5.0, 3.5mm jack' },
    { name: 'Battery', value: '30 hours (with ANC)' }
  ],
  images: [
    'https://placekitten.com/400/400',
    'https://placekitten.com/401/400',
    'https://placekitten.com/402/400',
    'https://placekitten.com/403/400'
  ],
  colors: ['Black', 'Silver', 'Blue'],
  inStock: true
};

// Related products
const relatedProducts = [
  { id: 2, name: 'Wireless Earbuds', price: 89.99, image: 'https://placekitten.com/200/200' },
  { id: 3, name: 'Bluetooth Speaker', price: 79.99, image: 'https://placekitten.com/201/201' },
  { id: 4, name: 'Audio Cable', price: 19.99, image: 'https://placekitten.com/202/202' },
];

const ProductDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<ParamListBase & { params: ProductDetailsParams }, 'params'>>();
  const { productId } = route.params || { productId: 1 };
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // In a real app, you would fetch the product details based on productId
  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [productId]);

  const handleAddToCart = () => {
    // In a real app, you would add the product to the cart
    console.log(`Added ${quantity} ${product.name} (${selectedColor}) to cart`);
    //xnavigation.navigate('CartTab');
  };

  const handleBuyNow = () => {
    // In a real app, you would add the product to the cart and navigate to checkout
    console.log(`Buying ${quantity} ${product.name} (${selectedColor})`);
    navigation.navigate('Checkout');
  };

  if (isLoading) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <Spinner size="large" color="$blue10" />
      </YStack>
    );
  }

  return (
    <ScrollView flex={1} backgroundColor="$background">
      <YStack>
        {/* Product Images */}
        <YStack height={400}>
          <Image
            source={{ uri: product.images[selectedImage] }}
            width="100%"
            height="100%"
            resizeMode="cover"
          />
        </YStack>

        {/* Image Thumbnails */}
        <XStack padding="$2" space="$2" justifyContent="center">
          {product.images.map((image, index) => (
            <Button
              key={index}
              width={60}
              height={60}
              borderRadius="$2"
              borderWidth={selectedImage === index ? 2 : 0}
              borderColor="$blue10"
              padding={0}
              onPress={() => setSelectedImage(index)}
            >
              <Image
                source={{ uri: image }}
                width="100%"
                height="100%"
                resizeMode="cover"
                borderRadius="$1"
              />
            </Button>
          ))}
        </XStack>

        {/* Product Info */}
        <YStack padding="$4" space="$4">
          <YStack>
            <H2 fontWeight="bold">{product.name}</H2>
            
            <XStack alignItems="center" space="$2" marginTop="$2">
              <XStack alignItems="center">
                <Icon name="star" size={18} color="#FFD700" />
                <Text fontSize="$3" marginLeft="$1">{product.rating}</Text>
              </XStack>
              <Text fontSize="$2" color="$gray10">({product.reviewCount} reviews)</Text>
            </XStack>
            
            <XStack alignItems="center" space="$2" marginTop="$2">
              {product.discountPrice ? (
                <>
                  <Text fontSize="$6" fontWeight="bold" color="$blue10">
                    ${product.discountPrice.toFixed(2)}
                  </Text>
                  <Text fontSize="$3" color="$gray10" textDecorationLine="line-through">
                    ${product.price.toFixed(2)}
                  </Text>
                  <Text fontSize="$3" color="$green10" fontWeight="bold">
                    Save ${(product.price - product.discountPrice).toFixed(2)}
                  </Text>
                </>
              ) : (
                <Text fontSize="$6" fontWeight="bold" color="$blue10">
                  ${product.price.toFixed(2)}
                </Text>
              )}
            </XStack>
            
            <Text fontSize="$3" color={product.inStock ? '$green10' : '$red10'} marginTop="$2">
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </Text>
          </YStack>

          {/* Color Selection */}
          <YStack space="$2">
            <Text fontSize="$3" fontWeight="bold">Color</Text>
            <XStack space="$2">
              {product.colors.map(color => (
                <Button
                  key={color}
                  size="$3"
                  borderRadius="$2"
                  backgroundColor={selectedColor === color ? '$blue5' : '$backgroundHover'}
                  borderWidth={selectedColor === color ? 1 : 0}
                  borderColor="$blue10"
                  onPress={() => setSelectedColor(color)}
                >
                  <Text>{color}</Text>
                </Button>
              ))}
            </XStack>
          </YStack>

          {/* Quantity */}
          <YStack space="$2">
            <Text fontSize="$3" fontWeight="bold">Quantity</Text>
            <XStack alignItems="center" space="$2">
              <Button
                size="$3"
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Icon name="remove" size={20} />
              </Button>
              <Text fontSize="$4" width={40} textAlign="center">{quantity}</Text>
              <Button
                size="$3"
                onPress={() => setQuantity(quantity + 1)}
              >
                <Icon name="add" size={20} />
              </Button>
            </XStack>
          </YStack>

          {/* Action Buttons */}
          <XStack space="$2" marginTop="$2">
            <Button
              flex={1}
              size="$4"
              backgroundColor="$blue10"
              color="white"
              onPress={handleAddToCart}
              disabled={!product.inStock}
            >
              <Icon name="shopping-cart" size={20} color="white" />
              <Text color="white" marginLeft="$1">Add to Cart</Text>
            </Button>
            <Button
              flex={1}
              size="$4"
              backgroundColor="$orange10"
              color="white"
              onPress={handleBuyNow}
              disabled={!product.inStock}
            >
              <Icon name="bolt" size={20} color="white" />
              <Text color="white" marginLeft="$1">Buy Now</Text>
            </Button>
          </XStack>

          <Separator marginVertical="$2" />

          {/* Product Details Tabs */}
          <Tabs
            defaultValue="description"
            orientation="horizontal"
            flexDirection="column"
          >
            <Tabs.List>
              <Tabs.Tab value="description">
                <Text>Description</Text>
              </Tabs.Tab>
              <Tabs.Tab value="features">
                <Text>Features</Text>
              </Tabs.Tab>
              <Tabs.Tab value="specifications">
                <Text>Specifications</Text>
              </Tabs.Tab>
            </Tabs.List>
            
            <Tabs.Content value="description">
              <YStack padding="$2" space="$2">
                <Paragraph fontSize="$3" lineHeight="$5">
                  {product.description}
                </Paragraph>
              </YStack>
            </Tabs.Content>
            
            <Tabs.Content value="features">
              <YStack padding="$2" space="$2">
                {product.features.map((feature, index) => (
                  <XStack key={index} space="$2" alignItems="center">
                    <Icon name="check-circle" size={20} color="#3B82F6" />
                    <Text fontSize="$3">{feature}</Text>
                  </XStack>
                ))}
              </YStack>
            </Tabs.Content>
            
            <Tabs.Content value="specifications">
              <YStack padding="$2" space="$2">
                {product.specifications.map((spec, index) => (
                  <XStack key={index} justifyContent="space-between" paddingVertical="$1">
                    <Text fontSize="$3" color="$gray10">{spec.name}</Text>
                    <Text fontSize="$3">{spec.value}</Text>
                  </XStack>
                ))}
              </YStack>
            </Tabs.Content>
          </Tabs>

          <Separator marginVertical="$2" />

          {/* Related Products */}
          <YStack space="$2">
            <H4>You May Also Like</H4>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <XStack space="$3" paddingVertical="$2">
                {relatedProducts.map(product => (
                  <Card
                    key={product.id}
                    elevate
                    bordered
                    width={150}
                    onPress={() => navigation.navigate('ProductDetails', { productId: product.id })}
                  >
                    <Image
                      source={{ uri: product.image }}
                      width="100%"
                      height={120}
                      resizeMode="cover"
                    />
                    <YStack padding="$2" space="$1">
                      <Text fontSize="$2" numberOfLines={1} fontWeight="bold">
                        {product.name}
                      </Text>
                      <Text fontSize="$3" color="$blue10" fontWeight="bold">
                        ${product.price.toFixed(2)}
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

export default ProductDetailsScreen;