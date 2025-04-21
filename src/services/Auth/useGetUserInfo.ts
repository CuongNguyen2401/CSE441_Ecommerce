import { useQuery, useQueryClient, UseQueryOptions } from "react-query";
import { ApiResponseType, responseWrapper } from "services/helpers";
import { User } from "store/auth/types";
import { authApi } from ".";
import { API_KEYS } from "services/keys";


export function useGetUserInfo(
  options?: UseQueryOptions<ApiResponseType<User>, Error, User> & {
    enabled?: boolean;
  },
) {
  const {
    data,
    error,
    isError,
    isFetching,
    refetch: onGetUserInfo,
  } = useQuery<ApiResponseType<User>, Error, User>(
    [API_KEYS.USER_INFO],
    () => responseWrapper<ApiResponseType<User>>(authApi.getUserInfo),
    {
      select: (data) => data?.result,
      notifyOnChangeProps: ['data', 'isFetching'],
      enabled: options?.enabled,
      keepPreviousData: true,
      ...options,
    },
  );
  const queryClient = useQueryClient();

  const handleInvalidateUserInfo = () => queryClient.invalidateQueries(API_KEYS.USER_INFO);

  return {
    data,
    error,
    isError,
    isFetching,
    onGetUserInfo,
    handleInvalidateUserInfo,
  };
}
