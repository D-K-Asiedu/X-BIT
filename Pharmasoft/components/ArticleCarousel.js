import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';

export default class ArticleCarousel extends Component {
  render() {
    return (

      <View style={styles.card}>
        <View style={{height: 200}}></View>
      </View>

      // <View>
      //   <Image source={require('../assets/home-icons/article-bg.png')} style={styles.footerFourImage}/>
      // </View>

      // <View>
      //   <Image source={require('../assets/home-icons/article-bg.png')} style={styles.footerFourImage}/>
      // </View>

      // <View>
      //   <Image source={require('../assets/home-icons/article-bg.png')} style={styles.footerFourImage}/>
      // </View>
    

    )
  }
};

const styles = StyleSheet.create({
  // footerFourImage:{
  //   resizeMode: 'cover',
  //   borderRadius: 10,
  //   width: 380,
  //   height: 250,
  //   marginLeft: 10,
  //   marginRight: 10
  //   },

  card:{
    borderRadius: 20,
    margin: 5,

    backgroundColor: '#f2f2f2',
    elevation: 1
    },
    
});
//npm install react-native-swiper


