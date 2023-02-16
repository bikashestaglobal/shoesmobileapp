import React from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';

export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

const CarouselCardItem = ({item, index}) => {
  return (
    <View style={styles.container} key={index}>
      <Image source={{uri: item.imgUrl}} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    // width: ITEM_WIDTH,
    width: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    // width: ITEM_WIDTH,
    width: 250,
    height: 250,
    borderRadius: 20,
  },
});

export default CarouselCardItem;
