import React from 'react';
import {Controller} from 'react-hook-form';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Avatar,
  Button,
  Form,
  Input,
  Label,
  ScrollView,
  Spinner,
  Text,
  XStack,
  YStack,
} from 'tamagui';
import {useEditProfileScreen} from './useEditProfileScreen';

const EditProfileScreen = () => {
  const defaultUser = require('@assets/default.png');

  const {
    state: {user, avatarImage, isUpdating, updateError, control, errors},
    handlers: {handleChangeAvatar, handleSubmit, handleCancel},
  } = useEditProfileScreen();

  return (
    <ScrollView flex={1} backgroundColor="$background">
      <YStack padding="$4" gap="$4">
        <YStack gap="$4" alignItems="center" marginTop={'$4'}>
          <Avatar circular size="$10">
            {avatarImage ? (
              <Avatar.Image source={{uri: avatarImage.uri}} />
            ) : (
              <Avatar.Image
                source={user?.avatar ? {uri: user.avatar} : defaultUser}
              />
            )}
            <Avatar.Fallback backgroundColor="$blue10">
              <Text color="white" fontSize="$6">
                {user?.firstName?.charAt(0) ?? ''}
                {user?.lastName?.charAt(0) ?? ''}
              </Text>
            </Avatar.Fallback>
          </Avatar>

          <Button size="$2" onPress={handleChangeAvatar}>
            <Icon name="photo-camera" size={16} />
            <Text marginLeft="$1">Change Photo</Text>
          </Button>
        </YStack>

        <Form onSubmit={handleSubmit}>
          <YStack gap="$4">
            <YStack gap="$1">
              <Label htmlFor="firstName" fontSize="$3">
                First Name
              </Label>
              <Controller
                control={control}
                name="firstName"
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    id="firstName"
                    size="$4"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="Enter your first name"
                  />
                )}
              />
              {errors.firstName && (
                <Text color="$red10" fontSize="$3">
                  {errors.firstName.message}
                </Text>
              )}
            </YStack>

            <YStack gap="$1">
              <Label htmlFor="lastName" fontSize="$3">
                Last Name
              </Label>
              <Controller
                control={control}
                name="lastName"
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    id="lastName"
                    size="$4"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="Enter your last name"
                  />
                )}
              />
              {errors.lastName && (
                <Text color="$red10" fontSize="$3">
                  {errors.lastName.message}
                </Text>
              )}
            </YStack>

            <YStack gap="$1">
              <Label htmlFor="email" fontSize="$3">
                Email
              </Label>
              <Controller
                control={control}
                name="email"
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    id="email"
                    size="$4"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                )}
              />
              {errors.email && (
                <Text color="$red10" fontSize="$3">
                  {errors.email.message}
                </Text>
              )}
            </YStack>

            <YStack gap="$1">
              <Label htmlFor="phoneNumber" fontSize="$3">
                Phone Number
              </Label>
              <Controller
                control={control}
                name="phoneNumber"
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    id="phoneNumber"
                    size="$4"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="Enter your phone number"
                    keyboardType="phone-pad"
                  />
                )}
              />
              {errors.phoneNumber && (
                <Text color="$red10" fontSize="$3">
                  {errors.phoneNumber.message}
                </Text>
              )}
            </YStack>

            <YStack gap="$1">
              <Label htmlFor="address" fontSize="$3">
                Address
              </Label>
              <Controller
                control={control}
                name="address"
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    id="address"
                    size="$4"
                    value={value ?? ''}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="Enter your address"
                  />
                )}
              />
            </YStack>

            {updateError ? (
              <Text color="$red10" fontSize="$3" textAlign="center">
                An error occurred while updating your profile
              </Text>
            ) : null}

            <XStack gap="$3" marginTop="$2">
              <Button
                flex={1}
                size="$4"
                variant="outlined"
                onPress={handleCancel}
                disabled={isUpdating}>
                <Text>Cancel</Text>
              </Button>

              <Button
                flex={1}
                size="$4"
                themeInverse
                onPress={handleSubmit}
                disabled={isUpdating}>
                {isUpdating ? (
                  <XStack gap="$2" alignItems="center">
                    <Spinner size="small" color="white" />
                    <Text color="white">Saving...</Text>
                  </XStack>
                ) : (
                  <Text color="white">Save Changes</Text>
                )}
              </Button>
            </XStack>
          </YStack>
        </Form>
      </YStack>
    </ScrollView>
  );
};

export default EditProfileScreen;
