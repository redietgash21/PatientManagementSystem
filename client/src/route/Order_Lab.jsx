





import React from "react";
import { useEffect } from "react";
import Axios from "axios";
import { useState } from "react";
import {Container  ,Form,Modal, Col,InputGroup,Button, Nav,Navbar
  , Row,Image} from 'react-bootstrap';
import { Link } from "react-router-dom";
const Order_Lab = (props) => {
  const [MRN, setMRN] = useState(props.libraryHistory);
  const [doctorId, setDoctorId] = useState(sessionStorage.getItem("userId"));
  const [serviceFee, setServiceFee] = useState("");
  const [price, setPrice] = useState(0);
  const [orderDate, setOrderDate] = useState("");
  const [Order_Reason, setOrder_Reason] = useState("");

  const [dispaly, setDisplay] = useState([]);
  const [alert1, setalert1] = useState(false);
  const [alert2, setalert2] = useState(false);
  const services = () => {
    Axios.get("http://localhost:3001/displayServiceFromLab", {}).then(
      (response) => {
        setDisplay(response.data);

        console.log("=========================", response.data[0].price);
      }
    );
  };
  const selectPrice = () => {
    Axios.post("http://localhost:3001/selectPrice", {
      serviceFee: serviceFee,
    })
      .then((response) => {
        setPrice(response.data[0].price);
        console.log("price", response.data[0].price);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const orderLab = () => {
    Axios.post("http://localhost:3001/orderLab", {
      doctorId: sessionStorage.getItem("userId"),
      serviceFee: serviceFee,
      price: price,
      MRN: props.libraryHistory,
      orderDate: orderDate,

      OrderReason: Order_Reason,
    })
      .then((response) => {
        setalert1(true);
        setTimeout(() => {
          setalert1(false);
        }, 4000);

        alert("Ordered Successesfully");
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  useEffect(() => {
    services(getCurrentDate);
  
      setOrderDate(getCurrentDate());
 
  }, []);
  const ValidateInput = () => {
    if (serviceFee != "" && price != "" && MRN != "" ) {
      orderLab();
    } else {
      setalert2(true);
      setTimeout(() => {
        setalert2(false);
      }, 4000);
    }
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

  return (
    <>
      {sessionStorage.getItem("userId") ? (
        <Container fluid>
         
            <h3>Drug Priscription Page</h3>
            <div className="patientRecord">
              <form>
                <div
                  style={{
                    minWidth: "500px",
                    alignContent: "center",
                    paddingLeft: "250px",
                    fontSize: "18px",
                  }}
                  className="FormClass"
                >
                  <div className="LoggClass1">
                  <label for="Order_date">Order Date : {orderDate}</label>
                    <label for="Emp_id">Doctor ID : </label>
                    <input
                      id="Emp_id"
                      name="Emp_id"
                      type="text"
                      required
                      placeholder="Doctor Id"
                      defaultValue={sessionStorage.getItem("userId")}
                      onChange={(event) => {
                        setDoctorId(event.target.value);
                      }}
                    />
                    <label for="MRN">Patient MRN : </label>
                    <input
                      id="MRN"
                      name="MRN"
                      type="text"
                      required
                      placeholder="Patient MRN"
                      defaultValue={MRN}
                      onChange={(event) => {
                        setMRN(event.target.value);
                      }}
                    />
                    <label for="MRN">Lab Order:</label>
                    <select
                      name="cars"
                      id="cars"
                      required
                      onChange={(event) => {
                        setServiceFee(event.target.value);
                      }}
                      onClick={selectPrice}
                    >
                      <option hidden></option>
                      {dispaly.map((pp) => (
                        <option value={pp.serviceFee}>{pp.serviceFee}</option>
                      ))}
                    </select>
                    <label for="Order_Reason">Reason : </label>
                    <textarea
                      id="Order_Reason"
                      name="Order_Reason"
                      type="text"
                      required
                      placeholder="Reason"
                      onChange={(event) => {
                        setOrder_Reason(event.target.value);
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
                    order Lab 
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
                    <h5
                      style={{
                        // color: "red",
                        backgroundColor: "green",

                        alignContent: "center",
                      }}
                    >
                      Registered Succssusfully...
                    </h5>
                  )}
                  {alert2 && (
                    <p
                      className="password"
                      style={{
                        // color: "red",
                        backgroundColor: "red",

                        alignContent: "center",
                      }}
                    >
                      Please fill nessessary information...
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

export default Order_Lab;
