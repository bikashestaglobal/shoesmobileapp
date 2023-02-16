import {useContext, useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import MyText from './MyText';
import {color, font} from '../helpers/Constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import myStyles from '../helpers/Styles';
import {Card} from 'react-native-paper';
import {CustomerContext} from '../../App';

const CartProductCard = ({product, onSelectItems}) => {
  const {state, dispatch} = useContext(CustomerContext);
  const {name, image, flavour, quantity, mrp, price, productId} = product;

  // increase quantity
  const increaseQuantityHandler = () => {
    dispatch({
      type: 'INCREASE_QUANTITY',
      payload: {
        productId: productId,
      },
    });
  };

  // decrease quantity
  const decreaseQuantityHandler = () => {
    if (quantity < 2) {
      dispatch({
        type: 'REMOVE_FROM_CART',
        payload: {
          productId: productId,
        },
      });
    } else {
      dispatch({
        type: 'DECREASE_QUANTITY',
        payload: {
          productId: productId,
        },
      });
    }
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      }}>
      <BouncyCheckbox
        size={25}
        style={{height: 40, width: 40}}
        fillColor={color.red500}
        unfillColor="#FFFFFF"
        iconStyle={{borderColor: 'yellow', borderRadius: 5}}
        innerIconStyle={{
          borderWidth: 2,
          borderRadius: 5,
          borderColor: color.red500,
        }}
        onPress={id => {
          onSelectItems(productId);
        }}
      />
      <Card
        style={{flex: 1, borderRadius: 15, backgroundColor: color.white700}}>
        <View style={{padding: 10}}>
          <View
            style={{
              flexDirection: 'row',
              position: 'relative',
            }}>
            <View>
              <Image
                style={{height: 70, width: 70, resizeMode: 'center'}}
                source={{uri: image}}
              />
            </View>
            <View style={myStyles.pl2}>
              <MyText
                style={{
                  fontSize: 13,
                  color: color.black600,
                  fontFamily: font.bold,
                }}>
                {name}
              </MyText>
              <MyText
                style={{
                  fontSize: 11,
                  marginVertical: 4,
                  color: color.black600,
                }}>
                Flavour: {flavour}
              </MyText>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  ...myStyles.mt1,
                }}>
                <FontAwesome name="inr" size={15} color={color.skyBlue600} />
                <MyText
                  style={{
                    color: color.skyBlue600,
                    marginLeft: 2,
                    fontFamily: font.bold,
                    marginBottom: 3,
                  }}>
                  {Number.parseInt(price) * Number.parseInt(quantity)}
                </MyText>
              </View>
            </View>

            {/* Increase Decrease button */}
            <View
              style={{
                flexDirection: 'row',
                width: 80,
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 5,
                position: 'absolute',
                bottom: 0,
                right: 0,
              }}>
              {/* Minus Button */}
              <TouchableOpacity
                onPress={decreaseQuantityHandler}
                style={{
                  borderRadius: 20,
                  paddingHorizontal: 6,
                  paddingVertical: 5,
                  backgroundColor: color.skyBlue600,
                  // alignItems: 'center',
                }}>
                <FontAwesome name={'minus'} size={10} color={color.white700} />
              </TouchableOpacity>

              {/* Value */}
              <MyText
                style={{
                  color: color.skyBlue600,
                  fontSize: 15,
                  fontFamily: font.bold,
                }}>
                {quantity}
              </MyText>

              {/* Plus Button */}
              <TouchableOpacity
                onPress={increaseQuantityHandler}
                style={{
                  borderRadius: 20,
                  paddingHorizontal: 6,
                  paddingVertical: 5,
                  backgroundColor: color.skyBlue600,
                  // alignItems: 'center',
                }}>
                <FontAwesome name={'plus'} size={10} color={color.white700} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Card>
    </View>
  );
};

export default CartProductCard;

const styles = StyleSheet.create({});
