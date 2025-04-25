import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosInstance } from 'axios';

export const useHttpPrivateRequest = (baseURL: string): AxiosInstance => {
  const apiInstance = axios.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: 0,
      Accept: 'application/json',
    },
    timeout: 30000,
  });

  // Request interceptor to add Authorization header
  apiInstance.interceptors.request.use(
    async config => {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      return config;
    },
    // eslint-disable-next-line promise/no-promise-in-callback
    error => Promise.reject(error),
  );

  // Response interceptor to handle 401 errors and refresh token
  apiInstance.interceptors.response.use(
    response => response,
    async error => {
      const {response} = error;
      const originalRequest = error.config;
      if (response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const refreshToken = await AsyncStorage.getItem('refreshToken');

        if (refreshToken) {
          // Example of how you might use your refresh token API
          const {data} = await axios.post(`${baseURL}/refresh-token`, {
            refreshToken,
          });
          const newAccessToken = data.result.accessToken;

          // Store new tokens in AsyncStorage
          await AsyncStorage.setItem('accessToken', newAccessToken);
          await AsyncStorage.setItem('refreshToken', data.result.refreshToken);

          // Set Authorization header with new access token
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

          return apiInstance(originalRequest);
        }
      }

      return Promise.reject(error);
    },
  );

  return apiInstance;
};