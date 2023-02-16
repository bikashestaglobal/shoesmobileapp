import React, {Children} from 'react';
import {StyleSheet, View, SafeAreaView, StatusBar} from 'react-native';
import {color} from '../helpers/Constants';
const Container = ({children}) => {
  return (
    <SafeAreaView style={styles.root}>
      <StatusBar backgroundColor={color.white700} barStyle={'dark-content'} />
      {children}
    </SafeAreaView>
  );
};

export default Container;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
