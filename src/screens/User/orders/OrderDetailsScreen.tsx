// import React, {useState, useEffect} from 'react';
// import {useNavigation, useRoute} from '@react-navigation/native';
// import {
// 	YStack,
// 	XStack,
// 	Text,
// 	Button,
// 	ScrollView,
// 	Image,
// 	Card,
// 	H4,
// 	Separator,
// 	Spinner,
// 	View
// } from 'tamagui';
// import Icon from 'react-native-vector-icons/MaterialIcons';
//
// // Mock data for demonstration
// const orderDetails = {
// 	id: 123456,
// 	date: '2023-05-15T10:30:00',
// 	status: 'Delivered',
// 	total: 229.97,
// 	subtotal: 229.97,
// 	tax: 19.55,
// 	shipping: 0,
// 	paymentMethod: 'Credit Card (•••• 1234)',
// 	shippingAddress: {
// 		name: 'John Doe',
// 		street: '123 Main St',
// 		city: 'New York',
// 		state: 'NY',
// 		zip: '10001',
// 		country: 'United States',
// 		phone: '(555) 123-4567'
// 	},
// 	items: [
// 		{id: 1, name: 'Wireless Headphones', price: 149.99, quantity: 1, image: 'https://placekitten.com/200/200'},
// 		{id: 2, name: 'Bluetooth Speaker', price: 79.98, quantity: 1, image: 'https://placekitten.com/201/201'}
// 	],
// 	trackingNumber: 'TN123456789US',
// 	estimatedDelivery: '2023-05-20',
// 	deliveredDate: '2023-05-18',
// 	timeline: [
// 		{status: 'Order Placed', date: '2023-05-15T10:30:00', description: 'Your order has been placed successfully'},
// 		{status: 'Payment Confirmed', date: '2023-05-15T10:35:00', description: 'Payment has been confirmed'},
// 		{status: 'Processing', date: '2023-05-16T09:15:00', description: 'Your order is being processed'},
// 		{status: 'Shipped', date: '2023-05-17T14:20:00', description: 'Your order has been shipped'},
// 		{status: 'Delivered', date: '2023-05-18T11:45:00', description: 'Your order has been delivered'}
// 	]
// };
//
// const OrderDetailsScreen = () => {
// 	const navigation = useNavigation();
// 	const route = useRoute();
// 	const {orderId} = route.params || {orderId: 123456};
//
// 	const [order, setOrder] = useState(null);
// 	const [isLoading, setIsLoading] = useState(true);
//
// 	// In a real app, you would fetch the order details based on orderId
// 	useEffect(() => {
// 		// Simulate API call
// 		setTimeout(() => {
// 			setOrder(orderDetails);
// 			setIsLoading(false);
// 		}, 1000);
// 	}, [orderId]);
//
// 	const formatDate = (dateString) => {
// 		const date = new Date(dateString);
// 		return date.toLocaleDateString('en-US', {
// 			year: 'numeric',
// 			month: 'short',
// 			day: 'numeric',
// 			hour: '2-digit',
// 			minute: '2-digit'
// 		});
// 	};
//
// 	const getStatusColor = (status) => {
// 		switch (status) {
// 			case 'Delivered':
// 				return '$green10';
// 			case 'Shipped':
// 				return '$blue10';
// 			case 'Processing':
// 				return '$orange10';
// 			case 'Cancelled':
// 				return '$red10';
// 			default:
// 				return '$gray10';
// 		}
// 	};
//
// 	const handleContactSupport = () => {
// 		// In a real app, you would navigate to a support screen or open a chat
// 		console.log('Contact support for order', orderId);
// 	};
//
// 	const handleTrackOrder = () => {
// 		// In a real app, you would navigate to a tracking screen or open a web view
// 		console.log('Track order', orderId);
// 	};
//
// 	if (isLoading) {
// 		return (
// 			<YStack flex={1} justifyContent="center" alignItems="center">
// 				<Spinner size="large" color="$blue10"/>
// 			</YStack>
// 		);
// 	}
//
// 	return (
// 		<ScrollView flex={1} backgroundColor="$background">
// 			<YStack padding="$4" space="$4">
// 				<Card bordered padding="$3">
// 					<YStack space="$3">
// 						<XStack justifyContent="space-between" alignItems="center">
// 							<Text fontSize="$3" fontWeight="bold">
// 								Order #{order.id.toString().padStart(6, '0')}
// 							</Text>
// 							<Text fontSize="$2" color="$gray10">
// 								{formatDate(order.date)}
// 							</Text>
// 						</XStack>
//
// 						<XStack space="$2" alignItems="center">
// 							<Text fontSize="$2" color="$gray10">Status:</Text>
// 							<Text fontSize="$2" fontWeight="bold" color={getStatusColor(order.status)}>
// 								{order.status}
// 							</Text>
// 						</XStack>
//
// 						{order.trackingNumber && (
// 							<XStack space="$2" alignItems="center">
// 								<Text fontSize="$2" color="$gray10">Tracking Number:</Text>
// 								<Text fontSize="$2">{order.trackingNumber}</Text>
// 								<Button size="$2" onPress={handleTrackOrder}>
// 									<Icon name="local-shipping" size={16}/>
// 									<Text fontSize="$2">Track</Text>
// 								</Button>
// 							</XStack>
// 						)}
// 					</YStack>
// 				</Card>
//
// 				{/* Order Timeline */}
// 				<Card bordered padding="$3">
// 					<YStack space="$3">
// 						<Text fontSize="$3" fontWeight="bold">Order Timeline</Text>
//
// 						<YStack space="$3">
// 							{order.timeline.map((event, index) => (
// 								<XStack key={index} space="$3" alignItems="flex-start">
// 									<YStack alignItems="center" width={20}>
// 										<View
// 											width={12}
// 											height={12}
// 											borderRadius={6}
// 											backgroundColor={index === 0 ? '$blue10' : '$gray5'}
// 										/>
// 										{index < order.timeline.length - 1 && (
// 											<View width={2} height={40} backgroundColor="$gray5" marginVertical="$1"/>
// 										)}
// 									</YStack>
//
// 									<YStack flex={1} space="$1">
// 										<Text fontSize="$3" fontWeight="bold">{event.status}</Text>
// 										<Text fontSize="$2" color="$gray10">{formatDate(event.date)}</Text>
// 										<Text fontSize="$2">{event.description}</Text>
// 									</YStack>
// 								</XStack>
// 							))}
// 						</YStack>
// 					</YStack>
// 				</Card>
//
// 				{/* Order Items */}
// 				<Card bordered padding="$3">
// 					<YStack space="$3">
// 						<Text fontSize="$3" fontWeight="bold">Order Items</Text>
//
// 						<YStack space="$3">
// 							{order.items.map(item => (
// 								<XStack key={item.id} space="$3">
// 									<Image
// 										source={{uri: item.image}}
// 										width={60}
// 										height={60}
// 										resizeMode="cover"
// 										borderRadius="$2"
// 									/>
// 									<YStack flex={1} justifyContent="center">
// 										<Text fontSize="$3" fontWeight="bold" numberOfLines={1}>{item.name}</Text>
// 										<Text fontSize="$2" color="$gray10">Qty: {item.quantity}</Text>
// 										<Text fontSize="$3" color="$blue10">${item.price.toFixed(2)}</Text>
// 									</YStack>
// 								</XStack>
// 							))}
// 						</YStack>
// 					</YStack>
// 				</Card>
//
// 				{/* Payment Information */}
// 				<Card bordered padding="$3">
// 					<YStack space="$3">
// 						<Text fontSize="$3" fontWeight="bold">Payment Information</Text>
//
// 						<YStack space="$2">
// 							<XStack justifyContent="space-between">
// 								<Text fontSize="$2" color="$gray10">Payment Method</Text>
// 								<Text fontSize="$2">{order.paymentMethod}</Text>
// 							</XStack>
//
// 							<XStack justifyContent="space-between">
// 								<Text fontSize="$2" color="$gray10">Subtotal</Text>
// 								<Text fontSize="$2">${order.subtotal.toFixed(2)}</Text>
// 							</XStack>
//
// 							<XStack justifyContent="space-between">
// 								<Text fontSize="$2" color="$gray10">Shipping</Text>
// 								<Text fontSize="$2">
// 									{order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}`}
// 								</Text>
// 							</XStack>
//
// 							<XStack justifyContent="space-between">
// 								<Text fontSize="$2" color="$gray10">Tax</Text>
// 								<Text fontSize="$2">${order.tax.toFixed(2)}</Text>
// 							</XStack>
//
// 							<Separator marginVertical="$1"/>
//
// 							<XStack justifyContent="space-between">
// 								<Text fontSize="$3" fontWeight="bold">Total</Text>
// 								<Text fontSize="$3" fontWeight="bold" color="$blue10">
// 									${order.total.toFixed(2)}
// 								</Text>
// 							</XStack>
// 						</YStack>
// 					</YStack>
// 				</Card>
//
// 				{/* Shipping Address */}
// 				<Card bordered padding="$3">
// 					<YStack space="$3">
// 						<Text fontSize="$3" fontWeight="bold">Shipping Address</Text>
//
// 						<YStack space="$1">
// 							<Text fontSize="$3">{order.shippingAddress.name}</Text>
// 							<Text fontSize="$2">{order.shippingAddress.street}</Text>
// 							<Text fontSize="$2">
// 								{`${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zip}`}
// 							</Text>
// 							<Text fontSize="$2">{order.shippingAddress.country}</Text>
// 							<Text fontSize="$2">{order.shippingAddress.phone}</Text>
// 						</YStack>
// 					</YStack>
// 				</Card>
//
// 				{/* Support */}
// 				<Button
// 					size="$4"
// 					onPress={handleContactSupport}
// 					marginTop="$2"
// 				>
// 					<Icon name="support-agent" size={20}/>
// 					<Text marginLeft="$1">Contact Support</Text>
// 				</Button>
// 			</YStack>
// 		</ScrollView>
// 	);
// };
//
// export default OrderDetailsScreen;