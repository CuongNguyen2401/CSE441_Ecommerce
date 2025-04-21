
import { UseMutationOptions, useMutation } from 'react-query';
import { authApi } from '.';
import { ApiResponseType, responseWrapper } from 'services/helpers';
import { Auth, RefreshTokenPayload } from './types';

export function useRefreshToken(
  options?: UseMutationOptions<ApiResponseType<Auth>, Error, RefreshTokenPayload>,
) {
  const {
    mutate: onRefreshToken,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<Auth>, Error, RefreshTokenPayload>({
    mutationFn: (payload: RefreshTokenPayload) =>
      responseWrapper(authApi.getRefreshToken, [payload]),
    ...options,
  });

  return {
    onRefreshToken,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
