import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useAuthStore} from '../../../store/auth/useAuthStore';
import {useGetAllProducts} from 'services/Product/useGetAllProducts';
import {HomeStackParamList, NavigationRoutes} from '../../../navigation/types';
import {Category, Product} from '../products/helpers';
import {categories, promotions} from './HomeScreen.helpers';

export function useHomeScreen() {
  const {user} = useAuthStore();
  const {products, isFetching, isError, error} = useGetAllProducts();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const handleSearch = (query: string) => {
    // navigation.navigate('Search', { query });
  };

  const handleCategoryPress = (category: Category) => {
    // navigation.navigate('CategoryProducts', { category: category.name });
  };

  const handleProductPress = (id: number) => {
    console.log('Product pressed:');

    // navigation.navigate(NavigationRoutes.PRODUCT_DETAILS, {
    //   productId: id,
    // });
  };

  return {
    state: {
      user,
      products,
      isFetching,
      isError,
      error,
      categories,
      promotions,
    },
    handlers: {
      handleSearch,
      handleCategoryPress,
      handleProductPress,
    },
  };
}
