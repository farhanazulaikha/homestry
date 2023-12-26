import React from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { useState } from 'react';
import './styling.css'

function Help () {

    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        }

        setValidated(true);
    };

    return(
        <div className= "m-5">
        <h1 className="fs-1 d-flex justify-content-center text-center changeFont">HELP</h1><br/><br/>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Your name</Form.Label>
                <Form.Control required type="name" placeholder="Your name here..." />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label>Email address</Form.Label>
                <Form.Control  required type="email" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Leave your message here</Form.Label>
                <Form.Control  required as="textarea" rows={3} />
            </Form.Group>
            <Button className="changeBtn" variant="primary" type="submit" onClick={handleShow}>
                Submit
            </Button>
        </Form>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>THANK YOU</Modal.Title>
        </Modal.Header>
        <Modal.Body>We will get back to you in a short time. Do check your e-mail frequently for our reply!</Modal.Body>
        <Modal.Footer>
          <Button className="changeBtn" variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    )
}

export default Help;