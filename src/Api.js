import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Qs from 'qs';
import baseurl from '../config'
let headers = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': ''
    }
}
const kakaoBook = axios.create({
    headers: { 'Authorization': 'KakaoAK dddfee223d24c8d197c5764de547993b' },
})
//const PORT = baseurl.port
const PORT = baseurl.port
const PORT = "http://52.79.97.255:80"
//const PORT = "http://200.200.13.129:3000"

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
);
//const token = await AsyncStorage.getItem('token')
export const login = (user) => API.post(PORT+"/login", { user })
export const signup = (user) => API.post(PORT+"/signup",{ user })
export const authrequest = (image) => API.post(PORT+"/auths/", image )
export const getauth = () => API.get(PORT+"/auths")
export const getproject = (projectid) => API.get(PORT+`/projects/${projectid}`)
export const getprojects = () => API.get(PORT+`/projects/`)
export const getchapter = (book) => API.get(PORT+"/books/get_list/",book)
export const getBook = (params) => kakaoBook.get("https://dapi.kakao.com/v3/search/book",{params})
export const createBook = (info) => API.post(PORT+'/books',info)
export const getprojects = ( params ) => API.get(`${PORT}/projects`, { params })


