import {useAuthStore} from 'store/auth/useAuthStore';

export const useProfileScreen = () => {
  const {user} = useAuthStore();

  return {
    state: {
      user,
    },
  };
};
