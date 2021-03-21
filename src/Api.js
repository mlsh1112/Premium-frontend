import axios from 'axios';

let headers = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
}

const API = axios.create(headers);

export const login = (user) => API.post("http://10.0.2.2:3000/users/sign_in", { user })

