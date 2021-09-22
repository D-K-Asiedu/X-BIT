import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { useTheme, useColor } from '../styles/ThemeContext'
import { useAuth } from '../routes/AuthContext'
import AccessDenied from '../functions/AccessDenied'


const ProductCard = ({link, medicine, load}) => {
    const colors = useColor()
    const theme = useTheme()
    const server = useAuth().server
    const isLoggedIn = useAuth().isLoggedIn

    // const medicineImg = medicine.image
    // const image = false ? require(medicineImg) : require('../assets/home-images/medicine.png')
    const image = require('../assets/home-images/medicine.png')

    //Add to cart
    const addToCart = async () => {
        load(false)
        if(isLoggedIn){
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
            }
            catch(e){
                console.log(e)
            }    
        }
        else{
            AccessDenied('cart', 'add items to cart')
        }
        load(true)
    }

    // Styles
    const styles = StyleSheet.create({
        card:{
            width: '48%',
            // height: 230,
            padding: 10,
            // borderColor: '#999999',
            borderRadius: 15,
            marginVertical: 10, 
            backgroundColor: colors.secBgColor,
    
            elevation: 2,
    
        },
        textBox:{
            marginVertical: 5,
        },
        title:{
            fontSize: 18,
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
            <Image style={{width: 75, height: 75,}} source={image} />
            </View>
            <View style={styles.textBox}>
                <Text style={styles.title}>{medicine.name}</Text>
                {/* <Text style={styles.desc}>{medicine.description}</Text> */}
                <Text style={styles.desc}>{`Location : ${medicine.location}`}</Text>
            </View>
            <TouchableOpacity style={styles.btn} onPress={addToCart}>
                <Text style={styles.btnText}>Add to cart</Text>
            </TouchableOpacity>
        </View>
        </TouchableWithoutFeedback>
    )
}

export default ProductCard