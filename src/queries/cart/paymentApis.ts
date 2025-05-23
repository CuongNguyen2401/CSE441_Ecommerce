import {OrderRequest} from 'queries/cart';
import {APP_APIS} from 'queries/helpers';
import {useHttpPrivateRequest} from 'services/http/useHttpPrivateRequest';

const apisPayment = (baseUrl = APP_APIS.PAYMENT) => {
  const privateRequest = useHttpPrivateRequest(baseUrl);

  const processPayment = (orderData: OrderRequest) => {
    return privateRequest.post('/neworder', orderData);
  };

  return {
    processPayment,
  };
};
export default apisPayment;
