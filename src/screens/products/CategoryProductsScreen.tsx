import React, {useState, useEffect} from 'react';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
type CategoryRouteParams = {
    CategoryProducts: {
        category?: string;
    };
};
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
	Separator,
	Spinner,
	View
} from 'tamagui';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Mock data for demonstration
const allProducts = [
	{
		id: 1,
		name: 'Wireless Headphones',
		price: 99.99,
		image: 'https://placekitten.com/200/200',
		category: 'Electronics'
	},
	{id: 2, name: 'Smart Watch', price: 199.99, image: 'https://placekitten.com/201/201', category: 'Electronics'},
	{id: 3, name: 'Bluetooth Speaker', price: 79.99, image: 'https://placekitten.com/202/202', category: 'Electronics'},
	{id: 4, name: 'Laptop Backpack', price: 49.99, image: 'https://placekitten.com/203/203', category: 'Accessories'},
	{id: 5, name: 'Smartphone', price: 699.99, image: 'https://placekitten.com/204/204', category: 'Electronics'},
	{id: 6, name: 'Wireless Charger', price: 29.99, image: 'https://placekitten.com/205/205', category: 'Electronics'},
	{id: 7, name: 'Fitness Tracker', price: 89.99, image: 'https://placekitten.com/206/206', category: 'Electronics'},
	{
		id: 8,
		name: 'Portable Power Bank',
		price: 39.99,
		image: 'https://placekitten.com/207/207',
		category: 'Electronics'
	},
	{id: 9, name: 'T-Shirt', price: 19.99, image: 'https://placekitten.com/208/208', category: 'Clothing'},
	{id: 10, name: 'Jeans', price: 49.99, image: 'https://placekitten.com/209/209', category: 'Clothing'},
	{id: 11, name: 'Sneakers', price: 79.99, image: 'https://placekitten.com/210/210', category: 'Clothing'},
	{id: 12, name: 'Coffee Mug', price: 14.99, image: 'https://placekitten.com/211/211', category: 'Home & Kitchen'},
];

const sortOptions = [
	{id: 1, name: 'Newest'},
	{id: 2, name: 'Price: Low to High'},
	{id: 3, name: 'Price: High to Low'},
	{id: 4, name: 'Popularity'},
];

const CategoryProductsScreen = () => {
	const navigation = useNavigation();
	const route = useRoute<RouteProp<CategoryRouteParams, 'CategoryProducts'>>();
	const {category} = route.params || {category: 'Electronics'};

	const [searchQuery, setSearchQuery] = useState('');
	const [selectedSort, setSelectedSort] = useState('Newest');
	const [products, setProducts] = useState<Array<{
		id: number;
		name: string;
		price: number;
		image: string;
		category: string;
	}>>([]);
	const [isLoading, setIsLoading] = useState(true);

	// Filter products by category and search query
	useEffect(() => {
		setIsLoading(true);

		// Simulate API call
		setTimeout(() => {
			let filtered = allProducts.filter(product =>
				product.category === category
			);

			if (searchQuery) {
				filtered = filtered.filter(product =>
					product.name.toLowerCase().includes(searchQuery.toLowerCase())
				);
			}

			// Sort products
			if (selectedSort === 'Price: Low to High') {
				filtered.sort((a, b) => a.price - b.price);
			} else if (selectedSort === 'Price: High to Low') {
				filtered.sort((a, b) => b.price - a.price);
			}

			setProducts(filtered);
			setIsLoading(false);
		}, 500);
	}, [category, searchQuery, selectedSort]);

	const handleSearch = (query: React.SetStateAction<string>) => {
		setSearchQuery(query);
	};

	const handleProductPress = (product: { id: any; name?: string; price?: number; image?: string; category?: string; }) => {
		navigation.navigate('ProductDetails', {productId: product.id});
	};

	if (isLoading) {
		return (
			<YStack flex={1} justifyContent="center" alignItems="center">
				<Spinner size="large" color="$blue10"/>
			</YStack>
		);
	}

	return (
		<YStack flex={1} backgroundColor="$background">
			<YStack padding="$4" space="$4">
				<H4>{category}</H4>

				{/* Search Bar */}
				<XStack
					backgroundColor="$backgroundHover"
					borderRadius="$4"
					padding="$2"
					alignItems="center"
					space="$2"
				>
					<Icon name="search" size={24} color="#999"/>
					<Input
						flex={1}
						placeholder="Search in this category..."
						borderWidth={0}
						backgroundColor="transparent"
						value={searchQuery}
						onChangeText={handleSearch}
					/>
				</XStack>

				{/* Sort Dropdown */}
				<XStack justifyContent="flex-end" alignItems="center">
					<Button
						size="$3"
						variant="outlined"
						iconAfter={<Icon name="sort" size={16}/>}
						onPress={() => {
							// In a real app, you would show a dropdown or modal
							const nextSortIndex = (sortOptions.findIndex(opt => opt.name === selectedSort) + 1) % sortOptions.length;
							setSelectedSort(sortOptions[nextSortIndex].name);
						}}
					>
						<Text>Sort: {selectedSort}</Text>
					</Button>
				</XStack>

				<Separator/>

				{/* Product Grid */}
				<ScrollView showsVerticalScrollIndicator={false}>
					{products.length === 0 ? (
						<YStack height={300} justifyContent="center" alignItems="center">
							<Icon name="search-off" size={48} color="#ccc"/>
							<Text fontSize="$4" color="$gray10" marginTop="$2">
								No products found
							</Text>
						</YStack>
					) : (
						<XStack flexWrap="wrap" justifyContent="space-between">
							{products.map(product => (
								<Card
									key={product.id}
									elevate
									bordered
									width="48%"
									marginBottom="$3"
									onPress={() => handleProductPress(product)}
								>
									<Image
										source={{uri: product.image}}
										width="100%"
										height={150}
										resizeMode="cover"
									/>
									<YStack padding="$2" space="$1">
										<Text fontSize="$3" numberOfLines={1} fontWeight="bold">
											{product.name}
										</Text>
										<Text fontSize="$2" color="$gray10" numberOfLines={1}>
											{product.category}
										</Text>
										<Text fontSize="$4" color="$blue10" fontWeight="bold">
											${product.price.toFixed(2)}
										</Text>
									</YStack>
								</Card>
							))}
						</XStack>
					)}
				</ScrollView>
			</YStack>
		</YStack>
	);
};

export default CategoryProductsScreen;