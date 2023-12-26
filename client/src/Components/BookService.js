import React, { useState, useContext, useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { UserContext } from './../Helper/Context';
import Axios from 'axios';
import './styling.css';

function BookService(){

    const history = useHistory();

    const link = window.location.pathname;
    const split = link.split("/")
    const serviceId = split[2];

    // console.log(serviceId);

    const {userId, setUserId} = useContext(UserContext);

    const [serviceName, setServiceName] = useState("");
    const [serviceDescription, setServiceDescription] = useState("");
    const [serviceType, setServiceType] = useState("");
    const [servicePrice, setServicePrice] = useState(0);
    const [serviceArea, setServiceArea] = useState("");

    const [serviceDate, setServiceDate] = useState(new Date());
    const [serviceHour, setServiceHour] = useState(0);
    const [serviceRemarks, setServiceRemarks] = useState("");

    useEffect(()=>{

        Axios.get(`http://localhost:8800/bookservice/${serviceId}`,{
            id: serviceId,
        })
        .then((res) => {
            // console.log(res.data.serviceId);
            // setUserImage(res.data.userImage);
            setServiceName(res.data.serviceName);
            setServiceDescription(res.data.serviceDescription);
            setServiceType(res.data.serviceType);
            setServicePrice(res.data.servicePrice);
            setServiceArea(res.data.serviceArea);
        })
    })

    const bookThisService = (e) => {

        e.preventDefault();

        Axios.post("http://localhost:8800/bookthisservice", {
            serviceId: serviceId,
            clientId: userId,
            serviceDate: serviceDate,
            serviceHour: serviceHour,
            serviceRemarks: serviceRemarks,
            serviceTotPrice: total,
            requestStatus: "Pending",
        })
        .then((res) => {
            if(res.data.isSucceed){
                // console.log(res.data.serviceId);
                window.alert('Booking has been made successfully!');
                history.push(`/${userId}/allservices`);
            }
        })
    }

    const total = servicePrice * serviceHour;

    return(
        <div className = "m-3 justify-content-center">
            <h1 className="changeFont bookService" >Book This Service</h1>

            <div className='d-flex justify-content-center'>
            <Card className = "d-flex justify-content-center text-center bookCard" style={{ width: '60%' }}>
                <Card.Body>
                            <Card.Title className="fw-bold">Service Name: {serviceName}</Card.Title>
                            <Card.Title className="fw-bold">Service Description: {serviceDescription}</Card.Title>
                            <Card.Title className="fw-bold">Service Type: {serviceType}</Card.Title>
                            <Card.Title className="fw-bold">Service Price (RM): {servicePrice}</Card.Title>
                            <Card.Title className="fw-bold">Service Area: {serviceArea}</Card.Title>
                </Card.Body>
            </Card>
            </div>
            <br/>
            <br/>
            <br/>
            
            <div className='d-flex justify-content-center'>
            <Card className = "d-flex justify-content-center" style={{ width: '70%' }}>
            <Form className = "m-3" onSubmit = {bookThisService}>
                    <Form.Group className="mb-3" controlId="serviceDate">
                        <Form.Label>Service date</Form.Label>
                        <Form.Control type="date" placeholder="Choose your service date here" 
                        onChange = {(event) => {
                            setServiceDate(event.target.value);
                        }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="serviceHour">
                        <Form.Label>Service Hour</Form.Label>
                        <Form.Control type="text" placeholder="Enter service hour here" 
                        onChange = {(event) => {
                            setServiceHour(event.target.value);
                        }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="servicePrice">
                        <Form.Label>Remarks</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Enter remarks here" 
                        onChange = {(event) => {
                            setServiceRemarks(event.target.value);
                        }}
                        />
                    </Form.Group>

                    <Form.Group  className="mb-3 border-0" controlId="serviceTotPrice">
                        <Form.Label>Total Price (RM)</Form.Label>
                        <Form.Control type="text"
                            value={total}
                            readOnly={true}
                        />
                    </Form.Group>

                    <Button style={{float:'left'}} className="changeBtn" type="submit">Book Service</Button>
            </Form>
            </Card>   
            </div>
            
            
        </div>
    )
}

export default BookService