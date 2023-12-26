import React, { useEffect, useState, useContext } from "react";
import { Button, Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import { UserContext } from "./../Helper/Context";
import './styling.css';

function AllServices() {
  const history = useHistory();
  const { userId, setUserId } = useContext(UserContext);
  const [serviceList, setServiceList] = useState([]);
  // const [servName, searchServiceName] = useState("");

  // let count = 0;

  // const addNew = () => {
  //   history.push("/addservice");
  // };

  useEffect(() => {
    Axios.get(`http://localhost:8800/${userId}/viewallservices`, {
      id: userId,
    }).then((response) => {
      setServiceList(response.data);
      
    });
  }, [userId]);

  // console.log(serviceList1);

  const bookNow = (event, id) => {
    history.push(`/bookservice/${id}`);
  };

  // const filterService = (services, servName) => {
  //     {

  //     }
  // };

  // const searchService = () => {
  //     Axios.post('http://localhost:8800/searchservice',{
  //         serviceName: servName,
  //     })
  //     .then((response) => {
  //         // filterService(response.data, servName);
  //         setServiceList(response.data);
  //     })
  // }

  // const data = [
  //     {
  //       id: "1",
  //       name: "Cleaning"
  //     },
  //     {
  //       id: "2",
  //       name: "Gardening"
  //     },
  //     {
  //       id: "3",
  //       name: "Babysitting"
  //     },
  //     {
  //       id: "4",
  //       name: "Tutoring"
  //     }
  //   ];

  //   const [types, serviceTypes] = useState([
  //     {
  //       id: "",
  //       name: ""
  //     }
  //   ]);

  // const handleToggle = (e) => {

  //     // e.preventDefault();
  //     console.log(e.target.value);
  // }

  return (
    <div className="m-5">
      {/* <Button style={{float: 'right'}}
        onClick={addNew}
        className="d-flex align-items-end justify-content-end changeBtn"
      >
        Add Service
      </Button> */}
      <br />
      <br />

      {/* {serviceTypes.map ((val1, key1) => {
                    return(
                        <div key = {key1}>
                        <Form.Check type="checkbox" value={val1.name}
                            // onChange={(event) => setCheckedType(event.target.checked)}
                             />
                        </div>
                    )
                    
                })
                } */}

      {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Cleaning" value="Cleaning"
                        onChange={(event) => setCheckedType(event.target.checked)}
                        />
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Gardening" value="Gardening"
                        onChange={(e) => handleToggle(e.target.value)}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Babysitting" value="Babysitting"
                        onChange={(e) => handleToggle(e.target.value)}/>
                    </Col>
                    <Col>
                        <Form.Check type="checkbox" label="Tutoring" value="Tutoring"
                        onChange={(e) => handleToggle(e.target.value)}/>
                    </Col>
                </Row>
                </Form.Group> */}

      {/* <Form onSubmit = {searchService} className = "m-3">
                <Row>
                    <Col>
                    <Form.Group className="mb-3" controlId="servicePrice">
                        
                        <Form.Control type="text" placeholder="Search service name here..."
                        onChange = {(event) => {
                            searchServiceName(event.target.value);
                        }}
                        />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Button type="submit">Search</Button>
                    </Col>
                </Row>
                
                <br/>
                </Form> */}

      <h1 className="changeFont">List of Services</h1>
      <br />

      <Table striped bordered hover>
        <thead>
          <tr className="changeFont">
            {/* <th>No.</th> */}
            <th>Service Name</th>
            <th>Service Description</th>
            <th>Service Type</th>
            <th>Service Price/Hour</th>
            <th>Service Area</th>
            <th>Action</th>
          </tr>
        </thead>
        {serviceList.map((val, key) => {
          return (
            <tbody key={key}>
              <tr>
                {/* <td>c</td> */}
                {/* <td>{val._id}</td> */}
                <td>{val.serviceName}</td>
                <td>{val.serviceDescription}</td>
                <td>{val.serviceType}</td>
                <td>{val.servicePrice}</td>
                <td>{val.serviceArea}</td>
                          <td>
                           
                            <Button className="changeBtn"
                              onClick={(event) => {
                                bookNow(event, val._id);
                              }}
                            >
                              Book Now
                            </Button>
                           
                        </td>
              </tr>
            </tbody>
          );
        })}
      </Table>
    </div>
  );
}

export default AllServices;
