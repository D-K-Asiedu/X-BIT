import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const MedViewLinks = (image, title) => {

    const images = {
        '': require('../home-icons/fluxamox.png'),
        '': require('../home-icons/vitamina.png'),
        //when medicines are added
    }
    return (
        <View style={styles.medicineView}>
          <Image source={images[image]} style={styles.medicineImage}/>
          <Text style={styles.medicineTextOne}>{title}</Text>
          <Text style={styles.medicineTextTwo}></Text>
            <View  style={styles.button}> 
              <TouchableOpacity onPress={()=>navigation.navigate('')}>
              <LinearGradient
                colors={['#1BA665', '#1BA665']}
                style={styles.buttonIn}
              >
              <Text style={styles.buttonText}>Add To Cart</Text>
              </LinearGradient>
              </TouchableOpacity>
            </View>
        </View>
    )
}

export default MedViewLinks;

const styles = StyleSheet.create({
    medicineView:{
        flexDirection: 'column' ,
        backgroundColor: '#fff',
        borderRadius: 10
      },
  
      medicineImage:{
        resizeMode: 'center'
      },
      medicineTextOne:{
        fontSize: 16,
        fontWeight: 'bold',
        color:'blue',
        textAlign: 'center'
      },
      medicineTextTwo:{
        fontSize: 12,
        fontWeight: 'normal',
        color:'#808080',
        textAlign: 'center'
      },
      Button:{
        alignItems: 'flex-end',
        margin: 10
      },
  
      buttonText:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 11
      },
  
      buttonIn:{
        width: 100,
        height: 30,
        justifyContent: 'center',
        borderRadius: 5,
        alignItems: 'center',
        flexDirection: 'row'
      },
  
});
