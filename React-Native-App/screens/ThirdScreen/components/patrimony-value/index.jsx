import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const ValueComponent = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../../assets/patrimony-icon.png')} 
        style={styles.image}
      />
      <Text style={styles.title}>Valor total:</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default ValueComponent;