const asyncHandler = require("express-async-handler");

//Importing the product model to the controller 
const productModel = require("../models/product.model");

//Importing the UUIDv4 Library
const { v4: uuidv4 } = require('uuid')

// Importing the the cloudinary config 
const cloudinary = require("../config/cloudinary")

//Imporing file system library 
const fs = require("fs"); 

//Get all products async function 
const get = asyncHandler(async (req, res) => {

    //Fetching all products from the database and assigning it to products
    const products = await productModel.find();
    //Responding the data to any request made
    return res.status(200).json({
        success: true,
        data: products.reverse()
    })
    //I use .reverse() function to get the latest datas at first  
}
);

//Get Single Product
const show = asyncHandler(async (req, res) => {
    //Destructing id from req.params
    const { id } = req.params

    //Fetching single product using the id in the req.params from the database and assigning it to product
    const product = await productModel.findOne({ productId: id });

    try {
        if (product) {

            //Responding the data to any request made
            return res.status(200).json({
                success: true,
                data: product
            })
        }
    } catch (error) {
        return res.status(412).send({
            success: false,
            message: error.message
        })
    }
}
);

const create = asyncHandler(async (req, res) => {
    //Destruct the data sent from req.body 
    const { name, description, price } = req.body

    const uploader = async (path) => await cloudinary.uploads(path, "Images")

    try {

        if (req.method === 'POST') {
            const urls = []
            const files = req.files;
            for (const file of files) {
                const { path } = file;
                const newPath = await uploader(path)
                urls.push(newPath)
                fs.unlinkSync(path)
            }

            //we use uuidv4 to generate a random and unique id for the products
            const productId = uuidv4();

            //creating the product
            const product = await new productModel({
                productId: productId,
                name: name,
                description: description,
                price: price,
                files: urls
            })

            product.save()
            return res.status(200).json({
                success: true,
                message: "product created sucessfully",
                data: product
            })
        } else {
            return res.status(405).json({
                err: `${req.method} method not allowed`
            })
        }

    } catch (error) {
        return res.status(412).send({
            success: false,
            message: error.message
        })
    }

});

const update = asyncHandler(async (req, res) => {
    //Destruct the data sent from req.body 
    const { name, description, price } = req.body

    const uploader = async (path) => await cloudinary.uploads(path, "Images")

    //Destructing the id from req.params
    const { id } = req.params

    //assigning the specfic product to variable called product
    let product = await productModel.findOne({ productId: id });

    try {

        if (product) {
            //updating the datas of that product
            if (req.method === 'PUT') {
                const urls = []
                const files = req.files;
                for (const file of files) {
                    const { path } = file;
                    const newPath = await uploader(path)
                    urls.push(newPath)
                    fs.unlinkSync(path)
                }

                //Updating the product
                product.updateOne(
                    {
                        $set: {
                            name: name,
                            description: description,
                            price: price,
                        }
                    },
                    {}, { new: true }
                )

                return res.status(200).json({
                    success: true,
                    message: "product updated sucessfully",
                    data: req.body
                })
            } else {
                return res.status(405).json({
                    err: `${req.method} method not allowed`
                })
            }
        } else {
            return res.status(400).json({
                success: false,
                message: "product not found",
            })
        }

    } catch (error) {
        return res.status(412).send({
            success: false,
            message: error.message
        })
    }
});

//Delete a single product
const deleteProduct = asyncHandler(async (req, res) => {
    //Destructing id from req.params
    const { id } = req.params

    try {

        //Fetching single product using the id in the req.params from the database and assigning it to product
        await productModel.deleteOne({ productId: id });

        //Since there is no data to be responde we simple send a message
        return res.status(200).json({
            success: true,
            message: "product deleted sucessfully",
        })

    } catch (error) {
        return res.status(412).send({
            success: false,
            message: error.message
        })
    }

})



module.exports = {
    get,
    show,
    create,
    update,
    deleteProduct,
}