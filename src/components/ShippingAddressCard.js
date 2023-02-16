import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {color} from '../helpers/Constants';
const ShippingAddressCard = ({address, onSelect, onDismiss}) => {
  return (
    <View key={address._id} style={styles.shippingAddressCard}>
      <TouchableOpacity
        onPress={() => {
          onSelect({...address});
          onDismiss(false);
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <MaterialCommunityIcons
            name={'map-marker-radius-outline'}
            size={18}
            color={color.blood700}
          />
          <Text
            style={{
              fontSize: 18,
              color: color.black,
              marginLeft: 8,
            }}>
            Deliver To {address.name.split(' ')[0]}
          </Text>
        </View>
        <Text style={{marginLeft: 5, fontSize: 13}}>
          {`${address.address}, ${address.landmark}, ${address.city} ${address.pincode}`}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ShippingAddressCard;
const styles = StyleSheet.create({
  shippingAddressCard: {
    padding: 10,
    borderColor: color.blood700,
    borderBottomWidth: 1,
  },
});
