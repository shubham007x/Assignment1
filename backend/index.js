const express=require("express");
const { connection } = require("./config/db");
require("dotenv").config();

const app=express();
app.listen(8000,async ()=>{
    try {
        await connection;
        console.log("DB connected successfully")
    } catch (error) {
        console.log("connection failed");
    }
    console.log("listing on 8000")
})