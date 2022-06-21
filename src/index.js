const express=require("express");
const app=express(); 
const quotes=require("./quotes.json");
const noteRouter = require("./routes/noteRoutes");
const userRouter = require("./routes/userRoutes");
const dotenv=require("dotenv")
const mongoose =require("mongoose")
const cors=require("cors")
const port=process.env.PORT ||8080;
app.use(express.json());
app.use(cors());
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(port,()=>{
        console.log("Server running on port:"+port);
    });
})
.catch((error)=>{
    console.error(error);
})

app.use("/user",userRouter);

app.use("/note",noteRouter);




















app.get("/",(req,res)=>{
    res.send("Hello");
})

app.get("/quote",(req,res)=>{
    res.json(quotes)
    res.status(200);f
}) 

app.get("/randomQuote",(req,res)=>{
    let index=Math.floor(Math.random()*quotes.length)
    let quote=quotes[index];
    res.status(200).json(quote);
})