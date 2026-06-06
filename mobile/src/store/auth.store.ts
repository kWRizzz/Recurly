import {
    create
} from "zustand"
import { User } from "../types/auth.types";

interface AuthState {
    token: string | null;
    user: User | null;
    isLoading: boolean
    isAuthenticated: boolean;

    setAuth: (
        token: string | null,
        user: User,
    ) => void

    logout: () => void;

    setLoading: (
        loading: boolean
    ) => void;

}


export const userAuthStore = create<AuthState>((set) => ({
    token: null,

    user: null,

    isAuthenticated: false,

    isLoading: true,


    setAuth: (
        token,
        user
    ) => set({
        token,
        user,
        isAuthenticated: true
    }),

    logout: () => set({
        token: null,
        user: null,
        isAuthenticated: false
    }),

    setLoading: (
        loading
    ) => set({
        isLoading: loading
    }),
}))


