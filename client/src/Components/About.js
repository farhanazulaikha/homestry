// JS for About Us

import React from 'react'
import { Row, Col, Image, Container } from 'react-bootstrap';
import livingroom from './../assets/livingroom.png';
import './About.css'

function About(){
    
    // let navigate = useNavigate();

    return(
        <>
            <Container>
                <Row border="light" className="row-class m-3 lh-base">
                    <Col>
                        <h1 className="fs-1 changeFont">ABOUT US</h1><br/><br/>
                        <p className="lh-lg changeFont">Homestry offers the best home services you will ever need with only a click away. Whether it be 
                            cleaning your house, watering your plants, babysitting or tutoring your kids, 
                            fret not; we are here to ease your day!</p><br/>
                        
                    </Col>
                    <Col>
                        <Image className="living-room" src={livingroom} />
                    </Col>

                </Row>
            </Container>
        </>
    )
}

export default About;