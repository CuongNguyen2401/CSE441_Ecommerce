import {useQuery, UseQueryOptions} from 'react-query';
import {PRODUCT_KEYS} from './keys';
import {ProductResponse} from './types';
import {ApiResponseType, responseWrapper} from 'services/helpers';
import {productApis} from '.';

export const useGetMostSoldProducts = (
  options: UseQueryOptions<ApiResponseType<ProductResponse[]>, Error> & {
    enabled?: boolean;
  },
) => {
  const {data, isLoading, isError, error} = useQuery<
    ApiResponseType<ProductResponse[]>,
    Error
  >(
    [PRODUCT_KEYS.GET_FEATURED_PRODUCTS],
    async () => {
      return responseWrapper<ApiResponseType<ProductResponse[]>>(
        await productApis.getMostSoldProducts,
      );
    },
    {
      notifyOnChangeProps: ['data'],
      keepPreviousData: true,
      ...options,
    },
  );

  return {
    mostSoldProducts: data?.result || [],
    isError,
    error,
    isPending: isLoading,
  };
};
