import React, { useEffect, useState } from 'react';
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
import firstAid from '../data/firstAidData'
import Swipable from '../components/Swipable';
import Swiper from 'react-native-swiper';
import ArticleCarousel from '../components/ArticleCarousel';
import ProductCard from '../components/ProductCard';
import { useTheme, useColor } from '../styles/ThemeContext'
import LoadingView from '../components/LoadingView';
import { useAuth } from '../routes/AuthContext';
import ArticleCard from '../components/ArticleCard';


const HomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [loadArticles, setLoadArticles] = useState(false)
  const [articles, setArticles] = useState([])
  const [products, setProducts] = useState([])


  useEffect(() => {
    setIsLoading(true)

    const tempFunc = async () => {
      const products = await fetchProducts()

      console.log(products);

      setProducts(products)
    }

    tempFunc()
    setTimeout(() => { setIsLoading(false) }, 1000)
  }, [])

  useEffect(() => {
    setLoadArticles(true)

    const tempFunc = async () => {
      const tempArr = await fetchArticles()
      console.log(tempArr);

      setArticles(tempArr)
    }

    tempFunc()
    setTimeout(() => { setLoadArticles(false) }, 1000)
  }, [])


  const colors = useColor();
  const theme = useTheme();
  const server = useAuth().server

  // Fetch articles
  const fetchArticles = async () => {
    const res = await fetch(`${server}/articles`, {
      method: 'GET',
    })

    const data = await res.json()

    // console.log(data);
    return data
  }

  // Fetch products
  const fetchProducts = async () => {
    const res = await fetch(`${server}/products`, {
      method: 'GET',
    })

    try {
      const data = await res.json()
      console.log(await data)
      await data && setTimeout(() => setIsLoading(false), 100)
      return data
    }
    catch (e) {
      console.log(e);
      setTimeout(() => setIsLoading(false), 100)
      return []
    }
  }

  // Random items generator
  const randomGen = (items, number) => {
    const max = items.length
    const min = 1
    // const randInt = Math.floor(Math.random() * (max - min) + min)
    const randInt = () => Math.floor(Math.random() * (max - min) + min)
    const randArr = []
    var tempValue = 0
    for (i = 0; i < number; i++) {
      tempValue = randInt()
      while (randArr.indexOf(tempValue) != -1) {
        tempValue = randInt()
      }
      randArr.push(tempValue)

    }

    // console.log(randArr);
    const arrOut = items.filter((item) => (
      randArr.indexOf(item.id) != -1
    ))

    // console.log(arrOut);
    return arrOut
  }

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
        backgroundColor: colors.mainColor,
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
                {!loadArticles &&
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
                    {articles.map((item, index) => (
                      <ArticleCarousel
                        key={index}
                        text={item.title}
                        image={item.image}
                        link={item.link}
                      />
                    ))}
                  </Swiper>
                }
                {loadArticles && <LoadingView size={45} />}
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

                {isLoading && <LoadingView size={45} />}
                {!isLoading &&
                  <View>
                    <Text>No products available</Text>
                  </View>
                }
              </View>

            </View>


          </View>
        </ScrollView>
      </View>
    </View>
  );


};

export default HomeScreen;