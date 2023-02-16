import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native';
import MyText from './MyText';
import {color, font} from '../helpers/Constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {CustomerContext} from '../../App';
import {SERVER_URL} from '../../config/Config';
import {TouchableOpacity} from 'react-native-gesture-handler';

const CouponContainer = ({subTotal, onAddCoupon}) => {
  const {state, dispatch} = useContext(CustomerContext);
  const [enteredCoupon, setEnteredCoupon] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponVerifying, setCouponVerifying] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState({
    code: '',
    discount: '',
    discountType: '',
  });

  // Get all active coupon
  useEffect(() => {
    async function getActiveCoupons() {
      try {
        const response = await fetch(`${SERVER_URL}/coupon?status=Active`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const result = await response.json();
        if (result.status == 200) {
          setCoupons(result.body);
        } else {
          Alert.alert('Coupon Error', result.message);
        }
      } catch (error) {
        Alert.alert('Coupon Error', error.message);
      }
    }
    getActiveCoupons();
  }, []);

  // Validate Coupon Handler
  const validateCouponHandler = (coupon = enteredCoupon) => {
    setCouponVerifying(true);

    // Check coupon code is valid or not
    if (!coupons.some(c => c.code === coupon)) {
      setCouponError('Invalid Coupon Code');
      setCouponVerifying(false);
      return;
    }

    // Check coupon amount
    const filteredCoupon = coupons.filter(c => c.code === coupon);

    if (filteredCoupon.length && subTotal < filteredCoupon[0].minimumAmount) {
      setCouponError(
        `Amount is Must at least Rs ${filteredCoupon[0].minimumAmount}`,
      );
      setCouponVerifying(false);
      return;
    }

    fetch(`${SERVER_URL}/coupon/verify/${coupon}`, {
      method: 'GET', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${(state && state.jwtToken) || ''}`,
      },
      // body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        setCouponVerifying(false);
        setCouponError('');
        if (data.status == 200) {
          //   let walletStatus = isUsingWallet;
          //   if (walletStatus) {
          //     setIsUsingWallet(false);
          //   }

          setAppliedCoupon({
            code: data.body.code,
            discount: data.body.discount,
            discountType: data.body.discountType,
          });

          // call the callback function
          onAddCoupon({
            code: data.body.code,
            discount: data.body.discount,
            discountType: data.body.discountType,
          });

          // updae the state
          dispatch({
            type: 'ADD_COUPON',
            payload: {
              code: data.body.code,
              discount: data.body.discount,
              discountType: data.body.discountType,
            },
          });

          //   if (walletStatus) {
          //     setIsUsingWallet(true);
          //   }
          //   alert(data.message);
        } else {
          alert(data.message);
        }
      })
      .catch(error => {
        alert(error.message);
        setCouponVerifying(false);
      });

    // dispatch({
    //   type: "ADD_COUPON",
    //   payload: {
    //     code: filteredCoupon.code,
    //     discount: filteredCoupon.discount,
    //     discountType: filteredCoupon.discountType,
    //   },
    // });
  };

  // Removed applied coupon handler
  const removeAppliedCouponHandler = () => {
    setAppliedCoupon({
      code: '',
      discount: '',
      discountType: '',
    });
    setEnteredCoupon('');
  };

  return (
    <View
      style={{
        marginBottom: 20,
        marginTop: 20,
      }}>
      <MyText
        style={{
          fontSize: 17,
          fontFamily: font.medium,
          marginBottom: 20,
          color: color.black500,
        }}>
        Rewards and Coupons
      </MyText>

      <View style={{position: 'relative'}}>
        <TextInput
          placeholderTextColor={color.black400}
          onChangeText={text => setEnteredCoupon(text)}
          onFocus={() => {
            setCouponError('');
          }}
          placeholder="Apply Coupon"
          value={enteredCoupon}
          style={{
            width: '100%',
            color: color.black400,
            backgroundColor: color.white,
            borderRadius: 15,
            fontSize: 15,
            paddingHorizontal: 10,
            paddingLeft: 50,
            fontFamily: font.bold,
            paddingVertical: 12,
            borderWidth: 0.5,
            borderColor: color.black400,
          }}
        />

        <MaterialCommunityIcons
          name="brightness-percent"
          color={color.skyBlue600}
          size={28}
          style={{position: 'absolute', left: 10, top: 10}}
        />
        <Pressable
          onPress={() => validateCouponHandler(enteredCoupon)}
          style={{
            position: 'absolute',
            right: 10,
            padding: 15,
            top: 0,
          }}>
          {couponVerifying ? (
            <ActivityIndicator />
          ) : (
            <FontAwesome name="angle-right" color={color.black600} size={20} />
          )}
        </Pressable>
      </View>
      {/* Coupon Error Message */}
      <View style={{paddingTop: 5}}>
        {couponError ? (
          <MyText style={{fontSize: 12, color: color.red500}}>
            {couponError}
          </MyText>
        ) : null}
      </View>

      {/* Coupon Success Message */}
      {appliedCoupon.code ? (
        <View
          style={{
            paddingTop: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <MyText style={{fontSize: 14, color: color.green600}}>
            Coupon Applied Successfully
          </MyText>

          <TouchableOpacity
            onPress={removeAppliedCouponHandler}
            android_ripple={{color: color.red500}}
            style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <FontAwesome
              name="trash"
              color={color.red600}
              size={20}
              style={{marginRight: 5}}
            />
            <MyText style={{color: color.red600}}>Remove</MyText>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export {CouponContainer as default};
