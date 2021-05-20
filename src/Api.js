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
const kakaoBook = axios.create({
    headers: { 'Authorization': baseurl.kakaotoken },
})

const PORT = baseurl.port
// const PORT = baseurl.sungmin

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

export const login = (user) => API.post(PORT+"/login", { user })
export const refresh =()=>API.post(PORT+"/refresh")
export const logout = () => API.delete(PORT+"/logout")
export const signup = (user) => API.post(PORT+"/signup",{ user })
export const authrequest = (image) => API.post(PORT+"/auths/", image )
export const getauth = () => API.get(PORT+"/auths")
export const getproject = (projectid) => API.get(PORT+`/projects/${projectid}`)
export const getchapter = ( params ) => API.get(PORT+"/books/get_list/",{ params })
export const getBook = (params) => kakaoBook.get("https://dapi.kakao.com/v3/search/book",{params})
export const createBook = (book) => API.post(PORT+'/books',{book})
export const getprojects = ( params ) => API.get(`${PORT}/projects`, { params })
export const postoptions = ( params ) => API.post(`${PORT}/options`, params )
export const getattendances = () => API.get(PORT+"/attendances")
export const createproject = (project) => API.post(PORT+"/projects",{ project })
export const getcategories = () => API.get(PORT+"/categories")
export const updateproject = (projectid,{project}) => API.put(PORT+`/projects/${projectid}`,{project})
export const createschedule = (id, params) => API.get(PORT+`/projects/${id}/create_schedule`, { params })
export const createattendances = (projectid) => API.post(PORT+'/attendances',projectid)
export const createlike = ( params ) => API.post(PORT + '/likes', params)
export const deletelike = (id) => API.delete(PORT + `/likes/${id}`)
export const islike = ( params ) => API.get(PORT+`/likes/is_like`, {params})
export const getPlan=(project_id)=>API.get(PORT+'/options',{project_id})
