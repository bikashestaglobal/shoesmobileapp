import {View, TouchableOpacity, Alert, StyleSheet} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MyText from './MyText';
import {color, font} from '../helpers/Constants';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const RatingContainerCard = ({rating, productId}) => {
  const navigation = useNavigation();

  return (
    <View style={{width: '100%'}}>
      <LinearGradient
        style={styles.reviewCard}
        colors={[color.skyBlue600, color.skyBlue400]}>
        <View style={{flexDirection: 'row', paddingBottom: 20}}>
          {/* Left Part */}
          <View
            style={{
              flex: 0.8,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <MyText style={styles.bigText}>{rating.avgRating}</MyText>

            <View style={{flexDirection: 'row', marginTop: 2}}>
              <Ionicons
                style={{marginRight: 2}}
                name="star"
                size={20}
                color={color.white700}
              />
              <Ionicons
                style={{marginRight: 2}}
                name="star"
                size={20}
                color={color.white700}
              />
              <Ionicons
                style={{marginRight: 2}}
                name="star"
                size={20}
                color={color.white700}
              />
              <Ionicons
                style={{marginRight: 2}}
                name="star"
                size={20}
                color={color.white700}
              />
              <Ionicons
                style={{marginRight: 2}}
                name="star"
                size={20}
                color={color.white700}
              />
            </View>

            <View>
              <MyText
                style={{
                  fontSize: 15,
                  marginTop: 5,
                  fontFamily: font.bold,
                  color: color.white700,
                }}>
                ({rating.noOfRating} Users)
              </MyText>
            </View>
          </View>

          {/* Right */}
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/* Five Star */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MyText
                style={{marginRight: 10, color: color.white700, fontSize: 20}}>
                5
              </MyText>
              <View
                style={{
                  height: 8,
                  borderRadius: 5,
                  width: '80%',
                  backgroundColor: '#84817a',
                }}>
                <View
                  style={{
                    height: 8,
                    borderRadius: 5,
                    width: `${rating.fiveStar}%`,
                    backgroundColor: color.white700,
                  }}></View>
              </View>
            </View>

            {/* Four Star */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MyText
                style={{marginRight: 10, color: color.white700, fontSize: 20}}>
                4
              </MyText>
              <View
                style={{
                  height: 8,
                  borderRadius: 5,
                  width: '80%',
                  backgroundColor: '#84817a',
                }}>
                <View
                  style={{
                    height: 8,
                    borderRadius: 5,
                    width: `${rating.fourStar}%`,
                    backgroundColor: color.white700,
                  }}></View>
              </View>
            </View>

            {/* Three Star */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MyText
                style={{marginRight: 10, color: color.white700, fontSize: 20}}>
                3
              </MyText>
              <View
                style={{
                  height: 8,
                  borderRadius: 5,
                  width: '80%',
                  backgroundColor: '#84817a',
                }}>
                <View
                  style={{
                    height: 8,
                    borderRadius: 5,
                    width: `${rating.threeStar}%`,
                    backgroundColor: color.white700,
                  }}></View>
              </View>
            </View>

            {/* Two Star */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MyText
                style={{marginRight: 10, color: color.white700, fontSize: 20}}>
                2
              </MyText>
              <View
                style={{
                  height: 8,
                  borderRadius: 5,
                  width: '80%',
                  backgroundColor: '#84817a',
                }}>
                <View
                  style={{
                    height: 8,
                    borderRadius: 5,
                    width: `${rating.twoStar}%`,
                    backgroundColor: color.white700,
                  }}></View>
              </View>
            </View>

            {/* One Star */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MyText
                style={{marginRight: 10, color: color.white700, fontSize: 20}}>
                1
              </MyText>
              <View
                style={{
                  height: 8,
                  borderRadius: 5,
                  width: '80%',
                  backgroundColor: '#84817a',
                }}>
                <View
                  style={{
                    height: 8,
                    borderRadius: 5,
                    width: `${rating.oneStar}%`,
                    backgroundColor: color.white700,
                  }}></View>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Write a review button */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('MakeReviewStackScreen', {
            screen: 'MakereviewStackScreen',
            productId,
          });
        }}
        style={styles.reviewBtn}>
        <MyText style={{color: color.black500, fontSize: 16}}>
          Write a review
        </MyText>
      </TouchableOpacity>
    </View>
  );
};

export default RatingContainerCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  cardContainer: {
    flex: 1,
    backgroundColor: color.white700,
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
    fontSize: 65,
    color: color.white700,
    fontFamily: font.bold,
  },
  reviewBtn: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.white700,
    marginBottom: 10,
    borderRadius: 12,
    elevation: 1,
  },
});
