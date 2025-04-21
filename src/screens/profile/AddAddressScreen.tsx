import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
	YStack,
	XStack,
	Text,
	Button,
	ScrollView,
	H4,
	Input,
	Label,
	Form,
	Checkbox,
	Spinner
} from 'tamagui';

const AddAddressScreen = () => {
	const navigation = useNavigation();
	const [name, setName] = useState('');
	const [street, setStreet] = useState('');
	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const [zip, setZip] = useState('');
	const [country, setCountry] = useState('United States');
	const [phone, setPhone] = useState('');
	const [isDefault, setIsDefault] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const handleSave = () => {
		// Validate form
		if (!name || !street || !city || !state || !zip || !country || !phone) {
			setError('Please fill in all fields');
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

	return (
		<ScrollView flex={1} backgroundColor="$background">
			<YStack padding="$4" space="$4">
				<H4>Add New Address</H4>

				<Form onSubmit={handleSave}>
					<YStack space="$4">
						<YStack space="$1">
							<Label htmlFor="name" fontSize="$3">Full Name</Label>
							<Input
								id="name"
								size="$4"
								value={name}
								onChangeText={setName}
								placeholder="Enter full name"
							/>
						</YStack>

						<YStack space="$1">
							<Label htmlFor="street" fontSize="$3">Street Address</Label>
							<Input
								id="street"
								size="$4"
								value={street}
								onChangeText={setStreet}
								placeholder="Enter street address"
							/>
						</YStack>

						<YStack space="$1">
							<Label htmlFor="city" fontSize="$3">City</Label>
							<Input
								id="city"
								size="$4"
								value={city}
								onChangeText={setCity}
								placeholder="Enter city"
							/>
						</YStack>

						<XStack space="$2">
							<YStack space="$1" flex={1}>
								<Label htmlFor="state" fontSize="$3">State/Province</Label>
								<Input
									id="state"
									size="$4"
									value={state}
									onChangeText={setState}
									placeholder="Enter state"
								/>
							</YStack>

							<YStack space="$1" flex={1}>
								<Label htmlFor="zip" fontSize="$3">ZIP/Postal Code</Label>
								<Input
									id="zip"
									size="$4"
									value={zip}
									onChangeText={setZip}
									placeholder="Enter ZIP code"
									keyboardType="number-pad"
								/>
							</YStack>
						</XStack>

						<YStack space="$1">
							<Label htmlFor="country" fontSize="$3">Country</Label>
							<Input
								id="country"
								size="$4"
								value={country}
								onChangeText={setCountry}
								placeholder="Enter country"
							/>
						</YStack>

						<YStack space="$1">
							<Label htmlFor="phone" fontSize="$3">Phone Number</Label>
							<Input
								id="phone"
								size="$4"
								value={phone}
								onChangeText={setPhone}
								placeholder="Enter phone number"
								keyboardType="phone-pad"
							/>
						</YStack>

						<XStack space="$2" alignItems="center">
							<Checkbox
								id="isDefault"
								checked={isDefault}
								onCheckedChange={(checked) => setIsDefault(!!checked)}
							>
								<Checkbox.Indicator>
									<Text>✓</Text>
								</Checkbox.Indicator>
							</Checkbox>
							<Label htmlFor="isDefault" fontSize="$3">
								Set as default address
							</Label>
						</XStack>

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
									'Save Address'
								)}
							</Button>
						</XStack>
					</YStack>
				</Form>
			</YStack>
		</ScrollView>
	);
};

export default AddAddressScreen;