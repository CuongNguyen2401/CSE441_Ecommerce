import {useQuery, useQueryClient, UseQueryOptions} from 'react-query';
import {ApiResponseType, responseWrapper} from '../helpers';
import {authApi} from '.';
import {isEmpty} from 'utils';
import {API_KEYS} from 'services/keys';

export function useGetProfileByUserId<StudentResponse>(
  options?: UseQueryOptions<ApiResponseType<StudentResponse>, Error> & {
    id: string;
  },
) {
  const {
    data,
    error,
    isFetching,
    refetch: onGetProfileByUserId,
  } = useQuery<ApiResponseType<StudentResponse>, Error>(
    [API_KEYS.PROFILE_BY_ID, {id: options?.id}],
    async () => {
      return responseWrapper<ApiResponseType<StudentResponse>>(
        authApi.getProfileByUserId,
        [options?.id],
      );
    },
    {
      notifyOnChangeProps: ['data', 'isFetching'],
      keepPreviousData: true,
      enabled: !isEmpty(options?.id),
      ...options,
    },
  );

  const queryClient = useQueryClient();

  const handleInvalidProfileByUserId = () =>
    queryClient.invalidateQueries([API_KEYS.PROFILE_BY_ID, {id: options?.id}]);

  const {result: profile} = data ?? {};

  return {
    profile: profile,
    error,
    isFetching,
    onGetProfileByUserId,
    handleInvalidProfileByUserId,
  };
}
