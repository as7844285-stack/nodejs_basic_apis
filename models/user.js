import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:
    {type:String,
        required:true
    },
     email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
    class:{
        type:String,
        required:false
    },
    age:{
        type:Number,
        requried:true
    },
    work:{
        type:String,
        requried:true
    }

});

export const User= mongoose.model("User",userSchema);