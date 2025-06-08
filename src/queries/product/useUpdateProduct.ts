import {useMutation, UseMutationOptions, useQueryClient} from 'react-query';
import {ProductRequest, ProductResponse, ProductUpdateRequest} from './types';
import {PRODUCT_KEYS} from './keys';
import {productApis} from '.';

export const useUpdateProduct = (
  options?: UseMutationOptions<ProductResponse, any, ProductRequest>,
) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (productData: ProductUpdateRequest) => {
      return productApis.updateProduct(productData);
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: [PRODUCT_KEYS.GET_ALL_PRODUCTS],
      });
      queryClient.invalidateQueries({queryKey: [PRODUCT_KEYS.SEARCH_PRODUCTS]});

      // Update the specific product in cache if we have the ID
      if (data?.data?.id) {
        queryClient.setQueryData(
          [PRODUCT_KEYS.GET_PRODUCT_BY_ID, data.data.id.toString()],
          data.data,
        );
      }
    },
  });
  return {
    updateProduct: mutation.mutate,
    updateProductAsync: mutation.mutateAsync,
    isUpdating: mutation.isLoading,
    error: mutation.error,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
};
