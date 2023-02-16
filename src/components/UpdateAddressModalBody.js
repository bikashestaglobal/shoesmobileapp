import {color, font} from '../helpers/Constants';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import MyText from './MyText';
import {RadioButton, ActivityIndicator} from 'react-native-paper';
import {useState} from 'react';
import {SERVER_URL} from '../../config/Config';
import {useContext} from 'react';
import {CustomerContext} from '../../App';
import Toast from 'react-native-toast-message';
function UpdateAddressModalBody({data, onUpdateHandler, onModalDismisHandler}) {
  const {state} = useContext(CustomerContext);
  const [pincodes, setPinodes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState(
    data || {
      name: '',
      mobile: '',
      address: '',
      city: '',
      pincode: '',
      landmark: '',
      addressType: 'HOME',
    },
  );

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
        else Toast.show({text1: result.message, type: 'danger'});
      } catch (error) {
        Toast.show({text1: error.message, type: 'danger'});
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

    const updateData = {
      name: formData.name,
      mobile: formData.mobile,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      pincode: formData.pincode,
      alternateMobile: formData.alternateMobile,
      landmark: formData.landmark,
      addressType: formData.addressType,
    };

    try {
      const response = await fetch(
        `${SERVER_URL}/customer/address/${formData._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${state.jwtToken}`,
          },
          body: JSON.stringify({...updateData}),
        },
      );
      const result = await response.json();

      if (result.status == 200) {
        onUpdateHandler(old => {
          return !old;
        });
        onModalDismisHandler(false);
        Toast.show({text1: result.message, type: 'success'});
      } else {
        setFormError({...formError, ...result.error});
      }
      setIsLoading(false);
    } catch (error) {
      Toast.show({text1: error.message, type: 'success'});
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.formContainer}
        showsVerticalScrollIndicator={false}>
        {/* Address Details */}
        <View style={{marginTop: 15}}>
          {/* Address */}
          <View style={styles.formGroup}>
            <MyText
              style={{
                ...styles.formLabel,
                color: formError.address ? color.red500 : color.black600,
              }}>
              {formError.address || 'Address *'}
            </MyText>
            <TextInput
              placeholder="Enter Address"
              placeholderTextColor={color.black400}
              style={styles.formControl}
              value={formData.address}
              onChangeText={address => setFormData({...formData, address})}
              onFocus={() => setFormError({...formError, address: ''})}
            />
          </View>

          {/* Landmark */}
          <View style={styles.formGroup}>
            <MyText
              style={{
                ...styles.formLabel,
                color: formError.landmark ? color.red500 : color.black600,
              }}>
              {formError.landmark || 'Landmark *'}
            </MyText>
            <TextInput
              placeholder="Enter Landmark"
              placeholderTextColor={color.black400}
              style={styles.formControl}
              value={formData.landmark}
              onChangeText={landmark => setFormData({...formData, landmark})}
              onFocus={() => setFormError({...formError, landmark: ''})}
            />
          </View>

          {/* City */}
          <View style={styles.formGroup}>
            <MyText
              style={{
                ...styles.formLabel,
                color: formError.city ? color.red500 : color.black600,
              }}>
              {formError.city || 'City *'}
            </MyText>

            <TextInput
              placeholder="Enter City"
              placeholderTextColor={color.black400}
              style={styles.formControl}
              value={formData.city}
              onChangeText={city => setFormData({...formData, city})}
              onFocus={() => setFormError({...formError, city: ''})}
            />
          </View>

          {/* Address Type */}
          <View style={styles.formGroup}>
            <MyText
              style={{
                ...styles.formLabel,
                color: formError.addressType ? color.red500 : color.black600,
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
                color: formError.pincode ? color.red500 : color.black600,
              }}>
              {formError.pincode || 'Pincode *'}
            </MyText>
            <TextInput
              placeholder="Pincode"
              placeholderTextColor={color.black400}
              keyboardType="number-pad"
              style={styles.formControl}
              value={`${formData.pincode}`}
              maxLength={6}
              minLength={6}
              onChangeText={pincode => setFormData({...formData, pincode})}
              onFocus={() => setFormError({...formError, pincode: ''})}
            />
          </View>
        </View>

        {/* Contact Details */}
        <View>
          <MyText style={{marginTop: 5, fontSize: 16, color: color.black}}>
            Contact
          </MyText>
          <MyText
            style={{fontSize: 9, marginBottom: 15, color: color.black400}}>
            Information provided here will be used to contact you for delivery
            update.
          </MyText>
          {/* Name */}
          <View style={styles.formGroup}>
            <MyText
              style={{
                ...styles.formLabel,
                color: formError.name ? color.red500 : color.black600,
              }}>
              {formError.name || 'Name *'}
            </MyText>

            <TextInput
              placeholder="Enter Name"
              placeholderTextColor={color.black400}
              style={styles.formControl}
              value={formData.name}
              onChangeText={name => setFormData({...formData, name})}
              onFocus={() => setFormError({...formError, name: ''})}
            />
          </View>

          {/* Mobile */}
          <View style={styles.formGroup}>
            <MyText
              style={{
                ...styles.formLabel,
                color: formError.mobile ? color.red500 : color.black600,
              }}>
              {formError.mobile || 'Mobile *'}
            </MyText>
            <TextInput
              keyboardType="number-pad"
              placeholder="Enter Mobile"
              placeholderTextColor={color.black400}
              style={styles.formControl}
              value={formData.mobile}
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
                color: formError.alternateMobile ? color.red500 : color.black600,
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
              <MyText style={{color: color.white700}}>UPDATE ADDRESS</MyText>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

export default UpdateAddressModalBody;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  formContainer: {
    backgroundColor: color.white700,
    paddingHorizontal: 10,
  },

  formGroup: {
    backgroundColor: color.alabaster,
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
    fontFamily: font.regular,
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
    color: color.red600,
  },
});
