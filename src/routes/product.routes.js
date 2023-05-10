const express = require("express");

//Importing express router
const router = express.Router();

//Importing the product controller 
const { create, update, get, show, deleteProduct} =  require("../controller/product.controller");

//Importing the product validation function from validation.middleware
const { productSchema } = require("../middleware/validation.middleware");

//Importing the JWT verifyer from auth middleware 
const verifyToken = require("../middleware/auth.middleware")

// //Importing the upload function from out multer config file 
const upload = require("../config/multer")

router.post("/create", verifyToken, upload.array('files', 10), productSchema, create)

//Route to update a specfic product
router.put("/update/:id", verifyToken,  upload.array('files', 10), productSchema, update);

//route to get all products
router.get("/get",  get);

//route to get or show only a specfic product
router.get("/show/:id", show);

//route to delete a specfic product
router.delete("/delete/:id", verifyToken, deleteProduct); 

//Exporting the routes 
module.exports = router;