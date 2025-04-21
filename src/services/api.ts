import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import env from '../config/env';

const api = axios.create({
    baseURL: env.apiUrl,
    timeout: env.apiTimeout,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Handle 401 Unauthorized errors (token expired)
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Try to refresh token
                const refreshToken = await AsyncStorage.getItem('refresh_token');
                if (refreshToken) {
                    const response = await axios.post(`${env.apiUrl}/auth/refresh`, {
                        refreshToken,
                    });

                    const {token} = response.data;
                    await AsyncStorage.setItem('auth_token', token);

                    // Retry the original request with the new token
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return axios(originalRequest);
                }
            } catch (refreshError) {
                // If refresh fails, redirect to login
                await AsyncStorage.removeItem('auth_token');
                await AsyncStorage.removeItem('refresh_token');
                // Navigation to login will be handled by the app
            }
        }

        return Promise.reject(error);
    }
);

export default api;
