import React, {useState, useEffect, useContext} from 'react'
import { useHistory } from "react-router-dom";
import Axios from "axios";
import { UserContext } from "./../Helper/Context";
import {Button, Table} from 'react-bootstrap';
import './styling.css';

function YourServices(){
    const history = useHistory();
    const { userId, setUserId } = useContext(UserContext);
    const [serviceList, setServiceList] = useState([]);

    const addNew = () => {
        history.push("/addservice");
      };
    
      useEffect(() => {
        Axios.get(`http://localhost:8800/${userId}/viewyourservices`, {
          id: userId,
        }).then((response) => {
          setServiceList(response.data);
          
        });
      }, [userId]);

    const updateNow = () => {
        Axios.post("http://localhost:8800/editservice",{
            id: userId,
        })
        .then((res) => {
            // const id = res.data.id;
            // console.log(id);
            history.push('/editservice')
        })
    }

    return(
        <div className="m-5">
      <Button style={{float:'right'}}
        onClick={addNew}
        className="d-flex align-items-end justify-content-end changeBtn"
      >
        Add Service
      </Button>
      <br />
      <br />
      <h1 className='changeFont'>List of Services</h1>
      <br />

      <Table striped bordered hover>
        <thead>
          <tr className='changeFont'>
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
                <Button className='changeBtn'
                    onClick={(event) => {
                    updateNow(event, val._id);
                    }}
                >
                    Edit
                </Button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </Table>
      </div>
    )
}

export default YourServices