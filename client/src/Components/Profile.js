import React, {useEffect, useState, useContext} from 'react';
import { Card, Button, Image, Col, Row } from 'react-bootstrap';
import Axios from 'axios';
import user from './../assets/user.png'
import './Profile.css'
import { UserContext } from './../Helper/Context';
import { useHistory } from 'react-router-dom';

function Profile() {

    const {userId, setUserId} = useContext(UserContext);
    const history = useHistory();

    // const link = window.location.pathname;
    // const split = link.split("/")
    // const id = split[2];

    // const [userImage, setUserImage] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userFullName, setUserFullName] = useState("");
    const [userContact, setUserContact] = useState("");
    const [userAddress, setUserAddress] = useState("");
    const [userPostCode, setUserPostCode] = useState(0);
    const [userCity, setUserCity] = useState("");
    const [userState, setUserState] = useState("");
    const [userImage, setUserImage] = useState("");

    const [userImg, setUserImg] = useState(false);

    // console.log("id", id);
    useEffect(()=>{

        Axios.get(`http://localhost:8800/profile/${userId}`,{
            id: userId,
        })
        .then((res) => {
            // console.log(res);
            // setUserImage(res.data.userImage);
            setUserEmail(res.data.userEmail);
            setUserFullName(res.data.userFullName);
            setUserContact(res.data.userContact);
            setUserAddress(res.data.userAddress);
            setUserPostCode(res.data.userPostCode);
            setUserCity(res.data.userCity);
            setUserState(res.data.userState);
            setUserImage(res.data.userImage);

            // console.log(res.data.userImage);

            if(res.data.userImage === ""){
                setUserImg(false);
            }
            else{
                setUserImg(true);
            }
            // console.log(res.data.userEmail);
        })
    })

    const updateProfile = () => {

        // console.log(userId);

        Axios.post(`http://localhost:8800/editprofile/${userId}`,{
            id: userId,
        })
        .then((res) => {
            const id = res.data.id;
            // console.log(id);
            history.push(`/editprofile/${id}`)
        })
        // history.push('/editprofile/:id')
    }


    return(
        <div className = "d-flex justify-content-center">
            
            <Card className = "d-flex align-items-start justify-content-start" style={{ width: '75%' }}>
            <h3 className = "m-3 changeFont">Personal Information</h3>

                <Card.Body className="parent">
                <Row >
                    <Col sm={3}>
                    {userImg
                    ?
                    <Image className="user-img" src={userImage} />
                    : 
                    <Image className="user-img" src={user} />
                    }
                    </Col>
                    <Col className="pr">
                    <Row>
                            <Col xs={3} className="fw-bold">
                            Full Name
                            </Col>
                            <Col >
                            {userFullName}
                            </Col>
                    </Row>
                        <Row>
                            <Col xs={3} className="fw-bold">
                                Email
                            </Col>
                            <Col>
                                {userEmail}
                            </Col>
                            
                        </Row>
                        <Row>
                            <Col xs={3} className="fw-bold">
                            Contact
                            </Col>
                            <Col>
                            0{userContact}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={3} className="fw-bold">
                                Address
                            </Col>
                            <Col >
                                {userAddress}, {userPostCode} {userCity}, {userState}
                            </Col>
                        </Row>
                            <Button className = "d-flex justify-content-end align-items-end changeBtn" variant="primary" type="submit" onClick={updateProfile}>
                                Edit Profile
                            </Button>
                            
                    </Col>
                </Row>
                        
                </Card.Body>
            </Card>
            {/* <h1>Welcome, {id}</h1> */}
        </div>
    )
}

export default Profile;
