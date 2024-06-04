




import {Container  ,Form,Modal, Col,InputGroup,Button, Nav,Navbar
  , Row,Image} from 'react-bootstrap';
  import Axios from "axios";
import React, { useState, useEffect, memo } from "react";
import { Link } from "react-router-dom";
const GenerateReportForCasher = (props) => {
  const [dispaly, setDisplay] = useState([]);
  const [priceStatus, setPriceStatus] = useState("Not payed");
  const [error, setError] = useState(sessionStorage.getItem("userId"));
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [CurrentDate, setCurrentDate] = useState();
  var x;
  var y;
  const [serviceType, setServiceType] = useState("");

  const casherGR = (serviceType) => {
    if (serviceType == "Priscription") {
      drugGRForCasher();
    } else if (serviceType == "Lab") {
      labGRForCaher();
    } else if (serviceType == "Card") {
      cardGRForCaher();
    }
  };
  const cardGRForCaher = () => {
    Axios.post("http://localhost:3001/cardGRForCaher", {
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
  const labGRForCaher = () => {
    Axios.post("http://localhost:3001/labGRForCaher", {
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
  const drugGRForCasher = () => {
    Axios.post("http://localhost:3001/priGRForCaher", {
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
    <>
      {sessionStorage.getItem("userId") ? (
        <Container fluid>
                 <h1>Generate Report</h1>
                <form>
                  {/* <p>
                    from date {fromDate} to date {toDate}
                  </p>{" "} */}
                 
                  <select
                    name="cars"
                    id="cars"
                    required
                    onChange={(event) => {
                      setServiceType(event.target.value);
                      casherGR(event.target.value);
                    }}
                  >
                    <option hidden></option>

                    <option>Lab</option>
                    <option>Card</option>
                    <option>Priscription</option>
                  </select>{" "}
                  <table>
                    <thead>
                      <tr>
                        <th>No </th>
                        <th>Id</th>
                        <th>Full Name</th>

                        <th>Service Fee</th>
                        <th>Price</th>
                        <th>Gender </th>
                        <th>Payment date </th>
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

                          <td>
                            {emp.DrugName}
                            {emp.sFee}
                            {emp.orderDate}
                          </td>
                          <td>{emp.price}</td>
                          <td>{emp.sex} </td>
                          <td>{emp.Date} </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </form>
              
        </Container>
      ) : null}
    </>
  );
};

export default memo (GenerateReportForCasher);

// GenerateReportForPharmasist
