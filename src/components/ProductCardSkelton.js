import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import {color} from '../helpers/Constants';
import {Card} from 'react-native-paper';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {windowHeight, windowWidth} from '../../utils/Dimensions';

const ProductCardSkelton = () => {
  return (
    <SkeletonPlaceholder borderRadius={4} backgroundColor={color.white}>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            margin: 4,
            flex: 1,
            height: 200,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            backgroundColor: '#E1E9EE',
          }}></View>
        <View
          style={{
            margin: 4,
            flex: 1,
            height: 200,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            backgroundColor: '#E1E9EE',
          }}></View>
      </View>
    </SkeletonPlaceholder>
  );
};

export default ProductCardSkelton;
