import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { User } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  user: User | null;

  accessTokenState: string | null;
  refreshTokenState: string | null;
  setUser: (user: User) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist<AuthState>(
    set => ({
      user: null,
      role: null,
      accessTokenState: null,
      refreshTokenState: null,

      setUser: user => set({user}),

      setTokens: (accessToken, refreshToken) =>
        set({accessTokenState: accessToken, refreshTokenState: refreshToken}),

      clearAuth: () =>
        set({
          user: null,
          accessTokenState: null,
          refreshTokenState: null,
        }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() =>
       AsyncStorage,
      ),
    },
  ),
);
