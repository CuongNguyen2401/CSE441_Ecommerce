import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
	YStack,
	XStack,
	Text,
	Button,
	ScrollView,
	Card,
	H4,
	Separator,
	AlertDialog,
	Paragraph,
} from 'tamagui';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ProfileStackParamList} from '../../navigation/types';

// Mock data for demonstration
const addresses = [
	{
		id: 1,
		name: 'John Doe',
		street: '123 Main St',
		city: 'New York',
		state: 'NY',
		zip: '10001',
		country: 'United States',
		phone: '(555) 123-4567',
		isDefault: true,
	},
	{
		id: 2,
		name: 'John Doe',
		street: '456 Park Ave',
		city: 'Boston',
		state: 'MA',
		zip: '02108',
		country: 'United States',
		phone: '(555) 987-6543',
		isDefault: false,
	},
];

const AddressesScreen: React.FC = () => {
	const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParamList>>();
	const [userAddresses, setUserAddresses] = useState(addresses);
	const [addressToDelete, setAddressToDelete] = useState<number | null>(null);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

	const handleAddAddress = () => {
		navigation.navigate('AddAddress');
	};

	const handleEditAddress = (addressId: number) => {
		navigation.navigate('EditAddress', {addressId: addressId});
	};

	const handleDeleteAddress = (addressId: number) => {
		setAddressToDelete(addressId);
		setDeleteDialogOpen(true);
	};

	const confirmDeleteAddress = () => {
		if (addressToDelete) {
			setUserAddresses(userAddresses.filter(address => address.id !== addressToDelete));
			setAddressToDelete(null);
		}
		setDeleteDialogOpen(false);
	};

	const handleSetAsDefault = (addressId: number) => {
		setUserAddresses(userAddresses.map(address => ({
			...address,
			isDefault: address.id === addressId,
		})));
	};

	return (
		<YStack flex={1} backgroundColor="$background">
			<ScrollView flex={1}>
				<YStack padding="$4" space="$4">
					<XStack justifyContent="space-between" alignItems="center">
						<H4>My Addresses</H4>
						<Button size="$3" onPress={handleAddAddress}>
							<Icon name="add" size={20}/>
							<Text marginLeft="$1">Add New</Text>
						</Button>
					</XStack>

					{userAddresses.length === 0 ? (
						<YStack height={200} justifyContent="center" alignItems="center">
							<Icon name="location-off" size={48} color="#ccc"/>
							<Text fontSize="$4" color="$gray10" marginTop="$2">
								No addresses found
							</Text>
							<Button
								marginTop="$4"
								size="$4"
								themeInverse
								onPress={handleAddAddress}
							>
								Add Address
							</Button>
						</YStack>
					) : (
						<YStack space="$3">
							{userAddresses.map(address => (
								<Card key={address.id} bordered padding="$3">
									<YStack space="$3">
										<XStack justifyContent="space-between" alignItems="center">
											<Text fontSize="$3" fontWeight="bold">{address.name}</Text>
											{address.isDefault && (
												<Text fontSize="$2" color="$blue10" fontWeight="bold">
													Default
												</Text>
											)}
										</XStack>

										<YStack space="$1">
											<Text fontSize="$3">{address.street}</Text>
											<Text fontSize="$3">
												{`${address.city}, ${address.state} ${address.zip}`}
											</Text>
											<Text fontSize="$3">{address.country}</Text>
											<Text fontSize="$3">{address.phone}</Text>
										</YStack>

										<Separator/>

										<XStack justifyContent="space-between">
											<Button
												size="$3"
												variant="outlined"
												onPress={() => handleEditAddress(address.id)}
											>
												<Icon name="edit" size={16}/>
												<Text marginLeft="$1">Edit</Text>
											</Button>

											<Button
												size="$3"
												variant="outlined"
												theme="red"
												onPress={() => handleDeleteAddress(address.id)}
											>
												<Icon name="delete" size={16}/>
												<Text marginLeft="$1">Delete</Text>
											</Button>

											{!address.isDefault && (
												<Button
													size="$3"
													variant="outlined"
													theme="blue"
													onPress={() => handleSetAsDefault(address.id)}
												>
													<Icon name="check" size={16}/>
													<Text marginLeft="$1">Set as Default</Text>
												</Button>
											)}
										</XStack>
									</YStack>
								</Card>
							))}
						</YStack>
					)}
				</YStack>
			</ScrollView>

			<AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
				<AlertDialog.Portal>
					<AlertDialog.Overlay
						key="overlay"
						animation="unset"
						opacity={0.5}
						enterStyle={{opacity: 0}}
						exitStyle={{opacity: 0}}
					/>
					<AlertDialog.Content
						bordered
						elevate
						key="content"
						animation="unset"
						enterStyle={{x: 0, y: -20, opacity: 0, scale: 0.9}}
						exitStyle={{x: 0, y: 10, opacity: 0, scale: 0.95}}
						x={0}
						scale={1}
						opacity={1}
						y={0}
					>
						<YStack space>
							<AlertDialog.Title>Delete Address</AlertDialog.Title>
							<AlertDialog.Description>
								Are you sure you want to delete this address? This action cannot be undone.
							</AlertDialog.Description>

							<XStack space="$3" justifyContent="flex-end">
								<AlertDialog.Cancel asChild>
									<Button>Cancel</Button>
								</AlertDialog.Cancel>
								<AlertDialog.Action asChild>
									<Button theme="red" onPress={confirmDeleteAddress}>Delete</Button>
								</AlertDialog.Action>
							</XStack>
						</YStack>
					</AlertDialog.Content>
				</AlertDialog.Portal>
			</AlertDialog>
		</YStack>
	);
};

export default AddressesScreen;
