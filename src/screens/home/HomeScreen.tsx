import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
	Button,
	Card,
	H4,
	Image,
	Input,
	ScrollView,
	Separator,
	Text,
	XStack,
	YStack
} from 'tamagui';
import { Category, Product } from "../products/helpers";
import { HomeStackParamList, NavigationRoutes } from '../../navigation/types';

const categories = [
	{id: 1, name: 'Electronics', icon: 'devices'},
	{id: 2, name: 'Clothing', icon: 'checkroom'},
	{id: 3, name: 'Home & Kitchen', icon: 'kitchen'},
	{id: 4, name: 'Books', icon: 'menu-book'},
	{id: 5, name: 'Sports', icon: 'sports-basketball'},
];

const featuredProducts: Product[] = [
	{
		id: 1,
		name: 'Wireless Headphones',
		price: 99.99,
		discountPrice: 99.99,
		rating: 0,
		reviewCount: 0,
		description: '',
		features: [],
		specifications: [],
		images: ['https://placekitten.com/200/200'],
		colors: [],
		inStock: true
	},
	{
		id: 2,
		name: 'Smart Watch',
		price: 199.99,
		discountPrice: 199.99,
		rating: 0,
		reviewCount: 0,
		description: '',
		features: [],
		specifications: [],
		images: ['https://placekitten.com/201/201'],
		colors: [],
		inStock: true
	},
	{
		id: 3,
		name: 'Bluetooth Speaker',
		price: 79.99,
		discountPrice: 79.99,
		rating: 0,
		reviewCount: 0,
		description: '',
		features: [],
		specifications: [],
		images: ['https://placekitten.com/202/202'],
		colors: [],
		inStock: true
	},
	{
		id: 4,
		name: 'Laptop Backpack',
		price: 49.99,
		discountPrice: 49.99,
		rating: 0,
		reviewCount: 0,
		description: '',
		features: [],
		specifications: [],
		images: ['https://placekitten.com/203/203'],
		colors: [],
		inStock: true
	},
];

const promotions = [
	{id: 1, title: 'Summer Sale', description: 'Up to 50% off', image: 'https://placekitten.com/400/150'},
	{
		id: 2,
		title: 'New Arrivals',
		description: 'Check out our latest products',
		image: 'https://placekitten.com/401/150'
	},
];

const HomeScreen = () => {
	const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

	const handleSearch = (query: string) => {
		//navigation.navigate('Search', {query});
	};

	const handleCategoryPress = (category: Category) => {
		//navigation.navigate('CategoryProducts', {category: category.name});
	};

	const handleProductPress = (product: Product) => {
		navigation.navigate(NavigationRoutes.PRODUCT_DETAILS, {productId: product.id});
	};

	return (
		<ScrollView flex={1} backgroundColor="$background">
			<YStack padding="$4" gap="$4">
				{/* Search Bar */}
				<XStack
					backgroundColor="$backgroundHover"
					borderRadius="$4"
					padding="$2"
					alignItems="center"
					gap="$2"
				>
					<Icon name="search" size={24} color="#999"/>
					<Input
						flex={1}
						placeholder="Search products..."
						borderWidth={0}
						backgroundColor="transparent"
						onSubmitEditing={(e) => handleSearch(e.nativeEvent.text)}
					/>
				</XStack>

				{/* Promotions Carousel */}
				<YStack>
					<H4 marginBottom="$2">Special Offers</H4>
					<ScrollView horizontal showsHorizontalScrollIndicator={false}>
						<XStack gap="$3" paddingVertical="$2">
							{promotions.map(promo => (
								<Card
									key={promo.id}
									elevate
									bordered
									width={300}
									height={150}
									scale={0.9}
									hoverStyle={{scale: 0.925}}
									pressStyle={{scale: 0.875}}
									//animation="quick"
								>
									<Card.Background>
										<Image
											source={{uri: promo.image}}
											width="100%"
											height="100%"
											objectFit="cover"
										/>
									</Card.Background>
									<Card.Footer padded>
										<YStack>
											<Text color="white" fontSize="$5" fontWeight="bold">
												{promo.title}
											</Text>
											<Text color="white" fontSize="$3">
												{promo.description}
											</Text>
										</YStack>
									</Card.Footer>
								</Card>
							))}
						</XStack>
					</ScrollView>
				</YStack>

				{/* Categories */}
				<YStack>
					<H4 marginBottom="$2">Shop by Category</H4>
					<ScrollView horizontal showsHorizontalScrollIndicator={false}>
						<XStack gap="$3" paddingVertical="$2">
							{categories.map(category => (
								<YStack
									key={category.id}
									alignItems="center"
									gap="$1"
									onPress={() => handleCategoryPress(category)}
								>
									<XStack
										width={70}
										height={70}
										borderRadius={35}
										backgroundColor="$blue5"
										alignItems="center"
										justifyContent="center"
									>
										<Icon name={category.icon} size={30} color="#3B82F6"/>
									</XStack>
									<Text fontSize="$2" textAlign="center">
										{category.name}
									</Text>
								</YStack>
							))}
						</XStack>
					</ScrollView>
				</YStack>

				<Separator marginVertical="$2"/>

				{/* Featured Products */}
				<YStack>
					<XStack justifyContent="space-between" alignItems="center" marginBottom="$2">
						<H4>Featured Products</H4>
						<Button variant="outlined"
						        //onPress={() => navigation.navigate('ProductsTab')}
						>
							<Text color="$blue10">See All</Text>
						</Button>
					</XStack>

					<XStack flexWrap="wrap" justifyContent="space-between">
						{featuredProducts.map(product => (
							<Card
								key={product.id}
								elevate
								bordered
								width="48%"
								marginBottom="$3"
								onPress={() => handleProductPress(product)}
							>
								<Image
									source={{uri: product.images[0]}}
									width="100%"
									height={150}
									objectFit="cover"
								/>
								<YStack padding="$2" gap="$1">
									<Text fontSize="$3" numberOfLines={1} fontWeight="bold">
										{product.name}
									</Text>
									<Text fontSize="$4" color="$blue10" fontWeight="bold">
										${product.price.toFixed(2)}
									</Text>
								</YStack>
							</Card>
						))}
					</XStack>
				</YStack>
			</YStack>
		</ScrollView>
	);
};

export default HomeScreen;