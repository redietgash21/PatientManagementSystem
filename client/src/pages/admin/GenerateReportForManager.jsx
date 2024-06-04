





import Axios from "axios";
import React, { useState,memo,  useEffect } from "react";
import { Link } from "react-router-dom";
import {Container  ,Form,Modal, Col,InputGroup,Button, Nav,Navbar
  , Row,Image} from 'react-bootstrap';
const GenerateReportForManager = (props) => {
  const [dispaly, setDisplay] = useState([]);
  const [priceStatus, setPriceStatus] = useState("Not payed");
  const [error, setError] = useState(sessionStorage.getItem("userId"));
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [CurrentDate, setCurrentDate] = useState();
  var x;
  var y;
  const [serviceType, setServiceType] = useState("");
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);

  const visibleHandler = () => {
    visible === false ? setVisible(true) : setVisible(false);
  };
  const visibleHandler1 = () => {
    visible1 === false ? setVisible1(true) : setVisible1(false);
  };
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
    Axios.get("http://localhost:3001/cardGRForCaher")
      .then((response) => {
        setDisplay(response.data);
        console.log(response);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const labGRForCaher = () => {
    Axios.get("http://localhost:3001/labGRForCaher")
      .then((response) => {
        setDisplay(response.data);
        console.log(response);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const drugGRForCasher = () => {
    Axios.get("http://localhost:3001/priGRForCaher")
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
          
            <h3>Generate Report</h3>
         
             
              <form>
                <p>
                  from date {fromDate} to date {toDate}
                </p>{" "}
                jdscjhs {error}
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

                      <th hidden={props.taskType == "ForCasher" ? false : true}>
                        Service Fee
                      </th>
                      <th hidden={props.taskType == "ForCasher" ? false : true}>
                        Price
                      </th>
                      <th>
                        Gender{" "}
                        {(x = fromDate.split("-").slice(1, 2).join("+") - 1)}{" "}
                        {x}
                      </th>
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

                        <td>{emp.sFee}</td>
                        <td>{emp.price}</td>
                        <td>{emp.sex} </td>
                        <td>{emp.payDate} </td>
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

export default memo (GenerateReportForManager);

// GenerateReportForManager
