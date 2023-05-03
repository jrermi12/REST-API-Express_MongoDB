// Importing the development support form utils/development.js 
const { printConsole } = require("../utils/devlopment");

//Importing the mongoose library used to make the mongodb connection
const mongoose = require("mongoose")

//Importing the mongodb atlas link 
const MONGO_DB_URI = process.env.MONO_REMOTE_URL; 
//creating a function called connectToDB that handles the database connectio 
const connectToDB = async () => {
    try {
      printConsole(
  
        { data: "Connecting to MongoDB ......" },
        { printLocation: "db_config.js:12" },
        { textColor: "yellow" }
      );

      //creating the mongodb database connection by using MONOG_DB_URI
      const DBConnection = await mongoose.connect("mongodb+srv://restapi:D1hlCxGbZITD3vqU@cluster0.r3laqgl.mongodb.net", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      printConsole(
        
        { data: `Database Connected : ${DBConnection.connection.host}` },
        { printLocation: "db_config.js:24" },
        {
          textColor: "green",
        }
      );
    } catch (error) {
      printConsole(error);
  
      process.exit(1);
    }
  };

// EXPORTING THE connectToDB function 
module.exports = connectToDB;