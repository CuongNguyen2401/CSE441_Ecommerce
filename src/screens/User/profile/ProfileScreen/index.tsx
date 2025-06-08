import React from 'react';
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
  View,
} from 'tamagui';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useProfileScreen} from './useProfileScreen';
import {formatDate} from 'utils/formatDateUtil';
import {NO_DATA} from 'utils';

const ProfileScreen = () => {
  const {
    state: {user: userData},
    handlers: {
      handleEditProfile,
      handleAddresses,
      handleSettings,
      handleAbout,
      handleLogout,
      handleOrdersPress,
      handleCartPress,
    },
  } = useProfileScreen();
  const defaultUser = require('@assets/default.png');
  return (
    <ScrollView flex={1} backgroundColor="$background">
      <YStack padding="$4" gap="$4">
        {/* Profile Header */}
        <Card bordered padding="$4">
          <YStack gap="$4" alignItems="center">
            <Avatar circular size="$10">
              <Avatar.Image src={userData?.avatar ?? defaultUser} />
              <Avatar.Fallback backgroundColor="$blue10">
                <Text color="white" fontSize="$6">
                  {userData?.firstName ?? NO_DATA}
                </Text>
              </Avatar.Fallback>
            </Avatar>

            <YStack alignItems="center">
              <Text fontSize="$6" fontWeight="bold">
                {`${userData?.firstName ?? NO_DATA} ${
                  userData?.lastName ?? NO_DATA
                }`}
              </Text>
              <Text fontSize="$3" color="$gray10">
                {userData?.email}
              </Text>
              <Text fontSize="$2" color="$gray10" marginTop="$1">
                Member since {formatDate(userData!.createdDate)}
              </Text>
            </YStack>

            <Button size="$3" onPress={handleEditProfile}>
              <Icon name="edit" size={16} />
              <Text marginLeft="$1">Edit Profile</Text>
            </Button>
          </YStack>
        </Card>

        {/* Quick Actions */}
        <YStack gap="$3">
          <H4>Account</H4>

          <Card bordered>
            <YStack>
              <Button
                size="$4"
                justifyContent="flex-start"
                backgroundColor="transparent"
                onPress={() => handleOrdersPress()}>
                <XStack gap="$3" flex={1} alignItems="center">
                  <Icon name="receipt" size={24} color="#666" />
                  <Text fontSize="$3">My Orders</Text>
                  <View flex={1} />
                  <Icon name="chevron-right" size={24} color="#666" />
                </XStack>
              </Button>
              <Separator />
              <Button
                size="$4"
                justifyContent="flex-start"
                backgroundColor="transparent"
                onPress={handleAddresses}>
                <XStack gap="$3" flex={1} alignItems="center">
                  <Icon name="location-on" size={24} color="#666" />
                  <Text fontSize="$3">My Addresses</Text>
                  <View flex={1} />
                  <Icon name="chevron-right" size={24} color="#666" />
                </XStack>
              </Button>
              <Separator />
              <Button
                size="$4"
                justifyContent="flex-start"
                backgroundColor="transparent"
                onPress={() => handleCartPress()}>
                <XStack gap="$3" flex={1} alignItems="center">
                  <Icon name="shopping-cart" size={24} color="#666" />
                  <Text fontSize="$3">My Cart</Text>
                  <View flex={1} />
                  <Icon name="chevron-right" size={24} color="#666" />
                </XStack>
              </Button>
            </YStack>
          </Card>
        </YStack>

        {/* Settings */}
        <YStack gap="$3">
          <XStack alignItems="center" gap="$2">
            <H4>Settings</H4>
            <XStack
              backgroundColor="$blue5"
              paddingHorizontal="$1.5"
              paddingVertical="$0.5"
              borderRadius="$2">
              <Text color="$blue10" fontSize="$2.5" fontWeight="bold">
                Developing
              </Text>
            </XStack>
          </XStack>

          <Card bordered>
            <YStack>
              <Button
                size="$4"
                justifyContent="flex-start"
                backgroundColor="transparent"
                onPress={handleSettings}>
                <XStack gap="$3" flex={1} alignItems="center">
                  <Icon name="settings" size={24} color="#666" />
                  <Text fontSize="$3">App Settings</Text>
                  <View flex={1} />
                  <Icon name="chevron-right" size={24} color="#666" />
                </XStack>
              </Button>

              <Separator />

              <Button
                size="$4"
                justifyContent="flex-start"
                backgroundColor="transparent"
                onPress={handleAbout}>
                <XStack gap="$3" flex={1} alignItems="center">
                  <Icon name="info" size={24} color="#666" />
                  <Text fontSize="$3">About</Text>
                  <View flex={1} />
                  <Icon name="chevron-right" size={24} color="#666" />
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
          marginTop="$2">
          <Icon name="logout" size={20} color="white" />
          <Text color="white" marginLeft="$1">
            Logout
          </Text>
        </Button>
      </YStack>
    </ScrollView>
  );
};

export default ProfileScreen;
