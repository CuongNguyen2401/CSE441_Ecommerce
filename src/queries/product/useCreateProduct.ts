import {useMutation, UseMutationOptions} from 'react-query';
import {ProductRequest, ProductResponse} from './types';
import {PRODUCT_KEYS} from './keys';
import {responseWrapper} from 'services/helpers';
import {productApis} from '.';
export const useCreateProduct = (
  options?: UseMutationOptions<ProductResponse, any, ProductRequest>,
) => {
  const {mutate, isError, error, isSuccess, isLoading, data} = useMutation<
    ProductResponse,
    any,
    ProductRequest
  >({
    mutationKey: PRODUCT_KEYS.CREATE_PRODUCT,
    mutationFn: (data: ProductRequest) =>
      responseWrapper(productApis.createProduct, [data]),
    ...options,
  });

  return {
    createProduct: mutate,
    isError,
    isSuccess,
    error,
    isLoading,
  };
};
