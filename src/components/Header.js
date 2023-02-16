import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyText from '../components/MyText';
import {color, font} from '../helpers/Constants';
import {useNavigation} from '@react-navigation/native';

const Header = ({titleColor, goBackScreen, title}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* back button */}
      <TouchableOpacity
        style={styles.backBtnContainer}
        onPress={() => {
          if (goBackScreen) navigation.navigate(goBackScreen);
          else navigation.goBack();
        }}>
        <View style={styles.backBtn}>
          <MaterialIcons
            name="keyboard-backspace"
            color={color.white700}
            size={20}
          />
        </View>
      </TouchableOpacity>

      <MyText
        style={{
          fontSize: 18,
          fontFamily: font.bold,
          color: titleColor || color.black600,
        }}>
        {title}
      </MyText>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    zIndex: 9999,
    position: 'relative',
    paddingTop: 12,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.white700,
    elevation: 1,
  },

  backBtnContainer: {
    position: 'absolute',
    left: 20,
  },

  backBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 29,
    width: 35,
    backgroundColor: color.red600,
    borderRadius: 10,
  },
});
