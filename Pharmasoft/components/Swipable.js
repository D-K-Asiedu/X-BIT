import React, { Component } from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import Swiper from 'react-native-swiper';

export default class Swipable extends Component {
  render() {
    return (
      // <Swiper>
      // <View style={styles.yellView}>
      //   <View style={styles.yellTextView}>
      //     <Text style={styles.yellTextOne} >Tip of the day</Text>
      //     <Text style={styles.yellTextTwo} >Run at least 500km daily or you are going to die</Text>
      //   </View >
      //   <View style={styles.yellImageView}>
      //     <Image source={require('../assets/home-icons/ok.png')} style={styles.yellImage}/>
      //   </View>
      // </View>

      <View style={styles.card}>
        <View style={styles.textView}>
          <Text style={styles.title} >Tip of the day</Text>
          <Text style={styles.message} >Run at least 5km daily or you are going to burn out</Text>
        </View >
         
        <View style={styles.imageView}>
          <Image source={require('../assets/home-icons/ok.png')} style={styles.image}/>
        </View>
      </View>
  // </Swiper>
      
  
    )
  }
};

const styles = StyleSheet.create({
    card: {
      // marginTop: 30,
      marginHorizontal: 20, 
      marginVertical: 5,
      // marginBottom: 25,     
      backgroundColor: '#F9B900',
      // width: 390,
      height: 120,
      borderRadius: 20,
      flexDirection: 'row',
      elevation: 5,
      // alignItems: 'center',
      // justifyContent: 'space-evenly' 
      },

    textView: {
      // flexDirection: 'column',
      // alignItems: 'flex-start',
      // justifyContent: 'space-between',
      // marginRight: 25
      flex: 1,
      // flexWrap: 'wrap',
      padding: 20,
      paddingRight: 5,
      },
    title: {
      color: '#ffffff',
      fontWeight: 'bold',
      // alignItems: 'flex-start',
      // justifyContent: 'space-between',
      // fontFamily: 'comic-neue',
      fontSize: 20,
      marginBottom: 5,
      // marginTop: 1,
      // marginBottom: 10,
      // marginLeft: 60
      },
    message: {
      color: '#ffffff',
      // alignItems: 'flex-start',
      // justifyContent: 'space-between',
      fontSize: 16,
      // fontFamily: 'comic-neue',
      // marginLeft: 60
      },
    imageView: {
      // flexDirection: 'column',
      // alignItems: 'flex-start',
      justifyContent: 'flex-end',

      paddingLeft: 20,

      borderTopLeftRadius: 100,
      borderBottomRightRadius: 20,
      borderTopRightRadius: 20,
      backgroundColor: '#ff000033'
      },
    image: {
      // resizeMode: 'cover',
      // width: 90,
      // height: 100,
      borderTopLeftRadius: 100,
      borderBottomRightRadius: 20,
      // marginTop: 38,
      // marginRight: 47
      },
    // yellImageThree: {
    //   resizeMode: 'cover',
    //   width: 90,
    //   height: 100,
    //   borderTopLeftRadius: 100,
    //   borderBottomRightRadius: 30,
    //   marginTop: 38,
    //   marginRight: 43
    //   },
});
//npm install react-native-swiper





