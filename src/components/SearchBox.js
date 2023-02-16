import {View, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import {color, font} from '../helpers/Constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const SearchBox = ({inputHandler, defaultQuery = ''}) => {
  const [query, setQuery] = useState('');

  // update state
  useEffect(() => {
    setQuery(defaultQuery);
  }, [defaultQuery]);

  return (
    <View style={styles.searchBoxContainer}>
      <TextInput
        style={styles.searchBox}
        placeholder="Search Here.."
        placeholderTextColor={'#5a5a5a'}
        value={query}
        onChangeText={text => setQuery(text)}
      />
      <TouchableOpacity
        style={styles.searchBtn}
        onPress={() => inputHandler(query)}>
        <FontAwesome name="search" color={color.skyBlue500} size={30} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBox;

const styles = StyleSheet.create({
  searchBoxContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  searchBox: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: color.white700,
    width: '100%',
    color: color.black500,
    fontSize: 16,
    fontFamily: font.medium,
  },

  searchBtn: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
  },
});
