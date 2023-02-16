import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import {color} from '../helpers/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CustomerContext} from '../../App';
import CartScreen from '../screens/CartScreen';
import CategoryScreen from '../screens/CategoryScreen';
import SearchScreen from '../screens/SearchScreen';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const {state, dispatch} = useContext(CustomerContext);
  return (
    <Tab.Navigator
      initialRouteName="HomeTabScreen"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: color.black400,
        tabBarActiveTintColor: color.white700,
        tabBarActiveBackgroundColor: color.skyBlue600,
        tabBarStyle: {
          backgroundColor: color.white700,
          height: 60,
        },
        tabBarHideOnKeyboard: true,
        tabBarItemStyle: {
          marginHorizontal: 20,
          marginVertical: 5,
          borderRadius: 10,
        },
      }}>
      {/* Home Tab */}
      <Tab.Screen
        name="HomeTabScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size, focused}) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              color={color}
              size={size}
            />
          ),
        }}
      />

      {/* Search Tab */}
      <Tab.Screen
        name="SearchTabScreen"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({color, size, focused}) => (
            <Ionicons
              name={focused ? 'search' : 'search'}
              color={color}
              size={size}
            />
          ),
        }}
      />

      {/* Cart Tab */}
      <Tab.Screen
        name="CartTabScreen"
        component={CartScreen}
        options={{
          tabBarBadge: state?.cart?.length || 0,
          tabBarBadgeStyle: {
            backgroundColor: color.green600,
            color: color.white700,
          },
          tabBarIcon: ({color, size, focused}) => (
            <Ionicons
              name={focused ? 'cart' : 'cart-outline'}
              color={color}
              size={size}
            />
          ),
        }}
      />

      {/* Category Tab*/}
      <Tab.Screen
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <Ionicons
              name={focused ? 'apps' : 'apps-outline'}
              color={color}
              size={size}
            />
          ),
        }}
        name="CategoryTabScreen"
        component={CategoryScreen}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
