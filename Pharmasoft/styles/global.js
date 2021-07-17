import {StyleSheet} from 'react-native'

const darkBlueBuffer = '#1a2e35'

export const globalColours = {
    mainCol: '#1ba665',
    darkBlue: darkBlueBuffer,
    greyBlue: '#375a64',
    lightGrey: '#808080',
}

export const globalStyles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: globalColours.mainCol,
    },
    header:{
        flexDirection: 'row',
        height: 100,
        backgroundColor: globalColours.mainCol,
        paddingTop: 30,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    h2:{
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    h3:{
        fontSize: 20,
        fontWeight: 'bold',
        color: darkBlueBuffer,
    },
    content:{
        flex: 1,
        paddingTop: 2,
        paddingHorizontal: 20,
        backgroundColor: '#f2f2f2',
        borderTopStartRadius: 30,
        borderTopEndRadius: 30, 
    },
})