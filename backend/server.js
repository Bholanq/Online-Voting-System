//import packages

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

//import the routes

import authRoutes from './routes/auth.js';

// load env variables
dotenv.config();

//create an express app instance 
const app = express();

//middleware to handel cors and json parsing 
app.use(cors());  
app.use(express.json())

//mount the auth routes under /api/auth path

app.use('/api/auth',authRoutes);

//connect to the mongoDB database

mongoose.connect(process.env.MONGO_URI,{
useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error("MongoDB connection error",err));

//start the server

const PORT = process.env.PORT || 5000;

app.listen(PORT,() =>{
    console.log(`Server Running on http://localhost:${PORT}`);
});

