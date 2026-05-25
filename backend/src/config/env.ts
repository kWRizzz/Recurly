import dotenv from "dotenv";

dotenv.config()


export const env={
    port: process.env.PORT || 3000,
    MONGODBURI: process.env.MONGODB_URI || "",
    jwtSecrecet: process.env.JWT_SECRET || ""
}