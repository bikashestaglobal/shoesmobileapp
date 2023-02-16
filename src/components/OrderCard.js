import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import MyText from '../components/MyText';
import {color, font} from '../helpers/Constants';
import date from 'date-and-time';
import {useNavigation} from '@react-navigation/native';

const OrderCard = ({order}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.orderCard} key={order._id}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View>
          <MyText
            style={{
              fontSize: 17,
              color: color.black600,
              marginBottom: 5,
              fontFamily: font.medium,
            }}>
            Order Id
          </MyText>
          <MyText style={{color: color.black400, fontSize: 12}}>
            {order._id}
          </MyText>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('OrderDetailsStackScreen', {
              screen: 'OrderDetailsStackScreen',
              orderId: order._id,
            });
          }}
          style={{
            backgroundColor: color.skyBlue600,
            paddingHorizontal: 15,
            paddingVertical: 6,
            borderRadius: 5,
          }}>
          <MyText style={{fontSize: 13, color: color.white700}}>
            View Details
          </MyText>
        </TouchableOpacity>
      </View>

      <View style={{marginTop: 20}}>
        <MyText
          style={{
            fontSize: 17,
            color: color.black600,
            marginBottom: 5,
          }}>
          Preparing To Pake {order.products.length} Items
        </MyText>
        <MyText style={{color: color.black400, fontSize: 13}}>
          Package deliveres On{' '}
          {date.format(new Date(order?.shippingMethod?.date), 'ddd, MM MMM')}
        </MyText>

        <View style={{flexDirection: 'row', marginTop: 10}}>
          {order.products.map(product => {
            return (
              <View
                style={{
                  marginRight: 10,
                  elevation: 2,
                  backgroundColor: color.white700,
                }}
                key={product._id}>
                <Image
                  style={{height: 70, width: 70}}
                  source={{uri: product.image}}
                />
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  orderCard: {
    backgroundColor: color.white700,
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    margin: 1,
    elevation: 1,
  },
});
