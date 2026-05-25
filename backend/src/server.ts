
import express= require("express")



const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get("/dummy",(req,res)=>{
    res.send("raand")
})

app.listen(3000,()=>{
    console.log(`server started`);
})

