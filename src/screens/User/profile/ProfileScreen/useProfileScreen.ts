import {useAuthStore} from 'store/auth/useAuthStore';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  NavigationRoutes,
  ProfileStackParamList,
  RootStackParamList,
} from 'navigation/types';
import {Role} from 'store/auth/types';

export const useProfileScreen = () => {
  const {user, clearAuth} = useAuthStore();
  const navigation =
    useNavigation<NativeStackNavigationProp<ProfileStackParamList>>();
  const rootNavigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const isAdmin = user?.roles?.includes(Role.ADMIN) ;
  console.log("🚀 ~ useProfileScreen ~ user:", user);

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
    rootNavigation.navigate(NavigationRoutes.AUTH, {
      screen: NavigationRoutes.LOGIN,
      params: {},
    });

    // Navigation will be handled by the auth state change in AppNavigator
  };

  const handleOrdersPress = () => {
    // navigation.navigate(NavigationRoutes.ORDERS_TAB);
  };

  const handleCartPress = () => {
    // navigation.navigate(NavigationRoutes.CART_TAB);
  };

  const handleAdminPress = () => {
    if (isAdmin) {
      rootNavigation.navigate(NavigationRoutes.ADMIN_PRODUCTS);
    }
  };

  return {
    state: {
      user,
      isAdmin,
    },
    handlers: {
      handleEditProfile,
      handleAddresses,
      handleSettings,
      handleAbout,
      handleLogout,
      handleOrdersPress,
      handleCartPress,
      handleAdminPress,
    },
  };
};
