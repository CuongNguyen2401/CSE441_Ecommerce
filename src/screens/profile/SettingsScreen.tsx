import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
	YStack,
	XStack,
	Text,
	Button,
	ScrollView,
	Card,
	H4,
	Separator,
	Switch,
	Select,
	Adapt,
	Sheet,
	AlertDialog,
	Paragraph
} from 'tamagui';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SettingsScreen = () => {
	const navigation = useNavigation();

	// Notification settings
	const [pushNotifications, setPushNotifications] = useState(true);
	const [emailNotifications, setEmailNotifications] = useState(true);
	const [orderUpdates, setOrderUpdates] = useState(true);
	const [promotions, setPromotions] = useState(false);

	// App settings
	const [darkMode, setDarkMode] = useState(false);
	const [language, setLanguage] = useState('english');
	const [currency, setCurrency] = useState('usd');

	// Privacy settings
	const [locationTracking, setLocationTracking] = useState(false);
	const [dataSharingConsent, setDataSharingConsent] = useState(false);

	// Clear data dialog
	const [clearDataDialogOpen, setClearDataDialogOpen] = useState(false);

	const handleClearData = () => {
		setClearDataDialogOpen(true);
	};

	const confirmClearData = () => {
		// In a real app, you would clear the user's data
		console.log('Clearing user data');
		setClearDataDialogOpen(false);
	};

	const languages = [
		{id: 'english', name: 'English'},
		{id: 'spanish', name: 'Spanish'},
		{id: 'french', name: 'French'},
		{id: 'german', name: 'German'},
		{id: 'chinese', name: 'Chinese'},
	];

	const currencies = [
		{id: 'usd', name: 'USD ($)'},
		{id: 'eur', name: 'EUR (€)'},
		{id: 'gbp', name: 'GBP (£)'},
		{id: 'jpy', name: 'JPY (¥)'},
		{id: 'cad', name: 'CAD ($)'},
	];

	return (
		<ScrollView flex={1} backgroundColor="$background">
			<YStack padding="$4" space="$4">
				<H4>Settings</H4>

				{/* Notification Settings */}
				<Card bordered padding="$3">
					<YStack space="$3">
						<Text fontSize="$3" fontWeight="bold">Notifications</Text>

						<XStack justifyContent="space-between" alignItems="center">
							<Text fontSize="$3">Push Notifications</Text>
							<Switch
								size="$3"
								checked={pushNotifications}
								onCheckedChange={setPushNotifications}
							/>
						</XStack>

						<XStack justifyContent="space-between" alignItems="center">
							<Text fontSize="$3">Email Notifications</Text>
							<Switch
								size="$3"
								checked={emailNotifications}
								onCheckedChange={setEmailNotifications}
							/>
						</XStack>

						<XStack justifyContent="space-between" alignItems="center">
							<Text fontSize="$3">Order Updates</Text>
							<Switch
								size="$3"
								checked={orderUpdates}
								onCheckedChange={setOrderUpdates}
							/>
						</XStack>

						<XStack justifyContent="space-between" alignItems="center">
							<Text fontSize="$3">Promotions and Offers</Text>
							<Switch
								size="$3"
								checked={promotions}
								onCheckedChange={setPromotions}
							/>
						</XStack>
					</YStack>
				</Card>

				{/* App Settings */}
				<Card bordered padding="$3">
					<YStack space="$3">
						<Text fontSize="$3" fontWeight="bold">App Settings</Text>

						<XStack justifyContent="space-between" alignItems="center">
							<Text fontSize="$3">Dark Mode</Text>
							<Switch
								size="$3"
								checked={darkMode}
								onCheckedChange={setDarkMode}
							/>
						</XStack>

						<XStack justifyContent="space-between" alignItems="center">
							<Text fontSize="$3">Language</Text>
							<Select
								value={language}
								onValueChange={setLanguage}
								disablePreventBodyScroll
							>
								<Select.Trigger width={150} iconAfter={<Icon name="arrow-drop-down" size={20}/>}>
									<Select.Value placeholder="Select language"/>
								</Select.Trigger>

								<Adapt when="sm" platform="touch">
									<Sheet modal dismissOnSnapToBottom>
										<Sheet.Frame>
											<Sheet.ScrollView>
												<Adapt.Contents/>
											</Sheet.ScrollView>
										</Sheet.Frame>
										<Sheet.Overlay/>
									</Sheet>
								</Adapt>

								<Select.Content>
									<Select.ScrollUpButton/>
									<Select.Viewport>
										<Select.Group>
											{languages.map((lang, index) => (
												<Select.Item key={lang.id} value={lang.id} index={index}>
													<Select.ItemText>{lang.name}</Select.ItemText>
												</Select.Item>
											))}
										</Select.Group>
									</Select.Viewport>
									<Select.ScrollDownButton/>
								</Select.Content>
							</Select>
						</XStack>

						<XStack justifyContent="space-between" alignItems="center">
							<Text fontSize="$3">Currency</Text>
							<Select
								value={currency}
								onValueChange={setCurrency}
								disablePreventBodyScroll
							>
								<Select.Trigger width={150} iconAfter={<Icon name="arrow-drop-down" size={20}/>}>
									<Select.Value placeholder="Select currency"/>
								</Select.Trigger>

								<Adapt when="sm" platform="touch">
									<Sheet modal dismissOnSnapToBottom>
										<Sheet.Frame>
											<Sheet.ScrollView>
												<Adapt.Contents/>
											</Sheet.ScrollView>
										</Sheet.Frame>
										<Sheet.Overlay/>
									</Sheet>
								</Adapt>

								<Select.Content>
									<Select.ScrollUpButton/>
									<Select.Viewport>
										<Select.Group>
											{currencies.map((curr, index) => (
												<Select.Item key={curr.id} value={curr.id} index={index} >
													<Select.ItemText>{curr.name}</Select.ItemText>
												</Select.Item>
											))}
										</Select.Group>
									</Select.Viewport>
									<Select.ScrollDownButton/>
								</Select.Content>
							</Select>
						</XStack>
					</YStack>
				</Card>

				{/* Privacy Settings */}
				<Card bordered padding="$3">
					<YStack space="$3">
						<Text fontSize="$3" fontWeight="bold">Privacy</Text>

						<XStack justifyContent="space-between" alignItems="center">
							<Text fontSize="$3">Location Tracking</Text>
							<Switch
								size="$3"
								checked={locationTracking}
								onCheckedChange={setLocationTracking}
							/>
						</XStack>

						<XStack justifyContent="space-between" alignItems="center">
							<Text fontSize="$3">Data Sharing Consent</Text>
							<Switch
								size="$3"
								checked={dataSharingConsent}
								onCheckedChange={setDataSharingConsent}
							/>
						</XStack>

						<Button
							size="$3"
							theme="red"
							onPress={handleClearData}
							marginTop="$2"
						>
							<Icon name="delete-sweep" size={16} color="white"/>
							<Text color="white" marginLeft="$1">Clear App Data</Text>
						</Button>
					</YStack>
				</Card>

				{/* About */}
				<Card bordered padding="$3">
					<YStack space="$3">
						<Text fontSize="$3" fontWeight="bold">About</Text>

						<Button
							size="$3"
							variant="outlined"
							//onPress={() => navigation.navigate('About')}
						>
							<Icon name="info" size={16}/>
							<Text marginLeft="$1">About the App</Text>
						</Button>

						<Button
							size="$3"
							variant="outlined"
							onPress={() => console.log('Open privacy policy')}
						>
							<Icon name="privacy-tip" size={16}/>
							<Text marginLeft="$1">Privacy Policy</Text>
						</Button>

						<Button
							size="$3"
							variant="outlined"
							onPress={() => console.log('Open terms of service')}
						>
							<Icon name="description" size={16}/>
							<Text marginLeft="$1">Terms of Service</Text>
						</Button>
					</YStack>
				</Card>
			</YStack>

			<AlertDialog open={clearDataDialogOpen} onOpenChange={setClearDataDialogOpen}>
				<AlertDialog.Portal>
					<AlertDialog.Overlay
						key="overlay"
						opacity={0.5}
						enterStyle={{opacity: 0}}
						exitStyle={{opacity: 0}}
					/>
					<AlertDialog.Content
						bordered
						elevate
						key="content"
						enterStyle={{x: 0, y: -20, opacity: 0, scale: 0.9}}
						exitStyle={{x: 0, y: 10, opacity: 0, scale: 0.95}}
						x={0}
						scale={1}
						opacity={1}
						y={0}
					>
						<YStack space>
							<AlertDialog.Title>Clear App Data</AlertDialog.Title>
							<AlertDialog.Description>
								This will clear all cached data and reset app preferences. This action cannot be undone.
							</AlertDialog.Description>

							<XStack space="$3" justifyContent="flex-end">
								<AlertDialog.Cancel asChild>
									<Button>Cancel</Button>
								</AlertDialog.Cancel>
								<AlertDialog.Action asChild>
									<Button theme="red" onPress={confirmClearData}>Clear Data</Button>
								</AlertDialog.Action>
							</XStack>
						</YStack>
					</AlertDialog.Content>
				</AlertDialog.Portal>
			</AlertDialog>
		</ScrollView>
	);
};

export default SettingsScreen;