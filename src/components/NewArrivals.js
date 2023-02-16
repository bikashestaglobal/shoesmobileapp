import React, {use, useState, useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import ProductCard from './ProductCard';
import {SERVER_URL} from '../../config/Config';
import MyText from './MyText';
import myStyles from '../helpers/Styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {color} from '../helpers/Constants';

const NewArrivals = ({navigation}) => {
  const [products, setProducts] = useState([]);
  const [tab, setTab] = useState('ALL');

  // get Products
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/product?limit=10`);
        const data = await response.json();
        if (data.status == 200) {
          setProducts(data.body);
        }
      } catch (error) {
        alert(error.message);
      }
    };

    getProducts();
  }, []);

  return (
    <View style={styles.container}>
      {/* Heading */}
      <View style={[myStyles.center, myStyles.mt2]}>
        <MyText style={myStyles.heading}>NEW ARRIVALS</MyText>
      </View>

      {/* Tabs */}
      <View style={[styles.tabConatainer, myStyles.mb2]}>
        <TouchableOpacity onPress={() => setTab('ALL')}>
          <MyText
            style={{
              ...myStyles.subHeading,
              color: tab == 'ALL' ? color.skyBlue600 : null,
            }}>
            ALL
          </MyText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTab('MEN')}>
          <MyText
            style={{
              ...myStyles.subHeading,
              color: tab == 'MEN' ? color.skyBlue600 : null,
            }}>
            MEN
          </MyText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTab('WOMEN')}>
          <MyText
            style={{
              ...myStyles.subHeading,
              color: tab == 'WOMEN' ? color.skyBlue600 : null,
            }}>
            WOMEN
          </MyText>
        </TouchableOpacity>
      </View>

      <FlatList
        columnWrapperStyle={{justifyContent: 'space-between'}}
        data={products}
        numColumns={2}
        keyExtractor={item => `arival-${item._id}`}
        renderItem={({item}) => {
          return <ProductCard item={item} navigation={navigation} />;
        }}
      />
    </View>
  );
};

export default NewArrivals;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    gap: 10,
  },
  tabConatainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
  },
  active: {
    color: color.skyBlue600,
  },
});
