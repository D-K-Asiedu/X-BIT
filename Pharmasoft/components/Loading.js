import React from 'react'
import { StyleSheet, ActivityIndicator, View, Modal } from 'react-native'
import { globalStyles } from '../styles/global'
import { useTheme, useColor } from '../styles/ThemeContext'

const Loading = ({loading, setLoading, }) => {
    const colors = useColor()

    return (
        <Modal
            visible={loading}
            transparent={true}
            animationType='fade'
            onRequestClose={() => setLoading(false)}
        >
            <View style={globalStyles.modalBg}>
                <View style={{ ...globalStyles.modalBox, backgroundColor: 'transparent' }}>
                    <ActivityIndicator size={50} color={colors.constant} />
                </View>
            </View>
        </Modal>
    )
}

export default Loading

const styles = StyleSheet.create({})
