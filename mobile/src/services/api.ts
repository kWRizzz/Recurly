import axios from "axios";

import {
    userAuthStore
}from "../store/auth.store"

export const api= axios.create({
    baseURL:"http://localhost:3000/api"
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