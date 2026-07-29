import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId , ref:"User" , required:true},
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:false
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
            required:false
    }
})

export const Product = mongoose.model('Product',productSchema);