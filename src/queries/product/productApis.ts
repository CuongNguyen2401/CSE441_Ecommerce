import {APP_APIS} from 'queries/helpers';
import {useHttpPrivateRequest} from 'services/http/useHttpPrivateRequest';
import useHttpPublicRequest from 'services/http/useHttpPublicRequest';
import {ProductRequest, ProductUpdateRequest} from './types';
import {stringify} from 'utils';
import {GetPropertiesParams} from 'services/helpers';

export default (baseUrl = APP_APIS.PRODUCT) => {
  const privateRequest = useHttpPrivateRequest(baseUrl);
  const publicRequest = useHttpPublicRequest(baseUrl);

  const getAllProducts = (params: GetPropertiesParams) => {
    return privateRequest.get('');
  };

  const createProduct = (productData: ProductRequest) => {
    const formData = new FormData();

    // Destructuring to separate image from other product data
    const {image, ...productDataWithoutImage} = productData;

    formData.append('product', stringify(productDataWithoutImage));

    if (image && image instanceof File) {
      formData.append('file', image);
    }

    return privateRequest.post('/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  const updateProduct = (productData: ProductUpdateRequest) => {
    const formData = new FormData();

    // Destructuring to separate image from other product data
    const {image, ...productDataWithoutImage} = productData;

    formData.append('product', stringify(productDataWithoutImage));

    if (image && image instanceof File) {
      formData.append('file', image);
    }

    return privateRequest.put('/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  const getSalesProducts = () => {
    return privateRequest.get('/sales');
  };

  const getProductById = (id: string) => {
    return privateRequest.get(`/${id}`);
  };

  const getProductBySlug = (slug: string) => {
    return privateRequest.get(`/detail/${slug}`);
  };

  const getProductsByCategory = (
    categoryName: string,
    params: GetPropertiesParams,
  ) => {
    return privateRequest.get(`/category/${categoryName}`, {params});
  };

  const getProductsByIds = (ids: string[]) => {
    return privateRequest.get('/list', {
      params: {ids: ids.join(',')},
    });
  };

  const searchProducts = (query: string) => {
    return privateRequest.get('/search', {
      params: {query},
    });
  };

  const deleteProducts = (ids: string[]) => {
    return privateRequest.delete('/', {data: ids});
  };

  const getMostSoldProducts = () => {
    return privateRequest.get('/most-sold');
  };

  const getSalesByCategory = (startDate: Date, endDate: Date) => {
    const formatDate = (date: Date) => {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    return privateRequest.get('/sales-category', {
      params: {
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
      },
    });
  };

  return {
    getAllProducts,
    createProduct,
    updateProduct,
    getSalesProducts,
    getProductById,
    getProductBySlug,
    getProductsByCategory,
    getProductsByIds,
    searchProducts,
    deleteProducts,
    getMostSoldProducts,
    getSalesByCategory,
  };
};
