import React, {useState, useEffect, useContext} from 'react'
import {Form, Row, Col, Button, Card} from 'react-bootstrap';
import Axios from 'axios'
import { UserContext } from './../Helper/Context';
import { useHistory } from 'react-router-dom';
import './styling.css';

function EditProfile(){

    const {userId, setUserId} = useContext(UserContext);
    const history = useHistory();

    // const [userId, setUserEmail] = useState("");
    //for displaying user information in the form
    const [userEmail, setUserEmail] = useState("");
    const [userFullName, setUserFullName] = useState("");
    const [userContact, setUserContact] = useState("");
    const [userAddress, setUserAddress] = useState("");
    const [userPostCode, setUserPostCode] = useState("");
    const [userCity, setUserCity] = useState("");
    const [userState, setUserState] = useState("");
    const [userImage, setUserImage] = useState("");

    //for updating user information
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [contact, setContact] = useState("");
    const [address, setAddress] = useState("");
    const [postCode, setPostCode] = useState(0);
    const [city, setCity] = useState("");
    const [states, setStates] = useState("");
    const [image, setImage] = useState("");

    

    useEffect(()=>{

        Axios.get(`http://localhost:8800/edituser/${userId}`,{
            id: userId,
        })
        .then((res) => {
            // console.log(res);
            // setUserImage(res.data.userImage);
            setUserId(res.data._id);
            setUserEmail(res.data.userEmail);
            setUserFullName(res.data.userFullName);
            setUserContact(res.data.userContact);
            setUserAddress(res.data.userAddress);
            setUserPostCode(res.data.userPostCode);
            setUserCity(res.data.userCity);
            setUserState(res.data.userState);
            setUserImage(res.data.userImage);
            // console.log(res.data.userEmail);
        })
    });

    const updateThisUser = (e) => {

        // e.preventDefault();

        Axios.post("http://localhost:8800/updateuser", {
            id: userId,
            userEmail: email,
            userFullName: fullName,
            userContact: contact,
            userAddress: address,
            userPostCode: postCode,
            userCity: city,
            userState: states,
            userImage: image,

        }).then((res) => {
            if(res.data.isUpdated){
                // console.log(res.data.id);
                let userId = res.data.id;
                window.alert('Your profile has been updated!');
                history.push(`/profile/${userId}`);
            }
            else{
                window.alert('!')
            }
        })
    
        e.preventDefault();

    };

    const backToProfile = () => {
        history.push(`/profile/${userId}`);
    }
    
    // const setUserFullName = (e) => {
    //     var newFullName = {};
    //     newFullName[e.target.userFullName] = e.target.value;
    //     setUserFullName(newFullName);
    // }

    return(
        <div className="d-flex justify-content-center">
            <Card className="d-flex m-5 form-style" style={{ width: '60%' }}>
                <Card.Body>
                <Form onSubmit = {updateThisUser}>
                <h1 className="fs-1 d-flex justify-content-center text-center changeFont">Update My Profile</h1>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Paste link of your picture here</Form.Label>
                    <Form.Control type="text"
                    onChange = {(event) => {
                        setImage(event.target.value);
                      }}
                      defaultValue={userImage}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="userEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter your email here" defaultValue={userEmail}
                        onChange = {(event) => {
                          setEmail(event.target.value);
                        }}
                      />
                </Form.Group>

                <Form.Group className="mb-3" controlId="userFullName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter full name here"
                    defaultValue={userFullName}
                    onChange = {(event) => {
                      setFullName(event.target.value);
                    }}
                   
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="userContact">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control type="text" placeholder="Enter contact number here"  defaultValue={userContact}
                    onChange = {(event) => {
                      setContact(event.target.value);
                    }}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="userAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="Enter address here" defaultValue={userAddress}
                    onChange = {(event) => {
                      setAddress(event.target.value);
                    }}
                    />
                </Form.Group>

                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="userPostCode">
                        <Form.Label>Postcode</Form.Label>
                        <Form.Control type="number" placeholder="Enter postcode here" defaultValue={userPostCode}
                        onChange = {(event) => {
                        setPostCode(event.target.value);
                        }}
                        />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="userCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" placeholder="Enter city here" defaultValue={userCity}
                        onChange = {(event) => {
                        setCity(event.target.value);
                        }}
                        />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="userState">
                        <Form.Label>State</Form.Label>
                        <Form.Control type="text" placeholder="Enter state here" defaultValue={userState}
                        onChange = {(event) => {
                        setStates(event.target.value);
                        }}
                        />
                        </Form.Group>
                    </Col>
                </Row>

                <Button style={{float: 'right'}} className = "d-flex justify-content-end align-items-end changeBtn" variant="primary" type="submit">
                    Update Profile
                 </Button>

                 <Button style={{float: 'left'}} className = "d-flex justify-content-end align-items-end cancelBtn" variant="primary" type="submit" onClick={backToProfile}>
                                Cancel
                </Button>

                </Form>
                </Card.Body>
            </Card>
            </div>
    )
}

export default EditProfile;