import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {SERVER_URL} from '../../config/Config';
import MyText from './MyText';
import myStyles from '../helpers/Styles';
import {color} from '../helpers/Constants';
import BestsellerProductCard from './BestsellerProductCard';

const BestsellerContainer = ({navigation}) => {
  const [products, setProducts] = useState([]);

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
      <View style={[myStyles.center, myStyles.mt2, myStyles.mb3]}>
        <MyText style={myStyles.heading}>BESTSELLER</MyText>
      </View>

      <FlatList
        horizontal={true}
        data={products}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item._id}
        renderItem={({item}) => {
          return <BestsellerProductCard item={item} navigation={navigation} />;
        }}
      />
    </View>
  );
};

export default BestsellerContainer;

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
