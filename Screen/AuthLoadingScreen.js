import React,{useState,useEffect} from 'react';
//import {AsyncStorage} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
    StyleSheet,
    View, 
    ActivityIndicator,
  } from 'react-native';

const AuthLoading = (props) => {
    const deletokenfortest = async() => { //asyncstorage 테스트용 token 삭제
        try{
            await AsyncStorage.removeItem('token');
        }
        catch (error){
            console.log("AsyncStorage remove Error: " + error.message);
        };
    }
    const setTokenForTest = async() => { //asyncstorage 테스트용 token 생성
        try{
            await AsyncStorage.setItem('token','temptokenforusertoken');
        }
        catch (error){
            console.log("AsyncStorage setting Error: " + error.message);
        };
    };
    const CheckUserToken = async() => {
        try{
            const item = await AsyncStorage.getItem('token');
            if (item){
                props.navigation.replace('Home');
                console.log("Go to Home");
            }
            else{
                props.navigation.replace('Signin');
                console.log("Go to Signin");
            }
        }
        catch (error){
            console.log("AsyncStorage Error: " + error.message);
        };
    };
    useEffect(() => {
        //setTokenForTest();
        //deletokenfortest();
        CheckUserToken();
    });
    return (
        <View style={styles.container}>
            <ActivityIndicator color="black" />
        </View>
    );
};

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent:'center',
        alignItems:'center',
    },
  });
export default AuthLoading;