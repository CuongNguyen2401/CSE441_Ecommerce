import {useMutation, useQueryClient} from 'react-query';
import {PRODUCT_KEYS} from './keys';
import {productApis} from '.';

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (productIds: string[]) => {
      return productApis.deleteProducts(productIds);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [PRODUCT_KEYS.GET_ALL_PRODUCTS],
      });
      queryClient.invalidateQueries({
        queryKey: [PRODUCT_KEYS.GET_SALES_PRODUCTS],
      });
    },
  });
  return {
    deleteProduct: mutation.mutate,
    deleteProductAsync: mutation.mutateAsync,
    isDeleting: mutation.isLoading,
    error: mutation.error,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
};
