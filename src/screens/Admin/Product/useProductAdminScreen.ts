import {useCreateProduct} from 'queries/product/useCreateProduct';
import {useGetAllProducts} from 'queries/product/useGetAllProducts';

export const useProductAdminScreen = () => {
  const {isPending, isError, products} = useGetAllProducts();
  const {
    isLoading: isProductCreateLoading,
    isSuccess: isProductCreateSuccess,
    createProduct,
  } = useCreateProduct();

  return {
    states: {products, isProductCreateSuccess},
    handlers: {
      createProduct,
    },
  };
};
