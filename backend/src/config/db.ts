
import dotenv from 'dotenv';
import mongoose from "mongoose";

dotenv.config();

const connectDb = async ()=>{
    try{
       const db = await mongoose.connect("mongodb+srv://akshaysolan804:test123@myvideohub.ezrvuoe.mongodb.net/?retryWrites=true&w=majority&appName=Myvideohub");
       console.log("Database is running");
    }catch(error){
       console.error(`Error in connecting to the db ${error}`);
    }
};
export default connectDb;