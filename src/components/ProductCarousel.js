import React, {useState} from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {windowWidth} from '../../utils/Dimensions';

const ProductCarousel = ({sliderImages: images}) => {
  return (
    <View>
      <Carousel
        loop
        width={windowWidth - (windowWidth * 7) / 100}
        height={350}
        autoPlay={true}
        data={images}
        scrollAnimationDuration={1000}
        autoPlayInterval={3000}
        // onSnapToItem={index => console.log('current index:', index)}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                height: 350,
                borderWidth: 0,
                justifyContent: 'center',
              }}>
              <TouchableOpacity>
                <Image
                  style={{height: '100%', width: '100%', resizeMode: 'center'}}
                  source={{
                    uri: item.imgUrl,
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

export default ProductCarousel;
