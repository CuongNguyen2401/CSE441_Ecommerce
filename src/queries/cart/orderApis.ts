import {APP_APIS} from 'queries/helpers';
import {useHttpPrivateRequest} from 'services/http/useHttpPrivateRequest';
import useHttpPublicRequest from 'services/http/useHttpPublicRequest';
import {OrderRequest} from './types';

const apisOrder = (baseUrl = APP_APIS.ORDER) => {
  const privateRequest = useHttpPrivateRequest(baseUrl);
  const publicRequest = useHttpPublicRequest(baseUrl);

  const createOrder = (orderData: OrderRequest) => {
    return privateRequest.post('', orderData);
  };

  const getUserOrders = () => {
    return privateRequest.get('/user');
  };

  const getOrderById = (orderId: string) => {
    return privateRequest.get(`/${orderId}`);
  };

  return {
    createOrder,
    getUserOrders,
    getOrderById,
  };
};

export default apisOrder;
