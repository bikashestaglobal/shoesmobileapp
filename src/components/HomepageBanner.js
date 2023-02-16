import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

const HomepageBanner = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.banner}>
        <Image
          style={styles.banner}
          objectFit={'center'}
          resizeMode="stretch"
          source={{
            uri: 'https://imgproxy.epicpxls.com/azmFojKMl_MUYLkFx2CRIEQvlye2RPgi9EJxjZAQxvo/rs:fill:409:307:0/g:no/aHR0cHM6Ly9pdGVt/cy5lcGljcHhscy5j/b20vdXBsb2Fkcy9w/aG90by9lN2Y0OGNj/NjVjY2RjNDI1NWU2/NjQ5NWRhYmRiOWI0/Mg.jpg',
          }}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.banner}>
        <Image
          style={styles.banner}
          objectFit={'center'}
          resizeMode="stretch"
          source={{
            uri: 'https://img.freepik.com/free-vector/super-sale-horizontal-banner_52683-59532.jpg',
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HomepageBanner;
const styles = StyleSheet.create({
  container: {
    height: 140,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
  },
  banner: {
    flex: 1,
    borderRadius: 10,
  },
});
