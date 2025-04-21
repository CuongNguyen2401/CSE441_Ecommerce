import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
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
  Tabs,
  View
} from 'tamagui';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Mock data for demonstration
const orders = [
  { 
    id: 123456,
    date: '2023-05-15T10:30:00',
    status: 'Delivered',
    total: 229.97,
    items: [
      { id: 1, name: 'Wireless Headphones', price: 149.99, quantity: 1, image: 'https://placekitten.com/200/200' },
      { id: 2, name: 'Bluetooth Speaker', price: 79.98, quantity: 1, image: 'https://placekitten.com/201/201' }
    ]
  },
  { 
    id: 123457,
    date: '2023-05-10T14:45:00',
    status: 'Shipped',
    total: 149.99,
    items: [
      { id: 3, name: 'Smart Watch', price: 149.99, quantity: 1, image: 'https://placekitten.com/202/202' }
    ]
  },
  { 
    id: 123458,
    date: '2023-05-05T09:15:00',
    status: 'Processing',
    total: 59.98,
    items: [
      { id: 4, name: 'Phone Case', price: 19.99, quantity: 1, image: 'https://placekitten.com/203/203' },
      { id: 5, name: 'Screen Protector', price: 9.99, quantity: 2, image: 'https://placekitten.com/204/204' },
      { id: 6, name: 'USB Cable', price: 19.99, quantity: 1, image: 'https://placekitten.com/205/205' }
    ]
  },
  { 
    id: 123459,
    date: '2023-04-28T16:20:00',
    status: 'Cancelled',
    total: 299.99,
    items: [
      { id: 7, name: 'Tablet', price: 299.99, quantity: 1, image: 'https://placekitten.com/206/206' }
    ]
  }
];

const OrdersScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('all');

  const getFilteredOrders = () => {
    if (activeTab === 'all') return orders;
    return orders.filter(order => {
      if (activeTab === 'processing') return order.status === 'Processing';
      if (activeTab === 'shipped') return order.status === 'Shipped';
      if (activeTab === 'delivered') return order.status === 'Delivered';
      if (activeTab === 'cancelled') return order.status === 'Cancelled';
      return true;
    });
  };

  const filteredOrders = getFilteredOrders();

  const handleViewOrder = (orderId) => {
    navigation.navigate('OrderDetails', { orderId });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return '$green10';
      case 'Shipped':
        return '$blue10';
      case 'Processing':
        return '$orange10';
      case 'Cancelled':
        return '$red10';
      default:
        return '$gray10';
    }
  };

  return (
    <YStack flex={1} backgroundColor="$background">
      <YStack padding="$4" space="$4">
        <H4>My Orders</H4>

        <Tabs
          defaultValue="all"
          value={activeTab}
          onValueChange={setActiveTab}
          orientation="horizontal"
          flexDirection="column"
        >
          <Tabs.List>
            <Tabs.Tab value="all">
              <Text>All</Text>
            </Tabs.Tab>
            <Tabs.Tab value="processing">
              <Text>Processing</Text>
            </Tabs.Tab>
            <Tabs.Tab value="shipped">
              <Text>Shipped</Text>
            </Tabs.Tab>
            <Tabs.Tab value="delivered">
              <Text>Delivered</Text>
            </Tabs.Tab>
            <Tabs.Tab value="cancelled">
              <Text>Cancelled</Text>
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>

        <ScrollView showsVerticalScrollIndicator={false}>
          <YStack space="$3">
            {filteredOrders.length === 0 ? (
              <YStack height={300} justifyContent="center" alignItems="center">
                <Icon name="inbox" size={64} color="#ccc" />
                <Text fontSize="$4" color="$gray10" marginTop="$2">
                  No orders found
                </Text>
              </YStack>
            ) : (
              filteredOrders.map(order => (
                <Card key={order.id} bordered padding="$3">
                  <YStack space="$3">
                    <XStack justifyContent="space-between" alignItems="center">
                      <Text fontSize="$3" fontWeight="bold">
                        Order #{order.id.toString().padStart(6, '0')}
                      </Text>
                      <Text fontSize="$2" color="$gray10">
                        {formatDate(order.date)}
                      </Text>
                    </XStack>

                    <XStack space="$2" alignItems="center">
                      <Text fontSize="$2" color="$gray10">Status:</Text>
                      <Text fontSize="$2" fontWeight="bold" color={getStatusColor(order.status)}>
                        {order.status}
                      </Text>
                    </XStack>

                    <Separator />

                    <YStack space="$2">
                      {order.items.slice(0, 2).map(item => (
                        <XStack key={item.id} space="$3">
                          <Image
                            source={{ uri: item.image }}
                            width={50}
                            height={50}
                            resizeMode="cover"
                            borderRadius="$2"
                          />
                          <YStack flex={1}>
                            <Text fontSize="$3" numberOfLines={1}>{item.name}</Text>
                            <Text fontSize="$2" color="$gray10">Qty: {item.quantity}</Text>
                          </YStack>
                          <Text fontSize="$3" fontWeight="bold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </Text>
                        </XStack>
                      ))}

                      {order.items.length > 2 && (
                        <Text fontSize="$2" color="$gray10">
                          +{order.items.length - 2} more items
                        </Text>
                      )}
                    </YStack>

                    <Separator />

                    <XStack justifyContent="space-between" alignItems="center">
                      <Text fontSize="$3" fontWeight="bold">Total:</Text>
                      <Text fontSize="$3" fontWeight="bold" color="$blue10">
                        ${order.total.toFixed(2)}
                      </Text>
                    </XStack>

                    <Button
                      size="$3"
                      onPress={() => handleViewOrder(order.id)}
                    >
                      View Order Details
                    </Button>
                  </YStack>
                </Card>
              ))
            )}
          </YStack>
        </ScrollView>
      </YStack>
    </YStack>
  );
};

export default OrdersScreen;