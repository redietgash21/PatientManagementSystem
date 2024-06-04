import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import {Container  ,Form,Modal, Col,InputGroup,Button, Nav,Navbar
  , Row,Image} from 'react-bootstrap';
const ViewReferIn = (props) => {
  return (
    < >
      {sessionStorage.getItem("userId") ? (
        <Container fluid>
         
              <h1>Refered In Patient</h1>

              <div className="patientRecord">
                <form>
                  <table>
                    <thead>
                      <tr>
                        <th> Refer In Date</th>

                        <th>Refer Reason</th>
                      </tr>
                    </thead>
                    <tbody>
                      {props.libraryHistory.map((Patient) => (
                        <tr>
                          <td>{Patient.referInDate}</td>

                          <td>{Patient.referReason}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </form>
              </div>
        
        </Container>
      ) : null}
    </>
  );
};

export default ViewReferIn;
