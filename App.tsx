import React, {useEffect} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {TamaguiProvider} from 'tamagui';
import Constants from 'expo-constants';
// Import Tamagui config
import tamaguiConfig from './tamagui.config';

// Import navigation
import AppNavigator from './src/navigation/AppNavigator.tsx';

// Import stores
import {useAuthStore} from './src/store/authStore';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App(): React.JSX.Element {
    const apiUrl = Constants.expoConfig?.extra?.apiUrl;
    console.log('API_URL:', apiUrl);
  const isDarkMode = useColorScheme() === 'dark';
  const checkAuth = useAuthStore(state => state.checkAuth);

  // Check auth-service status when app loads
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={isDarkMode ? '#000' : '#fff'}
          />
          <AppNavigator />
        </QueryClientProvider>
      </SafeAreaProvider>
    </TamaguiProvider>
  );
}

export default App;
