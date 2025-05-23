import {useQuery, useQueryClient, UseQueryOptions} from 'react-query';
import {
  ApiResponseType,
  GetPropertiesParams,
  responseWrapper,
} from 'services/helpers';
import {ProductResponse} from './types';
import {useState} from 'react';
import {PRODUCT_KEYS} from './keys';
import {productApis} from '.';

export const useGetAllProducts = (
  options?: UseQueryOptions<ApiResponseType<ProductResponse[]>, Error> & {
    propertiesParams?: GetPropertiesParams;
    enabled?: boolean;
  },
) => {
  const [params, setParams] = useState<GetPropertiesParams>(
    options?.propertiesParams || {},
  );

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch: onGetAllProduct,
  } = useQuery<ApiResponseType<ProductResponse[]>, Error>(
    [PRODUCT_KEYS.GET_ALL_PRODUCTS, {...params}],
    async ({queryKey}) => {
      const [, ...params] = queryKey; // Destructure the queryKey to get the params
      return responseWrapper<ApiResponseType<ProductResponse[]>>(
        await productApis.getAllProducts,
      );
    },
    {
      notifyOnChangeProps: ['data', 'isFetching'],
      keepPreviousData: true,
      enabled: options?.enabled || false,
      ...options,
    },
  );

  const queryClient = useQueryClient();

  const handleInvalidateProducts = () => {
    queryClient.invalidateQueries(PRODUCT_KEYS.GET_ALL_PRODUCTS);
  };

  return {
    products: data?.result || [],
    isPending: isLoading || isFetching,
    isError,
    error,
    onGetAllProduct,
    setParams,
    handleInvalidateProducts,
  };
};
