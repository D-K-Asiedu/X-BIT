import React, { Component } from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import Swiper from 'react-native-swiper';

export default class Swipable extends Component {
  render() {
    return (
      <View style={styles.card}>
        <View style={styles.textView}>
          <Text style={styles.title} >Tip of the day</Text>
          <Text style={styles.message} >Run at least 5km daily or you are going to burn out</Text>
        </View >
         
        <View style={styles.imageView}>
          <Image source={require('../assets/home-images/ok.png')} style={styles.image}/>
        </View>
      </View>
      
  
    )
  }
};

const styles = StyleSheet.create({
    card: {
      marginHorizontal: 20, 
      marginVertical: 5,
      backgroundColor: '#F9B900',
      height: 120,
      borderRadius: 20,
      flexDirection: 'row',
      elevation: 5,
      },

    textView: {
      flex: 1,
      padding: 20,
      paddingRight: 5,
      },
    title: {
      color: '#ffffff',
      fontWeight: 'bold',
      fontSize: 20,
      marginBottom: 5,
      },
    message: {
      color: '#ffffff',
      fontSize: 16,
      },
    imageView: {
      justifyContent: 'flex-end',

      paddingLeft: 20,

      borderTopLeftRadius: 100,
      borderBottomRightRadius: 20,
      borderTopRightRadius: 20,
      backgroundColor: '#ff000033'
      },
    image: {
      borderTopLeftRadius: 100,
      borderBottomRightRadius: 20,
      },
});





