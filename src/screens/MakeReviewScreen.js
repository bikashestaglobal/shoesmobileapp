import Container from '../components/Container';
import Header from '../components/Header';
import {color} from '../helpers/Constants';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Alert,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MyText from '../components/MyText';
import {useState, useContext} from 'react';
import {CustomerContext} from '../../App';

import {Rating} from 'react-native-ratings';
import {SERVER_URL} from '../../config/Config';

function MakeReviewScreen({navigation, route}) {
  const {state, dispatch} = useContext(CustomerContext);
  const [reviewText, setReviewText] = useState('');
  const [star, setStar] = useState(2);

  const makeReviewHandler = async () => {
    const newData = {
      rating: star,
      message: reviewText,
      product: route.params.productId,
    };
    try {
      const response = await fetch(`${SERVER_URL}/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.jwtToken}`,
        },
        body: JSON.stringify(newData),
      });

      const result = await response.json();
      if (result.status == 200) {
        Alert.alert('Review Alert', result.message);
        navigation.goBack();
      } else {
        Alert.alert('Review Error', result.message);
      }
    } catch (error) {
      Alert.alert('Review Error', error.message);
    }
  };

  const templates = [
    'Awesome',
    'Most Loved Cake',
    'Not a bad',
    'I Love this Cake',
    'Test is Awesome',
    'Best Quality',
    'Not a hated cake',
  ];

  return (
    <Container>
      {/* Headee */}
      <Header title={'Make A Review'} titleColor={color.black600} />

      {/* Content */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <KeyboardAvoidingView behavior="position">
            {/* Templae */}
            <View style={styles.templateContainer}>
              {templates.map((temp, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setReviewText(temp);
                    }}
                    key={`temp-${index}`}
                    style={styles.template}>
                    <MyText style={{color: color.black600600}}>{temp}</MyText>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Ratings */}
            <View style={{marginVertical: 20}}>
              <MyText
                style={{
                  fontSize: 17,
                  color: color.black600,
                  marginBottom: 10,
                }}>
                What would you think?
              </MyText>
              <Rating
                style={{alignSelf: 'flex-start'}}
                type="star"
                startingValue={star}
                ratingCount={5}
                imageSize={30}
                //   showRating
                onFinishRating={function (number) {
                  setStar(number);
                }}
              />
            </View>

            <View style={{padding: 1}}>
              <TextInput
                style={styles.textInput}
                placeholder="Message from your Heart"
                placeholderTextColor={color.black400}
                multiline={true}
                numberOfLines={5}
                autoFocus={true}
                textAlignVertical={'top'}
                value={reviewText}
                onChangeText={text => {
                  setReviewText(text);
                }}
              />
            </View>
            <View style={{alignItems: 'center', width: '100%'}}>
              <TouchableOpacity
                style={styles.sendBtn}
                onPress={makeReviewHandler}>
                <FontAwesome name={'star-o'} size={20} color={color.white700} />
                <MyText style={styles.sendBtnText}>Make Review</MyText>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Container>
  );
}

export default MakeReviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: color.black300,
  },
  templateContainer: {
    marginVertical: 10,
    padding: 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  template: {
    padding: 10,
    backgroundColor: color.white700,
    elevation: 1,
    borderRadius: 10,
    marginHorizontal: 2,
    marginBottom: 6,
  },

  textInput: {
    backgroundColor: color.white700,
    borderRadius: 10,
    fontFamily: 'Roboto-Regular',
    padding: 10,
    elevation: 1,
    color: color.black600,
  },

  sendBtn: {
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 40,
    backgroundColor: color.skyBlue500,
    flexDirection: 'row',
    marginTop: 20,
    width: '100%',
    justifyContent: 'center',
  },
  sendBtnText: {
    color: color.white700,
    marginLeft: 10,
  },
});
