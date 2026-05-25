import express from "express"
import cors from "cors"
import { env } from "./config/env";
import { connectDB } from "./config/db";

const app=express()

app.use(cors())


app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get("/dummy",(req,res)=>{
    res.send("raand ke madrchod")
})

const startServer = async () => {
    await connectDB()
    app.listen(env.port, () => {
    console.log(`Server running on port ${env.port}`);
  });
}

startServer()

