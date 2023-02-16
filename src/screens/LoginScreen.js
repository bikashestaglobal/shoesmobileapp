import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {SERVER_URL} from '../../config/Config';
import Container from '../components/Container';
import MyText from '../components/MyText';
import Header from '../components/Header';
import {color, font} from '../helpers/Constants';
import myStyle from '../helpers/Styles';
import MyTextInput from '../components/MyTextInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {CustomerContext} from '../../App';

const LoginScreen = ({navigation}) => {
  const {state, dispatch} = useContext(CustomerContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
  });
  const [loginLoading, setLoginLoading] = useState(false);

  // Email Change Handler
  const emailChangeHandler = text => {
    setFormData({...formData, email: text});
    if (formErrors.email) setFormErrors({...formErrors, email: ''});
  };

  // Password Change Handler
  const passwordChangeHandler = text => {
    setFormData({...formData, password: text});
    if (formErrors.password) setFormErrors({...formErrors, password: ''});
  };

  // login Handler
  const loginHandler = async () => {
    setLoginLoading(true);
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

        dispatch({type: 'CUSTOMER', payload: result.body.token});
        await AsyncStorage.setItem(
          'customerInfo',
          JSON.stringify({
            ...state,
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
      setLoginLoading(false);
    } catch (error) {
      Toast.show({
        type: 'danger',
        text1: error.message,
      });
      setLoginLoading(false);
    }
  };

  return (
    <Container>
      {/* Header */}
      <Header title={''} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}>
          <View style={{...myStyle.center, paddingVertical: 20}}>
            <MyText style={myStyle.header}>SIGN IN</MyText>
          </View>

          <View>
            <MyText style={myStyle.text}>
              If you have an account with us, Please Login
            </MyText>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            {/* Email */}
            <MyTextInput
              label={formErrors.email || 'EMAIL'}
              mode="outlined"
              error={formErrors.email ? true : false}
              placeholder="YOUR EMAIL"
              onChangeText={emailChangeHandler}
              onFocus={() => {
                setFormErrors({...formErrors, email: ''});
              }}
            />

            {/* Password */}
            <MyTextInput
              label={formErrors.password || 'PASSWORD'}
              mode="outlined"
              error={formErrors.password ? true : false}
              placeholder="YOUR PASSWORD"
              onChangeText={passwordChangeHandler}
              onFocus={() => {
                setFormErrors({...formErrors, password: ''});
              }}
              secureTextEntry={true}
            />

            <View>
              <TouchableOpacity>
                <MyText
                  style={{
                    color: color.red600,
                    fontSize: 16,
                    fontFamily: font.medium,
                  }}>
                  FORGOT YOUR PASSWORD?
                </MyText>
              </TouchableOpacity>
            </View>

            <View style={styles.btnContainer}>
              <TouchableOpacity
                disabled={loginLoading}
                style={styles.btn}
                onPress={loginHandler}>
                {loginLoading ? (
                  <ActivityIndicator size="small" color={color.white700} />
                ) : (
                  <MyText style={styles.btnText}>SIGN IN</MyText>
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View style={{...myStyle.center, paddingVertical: 20}}>
            <MyText style={myStyle.header}>REGISTER</MyText>
          </View>

          <View>
            <MyText style={myStyle.text}>
              If you haven't an account, Please create an Account
            </MyText>
          </View>

          <View style={styles.btnContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignupStackScreen')}
              style={[styles.btn, {width: 200}]}>
              <MyText style={styles.btnText}>CREATE AN ACCOUNT</MyText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </Container>
  );
};

export default LoginScreen;

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
  },
  btn: {
    backgroundColor: color.skyBlue600,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
  },
  btnText: {
    color: color.white700,
    fontFamily: font.medium,
    fontSize: 15,
  },
});
