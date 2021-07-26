import React from 'react';
import { View, Text, Button, StyleSheet, StatusBar, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native';

import firstAidLinks from '../components/firstAidLinks';
import medViewLinks from '../components/medViewLinks';
//import { globalStyles } from '../styles/global';
//import * as Animatable from 'react-native-animatable';
//import { useTheme } from '@react-navigation/native';




const HomeScreen = ({navigation}) => {

  //const { colors } = useTheme();

  //const theme = useTheme();
  
    return (
      <View style={styles.container}> 
        <StatusBar backgroundColor='#1BA665' barStyle= { theme.dark ? "light-content" : "dark-content" }/>
        <View style={styles.header}>
          <View style={styles.yellView}>
            <View style={styles.yellTextView}>
              <Text style={styles.yellTextOne} >Tip of the day</Text>
              <Text style={styles.yellTextTwo} >Run at least 500km daily or you are going to die</Text>
            </View >
            <View style={styles.yellImageView}>
              <Image source={require('../home-icons/go.png')} style={styles.yellImage}/>
            </View>
          </View>
        </View>
        <View style={[styles.footer, /*{ backgroundColor: colors.background}*/]}>
          <View style={styles.footerOneView}>
            <Text style={styles.boldLeftText}>First Aid</Text>
            <Text style={styles.smallRightText}>See all </Text>
          </View>

          <View style={styles.footerTwoView}>
            <firstAidLinks title="poisoning" image="poisons" />
            <firstAidLinks title="bleeding" image="bleeding" />
            <firstAidLinks title="resusitation" image="heart-flat" />
            <firstAidLinks title="asthma" image="lung" />
          </View>

          </View>

          <View style={styles.footerThreeView}>
            <Text style={styles.boldLeftText}>Articles</Text>
          </View>

          <View style={styles.footerFourView}>
            <View >
              <Image source={require('../home-icons/poisons.png')} style={styles.imageOne}/>
            </View>

            <View >
              <Image source={require('../home-icons/bleeding.png')} style={styles.imageTwo}/>
            </View>

            <View >
              <Image source={require('../home-icons/heart-flat.png')} style={styles.imageThree}/>
            </View>

            <View >
              <Image source={require('../home-icons/lung.png')} style={styles.imageFour}/>
            </View>
          </View>

          <View style={styles.footerFiveView}>
            <Text style={styles.boldLeftText} >Products</Text>
            <Text style={styles.smallRightText}>See all </Text>
          </View>

          <View style={styles.lastView}>
            <medViewLinks title='medOne' image='fluxamox'/>
            <medViewLinks title='medTwo' image='vitamina'/>
          </View>

          <View style={styles.lastView}>
            <medViewLinks title='medOne' image='fluxamox'/>
            <medViewLinks title='medTwo' image='vitamina'/>
          </View>
      </View>

    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
    flex: 1, 
    backgroundColor: '#1BA665'
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',

    },
    footer: {
        flex: 5,
        backgroundColor: '#f4f4f4',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30,
        justifyContent: 'space-between',
    },
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
    footerOneView: {
      flexDirection: 'row',
      marginTop: -30,
      marginBottom: 10
    },
    boldLeftText: {
      fontFamily: 'roboto',
      fontWeight: 'bold',
      color: '#1A2E35',
      textAlign: 'left',
      fontSize: 24,
      marginLeft: -4
    },
    smallRightText:{
      fontSize: 16,
      fontWeight: 'bold',
      color: '#1BA665',
      textAlign: 'right',
      marginLeft: 250,
      marginTop: 10
    },
    footerTwoView:{
      marginTop: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 18
    },
    footerTwoSubView:{
      flexDirection: 'column'
    },
    smallBoxView:{
      flexDirection: 'column',
      backgroundColor: 'white',
      borderRadius: 22,
      width: 75,
      height: 75,
      marginLeft: 10,
      marginRight: 10
    },

    smallBoxImage:{
      resizeMode: 'center'
    },

    smallBoxText:{
      fontSize: 17,
      fontWeight: 'bold',
      color: '#375A64',
      textAlign: 'center'
    },

    footerThreeView:{
      flexDirection: 'row',
      marginBottom: 15
    },

    footerFourView:{
      flexDirection: 'row',
      marginBottom: 15
    },
    footerFourImage:{
      resizeMode: 'cover',
      borderRadius: 10
    },

    footerFiveView:{
      flexDirection: 'row'
    },

    lastView:{
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    

});