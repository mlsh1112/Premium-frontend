import axios from 'axios';
import baseurl from '../config';
import AsyncStorage from '@react-native-community/async-storage';

let headers = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': ''
    }
}

const PORT = baseurl.port
console.log(PORT)
const API = axios.create(headers);
API.interceptors.request.use(
    async function (config){
        const token = await AsyncStorage.getItem('token')
        config.headers['Authorization'] = token
        console.log(config)
        return config;
    },
    function(error){
        return Promise.reject(error)
    }
);
//const token = await AsyncStorage.getItem('token')
export const login = (user) => API.post(PORT+"/users/sign_in", { user })
export const signup = (user) => API.post(PORT+"/users/sign_up",{ user })
export const authrequest = (image) => API.post(PORT+"/auths/", image )
export const getauth = () => API.get(PORT+"/auths")
export const getproject = (projectid) => API.get(PORT+`/projects/${projectid}`)
export const getprojects = () => API.get(PORT+`/projects/`)
