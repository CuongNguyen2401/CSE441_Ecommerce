import Icon from 'react-native-vector-icons/MaterialIcons';
import {Input, XStack} from 'tamagui';

const SearchProduct = () => {
  const handleSearch = (text: string) => {
    console.log('Search text:', text);
    // Implement your search logic here
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
        onSubmitEditing={e => handleSearch(e.nativeEvent.text)}
      />
    </XStack>
  );
};
export default SearchProduct;
