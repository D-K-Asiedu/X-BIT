import React, { useEffect, useState, useLayoutEffect } from 'react';
import {
  Text,
  StyleSheet,
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
import Loading from '../components/Loading';



const HomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingCart, setIsLoadingCart] = useState(false)
  const [loadArticles, setLoadArticles] = useState(false)
  const [articles, setArticles] = useState([])
  const [products, setProducts] = useState([])
  const [randomFirstAid, setRandomFirstAid] = useState([])

  // Initialise cart loading and first aid items
  useEffect(() => {
    setRandomFirstAid(randomGen(firstAid, 4))
    setIsLoadingCart(true)
    return () => {
      setRandomFirstAid([])
      setIsLoadingCart(false)
    }

  }, [])

  // Load products
  // useEffect(() => {
  //   setIsLoading(true)

  //   const tempFunc = async () => {
  //     try {
  //       const tempProducts = await fetchProducts()
  //       const tempVal = randomGen(await tempProducts, 4)
  //       console.log(tempVal);

  //       setProducts(tempVal)
  //     }
  //     catch (e) {
  //       console.log(e);
  //     }
  //     finally {
  //       setTimeout(() => { setIsLoading(false) }, 2000)
  //     }
  //   }

  //   tempFunc()
  //   // setProducts([1,2,3,4])
    
  //   setTimeout(() => { setIsLoading(false) }, 2000)

  //   return () => {
  //     setProducts([])
  //   }
  // }, [])

  // Load articles
  useEffect(() => {
    setLoadArticles(true)

    const tempFunc = async () => {
      try {
        const tempArr = await fetchArticles()
        console.log(tempArr);

        setArticles(tempArr)
      }
      catch (e) {
        console.log(e);
      }
      finally {
        setTimeout(() => { setLoadArticles(false) }, 2000)
      }
    }

    tempFunc()
    // setTimeout(() => { setLoadArticles(false) }, 2000)

    return () => {
      setArticles([])
    }
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
    const max = items.length - 1
    const min = 0
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
    const arrOut = items.filter((item, index) => (
      randArr.indexOf(index) != -1
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
    hero: {
      height: 175,
      justifyContent: 'center',
      alignItems: 'center'
    },
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
      fontSize: 24,
    },
    linkText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.constant,
    },
    sectionContent: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    linkCard: {
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
      elevation: 3
    },
    linkCardText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: colors.secTextColor,
      textAlign: 'center',
      marginTop: 5,
    },
    articleBox: {
      height: 260,
    },
    products: {
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    }
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
            </Swiper>
          </View>


          <View style={{ ...globalStyles.content, backgroundColor: colors.mainBgColor}}>
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.titleText}>First aid</Text>
                <TouchableOpacity onPress={() => navigation.navigate('First-aid')}>
                  <Text style={styles.linkText}>{"See all>>"}</Text>
                </TouchableOpacity>
              </View>

              <View style={{ ...styles.sectionContent, justifyContent: 'space-between' }}>

                {randomFirstAid.map((item) => (
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
                <Text style={{...styles.titleText, color: colors.mainBgColor}}>Products</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Shop')}>
                  <Text style={{...styles.linkText, color: colors.mainBgColor}}>{"See all>>"}</Text>
                </TouchableOpacity>
              </View>

              <View style={{ ...styles.sectionContent, ...styles.products }}>

                {isLoading && <LoadingView size={45} />}
                {!isLoading &&
                  <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between'
                  }}>
                    {products == [] && <Text style={{ fontSize: 16, color: colors.tetTextColor }}>No products available</Text>}
                    {products.map((product) => (
                      <ProductCard
                        link={() => navigation.navigate('ProductDetail', product)}
                        medicine={product} key={`${product.name}${product.id}`}
                        load={setIsLoadingCart}
                      // popup={messagePopup}
                      // buttonless
                      />
                    ))}
                  </View>
                }
              </View>

            </View>

          </View>
        </ScrollView>
      </View>

      <Loading loading={!isLoadingCart} setLoading={() => { }} />
    </View>
  );


};

export default HomeScreen;