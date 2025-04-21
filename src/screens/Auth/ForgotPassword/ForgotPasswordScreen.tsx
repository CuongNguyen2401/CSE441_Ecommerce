import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    Button,
    Form,
    Image,
    Input,
    ScrollView,
    Text,
    XStack,
    YStack
} from 'tamagui';

const ForgotPasswordScreen = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleResetPassword = async () => {
        if (!email) {
            setError('Please enter your email address');
            return;
        }

        setIsLoading(true);
        setError('');

     
    };

    return (
        <ScrollView flex={1} backgroundColor="$background">
            <YStack padding="$4" space="$4" flex={1} justifyContent="center">
                <YStack alignItems="center" marginVertical="$6">
                    <Image
                        source={{uri: 'https://placekitten.com/200/200'}}
                        width={100}
                        height={100}
                        borderRadius={50}
                        marginBottom="$4"
                    />
                    <Text fontSize="$8" fontWeight="bold" color="$color">
                        Forgot Password
                    </Text>
                    <Text fontSize="$3" color="$color" opacity={0.7} textAlign="center" marginTop="$2">
                        Enter your email address and we'll send you a link to reset your password
                    </Text>
                </YStack>

                {success ? (
                    <YStack space="$4" alignItems="center">
                        <Text fontSize="$4" color="$green10" textAlign="center">
                            Password reset email sent!
                        </Text>
                        <Text fontSize="$3" color="$color" opacity={0.7} textAlign="center">
                            Please check your email and follow the instructions to reset your password.
                        </Text>
                        <Button
                            themeInverse
                            size="$4"
                            onPress={() => navigation.navigate('Auth', { screen: 'Login' })}
                            marginTop="$4"
                        >
                            Back to Login
                        </Button>
                    </YStack>
                ) : (
                    <Form onSubmit={handleResetPassword}>
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

                            {error ? (
                                <Text color="$red10" fontSize="$2" textAlign="center">
                                    {error}
                                </Text>
                            ) : null}

                            <Button
                                themeInverse
                                size="$4"
                                onPress={handleResetPassword}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Sending...' : 'Reset Password'}
                            </Button>
                        </YStack>
                    </Form>
                )}

                <YStack alignItems="center" marginTop="$4">
                    <XStack space="$2" alignItems="center">
                        <Text fontSize="$2" color="$color">
                            Remember your password?
                        </Text>
                        <Button
                            variant="outlined"
                            onPress={() => navigation.navigate('Auth', { screen: 'Login' })}
                        >
                            <Text color="$blue10" fontSize="$2" fontWeight="bold">
                                Sign In
                            </Text>
                        </Button>
                    </XStack>
                </YStack>
            </YStack>
        </ScrollView>
    );
};

export default ForgotPasswordScreen;