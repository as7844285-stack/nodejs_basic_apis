import mongoose from "mongoose";

const studentsSchema = new mongoose.Schema({
    user:{type: mongoose.Schema.Types.ObjectId,ref:"user",required:true},
    name:{
        type:String,
        required: true
    },
    branch:{
        type:String,
        required:true      
    }
})