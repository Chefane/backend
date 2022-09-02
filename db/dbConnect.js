const express = require("express");
const app = express();
const cors = require("cors");
const mongoose=require("mongoose");
app.use(express.json());
app.use(cors);
const bcrypt=require("bcryptjs");
const res = require("express/lib/response");

const JWT_SECRET= ("jsonwebtoken");




const mongoUrl =  "mongodb+srv://Nosi:nosiChefane@cluster0.ecueqvw.mongodb.net/authDB?retryWrites=true&w=majority";
mongoose
.connect(mongoUrl,{
    useNewUrlParser:true
})
.then(() => {console.log("connected to database");
})
.catch((e) => console.log(e));