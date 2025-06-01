import {useMutation} from 'react-query';
import {orderApis, CouponResponse} from '.';

export const useValidateCoupon = () => {
  const {mutate, isLoading, error, data, reset} = useMutation<
    CouponResponse,
    any,
    string
  >({
    mutationKey: ['validate-coupon'],
    mutationFn: async (couponCode: string) => {
      if (couponCode === 'SAVE10') {
        return {
          id: 1,
          code: 'SAVE10',
          discount: 0.1, // 10% discount
          expiryDate: '2025-12-31',
          description: '10% off your order',
          quantity: 100,
        };
      } else if (couponCode === 'SAVE20') {
        return {
          id: 2,
          code: 'SAVE20',
          discount: 0.2, // 20% discount
          expiryDate: '2025-12-31',
          description: '20% off your order',
          quantity: 50,
        };
      } else {
        throw new Error('Invalid coupon code');
      }
    },
    onSuccess: response => {
      console.log('Coupon validated successfully:', response);
    },
    onError: (err: any) => {
      console.error('Failed to validate coupon:', err.message || err);
    },
  });

  return {
    validateCoupon: mutate,
    isValidating: isLoading,
    validCoupon: data,
    error,
    clearError: reset,
  };
};
