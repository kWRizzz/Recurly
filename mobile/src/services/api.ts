import axios from "axios";
import Constants from "expo-constants";

import {
    userAuthStore
}from "../store/auth.store"

const hostUri = Constants.expoConfig?.hostUri;
const hostIp = hostUri ? hostUri.split(':')[0] : 'localhost';

export const api= axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL || `http://${hostIp}:3000/api`
})

api.interceptors.request.use(
    (config)=>{

        const token = userAuthStore.getState().token

        if(token){
            config.headers.Authorization=  `Bearer ${token}`
        }
        return config;
    }
)