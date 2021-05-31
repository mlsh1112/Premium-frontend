/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import axios from 'axios';
import React, {Component} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import Stack from "./Navigation/StackNavigation";
import test from "./config"


const BookAPI = axios.create({
  headers: { 'Authorization': test },
});
import {decode, encode} from 'base-64'
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }


import {
  StyleSheet,
  View,
  Text
} from 'react-native';

export default function App(){
  return (
    <NavigationContainer>
      <Stack />
    </NavigationContainer>
  )
}
//class App extends Component {
//  
//  render(){
//  return (
//    <NavigationContainer>
//      <Stack />
//    </NavigationContainer>
//    //<View style={styles.container}>
//    //  <Onboarding/>
//    //  {/* <Signin />*/} 
//    //</View>
//  );
//  }
//};


const styles = StyleSheet.create({
  container:{
    flex:1
  }
});


//export default App;
