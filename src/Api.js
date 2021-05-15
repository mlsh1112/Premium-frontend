import axios from 'axios';
import Qs from 'qs';
import AsyncStorage from '@react-native-community/async-storage';
import baseurl from '../config'


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
export const refresh =()=>API.post(PORT+"/refresh")
export const logout = () => API.delete(PORT+"/logout")
export const signup = (user) => API.post(PORT+"/signup",{ user })
export const authrequest = (image) => API.post(PORT+"/auths/", image )
export const getauth = () => API.get(PORT+"/auths")
export const getproject = (projectid) => API.get(PORT+`/projects/${projectid}`)
export const getprojects = ( params ) => API.get(`${PORT}/projects`, { params })
export const getattendances = () => API.get(PORT+"/attendances")
export const createattendances = (projectid) => API.post(PORT+'/attendances',projectid)
export const gettutees = (params) => API.get(PORT+'/auths/show_all',{ params })
export const gettutorprojs=()=>API.get(PORT+"/get_project_list")