import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, FlatList } from 'react-native'
import { Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons'
import { globalStyles, globalColours } from '../styles/global'
import ErrorPageCard from '../components/ErrorPageCard'
import { useTheme, useColor } from '../styles/ThemeContext'
import Button from '../components/Button'
import CartItem from '../components/CartItem'
import { useAuth } from '../routes/AuthContext'
import Loading from '../components/Loading'

const CartScreen = ({ navigation }) => {
    // const [mainColor, setMainColour] = useState('')

    const theme = useTheme()
    const colors = useColor()
    const server = useAuth().server

    const [cart, setCart] = useState([])
    const [isLoading, setIsLoading] = useState(false)

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

    useEffect(() => {
        setIsLoading(true)
        const tempFunc = async() => {
            setCart(await fetchCart())
        }

        tempFunc()
    }, [])

    // Get cart items
    const fetchCart = async() => {
        const res = await fetch(`${server}/cart`, {
            method: 'GET',
        })

        const data = await res.json()
        await data && setIsLoading(false)
        console.log(data);

        return data
    }

    // Delete product from cart
    const deleteProduct = async (id) => {
        const data = {id: id, action: 'delete'}
        const res = await fetch(`${server}/update-cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        try{
            const cartDetails = await res.json()
            console.log(cartDetails);

            const filteredCart = cart.filter((item) => item.id != id )
            setCart(filteredCart)    
        }
        catch(e){
            console.log(e)
        }    

    }

    // Add 1 to cart item
    const addProduct = async(id) => {
        const data = {id: id, action: 'add'}
        const res = await fetch(`${server}/update-cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        try{
            const cartDetails = await res.json()
            console.log(cartDetails);

            // setCart(await fetchCart())
        }
        catch(e){
            console.log(e)
        }    

    }

    // Remove 1 from cart item
    const removeProduct = async(id) => {
        const data = {id: id, action: 'remove'}
        const res = await fetch(`${server}/update-cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        try{
            const cartDetails = await res.json()
            console.log(cartDetails);

            setCart(await fetchCart())
        }
        catch(e){
            console.log(e)
        }
        
        return true
    }

    //Styles
    const styles = StyleSheet.create({
        header: {
            backgroundColor: colors.mainColor,
            justifyContent: 'flex-start'
        },
        pageTitle: {
            marginLeft: 30,
        },
        cartBox:{
            flex: 1,
        },
        footer:{
            flexDirection: 'row',
            // backgroundColor: 'red',
            paddingVertical: 10,
        }
    })


    return (
        <View style={{ ...globalStyles.container, backgroundColor: colors.mainColor }}>
            <View style={{ ...globalStyles.header, ...styles.header }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={30} color="#ffffff" />
                </TouchableOpacity>
                <Text style={{ ...globalStyles.h2, ...styles.pageTitle }}>Cart</Text>
            </View>

            <View style={{ ...globalStyles.content, backgroundColor: colors.mainBgColor }}>
                <View style={styles.cartBox}>
                    <FlatList 
                        data={cart}
                        renderItem={({item, index}) => (
                            <CartItem product={item} deleteProduct={deleteProduct} add={addProduct} remove={removeProduct} />
                        )}
                        keyExtractor={(item, index) => item.toString()+ index.toString()}
                    />
                </View>

                <View style={styles.footer}>
                    <Button
                        title="CLEAR CART"
                        color={colors.constant}
                        bgColor={"transparent"}
                        border1={colors.constant}
                        textStyle={{
                            fontSize: 16,
                        }}
                        style={{
                            flex: 1,
                            marginRight: 10,
                        }}
                        onPress={() => navigation.navigate('MainDrawer')}
                    />
                    <Button
                        title="CHECKOUT"
                        color='#ffffff'
                        bgColor={colors.constant}
                        textStyle={{
                            fontSize: 16,
                        }}
                        style={{
                            flex: 1,
                            marginLeft: 10,
                        }}
                        onPress={() => navigation.navigate('Checkout')}
                    />
                </View>
            </View>

            <Loading loading={isLoading} setLoading={() => {}} />
        </View>
    )
}

export default CartScreen
