import React, {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { globalStyles, globalColors } from '../styles/global'
import { useTheme, useColor } from '../styles/ThemeContext'
import { Ionicons, } from '@expo/vector-icons'

const OrderDetailsScreen = ({ navigation }) => {
    const [active, setActive] = useState(true)

    const colors = useColor()
    const theme = useTheme()

    // Tab box
    const TabBox = ({title, active, navigate}) => {
        const boxStyle = {
            borderBottomWidth: active ? 5 : 0,
            borderColor: colors.constant,
        }

        return (
            <TouchableOpacity 
                style={{...styles.tabBox, ...boxStyle}}
                activeOpacity={active ? 1 : 0.2}
                onPress={() => {
                    !active && navigate()
                }}
            >
                <Text style={styles.tabText}>{title}</Text>
            </TouchableOpacity>
        )
    }

    // Styles
    const styles = StyleSheet.create({
        header: {
            backgroundColor: colors.mainColor,
            justifyContent: 'flex-start'
        },
        pageTitle: {
            marginLeft: 30,
        },
        content: {
            backgroundColor: colors.mainBgColor,
            paddingHorizontal: 0,
        },
        tabBar: {
            flexDirection: 'row',
        },
        tabBox: {
            flex: 1,
            paddingVertical: 15,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            marginHorizontal: 20,
        },
        tabText: {
            textAlign: 'center',
            fontSize: 18,
            fontWeight: 'bold',
            color: colors.mainTextColor
        },
        orders: {
            flex: 1,
            backgroundColor: colors.secBgColor
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
                <Text style={{ ...globalStyles.h2, ...styles.pageTitle }}>Orders</Text>
            </View>

            <View style={{ ...globalStyles.content, ...styles.content }}>
                <View style={styles.tabBar}>
                    <TabBox title="Active" active={active} navigate={() => setActive(true)} />
                    <TabBox title="Completed" active={!active} navigate={() => setActive(false)} />
                </View>
                <View style={styles.orders}>

                    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                        <Ionicons name="ios-file-tray-full-outline" size={75} color={colors.tetColor2} />
                        <Text style={{fontSize: 16, color: colors.tetTextColor}}>{`You have no ${active? 'active':'completed'} orders`}</Text>
                    </View>

                </View>
            </View>
        </View>
    )
}

export default OrderDetailsScreen