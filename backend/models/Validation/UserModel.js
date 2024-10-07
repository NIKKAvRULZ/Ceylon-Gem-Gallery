const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    validationid:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    gemType:{
        type:String,
    },
    colour:{
        type:String,
        required:true,
    },
    clarity:{ //FL,IF,VVS1,VVS2,VS1,VS2,SI1,SI2
        type:String,
        required:true,
    },

    weight:{
        type:Number,
        required:true,
    },

 
    price:{
        type:Number,
        required:true,
    }

});

module.exports = mongoose.model(
    "UserModel",
    userSchema
)