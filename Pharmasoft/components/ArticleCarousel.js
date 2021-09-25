import React, { Component } from 'react';
import { 
  StyleSheet, 
  TouchableOpacity, 
  ImageBackground, 
  Text,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Linking } from 'react-native';

const ArticleCarousel = ({ text, link, image }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => Linking.openURL(link || 'www.google.com')}
    >
      <ImageBackground
        style={styles.card}
        source={{ uri: image }}
        imageStyle={{ borderRadius: 20 }}
      >
        <LinearGradient
          colors={['#000000dd', '#00000033', '#000000dd']}
          start={[0, 0]}
          end={[0, 0.7]}
          style={styles.innerCard}
        >
          <Text style={styles.title}>{text}</Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  )
};

export default ArticleCarousel

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    margin: 5,

    backgroundColor: '#f2f2f2',
    elevation: 1
  },
  innerCard: {
    borderRadius: 20,
    height: 200,
    padding: 20,
    justifyContent: 'flex-end',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#ffffff'
  },
  desc: {
    fontSize: 16,
    color: '#f2f2f2'
  }

});
//npm install react-native-swiper


