import React, {Component, useState,createRef} from 'react';
 import {Button} from '../src/components'
 import axios from 'axios'
 import {
   SafeAreaView,
   StyleSheet,
   ScrollView,
   View,
   Text,
   Image,
   StatusBar,
   TextInput,
   TouchableOpacity,
 } from 'react-native';
 
import {login,signup} from '../src/Api';
import {setToken} from '../src/Asyncstorage';


const SignUp=(props)=>{
  const [userEmail,setUserEmail] = useState('');
  const [userPassword,setUserPassword] = useState('');
  const [userPasswordAagin,setUserPasswordAagin] = useState('');
  
  const passwordInputRef = createRef();

  const userpasswordInputRef = createRef();
  
  const handleSubmitPress = ()=>{
    if (!userEmail){
      alert("Please enter Email");
      return ;
    }
    else if (!userPassword){
      alert("Please enter Password")
      return ;
    }
    else if(!userPasswordAagin){
      alert("Please enter PasswordAagin")
      return;
    }
    else if(userPasswordAagin!==userPassword){
      alert("Passwords do not match!")    
      return;
    }
    else {
     signup({
       "email":userEmail,
       "password":userPassword
     }).then(res => {
       console.log(res.data.token);
       setToken(res.data.token);
     }).then(() => {
       props.navigation.replace('AuthLoading');
       console.log("complete sign up! ");
     }).catch(error => {
       alert("logup failed!!!")
       console.log(error);
     });
    }
     console.log(userEmail);
     console.log(userPassword);
     console.log(userPasswordAagin);

  }


  return(
    <View style={styles.container}>
    <View>
        <Text>Sign_up</Text>
    </View>
    <View style={styles.FormStyle}>
        <TextInput style={styles.InputStyle}
          placeholder={"Email"} 
          onChangeText={userEmail => setUserEmail(userEmail)}
          keyboardType="email-address"
          onSubmitEditing={() => {
              passwordInputRef.current.focus();
            }
          }
        />
    </View>
    <View style={styles.FormStyle}>
        <TextInput style={styles.InputStyle}
          placeholder={"Password"}
          onChangeText={userPassword => setUserPassword(userPassword)}
          ref={passwordInputRef}
          secureTextEntry={true}
          returnKeyType="next"
        />
    </View>
    <View style={styles.FormStyle}>
        <TextInput style={styles.InputStyle}
          placeholder={"PasswordAagin"}
          onChangeText={userPasswordAagin => setUserPasswordAagin(userPasswordAagin)}
          ref={userpasswordInputRef}
          secureTextEntry={true}
          returnKeyType="next"
        />
    </View>
    <View >
        <Button onPress={handleSubmitPress}>SignUp</Button>
        <Text style={styles.SignUpStyle}
          onPress={() => props.navigation.navigate("Signin")}
          >
        </Text>
    </View>
 </View>

  )
}

const styles = StyleSheet.create({
  container : {
      flex : 1,
      justifyContent:'center',
      alignItems:'center',
  },
  textstyle:{
    fontSize:20,
    fontWeight:'bold'
  },
  FormStyle: {
   flexDirection: 'row',
   height: 40,
   marginTop: 20,
   marginLeft: 35,
   marginRight: 35,
   margin: 10,
 },
  InputStyle: {
   flex: 1,
   color: "black",
   paddingLeft: 15,
   paddingRight: 15,
   borderWidth: 1,
   borderRadius: 30,
   borderColor: '#dadae8',
 },
 SignUpQStyle: {
   color: "black",
   textAlign: 'center',
   fontSize: 14,
   alignSelf: 'center',
   padding: 10,
 },
 SignUpStyle: {
   color: "blue",
   textAlign: 'center',
   fontWeight: 'bold',
   fontSize: 14,
   alignSelf: 'center',
   padding: 5,
 },
});


export default SignUp;
