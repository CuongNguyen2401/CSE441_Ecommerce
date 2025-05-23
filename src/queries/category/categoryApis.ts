import {useHttpPrivateRequest} from 'services/http/useHttpPrivateRequest';
import useHttpPublicRequest from 'services/http/useHttpPublicRequest';
import {
  CategoryRequest,
  CategoryResponse,
  CategoryUpdateRequest,
} from './types';
import {APP_APIS} from 'queries/helpers';
import {ApiResponseType} from 'services/helpers';

const apis = (baseUrl = APP_APIS.CATEGORY) => {
  const privateRequest = useHttpPrivateRequest(baseUrl);
  const publicRequest = useHttpPublicRequest(baseUrl);

  const createCategory = (category: CategoryRequest) => {
    return privateRequest.post('', category);
  };

  const updateCategory = (category: CategoryUpdateRequest) => {
    return privateRequest.put('', category);
  };

  const deleteCategories = (ids: string[]) => {
    return privateRequest.delete('/', {
      params: {ids},
    });
  };

  const getCategories = () => {
    return privateRequest.get('');
  };

  const getCategoryById = (id: string) => {
    return publicRequest.get(`/${id}`);
  };

  const countProductsByCategory = (categoryName: string) => {
    return privateRequest.get(`/${categoryName}/products/count`);
  };

  return {
    createCategory,
    updateCategory,
    deleteCategories,
    getCategories,
    getCategoryById,
    countProductsByCategory,
  };
};

export default apis;
