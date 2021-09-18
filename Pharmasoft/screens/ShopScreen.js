import React, {useState, useEffect} from 'react'
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet } from 'react-native'
import { Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons'
import { globalStyles, globalColours } from '../styles/global'
import ErrorPageCard from '../components/ErrorPageCard'
import { useTheme, useColor } from '../styles/ThemeContext'
import ProductCard from '../components/ProductCard'
import { Colors } from 'react-native/Libraries/NewAppScreen'

const ShopScreen = ({navigation}) => {
    // const [mainColor, setMainColour] = useState('')

    const theme = useTheme()
    const colors = useColor()
  
    // useEffect(() => {
    //   switch (theme.colortheme) {
    //     case 'green':
    //       setMainColour(globalColours.mainCol)
    //       break;
    //     case 'blue':
    //       setMainColour(globalColours.mainCol2)
    //       break;
    //     case 'pink':
    //       setMainColour(globalColours.mainCol3)
    //       break;
    
      
    //     default:
    //       break;
    //   }
    // }, [theme.colortheme])

    //Styles
    const styles = StyleSheet.create({
        searchBox:{
            paddingTop: 10,
            paddingBottom: 2,
        },
        searchBar:{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.secBgColor,
            padding: 10,
            borderRadius: 20,
            elevation: 3,
        },
        searchInput:{
            // padding: 5,
            flex: 1,
            fontSize: 16,
            color: colors.mainTextColor,
            marginRight: 5,           
        }
    })


    return (
        <View style={{...globalStyles.container, backgroundColor: colors.mainColor}}>
            <View style={{...globalStyles.header, backgroundColor: colors.mainColor}}>
                <TouchableOpacity
                    onPress={() => navigation.openDrawer()}
                >
                    <Feather name="menu" size={30} color='#ffffff' />
                </TouchableOpacity>
                <Text style={globalStyles.h2}>Shop</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Cart')}
                >
                    <FontAwesome5 name="cart-plus" size={22} color="#ffffff" />
                </TouchableOpacity>
            </View>

            <View style={{...globalStyles.content, backgroundColor: colors.mainBgColor}}>
            <View style={styles.searchBox}>
                <View style={styles.searchBar}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search product ..."
                    placeholderTextColor= {colors.tetTextColor} 
                />
                <TouchableOpacity>
                <Ionicons name="search" size={22} color={colors.constant} />
                </TouchableOpacity>
                </View>
                </View>
                <ScrollView>
                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-around'
                    }}>
                    <ProductCard link={() => navigation.navigate('ProductDetail')} />
                    <ProductCard link={() => navigation.navigate('ProductDetail')} />
                    <ProductCard link={() => navigation.navigate('ProductDetail')} />
                    <ProductCard link={() => navigation.navigate('ProductDetail')} />
                    <ProductCard link={() => navigation.navigate('ProductDetail')} />
                    <ProductCard link={() => navigation.navigate('ProductDetail')} />
                    <ProductCard link={() => navigation.navigate('ProductDetail')} />
                    <ProductCard link={() => navigation.navigate('ProductDetail')} />
                    </View>
                </ScrollView>
            </View>

        </View>
    )
}

export default ShopScreen
