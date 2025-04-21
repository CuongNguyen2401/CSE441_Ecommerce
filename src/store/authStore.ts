import {create} from 'zustand';
import {AuthState} from "./helpers";
import {authService} from "../services/auth-service/authService";

export const useAuthStore = create<AuthState>((set, get) => ({
	user: null,
	isAuthenticated: false,
	isLoading: false,
	error: null,
	resetPassword: async (email: string) => {
		try {
			set({isLoading: true, error: null});
			await authService.resetPassword(email);
			set({isLoading: false});
		} catch (error) {
			set({
				isLoading: false,
				error: error instanceof Error ? error.message : 'Failed to reset password',
			});
			throw error;
		}
	},

	login: async (email, password) => {
		try {
			set({isLoading: true, error: null});
			const response = await authService.login({email, password});
			set({
				user: response.user,
				isAuthenticated: true,
				isLoading: false,
			});
		} catch (error) {
			set({
				isLoading: false,
				error: error instanceof Error ? error.message : 'Failed to login',
			});
			throw error;
		}
	},

	register: async (email, password, firstName) => {
		try {
			set({isLoading: true, error: null});
			const response = await authService.register({email, password, firstName});
			set({
				user: response.user,
				isAuthenticated: true,
				isLoading: false,
			});
		} catch (error) {
			set({
				isLoading: false,
				error: error instanceof Error ? error.message : 'Failed to register',
			});
			throw error;
		}
	},

	logout: async () => {
		try {
			set({isLoading: true});
			await authService.logout();
			set({
				user: null,
				isAuthenticated: false,
				isLoading: false,
			});
		} catch (error) {
			set({
				isLoading: false,
				error: error instanceof Error ? error.message : 'Failed to logout',
			});
		}
	},

	checkAuth: async () => {
		try {
			set({isLoading: true});
			const isAuthenticated = await authService.isAuthenticated();

			if (isAuthenticated) {
				const user = await authService.getCurrentUser();
				set({
					user,
					isAuthenticated: true,
					isLoading: false,
				});
			} else {
				set({
					user: null,
					isAuthenticated: false,
					isLoading: false,
				});
			}
		} catch (error) {
			set({
				user: null,
				isAuthenticated: false,
				isLoading: false,
				error: error instanceof Error ? error.message : 'Failed to check auth-service',
			});
		}
	},

	clearError: () => {
		set({error: null});
	},
}));
