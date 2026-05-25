import jwt from "jsonwebtoken"
import {env} from "../config/env"

export const generateTokens=   (userId:string):string => {
    return jwt.sign({userId},env.jwtSecrecet,{expiresIn:"7d"})
}