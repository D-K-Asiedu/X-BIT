import React, { useEffect } from 'react'
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    Dimensions,
    Modal,
    TouchableWithoutFeedback
} from 'react-native'
import { globalStyles } from '../styles/global'
import { useTheme, useColor } from '../styles/ThemeContext'
import { Ionicons } from '@expo/vector-icons';

const MessagePopup = () => {
    const colors = useColor()
    const { height, width } = Dimensions.get('window')


    useEffect(() => {
        console.log(height, width);
    }, [])

    // Styles
    const styles = StyleSheet.create({
        modal: {
            flex: 1,
            justifyContent: 'center',
            backgroundColor: '#00ff0009',
            alignItems: 'center',
        },

        card: {
            padding: 20,
            backgroundColor: '#ffffff',
            borderRadius: 10,

            elevation: 2,
        },
        cardTitle: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        cardTitleText: {
            fontSize: 16,
            fontWeight: 'bold',
        },

        cardText: {
            padding: 5,
            fontSize: 16,
        },
        linkBox: {
            paddingTop: 10,
            flexDirection: 'row-reverse',
            justifyContent: 'space-between'
        },
        link: {
            color: '#00dd66',
            fontSize: 14,
            fontWeight: 'bold',
            paddingHorizontal: 5,
        }
    })


    return (
        <Modal
            transparent={true}
            visible={true}
            animationType= 'slide'
            statusBarTranslucent={true}
        >
            <TouchableWithoutFeedback>
                <View style={styles.modal}>
                    <TouchableWithoutFeedback>
                        <View style={styles.card}>
                            <View style={styles.cardTitle}>
                                <Ionicons name="close-circle" size={20} color="#f63" />
                                <Text style={styles.cardTitleText}>Access denied</Text>
                            </View>
                            <Text style={styles.cardText}>Login to access this page</Text>
                            <View style={styles.linkBox}>
                                <TouchableOpacity>
                                    <Text style={styles.link}>LOGIN</Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text style={styles.link}>OK</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>

    )
}

export default MessagePopup