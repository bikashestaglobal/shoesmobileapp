import Container from '../components/Container';
import Header from '../components/Header';
import {color} from '../helpers/Constants';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MyText from '../components/MyText';
import {useState, useContext, useEffect} from 'react';
import {CustomerContext} from '../../App';
import {SERVER_URL} from '../../config/Config';
import Toast from 'react-native-toast-message';

function ProfileSettingScreen({navigation}) {
  const {state, dispatch} = useContext(CustomerContext);

  const [updated, setUpdated] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [newPasswordSecureEntry, setNewPasswordSecureEntry] = useState(true);
  const [confirmPasswordSecureEntry, setConfirmPasswordSecureEntry] =
    useState(true);

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [formError, setFormError] = useState({
    name: '',
    mobile: '',
    email: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Get Profile details
  useEffect(() => {
    const getMyProfle = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${SERVER_URL}/customer/profile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${state.jwtToken}`,
          },
        });
        const result = await response.json();
        if (result.status == 200) {
          setFormData({
            name: result.body.name,
            mobile: result.body.mobile,
            email: result.body.email,
          });
        } else {
          Alert.alert('Profile Error', result.message);
        }
        setLoading(false);
      } catch (error) {
        Alert.alert('Profile Error', error.message);
        setLoading(false);
      }
    };
    getMyProfle();
  }, [updated]);

  // Submit handler
  const submitHandler = async () => {
    setIsLoading(true);

    console.log(formData);
    // check newpassword and confirm password
    if (formData.newPassword != formData.confirmPassword) {
      setFormError({
        ...formError,
        confirmPassword: "Confirm password doesn't match",
      });
      setIsLoading(false);
      return;
    }

    const updateData = {
      name: formData.name,
      mobile: formData.mobile,
      password: formData.newPassword,
    };

    try {
      const response = await fetch(`${SERVER_URL}/customer/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.jwtToken}`,
        },
        body: JSON.stringify({...updateData}),
      });
      const result = await response.json();

      if (result.status == 200) {
        Toast.show({
          type: 'success',
          text1: result.message,
        });
      } else {
        setFormError({...formError, ...result.error});
      }
      setIsLoading(false);
    } catch (error) {
      Alert.alert('Profile Update Error', error.message);
      setIsLoading(false);
    }
  };

  return (
    <Container bgColor="#f7f4ea">
      {/* Headee */}
      <Header
        navigation={navigation}
        title={'Update Profile'}
        titleColor={color.black}
      />

      {/* Content */}
      <View style={styles.container}>
        {loading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View>
              <ActivityIndicator color={color.red500} size={25} />
              <MyText
                style={{
                  fontSize: 17,
                  marginVertical: 10,
                  color: color.black500,
                }}>
                Please Wait..
              </MyText>
            </View>
          </View>
        ) : (
          <View style={{flex: 1}}>
            <ScrollView
              style={styles.formContainer}
              showsVerticalScrollIndicator={false}>
              {/* Personal Details */}
              <View>
                <MyText
                  style={{marginTop: 5, fontSize: 16, color: color.black}}>
                  Personal Details
                </MyText>

                <MyText
                  style={{
                    fontSize: 9,
                    marginBottom: 15,
                    color: color.black500,
                  }}>
                  Information provided here will be used to contact you for
                  delivery update.
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
                    placeholderTextColor={color.black400}
                    placeholder="Enter Mobile"
                    style={styles.formControl}
                    value={formData.mobile}
                    onChangeText={mobile => setFormData({...formData, mobile})}
                    onFocus={() => setFormError({...formError, mobile: ''})}
                  />
                  {/* <MyText style={styles.formErrorLabel}>{formError.mobile}</MyText> */}
                </View>

                {/* Email */}
                <View style={styles.formGroup}>
                  <MyText
                    style={{
                      ...styles.formLabel,
                      color: formError.email ? color.red500 : color.black600,
                    }}>
                    {formError.email || 'Email'}
                  </MyText>
                  <TextInput
                    keyboardType="email-address"
                    placeholderTextColor={color.black400}
                    placeholder="Enter Email"
                    value={formData.email}
                    editable={false}
                    style={styles.formControl}
                    onChangeText={email => setFormData({...formData, email})}
                    onFocus={() => setFormError({...formError, email: ''})}
                  />
                </View>
              </View>

              {/* Password */}
              <View>
                <MyText
                  style={{marginTop: 5, fontSize: 16, color: color.black}}>
                  Password
                </MyText>

                <MyText
                  style={{
                    fontSize: 9,
                    marginBottom: 15,
                    color: color.black500,
                  }}>
                  Want to update password? You can.
                </MyText>

                {/* Old Password */}
                {/* <View style={styles.formGroup}>
                    <MyText
                      style={{
                        ...styles.formLabel,
                        color: formError.oldPassword
                          ? color.red500
                          : color.black600,
                      }}>
                      {formError.oldPassword || 'Old Password *'}
                    </MyText>

                    <TextInput
                      secureTextEntry={true}
                      placeholder="Enter Password"
                      style={styles.formControl}
                      value={formData.oldPassword}
                      onChangeText={oldPassword =>
                        setFormData({...formData, oldPassword})
                      }
                      onFocus={() =>
                        setFormError({...formError, oldPassword: ''})
                      }
                    />
                  </View> */}

                {/* New Password */}
                <View style={styles.formGroup}>
                  <MyText
                    style={{
                      ...styles.formLabel,
                      color: formError.newPassword
                        ? color.red500
                        : color.black600,
                    }}>
                    {formError.newPassword || 'New Password'}
                  </MyText>
                  <TextInput
                    secureTextEntry={newPasswordSecureEntry}
                    placeholder="Enter New Password"
                    placeholderTextColor={color.black400}
                    style={styles.formControl}
                    value={formData.newPassword}
                    onChangeText={newPassword =>
                      setFormData({...formData, newPassword})
                    }
                    onFocus={() =>
                      setFormError({...formError, newPassword: ''})
                    }
                  />
                  <TouchableOpacity
                    onPress={() =>
                      setNewPasswordSecureEntry(!newPasswordSecureEntry)
                    }>
                    <FontAwesome
                      style={{position: 'absolute', right: 10, bottom: 6}}
                      name={newPasswordSecureEntry ? 'eye-slash' : 'eye'}
                      size={20}
                    />
                  </TouchableOpacity>
                  {/* <MyText style={styles.formErrorLabel}>{formError.mobile}</MyText> */}
                </View>

                {/* Confirm Password */}
                <View style={styles.formGroup}>
                  <MyText
                    style={{
                      ...styles.formLabel,
                      color: formError.confirmPassword
                        ? color.red500
                        : color.black600,
                    }}>
                    {formError.confirmPassword || 'Confirm Password'}
                  </MyText>
                  <TextInput
                    secureTextEntry={confirmPasswordSecureEntry}
                    placeholder="Enter Confirm Password"
                    placeholderTextColor={color.black400}
                    style={styles.formControl}
                    value={formData.confirmPassword}
                    onChangeText={confirmPassword =>
                      setFormData({...formData, confirmPassword})
                    }
                    onFocus={() =>
                      setFormError({...formError, confirmPassword: ''})
                    }
                  />
                  <TouchableOpacity
                    onPress={() =>
                      setConfirmPasswordSecureEntry(!confirmPasswordSecureEntry)
                    }>
                    <FontAwesome
                      style={{position: 'absolute', right: 10, bottom: 6}}
                      name={confirmPasswordSecureEntry ? 'eye-slash' : 'eye'}
                      size={20}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Submit Button */}
              <View style={[{alignItems: 'center', marginBottom: 40}]}>
                <TouchableOpacity
                  style={styles.sbmtBtn}
                  onPress={submitHandler}>
                  {isLoading ? (
                    <ActivityIndicator
                      size={19}
                      color={color.white700}
                      disable={isLoading}
                    />
                  ) : (
                    <MyText style={{color: color.white700}}>
                      UPDATE PROFILE
                    </MyText>
                  )}
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        )}
      </View>
    </Container>
  );
}

export default ProfileSettingScreen;

// function () {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}>
//       <Stack.Screen
//         name="ShippingAddressStackScreen"
//         component={ProfileSettingScreen}
//       />
//     </Stack.Navigator>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: color.white700,
  },

  cardContainer: {
    flex: 1,
    // backgroundColor: color.white700,
    // borderRadius: 20,
    // paddingTop: 15,
    // paddingHorizontal: 15,
    // elevation: 1,
  },

  formContainer: {
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
