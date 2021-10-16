import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { useTheme, useColor } from '../styles/ThemeContext'
import { useAuth } from '../routes/AuthContext'
import AccessDenied from '../functions/AccessDenied'
import PopupMessage from '../functions/PopupMessage'


const ProductCard = ({link, medicine, buttonless, load, popup}) => {
    const colors = useColor()
    const theme = useTheme()
    const server = useAuth().server
    const isLoggedIn = useAuth().isLoggedIn

    const image = require('../assets/home-images/medicine.png')

    //Add to cart
    const addToCart = async () => {
        if(isLoggedIn){
            load(false)

            const data = {id: medicine.id}
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
                    {top: 100},
                    {},
                    {}
                )
            } 
            load(true)   
        }
        else{
            AccessDenied('cart', 'add items to cart')
        }
    }

    // Styles
    const styles = StyleSheet.create({
        card:{
            width: '48%',
            padding: 10,
            borderRadius: 15,
            marginVertical: 10, 
            backgroundColor: colors.secBgColor,
    
            elevation: 2,
    
        },
        textBox:{
            marginVertical: 5,
        },
        title:{
            fontSize: 16,
            fontWeight: 'bold',
            color: colors.mainTextColor
        },
        desc:{
            fontSize: 14,
            color: colors.tetTextColor
        },
        btn:{
            backgroundColor: colors.constant,
            padding: 7,
            borderRadius: 5,
            alignSelf: 'flex-end',
        },
        btnText:{
            color: '#ffffff',
            fontWeight: 'bold'  
        }
    
    })    

    return (
        <TouchableWithoutFeedback onPress={() => link()}>
        <View style={styles.card}>
            <View style={{width: 150, height: 150, justifyContent: 'center', alignItems: 'center'}}>
            <Image 
                style={{width: 125, height: 125,}} 
                source={{uri: `${server}${medicine.image}`}}
                defaultSource={image} 
            />
            </View>
            <View style={styles.textBox}>
                <Text style={styles.title}>{medicine.name.length <= 15 ? medicine.name: `${medicine.name.substring(0, 14)}...`}</Text>
                <Text style={styles.desc}>{medicine.description}</Text>
            </View>
            {!buttonless && <TouchableOpacity style={styles.btn} onPress={addToCart}>
                <Text style={styles.btnText}>Add to cart</Text>
            </TouchableOpacity>}
        </View>
        </TouchableWithoutFeedback>
    )
}

export default ProductCard