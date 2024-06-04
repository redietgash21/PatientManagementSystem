import Axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const GenerateReport = (props) => {
  const [dispaly, setDisplay] = useState([]);
  const [priceStatus, setPriceStatus] = useState("Not payed");
  const [error, setError] = useState("");
  const [payId, setPayId] = useState("");
  const [presId, setPresId] = useState("");
  const [labId, setLabId] = useState("");
  const [CurrentDate, setCurrentDate] = useState();
  const [serviceType, setServiceType] = useState("");
  const getCurrentDate = (separator = "-") => {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${date}`;
  };
  const selectReport = (separator = "-") => {
    let newDate = new Date();
    let date;
    let month;
    let year;
    if (serviceType == "Daily Report") {
      date = newDate.getDate();
      month = newDate.getMonth() + 1;
      year = newDate.getFullYear();
    } else if (serviceType == "Monthly Report") {
      date = newDate.getDate();
      month = newDate.getMonth();
      year = newDate.getFullYear();
    } else if (serviceType == "Yearly Report") {
      date = newDate.getDate();
      month = newDate.getMonth() + 1;
      year = newDate.getFullYear() - 1;
    }

    return `${year}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${date}`;
  };
  const displaySelect = () => {
    if (props.taskType == "ForRecOff") {
      generateRecOffReport();
    } else if (props.taskType == "ForCasher") {
      casherGR();
    }
  };
  const generateRecOffReport = () => {
    Axios.post("http://localhost:3001/generateReportForRecordOfficer", {
      CurrentDate: getCurrentDate(),
      initalDate: selectReport(),
    })
      .then((response) => {
        setDisplay(response.data);
        console.log(response);
      })
      .catch((err) => {
        console.log("err", error);
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

  return (
    <div className="BodyParent">
      {sessionStorage.getItem("userId") ? (
        <div>
          {" "}
          <div style={{ display: "flex", top: "0px" }}>
            <div className="Left_Side_Nav">
              <div
                style={{
                  fontSize: "30px",
                  paddingTop: "10px",
                  fontFamily: "fantasy",
                }}
              >
                Menu
              </div>
              <div
                className=""
                style={{
                  fontSize: "30px",
                  marginLeft: "10px",
                  fontFamily: "initial",
                }}
              >
                {" "}
                <div className="Password">
                  <button>
                    <Link className="link" to="/PatientRecord">
                      Record New Patient
                    </Link>
                  </button>
                </div>
                <div className="Password">
                  <button>
                    <Link className="link" to="/ReferInPatient">
                      Record Refer In Patients
                    </Link>
                  </button>
                </div>
                <div className="Password">
                  <button>
                    <Link className="link" to="/OrderPayment">
                      Order Payment
                    </Link>
                  </button>
                </div>
                <div className="Password">
                  <button>
                    <Link className="link" to="/Diagnosis">
                      Order Diagnosis
                    </Link>
                  </button>
                </div>
                <div className="Password">
                  <button>
                    <Link className="link" to="/ViewPatient">
                      View Patient
                    </Link>
                  </button>
                </div>
                <div className="Password">
                  <Link className="link" to="/RecordOfficerGenerateReport">
                    <button>Generate Report</button>
                  </Link>
                </div>{" "}
              </div>
            </div>
            <div className="BodyArea">
              <h1>{serviceType}</h1>

              <div className="patientRecord">
                <form>
                  <select
                    name="cars"
                    id="cars"
                    required
                    onChange={(event) => {
                      setServiceType(event.target.value);
                    }}
                    onClick={displaySelect}
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
                  {serviceType}
                  <table>
                    <thead>
                      <tr>
                        <th>No</th>
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
                        <th>Gender </th>
                        <th>Registration date </th>
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
                          <td>{emp.registrationDate} </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : null}{" "}
    </div>
  );
};

export default GenerateReport;
