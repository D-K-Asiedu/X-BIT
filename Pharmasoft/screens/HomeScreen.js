import React from 'react';
import { View, Text, Button, StyleSheet, StatusBar, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native';

import FirstAidLinks from '../components/FirstAidLinks';
import MedViewLinks from '../components/MedViewLinks';
import Swipable from '../components/Swipable';
import ArticleCarousel from '../components/ArticleCarousel';
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
        <Swipable />
        </View>
        <ScrollView style={[styles.footer, /*{ backgroundColor: colors.background}*/]}>
          <View style={styles.footerOneView}>
            <Text style={styles.boldLeftText}>First Aid</Text>
            <Text style={styles.smallRightText}>See all </Text>
          </View>

          <View style={styles.footerTwoView}>
            <FirstAidLinks title="poisoning" image="poisons" />
            <FirstAidLinks title="bleeding" image="bleeding" />
            <FirstAidLinks title="resusitation" image="heart-flat" />
            <FirstAidLinks title="asthma" image="lung" />
          </View>

          <View style={styles.footerThreeView}>
            <Text style={styles.boldLeftText}>Articles</Text>
          </View>
          
          <View>
            <ArticleCarousel />
          </View>

          <View style={styles.footerFiveView}>
            <Text style={styles.boldLeftText} >Products</Text>
            <Text style={styles.smallRightText}>See all </Text>
          </View>

          <View style={styles.lastView}>
            <MedViewLinks title='medOne' image='fluxamox'/>
            <MedViewLinks title='medTwo' image='vitamina'/>
          </View>

          <View style={styles.lastView}>
            <MedViewLinks title='medOne' image='fluxamox'/>
            <MedViewLinks title='medTwo' image='vitamina'/>
          </View> 
        </ScrollView>  
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