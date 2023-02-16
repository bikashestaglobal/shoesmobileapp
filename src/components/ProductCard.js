import {useNavigation} from '@react-navigation/native';
import React, {useContext} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {color, font} from '../helpers/Constants';
import MyText from './MyText';
import {addToCartHandler} from '../helpers/CartHelpers';
import {CustomerContext} from '../../App';
const dimensions = Dimensions.get('window');
const imageHeight = Math.round((dimensions.width * 9) / 16);

const ProductCard = ({item, style}) => {
  const {state, dispatch} = useContext(CustomerContext);
  const {cart} = state;

  const navigation = useNavigation();

  // addToCartHandler
  const cartHandler = () => {
    addToCartHandler(dispatch, item, 1, item?.priceVariants[0]);
  };

  const {
    name = '',
    defaultImage = '',
    reviews = [],
    _id: productId,
    priceVariants: [price],
  } = item;

  // calculate rating
  const noOfRating = reviews?.length;
  let avgRating = 0;
  if (noOfRating) {
    const sum = reviews
      .map(item => item.rating)
      .reduce((prev, next) => prev + next);
    avgRating = sum / noOfRating;
  }

  return (
    <View style={{...styles.productCard, ...style}}>
      <TouchableOpacity
        style={{width: '100%'}}
        onPress={() =>
          navigation.navigate('ProductDetailsStackScreen', {
            screen: 'ProductDetailsStackScreen',
            params: item,
          })
        }>
        {/* Image */}
        <Image
          resizeMode={'stretch'}
          style={styles.productImage}
          source={{uri: defaultImage}}
        />

        <View style={styles.badgeContainer}>
          <MyText style={styles.badge}>NEW</MyText>
          {/* <View>
            <TouchableOpacity style={styles.wishlist}>
              <Ionicons
                name="heart-outline"
                style={styles.wishlistIcon}
                size={20}
              />
            </TouchableOpacity>
          </View> */}
        </View>

        {/* Review */}
        {/* <View style={{alignItems: 'flex-start', marginBottom: 10}}>
          <Rating
            ratingBackgroundColor="red"
            ratingColor="black600"
            type="star"
            readonly={true}
            ratingCount={5}
            imageSize={13}
            startingValue={avgRating}
          />
        </View> */}

        <View style={styles.priceContainer}>
          <MyText style={styles.sellingPrice}>Rs.{price.sellingPrice}</MyText>

          <MyText style={styles.mrp}>Rs. {price.mrp}</MyText>
        </View>

        <View>
          <MyText style={styles.name}>
            {name.length > 19 ? name.slice(0, 19) + '.' : name}
          </MyText>
        </View>

        {/* Add To Cart Button */}
        <View style={{paddingHorizontal: 10}}>
          <TouchableOpacity
            style={{
              ...styles.addToCartBtn,
              backgroundColor: cart.some(p => p.productId == productId)
                ? color.red600
                : color.skyBlue600,
            }}
            onPress={() => {
              {
                cart.some(p => p.productId == productId)
                  ? navigation.navigate('CartTabScreen')
                  : cartHandler();
              }
            }}>
            <SimpleLineIcons
              name={'handbag'}
              color={color.white700}
              size={20}
            />
            <MyText style={{color: color.white700, fontSize: 16}}>
              {cart.some(p => p.productId == productId)
                ? 'Go to Cart'
                : 'Add to Cart'}
            </MyText>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ProductCard;
const styles = StyleSheet.create({
  productCard: {
    width: '49%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.white700,
    marginBottom: 10,
  },

  productImage: {height: imageHeight, width: '100%'},

  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    gap: 10,
  },
  sellingPrice: {
    fontSize: 14,
    color: color.black600,
  },
  badgeContainer: {
    top: 10,
    width: '100%',
    position: 'absolute',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  badge: {
    backgroundColor: color.green600,
    color: color.white700,
    paddingHorizontal: 15,
    paddingVertical: 6,
    fontSize: 12,
    fontFamily: font.medium,
  },

  wishlist: {
    padding: 10,
    backgroundColor: color.skyBlue600,
    borderRadius: 20,
  },
  wishlistIcon: {
    color: color.white700,
  },

  mrp: {
    fontSize: 14,
    color: color.skyBlue600,
    textDecorationLine: 'line-through',
  },
  name: {
    fontFamily: font.medium,
    textAlign: 'center',
    marginBottom: 10,
  },
  addToCartBtn: {
    backgroundColor: color.skyBlue600,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
});
