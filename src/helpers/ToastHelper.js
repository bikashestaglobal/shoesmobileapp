import {View, StyleSheet} from 'react-native';
import MyText from '../components/MyText';
import {color} from './Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

const toastConfig = {
  success: ({text1, props}) => (
    <View style={[styles.toastContainer, styles.success]}>
      <Ionicons
        name={'checkmark-circle-outline'}
        color={color.light}
        size={25}
      />
      <MyText style={styles.text1}>{text1}</MyText>
    </View>
  ),

  danger: ({text1, props}) => (
    <View style={[styles.toastContainer, styles.danger]}>
      <Ionicons name={'close-circle-outline'} color={color.light} size={25} />
      <MyText style={styles.text1}>{text1}</MyText>
    </View>
  ),
};

export {toastConfig};

const styles = StyleSheet.create({
  toastContainer: {
    height: 50,
    width: '90%',
    borderRadius: 10,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  success: {
    backgroundColor: color.skyBlue600,
  },
  danger: {
    backgroundColor: color.red600,
  },
  text1: {
    color: color.light,
  },
  text2: {
    fontSize: 12,
    color: color.light,
  },
});
