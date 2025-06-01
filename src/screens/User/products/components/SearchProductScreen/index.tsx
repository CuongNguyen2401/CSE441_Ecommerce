import {
  YStack,
  Spinner,
  Button,
  Card,
  H4,
  Input,
  ScrollView,
  Separator,
  XStack,
  Text,
  Image,
} from 'tamagui';
import useProductScreen from '../../useProductScreen';
import {HomeStackParamList, NavigationRoutes} from 'navigation/types';
import {useGetProductsByCategory} from 'queries/product/useGetProductsByCategory';
import {useState, useMemo} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useRoute, RouteProp} from '@react-navigation/native';
import {useSearchProducts} from 'queries/product/useSearchProducts';

export const SearchScreen = () => {
  const route =
    useRoute<RouteProp<HomeStackParamList, NavigationRoutes.SEARCH>>();

  const {query} = route?.params;

  const {searchResults, isError, isPending, error, onSearchProduct} =
    useSearchProducts({query});

  const {
    handlers: {addItem, navigation},
  } = useProductScreen(query);

  const sortOptions = [
    {id: 1, name: 'Newest'},
    {id: 2, name: 'Price: Low to High'},
    {id: 3, name: 'Price: High to Low'},
    {id: 4, name: 'Popularity'},
  ];

  // ✅ Hooks must be at the top level
  const [searchQuery, setSearchQuery] = useState(query || '');
  const [selectedSort, setSelectedSort] = useState('Newest');

  const sortedProducts = useMemo(() => {
    let sorted = [...(searchResults || [])];
    if (selectedSort === 'Price: Low to High') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (selectedSort === 'Price: High to Low') {
      sorted.sort((a, b) => b.price - a.price);
    }
    return sorted;
  }, [searchResults, selectedSort]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleProductPress = (productId: number) => {
    navigation.navigate(NavigationRoutes.PRODUCT_DETAILS, {productId});
  };

  // ✅ Safe to use early return after hooks
  if (isPending) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <Spinner size="large" color="$blue10" />
      </YStack>
    );
  }

  return (
    <YStack flex={1} backgroundColor="$background">
      <YStack padding="$4" gap="$4">
        <H4>{query}</H4>

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
            placeholder="Search in this category..."
            borderWidth={0}
            backgroundColor="transparent"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </XStack>

        {/* Sort Dropdown */}
        <XStack justifyContent="flex-end" alignItems="center">
          <Button
            size="$3"
            variant="outlined"
            iconAfter={<Icon name="sort" size={16} />}
            onPress={() => {
              const nextSortIndex =
                (sortOptions.findIndex(opt => opt.name === selectedSort) + 1) %
                sortOptions.length;
              setSelectedSort(sortOptions[nextSortIndex].name);
            }}>
            <Text>Sort: {selectedSort}</Text>
          </Button>
        </XStack>

        <Separator />

        {/* Product Grid */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {sortedProducts.length === 0 ? (
            <YStack height={300} justifyContent="center" alignItems="center">
              <Icon name="search-off" size={48} color="#ccc" />
              <Text fontSize="$4" color="$gray10" marginTop="$2">
                No products found
              </Text>
            </YStack>
          ) : (
            <XStack flexWrap="wrap" justifyContent="space-between">
              {sortedProducts.map(product => (
                <Card
                  key={product.id}
                  elevate
                  bordered
                  width="48%"
                  marginBottom="$3"
                  onPress={() => handleProductPress(product.id)}>
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
          )}
        </ScrollView>
      </YStack>
    </YStack>
  );
};
