import {useMutation, UseMutationOptions} from 'react-query';
import {CART_KEYS, orderApis, OrderPayload, OrderResponse} from '.';

export const useCreateOrder = (
  options?: UseMutationOptions<OrderResponse, any, OrderPayload>,
) => {
  const {mutate, isLoading, error, data} = useMutation<
    OrderResponse,
    any,
    OrderPayload
  >({
    mutationKey: [CART_KEYS.CREATE_ORDER],
    mutationFn: (orderData: OrderPayload) =>
      orderApis.createOrder(orderData).then(response => response.data),
    onSuccess: response => {
      console.log('Order created successfully:', response);
    },
    onError: (err: any) => {
      console.error(
        'Failed to create order:',
        err.response?.data?.message || err,
      );
    },
    ...options,
  });

  return {
    createOrder: mutate,
    isCreating: isLoading,
    error,
  };
};
