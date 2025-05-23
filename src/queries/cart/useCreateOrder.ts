import {useMutation} from 'react-query';
import {OrderRequest} from './types';
import {CART_KEYS} from './keys';
import {orderApis} from '.';

export const useCreateOrder = () => {
  const {mutate, isLoading, error, data} = useMutation(
    [CART_KEYS.CREATE_ORDER],
    (orderData: OrderRequest) => orderApis.createOrder(orderData),
    {
      onSuccess: response => {
        console.log('Order created successfully:', response.data);
      },
      onError: (err: any) => {
        console.error(
          'Failed to create order:',
          err.response?.data?.message || err,
        );
      },
    },
  );

  return {
    createOrder: mutate,
    isCreating: isLoading,
    error,
    orderData: data?.data,
  };
};
