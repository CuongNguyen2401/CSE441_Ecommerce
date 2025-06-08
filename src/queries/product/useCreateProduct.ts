import {useMutation, UseMutationOptions} from 'react-query';
import {ProductRequest, ProductResponse} from './types';
import {PRODUCT_KEYS} from './keys';
import {productApis} from '.';

export const useCreateProduct = (
  options?: UseMutationOptions<ProductResponse, any, ProductRequest>,
) => {
  const {mutate, isLoading, error, data} = useMutation<
    ProductResponse,
    any,
    ProductRequest
  >({
    mutationKey: [PRODUCT_KEYS.CREATE_PRODUCT],
    mutationFn: (productData: ProductRequest) =>
      productApis
        .createProduct(productData)
        .then((response: any) => response.data),
    onSuccess: (response: any) => {
      console.log('Product created successfully:', response);
    },
    onError: (err: any) => {
      console.error(
        'Failed to create product:',
        err.response?.data?.message || err,
      );
    },
    ...options,
  });

  return {
    createProduct: mutate,
    isCreating: isLoading,
    productData: data,
    error,
  };
};
