import axios from 'axios';

export const axiosInsta = axios.create({
    baseURL: 'https://authlogin-backend.onrender.com',
   withCredentials: true,
})