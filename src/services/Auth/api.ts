import { useHttpPrivateRequest } from "services/http/useHttpPrivateRequest";
import useHttpPublicRequest from "services/http/useHttpPublicRequest";
import { LoginPayload } from "./types";
import {  API_URL } from "services/keys";


const useApi = (baseURL = API_URL) => {
  const publicApi = useHttpPublicRequest(baseURL);
  const privateApi = useHttpPrivateRequest(baseURL);

  const authenticate = (payload: LoginPayload) => {
    return publicApi.post('/api/v1/auth/token', payload);
  };

  const getUserInfo = () => {
    return privateApi.get('/api/v1/users/me');
  };

  const getRefreshToken = () => {
    return publicApi.post('/api/v1/auth/refresh');
  };

  const getStudentProfileById = (userId: string) => {
    return privateApi.get(`/api/v1/users/students/profile/${userId}`);
  };
  const getProfileByUserId = (userId: string) => {
    return privateApi.get(`/api/v1/users/admins/profile/${userId}`);
  };

  return {
    getProfileByUserId,
    getStudentProfileById,
    authenticate,
    getUserInfo,
    getRefreshToken,
  };
};

export default useApi;
