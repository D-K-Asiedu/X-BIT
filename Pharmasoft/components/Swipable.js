import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';

const Swipable = () => {
    return (
      <Swiper>
        <View style={styles.yellView}>
          <View style={styles.yellTextView}>
            <Text style={styles.yellTextOne} >Tip of the day</Text>
            <Text style={styles.yellTextTwo} >Run at least 500km daily or you are going to die</Text>
          </View >
          <View style={styles.yellImageView}>
            <Image source={require('../home-icons/go.png')} style={styles.yellImage}/>
          </View>
        </View>

        <View style={styles.yellView}>
          <View style={styles.yellTextView}>
            <Text style={styles.yellTextOne} >Tip of the day</Text>
            <Text style={styles.yellTextTwo} >Run at least 5km daily or you are going to burn out</Text>
          </View >
          <View style={styles.yellImageView}>
            <Image source={require('../home-icons/go.png')} style={styles.yellImage}/>
          </View>
        </View>

        <View style={styles.yellView}>
          <View style={styles.yellTextView}>
            <Text style={styles.yellTextOne} >Tip of the day</Text>
            <Text style={styles.yellTextTwo} >Run at least 2m daily or you are going to enter depression</Text>
          </View >
          <View style={styles.yellImageView}>
            <Image source={require('../home-icons/go.png')} style={styles.yellImage}/>
          </View>
        </View>
      </Swiper>   
    )
}

export default Swipable;

const styles = StyleSheet.create({
    yellView: {
        marginTop: 30, 
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
        paddingLeft: 10,
        //marginRight: 40,
        
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
});
//npm install react-native-swiper