import React, {useEffect, useState, useContext} from 'react'
import { Card, Row, Col, Button, Table, Modal } from 'react-bootstrap';
import { UserContext } from './../Helper/Context';
import Axios from 'axios';
import './styling.css';

var moment = require('moment');

function BookingRequest(){

    const {userId, setUserId} = useContext(UserContext);

    // const [serviceDate, setServiceDate] = useState(new Date());
    // const [requestList, setRequestList] = useState([]);


    // console.log(userId);

    const [bookingId, setId] = useState("");
    const [serviceDate, setServiceDate] = useState(new Date());
    const [serviceHour, setServiceHour] = useState(0);
    const [serviceRemarks, setServiceRemarks] = useState("");
    const [serviceTotPrice, setServiceTotPrice] = useState(0);
    const [requestStatus, setRequestStatus] = useState("");
    const [yourRequestList, setYourRequestList] = useState([]);

    // let noBookingText;
    var [acceptButton, setAcceptButton] = useState(false);
    var [rejectButton, setRejectButton] = useState(false);
    // let acceptButton, rejectButton;

    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleClose1 = () => setShowModal1(false);

    useEffect(()=>{

        Axios.get(`http://localhost:8800/bookingrequest/${userId}`,{
            id: userId,
        })
        .then((res) => {
            
            // console.log(res.data.id);
            // console.log(res.data.serviceHour);
            if(res.data.hasBooking){
                // noBookingText = <h1>You have 1 booking request from client</h1>
                setId(res.data.bookingId);
                setServiceDate(res.data.serviceDate);
                setServiceHour(res.data.serviceHour);
                setServiceRemarks(res.data.serviceRemarks);
                setServiceTotPrice(res.data.serviceTotPrice);
                setRequestStatus(res.data.requestStatus);
                setAcceptButton(true);
                setRejectButton(true);
            }
            else{
                setId(res.data.bookingId);
                setServiceDate(res.data.serviceDate);
                setServiceHour(res.data.serviceHour);
                setServiceRemarks(res.data.serviceRemarks);
                setServiceTotPrice(res.data.serviceTotPrice);
                setRequestStatus(res.data.requestStatus);
                setAcceptButton(false);
                setRejectButton(false);
                // noBookingText = <h1>You have no booking request from client yet!</h1>
            }
            // setClientRequestList(res.data);
        })
    });

    useEffect(()=>{

        Axios.get(`http://localhost:8800/yourbookingrequest/${userId}`,{
            id: userId,
        })
        .then((response) => {
            setYourRequestList(response.data);
        })
    });
    

    const acceptBookRequest = (event, bookingId) => {
        Axios.post('http://localhost:8800/acceptrequest',{
            id: bookingId,
            requestStatus: "Accepted",
        })
        .then((res) => {
            // console.log(res.data.id);
            // console.log(res.data.serviceHour);
            // setServiceDate(res.data.serviceDate);
            // setServiceHour(res.data.serviceHour);
            // setServiceRemarks(res.data.serviceRemarks);
            // setServiceTotPrice(res.data.serviceTotPrice);
            // setRequestStatus(res.data.requestStatus);
            if(res.data.updateBooking){
                // history.push('allservices')
                setShowModal(true);
            }
            else{
                window.alert('salah!');
            }
            
        })
    }

    const rejectBookRequest = (event, bookingId) => {
        Axios.post('http://localhost:8800/rejectrequest',{
            id: bookingId,
            requestStatus: "Rejected",
        })
        .then((res) => {
            if(res.data.updateBooking1){
                // history.push('allservices')
                setShowModal1(true);
            }
            else{
                window.alert('salah!');
            }
            
        })
    }

    return(
        <div className = "d-flex justify-content-center text-center">
            <div  className = "d-flex justify-content-center text-center">
            <Col>
            <Row>
            <Card>
                <Card.Title className = "m-3 changeFont">Booking Request from Client</Card.Title>
                    <Card.Body>
                    {/* {noBookingText} */}
                    <Row>
                        <Col>
                            {bookingId}
                        </Col>
                        <Col>
                            {moment(serviceDate).format('DD-MM-YYYY')}
                        </Col>
                        <Col>
                            {serviceHour}
                        </Col>
                        <Col>
                            {serviceRemarks}
                        </Col>
                        <Col>
                            {serviceTotPrice}
                        </Col>
                        <Col>
                            {requestStatus}
                        </Col>
                        <Col>
                            {acceptButton ?
                                <Button className='changeBtn' onClick={(event) => {
                                    acceptBookRequest(event, bookingId);
                                }}>Accept</Button>
                            :
                            <Button className='changeBtn' onClick={(event) => {
                                acceptBookRequest(event, bookingId);
                            }} disabled>Accept</Button>
                            }
                            
                            {/* {acceptButton} */}
                        </Col>
                        <Col>
                            {/* {rejectButton} */}
                            {rejectButton ?
                                <Button  className='changeBtn' onClick={(event) => {
                                    rejectBookRequest(event, bookingId);
                                }}>Reject</Button>
                            :
                            <Button className='changeBtn' onClick={(event) => {
                                rejectBookRequest(event, bookingId);
                            }} disabled>Reject</Button>
                            }
                        </Col>
                    </Row>
                    </Card.Body>
            </Card>
            </Row>
            <br/>
            <br/>

            <Row>
            <Card>
                <Card.Title className = "m-3 changeFont">Your Booking Request</Card.Title>
                {yourRequestList.map ((val, key) => {
                return(
                    <div key = {key}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                {/* <th>No.</th> */}
                                <th>Booking ID</th>
                                <th>Request Date</th>
                                <th>Request Hour</th>
                                <th>Request Total Price</th>
                                <th>Request Remarks</th>
                                <th>Request Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {/* <td>c</td> */}
                                {/* <td>{val._id}</td> */}
                                <td>{val._id}</td>
                                <td>{moment(val.serviceDate).format('DD-MM-YYYY')}</td>
                                <td>{val.serviceHour}</td>
                                <td>{val.serviceTotPrice}</td>
                                <td>{val.serviceRemarks}</td>
                                <td>{val.requestStatus}</td>
                            </tr>
                        </tbody>
                    </Table>
                    </div>
                )
            })}
            </Card>
            </Row>
            </Col>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>REQUEST STATUS: ACCEPTED</Modal.Title>
                </Modal.Header>
                <Modal.Body>You have accepted this booking request</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showModal1} onHide={handleClose1}>
                <Modal.Header closeButton>
                <Modal.Title>REQUEST STATUS: REJECTED</Modal.Title>
                </Modal.Header>
                <Modal.Body>You have rejected this booking request</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose1}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
            </div>
        </div>
    )
}

export default BookingRequest