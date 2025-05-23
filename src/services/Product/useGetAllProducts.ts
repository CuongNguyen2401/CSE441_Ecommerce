import {useQuery, useQueryClient, UseQueryOptions} from 'react-query';
import {ApiResponseType, responseWrapper} from 'services/helpers';
import {API_KEYS} from 'services/keys';
import {ProductApi} from '.';
import {ProductResponse} from './types';

export function useGetAllProducts(
  options?: UseQueryOptions<ProductResponse[], Error>,
) {
  const {
    data: products = [],
    error,
    isError,
    isFetching,
    isLoading,
    refetch: onGetAllProducts,
  } = useQuery<ProductResponse[], Error>([API_KEYS.All_PRODUCTS], {
    queryFn: async () => {
      const response: ApiResponseType<ProductResponse[]> =
        await responseWrapper(ProductApi.getAllProducts, []);
      return response.result || [];
    },
    notifyOnChangeProps: ['data', 'isFetching'],
    ...options,
  });

  const queryClient = useQueryClient();

  const handleInvalidateAllProducts = () =>
    queryClient.invalidateQueries(API_KEYS.All_PRODUCTS);

  return {
    products,
    error,
    isError,
    isPending: isLoading || isFetching,
    onGetAllProducts,
    handleInvalidateAllProducts,
  };
}
