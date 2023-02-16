import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import MyText from './MyText';
import {color, font} from '../helpers/Constants';

const OfferBanner = ({
  title = 'SALE',
  category = 'PUJA COLLECTIONS',
  offText = '50% OFF',
  btnTitle = 'SHOP NOW',
}) => {
  return (
    <View style={styles.container}>
      <MyText style={styles.heading}>{title}</MyText>
      <MyText style={styles.category}>{category}</MyText>
      <MyText style={styles.offText}>{offText}</MyText>
      <TouchableOpacity style={styles.btn}>
        <MyText style={styles.btnText}>{btnTitle}</MyText>
      </TouchableOpacity>
      <MyText style={styles.underline}></MyText>
    </View>
  );
};

export default OfferBanner;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    backgroundColor: color.skyBlue600,
  },
  heading: {
    color: color.white700,
    fontSize: 30,
    fontFamily: font.bold,
    letterSpacing: 2,
  },
  category: {
    color: color.white700,
    fontFamily: font.medium,
    fontSize: 14,
    letterSpacing: 2,
  },
  offText: {
    color: color.white700,
    fontSize: 23,
    fontFamily: font.bold,
    letterSpacing: 2,
  },
  btn: {
    marginTop: 20,
  },
  btnText: {
    color: color.white700,
    fontSize: 20,
    fontFamily: font.medium,
    letterSpacing: 2,
  },
  underline: {
    width: 115,
    height: 3,
    backgroundColor: color.white700,
  },
});
