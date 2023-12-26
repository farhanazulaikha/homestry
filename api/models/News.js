const mongoose = require("mongoose");

const NewSchema = new mongoose.Schema({
    clientId:{
        type:String,
    },
    newsInformation:{
        type:String,
    },
})

module.exports = mongoose.model("news", NewSchema);