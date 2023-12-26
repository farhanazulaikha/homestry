import React, {useState, useContext, useEffect} from 'react'
import {Button, Form} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import { UserContext } from './../Helper/Context';
import './styling.css';

function EditService(){

    const history = useHistory();
    const {userId, setUserId} = useContext(UserContext);

    const [serviceId, setServiceId] = useState("");
    const [serviceName, setServiceName] = useState("");
    const [serviceDescription, setServiceDescription] = useState("");
    const [serviceType, setServiceType] = useState("");
    const [servicePrice, setServicePrice] = useState(0);
    const [serviceArea, setServiceArea] = useState("");

    const [serName, setSerName] = useState("");
    const [serDescription, setSerDescription] = useState("");
    const [serType, setSerType] = useState("");
    const [serPrice, setSerPrice] = useState(0);
    const [serArea, setSerArea] = useState("");

    useEffect(()=>{

        Axios.get(`http://localhost:8800/${userId}/editthisservice`,{
            id: userId,
        })
        .then((res) => {
            // console.log(res);
            // setUserImage(res.data.userImage);
            // setServiceName(res.data._id);

            let sType =  res.data.serviceType;
            let sT = sType.charAt(0).toLowerCase() + sType.slice(1);

            setServiceId(res.data._id);
            setServiceName(res.data.serviceName);
            setServiceDescription(res.data.serviceDescription);
            setServicePrice(res.data.servicePrice);
            setServiceType(sT);
            setServiceArea(res.data.serviceArea);
            // console.log(sT);
        })
    });

    const updateThisService = (e) => {

        e.preventDefault();

        // console.log(serviceName);
        let type = serType.charAt(0).toUpperCase() + serType.slice(1);

        Axios.post("http://localhost:8800/updateservice", {
            id: userId,
            serviceId: serviceId,
            serviceName: serName,
            serviceDescription: serDescription,
            serviceType: type,
            servicePrice: serPrice,
            serviceArea: serArea,
        })
        .then((res) => {
            if(res.data.isServUpdated){
                window.alert("This service has been updated!");
                history.push(`/${userId}/yourservices`);
            }
            
        })};

        const backToService = () => {
            history.push(`/${userId}/yourservices`);
        }

    return(
        <div  className = "m-3">
            <h1 className='changeFont' >Add Service</h1>
      
      <Form className = "m-3" onSubmit = {updateThisService}>
            <Form.Group className="mb-3" controlId="serviceName">
                <Form.Label>Service name</Form.Label>
                <Form.Control type="text" placeholder="Enter service name" 
                onChange = {(event) => {
                    setSerName(event.target.value);
                  }}
                  defaultValue={serviceName}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="serviceDescription">
                <Form.Label>Service Description</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Enter service description" 
                onChange = {(event) => {
                    setSerDescription(event.target.value);
                  }}
                  defaultValue={serviceDescription}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="serviceType">
                <Form.Label>Service Type</Form.Label>
                <Form.Control as="select" defaultValue={serviceType}
                    onChange = {(event) => {
                        setSerType(event.target.value);
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
                    setSerPrice(event.target.value);
                  }}
                value={servicePrice}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="serviceArea">
                <Form.Label>Service Area</Form.Label>
                <Form.Control type="text" placeholder="Enter service area" 
                    onChange = {(event) => {
                    setSerArea(event.target.value);
                  }}
                  defaultValue={serviceArea}
                />
            </Form.Group>

            <Button className="changeBtn" type="submit">Update Service</Button>
            <Button style={{float: 'left'}} className="cancelBtn"  type="submit" onClick = {backToService}>Cancel</Button>
        </Form>
    
        </div>
    )
}

export default EditService