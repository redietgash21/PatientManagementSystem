





import {Container  ,Form,Modal, Col,InputGroup,Button, Nav,Navbar
  , Row,Image} from 'react-bootstrap';
  import Axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import React, { useState, memo } from "react";
const LabResult = (props) => {
  const [MRN, setMRN] = useState();
  const [LabId, setLabId] = useState();
  const [firstName, setFirstName] = useState();
  const [MiddleName, setMiddletName] = useState();
  const [LastName, setLastName] = useState();

  const [LabTEchnitianId, setLabTEchnitianId] = useState(
    sessionStorage.getItem("userId")
  );
  const [Result, setResult] = useState();
  const [ResultDate, setResultDate] = useState();
  const [alert1, setalert1] = useState("");
  const [ErrorOccured, setErrorOccured] = useState();
  useEffect(() => {
    setMRN(props.libraryHistory.MRN);
    setLabId(props.libraryHistory.labId);
    // setFirstName(props.libraryHistory.firstName);
    // setLastName(props.libraryHistory.lastName);

    console.log({ firstName });
  }, []);
  const getCurrentDate=(separator='-')=>{

    let newDate = new Date()
    let date=newDate.getDate();
     let    month = newDate.getMonth() + 1;
      let   year = newDate.getFullYear();
  
    return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
    }
  const LabResult = () => {
    Axios.post("http://localhost:3001/SubmitLabResult", {
      LabId: LabId,
      LabTEchnitianId: sessionStorage.getItem("userId"),
      Result: Result,
      ResultDate: getCurrentDate(),
    })
      .then((response) => {})
      .catch((err) => {
        console.log("err", err);
      });
  };

  const ValidateInput = () => {
    if (LabId != "" && LabTEchnitianId != "" && Result != "") {
      LabResult();
      setalert1(true);

      setTimeout(() => {
        setalert1(false);
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
              <h3>Write your Lab Result hear</h3>
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
                    <label for="ResultDate">Result Date : {getCurrentDate()}</label>
                      <label for="LabId">Patient MRN : </label>
                      <input id="MRN" name="MRN" type="int" value={MRN} readOnly/>
                      <label for="LabTEchnitianId">Lab Technitian Id </label>
                      <input
                        id="LabTEchnitianId"
                        name="LabTEchnitianId"
                        type="int"
                        readOnly
                        value={sessionStorage.getItem("userId")}
                        onChange={(event) => {
                          setLabTEchnitianId(event.target.value);
                        }}
                      />
                      <label for="Result">Result </label>
                      <textarea
                        id="Result"
                        name="Result"
                        type="text"
                        onChange={(event) => {
                          setResult(event.target.value);
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
                      Submit Lab Result
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
                    {alert1 && (
                      <p
                        className="password"
                        style={{
                          // color: "red",
                          backgroundColor: "green",
                          alignContent: "center",
                        }}
                      >
                        Lab Result is Succssesfully Submited...
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
                    )}
                  </div>
                </form>
              </div>
          
        </Container>
      ) : null}
    </>
  );
};

export default memo (LabResult);
