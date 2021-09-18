import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, ImageBackground, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Linking } from 'react-native';

export default class ArticleCarousel extends Component {
  render() {
    return (

      <TouchableOpacity 
        activeOpacity={0.7}
        onPress={() => {Linking.openURL('https://www.google.com')}}
        >
      <ImageBackground 
        style={styles.card}
        source={require('../assets/home-images/go.png')}
        imageStyle={{ borderRadius: 20 }}
      >
        <LinearGradient
          colors={['#000000dd', '#ff000022', '#000000dd']}
          start={[0, 0]}
          end={[0, 0.7]}
          style={styles.innerCard}
        >
          <Text style={styles.title}>The best vacation spot in the fucking tropics...</Text>
          <Text style={styles.desc}>In the 1800s our fucking forefathers wanted to ...</Text>
        </LinearGradient>
      </ImageBackground>
      </TouchableOpacity>
      
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
  innerCard:{
    borderRadius: 20,
    height: 200,
    padding: 20,
    justifyContent: 'flex-end',
  },
  title:{
    fontWeight: 'bold',
    fontSize: 18,
    color: '#ffffff'
  },
  desc:{
    fontSize: 16,
    color: '#f2f2f2'
  }
    
});
//npm install react-native-swiper


