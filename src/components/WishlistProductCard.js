import {useContext} from 'react';
import {View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import MyText from './MyText';
import {color, font} from '../helpers/Constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {CustomerContext} from '../../App';
import {SERVER_URL} from '../../config/Config';
import Toast from 'react-native-toast-message';

const WishlistProductCard = ({product, navigation, onDelete = () => {}}) => {
  const {state} = useContext(CustomerContext);
  const {
    name,
    defaultImage,
    priceVariants: [{mrp, sellingPrice}],
    wishlistId,
    _id,
  } = product;

  // remove from wishlist
  const deleteHandler = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/wishlists/${wishlistId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.jwtToken}`,
        },
      });
      const result = await response.json();
      if (result.status == 200) {
        Toast.show({text1: result.message, type: 'success'});
        onDelete(old => {
          return !old;
        });
      } else {
        Toast.show({text1: result.message, type: 'danger'});
      }
    } catch (error) {
      Toast.show({text1: error.message, type: 'danger'});
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={{padding: 10}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              position: 'relative',
            }}>
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ProductDetailsStackScreen', {
                    params: product,
                  });
                }}>
                <Image
                  style={{
                    height: 70,
                    width: 70,
                    resizeMode: 'center',
                    borderRadius: 35,
                  }}
                  source={{uri: defaultImage}}
                />
              </TouchableOpacity>
            </View>
            <View style={{paddingLeft: 15, marginTop: 10}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ProductDetailsStackScreen', {
                    params: product,
                  });
                }}>
                <MyText
                  style={{
                    fontSize: 13,
                    color: color.black600,
                    fontFamily: font.medium,
                  }}>
                  {name.length > 35 ? name.slice(0, 34) + '..' : name}
                </MyText>
              </TouchableOpacity>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <FontAwesome name="inr" size={15} color={color.black500} />
                  <MyText style={styles.sellingPriceText}>
                    {Number.parseInt(sellingPrice)}
                  </MyText>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 10,
                  }}>
                  <FontAwesome name="inr" size={15} color={color.skyBlue600} />
                  <MyText style={styles.mrpText}>{Number.parseInt(mrp)}</MyText>
                </View>
              </View>
            </View>

            {/* Delete Buttom */}
            <View style={styles.deleteBtnContainer}>
              <TouchableOpacity
                onPress={() => {
                  deleteHandler(product._id);
                }}
                style={styles.deleteBtn}>
                <FontAwesome name={'trash'} size={12} color={color.white700} />
              </TouchableOpacity>
            </View>
          </View>
          {/* Ratings & Reviews  */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('MakeReviewStackScreen', {
                screen: 'MakereviewStackScreen',
                productId: _id,
              });
            }}>
            <View style={styles.review}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <FontAwesome
                  style={styles.star}
                  name={'star'}
                  size={15}
                  color={color.white700}
                />
                <MyText style={styles.reviewtext}>Make a Review</MyText>
              </View>
              <FontAwesome
                style={styles.angle}
                name={'angle-right'}
                size={20}
                color={color.black500}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default WishlistProductCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 1,
  },
  card: {
    marginTop: 1,
    flex: 1,
    borderRadius: 15,
    backgroundColor: color.white700,
    elevation: 1,
  },
  review: {
    marginTop: 10,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 6,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  star: {
    backgroundColor: color.skyBlue600,
    paddingHorizontal: 8,
    paddingVertical: 7,
    borderRadius: 20,
  },
  sellingPriceText: {
    color: color.black500,
    marginLeft: 3,
    fontFamily: font.medium,
    marginBottom: 2,
  },
  mrpText: {
    color: color.skyBlue600,
    marginLeft: 3,
    textDecorationLine: 'line-through',
    fontFamily: font.medium,
    marginBottom: 2,
  },
  reviewtext: {
    fontSize: 16,
    marginLeft: 10,
    color: color.black500,
  },
  angle: {},
  deleteBtnContainer: {
    flexDirection: 'row',
    width: 80,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 5,
    position: 'absolute',
    top: -15,
    right: -15,
  },
  deleteBtn: {
    borderTopEndRadius: 10,
    borderBottomStartRadius: 10,
    padding: 12,
    backgroundColor: color.red600,
  },
});
