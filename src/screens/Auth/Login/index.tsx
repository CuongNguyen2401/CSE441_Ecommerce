import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Alert} from 'react-native';
import {useGetUserInfo} from 'services/Auth/useGetUserInfo';
import {useLogin} from 'services/Auth/useLogin';
import {useAuthStore} from 'store/auth/useAuthStore';
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
import {NavigationRoutes, RootStackParamList} from '../../../navigation/types';
import Toast from 'react-native-toast-message';

const LoginScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {setUser, setTokens} = useAuthStore();
  const {onGetUserInfo} = useGetUserInfo({
    onSuccess: userData => {
      setUser(userData);
    },
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {onLogin, isLoading, isError} = useLogin({
    onSuccess: data => {
      const {accessToken, refreshToken} = data.result;
      Toast.show({
        type: 'success',
        text1: 'Login Successful',
        text2: 'Welcome to my app!',
      });
      AsyncStorage.setItem('accessToken', accessToken).catch(error => {
        console.error('Failed to save access token:', error);
      });
      setTokens(accessToken, refreshToken);
      if (accessToken) {
        onGetUserInfo();
        navigation.reset({
          index: 0,
          routes: [{name: NavigationRoutes.MAIN}],
        });
      }
    },
    onError: error => {
      console.error('Login failed:', error);
    },
  });
  const handleSignUp = () => {
    navigation.navigate(NavigationRoutes.AUTH, {
      screen: NavigationRoutes.REGISTER,
    });
  };
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }
    onLogin({username: email, password});
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
                Username
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

            {isError ? (
              <Text color="$red10" fontSize="$2" textAlign="center">
                Please enter both email and password
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
            <Button onPress={handleSignUp}>
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
