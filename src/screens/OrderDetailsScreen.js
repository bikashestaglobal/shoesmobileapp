import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Container from '../components/Container';
import MyText from '../components/MyText';
import {color, font} from '../helpers/Constants';
import {SERVER_URL} from '../../config/Config';
import {CustomerContext} from '../../App';
import Header from '../components/Header';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import date from 'date-and-time';
import OrderStepProgressBar from '../components/OrderStepProgressBar';
import OrderProductCard from '../components/OrderProductCard';
import Toast from 'react-native-toast-message';

const OrderDetailsScreen = props => {
  const {navigation, route} = props;
  const [deleted, setDeleted] = useState(false);
  const {state, dispatch} = useContext(CustomerContext);
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState({
    products: [],
    adonProducts: [],
    shippingAddress: {},
  });

  // flatlist
  const [refreshing, setRefreshing] = useState(false);

  // Get order details
  useEffect(() => {
    if (state?.jwtToken) {
      const orderId = route?.params?.orderId;
      const getOrderDetails = async () => {
        try {
          const response = await fetch(`${SERVER_URL}/order/${orderId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${state.jwtToken}`,
            },
          });
          const result = await response.json();
          setLoading(false);
          setRefreshing(false);
          if (result.status == 200) {
            setOrderDetails(result.body);
          } else {
            Toast.show({text1: result.message, type: 'danger'});
          }
        } catch (error) {
          setLoading(false);
          setRefreshing(false);
          Toast.show({text1: error.message, type: 'danger'});
        }
      };

      getOrderDetails();
    }
  }, [deleted, refreshing]);

  return (
    <Container>
      {/* Header */}
      <Header title={'Order Details'} titleColor={color.black600} />

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
                <ActivityIndicator color={color.red500} size={25} />
                <MyText style={{fontSize: 17, marginVertical: 10}}>
                  Please Wait..
                </MyText>
              </View>
            </View>
          ) : (
            <View>
              {/* Order details card */}
              <View style={styles.card}>
                {/* Order id & Total Amount */}
                <View style={styles.cardBody}>
                  {/* Label & OrderId */}
                  <View>
                    <MyText style={styles.smHeading}>Order Id</MyText>
                    <MyText style={{color: color.black600, fontSize: 16}}>
                      {orderDetails._id}
                    </MyText>
                  </View>

                  {/* Label & Total amount */}
                  <View>
                    <MyText style={styles.smHeading}>TOTAL</MyText>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <FontAwesome
                        style={{marginTop: 2}}
                        name="inr"
                        size={14}
                        color={color.black700}
                      />
                      <MyText style={{color: color.black600, fontSize: 16}}>
                        {orderDetails.totalAmount}
                      </MyText>
                    </View>
                  </View>
                </View>

                {/* Order placed & Delivery date */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  {/* Placed Detials */}
                  <View style={{marginTop: 20}}>
                    <MyText style={styles.smHeading}>PLACED</MyText>
                    <MyText style={{color: color.black600, fontSize: 16}}>
                      {date.format(
                        new Date(orderDetails.createdAt),
                        'ddd, DD-MMM-YYYY',
                      )}
                    </MyText>
                  </View>

                  {/* Delivered Detials */}
                  {orderDetails?.orderStatus == 'DELIVERED' ? (
                    <View style={{marginTop: 20}}>
                      <MyText
                        style={{
                          fontSize: 13,
                          color: color.black500,
                          marginBottom: 5,
                        }}>
                        DELIVERED
                      </MyText>
                      <MyText style={{color: color.black600, fontSize: 16}}>
                        {date.format(
                          new Date(orderDetails.updatedAt),
                          'ddd, DD-MMM-YYYY',
                        )}
                      </MyText>
                    </View>
                  ) : null}
                </View>
              </View>

              {/* Shipping Address Details card */}
              <View style={styles.card}>
                <View>
                  {/* Headin */}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <MyText style={styles.heading}>Shipping Address</MyText>

                    <MyText style={styles.addressType}>
                      {orderDetails?.shippingAddress?.addressType}
                    </MyText>
                  </View>

                  {/* Address */}
                  <View style={{marginTop: 10}}>
                    <MyText style={{color: color.black400, marginBottom: 2}}>
                      {orderDetails?.shippingAddress?.name}
                    </MyText>
                    <MyText style={{color: color.black400, marginBottom: 2}}>
                      {orderDetails?.shippingAddress?.address},
                      {orderDetails?.shippingAddress?.landmark}
                    </MyText>
                    <MyText style={{color: color.black400, marginBottom: 2}}>
                      {orderDetails?.shippingAddress?.city},
                      {orderDetails?.shippingAddress?.pincode}
                    </MyText>

                    <MyText style={{color: color.black400, marginTop: 5}}>
                      {orderDetails?.shippingAddress?.mobile}
                    </MyText>
                  </View>
                </View>
              </View>

              {/* Step Progress */}

              {orderDetails.orderStatus == 'CANCELLED' ? (
                <View style={styles.card}>
                  <MyText style={styles.heading}>Order Status</MyText>

                  <View style={{alignItems: 'flex-start'}}>
                    {/* <Ionicons name={'sad'} color={color.red500} size={50} /> */}
                    <MyText
                      style={{
                        color: color.red500,
                        fontSize: 15,
                        marginTop: 5,
                      }}>
                      Order has been Cancelled by {orderDetails.cancelledBy}
                    </MyText>
                    <MyText
                      style={{
                        color: color.black400,
                      }}>
                      Reason: {orderDetails.cancelMessage}
                    </MyText>
                  </View>
                </View>
              ) : (
                <OrderStepProgressBar orderDetails={orderDetails} />
              )}

              {/* Product Details */}
              <View style={styles.card}>
                <View>
                  {/* Heading */}
                  <MyText style={styles.heading}>
                    Product Details ({orderDetails?.products.length}{' '}
                    {orderDetails?.products.length <= 1 ? 'Item' : 'Items'})
                  </MyText>

                  {/* Products */}
                  <View style={{marginTop: 10}}>
                    {orderDetails?.products.map(product => {
                      return (
                        <OrderProductCard product={product} key={product._id} />
                      );
                    })}
                  </View>

                  {/* Adon Product */}
                </View>
              </View>

              {/* Billing Details */}
              <View style={styles.card}>
                <View>
                  {/* Heading */}
                  {/* <MyText style={styles.heading}>
                      Adon Products ({orderDetails?.products.length}{' '}
                      {orderDetails?.products.length <= 1 ? 'Item' : 'Items'})
                    </MyText> */}

                  {/* Products */}
                  <View style={{marginTop: 10}}>
                    {/* Delivery Charge */}
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <MyText style={{color: color.black500}}>
                        Delivery Charges
                      </MyText>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <FontAwesome
                          style={{marginTop: 2}}
                          name={'inr'}
                          color={color.black500}
                        />
                        <MyText style={{color: color.black500}}>
                          {Number(orderDetails?.shippingMethod?.amount).toFixed(
                            2,
                          )}
                        </MyText>
                      </View>
                    </View>

                    {/* Subtotal */}
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 8,
                      }}>
                      <MyText style={{color: color.black500}}>Subtotal</MyText>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <FontAwesome
                          style={{marginTop: 2}}
                          name={'inr'}
                          color={color.black500}
                        />
                        <MyText style={{color: color.black500}}>
                          {Number(orderDetails?.subtotal).toFixed(2)}
                        </MyText>
                      </View>
                    </View>

                    {/* Discount With Coupon */}
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 8,
                      }}>
                      <MyText style={{color: color.black500}}>
                        Discount with Coupon
                      </MyText>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <FontAwesome
                          style={{marginTop: 2}}
                          name={'inr'}
                          color={color.black500}
                        />
                        <MyText style={{color: color.black500}}>
                          {Number(orderDetails?.discountWithCoupon).toFixed(2)}
                        </MyText>
                      </View>
                    </View>

                    {/* Used Wallet Amount */}
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 8,
                      }}>
                      <MyText style={{color: color.black500}}>
                        Used Wallet Amount
                      </MyText>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <FontAwesome
                          style={{marginTop: 2}}
                          name={'inr'}
                          color={color.black500}
                        />
                        <MyText style={{color: color.black500}}>
                          {Number(orderDetails?.usedWalletAmount).toFixed(2)}
                        </MyText>
                      </View>
                    </View>

                    {/* Grand Total */}
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        borderTopWidth: 1,
                        borderBottomWidth: 1,
                        paddingVertical: 5,
                      }}>
                      <MyText
                        style={{color: color.red600, fontFamily: font.bold}}>
                        Grand Total
                      </MyText>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <FontAwesome
                          style={{marginTop: 2}}
                          name={'inr'}
                          color={color.red600}
                        />
                        <MyText
                          style={{color: color.red600, fontFamily: font.bold}}>
                          {Number(orderDetails.totalAmount).toFixed(2)}
                        </MyText>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              {/* Cancel Button */}
              {orderDetails?.orderStatus == 'PENDING' ||
              orderDetails?.orderStatus == 'CONFIRMED' ? (
                <View style={{marginVertical: 10}}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('CanceOrderStackScreen', {
                        orderId: orderDetails._id,
                      })
                    }
                    style={{
                      backgroundColor: color.red600,
                      padding: 15,
                      alignItems: 'center',
                      borderRadius: 5,
                    }}>
                    <MyText style={{color: color.white700, fontSize: 16}}>
                      Cancel Order
                    </MyText>
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
          )}
        </ScrollView>
      </View>
    </Container>
  );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  cardContainer: {
    flex: 1,
  },
  card: {
    backgroundColor: color.white700,
    padding: 20,
    borderRadius: 10,
    marginTop: 10,
    elevation: 1,
  },
  cardBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {color: color.black600, fontSize: 17, fontFamily: font.bold},
  smHeading: {
    fontSize: 14,
    color: color.black600,
    marginBottom: 5,
    fontFamily: font.medium,
  },
  addressType: {
    color: color.black400,
    fontSize: 14,
    borderWidth: 1,
    borderColor: color.black400,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  stepContainer: {
    marginTop: 15,
  },
  stepCircle: {
    borderWidth: 2,
    height: 30,
    width: 30,
    borderRadius: 15,
    borderColor: color.black500,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCircleFill: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: color.red600,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCircleText: {
    color: color.black500,
  },
  stepCircleTextFill: {
    color: color.white700,
  },
  stepBar: {
    height: 20,
    width: 3,
    backgroundColor: color.black500,
    marginLeft: 13.5,
    marginTop: -1,
  },
  stepBarFill: {
    height: 20,
    width: 4,
    backgroundColor: color.red600,
    marginLeft: 13,
    marginTop: -1,
  },
  stepText: {
    color: color.black500,
    marginLeft: 10,
  },
  stepTextFill: {
    color: color.red600,
    marginLeft: 10,
  },
});
