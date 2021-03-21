import AsyncStorage from '@react-native-community/async-storage';


export const setToken = async(token) => { //asyncstorage token 생성
    try{
        await AsyncStorage.setItem('token',token);
    }
    catch (error){
        console.log("AsyncStorage setting Error: " + error.message);
    };
};

export const delToken = async() => { //asyncstorage token 삭제
    try{
        await AsyncStorage.removeItem('token');
    }
    catch (error){
        console.log("AsyncStorage delete Error: " + error.message);
    };
};

