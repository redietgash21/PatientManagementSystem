




import Axios from "axios";
import React, { useState, memo } from "react";
import { Link } from "react-router-dom";
import {Container  ,Form,Modal, Col,InputGroup,Button, Nav,Navbar
  , Row,Image} from 'react-bootstrap';
const GenerateReportForPharmasist = (props) => {
  const [dispaly, setDisplay] = useState([]);
  const [priceStatus, setPriceStatus] = useState("Not payed");
  const [error, setError] = useState(sessionStorage.getItem("userId"));
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [CurrentDate, setCurrentDate] = useState();
  var x;
  var y;
  const [serviceType, setServiceType] = useState("");
  const getSelectedDate = (separator = "-") => {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    if (month == 0) {
      month = 12;
    }
    return `${year}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${date}`;
  };
  const selectReport = (day) => {
    let date;
    let month;
    let year;
    if (serviceType == "Daily Report") {
      setFromDate(day);
    } else if (serviceType == "Monthly Report") {
      date = day.split("-").slice(2, 3).join("+");
      month = day.split("-").slice(1, 2).join("+") - 1;
      year = day.split("-").slice(0, 1).join("+");
      if (month == 0) {
        month = 12;
      } else if (month < 10) {
        month = "0" + month;
      }

      setFromDate(year + "-" + month + "-" + date);
    } else if (serviceType == "Yearly Report") {
      date = day.split("-").slice(2, 3).join("+");
      month = day.split("-").slice(1, 2).join("+");
      year = day.split("-").slice(0, 1).join("+") - 1;
      setFromDate(year + "-" + month + "-" + date);
    }
  };
  const displaySelect = () => {
    if (props.taskType == "ForRecOff") {
      alert("forrrr rec off");
      generateRecOffReport();
    } else if (props.taskType == "ForCasher") {
      casherGR();
    }
  };
  const generateRecOffReport = () => {
    alert("request is send");
    Axios.post("http://localhost:3001/generateReportForRecordOfficer", {
      CurrentDate: fromDate,
      initalDate: toDate,
      id: sessionStorage.getItem("userId"),
    })
      .then((response) => {
        alert("recievied response");
        setDisplay(response.data);
        console.log(response);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const casherGR = () => {
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
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);

  const visibleHandler = () => {
    visible === false ? setVisible(true) : setVisible(false);
  };
  const visibleHandler1 = () => {
    visible1 === false ? setVisible1(true) : setVisible1(false);
  };
  return (
    <>
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
                    }}
                  >
                    <option hidden></option>
                    <option
                      hidden={props.taskType == "ForRecOff" ? false : true}
                    >
                      Daily Report
                    </option>
                    <option
                      hidden={props.taskType == "ForRecOff" ? false : true}
                    >
                      Monthly Report
                    </option>
                    <option
                      hidden={props.taskType == "ForRecOff" ? false : true}
                    >
                      Yearly Report
                    </option>
                    <option
                      hidden={props.taskType == "ForCasher" ? false : true}
                    >
                      Lab
                    </option>
                    <option
                      hidden={props.taskType == "ForCasher" ? false : true}
                    >
                      Card
                    </option>
                    <option
                      hidden={props.taskType == "ForCasher" ? false : true}
                    >
                      Priscription
                    </option>
                  </select>{" "}
                  <input
                    type="date"
                    hidden={
                      serviceType == "Daily Report" ||
                      serviceType == "Monthly Report" ||
                      serviceType == "Yearly Report"
                        ? false
                        : true
                    }
                    onChange={(event) => {
                      setToDate(event.target.value);
                      selectReport(event.target.value);
                      displaySelect();
                    }}
                  ></input>
                  <table>
                    <thead>
                      <tr>
                        <th>No </th>
                        <th>Id</th>
                        <th>Full Name</th>
                        <th
                          hidden={props.taskType == "ForCasher" ? true : false}
                        >
                          Age{" "}
                        </th>
                        <th
                          hidden={props.taskType == "ForCasher" ? true : false}
                        >
                          Phone number{" "}
                        </th>
                        <th
                          hidden={props.taskType == "ForCasher" ? true : false}
                        >
                          Address{" "}
                        </th>
                        <th
                          hidden={props.taskType == "ForCasher" ? false : true}
                        >
                          Service Fee
                        </th>
                        <th
                          hidden={props.taskType == "ForCasher" ? false : true}
                        >
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
                          <td
                            hidden={
                              props.taskType == "ForCasher" ? true : false
                            }
                          >
                            {emp.age}
                          </td>
                          <td
                            hidden={
                              props.taskType == "ForCasher" ? true : false
                            }
                          >
                            {emp.phoneNumber}
                          </td>
                          <td
                            hidden={
                              props.taskType == "ForCasher" ? true : false
                            }
                          >
                            {emp.region} {emp.woredaOrSubcity}{" "}
                            {emp.ketenaOrGott}
                            {emp.kebele} {emp.houseNumber}
                          </td>
                          <td
                            hidden={
                              props.taskType == "ForCasher" ? false : true
                            }
                          >
                            {emp.sFee}
                          </td>
                          <td
                            hidden={
                              props.taskType == "ForCasher" ? false : true
                            }
                          >
                            {emp.price}
                          </td>
                          <td>{emp.sex} </td>
                          <td>{emp.payDate} </td>
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

export default memo (GenerateReportForPharmasist);

//
