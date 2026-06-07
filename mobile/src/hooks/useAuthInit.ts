import React, { useEffect } from 'react'

import{
    getUser,
    getToken
} from "../utils/storage.helper"
import{
    userAuthStore
} from "../store/auth.store"

export const useAuthInit =()=>{
    const setAuth= userAuthStore((state)=>state.setAuth)

    const setLoading = userAuthStore((state) => state.setLoading)

    useEffect(() => {
        
        const init = async () => {
            try {
                const token = await getToken();
                const user = await getUser();

                if (
                    token && user
                ) {
                    setAuth(
                        token,
                        user
                    )
                }
            } finally {
                setLoading(false)
            }
        }
        
        init();
    }, [])
    
}