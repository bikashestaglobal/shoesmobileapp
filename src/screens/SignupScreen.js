import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Container from '../components/Container';
import MyText from '../components/MyText';
import Header from '../components/Header';
import {color, font} from '../helpers/Constants';
import myStyle from '../helpers/Styles';
import MyTextInput from '../components/MyTextInput';
import Toast from 'react-native-toast-message';
import {SERVER_URL} from '../../config/Config';

const SignupScreen = ({navigation}) => {
  const [signupLoading, setSignupLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    cPassword: '',
  });

  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    cPassword: '',
  });

  // Text Change Handler
  const textChangeHandler = (text, name) => {
    setFormData({...formData, [name]: text});
    if (formErrors[name]) setFormErrors({...formErrors, [name]: ''});
  };

  // Signup Handler
  const signupHandler = async () => {
    setSignupLoading(true);
    try {
      const respone = await fetch(`${SERVER_URL}/customer/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await respone.json();

      if (result.status == 200) {
        Toast.show({
          type: 'success',
          text1: result.message,
        });

        // dispatch({type: 'CUSTOMER', payload: result.body.token});
        await AsyncStorage.setItem(
          'customerInfo',
          JSON.stringify({
            // ...state,
            jwtToken: result.body.token,
          }),
        );
        if (navigation.canGoBack()) {
          navigation.goBack();
        }
      } else if (result.status == 401) {
        // Need verification
        Toast.show({
          type: 'danger',
          text1: result.message,
        });
      } else {
        Toast.show({
          type: 'danger',
          text1: result.message,
        });
        setFormErrors({...result.error, message: result.message});
      }
      setSignupLoading(false);
    } catch (error) {
      Toast.show({
        type: 'danger',
        text1: error.message,
      });
      setSignupLoading(false);
    }
  };

  return (
    <Container>
      {/* Header */}
      <Header title={''} />

      <ScrollView style={styles.container}>
        <View style={{...myStyle.center, paddingVertical: 20}}>
          <MyText style={myStyle.header}>CREATE AN ACCOUNT</MyText>
        </View>

        <View>
          <MyText style={myStyle.text}>
            If you haven't an account, Please Create an Account
          </MyText>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          <MyTextInput
            label={formErrors.firstName || 'FIRST NAME'}
            mode="outlined"
            error={formErrors.firstName ? true : false}
            placeholder="ENTER FIRST NAME"
            onChangeText={textChangeHandler}
            name={'firstName'}
            onFocus={() => {
              setFormErrors({...formErrors, firstName: ''});
            }}
          />

          <MyTextInput
            label={formErrors.lastName || 'LAST NAME'}
            mode="outlined"
            placeholder="ENTER LAST NAME"
            error={formErrors.lastName ? true : false}
            onChangeText={textChangeHandler}
            name={'lastName'}
            onFocus={() => {
              setFormErrors({...formErrors, lastName: ''});
            }}
          />

          <MyTextInput
            label={formErrors.email || 'EMAIL'}
            mode="outlined"
            placeholder="ENTER EMAIL"
            error={formErrors.email ? true : false}
            onChangeText={textChangeHandler}
            name={'email'}
            onFocus={() => {
              setFormErrors({...formErrors, email: ''});
            }}
          />

          <MyTextInput
            secureTextEntry={true}
            mode="outlined"
            label={formErrors.password || 'PASSWORD'}
            placeholder="ENTER PASSWORD"
            error={formErrors.password ? true : false}
            onChangeText={textChangeHandler}
            name={'password'}
            onFocus={() => {
              setFormErrors({...formErrors, password: ''});
            }}
          />

          <MyTextInput
            secureTextEntry={true}
            label={formErrors.cPassword || 'CONFIRM PASSWORD'}
            mode="outlined"
            placeholder="ENTER CONFIRM PASSWORD"
            error={formErrors.cPassword ? true : false}
            onChangeText={textChangeHandler}
            name={'cPassword'}
            onFocus={() => {
              setFormErrors({...formErrors, cPassword: ''});
            }}
          />

          <View>
            <TouchableOpacity
              onPress={() => navigation.nagigate('LoginStackScreen')}>
              <MyText
                style={{
                  color: color.red600,
                  fontSize: 16,
                  fontFamily: font.medium,
                }}>
                Already have an Account? Login Now.
              </MyText>
            </TouchableOpacity>
          </View>

          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={[styles.btn]}
              onPress={signupHandler}
              disabled={signupLoading}>
              {signupLoading ? (
                <ActivityIndicator size="small" color={color.white700} />
              ) : (
                <MyText style={styles.btnText}>CREATE AN ACCOUNT</MyText>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: color.white700,
  },
  formContainer: {
    marginTop: 20,
  },
  btnContainer: {
    marginVertical: 40,
    alignItems: 'center',
  },
  btn: {
    backgroundColor: color.skyBlue600,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    width: '100%',
  },
  btnText: {
    color: color.white700,
    fontFamily: font.medium,
  },
});
