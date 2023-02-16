import {
  View,
  Pressable,
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
import {useNavigation, useIsFocused} from '@react-navigation/native';
import RatingContainerCard from '../components/RatingContainerCard';
import ReviewCard from '../components/ReviewCard';

const ProductReviewsScreen = ({route}) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const {productId, productSlug} = route.params;

  const [deleted, setDeleted] = useState(false);
  const {state, dispatch} = useContext(CustomerContext);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);

  const [rating, setRating] = useState({
    avgRating: 0,
    noOfRating: 0,
    fiveStar: '',
    fourStar: '',
    threeStar: '',
    twoStar: '',
    oneStar: '',
  });
  // Get wishlist items
  const [refreshing, setRefreshing] = useState(false);

  const countRating = (star, reviews) => {
    const count = reviews.filter(review => review.rating == star).length;
    const percentage = ((count * 100) / reviews.length).toFixed(1);

    return percentage;
  };

  // Get Reviews
  useEffect(() => {
    if (productSlug && isFocused) {
      const getReviews = async () => {
        try {
          const response = await fetch(
            `${SERVER_URL}/product/by-slug/${productSlug}`,
          );
          const data = await response.json();

          if (data.status == 200) {
            setReviews(data.body.reviews);
            // Calculate Avarage reviews
            if (data.body?.reviews) {
              const totalRating = data.body.reviews
                .map(item => item.rating)
                .reduce((prev, next) => prev + next, 0);
              const avgRating = (
                totalRating / data.body.reviews.length
              ).toFixed(1);

              const noOfRating = data.body?.reviews?.length || 0;
              const fiveStar = countRating(5, data.body.reviews);
              const fourStar = countRating(4, data.body.reviews);
              const threeStar = countRating(3, data.body.reviews);
              const twoStar = countRating(2, data.body.reviews);
              const oneStar = countRating(1, data.body.reviews);

              setRating({
                avgRating: avgRating,
                noOfRating: noOfRating,
                fiveStar,
                fourStar,
                threeStar,
                twoStar,
                oneStar,
              });
            }
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

      getReviews();
    }
  }, [productSlug, refreshing, isFocused]);

  return (
    <Container bgColor="#f7f4ea">
      {/* Header */}
      <Header
        navigation={navigation}
        title={'Rating & Reviews'}
        titleColor={color.black}
      />

      {/* Body */}
      <View style={styles.container}>
        <View style={{flex: 1}}>
          {loading ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <View>
                <ActivityIndicator color={color.blood500} size={25} />
                <MyText style={{fontSize: 17, marginVertical: 10}}>
                  Please Wait..
                </MyText>
              </View>
            </View>
          ) : reviews.length ? (
            <View style={{flex: 1}}>
              {/* Review card */}

              <FlatList
                data={reviews}
                renderItem={({item: review}) => {
                  if (review.status) return <ReviewCard review={review} />;
                }}
                keyExtractor={item => {
                  return item._id;
                }}
                onRefresh={() => {
                  setRefreshing(true);
                }}
                refreshing={refreshing}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                  <RatingContainerCard rating={rating} productId={productId} />
                }
                // stickyHeaderIndices={[0]}
              />
            </View>
          ) : (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Ionicons name={'star'} size={150} color={color.blood700} />
              <MyText style={{fontSize: 20, color: color.black}}>
                No Rating & Reiews Available
              </MyText>

              <View
                style={{
                  backgroundColor: color.blood700,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 20,
                  overflow: 'hidden',
                  marginTop: 20,
                }}>
                <Pressable
                  onPress={() => {
                    navigation.navigate('MakeReviewStackScreen', {
                      screen: 'MakereviewStackScreen',
                      productId,
                    });
                  }}
                  style={{paddingVertical: 10, paddingHorizontal: 20}}
                  android_ripple={{color: color.blood500}}>
                  <MyText style={{color: color.white}}>
                    Make a First Review
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

export default ProductReviewsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  cardContainer: {
    flex: 1,
    backgroundColor: color.white,
    borderRadius: 20,
    padding: 15,
    elevation: 1,
    marginBottom: 10,
  },

  reviewCard: {
    padding: 10,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 20,
  },

  bigText: {
    fontSize: 70,
    color: color.white,
  },
});
