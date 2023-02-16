import {View, StyleSheet, Image} from 'react-native';
import MyText from './MyText';
import {color} from '../helpers/Constants';
import {Card} from 'react-native-paper';
import {Rating} from 'react-native-ratings';

const ReviewCard = ({review}) => {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.cardBody}>
          {/* User Image */}
          <Image
            style={styles.userImg}
            source={{
              uri: 'https://www.seekpng.com/png/detail/110-1100707_person-avatar-placeholder.png',
            }}
          />

          {/* Name and Stars */}
          <View style={{paddingLeft: 15, marginTop: 10}}>
            <MyText
              style={{fontSize: 14, color: color.black}}
              fontName={'Roboto-Bold'}>
              {review.customer.name}
            </MyText>

            <View style={{marginTop: 5}}>
              <Rating
                startingValue={review.rating}
                readonly={true}
                ratingCount={5}
                imageSize={20}
                ratingBackgroundColor="transparent"
              />
            </View>
          </View>
        </View>

        {/* Review Message */}
        <View style={{padding: 10}}>
          <MyText>{review.message}</MyText>
        </View>
      </Card>
    </View>
  );
};

export default ReviewCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 1,
  },
  card: {
    flex: 1,
    borderRadius: 15,
    backgroundColor: color.white700,
    padding: 10,
  },
  cardBody: {
    flex: 1,
    flexDirection: 'row',
    position: 'relative',
  },
  userImg: {
    height: 60,
    width: 60,
    resizeMode: 'center',
    borderRadius: 30,
  },
  review: {
    marginTop: 10,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 6,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  star: {
    backgroundColor: color.blood500,
    paddingHorizontal: 8,
    paddingVertical: 7,
    borderRadius: 20,
  },
  reviewtext: {
    fontSize: 16,
    marginLeft: 10,
    color: color.black400,
  },
  angle: {},
});
