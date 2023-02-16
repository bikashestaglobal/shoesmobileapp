import {useContext, useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import MyText from './MyText';
import {color, font} from '../helpers/Constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {CustomerContext} from '../../App';
import {useNavigation} from '@react-navigation/native';

const CategoryCard = ({name, image, tagLine, categorySlug, categoryId}) => {
  const {state, dispatch} = useContext(CustomerContext);
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        paddingHorizontal: 1,
      }}>
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            navigation.navigate('ListingStackScreen', {
              screen: '',
              params: {
                categorySlug: categorySlug,
                categoryName: name,
              },
            });
          }}>
          <View style={styles.container}>
            {/* Image */}
            <View>
              <Image
                style={styles.image}
                source={{
                  uri:
                    'https://i0.wp.com/www.hospiceofmiamicounty.org/wp-content/uploads/2014/01/mens-category.jpg?fit=500%2C400&ssl=1' ||
                    image,
                }}
              />
            </View>

            {/* Name & Tagline */}
            <View style={{paddingLeft: 15}}>
              <MyText style={styles.heading}>{name}</MyText>

              <MyText
                style={{color: color.skyBlue600, fontSize: 12, marginTop: 3}}>
                Baked with Love
              </MyText>
            </View>

            {/* Right Angle */}
            <View style={{position: 'absolute', right: 10}}>
              <FontAwesome
                name={'angle-right'}
                size={25}
                color={color.black600}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 1,
  },
  btn: {
    backgroundColor: color.white700,
    padding: 10,
    elevation: 1,
    borderRadius: 15,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
  },
  image: {
    height: 60,
    width: 60,
    resizeMode: 'center',
    borderRadius: 30,
  },
  heading: {
    fontSize: 15,
    fontFamily: font.bold,
    color: color.black600,
  },
});
