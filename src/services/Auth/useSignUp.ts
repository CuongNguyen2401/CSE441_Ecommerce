import {CreateUserPayload} from '@services/Auth/types';
import {useMutation, UseMutationOptions} from 'react-query';
import {authApi} from '.';
import {API_KEYS} from '../keys';

export const useSignUp = (
  options?: UseMutationOptions<any, any, CreateUserPayload>,
) => {
  const {mutate, isLoading, error, data} = useMutation<
    any,
    any,
    CreateUserPayload
  >({
    mutationKey: [API_KEYS.SIGN_UP],
    mutationFn: async (payload: CreateUserPayload) => {
      const response = await authApi.signUp(payload);
      return response.data;
    },
    ...options,
  });

  return {
    signUp: mutate,
    isSigningUp: isLoading,
    userData: data,
    error,
  };
};
