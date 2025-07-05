//this file contains the schema for model

//import libs
import mongoose from "mongoose";


//make the new schema 

const userSchema = new mongoose.Schema({

    username:{
        type: String,
        required:true,
        unique:true,
    },
    password:{
        type: String,
        required:true,
    },
    role:{
        type: String,
        enum:['voter','admin'],
        default: 'voter',
    }
});

const User = mongoose.model('User',userSchema);
export default User;