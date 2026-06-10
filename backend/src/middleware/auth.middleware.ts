import {
    Response,
    Request,
    NextFunction
} from "express";
import { CustomRequest } from "../types";
import userModel from "../models/user.model";
import { env } from "../config/env"
import jwt from "jsonwebtoken"

interface JwtPayload {
    userId: string
}


export const protect = async (
    req:CustomRequest,
    res:Response,
    next:NextFunction
):Promise<void> => {
    try {
        const authHeader= req.headers.authorization

        if(!authHeader || !authHeader.startsWith("Bearer ")){
            res.status(401).json({
                message:"No token sexy  header Found pls try to re register or re login ",
                success:false
            });
            return;
        };

        const token= authHeader.split(" ")[1];

        const decoded= jwt.verify(token,env.jwtSecrecet) as JwtPayload;

        if(!decoded) {
            res.status(401).json({
                message:"No Token Found ",
                success:false
            });
            return;
        }

        const user = await userModel.findById(decoded.userId).select("-password")

        if(!user){
            res.status(401).json({
                message:"no user Found",
                success:false
            });
            return;
        }

        req.user= user;

        next();
        
    } catch (error) {
        console.log(`error in protection of the routes  ${error}`);
        res.status(400).json({
            message:`error in mid ${error}`
        })

    }
}


