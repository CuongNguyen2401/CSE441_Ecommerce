import {useQuery, useQueryClient, UseQueryOptions} from 'react-query';
import {PRODUCT_KEYS} from './keys';
import {ProductResponse} from './types';
import {
  ApiResponseType,
  GetPropertiesParams,
  responseWrapper,
} from 'services/helpers';
import {productApis} from '.';
import {useState} from 'react';

export const useGetProductsByCategory = (
  options?: UseQueryOptions<ApiResponseType<ProductResponse[]>, Error> & {
    categoryName: string;
    params?: GetPropertiesParams;
  },
) => {
  const [params, setParams] = useState<GetPropertiesParams>(
    options?.params || {},
  );

  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
    refetch: onGetProductsByCategory,
  } = useQuery<ApiResponseType<ProductResponse[]>, Error>(
    [PRODUCT_KEYS.GET_PRODUCTS_BY_CATEGORY, options?.categoryName, {...params}],
    ({queryKey}) => {
      const [, categoryName, ...params] = queryKey; // Destructure the queryKey to get the params
      return responseWrapper<ApiResponseType<ProductResponse[]>>(
        productApis.getProductsByCategory,
        [categoryName, params],
      );
    },
    {
      enabled: !!options?.categoryName,
      keepPreviousData: true,
      ...options,
    },
  );

  const queryClient = useQueryClient();

  const handleInvalidateProductsByCategory = (
    categoryName: string,
    params?: any,
  ) => {
    queryClient.invalidateQueries(
      PRODUCT_KEYS.GET_PRODUCTS_BY_CATEGORY,
      params,
    );
  };

  return {
    categoryProducts: data?.result || [],
    isError,
    error,
    isPending: isLoading,
    onGetProductsByCategory,
    handleInvalidateProductsByCategory,
  };
};
