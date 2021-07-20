import React from 'react';
import { StyleSheet, Text, TextInput,Image, TouchableOpacity, View } from 'react-native';

export default function LoginScreen(props){


   

    return(
        <View style={styles.container}>
    
        <View style={{flexDirection:'row',height:"40%",padding:30}}>
          <View style={{alignItems:'center',justifyContent:'center',flex:6}}>
             <Text style={{fontSize:50,}}>X_bit</Text> 
          </View>
          <TouchableOpacity>
           <View  style={styles.half1}>
           <Text style={{color:'#f0fa6b'}}> Skip
           </Text>
           </View>
          </TouchableOpacity>
      </View>
      
      <View style={styles.half2}>
        <View style={{height:'10%', width:"100%",alignItems:'center',justifyContent:'center', alignSelf:'center'}}>  
          <Text style={{fontSize:20}}>Log in to your account</Text>
        </View>
  
        <View style={styles.half3}>
          <View style={{marginTop:50}}>
            <Text style={{fontWeight:'bold',color:'#8c8c8c'}}>Email or Phone Number</Text>
            <View style={styles.inputText}>
             <TextInput
              placeholder="Enter your email or phone number"
            />
            </View>
          </View>

          <View style={{marginTop:20}}>
            <Text style={{fontWeight:'bold',color:'#8c8c8c'}}>Password</Text>
            <View style={styles.inputText}>
             <TextInput
              placeholder="Enter your password"
            />
            </View>
          </View>
          <View style={{marginTop:40}}>
            <TouchableOpacity style={styles.loginStyle} >
              <Text style={{fontWeight:'bold',color:'#fff'}}>Login</Text>
            </TouchableOpacity>
  
          </View>
          
          <View style={{marginTop:15,flexDirection:'row'}}>  
             <TouchableOpacity style={styles.googleStyle}>
               <View style={{marginEnd:2}}><Image style={{width:25,height:25}} source={require('../assets/google2.png')}/></View>
               <Text>Login with Google</Text>
             </TouchableOpacity>
          </View>  
          
          <View style={{marginTop:30, backgroundColor:'white',width:'100%',justifyContent:'center', flexDirection:'row'}}>
            <Text>Don't have an account, </Text>
            <TouchableOpacity onPress={()=> props.onChangeScreen("Register")}>
               <Text style={{fontWeight:"bold",color:'#1ba665'}}>Register</Text>
            </TouchableOpacity>
          </View>

        </View>  
          
        
        
      </View>  
    </View>    
      
     
      
    

    );
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor:'#1ba665',
      width:'100%'
    },
  
    half1:{
      marginTop:8,
      alignItems:'flex-end',
      justifyContent:'flex-end'
    },
  
    skipStyle:{
      color:'#f0fa6b'
    },
  
    half2:{
      width:'100%',
      justifyContent:'center',
      alignSelf:'center',
      alignItems:'center',
      height:'60%',
      borderTopLeftRadius:20,
      borderTopRightRadius:20,
      backgroundColor:'#e1e8e8'
  
    },
  
    half3:{
      backgroundColor:'#fff',
      width:'100%',
      height:"90%",
      borderTopLeftRadius:30, 
      borderTopRightRadius:30,
      alignItems:'center',
      paddingStart:10, 
      alignSelf:'center', 
    },
    inputText:{
      alignItems:'center',
      justifyContent:'center',
      height:45,
      borderRadius:10,
      borderWidth:1,
      alignSelf:'center',
      alignItems:'flex-start',
      width:320,paddingStart:5
  
    },
    googleStyle:{
      flexDirection:'row', 
      backgroundColor:'#e1e8e8',
      justifyContent:'center', 
      height:45,
      borderRadius:10,
      borderWidth:1,
      alignSelf:'center',
      alignItems:'center',
      width:320
   },
   loginStyle:{
      backgroundColor:'#1ba665',
      justifyContent:'center',
      height:45,borderRadius:10,
      borderWidth:1,
      alignSelf:'center',
      alignItems:'center',
      width:320

   }
   
  });
  