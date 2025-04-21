import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
	Button,
	Checkbox,
	Form,
	Input,
	Label,
	ScrollView,
	Text,
	XStack,
	YStack
} from 'tamagui';
import { useAuthStore } from '../../../store/authStore';

const RegisterScreen = () => {
	const navigation = useNavigation();
	const register = useAuthStore(state => state.register);

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [agreeToTerms, setAgreeToTerms] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const handleRegister = async () => {
		if (!name || !email || !password || !confirmPassword) {
			setError('Please fill in all fields');
			return;
		}

		if (password !== confirmPassword) {
			setError('Passwords do not match');
			return;
		}

		if (!agreeToTerms) {
			setError('Please agree to the terms and conditions');
			return;
		}

		setIsLoading(true);
		setError('');

		try {
			await register(name, email, password);
			// Navigation will be handled by the auth state change in AppNavigator
		} catch (err) {
			setError('Registration failed. Please try again.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<ScrollView flex={1} backgroundColor="$background">
			<YStack padding="$6" space="$4" flex={1}>
				<YStack alignItems="center" marginVertical="$4">
					<Text fontSize="$8" fontWeight="bold" color="$color">
						Create Account
					</Text>
					<Text fontSize="$3" color="$color" opacity={0.7}>
						Sign up to get started
					</Text>
				</YStack>

				<Form onSubmit={handleRegister}>
					<YStack space="$4">
						<YStack>
							<Text fontSize="$3" color="$color" marginBottom="$2">
								Full Name
							</Text>
							<Input
								size="$4"
								placeholder="Enter your full name"
								value={name}
								onChangeText={setName}
							/>
						</YStack>

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
								placeholder="Create a password"
								secureTextEntry
								value={password}
								onChangeText={setPassword}
							/>
						</YStack>

						<YStack>
							<Text fontSize="$3" color="$color" marginBottom="$2">
								Confirm Password
							</Text>
							<Input
								size="$4"
								placeholder="Confirm your password"
								secureTextEntry
								value={confirmPassword}
								onChangeText={setConfirmPassword}
							/>
						</YStack>

						<XStack alignItems="center" space="$2">
							<Checkbox
								id="terms"
								checked={agreeToTerms}
								onCheckedChange={(checked) => setAgreeToTerms(!!checked)}
							>
								<Checkbox.Indicator>
									<Text>✓</Text>
								</Checkbox.Indicator>
							</Checkbox>
							<Label htmlFor="terms" fontSize="$2" color="$color">
								I agree to the Terms and Conditions
							</Label>
						</XStack>

						{error ? (
							<Text color="$red10" fontSize="$2" textAlign="center">
								{error}
							</Text>
						) : null}

						<Button
							themeInverse
							size="$4"
							onPress={handleRegister}
							disabled={isLoading}
						>
							{isLoading ? 'Creating Account...' : 'Create Account'}
						</Button>
					</YStack>
				</Form>

				<YStack alignItems="center" marginTop="$4">
					<XStack space="$2" alignItems="center">
						<Text fontSize="$3" color="$color">
							Already have an account?
						</Text>
						<Button
							variant="outlined"
							// @ts-ignore
							onPress={() => navigation.navigate('Login', {screen: 'Login'})}
						>
							<Text color="$blue10" fontSize="$3" fontWeight="bold">
								Sign In
							</Text>
						</Button>
					</XStack>
				</YStack>
			</YStack>
		</ScrollView>
	);
};

export default RegisterScreen;
