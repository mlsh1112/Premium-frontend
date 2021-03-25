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

