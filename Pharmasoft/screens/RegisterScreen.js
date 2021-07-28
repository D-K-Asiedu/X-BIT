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
import { globalColours, globalStyles } from '../styles/global';
import { loginRegStyles } from '../styles/loginReg';


export default function RegisterScreen({navigation}) {
  const [listDisplay, setListDisplay] = useState(false)
  const authenticate = useUpdateAuth()
  const [imgDisplay, setImgDisplay] = useState(true)

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => setImgDisplay(false))
    Keyboard.addListener('keyboardDidHide', () => setImgDisplay(true))

    return () => {
      Keyboard.removeListener('keyboardDidShow', () => setImgDisplay(false))
      Keyboard.removeListener('keyboardDidHide', () => setImgDisplay(true))  
    }
  }, [])

  return (
    <View style={globalStyles.container}>

      <View style={loginRegStyles.imgBox}>
         {imgDisplay && !listDisplay && <Image source={require('../assets/register.png')} style={{...loginRegStyles.image, width: 275, height: 255}} />}
        <TouchableOpacity 
          style={loginRegStyles.skipBtn}
          onPress={() => authenticate('skip')}
          >
            <Text style={loginRegStyles.skipText}> {"Skip>>"} </Text>
        </TouchableOpacity>
      </View>

      <View style={loginRegStyles.content}>
          <Text style={loginRegStyles.h2}>Create an account</Text>
        
        <View style={loginRegStyles.contentCard}>
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
          
          <View style={loginRegStyles.bottomBox}>
            <Text style={loginRegStyles.bottomText}>Already have an account, </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={loginRegStyles.bottomLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <StatusBar style="light" translucent={true} />
    </View>

  );
}

const styles = StyleSheet.create({
});
