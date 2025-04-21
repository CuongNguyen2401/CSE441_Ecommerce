import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
    YStack,
    XStack,
    Text,
    Button,
    Input,
    Form,
    Separator,
    Image,
    ScrollView
} from 'tamagui';
import {useAuthStore} from '../../../store/authStore';

const LoginScreen = () => {
    const navigation = useNavigation();
    const login = useAuthStore(state => state.login);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async () => {
        if (!email || !password) {
            setError('Please enter both email and password');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            await login(email, password);
        } catch (err) {
            setError('Invalid email or password');
        } finally {
            setIsLoading(false);
        }
    };

	return (
        <ScrollView flex={1} backgroundColor="$background">
            <YStack padding="$6" space="$4" flex={1} justifyContent="center">
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
                    <YStack space="$4">
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
                                onPress={() => navigation.navigate('ForgotPassword', {screen: 'ForgotPassword'})}
                            >
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
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </YStack>
                </Form>

                <YStack alignItems="center" marginTop="$4">
                    <XStack space="$2" alignItems="center">
                        <Text fontSize="$3" color="$color">
                            Don't have an account?
                        </Text>
                        <Button
                            variant="outlined"
                            // @ts-ignore
                            onPress={() => navigation.navigate('Register', { screen: 'Register' })}
                        >
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