import React from 'react';
import {View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import MyText from './MyText';
import {color, font} from '../helpers/Constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Card} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import myStyles from '../helpers/Styles';

const OrderProductCard = ({product}) => {
  const {name, image, mrp, price, productId, quantity, weight} = product;
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <View style={{padding: 10}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              position: 'relative',
            }}>
            <View>
              <TouchableOpacity
              // onPress={() => {
              //   navigation.navigate('ProductDetailsStackScreen', {
              //     // screen: 'ProductDetailsStackScreen',
              //     params: product,
              //   });
              // }}
              >
                <Image
                  style={{
                    height: 70,
                    width: 70,
                    resizeMode: 'center',
                    borderRadius: 35,
                  }}
                  source={{uri: image}}
                />
              </TouchableOpacity>
            </View>
            <View style={{paddingLeft: 15, marginTop: 10}}>
              <TouchableOpacity
                onPress={() => {
                  //   navigation.navigate('ProductDetailsStackScreen', {
                  //     // screen: 'ProductDetailsStackScreen',
                  //     params: {...product, priceVariants: [{}]},
                  //   });
                }}>
                <MyText style={myStyles.commonHeading}>{name}</MyText>
              </TouchableOpacity>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                {/* Price */}
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <FontAwesome name="inr" size={15} color={color.black500} />
                  <MyText
                    style={{
                      color: color.black500,
                      marginLeft: 3,
                      fontFamily: font.bold,
                    }}>
                    {Number.parseInt(price)}
                  </MyText>
                </View>

                {/* MRP */}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 10,
                  }}>
                  <FontAwesome name="inr" size={15} color={color.skyBlue600} />
                  <MyText
                    style={{
                      color: color.skyBlue600,
                      marginLeft: 3,
                      textDecorationLine: 'line-through',
                      fontFamily: font.bold,
                    }}>
                    {Number.parseInt(mrp)}
                  </MyText>
                </View>
              </View>
              {/* Quantity */}
              <MyText
                style={{
                  color: color.black500,
                  marginLeft: 0,
                }}>
                {weight} x {quantity}
              </MyText>
            </View>
          </View>
          {/* Ratings & Reviews  */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('MakeReviewStackScreen', {
                screen: 'MakereviewStackScreen',
                productId: productId,
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
              />
            </View>
          </TouchableOpacity>
        </View>
      </Card>
    </View>
  );
};

export default OrderProductCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 1,
  },
  card: {
    flex: 1,
    borderRadius: 15,
    backgroundColor: color.white700,
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
  reviewtext: {
    fontSize: 16,
    marginLeft: 10,
    color: color.black400,
  },
  angle: {},
});
