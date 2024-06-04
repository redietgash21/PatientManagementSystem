import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import {Container  ,Form,Modal, Col,InputGroup,Button, Nav,Navbar
  , Row,Image} from 'react-bootstrap';
const ViewHistory = (props) => {
  return (
    < >
      {sessionStorage.getItem("userId") ? (
        <Container fluid>
      
              <h1>Patient History</h1>

              <div className="patientRecord">
                <form>
                  <table>
                    <thead>
                      <tr>
                        <th> History Date</th>

                        <th>Descrption</th>
                      </tr>
                    </thead>
                    <tbody>
                      {props.libraryHistory.map((Patient) => (
                        <tr>
                          <td>{Patient.historyDate}</td>

                          <td>{Patient.descriptionn}</td>
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

export default ViewHistory;
