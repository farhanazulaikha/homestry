import React from 'react'
import { Card, CardGroup } from 'react-bootstrap';
import cleaning from './../assets/cleaning.png'
import gardening from './../assets/gardening.png'
import babysitting from './../assets/babysitting.png'
import tutoring from './../assets/tutoring.png'
import './Services.css'


function Services() {
    return(
        <>
        <h1 className="fs-1 d-flex justify-content-center text-center changeFont">OUR SERVICES</h1><br/><br/>
            <CardGroup>
                <Card className="m-5 border">
                    <Card.Img className="image mx-auto" variant="top" src={cleaning} />
                    <Card.Body>
                    <Card.Title className="text-center fst-italic changeFont">Cleaning</Card.Title>
                    </Card.Body>
                </Card>
                <Card className="m-5 border">
                    <Card.Img  className="image mx-auto" variant="top" src={gardening} />
                    <Card.Body>
                    <Card.Title className="text-center fst-italic changeFont">Gardening</Card.Title>
                    </Card.Body>
                </Card>
                <Card className="m-5 border">
                    <Card.Img  className="image mx-auto" variant="top" src={babysitting} />
                    <Card.Body>
                    <Card.Title className="text-center fst-italic changeFont">Babysitting</Card.Title>
                    </Card.Body>
                </Card>
                <Card className="m-5 border">
                    <Card.Img className="image mx-auto" variant="top" src={tutoring} />
                    <Card.Body>
                    <Card.Title className="text-center fst-italic changeFont">Tutoring</Card.Title>
                    </Card.Body>
                </Card>
                </CardGroup>
        </>
    )
}

export default Services;