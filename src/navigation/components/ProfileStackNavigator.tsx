import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { lazy } from 'react';
import { NavigationRoutes, ProfileStackParamList } from '../types';
import ProfileScreen from '@screens/User/profile/ProfileScreen';

const EditProfileScreen = lazy(() => import('@screens/User/profile/EditProfileScreen'));
const AddressesScreen = lazy(() => import('@screens/User/profile/AddressesScreen'));
const AddAddressScreen = lazy(() => import('@screens/User/profile/AddAddressScreen'));
const EditAddressScreen = lazy(() => import('@screens/User/profile/EditAddressScreen'));
const SettingsScreen = lazy(() => import('@screens/User/profile/SettingsScreen'));
const AboutScreen = lazy(() => import('@screens/User/profile/AboutScreen'));

const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name={NavigationRoutes.PROFILE}
        component={ProfileScreen}
        options={{title: 'My Profile'}}
      />
      <ProfileStack.Screen
        name={NavigationRoutes.EDIT_PROFILE}
        component={EditProfileScreen}
        options={{title: 'Edit Profile'}}
      />
      <ProfileStack.Screen
        name={NavigationRoutes.ADDRESSES}
        component={AddressesScreen}
        options={{title: 'My Addresses'}}
      />
      <ProfileStack.Screen
        name={NavigationRoutes.ADD_ADDRESS}
        component={AddAddressScreen}
        options={{title: 'Add Address'}}
      />
      <ProfileStack.Screen
        name={NavigationRoutes.EDIT_ADDRESS}    
        component={EditAddressScreen}
        options={{title: 'Edit Address'}}
      />
      <ProfileStack.Screen
        name={NavigationRoutes.SETTINGS}  
        component={SettingsScreen}
        options={{title: 'Settings'}}
      />
      <ProfileStack.Screen
        name={NavigationRoutes.ABOUT}
        component={AboutScreen}
        options={{title: 'About'}}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackNavigator;
