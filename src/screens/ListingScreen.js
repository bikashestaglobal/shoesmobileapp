import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import Container from '../components/Container';
import {color, font} from '../helpers/Constants';
import {windowHeight, windowWidth} from '../../utils/Dimensions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import {SERVER_URL} from '../../config/Config';
import ProductCard from '../components/ProductCard';
import ProductCardSkelton from '../components/ProductCardSkelton';
import MyText from '../components/MyText';
import SearchBox from '../components/SearchBox';
import {Button, Card, Checkbox} from 'react-native-paper';
// import {Modal} from 'react-native-paper';

import {CustomerContext} from '../../App';
import Header from '../components/Header';
const ListingScreen = ({navigation, route}) => {
  const {
    categorySlug: parCatSlug = null,
    catSlug = null,
    categoryName = 'Search Items',
    searchQuery: query = '',
  } = route.params.params;

  const {state, dispatch} = useContext(CustomerContext);
  const {cart} = state;

  const [products, setProducts] = useState([]);
  const [productLoding, setProductLoding] = useState(true);

  const [flavours, setFlavours] = useState([]);
  const [selectedFlavours, setSelectedFlavours] = useState([]);

  const [shapes, setShapes] = useState([]);
  const [selectedShapes, setSelectedShapes] = useState([]);

  const [cakeTypes, setCakeTypes] = useState([]);
  const [selectedCakeTypes, setSelectedCakeTypes] = useState([]);

  const [searchQuery, setSearchQuery] = useState(query);
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const inputHandler = query => {
    setSearchQuery(query);
  };

  // Get Product
  useEffect(() => {
    if (parCatSlug) {
      setProductLoding(true);
      async function getProduct() {
        try {
          const response = await fetch(
            `${SERVER_URL}/product/by-par-category-slug/${parCatSlug}`,
          );
          const data = await response.json();
          if (data.status == 200) {
            setProducts(data.body);
          } else {
            Alert.alert('Product Alert', data.message);
          }
          setProductLoding(false);
        } catch (error) {
          setProductLoding(false);
          alert(error.message);
        }
      }

      getProduct();
    }
  }, [parCatSlug]);

  // Get Flavours
  useEffect(() => {
    async function getFlavours() {
      try {
        const response = await fetch(
          `${SERVER_URL}/flavour/withProductsByCategory?parCatSlug=${parCatSlug}&catSlug=${catSlug}`,
        );
        const data = await response.json();
        if (data.status == 200) {
          setFlavours(data.body);
        } else {
          Alert.alert('Flavour Alert', data.message);
        }
      } catch (error) {
        Alert.alert('Flavour Error', error.message);
      }
    }

    getFlavours();
  }, [parCatSlug, catSlug]);

  const flavourChangeHandler = flavourId => {
    let filtered = [...selectedFlavours];
    let exist = filtered.some(value => value == flavourId);
    if (exist) {
      filtered = filtered.filter(value => value != flavourId);
    } else {
      filtered.push(flavourId);
    }
    setSelectedFlavours([...filtered]);
  };

  // Get Cake Type
  useEffect(() => {
    async function getCakeTypes() {
      try {
        const response = await fetch(`${SERVER_URL}/type`);
        const data = await response.json();
        if (data.status == 200) {
          setCakeTypes(data.body);
        } else {
          Alert.alert('Cake Type Alert', data.message);
        }
      } catch (error) {
        Alert.alert('Cake Type Error', error.message);
      }
    }

    getCakeTypes();
  }, []);

  const cakeTypeChangeHandler = typeId => {
    let filtered = [...selectedCakeTypes];
    let exist = filtered.some(value => value == typeId);
    if (exist) {
      filtered = filtered.filter(value => value != typeId);
    } else {
      filtered.push(typeId);
    }
    setSelectedCakeTypes([...filtered]);
  };

  // Get Shapes
  useEffect(() => {
    async function getShapes() {
      try {
        const response = await fetch(
          `${SERVER_URL}/shape/withProductsByCategory?parCatSlug=${parCatSlug}&catSlug=${catSlug}`,
        );
        const data = await response.json();
        if (data.status == 200) {
          setShapes(data.body);
        } else {
          Alert.alert('Shape Alert', data.message);
        }
      } catch (error) {
        Alert.alert('Shape Error', data.message);
      }
    }

    getShapes();
  }, [parCatSlug, catSlug]);

  const shapeChangeHandler = shapeId => {
    let filtered = [...selectedShapes];
    let exist = filtered.some(value => value == shapeId);
    if (exist) {
      filtered = filtered.filter(value => value != shapeId);
    } else {
      filtered.push(shapeId);
    }
    setSelectedShapes([...filtered]);
  };

  // Search Product
  useEffect(() => {
    // setProductLoding(true);
    async function searchProduct() {
      try {
        const response = await fetch(
          `${SERVER_URL}/product?searchQuery=${searchQuery}`,
        );
        const data = await response.json();
        if (data.status == 200) {
          setProducts(data.body);
        }
        // setProductLoding(false);
      } catch (error) {
        // setProductLoding(false);
        Alert.alert('Search Error', data.message);
      }
    }

    searchProduct();
  }, [searchQuery]);

  // Search Product By Params
  useEffect(() => {
    // setProductLoding(true);
    async function searchProduct() {
      try {
        const response = await fetch(
          `${SERVER_URL}/product?searchQuery=${query}`,
        );
        const data = await response.json();
        if (data.status == 200) {
          setProducts(data.body);
        }
        // setProductLoding(false);
      } catch (error) {
        // setProductLoding(false);
        Alert.alert('Search Error', data.message);
      }
    }
    searchProduct();
  }, [query]);

  return (
    <Container>
      {/* Filter Model */}
      <Modal
        visible={visible}
        onDismiss={hideModal}
        animationType={'slide'}
        transparent={true}
        onRequestClose={hideModal}>
        <TouchableWithoutFeedback onPress={hideModal}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <MyText style={{fontSize: 17, color: color.black}}>
              Filter Product
            </MyText>
            <TouchableOpacity style={{padding: 10}} onPress={hideModal}>
              <FontAwesome name={'times'} size={20} />
            </TouchableOpacity>
          </View>

          {/* Modal Body */}
          <ScrollView style={styles.modalBody}>
            {/* By Cake Flavour */}
            <View style={styles.filterCard}>
              <MyText
                fontName={'Roboto-Bold'}
                style={{
                  fontSize: 16,
                  paddingHorizontal: 10,
                  paddingBottom: 8,
                  color: color.black700,
                }}>
                Cake Flavours
              </MyText>

              {flavours.map((flavour, index) => {
                return (
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Checkbox
                      color={color.blood700}
                      status={
                        selectedFlavours.some(flv => flv == flavour._id)
                          ? 'checked'
                          : 'unchecked'
                      }
                      onPress={() => flavourChangeHandler(flavour._id)}
                    />
                    <TouchableOpacity
                      onPress={() => flavourChangeHandler(flavour._id)}>
                      <MyText style={{color: color.black600}}>
                        {flavour.name} ({flavour?.products?.length})
                      </MyText>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>

            {/* By Cake Shapes */}
            <View style={styles.filterCard}>
              <MyText
                fontName={'Roboto-Bold'}
                style={{
                  fontSize: 16,
                  paddingHorizontal: 10,
                  paddingBottom: 8,
                  color: color.black700,
                }}>
                Cake Shapes
              </MyText>

              {shapes.map((shape, index) => {
                return (
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Checkbox
                      color={color.blood700}
                      status={
                        selectedShapes.some(flv => flv == shape._id)
                          ? 'checked'
                          : 'unchecked'
                      }
                      onPress={() => shapeChangeHandler(shape._id)}
                    />
                    <TouchableOpacity
                      onPress={() => shapeChangeHandler(shape._id)}>
                      <MyText style={{color: color.black600}}>
                        {shape.name} ({shape?.products?.length})
                      </MyText>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>

            {/* By Cake Type */}
            <View style={styles.filterCard}>
              <MyText
                fontName={'Roboto-Bold'}
                style={{
                  fontSize: 16,
                  paddingHorizontal: 10,
                  paddingBottom: 8,
                  color: color.black700,
                }}>
                Cake Type
              </MyText>

              {cakeTypes.map((type, index) => {
                return (
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Checkbox
                      color={color.blood700}
                      status={
                        selectedCakeTypes.some(flv => flv == type._id)
                          ? 'checked'
                          : 'unchecked'
                      }
                      onPress={() => cakeTypeChangeHandler(type._id)}
                    />
                    <TouchableOpacity
                      onPress={() => cakeTypeChangeHandler(type._id)}>
                      <MyText style={{color: color.black600}}>
                        {type.name}
                      </MyText>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>

            <View style={styles.filterBtnContainer}>
              <TouchableOpacity style={styles.filterBtn}>
                <MyText style={styles.filterBtnText}>Filter</MyText>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>

      {/* Header */}
      <Header title={categoryName} />

      <ScrollView horizontal={false}>
        {/* Main Container */}
        <View style={styles.container}>
          {/* Search */}
          <SearchBox inputHandler={inputHandler} />

          {/* Label */}
          {!productLoding && products.length ? (
            <View style={styles.labelContainer}>
              <MyText style={styles.labelText}>
                {products.length} Products Found
              </MyText>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <FontAwesome
                    color={color.red600}
                    size={22}
                    name="sort-amount-asc"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={showModal}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 10,
                  }}>
                  <Feather name={'filter'} color={color.red600} size={24} />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            ''
          )}

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
              />
            ) : (
              <View
                style={{
                  height: windowHeight * 0.7,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <MaterialCommunityIcons name="shopping" size={100} />
                <MyText
                  style={{
                    fontSize: 40,
                    color: color.red600,
                  }}>
                  Sorry!
                </MyText>
                <MyText style={{fontSize: 20, color: color.black400}}>
                  No Product Found
                </MyText>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

export default ListingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },

  modalContainer: {
    backgroundColor: color.white,
    position: 'absolute',
    elevation: 5,
    flex: 1,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    height: '95%',
    width: '100%',
    bottom: 0,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f2e8',
    paddingVertical: 15,
    paddingLeft: 27,
    paddingRight: 20,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
  },
  modalBody: {
    flex: 1,
    padding: 15,
  },
  modalContent: {
    backgroundColor: color.white,
    marginTop: 20,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    flex: 1,
    padding: 20,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },

  labelText: {
    fontSize: 17,
    fontFamily: font.medium,
    color: color.red600,
    letterSpacing: 1,
  },

  labelBtbText: {
    fontSize: 17,
    marginRight: 5,
    color: color.red600,
  },
  filterCard: {
    marginBottom: 10,
    backgroundColor: color.white,
    elevation: 5,
    margin: 1,
    paddingVertical: 10,
    borderRadius: 10,
  },

  filterBtnContainer: {
    // padding: 10,
    marginTop: 10,
  },
  filterBtn: {
    backgroundColor: color.blood700,
    alignItems: 'center',
    padding: 12,
    borderRadius: 20,
    borderBottomEndRadius: 0,
  },
  filterBtnText: {
    color: color.white,
  },
});
