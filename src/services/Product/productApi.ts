import {GetPropertiesParams} from 'services/helpers';
import {useHttpPrivateRequest} from 'services/http/useHttpPrivateRequest';
import useHttpPublicRequest from 'services/http/useHttpPublicRequest';
import {API_URL} from 'services/keys';
import {newCancelToken, stringify} from 'utils';

const productApi = (baseURL = API_URL) => {
  const publicApi = useHttpPublicRequest(baseURL);
  const privateApi = useHttpPrivateRequest(baseURL);

  //Public API
  const getAllProducts = (params: GetPropertiesParams) => {
    const query = stringify(params);
    const url = `/api/v1/products${query ? '?' + query : ''}`;
    return publicApi.get(url, newCancelToken(30000));
  };

  const getProductById = (id: string) => {
    return publicApi.get(`/api/v1/products/${id}`);
  };

  //Private API
  const createProduct = (payload: any) => {
    return privateApi.post('/api/v1/products', payload);
  };

  const updateProduct = (id: string, payload: any) => {
    return privateApi.put(`/api/v1/products/${id}`, payload);
  };

  const deleteProduct = (id: string) => {
    return privateApi.delete(`/api/v1/products/${id}`);
  };

  return {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};
export default productApi;
