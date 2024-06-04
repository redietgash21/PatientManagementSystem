import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Axios from "axios";
import {Container  ,Form,Modal, Col,InputGroup,Button, Nav,Navbar
  , Row,Image} from 'react-bootstrap';

const Appointment = (props) => {
  const [MRN, setMRN] = useState(props.libraryHistory);

  const [docId, setdocId] = useState(sessionStorage.getItem("userId"));
  const [AppointStatus, setAppointStatus] = useState("Appointed");
  const [AppointReason, setAppointReason] = useState("");
  const [appDate, setAppDate] = useState();
  const [appTime, setAppTime] = useState();

  const [AppointDate, setAppointDate] = useState(appDate + " " + appTime);
  const [AppointRoom, setAppointRoom] = useState();
  const [alert, setalert] = useState("");
  const [ErrorOccured, setErrorOccured] = useState();
  const MakeAppoint = () => {
    Axios.post("http://localhost:3001/Appointment", {
      docId: sessionStorage.getItem("userId"),
      AppointStatus: AppointStatus,
      MRN: MRN,
      AppointDate: AppointDate,
      AppointReason: AppointReason,
      AppointRoom: AppointRoom,
    })
      .then((response) => {
        if (response.data.message) {
          // setCorrect(response.data.message);
          setalert(true);
          console.log(response.data.message);
          setTimeout(() => {
            setalert(false);
          }, 4000);
        } else {
          setErrorOccured(true);
          setTimeout(() => {
            setErrorOccured(false);
          }, 4000);
        }
      })

      .catch((err) => {
        console.log("err", err);
      });
  };
  const ValidateInput = () => {
    if (
      docId != "" &&
      AppointStatus != "" &&
      MRN != "" &&
      AppointDate != "" &&
      AppointRoom != "" &&
      AppointStatus != ""
    ) {
      MakeAppoint();
      setalert(true);

      setTimeout(() => {
        setalert(false);
      }, 4000);
    } else {
      setErrorOccured(true);
      setTimeout(() => {
        setErrorOccured(false);
      }, 4000);
    }
  };
  return (
    < >
      {sessionStorage.getItem("userId") ? (
        <Container fluid>
        
              <h3>Make Appointment</h3>
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
                    <label for="Emp_id"> Doctor ID : </label>
                      <input
                        id="Emp_id"
                        name="Emp_id"
                        type="text"
                        defaultValue={sessionStorage.getItem("userId")}
                        readOnly
                      />
                      <label for="MRN">Patient MRN : </label>
                      <input
                        id="MRN"
                        name="MRN"
                        type="text"
                        defaultValue={MRN}
                        onChange={(event) => {
                          setMRN(event.target.value);
                        }}
                      />
                    
                      <label for="a_Reason">Appointment Reason : </label>
                      <textarea
                        id="a_Reason"
                        name="a_Reason"
                        type="text-area"
                        onChange={(event) => {
                          setAppointReason(event.target.value);
                        }}
                      />
                      <label for="AppointRoom">Appointment Room : </label>
                      <input
                        id="AppointRoom"
                        name="AppointRoom"
                        type="text"
                        onChange={(event) => {
                          setAppointRoom(event.target.value);
                        }}
                      />
                      <label for="Appoint_date">Appointment Date : </label>
                      <input
                        id="Appoint_date"
                        name="Appoint_date"
                        type="date"
                        onChange={(event) => {
                          setAppDate(event.target.value);
                        }}
                      />
                      <label for="Appoint_date">Appointment Time : </label>
                      <input
                        id="Appoint_date"
                        name="Appoint_date"
                        type="time"
                        onChange={(event) => {
                          setAppTime(event.target.value);

                          setAppointDate(appDate + " " + event.target.value);
                        }}
                      />
                    </div>
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
                      onClick={ValidateInput}
                    >
                      Register
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

export default Appointment;
