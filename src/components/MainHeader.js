import React, {useContext} from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {color} from '../helpers/Constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MyText from './MyText';
import {useNavigation} from '@react-navigation/native';
import {CustomerContext} from '../../App';

const MainHeader = () => {
  const navigation = useNavigation();
  const {state, dispatch} = useContext(CustomerContext);
  const {cart} = state;
  return (
    <View style={styles.container}>
      {/* Bar Icon & Logo*/}
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {/* Bar Icon */}
        <View>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <FontAwesome name={'bars'} color={color.black600} size={22} />
          </TouchableOpacity>
        </View>

        {/* Logo */}
        <TouchableOpacity style={styles.logoContainer}>
          <Image
            style={styles.logo}
            resizeMode={'contain'}
            source={require('../assets/images/logo.png')}
          />
        </TouchableOpacity>
      </View>

      {/* Icons */}
      <View style={styles.icons}>
        {/* Wishlist */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(
              state?.jwtToken ? 'WishlistStackScreen' : 'LoginStackScreen',
            );
          }}>
          <FontAwesome name={'heart-o'} size={22} color={color.black600} />
        </TouchableOpacity>

        {/* Account */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(
              state?.jwtToken ? 'ProfileStackScreen' : 'LoginStackScreen',
            );
          }}>
          <FontAwesome name={'user-o'} size={22} color={color.black600} />
        </TouchableOpacity>

        {/* Cart */}
        <TouchableOpacity
          style={styles.cartIconContainer}
          onPress={() => {
            navigation.navigate('CartTabScreen');
          }}>
          <SimpleLineIcons name={'handbag'} size={22} color={color.black600} />
          <View style={styles.cartBadge}>
            <MyText style={{fontSize: 10, color: color.white700}}>
              {cart.length}
            </MyText>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MainHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.white700,
    paddingVertical: 5,
    paddingHorizontal: 20,
    elevation: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 90,
  },
  logoContainer: {
    height: 50,
    width: 110,
    marginLeft: 15,
  },
  logo: {
    height: '100%',
    width: '100%',
  },
  cartIconContainer: {
    position: 'relative',
  },
  cartBadge: {
    backgroundColor: color.red600,
    borderRadius: 10,
    position: 'absolute',
    height: 17,
    width: 17,
    color: color.white700,
    justifyContent: 'center',
    alignItems: 'center',
    right: -9,
    top: 2,
  },
});
