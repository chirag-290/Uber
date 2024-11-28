const dotenv=require('dotenv');
dotenv.config();
const cors=require('cors');
const express=require('express');
const app=express();


app.use(cors());

app.get('/',(req,res) =>{
    console.log("hello");
    res.send("hello world");
})

module.exports=app;