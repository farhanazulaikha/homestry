import React, {useState, useContext} from 'react'
import {Button, Form} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import { UserContext } from './../Helper/Context';
import './styling.css';

function AddService(){

    const history = useHistory();
    const {userId, setUserId} = useContext(UserContext);


    const [serviceName, setServiceName] = useState("");
    const [serviceDescription, setServiceDescription] = useState("");
    const [serviceType, setServiceType] = useState("");
    const [servicePrice, setServicePrice] = useState(0);
    const [serviceArea, setServiceArea] = useState("");

    const addNewService = (e) => {

        e.preventDefault();

        // console.log(serviceName);
        let type = serviceType.charAt(0).toUpperCase() + serviceType.slice(1);

        Axios.post("http://localhost:8800/addnewservice", {
            userId: userId,
            serviceName: serviceName,
            serviceDescription: serviceDescription,
            serviceType: type,
            servicePrice: servicePrice,
            serviceArea: serviceArea,
        })
        .then((res) => {
            if(res.data.isSuccessful){
                window.alert("Successfully added service!");
                history.push(`/${userId}/yourservices`);
            }
            
        })};

    return(
        <div  className = "m-3">
            <h1 className='changeFont'>Add Service</h1>
      
      <Form  className = "m-3 " onSubmit = {addNewService}>
            <Form.Group className="mb-3" controlId="serviceName">
                <Form.Label>Service name</Form.Label>
                <Form.Control type="text" placeholder="Enter service name" 
                onChange = {(event) => {
                    setServiceName(event.target.value);
                  }}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="serviceDescription">
                <Form.Label>Service Description</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Enter service description" 
                onChange = {(event) => {
                    setServiceDescription(event.target.value);
                  }}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="serviceType">
                <Form.Label>Service Type</Form.Label>
                <Form.Control as="select" 
                    onChange = {(event) => {
                        setServiceType(event.target.value);
                    }}
                >
                    <option>Select your service type here...</option>
                    <option value="cleaning">Cleaning</option>
                    <option value="gardening">Gardening</option>
                    <option value="babysitting">Babysitting</option>
                    <option value="tutoring">Tutoring</option>
                </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="servicePrice">
                <Form.Label>Service Price Per Hour</Form.Label>
                <Form.Control type="number" placeholder="Enter service price per hour" 
                onChange = {(event) => {
                    setServicePrice(event.target.value);
                  }}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="servicePrice">
                <Form.Label>Service Area</Form.Label>
                <Form.Control type="text" placeholder="Enter service area" 
                    onChange = {(event) => {
                    setServiceArea(event.target.value);
                  }}
                />
            </Form.Group>

            <Button style={{float:'left'}} className='changeBtn' type="submit">Add New Service</Button>
        </Form>
    
        </div>
    )
}

export default AddService