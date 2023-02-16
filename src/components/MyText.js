import {Text, StyleSheet} from 'react-native';
import React from 'react';
import {color, font} from '../helpers/Constants';

const MyText = props => {
  const {children, style} = props;
  return (
    <Text
      {...props}
      style={{
        ...styles.text,
        ...style,
      }}>
      {children}
    </Text>
  );
};

export default MyText;

const styles = StyleSheet.create({
  text: {
    color: color.black600,
    fontFamily: font.regular,
  },
});
