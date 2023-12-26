import React from 'react';
import {Card, Form, Button, Col, Row, InputGroup} from 'react-bootstrap';
import { useState } from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import PasswordStrengthBar from 'react-password-strength-bar';
import './SignUp.css'

function SignUp() {

    const history = useHistory();

    const [userEmail, setEmail] = useState("");
    const [userPassword, setPassword] = useState("");
    const [userFullName, setFullName] = useState("");
    const [userContact, setContact] = useState("");
    const [userAddress, setAddress] = useState("");
    const [userPostCode, setPostCode] = useState(0);
    const [userCity, setCity] = useState("");
    const [userState, setState] = useState("");

    // const [checkPassword, setCheckPassword] = useState("");

    // const [wrongPassword, setWrongPassword] = useState(false);

    const[passwordShown, setPasswordShown] = useState(false);
    // const[passwordShown1, setPasswordShown1] = useState(false);

    const addUser = (e) => {

        e.preventDefault();

        Axios.post("http://localhost:8800/signup", {
        userImage: "",
        userEmail: userEmail,
        userPassword: userPassword,
        userFullName: userFullName,
        userContact: userContact,
        userAddress: userAddress,
        userPostCode: userPostCode,
        userCity: userCity,
        userState: userState,

        }).then((res) => {
            if(res){

                const authObject = {'Private-Key': '58da88fa-4de6-4aff-91e7-9ef8dfc01383'}

                try {
                    Axios.post('https://api.chatengine.io/users/',
                    {'username': userEmail, 'secret': userPassword}, // Body object
                    {'headers': authObject} // Headers object
                    // { headers: authObject,
                    //  body: {
                    //     'username': res.data.userEmail,
                    //     'secret': res.data.userPassword
                    //     }
                    // }
                    );

                    console.log(res.data.userEmail);
                    console.log(res.data.userPassword);

                    history.push('/signin');
                    
                 } catch (error) {
                     console.log(error)
                 }
            }
            else{
                window.alert('Email has been used!')
            }
        })};

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    }

    // const togglePassword1 = () => {
    //     setPasswordShown1(!passwordShown1);
    // }
    
    return (
        <div className="d-flex justify-content-center">
            <Card className="d-flex m-5 form-style" style={{ width: '50%' }}>
                <Card.Body>
                <Form onSubmit = {addUser} className="m-5">
                <h1 className="m-3 fs-1 d-flex justify-content-center text-center changeFont">Registration Form</h1>
                <Form.Group className="mb-3" controlId="userEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter your email here"  
                        onChange = {(event) => {
                          setEmail(event.target.value);
                        }}
                        required
                      />
                    
                </Form.Group>

                <Form.Group className="mb-3" controlId="userPassword">
                    <Form.Label>Password</Form.Label>
                    <InputGroup>
                        <Form.Control type={passwordShown ? "text" : "password"} placeholder="Enter your password here"  value={userPassword}
                        onChange = {(event) => {
                        setPassword(event.target.value);
                        }}
                        required
                        />
                    <Button className = "showPBtn" onClick = {togglePassword}>Show Password</Button>
                    </InputGroup>
                    <br/>
                    <PasswordStrengthBar password={userPassword} />
                    {/* <p id = "char">
                        <FontAwesome icon=
                    </p> */}
                </Form.Group>

                {/* <Form.Group className="mb-3" controlId="userPassword1">
                    <Form.Label>Confirm Password</Form.Label>
                    <InputGroup>
                        <Form.Control type={passwordShown1 ? "text" : "password"} placeholder="Enter your password again here" 
                        onChange = {(event) => {
                        checkPassword(event.target.value);
                        }}
                        />
                    <Button onClick = {togglePassword1}>Show Password</Button>
                    </InputGroup>
                    <Form.Text>
                            {wrongPassword
                                ?
                                ""
                                :
                                "Passwords do not match!"
                            }
                        </Form.Text>
                </Form.Group> */}

                <Form.Group className="mb-3" controlId="userFullName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter full name here" 
                    onChange = {(event) => {
                      setFullName(event.target.value);
                    }}
                    required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="userContact">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control type="text" placeholder="Enter contact number here" 
                    onChange = {(event) => {
                      setContact(event.target.value);
                    }}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="userAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="Enter address here" 
                    onChange = {(event) => {
                      setAddress(event.target.value);
                    }}
                    />
                </Form.Group>

                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="userPostCode">
                        <Form.Label>Postcode</Form.Label>
                        <Form.Control type="number" placeholder="Enter postcode here" 
                        onChange = {(event) => {
                        setPostCode(event.target.value);
                        }}
                        />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="userCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" placeholder="Enter city here" 
                        onChange = {(event) => {
                        setCity(event.target.value);
                        }}
                        />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="userState">
                        <Form.Label>State</Form.Label>
                        <Form.Control type="text" placeholder="Enter state here" 
                        onChange = {(event) => {
                        setState(event.target.value);
                        }}
                        />
                        </Form.Group>
                    </Col>
                </Row>

                <div className = "d-flex flex-end  justify-content-end align-items-end">
                <Button className = "d-flex flex-end justify-content-end align-items-end signUpBtn" variant="primary" type="submit">
                    Register
                 </Button>
                </div>
               
                </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

export default SignUp
