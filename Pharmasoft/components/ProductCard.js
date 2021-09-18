import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { useTheme, useColor } from '../styles/ThemeContext'


const ProductCard = ({link}) => {
    const colors = useColor()
    const theme = useTheme()

    // Styles
    const styles = StyleSheet.create({
        card:{
            width: '45%',
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
            <Image style={{width: 75, height: 75,}} source={require('../assets/home-images/medicine.png')} />
            </View>
            <View style={styles.textBox}>
                <Text style={styles.title}>Medicine</Text>
                <Text style={styles.desc}>Small Description here</Text>
            </View>
            <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>Add to cart</Text>
            </TouchableOpacity>
        </View>
        </TouchableWithoutFeedback>
    )
}

export default ProductCard