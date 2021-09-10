import React, { Component } from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import Swiper from 'react-native-swiper';

export default class Swipable extends Component {
  render() {
    return (
      <Swiper style={styles.swi} >
      <View style={styles.yellView}>
        <View style={styles.yellTextView}>
          <Text style={styles.yellTextOne} >Tip of the day</Text>
          <Text style={styles.yellTextTwo} >Run at least 500km daily or you are going to die</Text>
        </View >
        <View style={styles.yellImageView}>
          <Image source={require('../assets/home-icons/ok.png')} style={styles.yellImage}/>
        </View>
      </View>

      <View style={styles.yellView}>
        <View style={styles.yellTextView}>
          <Text style={styles.yellTextOne} >Tip of the day</Text>
          <Text style={styles.yellTextTwo} >Run at least 5km daily or you are going to burn out</Text>
        </View >
        <View style={styles.yellImageView}>
          <Image source={require('../assets/home-icons/ok.png')} style={styles.yellImage}/>
        </View>
      </View>

      <View style={styles.yellView}>
        <View style={styles.yellTextView}>
          <Text style={styles.yellTextOne} >Tip of the day</Text>
          <Text style={styles.yellTextTwo} >Run at least 2m daily or you are going to enter depression</Text>
        </View >
        <View style={styles.yellImageView}>
          <Image source={require('../assets/home-icons/ok.png')} style={styles.yellImageThree}/>
        </View>
      </View>
  </Swiper>
      
  
    )
  }
};

const styles = StyleSheet.create({
    swi: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 205
    },
    yellView: {
      marginTop: 30,
      marginLeft: 22, 
      marginBottom: 25,     
      backgroundColor: '#F9B900',
      width: 390,
      height: 130,
      borderRadius: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly' 
      },
    yellTextView: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginRight: 25
      },
    yellTextOne: {
      color: 'white',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      fontFamily: 'comic-neue',
      fontSize: 20,
      marginTop: 1,
      marginBottom: 10,
      marginLeft: 60
      },
    yellTextTwo: {
      color: 'white',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      fontSize: 16,
      fontFamily: 'comic-neue',
      marginLeft: 60
      },
    yellImageView: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingLeft: 10
      },
    yellImage: {
      resizeMode: 'cover',
      width: 90,
      height: 100,
      borderTopLeftRadius: 100,
      borderBottomRightRadius: 30,
      marginTop: 38,
      marginRight: 47
      },
    yellImageThree: {
      resizeMode: 'cover',
      width: 90,
      height: 100,
      borderTopLeftRadius: 100,
      borderBottomRightRadius: 30,
      marginTop: 38,
      marginRight: 43
      },
});
//npm install react-native-swiper





