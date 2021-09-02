import React from 'react';
import { Text, StyleSheet, StatusBar, Dimensions, Image, TouchableOpacity, ScrollView, View } from 'react-native';

import Swipable from '../components/Swipable';
import ArticleCarousel from '../components/ArticleCarousel';

import LinearGradient from 'expo-linear-gradient';

//import { useTheme } from '@react-navigation/native';


//<StatusBar backgroundColor='#1BA665' barStyle= { theme.dark ? "light-content" : "dark-content" }/>
const HomeScreen = ({navigation}) => {

  //const { colors } = useTheme();

  //const theme = useTheme();
  
    return (
      
      <ScrollView>
      <View style={styles.container}>  
        
        <View style={styles.header}>
        <Swipable />
        </View>

        
        <View style={styles.footer}>
          <View style={styles.footerOneView}>

            <Text style={styles.boldLeftText}>First aid</Text>
            <Text style={styles.smallRightText}>{"See All >>"}</Text>
          </View>

          <View style={styles.footerTwoView}>

            <View style={styles.footerTwoSubView}>
              <View style={styles.smallBoxView}>
                <Image source={require('../assets/home-icons/poisons.png')} style={styles.smallBoxImage}/>
              </View>
              <Text style={styles.smallBoxText}>Poisoning</Text>
            </View>

            <View style={styles.footerTwoSubView}>
              <View style={styles.smallBoxView}>
                <Image source={require('../assets/home-icons/bleeding.png')} style={styles.smallBoxImage}/>
              </View>
              <Text style={styles.smallBoxText}>Bleeding</Text>
            </View>

            <View style={styles.footerTwoSubView}>
              <View style={styles.smallBoxView}>
                <Image source={require('../assets/home-icons/heart-flat.png')} style={styles.smallBoxImage}/>
              </View>
              <Text style={styles.smallBoxText}>Resusitation</Text>
            </View>

            <View style={styles.footerTwoSubView}>
              <View style={styles.smallBoxView}>
                <Image source={require('../assets/home-icons/lung.png')} style={styles.smallBoxImage}/>
              </View>
              <Text style={styles.smallBoxText}>Asthma</Text>
            </View>

          </View>


          <View style={styles.footerThreeView}>

            <Text style={styles.boldLeftText}>Articles</Text>

          </View>

          <View style={styles.footerFourView}>
          <ArticleCarousel />
          </View>




          <View style={styles.footerFiveView}>

            <Text style={styles.boldLeftText} >Products</Text>
            <Text style={styles.smallRightText}>{"See All >>"}</Text>
          </View>


          <View style={styles.footerSixView}>

          <View style={styles.medicineView}>
          <View style={styles.secondMedicineView}>
          <Image source={require('../assets/home-icons/fluxamox.png')} style={styles.medicineImage}/>
          <Text style={styles.medicineTextOne}>Fluxamox 250</Text>
          <Text style={styles.medicineTextTwo}>Small Description here</Text>
            <View  style={styles.button}>          
              <TouchableOpacity onPress={()=>navigation.navigate('')}>
              <LinearGradient
                colors={['#1BA665', '#1BA665']}
                style={styles.buttonIn}
              >
              <Text style={styles.buttonText}>Add To Cart</Text>
              </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
          </View>


          <View style={styles.medicineView}>
          <View style={styles.secondMedicineView}>
          <Image source={require('../assets/home-icons/vitamina.png')} style={styles.medicineImage}/>
          <Text style={styles.medicineTextOne}>Vitamin A</Text>
          <Text style={styles.medicineTextTwo}>Small Description here</Text>
            <View  style={styles.button}> 
              <TouchableOpacity onPress={()=>navigation.navigate('')}>
              <LinearGradient
                colors={['#1BA665', '#1BA665']}
                style={styles.buttonIn}
              >
              <Text style={styles.buttonText}>Add To Cart</Text>
              </LinearGradient>
              </TouchableOpacity>
            </View>
          </View> 
          </View>
          </View>

          <View style={styles.footerSixView}> 

          <View style={styles.medicineView}>
          <View style={styles.secondMedicineView}>
          <Image source={require('../assets/home-icons/fluxamox.png')} style={styles.medicineImage}/>
          <Text style={styles.medicineTextOne}>Fluxamox 250</Text>
          <Text style={styles.medicineTextTwo}>Small Description here</Text>
            <View  style={styles.button}> 
              <TouchableOpacity onPress={()=>navigation.navigate('')}>
              <LinearGradient
                colors={['#1BA665', '#1BA665']}
                style={styles.buttonIn}
              >
              <Text style={styles.buttonText}>Add To Cart</Text>
              </LinearGradient>
              </TouchableOpacity>
            </View>
          </View> 
          </View>

          <View style={styles.medicineView}>
          <View style={styles.secondMedicineView}>
          <Image source={require('../assets/home-icons/vitamina.png')} style={styles.medicineImage}/>
          <Text style={styles.medicineTextOne}>Vitamin A</Text>
          <Text style={styles.medicineTextTwo}>Small Description here</Text>
            <View style={styles.button}> 
              <TouchableOpacity onPress={()=>navigation.navigate('')}>
              <LinearGradient
                colors={['#1BA665', '#1BA665']}
                style={styles.buttonIn}
              >
              <Text style={styles.buttonText}>Add To Cart</Text>
              </LinearGradient>
              </TouchableOpacity>
            </View>
          </View> 
          </View> 

 

          </View> 
          </View>
          
      </View>
      </ScrollView>
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
        alignItems: 'center'
    },
    footer: {
        flex: 5,
        backgroundColor: '#f4f4f4',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    yellView: {
      marginTop: 30,
      marginLeft: 90, 
      marginBottom: 25,     
      backgroundColor: '#F9B900',
      width: 390,
      height: 130,
      borderRadius: 20,
      flexDirection: 'row',
      alignItems: 'flex-end',
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
      //fontFamily: 'comic-neue',
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
      //fontFamily: 'comic-neue',
      marginLeft: 60
    },
    yellImageView: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingLeft: 10,
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
      //fontFamily: 'roboto',
      fontWeight: 'bold',
      color: '#1A2E35',
      textAlign: 'left',
      fontSize: 24,
      marginLeft: 0
    },
    smallRightText:{
      fontSize: 16,
      fontWeight: 'bold',
      color: '#1BA665',
      textAlign: 'right',
      marginLeft: 210,
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
      flexDirection: 'column',
      marginBottom: 80
    },
    footerFourView:{
      flexDirection: 'row',
      marginTop: -60,
      marginBottom: 15,
      marginLeft: -15,
      marginRight: 5,
      width: 390,
      height: 300,
      justifyContent: 'space-between'
    },
    footerFourImage:{
      resizeMode: 'cover',
      borderRadius: 10
    },
    footerFiveView:{
      flexDirection: 'row',
      marginTop: -30,
      marginBottom: 15
    },
    footerSixView:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20
    },
    medicineView:{
      flexDirection: 'column' ,
      backgroundColor: '#fff',
      width: 180,
      height: 245,
      borderRadius: 20
    },
    secondMedicineView:{
      flexDirection: 'column' ,
      backgroundColor: '#fff',
      width: 160,
      height: 225,
      marginLeft: 10,
      marginTop: 10
    },
    medicineImage:{
      resizeMode: 'contain',
      width: 150,
      height: 148
    },
    medicineTextOne:{
      fontSize: 16,
      fontWeight: 'bold',
      color:'#1A2E35',
      textAlign: 'left',
      marginLeft: 15
    },
    medicineTextTwo:{
      fontSize: 12,
      fontWeight: 'normal',
      color:'#808080',
      textAlign: 'left',
      marginLeft: 15,
      marginBottom: 10
    },
    button:{
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
    buttonText:{
      color: 'white',
      fontWeight: 'bold',
      fontSize: 13
    },
    buttonIn:{
      width: 100,
      height: 30,
      justifyContent: 'center',
      borderRadius: 5,
      alignItems: 'center',
      flexDirection: 'row'
    },
});