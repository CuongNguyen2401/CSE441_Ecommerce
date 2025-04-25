import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList, NavigationRoutes} from '../../../navigation/types';
import React, {useState} from 'react';
import {
  Button,
  Form,
  Image,
  Input,
  ScrollView,
  Text,
  XStack,
  YStack,
} from 'tamagui';
import {Alert} from 'react-native';
import {useLogin} from 'services/Auth/useLogin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuthStore} from 'store/auth/useAuthStore';
import {useGetUserInfo} from 'services/Auth/useGetUserInfo';

const LoginScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {setUser, setTokens} = useAuthStore();
  const {data: userinfo, onGetUserInfo} = useGetUserInfo();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const {onLogin} = useLogin({
    onSuccess: data => {
      const {accessToken, refreshToken} = data.result;
      Alert.alert('Login Success', 'You have successfully logged in', [
        {
          text: accessToken,
          onPress: () => console.log('OK Pressed'),
        },
      ]);
      AsyncStorage.setItem('accessToken', accessToken).catch(error => {
        console.error('Failed to save access token:', error);
      });
      setTokens(accessToken, refreshToken);
      //test
      if (accessToken) {
        onGetUserInfo().catch(error => {
          console.error('Failed to get user info:', error);
        });
        console.log('🚀 ~ LoginScreen ~ userinfo:', userinfo);
      }
    },
    onError: error => {
      console.error('Login failed:', error);
    },
  });

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setIsLoading(true);
    setError('');
    navigation.reset({
      index: 0,
      routes: [{name: NavigationRoutes.MAIN}],
    });
  };

  return (
    <ScrollView flex={1} backgroundColor="$background">
      <YStack padding="$6" gap="$4" flex={1} justifyContent="center">
        <YStack alignItems="center" marginVertical="$6">
          <Image
            source={{uri: 'https://placekitten.com/200/200'}}
            width={120}
            height={120}
            borderRadius={60}
            marginBottom="$4"
          />
          <Text fontSize="$8" fontWeight="bold" color="$color">
            CSE441
          </Text>
          <Text fontSize="$3" color="$color" opacity={0.7}>
            Sign in to continue
          </Text>
        </YStack>

        <Form onSubmit={handleLogin}>
          <YStack gap="$4">
            <YStack>
              <Text fontSize="$3" color="$color" marginBottom="$2">
                Email
              </Text>
              <Input
                size="$4"
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </YStack>

            <YStack>
              <Text fontSize="$3" color="$color" marginBottom="$2">
                Password
              </Text>
              <Input
                size="$4"
                placeholder="Enter your password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </YStack>

            <XStack justifyContent="flex-end">
              <Button
                variant="outlined"
                onPress={() =>
                  navigation.navigate(NavigationRoutes.FORGOT_PASSWORD, {
                    screen: NavigationRoutes.FORGOT_PASSWORD,
                    params: {email: email},
                  })
                }>
                <Text color="$blue10" fontSize="$3">
                  Forgot Password?
                </Text>
              </Button>
            </XStack>

            {error ? (
              <Text color="$red10" fontSize="$2" textAlign="center">
                {error}
              </Text>
            ) : null}

            <Button
              themeInverse
              size="$4"
              onPress={handleLogin}
              disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </YStack>
        </Form>

        <YStack alignItems="center" marginTop="$4">
          <XStack gap="$2" alignItems="center">
            <Text fontSize="$3" color="$color">
              Don't have an account?
            </Text>
            <Button
              onPress={() =>
                navigation.navigate(NavigationRoutes.AUTH, {
                  screen: NavigationRoutes.REGISTER,
                })
              }>
              <Text color="$blue10" fontSize="$3" fontWeight="bold">
                Sign Up
              </Text>
            </Button>
          </XStack>
        </YStack>
      </YStack>
    </ScrollView>
  );
};

export default LoginScreen;
