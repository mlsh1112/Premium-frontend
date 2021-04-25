import axios from 'axios';
import Qs from 'qs';
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
        config.paramsSerializer = params => {
            return Qs.stringify(params, {
                arrayFormat: "brackets",
                encode: false,
            });
        };
        return config;
    },
    function(error){
        return Promise.reject(error)
    }
)
//const token = await AsyncStorage.getItem('token')
export const login = (user) => API.post(PORT+"/login", { user })
export const signup = (user) => API.post(PORT+"/signup",{ user })
export const authrequest = (image) => API.post(PORT+"/auths/", image )
export const getauth = () => API.get(PORT+"/auths")
export const getprojects = () => API.get(PORT+`/projects/`)