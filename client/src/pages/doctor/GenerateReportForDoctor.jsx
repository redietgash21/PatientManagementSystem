




import Axios from "axios";

import React, { useState, memo } from "react";
import { Link } from "react-router-dom";
import {Container  ,Form,Modal, Col,InputGroup,Button, Nav,Navbar
  , Row,Image} from 'react-bootstrap';
const GenerateReportForDoctor = (props) => {
  const [dispaly, setDisplay] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [serviceType, setServiceType] = useState("");

  const selectReport = (serviceType) => {
    alert("select service  type");
    if (serviceType == "Finished Diagnosis") {
      finishedDiagnosisGRForDoc();
    } else if (serviceType == "Prescribe Drug") {
      prescribeDrugGRForDoc();
    } else if (serviceType == "Appointment") {
      appointmentGRForDoc();
    }
  };
  const finishedDiagnosisGRForDoc = () => {
    Axios.post("http://localhost:3001/finishedDiagnosisGRForDoc", {
      id: sessionStorage.getItem("userId"),
    })
      .then((response) => {
        setDisplay(response.data);
        console.log(response);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const prescribeDrugGRForDoc = () => {
    Axios.post("http://localhost:3001/prescribeDrugGRForDoc", {
      id: sessionStorage.getItem("userId"),
    })
      .then((response) => {
        setDisplay(response.data);
        console.log(response);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const appointmentGRForDoc = () => {
    Axios.post("http://localhost:3001/appointmentGRForDoc", {
      id: sessionStorage.getItem("userId"),
    })
      .then((response) => {
        setDisplay(response.data);
        console.log(response);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    < >
      {sessionStorage.getItem("userId") ? (
        <Container>
     
                <form>
                  <p>
                    from date {fromDate} to date {toDate}
                  </p>
                  <select
                    name="cars"
                    id="cars"
                    required
                    onChange={(event) => {
                      setServiceType(event.target.value);
                      selectReport(event.target.value);
                    }}
                  >
                    <option hidden></option>
                    <option>Finished Diagnosis</option>
                    <option>Prescribe Drug</option>
                    <option>Appointment</option>
                  </select>{" "}
                  {/* <input  type="date"    ></input> */}
                  <table>
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>MRN</th>
                        <th>Full Name</th>
                        <th> Age </th>
                        <th> Phone number </th>
                        <th> Address </th>
                        <th>Gender </th>
                        <th>Diagnosis date </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dispaly.map((emp, i) => (
                        <tr>
                          <td>{i + 1}</td>
                          <td>{emp.MRN}</td>
                          <td>
                            {emp.firstName} {emp.middleName} {emp.lastName}
                          </td>
                          <td>{emp.age}</td>
                          <td> {emp.phoneNumber}</td>
                          <td>
                            {emp.region} {emp.woredaOrSubcity}{" "}
                            {emp.ketenaOrGott}
                            {emp.kebele} {emp.houseNumber}
                          </td>

                          <td>{emp.sex} </td>
                          <td>{emp.Date} </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </form>
         
           
         
        </Container>
      ) : null}{" "}
    </>
  );
};

export default memo (GenerateReportForDoctor);

//
