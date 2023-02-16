import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import DrawerNavigation from './DrawerNavigation';
import ChatScreen from '../screens/ChatScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MyOrdersScreen from '../screens/MyOrdersScreen';
import WishlistScreen from '../screens/WishlistScreen';
import ShipppingAddressScreen from '../screens/ShipppingAddressScreen';
import ProfileSettingScreen from '../screens/ProfileSettingScreen';
import AboutScreen from '../screens/AboutScreen';
import ContactScreen from '../screens/ContactScreen';
import TermsAndPrivacyScreen from '../screens/TermsAndPrivacyScreen';
import MakeReviewScreen from '../screens/MakeReviewScreen';
import ListingScreen from '../screens/ListingScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import ProductReviewsScreen from '../screens/ProductReviewsScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeStackScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeStackScreen" component={DrawerNavigation} />
      <Stack.Screen name="LoginStackScreen" component={LoginScreen} />
      <Stack.Screen name="AboutStackScreen" component={AboutScreen} />
      <Stack.Screen name="ContactStackScreen" component={ContactScreen} />
      <Stack.Screen name="SignupStackScreen" component={SignupScreen} />
      <Stack.Screen name="ChatStackScreen" component={ChatScreen} />
      <Stack.Screen name="CartStackScreen" component={CartScreen} />
      <Stack.Screen name="ProfileStackScreen" component={ProfileScreen} />
      <Stack.Screen name="MyOrdersStackScreen" component={MyOrdersScreen} />
      <Stack.Screen name="WishlistStackScreen" component={WishlistScreen} />
      <Stack.Screen
        name="ShippingAddressStackScreen"
        component={ShipppingAddressScreen}
      />
      <Stack.Screen
        name="ProfileSettingStackScreen"
        component={ProfileSettingScreen}
      />
      <Stack.Screen
        name="TermsAndPrivacyStackScreen"
        component={TermsAndPrivacyScreen}
      />
      <Stack.Screen name="MakeReviewStackScreen" component={MakeReviewScreen} />
      <Stack.Screen name="ListingStackScreen" component={ListingScreen} />
      <Stack.Screen
        name="ProductDetailsStackScreen"
        component={ProductDetailsScreen}
      />

      <Stack.Screen
        name="ProductReviewsStackScreen"
        component={ProductReviewsScreen}
      />

      <Stack.Screen name="CheckoutStackScreen" component={CheckoutScreen} />
      <Stack.Screen
        name="OrderDetailsStackScreen"
        component={OrderDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
