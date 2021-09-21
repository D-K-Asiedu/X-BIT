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
    const [quantity, setQuantity] = useState([])

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
            // const updatedCart = filteredCart.map((item) => ({...item,}))
            
            // console.log();
            // console.log(updatedCart);
            setCart([])
            await updateCart()
            setCart(await fetchCart())
            // setCart([...filteredCart, ])    
        }
        catch(e){
            console.log(e)
        }   
        
        setIsLoading(false)
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

    //Update cart quantity
    const updateQuantity = (id, data) => {
        // console.log(id, data);
        // const dataIds = quantity.map((item) => item.id)
        // console.log(`data ids are:${dataIds}`);
        // if(dataIds.indexOf(id) != -1){
        //     console.log(`branch: exists`);
        //     console.log([...quantity, {id: id, 'product quantity': data}]);
        //     setQuantity((prevQuantity) => [...prevQuantity, {id: id, 'product quantity': data}])
        // }
        // else{
        //     console.log(`branch: does not exist`);
        //     const restOfQuantity = quantity.filter((item) => item.id == id)
        //     console.log([...restOfQuantity, {id: id, 'product quantity': data}]);
        //     setQuantity([...restOfQuantity, {id: id, 'product quantity': data}])
        // }

        const filteredQuantity = quantity.filter((item) => item.id != id)

        console.log([...filteredQuantity, {id: id, 'product quantity': data}]);
        setQuantity((prevQuantity) => [...filteredQuantity, {id: id, 'product quantity': data}])

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
            // navigation.navigate('MainDrawer')
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
            // backgroundColor: 'red',
            paddingVertical: 10,
        },
        emptyView:{
            flex: 1,
            // backgroundColor: 'red',
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

            <View style={{ ...globalStyles.content, backgroundColor: colors.mainBgColor }}>
                <View style={styles.cartBox}>
                    <FlatList 
                        data={cart}
                        renderItem={({item, index}) => (
                            <CartItem product={item} deleteProduct={deleteProduct} updateCount={updateQuantity} />
                        )}
                        extraData={cart}
                        keyExtractor={(item, index) => item.toString()+ index.toString()}
                    />
                    {/* {cart.map((item) => (
                        <CartItem product={item} deleteProduct={deleteProduct} updateCount={updateQuantity} />
                    ))} */}
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
            </View>

            <Loading loading={isLoading} setLoading={() => {}} />
        </View>
    )
}

export default CartScreen
