import {useQuery, UseQueryOptions} from 'react-query';
import {PRODUCT_KEYS} from './keys';
import {SaleProductResponse} from './types';
import {ApiResponseType, responseWrapper} from 'services/helpers';
import {productApis} from '.';

export const useGetMostSoldProducts = (
  options?: UseQueryOptions<ApiResponseType<SaleProductResponse[]>, Error>,
) => {
  const {data, isLoading, isError, error} = useQuery<
    ApiResponseType<SaleProductResponse[]>,
    Error
  >(
    [PRODUCT_KEYS.GET_FEATURED_PRODUCTS],
    async () => {
      return responseWrapper<ApiResponseType<SaleProductResponse[]>>(
        productApis.getMostSoldProducts,
      );
    },
    {
      notifyOnChangeProps: ['data'],
      keepPreviousData: true,
      enabled: true,
      ...options,
    },
  );

  return {
    data: data?.result,
    isError,
    error,
    isPending: isLoading,
  };
};
