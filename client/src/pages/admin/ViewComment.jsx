






import {Container  ,Form,Modal, Col,InputGroup,Button, Nav,Navbar
  , Row,Image} from 'react-bootstrap';
  import Axios from "axios";
import React, { useState, useEffect, memo } from "react";
import { Link } from "react-router-dom";
const ViewComment = (props) => {
  const [dispaly, setDisplay] = useState([]);

  const [error, setError] = useState("");
  const [errorAlert, seterrorAlert] = useState(false);
   
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);

  const visibleHandler = () => {
    visible === false ? setVisible(true) : setVisible(false);
  };
  const visibleHandler1 = () => {
    visible1 === false ? setVisible1(true) : setVisible1(false);
  };




  const ViewDrug = () => {
    Axios.post("http://localhost:3001/ViewComment")
      .then((response) => {
        if (response.data) {
          setDisplay(response.data);

          console.log(response);
        } else {
          seterrorAlert(true);
          console.log("Something went Wrong...");

          setTimeout(() => {
            seterrorAlert(false);
          }, 4000);
        }
      })
      .catch((err) => {
        console.log("err", error);
      });
  };

  useEffect(() => {
    ViewDrug();
  }, []);
 
  return (
    < >
      {sessionStorage.getItem("userId") ? (
      
          
            <Container fluid>
              <h1>Comments ...</h1>

              <Container fluid>
              
                <form>
                  <table>
                    <thead>
                      <tr>
                        <th> Patient Full Name</th>
                        <th>department</th>
                        <th>patientComment</th>
                        <th>email</th>
                        <th>commentDate</th>
                        <th>Response...</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dispaly.map((emp) => (
                        <tr>
                          <td>
                            {" "}
                            {emp.firstName} {emp.middleName} {emp.lastName}
                          </td>
                          <td>{emp.department}</td>
                          <td>{emp.patientComment}</td>
                          <td>{emp.email}</td>
                          <td>{emp.commentDate}</td>
                          <td>
                            <button>Give Response</button>
                          </td>
                          <td></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {errorAlert && <p>Something Went wrong try again...</p>}
                </form>
              </Container>
            </Container>
          
        
      ) : null}
    </>
  );
};

export default memo (ViewComment);
