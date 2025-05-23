import {useMutation} from 'react-query';
import couponApis from './cartApis';
import {CouponResponse} from './types';
import {CART_KEYS} from './keys';
import {useState} from 'react';

export const useValidateCoupon = () => {
  const api = couponApis();
  const [validCoupon, setValidCoupon] = useState<CouponResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {mutate, isLoading} = useMutation(
    [CART_KEYS.VALIDATE_COUPON],
    (code: string) => api.validateCoupon(code),
    {
      onSuccess: response => {
        const coupon = response.data as CouponResponse;
        if (coupon) {
          // Check if coupon is valid (not expired and has quantity)
          const expiryDate = new Date(coupon.expiryDate);
          const now = new Date();

          if (expiryDate < now) {
            setError('This coupon has expired');
            setValidCoupon(null);
            return;
          }

          if (coupon.quantity <= 0) {
            setError('This coupon is no longer available');
            setValidCoupon(null);
            return;
          }

          setValidCoupon(coupon);
          setError(null);
        } else {
          setError('Invalid coupon code');
          setValidCoupon(null);
        }
      },
      onError: (err: any) => {
        setError(err.response?.data?.message || 'Failed to validate coupon');
        setValidCoupon(null);
      },
    },
  );

  const validateCoupon = (code: string) => {
    if (!code.trim()) {
      setError('Please enter a coupon code');
      return;
    }
    mutate(code);
  };

  return {
    validateCoupon,
    validCoupon,
    isValidating: isLoading,
    error,
    clearError: () => setError(null),
    clearCoupon: () => setValidCoupon(null),
  };
};
