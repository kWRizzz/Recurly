import express from "express"
import cors from "cors"
import { env } from "./config/env";
import { connectDB } from "./config/db";
// import cookieparser from "cookie-parser"

import authRouter from "./routes/auth.routes"
import notesRouter from "./routes/notes.routes"
import uploadRouter from "./routes/upload.route"

const app=express()

app.use(cors())
// app.use(cookieparser())

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/user',authRouter)
app.use('/api/notes',notesRouter)
app.use('/api/upload',uploadRouter)

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

