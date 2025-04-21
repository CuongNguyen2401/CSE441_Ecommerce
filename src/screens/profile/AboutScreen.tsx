import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
	YStack,
	XStack,
	Text,
	Button,
	ScrollView,
	Card,
	H4,
	H2,
	Paragraph,
	Separator,
	Image,
	Avatar
} from 'tamagui';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AboutScreen = () => {
	const navigation = useNavigation();

	// App version and build information
	const appVersion = '1.0.0';
	const buildNumber = '100';
	const releaseDate = 'May 15, 2023';

	// Team members
	const teamMembers = [
		{id: 1, name: 'John Smith', role: 'CEO & Founder', avatar: 'https://placekitten.com/100/100'},
		{id: 2, name: 'Jane Doe', role: 'CTO', avatar: 'https://placekitten.com/101/101'},
		{id: 3, name: 'Mike Johnson', role: 'Lead Developer', avatar: 'https://placekitten.com/102/102'},
		{id: 4, name: 'Sarah Williams', role: 'UI/UX Designer', avatar: 'https://placekitten.com/103/103'},
	];

	return (
		<ScrollView flex={1} backgroundColor="$background">
			<YStack padding="$4" space="$4">
				{/* App Info */}
				<YStack alignItems="center" space="$4" marginVertical="$4">
					<Image
						source={{uri: 'https://placekitten.com/200/200'}}
						width={100}
						height={100}
						borderRadius={20}
					/>

					<YStack alignItems="center">
						<H2>E-Commerce App</H2>
						<Text fontSize="$3" color="$gray10">Version {appVersion} ({buildNumber})</Text>
						<Text fontSize="$2" color="$gray10">Released on {releaseDate}</Text>
					</YStack>
				</YStack>

				{/* App Description */}
				<Card bordered padding="$4">
					<YStack space="$3">
						<H4>About the App</H4>
						<Paragraph>
							Our e-commerce app provides a seamless shopping experience with a wide range of products.
							Browse through categories, find the best deals, and enjoy secure checkout with multiple
							payment options.
						</Paragraph>
						<Paragraph>
							We're committed to providing the best shopping experience with fast delivery, easy returns,
							and excellent customer service.
						</Paragraph>
					</YStack>
				</Card>

				{/* Features */}
				<Card bordered padding="$4">
					<YStack space="$3">
						<H4>Key Features</H4>

						<XStack space="$3" alignItems="center">
							<Icon name="search" size={24} color="#3B82F6"/>
							<YStack>
								<Text fontSize="$3" fontWeight="bold">Smart Search</Text>
								<Text fontSize="$2" color="$gray10">Find products quickly with our advanced
									search</Text>
							</YStack>
						</XStack>

						<XStack space="$3" alignItems="center">
							<Icon name="local-shipping" size={24} color="#3B82F6"/>
							<YStack>
								<Text fontSize="$3" fontWeight="bold">Fast Delivery</Text>
								<Text fontSize="$2" color="$gray10">Get your products delivered quickly</Text>
							</YStack>
						</XStack>

						<XStack space="$3" alignItems="center">
							<Icon name="security" size={24} color="#3B82F6"/>
							<YStack>
								<Text fontSize="$3" fontWeight="bold">Secure Payments</Text>
								<Text fontSize="$2" color="$gray10">Multiple secure payment options</Text>
							</YStack>
						</XStack>

						<XStack space="$3" alignItems="center">
							<Icon name="support-agent" size={24} color="#3B82F6"/>
							<YStack>
								<Text fontSize="$3" fontWeight="bold">24/7 Support</Text>
								<Text fontSize="$2" color="$gray10">Customer support available anytime</Text>
							</YStack>
						</XStack>
					</YStack>
				</Card>

				{/* Meet the Team */}
				<Card bordered padding="$4">
					<YStack space="$3">
						<H4>Meet the Team</H4>

						<YStack space="$3">
							{teamMembers.map(member => (
								<XStack key={member.id} space="$3" alignItems="center">
									<Avatar circular size="$4">
										<Avatar.Image src={member.avatar}/>
										<Avatar.Fallback backgroundColor="$blue10">
											<Text color="white" fontSize="$2">
												{member.name.split(' ').map(n => n[0]).join('')}
											</Text>
										</Avatar.Fallback>
									</Avatar>
									<YStack>
										<Text fontSize="$3" fontWeight="bold">{member.name}</Text>
										<Text fontSize="$2" color="$gray10">{member.role}</Text>
									</YStack>
								</XStack>
							))}
						</YStack>
					</YStack>
				</Card>

				{/* Contact & Legal */}
				<Card bordered padding="$4">
					<YStack space="$3">
						<H4>Contact & Legal</H4>

						<Button
							size="$3"
							variant="outlined"
							onPress={() => console.log('Contact us')}
						>
							<Icon name="email" size={16}/>
							<Text marginLeft="$1">Contact Us</Text>
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

				{/* Social Media */}
				<Card bordered padding="$4">
					<YStack space="$3">
						<H4>Follow Us</H4>

						<XStack justifyContent="space-around">
							<Button
								size="$3"
								circular
								onPress={() => console.log('Open Facebook')}
							>
								<Icon name="facebook" size={24}/>
							</Button>

							<Button
								size="$3"
								circular
								onPress={() => console.log('Open Twitter')}
							>
								<Icon name="twitter" size={24}/>
							</Button>

							<Button
								size="$3"
								circular
								onPress={() => console.log('Open Instagram')}
							>
								<Icon name="photo-camera" size={24}/>
							</Button>

							<Button
								size="$3"
								circular
								onPress={() => console.log('Open YouTube')}
							>
								<Icon name="play-arrow" size={24}/>
							</Button>
						</XStack>
					</YStack>
				</Card>

				<Text fontSize="$2" color="$gray10" textAlign="center" marginVertical="$4">
					© 2023 E-Commerce App. All rights reserved.
				</Text>
			</YStack>
		</ScrollView>
	);
};

export default AboutScreen;