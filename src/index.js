const express=require("express");
const app=express(); 
const quotes=require("./quotes.json");
const noteRouter = require("./routes/noteRoutes");
const userRouter = require("./routes/userRoutes");
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
const mongoose =require("mongoose")
const cors=require("cors")
const port=process.env.PORT || 8080;
app.use(express.json());
app.use(cors());
app.use("/user",userRouter);

app.use("/note",noteRouter);
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(port, ()=>{
        console.log("Server started on port no. " + port);
    });
})
.catch((error)=>{
    console.log(error);
})






















app.get("/",(req,res)=>{
    res.send("Hello");
})

// app.get("/quote",(req,res)=>{
//     res.json(quotes)
//     res.status(200);f
// }) 

// app.get("/randomQuote",(req,res)=>{
//     let index=Math.floor(Math.random()*quotes.length)
//     let quote=quotes[index];
//     res.status(200).json(quote);
// })