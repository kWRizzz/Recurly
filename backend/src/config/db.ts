import mongoose from "mongoose"
import {env} from "./env"


export const connectDB = async ():Promise<void>=>{
    try {
        
        const connect= await mongoose.connect(env.MONGODBURI);

        console.log(`Server Has Been Succesfully connected  ${connect.connection.host}`);

    } catch (error) {
        console.log(`error while connecting to the database ${error}`);
        process.exit(1);
    }
}