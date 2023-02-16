import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import MyText from './MyText';
import {color, font} from '../helpers/Constants';
import {TextInput} from 'react-native-paper';
import myStyles from '../helpers/Styles';
const Newsletter = () => {
  const [formData, setFormData] = useState({
    email: '',
  });

  const [formError, setFormEror] = useState({
    email: '',
  });

  return (
    <View style={styles.container}>
      <MyText style={styles.heading}>SUBSCRIBE TO NEWSLETTER</MyText>
      <View style={styles.formControl}>
        <TextInput
          placeholder="ENTER EMAIL ADDRESS"
          style={{...myStyles.formControl, width: '90%'}}
          label={formError.email || 'ENTER EMAIL ADDRESS'}
          mode={'outlined'}
          contentStyle={myStyles.formControlContent}
          outlineStyle={{
            borderColor: formError.email ? color.red600 : color.black200,
            borderWidth: 0.8,
          }}
          value={formData.email}
          onChangeText={text => {
            setFormData({...formData, email: text});
          }}
        />
      </View>

      <TouchableOpacity style={styles.btn}>
        <MyText style={styles.btnText}>SUBSCRIBE</MyText>
      </TouchableOpacity>
      <View style={{alignItems: 'center'}}>
        <MyText style={styles.underline}></MyText>
      </View>
    </View>
  );
};

export default Newsletter;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    backgroundColor: color.black300,
  },
  heading: {
    textAlign: 'center',
    color: color.black500,
    fontSize: 18,
    fontFamily: font.bold,
    letterSpacing: 2,
    marginBottom: 20,
  },
  formControl: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  btn: {
    marginTop: 20,
    alignItems: 'center',
  },
  btnText: {
    color: color.black500,
    fontSize: 20,
    fontFamily: font.medium,
    letterSpacing: 4,
  },
  underline: {
    textAlign: 'center',
    marginTop: 10,
    width: 135,
    height: 3,
    backgroundColor: color.skyBlue500,
  },
});
