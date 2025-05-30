import {
  useQueries,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from 'react-query';
import {ApiResponseType, responseWrapper} from 'services/helpers';
import {ProductResponse} from './types';
import {PRODUCT_KEYS} from './keys';
import {productApis} from '.';

const useGetSaleProducts = (
  options?: UseQueryOptions<ApiResponseType<ProductResponse[]>, Error>,
) => {
  const {
    isLoading,
    isFetching,
    data,
    isError,
    error,
    refetch: onGetSaleProducts,
  } = useQuery<ApiResponseType<ProductResponse[]>, Error>(
    [PRODUCT_KEYS.GET_SALES_PRODUCTS],
    async () => {
      return responseWrapper<ApiResponseType<ProductResponse[]>>(
        productApis.getSalesProducts,
      );
    },
    {
      enabled: true,
      notifyOnChangeProps: 'tracked',
      keepPreviousData: true,
      ...options,
    },
  );

  const client = useQueryClient();

  const handleInvalidateSaleProducts = () => {
    client.invalidateQueries<ApiResponseType<ProductResponse[]>>([
      PRODUCT_KEYS.GET_SALES_PRODUCTS,
      productApis.getSalesProducts,
    ]);
  };

  return {
    isPending: isFetching || isLoading,
    isError,
    error,
    saleProducts: data?.result,
    onGetSaleProducts,
    handleInvalidateSaleProducts,
  };
};

export default useGetSaleProducts;
