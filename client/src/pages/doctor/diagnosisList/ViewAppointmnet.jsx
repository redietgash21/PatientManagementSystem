import Axios from "axios";




import {Container  ,Form,Modal, Col,InputGroup,Button, Nav,Navbar
  , Row,Image} from 'react-bootstrap';

import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
const ViewAppointmnet = (props) => {
  const [dispaly, setDisplay] = useState([]);
  const [alert1, setalert] = useState(false);
  const [alert2, setalert2] = useState(false);
 
  const [error, setError] = useState("");
  const ViewAppointmnet = () => {
    Axios.post("http://localhost:3001/ViewAppointmnet", {
      MRN: props.taskType=="Patient"?sessionStorage.getItem("userId"):props.libraryHistory,
    })
      .then((response) => {
        if (response.data.message) {
          setalert(true);
          console.log(response.data.message);
          setTimeout(() => {
            setalert(false);
          }, 5000);
        } else if (response.data) {
          setalert2(true);
          setDisplay(response.data);
          console.log(response.data);
        } else {
          console.log("Another Error is Occured");
        }
      })
      .catch((err) => {
        console.log("err", error);
      });
  };

  useEffect(() => {
    ViewAppointmnet();
  }, []);

  return (
   <>
    {sessionStorage.getItem("userId") ? (
        <Container fluid>
          <h1>Your Appointment is hear...</h1>
            <table>
              <thead>
                <tr>
                  <th> Doctor Ful Name</th>
                  <th>Appointment Reason</th>
                  <th>Appointment Date</th>
                  <th>Assigned room</th>
                </tr>
              </thead>
              <tbody>
                {dispaly.map((Patient) => (
                  <tr>
                    <td>{Patient.docId}</td>
                    <td>{Patient.reason}</td>
                    <td>{Patient.appointmentDate}</td>
                    <td>{Patient.assignedRoom}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          
         
        </Container>
      ) : null}
    </>
  );
};

export default ViewAppointmnet;