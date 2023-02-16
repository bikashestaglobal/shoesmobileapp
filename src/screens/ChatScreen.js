import React, {useState, useEffect} from 'react';
import Container from '../components/Container';
import Header from '../components/Header';
import {color, font} from '../helpers/Constants';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Linking,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MyText from '../components/MyText';
import {windowHeight} from '../../utils/Dimensions';
import {SERVER_URL} from '../../config/Config';
import Toast from 'react-native-toast-message';

function ChatScreen({navigation}) {
  const [text, setText] = useState([]);
  const [contactDetails, setContactDetails] = useState({});
  const [loading, setLoading] = useState(false);

  const sendMessageHandler = () => {
    Linking.openURL(
      `whatsapp://send?text=${text}&phone=+91${
        contactDetails?.whatsappNumber || 9117162463
      }`,
    );
    setText('');
  };

  // get Settings
  useEffect(() => {
    const getSetting = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${SERVER_URL}/setting`, {
          method: 'GET',
        });
        const result = await response.json();
        if (result.status == 200) {
          setContactDetails(result?.body?.contactUs);
        } else {
          Toast.show({text1: result.message, type: 'danger'});
        }
        setLoading(false);
      } catch (error) {
        Toast.show({text1: error.message, type: 'danger'});
        setLoading(false);
      }
    };
    getSetting();
  }, []);

  return (
    <Container>
      {/* Headee */}
      <Header title={'Chat With Us'} titleColor={color.black600} />

      {/* Content */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <KeyboardAvoidingView behavior="position">
            <TextInput
              style={styles.textInput}
              placeholder="Enter Message"
              multiline={true}
              numberOfLines={20}
              autoFocus={true}
              textAlignVertical={'bottom'}
              value={text}
              onChangeText={text => {
                setText(text);
              }}
              placeholderTextColor={color.black500}
            />
            <View style={{alignItems: 'center', width: '100%'}}>
              <TouchableOpacity
                style={styles.sendBtn}
                onPress={sendMessageHandler}>
                <FontAwesome name={'send'} size={20} color={color.white700} />
                <MyText style={styles.sendBtnText}>Send Message</MyText>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Container>
  );
}

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: color.black300,
  },

  textInput: {
    backgroundColor: color.white700,
    borderRadius: 10,
    width: '100%',
    fontFamily: font.medium,
    padding: 10,
    color: color.black600,
    elevation: 1,
  },

  sendBtn: {
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 40,
    backgroundColor: color.skyBlue600,
    flexDirection: 'row',
    marginTop: 20,
    width: '100%',
    justifyContent: 'center',
    elevation: 1,
  },
  sendBtnText: {
    color: color.white700,
    marginLeft: 10,
  },
});
