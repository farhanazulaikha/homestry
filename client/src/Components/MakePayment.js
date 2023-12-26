import React, {useContext, useState, useEffect} from 'react'
import { UserContext } from './../Helper/Context';
import {Button, Form, Card, Col, Row} from 'react-bootstrap';
import Axios from 'axios';
import './styling.css';

function MakePayment(){

    const {userId, setUserId} = useContext(UserContext);
    const [bookId, setBookingId] = useState("");
    const [paymentRemarks, setPaymentRemarks] = useState("");
    const [paymentList, setPaymentList] = useState([]);
    // const [paymentTrue, setPaymentTrue] = useState(false);

    useEffect(()=>{

        Axios.get(`http://localhost:8800/getpayment/${userId}`,{
            id: userId,
        })
        .then((response) => {
            setPaymentList(response.data);
        })
    });

    // console.log(paymentList);

    const addPayment = (e) => {
        e.preventDefault();

        Axios.post(`http://localhost:8800/addnewpayment/${userId}`, {
            id: userId,
            bookingId: bookId,
            paymentRemarks: paymentRemarks,
            paymentStatus: "Finished",
        })
        .then((res) => {
            if(res.data.savedPayment){
                window.alert("Successfully added payment!");
                // history.push('/allservices');
            }
            else{
                window.alert("Booking ID cannot be found!")
            }
        })};

    return(
        <div className = "d-flex justify-content-center">
            <div  className = "d-flex justify-content-center">
            <Col>
                <Row>
                
                    <h1 className = "m-3 changeFont">Add Payment</h1>
                <Form onSubmit = {addPayment}>
                
                <Form.Group controlId="bookingId" className="mb-3">
                    <Form.Label>Booking ID</Form.Label>
                    <Form.Control type="text" placeholder="Enter booking ID here"
                    onChange = {(event) => {
                        setBookingId(event.target.value);
                      }}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="paymentRemarks">
                    <Form.Label>Payment Remarks</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Enter payment remarks here"
                        onChange = {(event) => {
                          setPaymentRemarks(event.target.value);
                        }}
                      />
                </Form.Group>

                <Button className = "d-flex justify-content-end align-items-end changeBtn" variant="primary" type="submit">
                    Add Payment
                 </Button>

                </Form>
                
                </Row>

                <br/>
                <br/>
                
                <Row>
                {/* <Card> */}
                     {paymentList.map ((val, key) => {
                        return(
                            <div className = "border p-3" key = {key}>
                                <Row>
                                    <Col className = "fw-bold">
                                        {val._id}
                                    </Col>
                                    <Col>
                                        {val.paymentRemarks}
                                    </Col>
                                    <Col>
                                        {val.paymentStatus}
                                    </Col>
                                </Row>
                            </div>
                        )
                    })}  
                    {/* </Card> */}
                </Row>        
                
            </Col>

            </div>
            </div>
    )
}

export default MakePayment