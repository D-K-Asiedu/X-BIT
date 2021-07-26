import React, {useState, useEffect} from 'react';
import { 
  StyleSheet, 
  Text, 
  Image, 
  TouchableOpacity, 
  View,
  ScrollView,
  Keyboard 
} from 'react-native';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { StatusBar } from 'expo-status-bar';
import { useUpdateAuth } from '../routes/AuthContext';

const mainCol = "#1ba665"
const lightGrey = "#f2f2f2"
const darkBlue = "#1a2e35"

export default function RegisterScreen({navigation}) {
  const [listDisplay, setListDisplay] = useState(false)
  const authenticate = useUpdateAuth()
  const [imgDisplay, setImgDisplay] = useState(true)

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => setImgDisplay(false))
    Keyboard.addListener('keyboardDidHide', () => setImgDisplay(true))

    // return () => {
    //   Keyboard.removeListener('keyboardDidShow', () => setImgDisplay(false))
    //   Keyboard.removeListener('keyboardDidHide', () => setImgDisplay(true))  
    // }
  }, [])

  return (
    <View style={styles.container}>

      <View style={styles.imgBox}>
         {imgDisplay && !listDisplay && <Image source={require('../assets/register.png')} style={styles.image} />}
        <TouchableOpacity 
          style={styles.skipBtn}
          onPress={() => authenticate('skip')}
          >
            <Text style={styles.skipText}> {"Skip>>"} </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
          <Text style={styles.h2}>Create an account</Text>
        
        <View style={styles.contentCard}>
          <InputField title="Name" focusHandler={() => setListDisplay(true)} />
          <InputField title="E-mail" focusHandler={() => setListDisplay(true)} />
           {listDisplay && <>
            <InputField title="Phone number" />
            <InputField title="Password" />
            <InputField title="Confirm password" placeHolder="Confirm password" />
           </>}
          <Button
            title="Register"
            color='#ffffff'
            bgColor="#1ba665"
            style={{marginTop: 15,}}
           />
          <Button
            title="Register with google"
            color='#1a2e35'
            bgColor="#f2f2f2"
            border1="#c4c4c4"
            image="google"
            style={{marginTop: 15,}}
           />
          
          <View style={styles.bottomBox}>
            <Text style={styles.bottomText}>Already have an account, </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.bottomLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <StatusBar style="light" translucent={true} />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainCol,
  },
  imgBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
    flex: 1,
  },
  image:{
    width: 275,
    height: 255,
  },
  skipBtn:{
    position: 'absolute',
    top: 40,
    right: 10,
  },
  skipText:{
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fbbc05',
  },
  content: {
    justifyContent: 'center',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    backgroundColor: lightGrey,
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold',
    color: darkBlue,
    paddingVertical: 10,
    textAlign: 'center',
  },
  contentCard: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    paddingVertical: 45,
    paddingHorizontal: 20,
  },
  bottomBox:{
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  bottomText:{
    fontSize: 16,
  },
  bottomLink:{
    fontSize: 18,
    fontWeight: 'bold',
    color: mainCol,
  }
});
