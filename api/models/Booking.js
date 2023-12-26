const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
    clientId:{
        type:String,
    },
    serviceId:{
        type:String,
    },
    serviceDate:{
        type:Date,
    },
    serviceHour:{
        type:String,
    },
    serviceTotPrice:{
        type:Number,
    },
    serviceRemarks:{
        type:String,
    },
    requestStatus:{
        type: String,
    }
})

module.exports = mongoose.model("bookings", BookingSchema);