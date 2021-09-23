import React from 'react'
import { StyleSheet, ActivityIndicator, View, Modal } from 'react-native'
import { globalStyles } from '../styles/global'
import { useTheme, useColor } from '../styles/ThemeContext'

const LoadingView = ({ size, color }) => {
    const colors = useColor()

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={size || 30} color={color || colors.constant} />
        </View>
    )
}

export default LoadingView

const styles = StyleSheet.create({})
