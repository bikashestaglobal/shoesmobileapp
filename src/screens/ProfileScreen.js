import {
  View,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import MyText from '../components/MyText';
import {color, font} from '../helpers/Constants';
import Header from '../components/Header';
import ProfileCard from '../components/ProfileCard';
import {SERVER_URL} from '../../config/Config';
import {CustomerContext} from '../../App';
import Container from '../components/Container';

const ProfileScreen = ({navigation}) => {
  const {state, dispatch} = useContext(CustomerContext);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profile, setProfile] = useState({});

  const [wishlistLoading, setWishlistLoading] = useState(true);
  const [wishlistItems, setWishlistItems] = useState([]);

  const [ordersLoading, setOrdersLoading] = useState(true);
  const [myOrders, setMyOrders] = useState([]);

  const [shippingAddressLoading, setShippingAddressLoading] = useState(true);
  const [shippingAddress, setShippingAddress] = useState([]);

  // get profile details
  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/customer/profile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${state.jwtToken}`,
          },
        });
        const result = await response.json();
        if (result.status == 200) {
          setProfile(result.body);
        } else {
          Alert.alert('Profile Error', result.message);
        }
        setProfileLoading(false);
      } catch (error) {
        Alert.alert('Profile Error', error.message);
        setProfileLoading(false);
      }
    };

    getProfile();
  }, []);

  // Get wishlist items
  useEffect(() => {
    const getWishlistItems = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/wishlists/myWishlist`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${state.jwtToken}`,
          },
        });
        const result = await response.json();
        setWishlistLoading(false);
        if (result.status == 200) {
          setWishlistItems(result.body);
        } else {
          Alert.alert('Wishlist Error', result.message);
        }
      } catch (error) {
        setWishlistLoading(false);
        Alert.alert('Wishlist Error', error.message);
      }
    };

    getWishlistItems();
  }, []);

  // Get Shipping Address
  useEffect(() => {
    const getShippingAddress = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/customer/profile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${state.jwtToken}`,
          },
        });
        const result = await response.json();
        setShippingAddressLoading(false);
        if (result.status == 200) {
          setShippingAddress(result.body?.shippingAddresses || []);
        } else {
          Alert.alert('Wishlist Error', result.message);
        }
      } catch (error) {
        setShippingAddressLoading(false);
        Alert.alert('Wishlist Error', error.message);
      }
    };

    getShippingAddress();
  }, []);

  // Get All Orders
  useEffect(() => {
    const getAllOrders = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/order/myOrders`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${state.jwtToken}`,
          },
        });
        const result = await response.json();
        setOrdersLoading(false);
        if (result.status == 200) {
          setMyOrders(result.body);
        } else {
          Alert.alert('Orders Error', result.message);
        }
      } catch (error) {
        setOrdersLoading(false);
        Alert.alert('Orders Error', error.message);
      }
    };

    getAllOrders();
  }, []);

  return (
    <Container>
      <Header
        navigation={navigation}
        titleColor={color.black600}
        title={'My Profile'}
      />

      <View style={styles.root}>
        <View style={styles.container}>
          <View style={styles.box}>
            {/* Profile photo */}
            <View style={styles.photoContainer}>
              <View style={styles.profilePicBox}>
                <Image
                  style={styles.profilePic}
                  source={require('./../assets/images/user.jpg')}
                />
                {/* <TouchableOpacity style={styles.cameraBtn}>
                <FontAwesome color={color.white} name="camera" />
              </TouchableOpacity> */}
              </View>
            </View>

            {/* personal information */}
            <View style={styles.personalInfo}>
              {profileLoading ? (
                <View style={{flexDirection: 'row'}}>
                  <ActivityIndicator />
                  <MyText style={{color: color.black500, marginLeft: 5}}>
                    Loading...
                  </MyText>
                </View>
              ) : (
                <MyText
                  style={{
                    color: color.black600,
                    fontSize: 16,
                    fontFamily: font.medium,
                  }}>
                  {profile.name}
                </MyText>
              )}

              {profileLoading ? (
                <View style={{flexDirection: 'row'}}>
                  <ActivityIndicator />
                  <MyText style={{color: color.black500, marginLeft: 5}}>
                    Loading...
                  </MyText>
                </View>
              ) : (
                <MyText style={{color: color.black400}}>{profile.email}</MyText>
              )}
            </View>

            {/* Card */}
            <View style={styles.cardContainer}>
              <ScrollView
                style={{flex: 1}}
                showsVerticalScrollIndicator={false}>
                {/* Orders Card */}
                <ProfileCard
                  onPressHandler={() =>
                    navigation.navigate('MyOrdersStackScreen')
                  }
                  isLoading={ordersLoading}
                  title={'My Orders'}
                  subTitle={`${myOrders.length} Orders`}
                />

                {/* Wishlists Card */}
                <ProfileCard
                  onPressHandler={() =>
                    navigation.navigate('WishlistStackScreen')
                  }
                  isLoading={wishlistLoading}
                  title={'Wishlists'}
                  subTitle={`${wishlistItems.length} Items`}
                />

                {/* Shipping Address Card*/}
                <ProfileCard
                  onPressHandler={() => {
                    navigation.navigate('ShippingAddressStackScreen');
                  }}
                  isLoading={shippingAddressLoading}
                  title={'Shipping Adderss'}
                  subTitle={`${shippingAddress.length} Address`}
                />

                {/* My Reviews */}
                <ProfileCard title={'My Reviews'} subTitle={'05 Reviews'} />

                {/* Settings */}
                <ProfileCard
                  onPressHandler={() => {
                    navigation.navigate('ProfileSettingStackScreen');
                  }}
                  title={'Settings'}
                  subTitle={'Password, Contact'}
                />
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
    </Container>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.white700,
  },
  container: {
    flex: 1,
    padding: 20,
    marginBottom: 10,
    marginTop: 100,
  },

  box: {
    backgroundColor: color.black300,
    flex: 1,
    borderRadius: 30,
    elevation: 1,
  },
  photoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePicBox: {
    width: 100,
    height: 100,
    backgroundColor: color.white700,
    marginTop: -80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    elevation: 1,
  },
  profilePic: {
    height: '100%',
    width: '100%',
    borderRadius: 50,
  },

  personalInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  cardContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    flex: 1,
  },
  card: {
    paddingHorizontal: 25,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: color.white700,
    borderRadius: 15,
    marginBottom: 12,
  },
});
