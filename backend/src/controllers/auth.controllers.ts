import { Response, Request } from "express"
import { CustomRequest } from "../types"
import bcryptJS from "bcryptjs"
import { env } from "../config/env"

import userModel from '../models/user.model'
import { generateTokens } from "../utils/generateToken";


export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {

        let { name, email, password } = req.body;

        if (!name || !email || !password) {
            res.status(400).json({
                message: "Enter All Credentials "
            })
            return;
        }

        const isExist = await userModel.findOne({ email })

        if (isExist) {
            res.status(400).json({
                success: false,
                message: "User Already Exist"
            });
            return;
        }

        const salt = await bcryptJS.genSalt(10);
        const hashedPassword = await bcryptJS.hash(password, salt);


        const user = await userModel.create({
            name,
            email,
            password: hashedPassword
        })

        const token = generateTokens(user._id.toString())

        res.cookie("token", token)

        res.status(200).json({
            success: true,
            message: "user Created",
            token,
            user
        })

    } catch (error) {
        console.log(`error while registering user ${error}`);
        res.status(400).json({
            success: false,
            message: `error while regiserting ${error}`
        })
    }
}


export const lginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email })

        if (!user) {
            res.status(400).json({
                message: "user Does not Exist ",
                succes: false
            })
            return;
        }

        const isCorrectPassword = await bcryptJS.compare(
            password,
            user.password.toString()
        );

        if (!isCorrectPassword) {
            res.status(400).json({
                message: "user Password Is wrong",
                succes: false
            })
            return;
        }

        const token = generateTokens(user._id.toString());

        res.cookie("token", token)

        res.status(201).json({
            success: true,
            token,
            user,
        });

    } catch (error) {
        console.log(`error while loging you in  ${error}`);
        res.status(400).json({
            message: `login problem ${error}`,
            succes: false
        })
    }
}

export const getUser = async (
    req: CustomRequest,
    res: Response
): Promise<void> => {
    try {
        const user = req.user
        res.status(200).json({
            message:"user fetched",
            user,
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};