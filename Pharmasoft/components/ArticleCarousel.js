import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Swiper from 'react-native-swiper';

export default class ArticleCarousel extends Component {
  render() {
    return (
      <Swiper style={styles.caro}>

      <View>
        <Image source={require('../assets/home-icons/article-bg.png')} style={styles.footerFourImage}/>
      </View>

      <View>
        <Image source={require('../assets/home-icons/article-bg.png')} style={styles.footerFourImage}/>
      </View>

      <View>
        <Image source={require('../assets/home-icons/article-bg.png')} style={styles.footerFourImage}/>
      </View>

      <View>
        <Image source={require('../assets/home-icons/article-bg.png')} style={styles.footerFourImage}/>
      </View>
    

     </Swiper>
    )
  }
};

const styles = StyleSheet.create({
  footerFourImage:{
    resizeMode: 'cover',
    borderRadius: 10,
    width: 380,
    height: 250,
    marginLeft: 10,
    marginRight: 10
    },

  caro:{
    height: 250
    },
    
});
//npm install react-native-swiper


