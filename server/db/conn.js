import mongoose from "mongoose";

import { config } from "dotenv";

config();
// this is where we connect to the database

const dbConnection = async ()=>{
    try{
        //the url of the database is stored in the env
        await mongoose.connect(process.env.ATLAS_URI)
        console.log("Database connected successfully");
        return mongoose.connection;
    }catch(error){
        console.log("Error while connecting to database", error);
    }
}



export default dbConnection;