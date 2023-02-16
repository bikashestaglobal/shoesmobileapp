import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet, TouchableOpacity, Alert, Linking} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {Title, Drawer} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CustomerContext} from '../../App';
import {SERVER_URL} from '../../config/Config';
import {color, font} from '../helpers/Constants';
import MyText from './MyText';

export default function DrawerContent(props) {
  const {state, dispatch} = useContext(CustomerContext);
  const [profile, setProfile] = useState({
    name: 'Guest',
  });

  const logoutHandler = async () => {
    try {
      await AsyncStorage.removeItem('customerInfo');
      dispatch({type: 'CLEAR', payload: null});
      // Fetching payments details
      // fetch(Config.SERVER_URL + '/student/updateLoginStatus', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${state.jwt_token}`,
      //   },
      // })
      //   .then(async res => res.json())
      //   .then(
      //     async result => {
      //       // console.log(result);
      //       if (result.success) {
      //         await AsyncStorage.removeItem('student');
      //         console.log('Data removed');
      //         dispatch({type: 'CLEAR', payload: null});
      //       } else {
      //         dispatch({type: 'CLEAR', payload: null});
      //       }
      //     },
      //     error => {
      //       Alert.alert('Oops Error', 'Error occured');
      //     },
      //   );
    } catch (exception) {
      dispatch({type: 'CLEAR', payload: null});
    }
  };

  useEffect(() => {
    if (state?.jwtToken) {
      const getProfile = async () => {
        try {
          const response = await fetch(`${SERVER_URL}/customer/profile`, {
            method: 'GET',
            headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${state?.jwtToken}`,
            },
          });
          const result = await response.json();
          if (result.status == 200) {
            setProfile({
              name: result.body.name.split(' ')[0],
              email: result.body.email,
            });
          } else {
          }
        } catch (error) {
          Alert('OOPS Error !', error.message);
        }
      };

      getProfile();
    }
  }, [state?.jwtToken]);

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          {/* header */}
          <View style={styles.userInfoSection}>
            <TouchableOpacity
              onPress={() =>
                state.jwtToken
                  ? props.navigation.navigate(
                      state?.jwtToken ? 'ProfileStackScreen' : 'LoginDrawer',
                    )
                  : props.navigation.navigate('LoginStackScreen')
              }>
              <View>
                <EvilIcons name={'user'} color={color.white700} size={70} />
              </View>
              <View style={{paddingLeft: 10}}>
                <MyText
                  style={styles.title}>{`Welcome ${profile.name}!`}</MyText>
                {profile.email ? (
                  <MyText style={styles.email}>{`${profile.email}!`}</MyText>
                ) : null}
              </View>
            </TouchableOpacity>
          </View>

          {/* Profile Links */}
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-around',
              paddingVertical: 15,
              paddingHorizontal: 10,
              backgroundColor: color.skyBlue600,
            }}>
            {/* My Orders */}
            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={() => {
                if (state?.jwtToken)
                  props.navigation.navigate('MyOrdersStackScreen');
                else props.navigation.navigate('LoginStackScreen');
              }}>
              <Ionicons name="list-circle" size={25} color={color.white700} />
              <MyText style={{color: color.white700, fontSize: 12}}>
                My Orders
              </MyText>
            </TouchableOpacity>

            {/* My Reviews */}
            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={() => {
                if (state?.jwtToken)
                  props.navigation.navigate('MyReviewsStackScreen');
                else props.navigation.navigate('LoginStackScreen');
              }}>
              <Ionicons name="star-sharp" size={25} color={color.white700} />
              <MyText style={{color: color.white700, fontSize: 12}}>
                Reviews
              </MyText>
            </TouchableOpacity>

            {/* Wishlist */}
            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={() => {
                if (state?.jwtToken)
                  props.navigation.navigate('WishlistStackScreen');
                else props.navigation.navigate('LoginStackScreen');
              }}>
              <Ionicons name="apps-outline" size={25} color={color.white700} />
              <MyText style={{color: color.white700, fontSize: 12}}>
                Wishlists
              </MyText>
            </TouchableOpacity>
          </View>

          {/* Navigation */}
          {/* <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
            <DrawerItemList {...props} />
          </View> */}

          <View>
            <Drawer.Section style={styles.drawerSection}>
              {/* Shop Now */}
              <DrawerItem
                style={{marginBottom: -5}}
                icon={({size}) => (
                  <Ionicons
                    name={'home-outline'}
                    color={color.black}
                    size={size}
                  />
                )}
                label="Shop Now"
                onPress={() => {
                  props.navigation.closeDrawer();
                  props.navigation.navigate('HomeDrawer');
                }}
                labelStyle={styles.label}
              />

              {/* Cart */}
              <DrawerItem
                style={{marginBottom: -5}}
                icon={({size}) => (
                  <Ionicons
                    name={'md-cart-outline'}
                    color={color.black}
                    size={size}
                  />
                )}
                label="Cart"
                onPress={() => {
                  props.navigation.closeDrawer();
                  props.navigation.navigate('CartTabScreen');
                }}
                labelStyle={styles.label}
              />

              {/* My Profile */}
              <DrawerItem
                style={{marginBottom: -5}}
                icon={({size}) => (
                  <Ionicons
                    name={'person-outline'}
                    color={color.black}
                    size={size}
                  />
                )}
                label="My Profile"
                onPress={() => {
                  // props.navigation.closeDrawer();
                  state.jwtToken
                    ? props.navigation.navigate('ProfileStackScreen')
                    : props.navigation.navigate('LoginStackScreen');
                }}
                labelStyle={styles.label}
              />

              {/* Chat with us */}
              <DrawerItem
                style={{marginBottom: -5}}
                icon={({size}) => (
                  <Ionicons
                    name={'logo-whatsapp'}
                    color={color.black}
                    size={size}
                  />
                )}
                label="Chat With Us"
                onPress={() => {
                  // props.navigation.closeDrawer();
                  props.navigation.navigate('ChatStackScreen');
                }}
                labelStyle={styles.label}
              />
              {/* About us */}
              <DrawerItem
                style={{marginBottom: -5}}
                icon={({size}) => (
                  <Ionicons
                    name={'search-outline'}
                    color={color.black}
                    size={size}
                  />
                )}
                label="About Us"
                onPress={() => {
                  // props.navigation.closeDrawer();
                  props.navigation.navigate('AboutStackScreen');
                }}
                labelStyle={styles.label}
              />

              {/* Contact us */}
              <DrawerItem
                style={{marginBottom: -5}}
                icon={({size}) => (
                  <Ionicons
                    name={'call-outline'}
                    color={color.black}
                    size={size}
                  />
                )}
                label="Contact Us"
                onPress={() => {
                  // props.navigation.closeDrawer();
                  props.navigation.navigate('ContactStackScreen');
                  // props.navigation.navigate('ThankYouStackScreen');
                }}
                labelStyle={styles.label}
              />
              {/* terms & Privacy */}
              <DrawerItem
                style={{marginBottom: -5}}
                icon={({size}) => (
                  <Ionicons
                    name={'settings-outline'}
                    color={color.black}
                    size={size}
                  />
                )}
                label="Terms & Privacy"
                onPress={() => {
                  // props.navigation.closeDrawer();
                  props.navigation.navigate('TermsAndPrivacyStackScreen');
                }}
                labelStyle={styles.label}
              />
            </Drawer.Section>

            {/* Prefrences */}
            <Drawer.Section title={'Communicate'}>
              {/* Review Us */}
              <DrawerItem
                style={{marginBottom: -5}}
                icon={({size}) => (
                  <Ionicons
                    name={'star-outline'}
                    color={color.black}
                    size={size}
                  />
                )}
                label="Review Us"
                onPress={() => {
                  props.navigation.closeDrawer();
                  // props.navigation.navigate('ChatStackScreen');
                }}
                labelStyle={styles.label}
              />
              {/* Share With Friends */}
              <DrawerItem
                style={{marginBottom: -5}}
                icon={({size}) => (
                  <Ionicons
                    name={'share-outline'}
                    color={color.black}
                    size={size}
                  />
                )}
                label="Share With Friends"
                onPress={() => {
                  props.navigation.closeDrawer();
                  // props.navigation.navigate('ChatStackScreen');
                }}
                labelStyle={styles.label}
              />
            </Drawer.Section>
          </View>
        </View>
      </DrawerContentScrollView>

      <Drawer.Section style={styles.bottomDrawerSection}>
        {/* Login/Logout */}
        {state.jwtToken ? (
          <DrawerItem
            icon={({size}) => (
              <Ionicons
                name={'log-out-outline'}
                color={color.black}
                size={size}
              />
            )}
            labelStyle={styles.label}
            label="Log Out"
            onPress={logoutHandler}
          />
        ) : (
          <DrawerItem
            icon={({size}) => (
              <Ionicons
                name={'log-in-outline'}
                color={color.black}
                size={size}
              />
            )}
            label="Log In"
            onPress={() => props.navigation.navigate('LoginStackScreen')}
            labelStyle={styles.label}
          />
        )}
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 15,
    paddingBottom: 20,
    paddingTop: 15,
    marginBottom: 1,
    flexDirection: 'column',
    backgroundColor: color.skyBlue600,
    marginTop: -5,
  },
  label: {
    marginLeft: -20,
    color: color.black,
    fontFamily: font.bold,
  },
  title: {
    fontSize: 18,
    marginTop: 10,
    color: color.white700,
    fontFamily: font.bold,
  },
  email: {
    fontSize: 13,
    marginTop: 3,
    color: color.black200,
    fontFamily: font.regular,
  },
  caption: {
    fontSize: 16,
    lineHeight: 17,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 5,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
