import Container from '../components/Container';
import Header from '../components/Header';
import {color, font} from '../helpers/Constants';
import {View, StyleSheet, Pressable} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MyText from '../components/MyText';
import {useState, useContext, useEffect} from 'react';
import {CustomerContext} from '../../App';

function ContactScreen({navigation}) {
  const {state, dispatch} = useContext(CustomerContext);
  const [text, setText] = useState([]);

  return (
    <Container bgColor="#f7f4ea">
      {/* Headee */}
      <Header title={'Contact Us'} titleColor={color.black600} />

      {/* Content */}
      <View style={styles.container}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Ionicons name={'sad-outline'} size={150} color={color.skyBlue600} />
          <MyText
            style={{
              fontSize: 20,
              color: color.black600,
              fontFamily: font.medium,
            }}>
            Data not available !
          </MyText>

          <View
            style={{
              backgroundColor: color.skyBlue600,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
              overflow: 'hidden',
              marginTop: 20,
            }}>
            <Pressable
              onPress={() => {
                navigation.goBack();
              }}
              style={{paddingVertical: 10, paddingHorizontal: 20}}
              android_ripple={{color: color.red500}}>
              <MyText style={{color: color.white700}}>Go Back</MyText>
            </Pressable>
          </View>
        </View>
      </View>
    </Container>
  );
}

export default ContactScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: color.black300,
  },
});
