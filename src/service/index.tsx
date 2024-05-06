import axios from 'axios'

const ApiManager = axios.create({
    baseURL: "http://localhost:8080",
    responseType: 'json',
    headers: { 'GreenifyMe': 'App' },
    timeout: 1000,
    withCredentials: true,
})

export default ApiManager