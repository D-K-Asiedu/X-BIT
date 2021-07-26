import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


const FirstAidLinks = ({title, image}) => {
    const images = {
        'poisoning': require('../home-icons/poisons.png'),
        'bleeding': require('../home-icons/bleeding.png'),
        'resusitation': require('../home-icons/heart-flat.png'),
        'asthma': require('../home-icons/lung.png'),
    }
    

    return (
        <View style={styles.footerTwoSubView}>
        <View style={styles.smallBoxView}>
          <Image source={images[image]} style={styles.smallBoxImage}/>
        </View>
        <Text style={styles.smallBoxText}>{title}</Text>
        </View>
    )
}

export default FirstAidLinks;

const styles = StyleSheet.create({
    footerTwoSubView:{
        flexDirection: 'column'
    },
      smallBoxView:{
        flexDirection: 'column',
        backgroundColor: 'white',
        borderRadius: 22,
        width: 75,
        height: 75,
        marginLeft: 10,
        marginRight: 10
    },
  
      smallBoxImage:{
        resizeMode: 'center'
    },
  
      smallBoxText:{
        fontSize: 17,
        fontWeight: 'bold',
        color: '#375A64',
        textAlign: 'center'
    },
})

