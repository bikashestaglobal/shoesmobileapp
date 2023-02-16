import {
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Text,
  Alert,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import React, {useContext, useEffect, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyText from '../components/MyText';
import {color, font} from '../helpers/Constants';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import AddAddressModalBody from '../components/AddAddressModalBody';
import LinearGradient from 'react-native-linear-gradient';
import {CustomerContext} from '../../App';
import {SERVER_URL} from '../../config/Config';
import Header from '../components/Header';
import ShippingAddressCard from '../components/ShippingAddressCard';
import dateAbdTime from 'date-and-time';
import Container from '../components/Container';

const CheckoutScreen = props => {
  const {navigation} = props;

  const {state, dispatch} = useContext(CustomerContext);
  const {cart, shipping = {}, adonCart, coupon} = state;

  const [addAddressModal, setAddAddressModal] = useState(false);
  const [selectAddressModal, setSelectAddressModal] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  const [adonTotal, setAdonTotal] = useState(0);
  const [discountWithCoupon, setDiscountWithCoupon] = useState(0);
  const [totalAmountAfterAdon, setTotalAmountAfterAdon] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [enteredCoupon, setEnteredCoupon] = useState('');
  const [couponError, setCouponError] = useState('');

  const [shippingAddressLoading, setShippingAddressLoading] = useState(true);
  const [shippingAddress, setShippingAddress] = useState([]);
  const [newAddressAdded, setNewAddressAdded] = useState(false);
  const [selectedShipAddress, setSedeletedShipAddress] = useState(null);

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const [appliedCoupon, setAppliedCoupon] = useState(
    coupon || {
      code: '',
      discount: '',
      discountType: '',
    },
  );
  const [personalizeOrder, setPersonalizeOrder] = useState({
    occasion: '',
    senderName: '',
    senderMobile: '',
    keepPrivate: false,
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

  // Get Shipping Address
  useEffect(() => {
    const getShippingAddress = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/customer/profile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${state.jwtToken}`,
          },
        });
        const result = await response.json();
        setShippingAddressLoading(false);
        if (result.status == 200) {
          setShippingAddress(result.body?.shippingAddresses || []);
        } else {
          Alert.alert('Wishlist Error', result.message);
        }
      } catch (error) {
        setShippingAddressLoading(false);
        Alert.alert('Wishlist Error', error.message);
      }
    };

    getShippingAddress();
  }, [newAddressAdded]);

  // Order Handler
  const makeOrderHandler = async () => {
    const orderData = {
      paymentMethod: selectedPaymentMethod,
      subtotal: subTotal,
      adonTotalAmount: adonTotal,
      totalAmount: totalAmount,
      discountWithCoupon: discountWithCoupon,
      coupon: appliedCoupon,
      usedWalletAmount: 0,
      //   personalize: personalizeOrder,
      shippingMethod: {...shipping, pincode: undefined},
      products: cart,
      adonProducts: adonCart,
    };

    // check shipping address
    if (!selectedShipAddress) {
      Alert.alert('Shiping Address', 'Select Shipping Address', [
        {
          text: 'OKAY',
          onPress: () => {
            setSelectAddressModal(true);
          },
        },
      ]);
      return;
    } else {
      orderData.shippingAddress = {...selectedShipAddress, _id: undefined};
    }
    // check payment mode
    if (!selectedPaymentMethod) {
      Alert.alert('Payment Method', 'Payment method is required');
      return;
    }

    // Finally make order
    try {
      const response = await fetch(`${SERVER_URL}/order`, {
        method: 'POST',
        body: JSON.stringify(orderData),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state?.jwtToken}`,
        },
      });
      const result = await response.json();

      if (result.status == 200) {
        dispatch({type: 'CLEAR_CART'});
        dispatch({type: 'CLEAR_ADON_CART'});
        dispatch({type: 'CLEAR_SHIPPING'});
        navigation.pop();
        navigation.navigate('ThankYouStackScreen', {
          orderId: result.body._id,
        });
      } else {
        Alert.alert('Order Error', result.message);
        console.log(result.error);
      }
    } catch (error) {
      Alert.alert('Order Error', error.message);
    }
  };

  // Opening the select addres modal after adding the new address
  useEffect(() => {
    if (newAddressAdded == true) {
      setSelectAddressModal(true);
      setNewAddressAdded(false);
    }
  }, [newAddressAdded]);

  return (
    <Container style={{flex: 1}}>
      {/* Header */}
      <Header
        title={'Checkout'}
        titleColor={color.white}
        navigation={navigation}
      />

      {/* Body */}
      <ScrollView
        style={styles.container}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={{flex: 1}}>
          {/* Shipping Address */}
          <View style={styles.shippingAddressContainer}>
            <MyText style={styles.headerText}>Shipping Address</MyText>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={styles.card}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <MaterialCommunityIcons
                    name={'map-marker-radius-outline'}
                    size={18}
                    color={color.red600}
                  />
                  <Text
                    style={{
                      fontSize: 17,
                      color: color.black,
                      marginLeft: 8,
                    }}>
                    {!selectedShipAddress
                      ? 'Select/Add Ship Address'
                      : `Deliver To ${selectedShipAddress.name.split(' ')[0]}`}
                  </Text>
                </View>
                <Text
                  style={{marginLeft: 5, fontSize: 13, color: color.black500}}>
                  {!selectedShipAddress
                    ? 'Shipping Address is requied'
                    : `${selectedShipAddress.address}, ${selectedShipAddress.landmark}`}
                </Text>
                <Text
                  style={{marginLeft: 5, fontSize: 13, color: color.black500}}>
                  {!selectedShipAddress
                    ? ''
                    : `${selectedShipAddress.city}, ${selectedShipAddress.pincode}`}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.selectBtn}
                onPress={() => setSelectAddressModal(true)}>
                <MyText style={{color: color.red600}}>Select</MyText>
              </TouchableOpacity>
            </View>
            {/* Add Shipping button */}
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                style={styles.addAddreddBtn}
                onPress={() => setAddAddressModal(true)}>
                <FontAwesome name={'plus'} size={20} color={color.white700} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Payment Mode */}
          <View style={styles.paymentModeContainer}>
            <MyText style={styles.headerText}>Payment Mode</MyText>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={styles.card}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <RadioButton
                      color={color.blood600}
                      value="COD"
                      onPress={() => setSelectedPaymentMethod('COD')}
                      status={
                        selectedPaymentMethod == 'COD' ? 'checked' : 'unchecked'
                      }
                    />
                    <Text
                      style={{
                        fontSize: 17,
                        color: color.black,
                        marginLeft: 2,
                      }}>
                      COD
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <RadioButton
                      color={color.blood600}
                      value="ONLINE"
                      onPress={() => setSelectedPaymentMethod('ONLINE')}
                      status={
                        selectedPaymentMethod == 'ONLINE'
                          ? 'checked'
                          : 'unchecked'
                      }
                    />
                    <Text
                      style={{
                        fontSize: 17,
                        color: color.black,
                        marginLeft: 2,
                      }}>
                      ONLINE
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Billing Details */}
          <View style={{marginTop: 20, paddingHorizontal: 10}}>
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

            {/* Discount with coupon*/}
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
                Discount With Coupon
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

          {/* Make Order Button */}
          <TouchableOpacity
            style={styles.checkoutBtn}
            onPress={makeOrderHandler}>
            <MyText style={{color: color.white700}}>ORDER NOW</MyText>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Add Address Modal */}
      <Modal
        visible={addAddressModal}
        transparent={true}
        onDismiss={() => setAddAddressModal(fasle)}
        animationType="slide"
        onRequestClose={() => setAddAddressModal(false)}>
        <TouchableWithoutFeedback
          onPress={() => {
            setAddAddressModal(false);
          }}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.addAddressModalContainer}>
          {/* Modal Header */}
          <View style={styles.modalHeader}>
            <MyText style={{fontSize: 17, color: color.black}}>
              Add New Address
            </MyText>
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: color.white700,
                borderRadius: 20,
              }}
              onPress={() => {
                setAddAddressModal(false);
              }}>
              <AntDesign name={'close'} size={16} color={color.red600} />
            </TouchableOpacity>
          </View>

          {/* Modal Body */}
          <View style={styles.modalBody}>
            <AddAddressModalBody
              onAddHandler={setNewAddressAdded}
              onModalDismisHandler={setAddAddressModal}
            />
          </View>
        </View>
      </Modal>

      {/* Select Address Modal */}
      <Modal
        visible={selectAddressModal}
        transparent={true}
        onDismiss={() => setSelectAddressModal(fasle)}
        animationType="slide"
        onRequestClose={() => setSelectAddressModal(false)}>
        <TouchableWithoutFeedback
          onPress={() => {
            setSelectAddressModal(false);
          }}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        <View style={styles.selectAddressModalContainer}>
          {/* Modal Header */}
          <View style={styles.modalHeader}>
            <MyText style={{fontSize: 17, color: color.black}}>
              Choose Delivery Address
            </MyText>
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: color.white700,
                borderRadius: 20,
              }}
              onPress={() => {
                setSelectAddressModal(false);
              }}>
              <AntDesign name={'close'} size={16} color={color.red600} />
            </TouchableOpacity>
          </View>
          {/* Modal Body */}
          <ScrollView style={styles.modalBody}>
            {shippingAddress.length ? (
              shippingAddress.map(address => {
                return (
                  <ShippingAddressCard
                    onSelect={setSedeletedShipAddress}
                    onDismiss={setSelectAddressModal}
                    address={address}
                    key={address._id}
                  />
                );
              })
            ) : (
              <View
                style={{
                  alignItems: 'center',
                  marginTop: 100,
                }}>
                <MyText style={{fontSize: 19, color: color.black}}>
                  There is no Address
                </MyText>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: color.red600,
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderRadius: 20,
                    borderBottomEndRadius: 0,
                    marginTop: 10,
                  }}
                  onPress={() => {
                    // hide this modal (select address modal)
                    setSelectAddressModal(false);
                    // show add address modal
                    setAddAddressModal(true);
                  }}>
                  <FontAwesome name={'plus'} color={color.white700} size={17} />
                  <MyText style={{color: color.white700, marginLeft: 6}}>
                    Add New
                  </MyText>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </View>
      </Modal>
    </Container>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 15, backgroundColor: color.white700},
  shippingAddressContainer: {
    backgroundColor: color.white700,
    paddingHorizontal: 15,
    paddingTop: 20,
    borderRadius: 10,
    elevation: 2,
    paddingBottom: 20,
    paddingHorizontal: 20,
    position: 'relative',
    margin: 3,
    marginTop: 20,
  },
  headerText: {
    fontSize: 17,
    fontFamily: font.medium,
    color: color.skyBlue600,
    letterSpacing: 1,
  },
  selectBtn: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderColor: color.blood600,
    borderWidth: 1,
    borderRadius: 50,
    alignSelf: 'flex-start',
  },
  addAddreddBtn: {
    position: 'absolute',
    bottom: -42,
    backgroundColor: color.skyBlue600,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 30,
    elevation: 1,
  },

  paymentModeContainer: {
    backgroundColor: color.white700,
    paddingHorizontal: 15,
    paddingTop: 20,
    borderRadius: 10,
    elevation: 2,
    paddingBottom: 20,
    paddingHorizontal: 20,
    marginTop: 20,
    margin: 3,
  },

  checkoutBtnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 50,
  },

  checkoutBtn: {
    width: '100%',
    padding: 15,
    alignItems: 'center',
    backgroundColor: color.skyBlue600,
    borderRadius: 10,
  },
  // Modal Style
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  addAddressModalContainer: {
    backgroundColor: color.white700,
    position: 'absolute',
    elevation: 5,
    flex: 1,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    height: '100%',
    width: '100%',
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f2e8',
    paddingVertical: 15,
    paddingLeft: 27,
    paddingRight: 20,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
  },
  modalBody: {
    flex: 1,
    padding: 15,
    position: 'relative',
  },

  selectAddressModalContainer: {
    backgroundColor: color.white700,
    position: 'absolute',
    bottom: 0,
    elevation: 5,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    height: '55%',
    width: '100%',
  },

  card: {
    paddingVertical: 10,
  },
});
