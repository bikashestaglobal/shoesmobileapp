import {
  View,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Container from '../components/Container';
import MyText from '../components/MyText';
import {color} from '../helpers/Constants';
import {SERVER_URL} from '../../config/Config';
import {CustomerContext} from '../../App';
import Header from '../components/Header';
import Toast from 'react-native-toast-message';
import OrderCard from '../components/OrderCard';
import myStyles from '../helpers/Styles';
const MyOrdersScreen = props => {
  const {navigation} = props;
  const [deleted, setDeleted] = useState(false);
  const {state, dispatch} = useContext(CustomerContext);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  // flatlist
  const [refreshing, setRefreshing] = useState(false);

  // Get Orders items
  useEffect(() => {
    if (state?.jwtToken) {
      const getAllOrders = async () => {
        try {
          const response = await fetch(`${SERVER_URL}/order/myOrders`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${state.jwtToken}`,
            },
          });
          const result = await response.json();
          setLoading(false);
          setRefreshing(false);
          if (result.status == 200) {
            setOrders(result.body);
          } else {
            Toast.show({
              type: 'danger',
              text1: result.message,
            });
          }
        } catch (error) {
          setLoading(false);
          setRefreshing(false);
          Toast.show({
            type: 'danger',
            text1: error.message,
          });
        }
      };

      getAllOrders();
    }
  }, [deleted, refreshing]);

  return (
    <Container>
      {/* Header */}
      <Header title={'My Orders'} titleColor={color.black600} />

      {/* Body */}
      <View style={styles.container}>
        <View
          style={styles.cardContainer}
          contentContainerStyle={{flexGrow: 1}}>
          {loading ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <View>
                <ActivityIndicator color={color.red600} size={25} />
                <MyText style={{fontSize: 17, marginVertical: 10}}>
                  Please Wait..
                </MyText>
              </View>
            </View>
          ) : orders.length ? (
            <FlatList
              data={orders}
              renderItem={({item: order}) => {
                return <OrderCard order={order} />;
              }}
              keyExtractor={item => {
                return item._id;
              }}
              showsVerticalScrollIndicator={false}
              onRefresh={() => setRefreshing(true)}
              refreshing={refreshing}
            />
          ) : (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Ionicons
                name={'cart-outline'}
                size={150}
                color={color.skyBlue600}
              />
              <MyText style={myStyles.subHeading}>
                You haven't made any order
              </MyText>

              <View
                style={{
                  backgroundColor: color.skyBlue600,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 20,
                  overflow: 'hidden',
                  marginTop: 20,
                }}>
                <Pressable
                  onPress={() => {
                    navigation.navigate('HomeStackScreen');
                  }}
                  style={{paddingVertical: 10, paddingHorizontal: 20}}
                  android_ripple={{color: color.red600}}>
                  <MyText style={{color: color.white700}}>
                    Continue Shopping
                  </MyText>
                </Pressable>
              </View>
            </View>
          )}
        </View>
      </View>
    </Container>
  );
};

export default MyOrdersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: color.black300,
  },
  cardContainer: {
    flex: 1,
    marginBottom: 10,
  },
  orderCard: {
    backgroundColor: color.white700,
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    margin: 1,
  },
});
