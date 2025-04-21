import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TamaguiProvider } from 'tamagui';
import tamaguiConfig from './tamagui.config';
import AppNavigator from './src/navigation/AppNavigator.tsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App(): React.JSX.Element {

  const isDarkMode = useColorScheme() === 'dark';


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
