const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    userEmail:{
        type:String,
    },
    userPassword:{
        type:String,
    },
    userFullName:{
        type:String,
    },
    userContact:{
        type:Number,
    },
    userAddress:{
        type:String,
    },
    userPostCode:{
        type:Number,
    },
    userCity:{
        type:String,
    },
    userState:{
        type:String,
    },
    userImage:{
        type:String,
    },
})

module.exports = mongoose.model("users", UserSchema);