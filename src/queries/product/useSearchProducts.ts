import {useQuery, UseQueryOptions} from 'react-query';
import {PRODUCT_KEYS, productApis, ProductResponse} from '.';
import {ApiResponseType, responseWrapper} from 'services/helpers';

export const useSearchProducts = (
  options?: UseQueryOptions<ApiResponseType<ProductResponse[]>, Error> & {
    query: string;
  },
) => {
  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
    refetch: onSearchProduct,
  } = useQuery<ApiResponseType<ProductResponse[]>, Error>(
    [PRODUCT_KEYS.SEARCH_PRODUCTS, options?.query],
    async ({queryKey}) => {
      const [, query] = queryKey; // Destructure the queryKey to get the params
      return responseWrapper<ApiResponseType<ProductResponse[]>>(
        productApis.searchProducts,
        [query],
      );
    },
    {
      enabled: !!options?.query,
      keepPreviousData: true,
      notifyOnChangeProps: ['data', 'isFetching'],
      ...options,
    },
  );

  return {
    searchResults: data?.result || [],
    isError,
    error,
    isPending: isLoading || isFetching,
    onSearchProduct,
  };
};
