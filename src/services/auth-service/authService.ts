import api from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthResponse, LoginCredentials, RegisterData} from './helpers';

export const authService = {
    login: async (credentials: LoginCredentials) => {
        const response = await api.post<AuthResponse>('/auth/login', credentials);

        // Store tokens in AsyncStorage
        await AsyncStorage.setItem('auth_token', response.data.token);
        await AsyncStorage.setItem('refresh_token', response.data.refreshToken);

        return response.data;
    },

    register: async (data: RegisterData) => {
        const response = await api.post<AuthResponse>('/auth/register', data);

        // Store tokens in AsyncStorage
        await AsyncStorage.setItem('auth_token', response.data.token);
        await AsyncStorage.setItem('refresh_token', response.data.refreshToken);

        return response.data;
    },

    logout: async () => {
        try {
            await api.post('/auth/logout');
        } catch (error) {
            console.error('Error during logout:', error);
        } finally {
            // Remove tokens from AsyncStorage
            await AsyncStorage.removeItem('auth_token');
            await AsyncStorage.removeItem('refresh_token');
        }
    },

    isAuthenticated: async () => {
        const token = await AsyncStorage.getItem('auth_token');
        return !!token;
    },

    getCurrentUser: async () => {
        const response = await api.get('/auth/me');
        return response.data;
    },
    resetPassword: async (email: string) => {
        const response = await api.post('/auth/reset-password', { email });
        return response.data;
    }
};