import React, { useEffect } from 'react';
import {
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  View,
  FlatList
} from 'react-native';

import { globalColours, globalStyles, images } from '../styles/global';
import {
  Feather,
  FontAwesome
} from '@expo/vector-icons';
6
import firstAid from '../data/firstAidData'
import Swipable from '../components/Swipable';
import Swiper from 'react-native-swiper';
import ArticleCarousel from '../components/ArticleCarousel';
import ProductCard from '../components/ProductCard';
import { useTheme, useColor } from '../styles/ThemeContext'


//import { useTheme } from '@react-navigation/native';


//<StatusBar backgroundColor='#1BA665' barStyle= { theme.dark ? "light-content" : "dark-content" }/>
const HomeScreen = ({ navigation }) => {

  const colors = useColor();
  const theme = useTheme();

  // const colors = {
  //   mainColor: '#1ba665',
  //   mainBgColor: '#f2f2f2'
  // }

  // Random items generator
  const randomGen = (items, number) => {
    const max = items.length
    const min = 1
    // const randInt = Math.floor(Math.random() * (max - min) + min)
    const randArr = []
    for (i = 0; i < number; i++) {
      const randInt = Math.floor(Math.random() * (max - min) + min)
      const tempValue = randInt
      if (randArr.indexOf(tempValue) < 0) {
        randArr.push(tempValue)
      }
      else {
        while (randArr.indexOf(tempValue) < 0) {
          const tempValue = Math.floor(Math.random() * (max - min) + min)
        }
        randArr.push(tempValue)
      }
    }

    // console.log(randArr);
    const arrOut = items.filter((item) => (
      randArr.indexOf(item.id) != -1
    ))

    // console.log(arrOut);
    return arrOut
  }

  // useEffect(() => {
  //   tempValue = randomGen(firstAid, 4)
  //   console.log(tempValue);
  // }, [])

  const LinkCard = ({ title, image, color, link }) => {
    return (
      <TouchableOpacity
        style={styles.linkCard}
        activeOpacity={0.7}
        onPress={() => {
          navigation.navigate('FirstAidDetails', link)
        }}
      >
        <View style={{ ...styles.linkImageBox, backgroundColor: color }}>
          <Image source={images.firstAid[image]} style={{ width: 40, height: 40 }} />
        </View>
        <Text style={styles.linkCardText}>{title}</Text>
      </TouchableOpacity>
    )
  }

  // Styles
  const styles = StyleSheet.create({
    // container: {
    // flex: 1, 
    // backgroundColor: '#1BA665'
    // },
    hero: {
      // flex: 1,
      height: 175,
      justifyContent: 'center',
      alignItems: 'center'
    },
    // footer: {
    //     flex: 5,
    //     backgroundColor: '#f4f4f4',
    //     borderTopLeftRadius: 30,
    //     borderTopRightRadius: 30,
    //     paddingVertical: 50,
    //     paddingHorizontal: 30
    // },
    // footerOneView: {
    //   flexDirection: 'row',
    //   marginTop: -30,
    //   marginBottom: 10
    // },
    section: {
      paddingVertical: 15,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    titleText: {
      fontWeight: 'bold',
      color: colors.tetColor1,
      // textAlign: 'left',
      fontSize: 24,
      // marginLeft: 0
    },
    linkText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.constant || '#1ba665',
      // textAlign: 'right',
      // marginLeft: 210,
      // marginTop: 10
    },
    sectionContent: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    linkCard: {
      // paddingHorizontal: 10,
      // borderWidth: 1,
      // borderColor: 'red',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    linkImageBox: {
      width: 60,
      height: 60,
      borderRadius: 15,
      backgroundColor: '#ffffff',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      // borderWidth: 1,
      // borderColor: 'red',
      elevation: 3
    },
    linkCardText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.secTextColor,
      textAlign: 'center',
      marginTop: 5,
    },
    articleBox: {
      height: 260,
    },
    products: {
      // flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    }

    // footerTwoView:{
    //   marginTop: 1,
    //   flexDirection: 'row',
    //   justifyContent: 'space-between',
    //   marginBottom: 18
    // },
    // footerTwoSubView:{
    //   flexDirection: 'column'
    // },
    // smallBoxView:{
    //   flexDirection: 'column',
    //   backgroundColor: 'white',
    //   borderRadius: 22,
    //   width: 75,
    //   height: 75,
    //   marginLeft: 10,
    //   marginRight: 10
    // },
    // smallBoxImage:{
    //   resizeMode: 'center'
    // },
    // smallBoxText:{
    //   fontSize: 17,
    //   fontWeight: 'bold',
    //   color: '#375A64',
    //   textAlign: 'center'
    // },

    // footerThreeView:{
    //   flexDirection: 'column',
    //   marginBottom: 80
    // },
    // footerFourView:{
    //   flexDirection: 'row',
    //   marginTop: -60,
    //   marginBottom: 15,
    //   marginLeft: -15,
    //   marginRight: 5,
    //   width: 390,
    //   height: 300,
    //   justifyContent: 'space-between'
    // },
    // footerFourImage:{
    //   resizeMode: 'cover',
    //   borderRadius: 10
    // },
    // footerFiveView:{
    //   flexDirection: 'row',
    //   marginTop: -30,
    //   marginBottom: 15
    // },
    // footerSixView:{
    //   flexDirection: 'row',
    //   justifyContent: 'space-between',
    //   marginBottom: 20
    // },
    // medicineView:{
    //   flexDirection: 'column' ,
    //   backgroundColor: '#fff',
    //   width: 180,
    //   height: 245,
    //   borderRadius: 20
    // },
    // secondMedicineView:{
    //   flexDirection: 'column' ,
    //   backgroundColor: '#fff',
    //   width: 160,
    //   height: 225,
    //   marginLeft: 10,
    //   marginTop: 10
    // },
    // medicineImage:{
    //   resizeMode: 'contain',
    //   width: 150,
    //   height: 148
    // },
    // medicineTextOne:{
    //   fontSize: 16,
    //   fontWeight: 'bold',
    //   color:'#1A2E35',
    //   textAlign: 'left',
    //   marginLeft: 15
    // },
    // medicineTextTwo:{
    //   fontSize: 12,
    //   fontWeight: 'normal',
    //   color:'#808080',
    //   textAlign: 'left',
    //   marginLeft: 15,
    //   marginBottom: 10
    // },
    // button:{
    //   alignItems: 'flex-end',
    //   justifyContent: 'center',
    // },
    // buttonText:{
    //   color: 'white',
    //   fontWeight: 'bold',
    //   fontSize: 13
    // },
    // buttonIn:{
    //   width: 100,
    //   height: 30,
    //   justifyContent: 'center',
    //   borderRadius: 5,
    //   alignItems: 'center',
    //   flexDirection: 'row'
    // },
  });


  return (
    <View style={{ ...globalStyles.container, backgroundColor: colors.mainColor }}>
      <View style={{ ...globalStyles.header, backgroundColor: colors.mainColor }}>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
        >
          <Feather name="menu" size={30} color='#ffffff' />
        </TouchableOpacity>
        <Text style={globalStyles.h2}>Home</Text>
        <TouchableOpacity>
          <FontAwesome name="bell" size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <View style={{ 
        ...globalStyles.content, 
        backgroundColor: colors.mainColor ,
        paddingHorizontal: 0,
      }}>
      <ScrollView>
        <View style={styles.hero}>
          <Swiper
            loop={false}
            activeDotStyle={
              { width: 10, height: 10, backgroundColor: '#f9b900', borderRadius: 5, elevation: 2 }
            }
            dotStyle={
              { width: 8, height: 8, backgroundColor: '#f9b90066', borderRadius: 5, }
            }
          >
            <Swipable />
            <Swipable />
          </Swiper>
        </View>


        <View style={{ ...globalStyles.content, backgroundColor: colors.mainBgColor }}>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.titleText}>First aid</Text>
              <TouchableOpacity onPress={() => navigation.navigate('First-aid')}>
                <Text style={styles.linkText}>{"See all>>"}</Text>
              </TouchableOpacity>
            </View>

            <View style={{ ...styles.sectionContent, justifyContent: 'space-between' }}>
              {/* <LinkCard title="Poison" image="poison" />
                <LinkCard title="Bruises" image="plaster" />
                <LinkCard title="Burns" image="fire" />
                <LinkCard title="Asthma" image="lung" /> */}

              {/* <FlatList
                  data = {randomGen(firstAid, 4)}
                  renderItem = {({item}) => (
                    <LinkCard title={item.title} image={item.image} color={globalColours.firstAid[item.image]} />
                  )} 
                /> */}

              {randomGen(firstAid, 4).map((item) => (
                <LinkCard
                  key={item.id}
                  title={item.title}
                  image={item.image}
                  color={globalColours.firstAid[item.image]}
                  link={item}
                />
              ))}

            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.titleText}>Articles</Text>
            </View>
            <View style={{ ...styles.sectionContent, ...styles.articleBox }}>
              <Swiper
                autoplay={true}
                autoplayTimeout={10}
                activeDotStyle={
                  { width: 10, height: 10, backgroundColor: colors.constant, borderRadius: 5, elevation: 2 }
                }
                dotStyle={
                  { width: 8, height: 8, backgroundColor: `${colors.constant}66`, borderRadius: 5, }
                }
              >
                <ArticleCarousel />
                <ArticleCarousel />
                <ArticleCarousel />
                <ArticleCarousel />
              </Swiper>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.titleText}>Products</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Shop')}>
                <Text style={styles.linkText}>{"See all>>"}</Text>
              </TouchableOpacity>
            </View>

            <View style={{ ...styles.sectionContent, ...styles.products }}>
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />

            </View>

          </View>


          {/*
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
          */}
        </View>
      </ScrollView>
      </View>
    </View>
  );


};

export default HomeScreen;