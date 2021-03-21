/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

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
 
 
 const Signin = () => {
   const [userEmail,setUserEmail] = useState('');
   const [userPassword,setUserPassword] = useState('');
   //const [loading,setLoading] = useState('');
   //const [errortext,SetErrorText]=useState('');
   const passwordInputRef = createRef();
  
   const handleSubmitPress = ()=>{
     if (!userEmail){
       alert("Please enter Email");
       return ;
     }
     else if (!userPassword){
       alert("Please enter Password")
       return ;
     }

     axios.get('http://localhost:3000/users')
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    
   }
   return (
     <View style={styles.container}>
        <View>
            <Text>Welcome</Text>
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
        <View >
            <Button onPress={handleSubmitPress}>LOGIN</Button>
            <Text style={styles.SignUpQStyle}>Don't have any account?  </Text>
            <Text style={styles.SignUpStyle}
              //onPress={() => navigation.navigate('SignUpScreen')}
              >
              Sign Up
            </Text>
        </View>
     </View>
   );
 };
 
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
 
 export default Signin;
 