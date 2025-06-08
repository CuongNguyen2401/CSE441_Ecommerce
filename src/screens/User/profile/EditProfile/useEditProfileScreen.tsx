import React, {useEffect, useState} from 'react';
import {useUpdateProfile} from '@services/Auth/useUpdateProfile';
import {useAuthStore} from '@store/auth/useAuthStore';
import {useNavigation} from '@react-navigation/native';
import * as ImagePicker from 'react-native-image-picker';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import Toast from 'react-native-toast-message';
import {Alert} from 'react-native';
import {profileSchema} from './EditProfile.helpers';
import {z} from 'zod';
import {formatDate} from '@utils/formatDateUtil';

type ProfileFormValues = z.infer<typeof profileSchema>;

export const useEditProfileScreen = () => {
  const {user, setUser, accessTokenState} = useAuthStore();
  const navigation = useNavigation();
  const {updateProfile, isUpdating, error: updateError} = useUpdateProfile();

  const [avatarImage, setAvatarImage] = useState<{
    uri: string;
    type: string;
    name: string;
  } | null>(null);

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName ?? '',
      lastName: user?.lastName ?? '',
      email: user?.email ?? '',
      phoneNumber: user?.phoneNumber ?? '',
      address: user?.address ?? '',
      // dateOfBirth: user?.dateOfBirth ?? '',
      gender: user?.gender ?? '',
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName ?? '',
        lastName: user.lastName ?? '',
        email: user.email ?? '',
        phoneNumber: user.phoneNumber ?? '',
        address: user.address ?? '',
        // dateOfBirth: user.dateOfBirth ?? '',
        gender: user.gender ?? '',
      });
    }
  }, [user, reset]);

  const handleChangeAvatar = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 500,
        maxWidth: 500,
      },
      (response: any) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
          Toast.show({
            type: 'error',
            text1: 'Image Selection Error',
            text2: response.errorMessage ?? 'Could not select image',
          });
        } else if (response.assets && response.assets.length > 0) {
          const selectedAsset = response.assets[0];
          setAvatarImage({
            uri: selectedAsset.uri ?? '',
            type: selectedAsset.type ?? 'image/jpeg',
            name: selectedAsset.fileName ?? 'avatar.jpg',
          });
        }
      },
    );
  };

  const onSubmit = handleSubmit(data => {
    const userData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber ?? '',
      address: data.address ?? '',
      // dateOfBirth: data.dateOfBirth ? formatDate(data.dateOfBirth) : '',
      gender: data.gender ?? '',
      status: user?.status ?? 'ACTIVE',
    };

    updateProfile(
      {
        userData,
        avatarFile: avatarImage,
      },
      {
        onSuccess: (response: any) => {
          if (response && response.result) {
            setUser(response.result);
          }

          Toast.show({
            type: 'success',
            text1: 'Profile Updated',
            text2: 'Your profile has been updated successfully',
          });

          navigation.goBack();
        },
        onError: err => {
          Toast.show({
            type: 'error',
            text1: 'Update Failed',
            text2: err?.message ?? 'Failed to update profile',
          });

          console.error('Profile update error:', err);
        },
      },
    );
    console.log('cURL:',accessTokenState);
  });

  const handleCancel = () => {
    Alert.alert(
      'Discard Changes',
      'Are you sure you want to discard your changes?',
      [
        {
          text: 'Continue Editing',
          style: 'cancel',
        },
        {
          text: 'Discard',
          onPress: () => navigation.goBack(),
          style: 'destructive',
        },
      ],
    );
  };

  return {
    state: {
      user,
      avatarImage,
      isUpdating,
      updateError,
      control,
      errors,
    },
    handlers: {
      handleChangeAvatar,
      handleCancel,
      handleSubmit: onSubmit,
    },
  };
};
