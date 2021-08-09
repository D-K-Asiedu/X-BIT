import {StyleSheet, Dimensions, StatusBar} from 'react-native'


const height = Platform.OS === 'android' ? Dimensions.get('screen').height - StatusBar.currentHeight : Dimensions.get("window").height;

const darkBlueBuffer = '#1a2e35'

export const globalColours = {
    mainCol: '#1ba665',
    mainCol2: '#0c88fc',
    mainCol3: '#ec008c',
    darkBlue: darkBlueBuffer,
    greyBlue: '#375a64',
    lightGrey: '#808080',
    darkGrey: '#333333',
    grey: '#696969',
    yellow: '#fbbc05',
    firstAid:{
        'plaster':'#f7e0b5',
        'heart':'#b7dbfd',
        'heart-flat':'#fcd0e5',
        'lung': '#bbf8e2',
        'bee': '#f9f48a',
        'concussion':'#d5ffd8',
        'fire': '#f5d9bf',
        'cut': '#9cb1dd',
        'eye': '#f9d2bd',
        'poison': '#e9b9ff',
        'bone': '#fcf5d4',
        'choke':'#badbf9',    
        'heat': '#f8cdcd',
        'cold': '#a7f2f4',
        'tooth':'#f9d3d3',
        'injury': '#ecccba',
        'nose': '#f5cccc',
        'cpr': '#ffd0e5',
        'blister': '#eef8e2',
        'muscle': '#ffe2c4',

    }
}

export const globalStyles = StyleSheet.create({
    container:{
        flex: 1,
        // height: height,
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

export const images = {
    firstAid:{
        'plaster':require('../assets/first-aid-icons/plaster.png'),
        'heart': require('../assets/first-aid-icons/heart.png'),
        'heart-flat': require('../assets/first-aid-icons/heart-flat.png'),
        'lung': require('../assets/first-aid-icons/lung.png'),
        'bee': require('../assets/first-aid-icons/bee.png'),
        'concussion': require('../assets/first-aid-icons/concussion.png'),
        'fire': require('../assets/first-aid-icons/fire.png'),
        'cut': require('../assets/first-aid-icons/cut.png'),
        'eye': require('../assets/first-aid-icons/eye.png'),
        'poison': require('../assets/first-aid-icons/poisons.png'),
        'bone': require('../assets/first-aid-icons/bone.png'),
        'choke': require('../assets/first-aid-icons/choke.png'),    
        'heat': require('../assets/first-aid-icons/heat.png'),
        'cold': require('../assets/first-aid-icons/cold.png'),
        'tooth': require('../assets/first-aid-icons/tooth.png'),
        'injury': require('../assets/first-aid-icons/injury.png'),
        'nose': require('../assets/first-aid-icons/bleeding.png'),
        'cpr': require('../assets/first-aid-icons/cpr.png'),
        'blister': require('../assets/first-aid-icons/blister.png'),
        'muscle': require('../assets/first-aid-icons/muscle.png')
    }
}