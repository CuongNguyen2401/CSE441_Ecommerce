import {useQuery, UseQueryOptions} from 'react-query';
import {PRODUCT_KEYS} from './keys';
import {productApis, ProductResponse} from '.';
import {ApiResponseType, responseWrapper} from 'services/helpers';

export const useGetProductById = (
  options?: UseQueryOptions<ApiResponseType<ProductResponse>, Error> & {
    productId?: number | string;
  },
) => {
  const fetchProductById = async (productId: string) => {
    if (!productId) throw new Error('Missing productId');
    return productApis.getProductById(productId);
  };

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch: onGetProductById,
  } = useQuery<ApiResponseType<ProductResponse>, Error>(
    [PRODUCT_KEYS.GET_PRODUCT_BY_ID, options?.productId],
    async ({queryKey}) => {
      const [, productId] = queryKey;
      return responseWrapper<ApiResponseType<ProductResponse>>(
        fetchProductById,
        [productId as string],
      );
    },
    {
      enabled: !!options?.productId,
      ...options,
    },
  );

  return {
    product: data?.result || undefined,
    isError,
    error,
    isPending: isLoading || isFetching,
  };
};
