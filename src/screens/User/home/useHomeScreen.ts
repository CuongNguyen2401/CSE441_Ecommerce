import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackParamList, NavigationRoutes} from '../../../navigation/types';
import {useAuthStore} from '../../../store/auth/useAuthStore';
import {useGetAllProducts} from 'queries/product/useGetAllProducts';
import {useGetMostSoldProducts} from 'queries/product/useGetMostSoldProducts';
import {useGetAllCategories} from 'queries/category/useGetAllCategories';
import {CategoryResponse} from 'queries/category/types';
import useGetSaleProducts from 'queries/product/useGetSalesProducts';

export function useHomeScreen() {
  const {user} = useAuthStore();
  const {products, isPending, isError, error} = useGetAllProducts();
  const {categories, isPending: isCategoryPending} = useGetAllCategories();
  const {saleProducts, isPending: isSaleProductPending} = useGetSaleProducts();
  const {data: mostSoldProducts, isPending: isMostSoldPending} =
    useGetMostSoldProducts();

  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const handleSearch = (text: string) => {
    if (text.trim().length > -1) {
      // Navigate to products screen with search query
      navigation.navigate(NavigationRoutes.CATEGORY_PRODUCTS, {
        category: 'Search Results',
        searchQuery: text,
      });
    }
  };

  const handleCategoryPress = (category: CategoryResponse) => {
    navigation.navigate(NavigationRoutes.CATEGORY_PRODUCTS, {
      category: category.name,
    });
  };

  const handleProductPress = (id: number) => {
    navigation.navigate(NavigationRoutes.PRODUCT_DETAILS, {
      productId: id,
    });
  };

  const handleSeeAll = () => {
    navigation.navigate(NavigationRoutes.PRODUCTS);
  };

  return {
    state: {
      user,
      saleProducts,
      products,
      categories,
      mostSoldProducts,
      isMostSoldPending,
      isCategoryPending,
      isPending,
      isError,
      error,
    },
    handlers: {
      handleSearch,
      handleCategoryPress,
      handleProductPress,
      handleSeeAll,
    },
  };
}
