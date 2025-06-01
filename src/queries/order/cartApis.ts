import {APP_APIS} from 'queries/helpers';
import {useHttpPrivateRequest} from 'services/http/useHttpPrivateRequest';
import {OrderPayload, OrderStatus} from './types';

const apis = (baseUrl = APP_APIS.ORDER) => {
  const privateRequest = useHttpPrivateRequest(baseUrl);

  const createOrder = (orders: OrderPayload) => {
    return privateRequest.post('', orders);
  };

  const updateOrder = (orders: OrderPayload) => {
    return privateRequest.put('', orders);
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    return privateRequest.put(`/${orderId}/status?status=${status}`);
  };
  const getOrderByUser = () => {
    return privateRequest.get('');
  };

  const getOrderById = (orderId: string) => {
    return privateRequest.get(`/${orderId}`);
  };

  return {
    createOrder,
    updateOrder,
    updateOrderStatus,
    getOrderByUser,
    getOrderById,
  };
};

export default apis;
