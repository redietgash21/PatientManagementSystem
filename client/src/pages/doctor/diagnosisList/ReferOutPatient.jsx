import Axios from "axios";
import React, { useState, useEffect } from "react";
import {Container  ,Form,Modal, Col,InputGroup,Button, Nav,Navbar
  , Row,Image} from 'react-bootstrap';
import { Link } from "react-router-dom";
const ReferOutPatient = (props) => {
  const [docId, setDocId] = useState(sessionStorage.getItem("userId"));
  const [MRN, setMRN] = useState(props.libraryHistory);
  const [referedTo, setReferedTo] = useState("");
  const [referedReason, setReferedReason] = useState("");
  const [datee, setDate] = useState();
  const [alert, setalert] = useState("");
  const [ErrorOccured, setErrorOccured] = useState();
  const getCurrentDate = (separator = "-") => {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${date}`;
  };
  const ReferOutPatient = () => {
    Axios.post("http://localhost:3001/ReferOutPatient", {
      docId: docId,
      referedTo: referedTo,
      referedReason: referedReason,
      MRN: MRN,
      datee: datee,
    })
      .then((response) => {})
      .catch((err) => {
        console.log("err", err);
      });
  };
  useEffect(() => {
    setDate(getCurrentDate());
  }, []);

  return (
    < >
      {sessionStorage.getItem("userId") ? (
        <Container fluid>
              <h3>Refer Out Patient</h3>
              <div className="patientRecord">
                <form>
                  <div
                    className="FormClass"
                    style={{
                      minWidth: "500px",
                      alignContent: "center",
                      paddingLeft: "250px",
                      fontSize: "18px",
                    }}
                  >
                    <div className="LoggClass1">
                    <label for="MRN"> Date:   {datee} </label>
                      <label for="Pr_id">Doctor Id : </label>
                      <input id="Pr_id" name="Pr_id" defaultValue={docId} />
                      <label for="Emp_id">MRN : </label>
                      {/* {props.libraryHistory.map((Patient) => ( */}
                      <input defaultValue={MRN} />
                      {/* ))} */}
                      <label for="MRN">From</label>
                      <input value="Addis Alem Hospital" />
                      <label for="MRN">To</label>
                      <input
                        type="text"
                        onChange={(event) => {
                          setReferedTo(event.target.value);
                        }}
                      />
                   
                      <label for="MRN">Refered Reason: </label>
                      <input
                        id="MRN"
                        name="MRN"
                        type="text"
                        onChange={(event) => {
                          setReferedReason(event.target.value);
                        }}
                      />
                    </div>{" "}
                  </div>
                  <div
                    className="logReset"
                    style={{
                      textAlign: "center",
                      fontSize: "20px",
                      padding: "50px",
                    }}
                  >
                    <button
                      style={{ textAlign: "center", fontSize: "20px" }}
                      className="login"
                      onClick={ReferOutPatient}
                    >
                      Refer
                    </button>
                    <button
                      style={{
                        textAlign: "center",
                        fontSize: "20px",
                        backgroundColor: "red",
                      }}
                      className=" reset"
                      type="reset"
                    >
                      Reset
                    </button>
                    {alert && (
                      <p
                        className="password"
                        style={{
                          // color: "red",
                          backgroundColor: "green",

                          alignContent: "center",
                        }}
                      >
                        Your Service is Succssesfully registered...
                      </p>
                    )}
                    {ErrorOccured && (
                      <p
                        className="password"
                        style={{
                          // color: "red",
                          backgroundColor: "red",

                          alignContent: "center",
                        }}
                      >
                        Something Went Wrong Try Again...
                      </p>
                    )}{" "}
                  </div>
                </form>
              </div>
         </Container>
      ) : null}
    </>
  );
};

export default ReferOutPatient;
