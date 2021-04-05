import axios from 'axios';

let headers = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
}
const PORT = "http://localhost:3000"
//const PORT = "http://10.0.2.2:3000"
const API = axios.create(headers);

export const login = (user) => API.post(PORT+"/users/sign_in", { user })
export const signup = (user) => API.post(PORT+"/users/sign_up",{ user })