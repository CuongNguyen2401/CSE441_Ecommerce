import {APP_APIS} from 'queries/helpers';
import {useHttpPrivateRequest} from 'services/http/useHttpPrivateRequest';
import useHttpPublicRequest from 'services/http/useHttpPublicRequest';
import {OrderRequest} from './types';

const apisCart = (baseUrl = APP_APIS.COUPON) => {
  const privateRequest = useHttpPrivateRequest(baseUrl);
  const publicRequest = useHttpPublicRequest(baseUrl);

  const validateCoupon = (code: string) => {
    return publicRequest.get(`/code/${code}`);
  };

  return {
    validateCoupon,
  };
};

export default apisCart;
