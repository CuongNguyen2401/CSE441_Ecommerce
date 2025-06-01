import {useNavigation} from '@react-navigation/native';
import {useCreateOrder} from 'queries/order/useCreateOrder';
import useGetOrderByUser from 'queries/order/useGetOrderForUser';
import {useOrderStore} from 'store/order/useOrderStore';

export function useCartScreen() {
  const navigation = useNavigation();
  const {addItem, removeItem, updateItemQuantity, clearCart} = useOrderStore();
  const {createOrder, error, isCreating} = useCreateOrder();
  const {
    error: getOrderByUserError,
    isError,
    isPending,
    orderData,
    handleInvalidateOrders,
    onGetOrdersByUser,
  } = useGetOrderByUser();

  return {
    states: {
      isCreating,
      orderData,
      error,
      isError,
      isPending,
    },
    handlers: {
      navigation,
      addItem,
      removeItem,
      updateItemQuantity,
      clearCart,
      createOrder,
      onGetOrdersByUser,
      handleInvalidateOrders,
    },
  };
}
