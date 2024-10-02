const express = require("express");
const cors = require("cors");
const {Pool}= require("pg");
const authRoutes = require( "./routes/auth.routes.js");
const cookieParser = require("cookie-parser");


const app = express();


app.use(cors());
app.use(express.json());
app.use(cookieParser());

//authentication routes

app.use("/api/auth" , authRoutes);

app.listen(5000 , () =>{
    console.log("Sever Running !");
});