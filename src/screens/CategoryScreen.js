import {
  View,
  Pressable,
  ScrollView,
  Alert,
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
import CategoryCard from '../components/CategoryCard';

const CategoryScreen = props => {
  const {navigation} = props;
  const [deleted, setDeleted] = useState(false);
  const {state, dispatch} = useContext(CustomerContext);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  // Get wishlist items
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // Get Category
    const getCategory = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/parent-category?limit=150`);
        const data = await response.json();
        if (data.status == 200) {
          setCategories(data.body);
        } else {
          Alert.alert('Category Alert', data.message);
        }
        setLoading(false);
        setRefreshing(false);
      } catch (error) {
        Alert.alert('Category Error', error.message);
        setLoading(false);
        setRefreshing(false);
      }
    };

    getCategory();
  }, [refreshing]);

  return (
    <Container>
      {/* Header */}
      <Header
        navigation={navigation}
        title={'All Categories'}
        titleColor={color.black}
      />

      {/* Body */}
      <View style={styles.container}>
        <View style={{flex: 1}}>
          {loading ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <View>
                <ActivityIndicator color={color.red500} size={25} />
                <MyText style={{fontSize: 17, marginVertical: 10}}>
                  Please Wait..
                </MyText>
              </View>
            </View>
          ) : categories.length ? (
            <View style={{flex: 1}}>
              {/* Category Card */}

              <FlatList
                data={categories}
                renderItem={({item: category}) => {
                  return (
                    <CategoryCard
                      name={category.name}
                      image={category.image}
                      tagLine=""
                      categorySlug={category.slug}
                      categoryId={category._id}
                    />
                  );
                }}
                keyExtractor={item => {
                  return item._id;
                }}
                onRefresh={() => {
                  setRefreshing(true);
                }}
                refreshing={refreshing}
                showsVerticalScrollIndicator={false}
                // ListHeaderComponent={<Header />}
                // stickyHeaderIndices={[0]}
              />
            </View>
          ) : (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Ionicons name={'apps'} size={150} color={color.red600} />
              <MyText style={{fontSize: 20, color: color.black}}>
                No Category Available
              </MyText>

              <View
                style={{
                  backgroundColor: color.red600,
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
                  android_ripple={{color: color.red500}}>
                  <MyText style={{color: color.white}}>Go To Home</MyText>
                </Pressable>
              </View>
            </View>
          )}
        </View>
      </View>
    </Container>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: color.black300,
  },
});
