/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {Component, useState} from 'react';
 import {
   SafeAreaView,
   StyleSheet,
   ScrollView,
   View,
   Text,
   Button,
   Image,
   StatusBar,
   TextInput,
   TouchableOpacity,  
 } from 'react-native';
 
 
 class Signin extends Component {
 
   render(){
   return (
     <View style={styles.container}>
        <View>
            <Text>Welcome</Text>
        </View>
        <View >
            <TextInput placeholder={"Email"}/>
            <TextInput placeholder={"Password"}/>
        </View>
        <View >
            <Button title="login" /> 
            <Button title="signup"/> 
        </View>
     </View>
   );
   }
 };
 
 const styles = StyleSheet.create({
   container : {
       flex : 1,
       justifyContent:'center',
       alignItems:'center'
   },
   textstyle:{
     fontSize:20,
     fontWeight:'bold'
   }
 });
 
 export default Signin;
 