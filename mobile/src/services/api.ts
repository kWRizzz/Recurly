import axios from "axios";
import Constants from "expo-constants";
import { Platform } from "react-native";
import {
    userAuthStore
}from "../store/auth.store"

const hostUri = Constants.expoConfig?.hostUri;
let hostIp = hostUri ? hostUri.split(':')[0] : 'localhost';

// Android Emulator loopback host machine IP
if (Platform.OS === 'android' && (hostIp === 'localhost' || !hostIp)) {
    hostIp = '10.0.2.2';
}

const baseURL = process.env.EXPO_PUBLIC_API_URL || `http://${hostIp}:3000/api`;
console.log(`[API] Connecting to backend at: ${baseURL}`);

export const api= axios.create({
    baseURL,
    timeout: 90000 // 90 seconds timeout for long AI tasks
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