import React, {StrictMode} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {QueryClient, QueryClientProvider} from 'react-query';
import {TamaguiProvider} from 'tamagui';
import AppNavigator from './src/navigation/AppNavigator.tsx';
import tamaguiConfig from './tamagui.config';
import {CartProvider} from './src/context/CartContext.tsx';

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
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <TamaguiProvider config={tamaguiConfig}>
            <SafeAreaProvider>
              <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={isDarkMode ? '#000' : '#fff'}
              />
              <AppNavigator />
            </SafeAreaProvider>
          </TamaguiProvider>
          <Toast />
        </CartProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}

export default App;
