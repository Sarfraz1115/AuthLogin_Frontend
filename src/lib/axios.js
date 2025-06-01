import axios from 'axios';

export const axiosInsta = axios.create({
    baseURL: 'http://localhost:3000/api',
   withCredentials: true,
})