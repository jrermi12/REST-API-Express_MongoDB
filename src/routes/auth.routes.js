const express = require("express");
const router = express.Router();

//Imporing the authvalidation functions for login and register 
const {  regsiterValidation, loginValidation} = require("../middleware/authvalidation.middleware")
//Importing functions from auth controller
const { login, register, userProfile, users} = require("../controller/auth.controller")
//Importing the JWT verifyer from auth middleware 
const verifyToken = require("../middleware/auth.middleware")

//Register route with register validation 
router.post("/register", regsiterValidation, register);
//Login route with register validation
router.post("/login", loginValidation, login);
//Profile route with register validation
router.get("/profile/:id", verifyToken, userProfile);
//all users route with 
router.get("/users", verifyToken, users);


module.exports = router;