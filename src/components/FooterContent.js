import React from 'react';
import {View, StyleSheet} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MyText from './MyText';
import {color, font} from '../helpers/Constants';

const FooterContent = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Icon  */}
        <View style={{marginRight: 10}}>
          <Octicons name={'inbox'} color={color.white700} size={50} />
        </View>

        {/* Content */}
        <View style={{justifyContent: 'center'}}>
          <MyText style={styles.heading}>FREE WORLWIDE DELIVERY </MyText>
          <MyText style={styles.text}>LOREM IPSUM DOLOR SIT AMET</MyText>
        </View>
      </View>

      <View style={styles.card}>
        {/* Icon  */}
        <View style={{marginRight: 10}}>
          <Ionicons
            name={'arrow-back-circle-outline'}
            color={color.white700}
            size={50}
          />
        </View>

        {/* Content */}
        <View style={{justifyContent: 'center'}}>
          <MyText style={styles.heading}>MONEY BACK GUARANTEE 100%</MyText>
          <MyText style={styles.text}>LOREM IPSUM DOLOR SIT AMET</MyText>
        </View>
      </View>

      <View style={styles.card}>
        {/* Icon  */}
        <View style={{marginRight: 10}}>
          <Feather name={'phone-call'} color={color.white700} size={50} />
        </View>

        {/* Content */}
        <View style={{justifyContent: 'center'}}>
          <MyText style={styles.heading}>24/7 CUSTOMER SUPPORT</MyText>
          <MyText style={styles.text}>LOREM IPSUM DOLOR SIT AMET</MyText>
        </View>
      </View>
    </View>
  );
};

export default FooterContent;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: color.skyBlue600,
  },
  card: {
    paddingVertical: 25,
    paddingHorizontal: 20,
    flexDirection: 'row',
    borderBottomColor: color.white700,
    borderBottomWidth: 1,
  },
  heading: {
    fontSize: 17,
    fontFamily: font.bold,
    letterSpacing: 1,
    color: color.white700,
  },

  text: {
    fontSize: 10,
    fontFamily: font.regular,
    letterSpacing: 1,
    color: color.white700,
  },
});
