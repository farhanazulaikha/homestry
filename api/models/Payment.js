const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
    providerId:{
        type:String,
    },
    bookingId:{
        type:String,
    },
    paymentRemarks:{
        type:String,
    },
    paymentStatus:{
        type:String,
    }
})

module.exports = mongoose.model("payments", PaymentSchema);