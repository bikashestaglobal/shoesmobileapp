import {
  View,
  TouchableOpacity,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, {useContext, useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Container from '../components/Container';
import MyText from '../components/MyText';
import {useState} from 'react';
import {CustomerContext} from '../../App';
import CartProductContainer from '../components/CartProductContainer';
import CouponContainer from '../components/CouponContainer';
import {color, font} from '../helpers/Constants';
import Header from '../components/Header';
import myStyles from '../helpers/Styles';

const CartScreen = props => {
  const {navigation} = props;

  const {state, dispatch} = useContext(CustomerContext);
  const {cart, shipping = {}, adonCart} = state;

  const [subTotal, setSubTotal] = useState(0);
  const [adonTotal, setAdonTotal] = useState(0);
  const [discountWithCoupon, setDiscountWithCoupon] = useState(0);
  const [totalAmountAfterAdon, setTotalAmountAfterAdon] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [enteredCoupon, setEnteredCoupon] = useState('');
  const [couponError, setCouponError] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState({
    code: '',
    discount: '',
    discountType: '',
  });

  // Calculate amount
  useEffect(() => {
    // Calculate subtotal
    let sub_total = cart
      .map(product => product.price * product.quantity)
      .reduce((prev, curr) => prev + curr, 0);

    // calculate coupon discount amount
    let dis_with_coupon = 0;
    if (appliedCoupon.code) {
      if (appliedCoupon.discountType === 'PERCENTAGE') {
        dis_with_coupon = (sub_total * appliedCoupon.discount) / 100;
      } else {
        dis_with_coupon = appliedCoupon.discount;
      }
    }

    let adon_total = adonCart
      .map(product => product.price * product.quantity)
      .reduce((prev, curr) => prev + curr, 0);

    // Calculate Total
    let total = sub_total + parseInt(shipping.amount) - dis_with_coupon;

    // Total after adon
    let totalAmountAfterAdon =
      sub_total + parseInt(shipping.amount) - dis_with_coupon + adon_total;
    setTotalAmount(total);
    setDiscountWithCoupon(dis_with_coupon);
    setSubTotal(sub_total);
    setAdonTotal(adon_total);
    setTotalAmountAfterAdon(totalAmountAfterAdon);
  }, [cart, appliedCoupon, adonCart]);

  return (
    <Container>
      {/* Header */}
      <Header title={'My Cart'} navigation={navigation} />

      {/* Body */}
      <ScrollView
        style={styles.container}
        contentContainerStyle={{flexGrow: 1}}>
        {cart.length ? (
          <View style={{flex: 1}}>
            {/* Cart Products */}
            <CartProductContainer />

            {/* Adon Product */}
            {/* <AdonCartProductContainer /> */}

            {/* Rewards and Coupons */}
            <CouponContainer
              onAddCoupon={setAppliedCoupon}
              subTotal={subTotal}
            />

            {/* Billing Details */}
            <View style={{marginTop: 20}}>
              {/* Sub Total */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderBottomWidth: 1,
                  borderBottomColor: '#cccccc',
                  paddingBottom: 10,
                  marginBottom: 10,
                }}>
                <MyText style={{color: color.black600}}>Sub Total</MyText>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <FontAwesome name="inr" color={color.red600} />
                  <MyText
                    style={{color: color.red600, marginLeft: 2}}
                    fontName={'Roboto-Bold'}>
                    {subTotal}
                  </MyText>
                </View>
              </View>

              {/* Shipping */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderBottomWidth: 1,
                  borderBottomColor: '#cccccc',
                  paddingBottom: 10,
                  marginBottom: 10,
                }}>
                <MyText style={{color: color.black600}}>Shipping</MyText>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <FontAwesome name="inr" color={color.red600} />
                  <MyText
                    style={{color: color.red600, marginLeft: 2}}
                    fontName={'Roboto-Bold'}>
                    {shipping?.amount || 0}
                  </MyText>
                </View>
              </View>

              {/* Adon Total */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderBottomWidth: 1,
                  borderBottomColor: '#cccccc',
                  paddingBottom: 10,
                  marginBottom: 10,
                }}>
                <MyText style={{color: color.black600}}>Adon Total</MyText>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <FontAwesome name="inr" color={color.red600} />
                  <MyText
                    style={{color: color.red600, marginLeft: 2}}
                    fontName={'Roboto-Bold'}>
                    {adonTotal || 0}
                  </MyText>
                </View>
              </View>

              {/* Discount with coupon */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderBottomWidth: 1,
                  borderBottomColor: '#cccccc',
                  paddingBottom: 10,
                  marginBottom: 10,
                }}>
                <MyText style={{color: color.black600}}>
                  Discount with Coupon
                </MyText>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <FontAwesome name="inr" color={color.red600} />
                  <MyText
                    style={{color: color.red600, marginLeft: 2}}
                    fontName={'Roboto-Bold'}>
                    {discountWithCoupon || 0}
                  </MyText>
                </View>
              </View>

              {/* Grand Total */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderBottomWidth: 1,
                  borderBottomColor: '#cccccc',
                  paddingBottom: 10,
                  marginBottom: 10,
                }}>
                <MyText style={{color: color.black600}}>Bag Total</MyText>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <FontAwesome name="inr" color={color.red600} />
                  <MyText
                    style={{color: color.red600, marginLeft: 2}}
                    fontName={'Roboto-Bold'}>
                    {totalAmountAfterAdon || 0}
                  </MyText>
                </View>
              </View>
            </View>

            {/* Checkout Button */}

            <TouchableOpacity
              onPress={() =>
                state.jwtToken
                  ? navigation.navigate('CheckoutStackScreen')
                  : navigation.navigate('LoginStackScreen')
              }
              style={styles.checkoutBtn}>
              <MyText style={styles.checkoutBtnTxt}>PROCEED TO CHECKOUT</MyText>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <SimpleLineIcons
              style={myStyles.mb3}
              name={'handbag'}
              size={150}
              color={color.skyBlue600}
            />
            <MyText style={myStyles.subHeading}>Sorry Cart is Empty</MyText>

            <View
              style={{
                backgroundColor: color.skyBlue600,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
                overflow: 'hidden',
                marginTop: 20,
              }}>
              <Pressable
                onPress={() => {
                  navigation.goBack();
                }}
                style={{paddingVertical: 10, paddingHorizontal: 20}}
                android_ripple={{color: color.skyBlue600}}>
                <MyText
                  style={{color: color.white700, fontFamily: font.medium}}>
                  Continue Shopping
                </MyText>
              </Pressable>
            </View>
          </View>
        )}
      </ScrollView>
    </Container>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: color.white700,
  },
  checkoutBtn: {
    backgroundColor: color.skyBlue600,
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
  },
  checkoutBtnTxt: {
    color: color.white700,
  },
});
