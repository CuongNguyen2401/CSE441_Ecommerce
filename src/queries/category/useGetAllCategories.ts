import {useQuery, useQueryClient, UseQueryOptions} from 'react-query';
import {ApiResponseType, responseWrapper} from 'services/helpers';
import {CategoryResponse} from './types';
import {CATEGORY_KEYS} from './keys';
import {categoryApis} from '.';

export const useGetAllCategories = (
  options?: UseQueryOptions<ApiResponseType<CategoryResponse[]>, Error> & {
    enabled?: boolean;
  },
) => {
  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch: onGetAllCategories,
  } = useQuery<ApiResponseType<CategoryResponse[]>, Error>(
    [CATEGORY_KEYS.GET_CATEGORIES],
    ({queryKey}) => {
      const [, ...params] = queryKey; // Destructure the queryKey to get the params
      return responseWrapper<ApiResponseType<CategoryResponse[]>>(
        categoryApis.getCategories,
      );
    },
    {
      notifyOnChangeProps: ['data', 'isFetching'],
      keepPreviousData: true,
      enabled: options?.enabled,
      ...options,
    },
  );
  const queryClient = useQueryClient();

  const handleInvalidateCategories = () => {
    queryClient.invalidateQueries(CATEGORY_KEYS.GET_CATEGORIES);
  };

  return {
    categories: data?.result || [],
    isPending: isLoading || isFetching,
    isError,
    error,
    onGetAllCategories,
    handleInvalidateCategories,
  };
};
