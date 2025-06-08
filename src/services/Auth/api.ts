import {useHttpPrivateRequest} from 'services/http/useHttpPrivateRequest';
import useHttpPublicRequest from 'services/http/useHttpPublicRequest';
import {CreateUserPayload, LoginPayload, UpdateUserInfoPayload} from './types';
import {API_URL} from 'services/keys';

const useApi = (baseURL = API_URL) => {
  const publicApi = useHttpPublicRequest(baseURL);
  const privateApi = useHttpPrivateRequest(baseURL);

  const authenticate = (payload: LoginPayload) => {
    return publicApi.post('/api/v1/auth/token', payload);
  };

  const getUserInfo = () => {
    return privateApi.get('/api/v1/users/myInfo');
  };

  const getRefreshToken = () => {
    return publicApi.post('/api/v1/auth/refresh');
  };

  const updateUserWithAvatar = (
    userData: UpdateUserInfoPayload,
    avatarFile?: any,
  ) => {
    const formData = new FormData();

    formData.append('user', JSON.stringify(userData));

    if (avatarFile) {
      console.log('Avatar file:', avatarFile);

      formData.append('file', {
        uri: avatarFile.uri,
        type: avatarFile.type ?? 'image/jpeg',
        name: avatarFile.name ?? 'avatar.jpg',
        fileName: avatarFile.fileName ?? avatarFile.name ?? 'avatar.jpg',
      } as any);
    }

    return privateApi.put('/api/v1/users', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };
  
  const signUp = (payload: CreateUserPayload) => {
    return publicApi.post('/api/v1/users', payload);
  };

  return {
    updateUserWithAvatar,
    authenticate,
    getUserInfo,
    getRefreshToken,
    signUp,
  };
};

export default useApi;
