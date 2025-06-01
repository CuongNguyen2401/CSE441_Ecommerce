import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackParamList} from 'navigation/types';
import {useSearchProducts} from 'queries/product/useSearchProducts';
import {useOrderStore} from 'store/order/useOrderStore';

export default function useProductScreen(query?: string) {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const {addItem} = useOrderStore();
  return {
    states: {},
    handlers: {addItem, navigation},
  };
}
