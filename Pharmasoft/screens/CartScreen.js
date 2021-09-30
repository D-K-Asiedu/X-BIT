import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, FlatList } from 'react-native'
import { Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons'
import { globalStyles, globalColours } from '../styles/global'
import { useTheme, useColor } from '../styles/ThemeContext'
import Button from '../components/Button'
import CartItem from '../components/CartItem'
import { useAuth } from '../routes/AuthContext'
import Loading from '../components/Loading'
import PopupMessage from '../functions/PopupMessage'

const CartScreen = ({ navigation }) => {
    const theme = useTheme()
    const colors = useColor()
    const server = useAuth().server

    const [cart, setCart] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [quantity, setQuantity] = useState([])
    const [updatedCart, setUpdatedCart] = useState([])

    useEffect(() => {
        setIsLoading(true)
        const tempFunc = async() => {
            setCart(await fetchCart())
            setUpdatedCart(await fetchCart())
        }

        tempFunc()

        return () => {
            setCart([])
            setUpdatedCart([])
        }
    }, [])

    // Get cart items
    const fetchCart = async() => {
        const res = await fetch(`${server}/cart`, {
            method: 'GET',
        })

        try{
            const data = await res.json()
            await data && setIsLoading(false)
            console.log(data);
    
            return data
    
        }
        catch(e){
            console.log(e);
            return []
        }
    }

    // Delete product from cart
    const deleteProduct = async (id) => {
        setIsLoading(true)
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
            // setCart([])
            // setCart((prevCart) => prevCart)
            await updateCart()
            setCart([])
            setCart(updatedCart.filter((item) => item.id != id))
            // setCart(filteredCart)
            // setCart(await fetchCart())
        }
        catch(e){
            console.log(e)
            PopupMessage(
                'Delete unsuccessful',
                'Caused by an unknown error',
                'danger',
                2000,
                {top: 100},
                {},
                {}
            )
        }   
        
        setIsLoading(false)
    }

    //Update cart quantity
    const updateQuantity = (id, data) => {

        const filteredQuantity = quantity.filter((item) => item.id != id)

        console.log([...filteredQuantity, {id: id, 'product quantity': data}]);
        setQuantity((prevQuantity) => [...filteredQuantity, {id: id, 'product quantity': data}])

        const filteredCart = cart.filter((item) => item.id != id)
        let activeCartItem = cart.filter((item) => item.id == id)
        activeCartItem = activeCartItem[0]
        console.log('activeCart', activeCartItem);
        // console.log('Updated active cart', {...activeCartItem[0], 'product quantity': data});
        // console.log('filtered cart', filteredCart);
        console.log('Delete filter',[...filteredCart, {...activeCartItem, 'product quantity': data}]);
        setUpdatedCart([...filteredCart, {...activeCartItem, 'product quantity': data}])

    }

    // Update cart
    const updateCart = async () => {
        const data = quantity
        const res = await fetch(`${server}/update-cart-bulk`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        try{
            const updateDetails = await res.json()
            console.log(updateDetails);
        }
        catch(e){
            console.log(e);
        }
    }

    // Go back
    const goBack = async() => {
        navigation.goBack()
        await updateCart()
    }

    // Clear cart and navigate to shop or home
    const clearCart = async() => {
        setIsLoading(true)
        const res = await fetch(`${server}/clear-cart`, {
            method: 'GET',
        })

        try{
            const data = await res.json()
            console.log(data);
            await data && setCart([])
        }
        catch(e){
            console.log(e);
        }

        setIsLoading(false)
    }

    // to checkout
    const toCheckout = async() => {
        setIsLoading(true)
        await updateCart() && setCart(await fetchCart())

        const data = await fetchCart()
        await fetchCart() && navigation.navigate('Checkout', data)
        setIsLoading(false)
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
            paddingVertical: 10,
        },
        emptyView:{
            flex: 1,
            alignItems: 'center',
        },
        emptyText:{
            fontSize: 18,
            fontWeight: 'bold',
            color: colors.tetTextColor
        }
    })


    return (
        <View style={{ ...globalStyles.container, backgroundColor: colors.mainColor }}>
            <View style={{ ...globalStyles.header, ...styles.header }}>
                <TouchableOpacity
                    onPress={() => goBack()}
                >
                    <Ionicons name="arrow-back" size={30} color="#ffffff" />
                </TouchableOpacity>
                <Text style={{ ...globalStyles.h2, ...styles.pageTitle }}>Cart</Text>
            </View>

            {<View style={{ ...globalStyles.content, backgroundColor: colors.mainBgColor }}>
                <View style={styles.cartBox}>
                    <FlatList 
                        data={cart}
                        renderItem={({item, index}) => (
                            <CartItem product={item} deleteProduct={deleteProduct} updateCount={updateQuantity} />
                        )}
                        extraData={cart}
                        keyExtractor={(item, index) => item.toString()+ index.toString()}
                    />
                </View>
                
                {!cart[0] && <View style={styles.emptyView}>
                    <Text style={styles.emptyText}>Cart is empty 🛒</Text>
                </View>}

                {cart[0] && <View style={styles.footer}>
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
                        onPress={() => clearCart()}
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
                        onPress={() => toCheckout()}
                    />
                </View>}

            </View>}

            <Loading loading={isLoading} setLoading={() => {}} />
        </View>
    )
}

export default CartScreen
