const { mongoose, model } = require("mongoose");

const AuthSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : false,
        unique : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    isAdmin : {
        type : Boolean,
        required : true,
        default : false,
    }
},{
    timeStamps : true
})


module.exports = mongoose.model("Auth", AuthSchema)