import {StyleSheet} from 'react-native'

export const globalColours = {
    mainCol: '#1ba665',
    darkBlue: '#1a2e35',
    greyBlue: '#375a64',
    lightGrey: '#808080',
}

export const globalStyles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: globalColours.mainCol,
    }
})