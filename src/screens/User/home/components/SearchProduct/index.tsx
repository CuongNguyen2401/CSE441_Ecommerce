import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Input, XStack} from 'tamagui';
import {HomeStackParamList, NavigationRoutes} from 'navigation/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const SearchProduct = () => {
  const [searchText, setSearchText] = useState('');
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const handleSearch = (text: string) => {
    if (text.trim().length > 0) {
      // Navigate to products screen with search query
      navigation.navigate(NavigationRoutes.CATEGORY_PRODUCTS, {
        category: 'Search Results',
        searchQuery: text,
      });
    }
  };

  return (
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
        value={searchText}
        onChangeText={setSearchText}
        onSubmitEditing={() => handleSearch(searchText)}
      />
    </XStack>
  );
};
export default SearchProduct;
