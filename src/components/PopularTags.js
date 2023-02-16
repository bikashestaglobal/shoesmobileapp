import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import MyText from './MyText';
import {color, font} from '../helpers/Constants';

const PopularTags = ({tags = []}) => {
  return (
    <View style={styles.root}>
      <MyText style={styles.heading}>POPULAR TAGS</MyText>
      <View style={styles.container}>
        {tags.map(({title, url}, index) => {
          return (
            <TouchableOpacity style={styles.btn} key={`tag-${index}`}>
              <MyText style={styles.btnText}>{title}</MyText>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default PopularTags;

const styles = StyleSheet.create({
  root: {
    paddingVertical: 25,
  },
  heading: {
    textAlign: 'center',
    color: color.black500,
    fontFamily: font.medium,
    fontSize: 20,
    marginBottom: 15,
    letterSpacing: 2,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  btn: {
    borderColor: color.black500,
    borderWidth: 0.2,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  btnText: {
    fontSize: 13,
    color: color.black400,
  },
});
