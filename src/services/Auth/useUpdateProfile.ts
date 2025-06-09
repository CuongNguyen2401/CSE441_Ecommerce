import { UpdateProfileRequest } from '@services/Auth/types';
import { useMutation, UseMutationOptions } from 'react-query';
import { authApi } from '.';
import { API_KEYS } from '../keys';


export const useUpdateProfile = (
  options?: UseMutationOptions<void, any, UpdateProfileRequest>,
) => {

  const {mutate, isLoading, error, data} = useMutation<
    void,
    any,
    UpdateProfileRequest
  >({
    mutationKey: [API_KEYS.UPDATE_PROFILE],
    mutationFn: async ({userData, avatarFile}: UpdateProfileRequest) => {
      const response = await authApi.updateUserWithAvatar(userData, avatarFile);
      return response.data;
    },
    ...options,
  });

  return {
    updateProfile: mutate,
    isUpdating: isLoading,
    profileData: data,
    error,
  };
};
