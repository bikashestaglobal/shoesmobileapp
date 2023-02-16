import React, {useContext} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {windowWidth} from '../../utils/Dimensions';
import {color, font} from '../helpers/Constants';
import {Rating} from 'react-native-ratings';
import MyText from './MyText';
import {addToCartHandler} from '../helpers/CartHelpers';
import {CustomerContext} from '../../App';
import {useNavigation} from '@react-navigation/native';

const dimensions = Dimensions.get('window');
const imageHeight = Math.round((dimensions.width * 9) / 16);

const BestsellerProductCard = ({item, style}) => {
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
    priceVariants: [price],
    category = 'GOWN',
    _id: productId,
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
    <View style={styles.BestsellerproductCard}>
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate('ProductDetailsStackScreen', {
            // screen: 'ProductDetailsStackScreen',
            params: item,
          })
        }>
        {/* Image */}
        <View>
          <Image
            resizeMode={'stretch'}
            style={styles.productImage}
            source={{uri: defaultImage}}
          />
        </View>

        <View style={styles.rightContainer}>
          {/* category */}
          <View>
            <MyText style={styles.category}>
              {category.length > 19 ? category.slice(0, 19) + '.' : category}
            </MyText>
          </View>

          {/* Name */}
          <View>
            <MyText style={styles.name}>
              {name.length > 19 ? name.slice(0, 19) + '.' : name}
            </MyText>
          </View>

          {/* Review */}
          <View style={{alignItems: 'flex-start', marginVertical: 10}}>
            <Rating
              ratingBackgroundColor="red"
              ratingColor="black600"
              type="star"
              readonly={true}
              ratingCount={5}
              imageSize={13}
              startingValue={avgRating}
            />
          </View>

          <View style={styles.priceContainer}>
            <MyText style={styles.sellingPrice}>Rs.{price.sellingPrice}</MyText>

            <MyText style={styles.mrp}>Rs. {price.mrp}</MyText>
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
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BestsellerProductCard;
const styles = StyleSheet.create({
  card: {
    width: windowWidth - 20,
    flexDirection: 'row',
    borderWidth: 0.3,
    borderColor: color.black500,
  },

  rightContainer: {
    justifyContent: 'center',
    paddingLeft: 20,
  },

  productCard: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.white700,
    marginBottom: 10,
  },

  productImage: {height: imageHeight, width: windowWidth / 2},

  priceContainer: {
    paddingBottom: 10,
    gap: 2,
  },
  sellingPrice: {
    fontSize: 14,
    fontFamily: font.bold,
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
    fontSize: 15,
  },
  category: {
    color: color.black400,
    fontSize: 14,
  },
  addToCartBtn: {
    backgroundColor: color.skyBlue600,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
});
