const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const cors = require("cors");
const multer = require("multer");
const path = require('path');


// const ObjectId = require('mongoose').Types.ObjectId;

let UserModel = require("./models/User");
let ServiceModel = require("./models/Service");
let BookingModel = require("./models/Booking");
let PaymentModel = require("./models/Payment");

const bcrypt = require('bcrypt');


app.use(express.json());
app.use(cors());

dotenv.config();

import { Server } from "socket.io";

const io = new Server({});

io.on("connection", (socket) => {

});

io.listen(3000);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("DB Connection Successful"))
.catch((err) => console.log(err));

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './../client/public/uploads/')
    },

    filename: (req, file, callback) => {
        // console.log(file);
        callback(null, file.originalname);
    }
})

const upload = multer({storage: storage});

app.post("/signup", async(req, res) => {

    const hashedPassword = await bcrypt.hash(req.body.userPassword, 10);
    let checkUser = false;

    const user = new UserModel(
        {   
            userEmail: req.body.userEmail,
            userPassword: hashedPassword,
            userFullName: req.body.userFullName,
            userContact: req.body.userContact,
            userAddress: req.body.userAddress,
            userPostCode: req.body.userPostCode,
            userCity: req.body.userCity,
            userState: req.body.userState,
            userImage: req.body.userImage,
        }
    );

    try{
        UserModel.findOne({userEmail:user.userEmail}, function(err, existingUser){
            // console.log(user.userEmail);
            if(existingUser){
                res.json(err);
                // window.alert("User has existed!");
            }
            else{
                user.save();
                res.json(user);
            }
        })
    }
        catch(err){
            console.log(err);
    }
});

app.post("/signin", function(req, res) {

    const email = req.body.userEmail;
    const password = req.body.userPassword;
    let isAuthorized = false;
    
    try{
        UserModel.findOne({userEmail:email}, function(err, foundUser){
            if(foundUser){
                bcrypt.compare(password, foundUser.userPassword, function(err, result){
                    if(result === true){
                        console.log('user exists');
                        res.json({
                            _id: foundUser._id,
                            isAuthorized: true,
                        });
                        // res.send('user exists');
                    }
                    else{
                        res.json({
                            isAuthorized: false,
                        })
                        
                        console.log('type again!!');
                    }
                });
            }
        }
    )}
    catch(err){
        console.log(err);
    }
    
});

app.get("/profile/:id", function(req, res){

    const id = req.params.id;

    try{
        UserModel.findOne({_id:id}, function(err, user){
            if(user){
                        res.send({
                            userEmail: user.userEmail,
                            userPassword: user.userPassword,
                            userFullName: user.userFullName,
                            userContact: user.userContact,
                            userAddress: user.userAddress,
                            userPostCode: user.userPostCode,
                            userCity: user.userCity,
                            userState: user.userState,
                            userImage: user.userImage,
                        })
                    }
                })
    }
    catch(err){
        console.log(err);
    }
});

app.post("/addnewservice", async(req, res) => {

    let isSuccessful = false;

    const service = new ServiceModel(
        {   
            userId: req.body.userId,
            serviceName: req.body.serviceName,
            serviceDescription: req.body.serviceDescription,
            serviceType: req.body.serviceType,
            servicePrice: req.body.servicePrice,
            serviceArea: req.body.serviceArea,
        }
    );

    try{
       await service.save();
       res.send({
           isSuccessful: true,
       })
    }
        catch(err){
            console.log(err);
    }
});

app.get("/:id/viewallservices", async(req, res) => {
    const id = req.params.id;
    // console.log(id);

    ServiceModel.find({userId: { $ne: id }}, (err, result) => {
        if(err){
            res.send(err);
        }

        res.send(result);
    })
})

app.get("/:id/viewallusers", async(req, res) => {
    const id = req.params.id;
    // console.log(id);

    UserModel.findOne({userId: id},(err, result) => {
        if(err){
            res.send(err);
        }

        res.send(result);
    })
})

app.get("/:id/viewyourservices", async(req, res) => {
    const id = req.params.id;
    // console.log(id);

    ServiceModel.find({userId: id}, (err, result) => {
        if(err){
            res.send(err);
        }

        res.send(result);
    })
})

app.post("/searchservice", async(req,res) => {

    const servName = req.body.serviceName;
    let isFoundService = false;
    // console.log(servName);
    try{
    ServiceModel.find({serviceName: /.*servName.*/}, (err, result) => {
            if(result){
                res.send(result);
                // console.log(result);
            }
            else{
                res.send(err);
            }           
        })
    }
    catch(err){
        console.log(err);
    }
    
})

app.post("/bookthisservice", async(req, res) => {

    let isSucceed = false;

    const bookings = new BookingModel(
        {   
            serviceId: req.body.serviceId,
            clientId: req.body.clientId,
            serviceDate: req.body.serviceDate,
            serviceHour: req.body.serviceHour,
            serviceRemarks: req.body.serviceRemarks,
            serviceTotPrice: req.body.serviceTotPrice,
            requestStatus: req.body.requestStatus,
        }
    );

    try{
       await bookings.save();
       res.send({
           isSucceed: true,
       })
    }
        catch(err){
            console.log(err);
    }
});

app.get("/bookservice/:id", function(req, res){

    const servId = req.params.id;
    

    try{
        ServiceModel.findOne({_id:servId}, function(err, service){
            if(service){
                res.send({
                    serviceId: service._id,
                    serviceName: service.serviceName,
                    serviceDescription: service.serviceDescription,
                    serviceType: service.serviceType,
                    servicePrice: service.servicePrice,
                    serviceArea: service.serviceArea,
                })
            }
        }
    )
    }
    catch(err){
        console.log(err);
    }
});

app.get("/bookingrequest/:id", async(req, res) => {

    const currUserId = req.params.id;
    let hasBooking = false;

    try{
        ServiceModel.findOne({userId:currUserId}, function(err, service){

            if(service){

                let serviId = service._id;

                BookingModel.findOne({serviceId:serviId}, function(err, booking){
                    if(booking){

                        // const date = moment(booking.serviceDate).format('DD-MM-YYYY')

                        res.send({
                            hasBooking: true,
                            bookingId: booking._id,
                            serviceDate: booking.serviceDate,
                            serviceHour: booking.serviceHour,
                            serviceTotPrice: booking.serviceTotPrice,
                            serviceRemarks: booking.serviceRemarks,
                            requestStatus: booking.requestStatus,
                    });
                }
                    else{
                        res.send({
                            hasBooking: false,
                            bookingId: null,
                            serviceDate: null,
                            serviceHour: null,
                            serviceTotPrice: null,
                            serviceRemarks: null,
                            requestStatus: null,
                        });
                    }
                    
                })
                
            }
        }
    )
    }
    catch(err){
        console.log(err);
    }
});

app.get("/yourbookingrequest/:id", async(req, res) => {

    const currUserId = req.params.id;
    
    // let hasOwnBooking = false;

    try{
        BookingModel.find({clientId: currUserId}, function(err, ownBooking){
            if(ownBooking){
                res.send(ownBooking);
            }
            else{
                res.send(err);
            }
        })
    }
    catch(err){
        console.log(err);
    }
});

app.post("/editprofile/:id", function(req, res){

    const id = req.params.id;

    try{
        UserModel.findOne({_id:id}, function(err, user){
            if(user){
                res.send({
                    id: user._id,
                    userEmail: user.userEmail,
                    userFullName: user.userFullName,
                    userContact: user.userContact,
                    userAddress: user.userAddress,
                    userPostCode: user.userPostCode,
                    userCity: user.userCity,
                    userState: user.userState,
                    userImage: user.userImage,
                })
            }
        }
    )
    }
    catch(err){
        console.log(err);
    }
});

app.get("/edituser/:id", function(req, res){

    const id = req.params.id;

    try{
        UserModel.findOne({_id:id}, function(err, user){
            if(user){
                res.send({
                    _id: user._id,
                    userEmail: user.userEmail,
                    userFullName: user.userFullName,
                    userContact: user.userContact,
                    userAddress: user.userAddress,
                    userPostCode: user.userPostCode,
                    userCity: user.userCity,
                    userState: user.userState,
                    userImage: user.userImage,
                })
            }
        }
    )
    }
    catch(err){
        console.log(err);
    }
});

app.post("/updateuser", function(req, res) {

    const id = req.body.id;
    let isUpdated = false;

    // console.log(id);
    // const email1 = req.body.userEmail;
    // const fullName = req.body.userFullName;
    // const contact = req.body.userContact;
    // const address = req.body.userAddress;
    // const postCode = req.body.userPostCode;
    // const city = req.body.userCity;
    // const state = req.body.userState;

    // const user1 = await UserModel.findById(new ObjectId(id));

    try{
        UserModel.findOne({_id:id}, function(err, user1){
            if(user1) {
                user1.userEmail = req.body.userEmail || user1.userEmail;
                user1.userFullName = req.body.userFullName || user1.userFullName;
                // || user.userFullName;
                user1.userContact = req.body.userContact || user1.userContact;
                // || user.userContact;
                user1.userAddress = req.body.userAddress || user1.userAddress;
                // || user.userAddress;
                user1.userPostCode = req.body.userPostCode || user1.userPostCode;
                // || user.userPostCode;
                user1.userCity = req.body.userCity || user1.userCity;
                // || user.userCity;
                user1.userState =  req.body.userState || user1.userState;
                user1.userImage = req.body.userImage || user1.userImage;
                // || user.userState;
                
                const updatedUser = user1.save();

                // console.log(user1.userFullName);
    
                res.send({
                    id: updatedUser._id,
                    // userEmail: updatedUser.userEmail,
                    // userFullName: updatedUser.userFullName,
                    // userContact: updatedUser.userContact,
                    // userAddress: updatedUser.userAddress,
                    // userPostCode: updatedUser.userPostCode,
                    // userCity: updatedUser.userCity,
                    // userState: updatedUser.userState,
                    isUpdated: true,
                })
            }
    
        })
        
    }
    catch(err){
        console.log(err);
    }
});

app.post("/editservice", function(req, res){

    const id = req.body.id;

    try{
        ServiceModel.findOne({userId:id}, function(err, foundServ){
            if(foundServ){
                res.send({
                    _id: foundServ._id,
                    serviceName: foundServ.serviceName,
                    serviceDescription: foundServ.serviceDescription,
                    serviceType: foundServ.serviceType,
                    servicePrice: foundServ.servicePrice,
                    serviceArea: foundServ.serviceArea,
                })
            }
        }
    )
    }
    catch(err){
        console.log(err);
    }
});

app.get("/:id/editthisservice", function(req, res){

    const id = req.params.id;

    try{
        ServiceModel.findOne({userId:id}, function(err, foundServ1){
            if(foundServ1){
                res.send({
                    _id: foundServ1._id,
                    serviceName: foundServ1.serviceName,
                    serviceDescription: foundServ1.serviceDescription,
                    serviceType: foundServ1.serviceType,
                    servicePrice: foundServ1.servicePrice,
                    serviceArea: foundServ1.serviceArea,
                })
            }
        }
    )
    }
    catch(err){
        console.log(err);
    }
});

app.post("/updateservice", function(req, res) {

    const id = req.body.id;
    const serviId = req.body.serviceId;
    let isServUpdated = false;

    try{
        ServiceModel.findOne({_id:serviId}, function(err, foundS){
            if(foundS) {
                foundS.serviceName = req.body.serviceName || foundS.serviceName;
                foundS.serviceDescription = req.body.serviceDescription || foundS.serviceDescription;
                foundS.serviceType = req.body.serviceType || foundS.serviceType;
                foundS.servicePrice = req.body.servicePrice || foundS.servicePrice;
                foundS.serviceArea = req.body.serviceArea || foundS.serviceArea;
                
                const updatedService = foundS.save();

    
                res.send({
                    id: updatedService._id,
                    isServUpdated: true,
                })
            }
    
        })
        
    }
    catch(err){
        console.log(err);
    }
});

app.post("/acceptrequest", function(req, res){

    const id = req.body.id;
    console.log(id);
    let updateBooking = false;

    try{
        BookingModel.findOne({_id:id}, function(err, book){
            if(book){

                book.requestStatus = req.body.requestStatus;

                const updatedBooking = book.save();

                res.send({
                    id: updatedBooking._id,
                    updateBooking: true,
                })
            }
            else{
                res.send({
                    updateBooking: false,
                })
                
            }
        }
    )
    }
    catch(err){
        console.log(err);
    }
});

app.post("/rejectrequest", function(req, res){

    const id = req.body.id;
    console.log(id);
    let updateBooking1 = false;

    try{
        BookingModel.findOne({_id:id}, function(err, book1){
            if(book1){

                book1.requestStatus = req.body.requestStatus;

                const updatedBooking1 = book1.save();

                res.send({
                    id: updatedBooking1._id,
                    updateBooking1: true,
                })
            }
            else{
                res.send({
                    updateBooking1: false,
                })
                
            }
        }
    )
    }
    catch(err){
        console.log(err);
    }
});

app.post("/addnewpayment/:id", function(req, res){

    const id = req.params.id;
    const bookingId = req.body.bookingId;
    let savedPayment = false;
    console.log(bookingId);

    try{
        BookingModel.findOne({_id: bookingId}, function(err, book2){
            if(book2){

                const payment = new PaymentModel(
                    {   
                        providerId: id,
                        bookingId: bookingId,
                        paymentRemarks: req.body.paymentRemarks,
                        paymentStatus: req.body.paymentStatus,
                    }
                );

                // book2.payment = req.body.requestStatus;

                payment.save();

                res.send({
                    id: payment._id,
                    savedPayment: true,
                })
            }
            else{
                res.send({
                    savedPayment: false,
                })
                
            }
        }
    )
    }
    catch(err){
        console.log(err);
    }
});

app.get("/getpayment/:id", function(req, res){

    const id = req.params.id;

    try{
        PaymentModel.find({providerId:id}, function(err, foundPayment){
            if(foundPayment){
                res.send(foundPayment);
            }
            else{
                res.send(err);
            }
        }
    )
    }
    catch(err){
        console.log(err);
    }
});

app.listen(8800, () => {
    console.log('Backend server is running');
})