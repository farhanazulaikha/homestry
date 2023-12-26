import React, { useContext} from 'react';
import {Form, Button, Card, InputGroup} from 'react-bootstrap';
import { useState } from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import { SignInContext, UserContext } from './../Helper/Context';
import './SignIn.css'

function SignIn() {
  
  const history = useHistory();

  const [userEmail, setEmail] = useState("");
  const [userPassword, setPassword] = useState("");

  const {signedIn, isSignedIn} = useContext(SignInContext);
  const {userId, setUserId} = useContext(UserContext);

  const[passwordShown, setPasswordShown] = useState(false);


  const signIn = (e) => {

    e.preventDefault();

    Axios.post("http://localhost:8800/signin", {
      userEmail: userEmail,
      userPassword: userPassword,
    }).then((res) => {
      // console.log(res);
      const id = res.data._id;
      
      if(res.data.isAuthorized){
        isSignedIn(true);
        setUserId(id);
        history.push(`/profile/${id}`);
      }
      else{
        window.alert("Wrong email/password!");
        // console.log('wrong');
      }
  })};

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
}

  // useEffect(()=>{

  //   if(isRedirect){
  //       history.push('/profile');
  //   }
  //   },[history, isRedirect])

    return (
      <div className="d-flex justify-content-center">
      <Card className="d-flex m-5 form-stylee" style={{ width: '40%' }}>
          <Card.Body>
          <Form onSubmit = {signIn}  className="m-5">
          <h1 className="fs-1 d-flex justify-content-center text-center changeFont">Sign In Form</h1>
          <Form.Group className="mb-3" controlId="userEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter your email here"  
                  onChange = {(event) => {
                    setEmail(event.target.value);
                  }}
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
          </Form.Group>

          <div className = "d-flex flex-end  justify-content-end align-items-end">
            <Button className = "d-flex flex-end justify-content-end align-items-end signInBtn" variant="primary" type="submit">
                Sign In
            </Button>
          </div>
          
          </Form>
          </Card.Body>
      </Card>
  </div>
    )
}

export default SignIn;