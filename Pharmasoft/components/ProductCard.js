import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'

const ProductCard = () => {
    return (
        <View style={styles.card}>
            <Image style={{width: 150, height: 150,}} source={require('../assets/home-images/fluxamox.png')} />
            {/* <View style={{width: 150, height: 150,}}></View> */}
            <View style={styles.textBox}>
                <Text style={styles.title}>Medicine</Text>
                <Text style={styles.desc}>Small Description here</Text>
            </View>
            <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>Add to cart</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ProductCard

const styles = StyleSheet.create({
    card:{
        padding: 10,
        borderColor: '#999999',
        borderRadius: 15,
        marginVertical: 10, 
        backgroundColor: '#ffffff',

        elevation: 2,

    },
    textBox:{
        marginVertical: 5,
    },
    title:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333'
    },
    desc:{
        fontSize: 14,
        color: '#696969'
    },
    btn:{
        backgroundColor: '#1ba665',
        padding: 7,
        borderRadius: 5,
        alignSelf: 'flex-end',
    },
    btnText:{
        color: '#ffffff',
        fontWeight: 'bold'  
    }

})
