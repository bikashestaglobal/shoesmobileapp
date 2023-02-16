import React, {useEffect, useState, useRef, useContext} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  FlatList,
  Image,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import {ActivityIndicator, List} from 'react-native-paper';
import Container from '../components/Container';
import {color, font} from '../helpers/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Rating} from 'react-native-ratings';
import {SERVER_URL} from '../../config/Config';
import MyText from '../components/MyText';
import B from '../components/B';
import ProductCardSkelton from '../components/ProductCardSkelton';
import ProductCard from '../components/ProductCard';
import {CustomerContext} from '../../App';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import {useIsFocused} from '@react-navigation/native';
import ProductCarousel from '../components/ProductCarousel';
import myStyles from '../helpers/Styles';
import Header from '../components/Header';
import {windowWidth} from '../../utils/Dimensions';
import FooterContent from '../components/FooterContent';
import Newsletter from '../components/Newsletter';
import StaticContent from '../components/StaticContent';
import Toast from 'react-native-toast-message';
import {addToCartHandler} from '../helpers/CartHelpers';

const ProductDetailsScreen = props => {
  const {state, dispatch} = useContext(CustomerContext);
  const {cart} = state;
  const {navigation, route} = props;
  const isFocused = useIsFocused();
  // destructure product object
  const {
    name,
    images,
    defaultImage,
    _id,
    priceVariants,
    parentCategories: [pCat],
    maximumOrderQuantity,
    colors = ['red', 'blue', 'green'],
    sizes = ['M', 'S', 'L', 'XL'],
  } = route.params.params;

  // List
  const [expanded, setExpanded] = useState(true);
  const handlePress = () => setExpanded(!expanded);

  const scrollRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [product, setProduct] = useState({
    flavour: {},
    reviews: [],
    priceVariants: [],
  });

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [realtedProductsLoading, setRelatedProductsLoading] = useState(true);
  const [wishlistLoading, setWishlistLoading] = useState(true);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [price, setPrice] = useState(priceVariants[0]);
  const [addWishlistLoading, setAddWishlistLoading] = useState(false);
  const [addedToWishlist, setAddedToWishlist] = useState(true);

  const [removeWishlistLoading, setRemoveWishlistLoading] = useState(false);
  const [removedFromWishlist, setRemovedFromWishlist] = useState(true);

  const sliderImages = [
    {imgUrl: defaultImage},
    ...images.map(img => {
      return {imgUrl: img.url};
    }),
  ];

  // Get product
  useEffect(() => {
    if (_id && isFocused) {
      scrollRef.current?.scrollTo({
        y: 0,
        animated: true,
      });
      setPrice(priceVariants[0]);
      setIsLoading(true);
      async function getProduct() {
        try {
          const response = await fetch(`${SERVER_URL}/product/${_id}`);
          const data = await response.json();
          if (data.status == 200) {
            const body = data.body;
            // calculate rating
            let avgRating = 0;
            const noOfRating = body.reviews.length;
            if (noOfRating) {
              const sum = body.reviews
                .map(item => item.rating)
                .reduce((prev, next) => prev + next);

              avgRating = sum / noOfRating;
            }
            body.avgRating = avgRating;
            setProduct(body);
            // setPrice(data.body.priceVariants[0]);
          }
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          alert(error.message);
        }
      }

      getProduct();
    }
  }, [_id, isFocused]);

  // Get wishlist items
  useEffect(() => {
    if (state?.jwtToken) {
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
    } else {
      setWishlistLoading(false);
    }
  }, [addedToWishlist, removedFromWishlist]);

  const addItemToWishlistHandler = productId => {
    if (state?.jwtToken) {
      setAddWishlistLoading(true);
      fetch(`${SERVER_URL}/wishlists`, {
        method: 'POST',
        body: JSON.stringify({product: productId}),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.jwtToken}`,
        },
      })
        .then(res => res.json())
        .then(result => {
          setAddWishlistLoading(false);
          if (result.status == 200) {
            Toast.show({
              text1: result.message,
              type: 'success',
            });
            setAddedToWishlist(!addedToWishlist);
          } else {
            Toast.show({
              text1: result.message,
              type: 'danger',
            });
          }
        })
        .catch(error => {
          Toast.show({
            text1: error.message,
            type: 'danger',
          });
          setAddWishlistLoading(false);
        });
    } else {
      Alert.alert(
        'Wishlist Alert',
        'You need to login for adding product to wishlist',
        [
          {text: 'Close'},
          {
            text: 'Login',
            onPress: () => {
              navigation.navigate('LoginStackScreen');
            },
          },
        ],
      );
    }
  };

  const removeItemToWishlistHandler = wishlistId => {
    setRemoveWishlistLoading(true);
    fetch(`${SERVER_URL}/wishlists/${wishlistId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${state.jwtToken}`,
      },
    })
      .then(res => res.json())
      .then(result => {
        setRemoveWishlistLoading(false);
        if (result.status == 200) {
          Toast.show({
            text1: result.message,
          });
          setRemovedFromWishlist(!removedFromWishlist);
        } else {
          Toast.show({
            text1: result.message,
            type: 'danger',
          });
        }
      })
      .catch(error => {
        Toast.show({
          text1: error.message,
          type: 'danger',
        });
        setRemoveWishlistLoading(false);
      });
  };

  // Get Related Product
  useEffect(() => {
    if (pCat?._id) {
      setRelatedProductsLoading(true);
      async function getProduct() {
        try {
          const response = await fetch(
            `${SERVER_URL}/product/by/category/?parCatId=${pCat._id}&skip=0&limit=4`,
          );
          const data = await response.json();
          if (data.status == 200) {
            setRelatedProducts(data.body);
          }
          setRelatedProductsLoading(false);
        } catch (error) {
          setRelatedProductsLoading(false);
          alert(error.message);
        }
      }

      getProduct();
    }
  }, []);

  // increase quantity
  const increaseQuantityHandler = () => {
    if (quantity < maximumOrderQuantity) {
      setQuantity(current => {
        return current + 1;
      });
    } else {
      Alert.alert(
        'Product Alert',
        `Allow only ${maximumOrderQuantity} Quantity`,
      );
    }
  };

  // decrease quantity
  const decreaseQuantityHandler = () => {
    if (quantity < 2) {
      setQuantity(1);
      ToastAndroid.show('Quantity must be at least one !', 1000);
    } else {
      setQuantity(current => {
        return current - 1;
      });
    }
  };

  // addToCartHandler
  const cartHandler = () => {
    addToCartHandler(dispatch, product, quantity, price);
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <Container>
        {/* Header */}
        <Header titleColor={color.skyBlue500} title={'Product Details'} />

        <ScrollView ref={scrollRef} horizontal={false}>
          {/* Main Container */}
          <View style={styles.container}>
            {/* Image Carousel */}
            <ProductCarousel sliderImages={sliderImages} />

            {/* Name, Tags, SKU, REVIEWS */}
            <View style={myStyles.my3}>
              {/* Name */}
              <MyText style={styles.heading}>{name}</MyText>

              {/* Tags */}
              <View style={myStyles.my2}>
                <MyText style={styles.tag}> NEW </MyText>
              </View>

              {/* SKU & REVIEW */}
              <View style={myStyles.spaceBetween}>
                <MyText style={{color: color.black400}}>
                  SKU: <B>#P54785</B>{' '}
                </MyText>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('ProductReviewsStackScreen', {
                      productId: product._id,
                      productSlug: product.slug,
                    });
                  }}
                  style={myStyles.spaceBetween}>
                  <Rating
                    readonly={true}
                    ratingCount={5}
                    imageSize={15}
                    style={{starStyle: {margin: 3}}}
                    startingValue={product.avgRating}
                    ratingBackgroundColor="transparent"
                  />
                  <MyText style={myStyles.textSkyBlue}>
                    {product.reviews.length} Reviews
                  </MyText>
                </TouchableOpacity>
              </View>
            </View>

            {/* Descriptions */}
            <View style={myStyles.my3}>
              <MyText style={styles.description}>
                {product.shortDescription}
              </MyText>
            </View>

            {/* Colors */}
            <View style={{...myStyles.my2, ...myStyles.row}}>
              <View style={{width: 80}}>
                <MyText style={{...myStyles.text, ...myStyles.textMuted}}>
                  COLOR :
                </MyText>
              </View>
              <View style={myStyles.spaceBetween}>
                {colors.map((myColor, index) => {
                  return (
                    <TouchableOpacity
                      key={`color-${index}`}
                      onPress={() => setSelectedColor(myColor)}
                      style={{
                        ...styles.colorCard,
                        backgroundColor: myColor,
                        borderColor:
                          selectedColor == myColor ? color.black600 : myColor,
                      }}></TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Sizes */}
            <View style={{...myStyles.my2, ...myStyles.row}}>
              <View style={{width: 80}}>
                <MyText style={{...myStyles.text, ...myStyles.textMuted}}>
                  SIZE :
                </MyText>
              </View>
              <View style={myStyles.spaceBetween}>
                {sizes.map((mySize, index) => {
                  return (
                    <TouchableOpacity
                      style={{
                        ...styles.sizeCard,
                        backgroundColor:
                          selectedSize == mySize ? color.skyBlue600 : null,
                      }}
                      onPress={() => setSelectedSize(mySize)}>
                      <MyText
                        style={{
                          color:
                            selectedSize == mySize
                              ? color.white700
                              : color.skyBlue600,
                        }}>
                        {mySize}
                      </MyText>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Quantity */}
            <View style={{...myStyles.my2, ...myStyles.row}}>
              <View style={{width: 80}}>
                <MyText style={{...myStyles.text, ...myStyles.textMuted}}>
                  Quantity :
                </MyText>
              </View>
              <View style={myStyles.spaceBetween}>
                {/* Minus Button */}
                <TouchableOpacity
                  onPress={decreaseQuantityHandler}
                  style={styles.sizeCard}>
                  <AntDesign name="minus" size={17} color={color.black600} />
                </TouchableOpacity>

                {/* Value */}
                <TouchableOpacity>
                  <MyText style={myStyles.commonHeading}>{quantity}</MyText>
                </TouchableOpacity>

                {/* Plus Button */}
                <TouchableOpacity
                  onPress={increaseQuantityHandler}
                  style={styles.sizeCard}>
                  <AntDesign name="plus" size={15} color={color.black600} />
                </TouchableOpacity>

                {/* Left Item */}
                <MyText style={{color: color.black400}}>
                  <B>11 </B>Left
                </MyText>
              </View>
            </View>

            {/* Price */}
            <View style={styles.priceContainer}>
              <MyText style={styles.sellingPrice}>
                Rs. {price.sellingPrice}
              </MyText>
              <MyText style={styles.mrp}>Rs. {price.mrp}</MyText>
            </View>

            {/* Add to Cart Button */}
            <View style={{...myStyles.row, ...myStyles.mb3}}>
              <TouchableOpacity
                style={{
                  ...styles.cartBtn,
                  backgroundColor: cart.some(p => p.productId == product._id)
                    ? color.red600
                    : color.skyBlue600,
                }}
                onPress={() => {
                  cart.some(p => p.productId == product._id)
                    ? navigation.navigate('CartTabScreen')
                    : cartHandler();
                }}>
                <SimpleLineIcons
                  name={'handbag'}
                  size={18}
                  color={color.white700}
                  style={styles.cartBtnIcon}
                />
                <MyText style={styles.cartBtnText}>
                  {cart.some(p => p.productId == product._id)
                    ? 'GO TO CART'
                    : 'ADD TO CART'}
                </MyText>
              </TouchableOpacity>

              {/* Wishlist */}
              {wishlistLoading ? (
                <View style={styles.wishlistBtn}>
                  <ActivityIndicator color={color.skyBlue600} size={20} />
                </View>
              ) : wishlistItems.some(item => {
                  return item.product._id == product._id;
                }) ? (
                <TouchableOpacity
                  onPress={() => {
                    const filteredWishlist = wishlistItems.filter(item => {
                      return item.product._id == product._id;
                    });
                    removeItemToWishlistHandler(filteredWishlist[0]._id);
                  }}>
                  <View style={styles.wishlistBtn}>
                    {removeWishlistLoading ? (
                      <ActivityIndicator color={color.skyBlue600} size={20} />
                    ) : (
                      <Ionicons
                        name={'ios-heart'}
                        size={25}
                        color={color.skyBlue600}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    addItemToWishlistHandler(product._id);
                  }}>
                  <View style={styles.wishlistBtn}>
                    {addWishlistLoading ? (
                      <ActivityIndicator color={color.skyBlue600} size={20} />
                    ) : (
                      <Ionicons
                        name={'ios-heart-outline'}
                        size={25}
                        color={color.skyBlue600}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              )}

              <TouchableOpacity>
                <Ionicons
                  name={'ios-share-social'}
                  size={25}
                  color={color.skyBlue600}
                />
              </TouchableOpacity>
            </View>

            {/* Safe Checkout */}
            <View style={myStyles.mt3}>
              <MyText style={myStyles.heading}>GURANTEED SAFE CHEKOUT</MyText>
              <Image
                style={{width: '100%', margin: 0}}
                resizeMode="center"
                source={require('../../src/assets/images/safecheckout.png')}
              />
            </View>
          </View>

          {/* Static Content */}
          <StaticContent />

          {/* Accordian */}
          <View style={styles.container}>
            <List.Section>
              {/* Description */}
              <List.Accordion
                style={{paddingHorizontal: 0}}
                titleStyle={{fontFamily: font.medium}}
                title="DESCRIPTION">
                <List.Item
                  style={{padding: 0, margin: 0}}
                  descriptionStyle={{
                    fontFamily: font.medium,
                  }}
                  descriptionNumberOfLines={10}
                  description={
                    'Colour - White & Black Fabric - Cotton Wear - Casual Wear Washable - Machine Wash'
                  }
                />
              </List.Accordion>

              {/* Sizeing Guide */}
              <List.Accordion
                style={{paddingHorizontal: 0}}
                titleStyle={{fontFamily: font.medium}}
                title="SIZING GUIDE">
                <List.Item
                  style={{padding: 0, margin: 0}}
                  descriptionStyle={{
                    fontFamily: font.medium,
                  }}
                  descriptionNumberOfLines={10}
                  description={
                    'Colour - White & Black Fabric - Cotton Wear - Casual Wear Washable - Machine Wash'
                  }
                />
              </List.Accordion>

              {/* Reviews */}
              <List.Accordion
                onPress={() => {
                  navigation.navigate('ProductReviewsStackScreen', {
                    productId: product._id,
                    productSlug: product.slug,
                  });
                }}
                style={{paddingHorizontal: 0}}
                titleStyle={{fontFamily: font.medium}}
                title="REVIEWS"></List.Accordion>
            </List.Section>
          </View>

          {/* RELATED PRODUCTS */}
          <View style={[styles.container]}>
            <MyText style={myStyles.heading}>RELATED PRODUCTS</MyText>
            <View style={myStyles.mt3}>
              {realtedProductsLoading ? (
                [...Array(1).keys()].map(() => {
                  return <ProductCardSkelton />;
                })
              ) : relatedProducts.length ? (
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  contentInset={{right: 20, top: 0, left: 0, bottom: 0}}
                  data={relatedProducts}
                  numColumns={1}
                  keyExtractor={item => item._id}
                  renderItem={({item}) => {
                    return (
                      <ProductCard
                        style={{width: windowWidth / 2 - 20, marginRight: 10}}
                        item={item}
                        navigation={navigation}
                      />
                    );
                  }}
                />
              ) : (
                <View
                  style={{
                    height: windowHeight * 0.7,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MaterialCommunityIcons name="shopping" size={100} />
                  <MyText
                    style={{
                      fontSize: 40,
                      color: color.blood700,
                    }}>
                    Oops!
                  </MyText>
                  <MyText style={{fontSize: 20}}>No Product Found</MyText>
                </View>
              )}
            </View>
          </View>

          {/* Static Content */}
          <FooterContent />

          {/* Newsletter */}
          <Newsletter />
        </ScrollView>

        {/* Footer Button */}
        <HideWithKeyboard>
          <View style={styles.footerContainer}>
            <TouchableOpacity
              style={{
                ...styles.cartBtn,
                backgroundColor: cart.some(p => p.productId == product._id)
                  ? color.red600
                  : color.skyBlue600,
              }}
              onPress={() => {
                cart.some(p => p.productId == product._id)
                  ? navigation.navigate('CartTabScreen')
                  : cartHandler();
              }}>
              <SimpleLineIcons
                name={'handbag'}
                size={18}
                color={color.white700}
                style={styles.cartBtnIcon}
              />
              <MyText style={styles.cartBtnText}>
                {cart.some(p => p.productId == product._id)
                  ? 'GO TO CART'
                  : 'ADD TO CART'}
              </MyText>
            </TouchableOpacity>
            {/* Wishlist */}
            {wishlistLoading ? (
              <View style={styles.wishlistBtn}>
                <ActivityIndicator color={color.skyBlue600} size={20} />
              </View>
            ) : wishlistItems.some(item => {
                return item.product._id == product._id;
              }) ? (
              <TouchableOpacity
                onPress={() => {
                  const filteredWishlist = wishlistItems.filter(item => {
                    return item.product._id == product._id;
                  });
                  removeItemToWishlistHandler(filteredWishlist[0]._id);
                }}>
                <View style={styles.wishlistBtn}>
                  {removeWishlistLoading ? (
                    <ActivityIndicator color={color.skyBlue600} size={20} />
                  ) : (
                    <Ionicons
                      name={'ios-heart'}
                      size={30}
                      color={color.skyBlue600}
                    />
                  )}
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  addItemToWishlistHandler(product._id);
                }}>
                <View style={styles.wishlistBtn}>
                  {addWishlistLoading ? (
                    <ActivityIndicator color={color.skyBlue600} size={20} />
                  ) : (
                    <Ionicons
                      name={'ios-heart-outline'}
                      size={30}
                      color={color.skyBlue600}
                    />
                  )}
                </View>
              </TouchableOpacity>
            )}
            <TouchableOpacity>
              <Ionicons
                name={'ios-share-social'}
                size={30}
                color={color.skyBlue600}
              />
            </TouchableOpacity>
          </View>
        </HideWithKeyboard>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: color.white700,
  },
  heading: {
    color: color.black600,
    fontSize: 20,
    letterSpacing: 1,
    fontFamily: font.medium,
  },
  tag: {
    textAlign: 'center',
    width: 60,
    paddingVertical: 3,
    paddingHorizontal: 5,
    color: color.skyBlue600,
    borderWidth: 0.4,
    borderColor: color.skyBlue600,
  },
  description: {
    color: color.black500,
    letterSpacing: 1,
  },

  colorCard: {
    height: 40,
    width: 30,
    borderWidth: 2,
  },

  sizeCard: {
    height: 30,
    width: 30,
    borderColor: color.skyBlue600,
    borderWidth: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  priceContainer: {
    ...myStyles.row,
    ...myStyles.center,
    marginVertical: 25,
  },

  sellingPrice: {
    fontSize: 30,
    color: color.black600,
    fontFamily: font.bold,
  },
  mrp: {
    fontSize: 16,
    letterSpacing: 1,
    color: color.skyBlue600,
    fontFamily: font.regular,
    textDecorationLine: 'line-through',
  },

  cartBtn: {
    flex: 1.7,
    flexDirection: 'row',
    justifyContent: 'center',
    alignIte: 'center',
    backgroundColor: color.skyBlue600,
    paddingVertical: 18,
    gap: 15,
  },

  cartBtnText: {
    color: color.white700,
    fontSize: 15,
    fontFamily: font.medium,
  },
  // ==================

  modal: {
    flex: 1,
    padding: 30,
    margin: 30,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    margin: '5%',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },

  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },

  labelText: {
    fontSize: 22,
    color: color.red600,
  },

  labelBtbText: {
    fontSize: 17,
    marginRight: 5,
    color: color.red600,
  },

  container2: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: color.white,
    alignItems: 'center',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },

  eggContainer: {
    width: '75%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 80,
    alignItems: 'center',
  },
  btn: {
    backgroundColor: '#f7f4ea',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderTopEndRadius: 25,
    borderTopStartRadius: 20,
    borderBottomStartRadius: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
  detailsContainer: {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderRadius: 5,
    width: '100%',
  },
  textInput: {
    padding: 10,
    width: '100%',
    color: color.btnBgColor,
    fontFamily: 'Roboto-Medium',
    borderBottomColor: color.btnBgColor,
    borderBottomWidth: 1,
  },

  addToCart: {
    backgroundColor: '#fbe3a3',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderTopEndRadius: 30,
    borderTopStartRadius: 25,
    borderBottomStartRadius: 25,
    alignItems: 'center',
    flexDirection: 'row',
  },

  priceBtn: {
    backgroundColor: color.white,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderTopEndRadius: 30,
    borderTopStartRadius: 25,
    borderBottomStartRadius: 25,
    alignItems: 'center',
    flexDirection: 'row',
  },

  shadow: {
    shadowColor: color.shadowColor,
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
    elevation: 3,
  },
  backBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    height: 40,
    width: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 6,
  },
  wishlistBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    borderBottomEndRadius: 25,
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
    backgroundColor: 'white',
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
    paddingHorizontal: 10,
    backgroundColor: color.white700,
    gap: 10,
  },
});
