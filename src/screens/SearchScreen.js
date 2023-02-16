import React, {useEffect, useState, useContext} from 'react';
import {View, StyleSheet, Alert, FlatList} from 'react-native';
import Container from '../components/Container';
import {color, font} from '../helpers/Constants';
import {windowHeight} from '../../utils/Dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {SERVER_URL} from '../../config/Config';
import ProductCard from '../components/ProductCard';
import ProductCardSkelton from '../components/ProductCardSkelton';
import MyText from '../components/MyText';
import SearchBox from '../components/SearchBox';
import {CustomerContext} from '../../App';
import Header from '../components/Header';

const SearchScreen = ({navigation, route}) => {
  const {searchQuery: query} = route?.params || {searchQuery: ''};

  const {state, dispatch} = useContext(CustomerContext);
  const {cart} = state;

  const [products, setProducts] = useState([]);
  const [productLoding, setProductLoding] = useState(false);

  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const inputHandler = query => {
    setSearchQuery(query);
  };

  // Get Product
  //   useEffect(() => {
  //     if (categorySlug) {
  //       setProductLoding(true);
  //       async function getProduct() {
  //         try {
  //           const response = await fetch(
  //             `${SERVER_URL}/product/by-par-category-slug/${categorySlug}`,
  //           );
  //           const data = await response.json();
  //           if (data.status == 200) {
  //             setProducts(data.body);
  //           }
  //           setProductLoding(false);
  //         } catch (error) {
  //           setProductLoding(false);
  //           alert(error.message);
  //         }
  //       }

  //       getProduct();
  //     }
  //   }, [categorySlug]);

  // Search Product
  useEffect(() => {
    // setProductLoding(true);
    async function searchProduct() {
      setProductLoding(true);
      try {
        const response = await fetch(
          `${SERVER_URL}/product?searchQuery=${searchQuery}`,
        );
        const data = await response.json();
        if (data.status == 200) {
          setProducts(data.body);
        } else {
          Alert.alert('Product Alert', data.message);
        }
        setProductLoding(false);
        setRefreshing(false);
      } catch (error) {
        setProductLoding(false);
        Alert.alert('Product Alert', error.message);
        setRefreshing(false);
      }
    }

    if (searchQuery) {
      searchProduct();
    } else {
      setProductLoding(false);
    }
  }, [searchQuery, refreshing]);

  // Search Product By Params
  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  return (
    <Container>
      {/* Header */}
      <Header title={'SEARCH PRODUCTS'} />

      {/* Search Box */}
      <View style={{paddingHorizontal: 10, height: 56, marginTop: 10}}>
        <SearchBox defaultQuery={searchQuery} inputHandler={inputHandler} />
      </View>

      <View style={{flex: 1}}>
        {/* Main Container */}
        <View style={styles.container}>
          {/* Label */}

          {/* Products */}
          <View>
            {productLoding ? (
              [...Array(3).keys()].map(data => {
                return <ProductCardSkelton key={data} />;
              })
            ) : products.length ? (
              <FlatList
                columnWrapperStyle={{justifyContent: 'space-between'}}
                data={products}
                numColumns={2}
                keyExtractor={item => item._id}
                renderItem={({item}) => {
                  return <ProductCard item={item} navigation={navigation} />;
                }}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                  <View style={{paddingBottom: 5}}>
                    <MyText
                      style={{color: color.black600, fontFamily: font.medium}}>
                      Showing result for {searchQuery} (
                      {`${products.length} Products`})
                    </MyText>
                  </View>
                }
                onRefresh={() => setRefreshing(true)}
                refreshing={refreshing}
              />
            ) : (
              <View
                style={{
                  height: windowHeight * 0.7,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {!searchQuery ? (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <AntDesign
                      color={color.skyBlue600}
                      name="search1"
                      size={100}
                    />
                    <MyText
                      style={{
                        fontSize: 20,
                        fontFamily: font.medium,
                        color: color.skyBlue600,
                        marginTop: 10,
                        letterSpacing: 1,
                      }}>
                      Find Products !
                    </MyText>
                  </View>
                ) : (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <SimpleLineIcons
                      color={color.red700}
                      name="handbag"
                      size={100}
                    />
                    <MyText
                      style={{
                        fontSize: 20,
                        color: color.red700,
                        marginTop: 10,
                        fontFamily: font.medium,
                      }}>
                      Sorry! No Item Found.
                    </MyText>
                  </View>
                )}
              </View>
            )}
          </View>
        </View>
      </View>
    </Container>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 20,
  },

  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },

  labelText: {
    fontSize: 22,
    color: color.red700,
  },

  labelBtbText: {
    fontSize: 17,
    marginRight: 5,
    color: color.red700,
  },
});
