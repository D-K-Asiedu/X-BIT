import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, Image } from 'react-native'
import {Ionicons,} from '@expo/vector-icons'
import { globalStyles, globalColours } from '../styles/global'
import { useTheme, useColor } from '../styles/ThemeContext'
import { useAuth } from '../routes/AuthContext'
import Button from '../components/Button'
import Loading from '../components/Loading'
import AccessDenied from '../functions/AccessDenied'
import { StatusBar } from 'expo-status-bar'
import PopupMessage from '../functions/PopupMessage'

const ProductDetailScreen = ({ navigation, route }) => {
    const [isLoading, setIsLoading] = useState(false)

    const theme = useTheme()
    const colors = useColor()
    const product = route.params
    const isLoggedIn = useAuth().isLoggedIn
    const server = useAuth().server

    const image = require('../assets/home-images/medicine.png')

    const [loaded, setLoaded] = useState(false)
    const [failed, setFailed] = useState(false)
    const [productImage, setProductImage] = useState(null)

    useEffect(() => {
        setProductImage(!loaded? image: failed? image : {uri: `${server}${product.image}`})
        return () => {
            setProductImage(image)
        }
    }, [loaded, failed])


        //Add to cart
        const addToCart = async () => {
            setIsLoading(true)
            if(isLoggedIn){
                const data = {id: product.id}
                const res = await fetch(`${server}/add-cart`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
        
                try{
                    const cartDetails = await res.json()
                    console.log(cartDetails);
                    PopupMessage(
                        'Added to cart',
                        '',
                        'success',
                        1000,
                        {top: 100},
                        {},
                        {}
                    )
                }
                catch(e){
                    console.log(e)
                    PopupMessage(
                        'Failed to add to cart',
                        '',
                        'danger',
                        1000,
                        {top: 30},
                        {},
                        {}
                    )
                }    
            }
            else{
                AccessDenied('cart', 'add items to cart')
            }

            setIsLoading(false)
        }
    

    //Styles
    const styles = StyleSheet.create({
        content: {
            backgroundColor: colors.secBgColor,
            paddingHorizontal: 0,
            paddingTop: 0,
            borderTopStartRadius: 0,
            borderTopEndRadius: 0,
        },
        imageBox: {
            height: 250,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.secBgColor,
            paddingBottom: 70,
        },
        textBox:{
            paddingTop: 20,
            paddingBottom: 5,
            backgroundColor: colors.mainBgColor,
            alignItems: 'center',
        },
        title:{
            color: colors.tetColor2,
        },
        desc:{
            fontSize: 16,
            color: colors.mainTextColor,
            // fontWeight: 'bold'
        },
        footer:{
            width: '90%',
            position: 'absolute',
            bottom: 20,
            right: '5%',
        }
    })


    return (
        <View style={{ ...globalStyles.container, backgroundColor: colors.secBgColor }}>
            <View style={{ ...globalStyles.header, backgroundColor: colors.secBgColor, }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={30} color={colors.constant} />
                </TouchableOpacity>
            </View>


            <View style={{ ...globalStyles.content, ...styles.content }}>
                <View style={styles.imageBox}>
                    <Image 
                        style={{width: productImage == image? 125 :250, height: productImage == image? 125:250, }} 
                        source={productImage}
                        // defaultSource={image}
                        onError={() => setFailed(true)}
                        onLoadEnd={() => setLoaded(true)}        
                    />
                </View>
                <View style={{...globalStyles.content, ...styles.textBox}}>
                    <ScrollView>
                        <Text style={{...globalStyles.h2, ...styles.title}}>{product.name}</Text>
                        <Text style={styles.desc}>{product.description}</Text>
                        <Text style={styles.desc}>Price: GH₵ {product.price}</Text>
                        <Text style={styles.desc}>Quantity left: {product.quantity_available}</Text>

                    </ScrollView>
                </View>
            </View>
            <View style={styles.footer}>
                <Button
                  title="ADD TO CART"
                  color='#ffffff'
                  bgColor={colors.constant}
                  textStyle={{
                      fontSize: 16
                  }}
                  onPress={addToCart}
                />
            </View>

            <Loading loading={isLoading} setLoading={() => {}} />
            <StatusBar style={theme.darkmode? 'light': 'dark'} />
        </View>
    )
}

export default ProductDetailScreen
