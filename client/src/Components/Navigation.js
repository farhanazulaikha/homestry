import React, { useContext } from 'react'
// import { UserContext } from './../App'
import { Navbar, Nav, Container, Image, NavDropdown } from 'react-bootstrap';
import homestry from './../assets/homestry.png';
import {Link} from 'react-router-dom';
import { SignInContext } from './../Helper/Context';
import { UserContext } from './../Helper/Context';
import './Navigation.css';

function Navigation() {

  const {signedIn, isSignedIn} = useContext(SignInContext);
  const {userId, setUserId} = useContext(UserContext);

  const signOut = () => {
    isSignedIn(false);
  }

  const correctUser = () => {
    isSignedIn(true);
  }

    return (
        <SignInContext.Provider value={ {signedIn, isSignedIn} }>
            <Navbar className="mainNav">
                <Container>
                    <Navbar.Brand><Image className="homestry-logo" src={homestry}></Image></Navbar.Brand>
                        <Nav className="right-side me-auto">
                              {signedIn ?
                                <Nav className="right-side me-auto text-white">
                                  <Nav.Link as = {Link} to = '/profile/:id' className="text-white p-3" onClick={correctUser}>Profile</Nav.Link>
                                  <NavDropdown title="Services" id ="nav-dropdown">
                                    <NavDropdown.Item as = {Link} to = '/:id/allservices'>View All Services</NavDropdown.Item>
                                    <NavDropdown.Item as = {Link} to = '/:id/yourservices'>View Your Services</NavDropdown.Item>
                                  </NavDropdown>
                                  <Nav.Link as = {Link} to = '/bookingrequest/:id' className="p-3 text-white" onClick={correctUser}>Booking Request</Nav.Link>
                                  <Nav.Link as = {Link} to = '/payment/:id' className="p-3 text-white" onClick={correctUser}>Payment</Nav.Link>
                                  <Nav.Link as = {Link} to = '/chat/:id' className="text-white p-3">Chat</Nav.Link>
                                  <Nav.Link as = {Link} to = '/news/:id' className="text-white p-3">News</Nav.Link>
                                  <Nav.Link className="text-white p-3 navParent">
                                    Notification
                                    <div className = "counter">
                                      2
                                    </div></Nav.Link>
                                  <Nav.Link as = {Link} to = '/' className="text-white p-3" onClick={signOut}>Sign Out</Nav.Link>
                                </Nav>
                              : 
                                <Nav className="right-side me-auto">
                                <Nav.Link as = {Link} to = '/' className="text-white p-3">Home</Nav.Link>
                                <Nav.Link as = {Link} to = '/signup' className="text-white p-3">Register</Nav.Link>
                                <Nav.Link as = {Link} to = '/signin' className="p-3 text-white">Sign In</Nav.Link>
                              </Nav>
                              }
                            
                        </Nav>
                </Container>
      </Navbar>
        </SignInContext.Provider>
    )
}

export default Navigation;
