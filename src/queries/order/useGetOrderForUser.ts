import {
  useQueries,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from 'react-query';
import {ApiResponseType, responseWrapper} from 'services/helpers';
import {OrderResponse} from './types';
import {CART_KEYS} from './keys';
import {orderApis} from '.';

const useGetOrderByUser = (
  options?: UseQueryOptions<ApiResponseType<OrderResponse>, Error>,
) => {
  const {
    data,
    isFetching,
    isLoading,
    isError,
    error,
    refetch: onGetOrdersByUser,
  } = useQuery<ApiResponseType<OrderResponse>, Error>(
    [CART_KEYS.GET_ORDER],
    async () => {
      return responseWrapper<ApiResponseType<OrderResponse>>(
        orderApis.getOrderByUser,
      );
    },
    {
      notifyOnChangeProps: ['data'],
      keepPreviousData: true,
      enabled: true,
      ...options,
    },
  );

  const client = useQueryClient();

  const handleInvalidateOrders = () => {
    client.invalidateQueries([CART_KEYS.GET_ORDER]);
  };

  return {
    isPending: isLoading || isFetching,
    isError,
    error,
    onGetOrdersByUser,
    handleInvalidateOrders,
    orderData: data?.result,
  };
};

export default useGetOrderByUser;
