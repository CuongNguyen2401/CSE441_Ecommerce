import {useAuthStore} from 'store/auth/useAuthStore';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {NavigationRoutes, ProfileStackParamList} from 'navigation/types';

export const useProfileScreen = () => {
  const {user, clearAuth} = useAuthStore();
  const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParamList>>();

  const handleEditProfile = () => {
    navigation.navigate(NavigationRoutes.EDIT_PROFILE);
  };

  const handleAddresses = () => {
    navigation.navigate(NavigationRoutes.ADDRESSES);
  };

  const handleSettings = () => {
    navigation.navigate(NavigationRoutes.SETTINGS);
  };

  const handleAbout = () => {
    navigation.navigate(NavigationRoutes.ABOUT);
  };

  const handleLogout = () => {
    clearAuth();
    // Navigation will be handled by the auth state change in AppNavigator
  };
  
  const handleOrdersPress = () => {
    // navigation.navigate(NavigationRoutes.ORDERS_TAB);
  };
  
  const handleCartPress = () => {
    // navigation.navigate(NavigationRoutes.CART_TAB);
  };
  return {
    state: {
      user,
    },
    handlers: {
      handleEditProfile,
      handleAddresses,
      handleSettings,
      handleAbout,
      handleLogout,
      handleOrdersPress,
      handleCartPress,
    },
  };
};
