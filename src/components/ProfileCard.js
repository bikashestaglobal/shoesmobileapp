import {
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React from 'react';

import MyText from '../components/MyText';
import {color} from '../helpers/Constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ProfileCard = ({
  title,
  subTitle,
  onPressHandler = () => {},
  isLoading,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPressHandler}>
      <View style={styles.card}>
        <View>
          <MyText
            style={{
              fontSize: 15,
              color: color.black700,
              marginBottom: 4,
            }}>
            {title || 'My Orders'}
          </MyText>
          {isLoading ? (
            <View style={{alignItems: 'flex-start', flexDirection: 'row'}}>
              <ActivityIndicator />
              <MyText style={{color: color.black500, marginLeft: 8}}>
                Loading..
              </MyText>
            </View>
          ) : (
            <MyText>{subTitle || '05 orders'}</MyText>
          )}
        </View>
        <FontAwesome name="angle-right" color={color.black} size={20} />
      </View>
    </TouchableOpacity>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingVertical: 20,
    borderRadius: 15,
    marginBottom: 12,
    backgroundColor: color.white700,
    elevation: 1,
  },

  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
