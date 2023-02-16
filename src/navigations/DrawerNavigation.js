import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TabNavigation from './TabNavigation';
import DrawerContent from '../components/DrawerContent';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Drawer = createDrawerNavigator();

const DrawerNavigation = ({navigation}) => {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      initialRouteName="HomeDrawer"
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: {marginLeft: -20},
        headerLeft: props => {
          return (
            <Ionicons
              name="ios-arrow-back-circle-sharp"
              color="red"
              size={22}
              onPress={() => {
                navigation.goBack();
              }}
            />
          );
        },
      }}>
      {/* Home */}
      <Drawer.Screen
        name="HomeDrawer"
        component={TabNavigation}
        options={{
          drawerLabel: 'Shop Now',
          drawerIcon: ({focused, color, size}) => {
            let iconName = focused ? 'home' : 'home-outline';
            return <Ionicons name={iconName} color={color} size={size} />;
          },
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
