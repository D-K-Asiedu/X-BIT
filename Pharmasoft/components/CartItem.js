import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { useTheme, useColor } from '../styles/ThemeContext'
import { globalStyles } from '../styles/global'
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { useAuth } from '../routes/AuthContext';

const CartItem = ({product, deleteProduct, updateCount}) => {
    const [count, setCount] = useState(product['product quantity'])
    const [active, setActive] = useState(false)

    const [loaded, setLoaded] = useState(false)
    const [failed, setFailed] = useState(false)
    const [image, setImage] = useState(require('../assets/home-images/medicine.png'))

    useEffect(() => {
        setImage(!loaded? require('../assets/home-images/medicine.png'): failed? require('../assets/home-images/medicine.png') : {uri: `${server}${product.image}`})
        return () => {
            setImage(require('../assets/home-images/medicine.png'))
        }
    }, [loaded, failed])


    // Update count value outside component
    useEffect(() => {
        updateCount(product.id, count)
    }, [count])

    const colors = useColor()
    const themes = useTheme()
    const server = useAuth().server

    // Count
    const countUp = async () => {
        count < (product.quantity_left || 69) && setCount(prevCount => prevCount + 1)
    }

    const countDown = async () => {
        count > 1 && setCount(prevCount => prevCount - 1)
    }

    // Toggle
    const toggle = () => {
        setActive((prevValue => !prevValue))
    }

    // Styles
    const styles = StyleSheet.create({
        card: {
            flexDirection: 'row',
            marginVertical: 7,
            backgroundColor: colors.secBgColor,
            borderRadius: 20,
            elevation: 2,
        },
        imageBox: {
            padding: 20,
        },
        textBox: {
            padding: 20,
            flex: 1,
            justifyContent: 'center',
        },
        cardTitle: {
            color: colors.tetColor2,
        },
        countBox: {
            paddingHorizontal: 20,
            justifyContent: 'center',
            alignItems: 'center',
        },
        cardBtn: {
            padding: 3,
            backgroundColor: colors.constant,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            width: 22,
        },
        desc: {
            color: colors.tetTextColor,
            fontSize: 14,
        },
        delBox: {
            backgroundColor: 'red',
            padding: 10,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            justifyContent: 'center'
        }
    })

    return (
        <TouchableWithoutFeedback onPress={toggle}>
            <View style={styles.card}>
                <View style={styles.imageBox}>
                    <Image 
                        style={{ width: 75, height: 75, }} 
                        // defaultSource={require('../assets/home-images/medicine.png')}
                        source={image} 
                        onError={() => setFailed(true)}
                        onLoadEnd={() => setLoaded(true)}        
                    />
                </View>
                <View style={styles.textBox}>
                    <Text style={{ ...globalStyles.h3, ...styles.cardTitle }}>{product['product name'].length <= 15 ? product['product name']: `${product['product name'].substring(0, 14)}...`}</Text>
                    <Text style={styles.desc}>Quantity left: {product.quantity_left || '69'} </Text>
                    <Text style={styles.desc}>Unit price: GHC {product["total price"] / product["product quantity"] } </Text>
                </View>
                {!active && <TouchableWithoutFeedback onPress={() => setActive(false)}>
                    <View style={styles.countBox}>
                        <TouchableOpacity style={styles.cardBtn} onPress={countUp}>
                            <AntDesign name="up" size={15} color={colors.secBgColor} />
                        </TouchableOpacity>
                        <Text style={{ ...globalStyles.h3, color: colors.tetColor2 }}>{count}</Text>
                        <TouchableOpacity style={styles.cardBtn} onPress={countDown}>
                            <AntDesign name="down" size={15} color={colors.secBgColor} />
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>}
                {active && <TouchableOpacity style={styles.delBox} onPress={() => deleteProduct(product.id)}>
                    <FontAwesome5 name="trash" size={25} color={colors.secBgColor} />
                </TouchableOpacity>}
            </View>
        </TouchableWithoutFeedback>
    )
}

export default CartItem