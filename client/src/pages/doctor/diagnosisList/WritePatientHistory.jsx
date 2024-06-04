import Axios from "axios";
import {Container  ,Form,Modal, Col,InputGroup,Button, Nav,Navbar
  , Row,Image} from 'react-bootstrap';
import { Link } from "react-router-dom";
import React, { useState ,useEffect} from "react";
const WritePatientHistory = (props) => {
  const [MRN, setMRN] = useState(props.libraryHistory);
  const [docId, setDocId] = useState(sessionStorage.getItem("userId"));
  const [descriptionn, setDescriptionn] = useState("");
  const [historyDate, setHistoryDate] = useState("");
  const [alert, setalert] = useState("");
  const [ErrorOccured, setErrorOccured] = useState();
  const WriteHistory = () => {
    Axios.post("http://localhost:3001/WritePatientHistory", {
      docId: docId,
      descriptionn: descriptionn,
      historyDate: historyDate,
      MRN: MRN,
    })
      .then((response) => {})
      .catch((err) => {
        console.log("err", err);
      });
  };
  const getCurrentDate = (separator = "-") => {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${date}`;
  };
  useEffect(() => {
    setHistoryDate(getCurrentDate());
  }, []);
  return (
    <>
      {sessionStorage.getItem("userId") ? (
        <Container fluid>
              <h3>Write Patient History</h3>
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
                    <label for="MRN"> Date:  {historyDate}</label>
                      <label for="Pr_id">Doc Id : </label>
                      <input id="Pr_id" name="Pr_id" defaultValue={docId} />

                      <label for="Emp_id">MRN : </label>
                      <input defaultValue={MRN} />

                      <label for="MRN">Discription</label>
                      <textarea
                        id="MRN"
                        name="MRN"
                        type="text"
                        onChange={(event) => {
                          setDescriptionn(event.target.value);
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
                      onClick={WriteHistory}
                    >
                      Order
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

export default WritePatientHistory;
