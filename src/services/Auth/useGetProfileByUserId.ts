import {useQuery, useQueryClient, UseQueryOptions} from 'react-query';
import {ApiResponseType, responseWrapper} from 'services/helpers';
import {API_KEYS} from 'services/keys';
import {ProductApi} from 'services/Product';
import {ProductResponse} from 'services/Product/types';
import {isEmpty} from 'utils';

export function useGetAllProducts(
  options?: UseQueryOptions<
    ApiResponseType<ProductResponse[]>,
    Error,
    ProductResponse[]
  > & {
    [key: string]: string | number | string[] | boolean;
  },
) {
  const {
    data: products = [],
    error,
    isError,
    isFetching,
    refetch: onGetAllProducts,
  } = useQuery<ApiResponseType<ProductResponse[]>, Error, ProductResponse[]>(
    [API_KEYS.All_PRODUCTS],
    {
      queryFn: () => responseWrapper(ProductApi.getAllProducts, []),
      select: (response: ApiResponseType<ProductResponse[]>) =>
        response.result || [],

      notifyOnChangeProps: ['data', 'isFetching'],
      keepPreviousData: true,
      enabled: !isEmpty(options),
      ...options,
    },
  );

  const queryClient = useQueryClient();

  const handleInvalidateAllProducts = () =>
    queryClient.invalidateQueries(API_KEYS.All_PRODUCTS);

  return {
    products,
    isFetching,
    isError,
    error,
    onGetAllProducts,
    handleInvalidateAllProducts,
  };
}
