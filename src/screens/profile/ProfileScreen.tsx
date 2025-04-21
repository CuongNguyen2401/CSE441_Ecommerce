import React from 'react';
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
	Separator,
	Avatar,
	View
} from 'tamagui';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useAuthStore} from "../../store/authStore";

// Mock user data for demonstration
const userData = {
	id: 1,
	name: 'John Doe',
	email: 'john.doe@example.com',
	phone: '(555) 123-4567',
	avatar: 'https://placekitten.com/200/200',
	memberSince: '2022-01-15',
	addresses: [
		{
			id: 1,
			name: 'John Doe',
			street: '123 Main St',
			city: 'New York',
			state: 'NY',
			zip: '10001',
			country: 'United States',
			phone: '(555) 123-4567',
			isDefault: true
		}
	],
	paymentMethods: [
		{
			id: 1,
			type: 'Credit Card',
			last4: '1234',
			expiry: '12/25',
			isDefault: true
		}
	]
};

const ProfileScreen = () => {
	const navigation = useNavigation();
	const logout = useAuthStore((state: { logout: any; }) => state.logout);

	const handleEditProfile = () => {
		//navigation.navigate('EditProfile');
	};

	const handleAddresses = () => {
		//navigation.navigate('Addresses');
	};

	const handleSettings = () => {
		//navigation.navigate('Settings');
	};

	const handleAbout = () => {
		//navigation.navigate('About');
	};

	const handleLogout = () => {
		logout();
		// Navigation will be handled by the auth state change in AppNavigator
	};

	const formatDate = (dateString: string | number | Date) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	};

	return (
		<ScrollView flex={1} backgroundColor="$background">
			<YStack padding="$4" space="$4">
				{/* Profile Header */}
				<Card bordered padding="$4">
					<YStack space="$4" alignItems="center">
						<Avatar circular size="$10">
							<Avatar.Image src={userData.avatar}/>
							<Avatar.Fallback backgroundColor="$blue10">
								<Text color="white" fontSize="$6">
									{userData.name.split(' ').map(n => n[0]).join('')}
								</Text>
							</Avatar.Fallback>
						</Avatar>

						<YStack alignItems="center">
							<Text fontSize="$6" fontWeight="bold">{userData.name}</Text>
							<Text fontSize="$3" color="$gray10">{userData.email}</Text>
							<Text fontSize="$2" color="$gray10" marginTop="$1">
								Member since {formatDate(userData.memberSince)}
							</Text>
						</YStack>

						<Button size="$3" onPress={handleEditProfile}>
							<Icon name="edit" size={16}/>
							<Text marginLeft="$1">Edit Profile</Text>
						</Button>
					</YStack>
				</Card>

				{/* Quick Actions */}
				<YStack space="$3">
					<H4>Account</H4>

					<Card bordered>
						<YStack>
							<Button
								size="$4"
								justifyContent="flex-start"
								backgroundColor="transparent"
								//onPress={() => navigation.navigate('OrdersTab')}
							>
								<XStack space="$3" flex={1} alignItems="center">
									<Icon name="receipt" size={24} color="#666"/>
									<Text fontSize="$3">My Orders</Text>
									<View flex={1}/>
									<Icon name="chevron-right" size={24} color="#666"/>
								</XStack>
							</Button>

							<Separator/>

							<Button
								size="$4"
								justifyContent="flex-start"
								backgroundColor="transparent"
								onPress={handleAddresses}
							>
								<XStack space="$3" flex={1} alignItems="center">
									<Icon name="location-on" size={24} color="#666"/>
									<Text fontSize="$3">My Addresses</Text>
									<View flex={1}/>
									<Icon name="chevron-right" size={24} color="#666"/>
								</XStack>
							</Button>

							<Separator/>

							<Button
								size="$4"
								justifyContent="flex-start"
								backgroundColor="transparent"
								//onPress={() => navigation.navigate('CartTab')}
							>
								<XStack space="$3" flex={1} alignItems="center">
									<Icon name="shopping-cart" size={24} color="#666"/>
									<Text fontSize="$3">My Cart</Text>
									<View flex={1}/>
									<Icon name="chevron-right" size={24} color="#666"/>
								</XStack>
							</Button>
						</YStack>
					</Card>
				</YStack>

				{/* Default Address */}
				{userData.addresses.length > 0 && (
					<YStack space="$3">
						<XStack justifyContent="space-between" alignItems="center">
							<H4>Default Address</H4>
							<Button size="$2" onPress={handleAddresses}>
								<Text fontSize="$2" color="$blue10">View All</Text>
							</Button>
						</XStack>

						<Card bordered padding="$3">
							<YStack space="$1">
								<Text fontSize="$3" fontWeight="bold">{userData.addresses[0].name}</Text>
								<Text fontSize="$2">{userData.addresses[0].street}</Text>
								<Text fontSize="$2">
									{`${userData.addresses[0].city}, ${userData.addresses[0].state} ${userData.addresses[0].zip}`}
								</Text>
								<Text fontSize="$2">{userData.addresses[0].country}</Text>
								<Text fontSize="$2">{userData.addresses[0].phone}</Text>
							</YStack>
						</Card>
					</YStack>
				)}

				{/* Payment Methods */}
				{userData.paymentMethods.length > 0 && (
					<YStack space="$3">
						<H4>Payment Methods</H4>

						<Card bordered padding="$3">
							<XStack space="$3" alignItems="center">
								<Icon name="credit-card" size={24} color="#666"/>
								<YStack>
									<Text fontSize="$3" fontWeight="bold">
										{userData.paymentMethods[0].type}
									</Text>
									<Text fontSize="$2" color="$gray10">
										•••• {userData.paymentMethods[0].last4} |
										Expires {userData.paymentMethods[0].expiry}
									</Text>
								</YStack>
							</XStack>
						</Card>
					</YStack>
				)}

				{/* Settings */}
				<YStack space="$3">
					<H4>Settings</H4>

					<Card bordered>
						<YStack>
							<Button
								size="$4"
								justifyContent="flex-start"
								backgroundColor="transparent"
								onPress={handleSettings}
							>
								<XStack space="$3" flex={1} alignItems="center">
									<Icon name="settings" size={24} color="#666"/>
									<Text fontSize="$3">App Settings</Text>
									<View flex={1}/>
									<Icon name="chevron-right" size={24} color="#666"/>
								</XStack>
							</Button>

							<Separator/>

							<Button
								size="$4"
								justifyContent="flex-start"
								backgroundColor="transparent"
								onPress={handleAbout}
							>
								<XStack space="$3" flex={1} alignItems="center">
									<Icon name="info" size={24} color="#666"/>
									<Text fontSize="$3">About</Text>
									<View flex={1}/>
									<Icon name="chevron-right" size={24} color="#666"/>
								</XStack>
							</Button>
						</YStack>
					</Card>
				</YStack>

				{/* Logout Button */}
				<Button
					size="$4"
					backgroundColor="$red10"
					color="white"
					onPress={handleLogout}
					marginTop="$2"
				>
					<Icon name="logout" size={20} color="white"/>
					<Text color="white" marginLeft="$1">Logout</Text>
				</Button>
			</YStack>
		</ScrollView>
	);
};

export default ProfileScreen;