import AsyncStorage from '@react-native-community/async-storage';
//import { AsyncStorage } from 'react-native';

export const setToken = async(token) => { //asyncstorage token 생성
    try{
        await AsyncStorage.setItem('token',token);
    }
    catch (error){
        console.log("AsyncStorage setting Error: " + error.message);
    };
};

export const setType = async(type) => { //asyncstorage token 생성
    try{
        await AsyncStorage.setItem('type',type);
    }
    catch (error){
        console.log("AsyncStorage setting type Error: " + error.message);
    };
};

export const setStatus = async(status) => { //asyncstorage token 생성
    try{
        await AsyncStorage.setItem('status',status);
    }
    catch (error){
        console.log("AsyncStorage setting Error: " + error.message);
    };
};
export const setName = async(name) => { //asyncstorage token 생성
    try{
        await AsyncStorage.setItem('name',name);
    }
    catch (error){
        console.log("AsyncStorage setting Error: " + error.message);
    };
};
export const setUser = async(info) => { //asyncstorage token 생성
    try{
        await AsyncStorage.setItem('userinfo',JSON.stringify(info));
    }
    catch (error){
        console.log("AsyncStorage setting Error: " + error.message);
    };
};