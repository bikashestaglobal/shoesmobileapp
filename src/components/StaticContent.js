import React from 'react';
import {View, StyleSheet} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MyText from './MyText';
import {color, font} from '../helpers/Constants';

const StaticContent = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Icon  */}
        <View style={{marginRight: 10}}>
          <Octicons name={'inbox'} color={color.black600} size={45} />
        </View>

        {/* Content */}
        <View style={{justifyContent: 'center'}}>
          <MyText style={styles.heading}>FREE WORLWIDE DELIVERY </MyText>
        </View>
      </View>

      <View style={styles.card}>
        {/* Icon  */}
        <View style={{marginRight: 10}}>
          <Ionicons
            name={'arrow-back-circle-outline'}
            color={color.black600}
            size={45}
          />
        </View>

        {/* Content */}
        <View style={{justifyContent: 'center'}}>
          <MyText style={styles.heading}>MONEY BACK GUARANTEE 100%</MyText>
        </View>
      </View>

      <View style={styles.card}>
        {/* Icon  */}
        <View style={{marginRight: 10}}>
          <Feather name={'phone-call'} color={color.black600} size={45} />
        </View>

        {/* Content */}
        <View style={{justifyContent: 'center'}}>
          <MyText style={styles.heading}>24/7 CUSTOMER SUPPORT</MyText>
        </View>
      </View>
    </View>
  );
};

export default StaticContent;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: color.white700,
  },
  card: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  heading: {
    fontSize: 17,
    fontFamily: font.bold,
    letterSpacing: 1,
    color: color.black600,
  },

  text: {
    fontSize: 10,
    fontFamily: font.regular,
    letterSpacing: 1,
    color: color.black600,
  },
});
