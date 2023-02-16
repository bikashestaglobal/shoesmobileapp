import React, {useState} from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {windowWidth} from '../../utils/Dimensions';
const MainCarousel = () => {
  const [images, setImages] = useState([
    'https://content.wepik.com/statics/2897958/fashion-banner-blog-9182393page1.jpg',
  ]);
  return (
    <View>
      <Carousel
        loop
        width={windowWidth}
        height={180}
        autoPlay={true}
        data={images}
        scrollAnimationDuration={1000}
        autoPlayInterval={3000}
        // onSnapToItem={index => console.log('current index:', index)}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                height: 180,
                borderWidth: 0,
                justifyContent: 'center',
              }}>
              <TouchableOpacity>
                <Image
                  style={{height: '100%', width: '100%', resizeMode: 'stretch'}}
                  source={{
                    uri: item,
                  }}
                />
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

export default MainCarousel;
