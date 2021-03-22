/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import {Button} from '../src/components'
 import {
   StyleSheet,
   View,
   Text,
 } from 'react-native';
 import AsyncStorage from '@react-native-community/async-storage';
  const Profile = (props) => {
    
    const handleLogoutPress = async()=>{
       await AsyncStorage.removeItem('token');
       props.navigation.popToTop()
    }
    return (
      <View style={styles.container}>
         <View style={styles.textposition}>
             <Text style={styles.textstyle}>프로필 화면</Text>
         </View>
         <View >
             <Button onPress={handleLogoutPress}>LOG OUT</Button>
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
    textposition:{
        position: 'absolute',
        left: '27%',
        top: '20%'
    },
  });
  
  export default Profile;
  