import React, {StrictMode} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import Toast from 'react-native-toast-message';
import {QueryClient, QueryClientProvider} from 'react-query';
import {TamaguiProvider} from 'tamagui';
import AppNavigator from './src/navigation/AppNavigator.tsx';
import tamaguiConfig from './tamagui.config';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5000,
    },
  },
});

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <StrictMode>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <TamaguiProvider config={tamaguiConfig}>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              backgroundColor={isDarkMode ? '#000' : '#fff'}
            />
            <AppNavigator />
          </TamaguiProvider>
          <Toast />
        </QueryClientProvider>
      </SafeAreaProvider>
    </StrictMode>
  );
}

export default App;
