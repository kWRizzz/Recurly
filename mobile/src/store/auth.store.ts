import{
    create
} from "zustand"

interface AuthState{
    token:string | null;
    isAuthenticated:boolean;

    setToken:(
        token:string | null
    )=>void

    logout:()=>void;
}


export const userAuthStore= create<AuthState>((set)=>({
    token:null,
    isAuthenticated:false,
    setToken:(token)=>set({
        token,
        isAuthenticated:!!token
    }),
    logout:()=>set({
        token:null,
        isAuthenticated:false
    }),
}))


