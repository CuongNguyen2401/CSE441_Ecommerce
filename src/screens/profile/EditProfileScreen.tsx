import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
	YStack,
	XStack,
	Text,
	Button,
	ScrollView,
	Image,
	Card,
	H4,
	Input,
	Label,
	Avatar,
	Form,
	Spinner
} from 'tamagui';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Mock user data for demonstration
const userData = {
	id: 1,
	name: 'John Doe',
	email: 'john.doe@example.com',
	phone: '(555) 123-4567',
	avatar: 'https://placekitten.com/200/200'
};

const EditProfileScreen = () => {
	const navigation = useNavigation();
	const [name, setName] = useState(userData.name);
	const [email, setEmail] = useState(userData.email);
	const [phone, setPhone] = useState(userData.phone);
	const [avatar, setAvatar] = useState(userData.avatar);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const handleSave = () => {
		if (!name || !email) {
			setError('Name and email are required');
			return;
		}

		setIsLoading(true);
		setError('');

		// Simulate API call
		setTimeout(() => {
			setIsLoading(false);
			navigation.goBack();
		}, 1000);
	};

	const handleChangeAvatar = () => {
		// In a real app, you would open an image picker
		console.log('Change avatar');
	};

	return (
		<ScrollView flex={1} backgroundColor="$background">
			<YStack padding="$4" space="$4">
				<H4>Edit Profile</H4>

				<YStack space="$4" alignItems="center">
					<Avatar circular size="$10">
						<Avatar.Image src={avatar}/>
						<Avatar.Fallback backgroundColor="$blue10">
							<Text color="white" fontSize="$6">
								{name.split(' ').map(n => n[0]).join('')}
							</Text>
						</Avatar.Fallback>
					</Avatar>

					<Button size="$2" onPress={handleChangeAvatar}>
						<Icon name="photo-camera" size={16}/>
						<Text marginLeft="$1">Change Photo</Text>
					</Button>
				</YStack>

				<Form onSubmit={handleSave}>
					<YStack space="$4">
						<YStack space="$1">
							<Label htmlFor="name" fontSize="$3">Full Name</Label>
							<Input
								id="name"
								size="$4"
								value={name}
								onChangeText={setName}
								placeholder="Enter your full name"
							/>
						</YStack>

						<YStack space="$1">
							<Label htmlFor="email" fontSize="$3">Email</Label>
							<Input
								id="email"
								size="$4"
								value={email}
								onChangeText={setEmail}
								placeholder="Enter your email"
								keyboardType="email-address"
								autoCapitalize="none"
							/>
						</YStack>

						<YStack space="$1">
							<Label htmlFor="phone" fontSize="$3">Phone Number</Label>
							<Input
								id="phone"
								size="$4"
								value={phone}
								onChangeText={setPhone}
								placeholder="Enter your phone number"
								keyboardType="phone-pad"
							/>
						</YStack>

						{error ? (
							<Text color="$red10" fontSize="$2" textAlign="center">
								{error}
							</Text>
						) : null}

						<XStack space="$3" marginTop="$2">
							<Button
								flex={1}
								size="$4"
								variant="outlined"
								onPress={() => navigation.goBack()}
								disabled={isLoading}
							>
								Cancel
							</Button>

							<Button
								flex={1}
								size="$4"
								themeInverse
								onPress={handleSave}
								disabled={isLoading}
							>
								{isLoading ? (
									<XStack space="$2" alignItems="center">
										<Spinner size="small" color="white"/>
										<Text color="white">Saving...</Text>
									</XStack>
								) : (
									'Save Changes'
								)}
							</Button>
						</XStack>
					</YStack>
				</Form>

				<Card bordered padding="$3" marginTop="$4">
					<YStack space="$3">
						<Text fontSize="$3" fontWeight="bold" color="$red10">Danger Zone</Text>

						<Button
							size="$4"
							backgroundColor="$red10"
							color="white"
							onPress={() => console.log('Delete account')}
						>
							<Icon name="delete-forever" size={20} color="white"/>
							<Text color="white" marginLeft="$1">Delete Account</Text>
						</Button>
					</YStack>
				</Card>
			</YStack>
		</ScrollView>
	);
};

export default EditProfileScreen;