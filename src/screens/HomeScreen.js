import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Container from '../components/Container';
import MyText from '../components/MyText';
import Header from '../components/MainHeader';
import MainCarousel from '../components/MainCarousel';
import {ScrollView} from 'react-native-gesture-handler';
import HomepageBanner from '../components/HomepageBanner';
import NewArrivals from '../components/NewArrivals';
import {color} from '../helpers/Constants';
import OfferBanner from '../components/SaleBanner';
import PopularTags from '../components/PopularTags';
import BestsellerContainer from '../components/BestsellerContainer';
import Newsletter from '../components/Newsletter';
import FooterContent from '../components/FooterContent';

const HomeScreen = ({navigation}) => {
  return (
    <Container>
      {/* Header */}
      <Header />

      <ScrollView style={{flex: 1}}>
        {/* Main Carousel */}
        <MainCarousel />

        <View style={styles.container}>
          {/* Banner */}
          <HomepageBanner />

          {/* Products */}
          <NewArrivals />
        </View>

        {/* Offer Banner */}
        <OfferBanner
          title={'NEW SALE'}
          category={'SUMMER COLLECTIONS'}
          offText={'50% OFF'}
          btnTitle={'SHOP NOW'}
        />

        <View style={styles.container}>
          {/* Popular tags */}
          <PopularTags
            tags={[
              {title: 'JEANS', url: '/'},
              {title: 'SUNGLASSES', url: '/'},
              {title: 'JEANS', url: '/'},
              {title: 'SUNGLASSES', url: '/'},
              {title: 'JEANS', url: '/'},
              {title: 'SUNGLASSES', url: '/'},
              {title: 'SUNGLASSES', url: '/'},
              {title: 'SUNGLASSES', url: '/'},
              {title: 'SUNGLASSES', url: '/'},
            ]}
          />

          {/* Bestseller  */}
          <BestsellerContainer />
        </View>
        {/* Newsletter */}
        <Newsletter />

        {/* Newsletter */}
        <FooterContent />
      </ScrollView>
    </Container>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: color.white700,
  },
});
