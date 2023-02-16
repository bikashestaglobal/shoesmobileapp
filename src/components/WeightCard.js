import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Card} from 'react-native-paper';
import {color} from '../helpers/Constants';
import MyText from './MyText';
const WeightCard = ({navigation, item, onPressHandler, style, textColor}) => {
  return (
    <Card style={[styles.weightCard, {...style}]}>
      <Card.Content style={[{padding: 0, margin: 0}]}>
        <TouchableOpacity
          onPress={onPressHandler}
          //   onPress={() =>
          //     navigation.navigate('ListingDrawer', {
          //       screen: 'ListingStackScreen',
          //       params: {
          //         categorySlug: item.slug,
          //         categoryName: item.name,
          //       },
          //     })
          //   }
        >
          <Image
            style={[styles.weightCardImg]}
            source={{uri: item.image}}
            // require('../assets/images/homescreen/cake-1.png')
          />
          <MyText style={{...styles.weightCardText, color: textColor}}>
            {item.weight}
          </MyText>
        </TouchableOpacity>
      </Card.Content>
    </Card>
  );
};

export default WeightCard;

const styles = StyleSheet.create({
  weightCard: {
    width: 60,
    height: 100,
    backgroundColor: color.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginRight: 20,
  },
  weightCardImg: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  weightCardText: {
    fontSize: 13,
    marginTop: 5,
    textAlign: 'center',
  },
});
