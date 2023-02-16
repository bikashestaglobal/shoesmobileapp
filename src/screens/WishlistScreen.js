import {
  View,
  Pressable,
  ScrollView,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Container from '../components/Container';
import MyText from '../components/MyText';
import {color} from '../helpers/Constants';
import {SERVER_URL} from '../../config/Config';
import {CustomerContext} from '../../App';
import Header from '../components/Header';
import WishlistProductCard from '../components/WishlistProductCard';

const WishlistScreen = props => {
  const {navigation} = props;
  const [deleted, setDeleted] = useState(false);
  const {state, dispatch} = useContext(CustomerContext);
  const [loading, setLoading] = useState(true);
  const [wishlistItems, setWishlistItems] = useState([]);
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
        setLoading(false);
        if (result.status == 200) {
          setWishlistItems(result.body);
        } else {
          Alert.alert('Wishlist Error', result.message);
        }
      } catch (error) {
        setLoading(false);
        Alert.alert('Wishlist Error', error.message);
      }
    };

    getWishlistItems();
  }, [deleted]);

  return (
    <Container>
      {/* Header */}
      <Header
        navigation={navigation}
        title={'My Wishlist'}
        titleColor={color.black}
      />

      {/* Body */}
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.cardContainer}
          contentContainerStyle={{flexGrow: 1}}>
          {loading ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <View>
                <ActivityIndicator color={color.blood500} size={25} />
                <MyText style={{fontSize: 17, marginVertical: 10}}>
                  Please Wait..
                </MyText>
              </View>
            </View>
          ) : wishlistItems.length ? (
            <View style={{flex: 1}}>
              {/* Wishlist Products */}
              {wishlistItems.map(({product, _id}) => {
                return (
                  <WishlistProductCard
                    key={_id}
                    product={{...product, wishlistId: _id}}
                    navigation={navigation}
                    onDelete={setDeleted}
                  />
                );
              })}
            </View>
          ) : (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Entypo name={'emoji-sad'} size={150} color={color.blood700} />
              <MyText style={{fontSize: 20, color: color.black}}>
                Sorry Wishlist is Empty
              </MyText>

              <View
                style={{
                  backgroundColor: color.blood700,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 20,
                  overflow: 'hidden',
                  marginTop: 20,
                }}>
                <Pressable
                  onPress={() => {
                    navigation.navigate('HomeStackScreen');
                  }}
                  style={{paddingVertical: 10, paddingHorizontal: 20}}
                  android_ripple={{color: color.blood500}}>
                  <MyText style={{color: color.white}}>
                    Continue Shopping
                  </MyText>
                </Pressable>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </Container>
  );
};

export default WishlistScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: color.black300,
  },
  cardContainer: {
    flex: 1,
  },
});
