import {color} from '../helpers/Constants';
import Geolocation from 'react-native-geolocation-service';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  TextInput,
  PermissionsAndroid,
  Modal,
} from 'react-native';
import MyText from './MyText';
import {RadioButton, ActivityIndicator} from 'react-native-paper';
import {useState} from 'react';
import {SERVER_URL} from '../../config/Config';
import {useContext} from 'react';
import {CustomerContext} from '../../App';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const requestLocationPermission = async () => {
  try {
    const isAlreadyGiven = await checkLocationPermission();
    if (isAlreadyGiven) return true;

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    if (granted === 'granted') {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

const checkLocationPermission = async () => {
  try {
    const response = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    return response;
  } catch (error) {
    return false;
  }
};

function AddAddressModalBody({navigation, onAddHandler, onModalDismisHandler}) {
  const {state, dispatch} = useContext(CustomerContext);
  const [pincodes, setPinodes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    address: '',
    city: '',
    pincode: '',
    landmark: '',
    addressType: 'HOME',
    pincode: '',
  });

  const [formError, setFormError] = useState({
    name: '',
    mobile: '',
    address: '',
    city: '',
    pincode: '',
    landmark: '',
    addressType: '',
    pincode: '',
  });

  const getLocationHandler = async () => {
    // const url = 'https://ipinfo.io/157.42.205.164?token=00bca2791728a9';

    const isGranted = await requestLocationPermission();
    console.log('Granted', isGranted);
    if (isGranted) {
      Geolocation.getCurrentPosition(
        position => {
          console.log(position);
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    } else {
      Alert.alert('Need Permission');
    }
  };

  // get pincodes
  useState(() => {
    async function getPincodes() {
      try {
        const response = await fetch(`${SERVER_URL}/pincode?limit=0`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const result = await response.json();
        if (result.status == 200) setPinodes(result.body);
        else Alert.alert('Pincode Error', result.message);
      } catch (error) {
        Alert.alert('Pincode Error', error.message);
      }
    }

    getPincodes();
  }, []);

  // Validate pincode
  const pincodeValidateHandler = pincode => {
    return pincodes.some(pin => pin.pincode == pincode);
  };

  // Submit handler
  const submitHandler = async () => {
    setIsLoading(true);
    if (formData.pincode && !pincodeValidateHandler(formData.pincode)) {
      setFormError({
        ...formError,
        pincode: 'Delivery not available at this Pincode',
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${SERVER_URL}/customer/address`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.jwtToken}`,
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (result.status == 200) {
        onAddHandler(old => {
          return !old;
        });
        onModalDismisHandler(false);
      } else {
        setFormError({...formError, ...result.error});
        // Alert.alert(result.message);
      }
      setIsLoading(false);
    } catch (error) {
      Alert.alert('Address Error', error.message);
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.formContainer}
        showsVerticalScrollIndicator={false}>
        {/* Address Details */}
        <View>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <TouchableOpacity
              onPress={getLocationHandler}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <MyText style={{color: color.skyBlue600}}>Auto Detect</MyText>
              <MaterialIcons
                style={{marginLeft: 5}}
                color={color.skyBlue600}
                name={'my-location'}
              />
            </TouchableOpacity>
          </View>

          {/* Address */}
          <View style={styles.formGroup}>
            <MyText
              style={{
                ...styles.formLabel,
                color: formError.address ? color.red600 : color.black600,
              }}>
              {formError.address || 'Address *'}
            </MyText>
            <TextInput
              placeholder="Enter Address"
              placeholderTextColor={color.black500}
              style={styles.formControl}
              onChangeText={address => setFormData({...formData, address})}
              onFocus={() => setFormError({...formError, address: ''})}
            />
            {/* <MyText style={styles.formErrorLabel}>{formError.address}</MyText> */}
          </View>

          {/* Landmark */}
          <View style={styles.formGroup}>
            <MyText
              style={{
                ...styles.formLabel,
                color: formError.landmark ? color.red600 : color.black600,
              }}>
              {formError.landmark || 'Landmark *'}
            </MyText>
            <TextInput
              placeholder="Enter Landmark"
              placeholderTextColor={color.black500}
              style={styles.formControl}
              onChangeText={landmark => setFormData({...formData, landmark})}
              onFocus={() => setFormError({...formError, landmark: ''})}
            />
            {/* <MyText style={styles.formErrorLabel}>
                {formError.landmark}
              </MyText> */}
          </View>

          {/* City */}
          <View style={styles.formGroup}>
            <MyText
              style={{
                ...styles.formLabel,
                color: formError.city ? color.red600 : color.black600,
              }}>
              {formError.city || 'City *'}
            </MyText>

            <TextInput
              placeholder="Enter City"
              placeholderTextColor={color.black500}
              style={styles.formControl}
              onChangeText={city => setFormData({...formData, city})}
              onFocus={() => setFormError({...formError, city: ''})}
            />
            {/* <MyText style={styles.formErrorLabel}>{formError.city}</MyText> */}
          </View>

          {/* Address Type */}
          <View style={styles.formGroup}>
            <MyText
              style={{
                ...styles.formLabel,
                color: formError.addressType ? color.red600 : color.black600,
              }}>
              {formError.addressType || 'Address Type *'}
            </MyText>

            <View style={{flexDirection: 'row', width: '100%'}}>
              {/* Home */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  flex: 0.3,
                }}>
                <RadioButton
                  value="HOME"
                  status={
                    formData.addressType === 'HOME' ? 'checked' : 'unchecked'
                  }
                  onPress={() =>
                    setFormData({...formData, addressType: 'HOME'})
                  }
                />
                <MyText style={{color: color.black500}}>HOME</MyText>
              </View>

              {/* Office */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  flex: 0.3,
                }}>
                <RadioButton
                  value="OFFICE"
                  status={
                    formData.addressType === 'OFFICE' ? 'checked' : 'unchecked'
                  }
                  onPress={() =>
                    setFormData({...formData, addressType: 'OFFICE'})
                  }
                />
                <MyText style={{color: color.black500}}>OFFICE</MyText>
              </View>

              {/* Other */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  flex: 0.3,
                }}>
                <RadioButton
                  value="OTHER"
                  status={
                    formData.addressType === 'OTHER' ? 'checked' : 'unchecked'
                  }
                  onPress={() =>
                    setFormData({...formData, addressType: 'OTHER'})
                  }
                />
                <MyText style={{color: color.black500}}>OTHER</MyText>
              </View>
            </View>
            {/* 
              <MyText style={styles.formErrorLabel}>
                {formError.addressType}
              </MyText> */}
          </View>

          {/* Pincode */}
          <View style={styles.formGroup}>
            <MyText
              style={{
                ...styles.formLabel,
                color: formError.pincode ? color.red600 : color.black600,
              }}>
              {formError.pincode || 'Pincode *'}
            </MyText>
            <TextInput
              placeholder="Pincode"
              placeholderTextColor={color.black500}
              keyboardType="number-pad"
              style={styles.formControl}
              maxLength={6}
              minLength={6}
              onChangeText={pincode => setFormData({...formData, pincode})}
              onFocus={() => setFormError({...formError, pincode: ''})}
            />
            {/* <MyText style={styles.formErrorLabel}>{formError.pincode}</MyText> */}
          </View>
        </View>

        {/* Contact Details */}
        <View>
          <MyText style={{marginTop: 5, fontSize: 16, color: color.black600}}>
            Contact
          </MyText>
          <MyText
            style={{fontSize: 9, marginBottom: 15, color: color.black500}}>
            Information provided here will be used to contact you for delivery
            update.
          </MyText>
          {/* Name */}
          <View style={styles.formGroup}>
            <MyText
              style={{
                ...styles.formLabel,
                color: formError.name ? color.red600 : color.black600,
              }}>
              {formError.name || 'Name *'}
            </MyText>

            <TextInput
              placeholder="Enter Name"
              placeholderTextColor={color.black500}
              style={styles.formControl}
              onChangeText={name => setFormData({...formData, name})}
              onFocus={() => setFormError({...formError, name: ''})}
            />
          </View>

          {/* Mobile */}
          <View style={styles.formGroup}>
            <MyText
              style={{
                ...styles.formLabel,
                color: formError.mobile ? color.red600 : color.black600,
              }}>
              {formError.mobile || 'Mobile *'}
            </MyText>
            <TextInput
              keyboardType="number-pad"
              placeholder="Enter Mobile"
              style={styles.formControl}
              onChangeText={mobile => setFormData({...formData, mobile})}
              onFocus={() => setFormError({...formError, mobile: ''})}
            />
            {/* <MyText style={styles.formErrorLabel}>{formError.mobile}</MyText> */}
          </View>

          {/* Alternate Mobile */}
          {/* <View style={styles.formGroup}>
            <MyText
              style={{
                ...styles.formLabel,
                color: formError.alternateMobile ? color.red600 : color.black600,
              }}>
              {formError.alternateMobile || 'Alternate Mobile'}
            </MyText>
            <TextInput
              keyboardType="number-pad"
              placeholder="Enter Alternate Mobile"
              style={styles.formControl}
              onChangeText={alternateMobile =>
                setFormData({...formData, alternateMobile})
              }
              onFocus={() => setFormError({...formError, alternateMobile: ''})}
            />
          </View> */}
        </View>

        {/* Submit Button */}
        <View style={[{alignItems: 'center', marginBottom: 40}]}>
          <TouchableOpacity style={styles.sbmtBtn} onPress={submitHandler}>
            {isLoading ? (
              <ActivityIndicator
                size={19}
                color={color.white700}
                disable={isLoading}
              />
            ) : (
              <MyText style={{color: color.white700}}>ADD ADDRESS</MyText>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

export default AddAddressModalBody;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  formContainer: {
    backgroundColor: color.white700,
    paddingHorizontal: 10,
  },

  formGroup: {
    backgroundColor: '#f5f2e8',
    marginBottom: 15,
    borderRadius: 10,
    padding: 2,
  },
  formLabel: {
    fontSize: 11,
    paddingTop: 5,
    paddingLeft: 10,
    color: color.black600,
  },
  formControl: {
    fontFamily: 'Roboto-Regular',
    fontSize: 13,
    paddingLeft: 10,
    padding: 2,
  },
  sbmtBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    width: '100%',
    backgroundColor: color.skyBlue600,
    borderRadius: 10,
    elevation: 1,
    flexDirection: 'row',
    marginTop: 10,
    padding: 15,
  },
  formErrorLabel: {
    fontSize: 11,
    paddingLeft: 10,
    color: color.blood600,
  },
});
