import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet } from 'react-native'
import { Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons'
import { globalStyles, globalColours } from '../styles/global'
import ErrorPageCard from '../components/ErrorPageCard'
import { useTheme, useColor } from '../styles/ThemeContext'
import ProductCard from '../components/ProductCard'
import { useAuth } from '../routes/AuthContext'
import Loading from '../components/Loading'
import AccessDenied from '../functions/AccessDenied'
import LoadingView from '../components/LoadingView'

const ShopScreen = ({ navigation }) => {
    // const [mainColor, setMainColour] = useState('')

    const theme = useTheme()
    const colors = useColor()
    const server = useAuth().server
    const isLoggedIn = useAuth().isLoggedIn
    const [products, setProducts] = useState([])
    const [searchedProducts, setSearchedProducts] = useState([])
    const [isLoaded, setIsLoaded] = useState(true)
    const [isLoadedMain, setIsLoadedMain] = useState(false)
    const [searchActive, setSearchActive] = useState(false)
    const [searchText, setSearchText] = useState('')

    useEffect(() => {
        setSearchActive(false)
        console.log('fetching...');

        const tempFunc = async () => {
            setProducts(await fetchProducts())
        }

        tempFunc()

        return () => {
            setProducts([])
        }
    }, [])


    // Fetch products
    const fetchProducts = async () => {
        setIsLoadedMain(false)
        const res = await fetch(`${server}/products`, {
            method: 'GET',
        })

        const data = await res.json()
        console.log(await data)
        await data && setTimeout(() => setIsLoadedMain(true), 100)
        return data
    }

    // Search through items
    const search = () => {
        if (searchText != '') {
            setSearchActive(true)
            console.log(searchText);

            const temp = products.filter(({ name }) => name.indexOf(searchText) != -1)
            setSearchedProducts(temp)
        }
    }

    //Styles
    const styles = StyleSheet.create({
        searchBox: {
            paddingTop: 10,
            paddingBottom: 2,
        },
        searchBar: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.secBgColor,
            padding: 10,
            borderRadius: 20,
            elevation: 3,
        },
        searchInput: {
            // padding: 5,
            flex: 1,
            fontSize: 16,
            color: colors.mainTextColor,
            marginRight: 5,
        }
    })


    return (
        <View style={{ ...globalStyles.container, backgroundColor: colors.mainColor }}>
            <View style={{ ...globalStyles.header, backgroundColor: colors.mainColor }}>
                <TouchableOpacity
                    onPress={() => navigation.openDrawer()}
                >
                    <Feather name="menu" size={30} color='#ffffff' />
                </TouchableOpacity>
                <Text style={globalStyles.h2}>Shop</Text>
                <TouchableOpacity
                    onPress={() => isLoggedIn ? navigation.navigate('Cart') : AccessDenied('cart')}
                >
                    <FontAwesome5 name="cart-plus" size={22} color="#ffffff" />
                </TouchableOpacity>
            </View>

            <View style={{ ...globalStyles.content, backgroundColor: colors.mainBgColor }}>
                <View style={styles.searchBox}>
                    <View style={styles.searchBar}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search product ..."
                            placeholderTextColor={colors.tetTextColor}
                            onChangeText={text => { setSearchText(text); setSearchActive(false) }}
                        />
                        <TouchableOpacity onPress={search}>
                            <Ionicons name="search" size={22} color={colors.constant} />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView>
                    {searchActive &&
                        <View style={{ paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ ...globalStyles.h3, color: colors.tetColor2, fontWeight: 'normal' }}>Search results for {searchText} </Text>
                            <TouchableOpacity onPress={() => setSearchActive(false)}>
                                <Ionicons name="close" size={22} color='red' />
                            </TouchableOpacity>
                        </View>
                    }
                    {isLoadedMain &&
                        <View style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between'
                        }}>
                            {!searchActive &&
                                products.map((product) => (
                                    <ProductCard
                                        link={() => navigation.navigate('ProductDetail', product)}
                                        medicine={product} key={`${product.name}${product.id}`}
                                        load={setIsLoaded}
                                    />
                                ))}

                            {searchActive && searchedProducts[0] &&
                                searchedProducts.map((product) => (
                                    <ProductCard
                                        link={() => navigation.navigate('ProductDetail', product)}
                                        medicine={product} key={`${product.name}${product.id}`}
                                        load={setIsLoaded}
                                    />
                                ))}
                            {searchActive && !searchedProducts[0] &&
                            <View style={{flex: 1, paddingVertical: 100, alignItems: 'center'}}>
                                <Text style={{...globalStyles.h3, color: colors.tetColor2}}>No results</Text>
                                </View>
                            }

                        </View>}
                    {!isLoadedMain &&
                        <View style={{ paddingVertical: 200 }}>
                            <LoadingView size={50} />
                        </View>
                    }
                </ScrollView>
            </View>

            <Loading loading={!isLoaded} setLoading={() => { }} />
        </View>
    )
}

export default ShopScreen
