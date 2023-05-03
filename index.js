//Importing Libraries
const express = require("express")
require("dotenv").config()
const cors = require("cors") 
const path = require("path")

//Initalizing the express app
const app = express();

//Importing the connectToDB function to the index.js file as it is the main entry to the project 
const connectToDB = require("./src/config/db_config");

//calling the function or running the function
connectToDB();


//Adding Node features
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({ limit:"50mb", extended: true}));
app.use(cors());


//Run Node APP
module.exports = app