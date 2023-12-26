const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
    serviceName:{
        type:String,
        required:true,
    },
    serviceDescription:{
        type:String,
    },
    serviceType:{
        type:String,
    },
    servicePrice:{
        type:Number,
    },
    serviceArea:{
        type:String,
    },
    userId: {
        type:String,
    },
})

module.exports = mongoose.model("services", ServiceSchema);