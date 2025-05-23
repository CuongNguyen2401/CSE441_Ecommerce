import {useMutation} from 'react-query';
import {OrderRequest} from './types';
import {CART_KEYS} from './keys';
import {paymentApis} from '.';

export const useProcessPayment = () => {
  const {mutate, isLoading, error, data} = useMutation(
    ['process-payment'],
    (orderData: OrderRequest) => paymentApis.processPayment(orderData),
    {
      onSuccess: response => {
        // The VNPay endpoint returns a URL to redirect to
        const paymentUrl = response.data;
        if (paymentUrl) {
          // In a real app, you'd open this URL for payment
          console.log('Redirecting to payment URL:', paymentUrl);
          // window.location.href = paymentUrl; // For web
          // For React Native, you could use Linking or WebView
        }
      },
      onError: (err: any) => {
        console.error(
          'Failed to process payment:',
          err.response?.data?.message || err,
        );
      },
    },
  );

  return {
    processPayment: mutate,
    isProcessing: isLoading,
    error,
    paymentData: data?.data,
  };
};
