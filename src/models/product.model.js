//Importing Libraries
const mongoose = require("mongoose");

//using monoose to create the product schema
const productSchema = mongoose.Schema({
    productId:{
        type:String
    },
    name:{
        type:String, 
    },
    description:{
        type:String,
    },
    price:{
        type:Number, 
    },

    files:{
        type: Array        
    }
 });

//exporting the product schema as monngose collection
module.exports = mongoose.model('Product', productSchema);