




import {Container  ,Form,Modal, Col,InputGroup,Button, Nav,Navbar
  , Row,Image} from 'react-bootstrap';
  import Axios from "axios";
import React, { useState, useEffect, memo } from "react";
import { Link } from "react-router-dom";
const ViewPaymentRequests = (props) => {
  const [dispaly, setDisplay] = useState([]);
  const [priceStatus, setPriceStatus] = useState("Not payed");
  const [error, setError] = useState("");
  const [payId, setPayId] = useState("");
  const [presId, setPresId] = useState("");
  const [labId, setLabId] = useState("");
  const [isPayed, setIsPayed] = useState(false);
  const [serviceType, setServiceType] = useState("");
  const ViewPaymentRequest = () => {
    Axios.get("http://localhost:3001/displayPaymentRequest")
      .then((response) => {
        setDisplay(response.data);
        console.log(response);
      })
      .catch((err) => {
        console.log("err", error);
      });
  };
  const displayDrugPaymentRequest = () => {
    Axios.get("http://localhost:3001/displayDrugPaymentRequest")
      .then((response) => {
        setDisplay(response.data);
      })
      .catch((err) => {
        console.log("err", error);
      });
  };
  const displayLabPaymentRequest = () => {
    Axios.get("http://localhost:3001/displayLabPaymentRequest")
      .then((response) => {
        setDisplay(response.data);
        console.log(response);
      })
      .catch((err) => {
        console.log("err", error);
      });
  };
  const display = () => {
    if (serviceType == "Pharmacist") {
      displayDrugPaymentRequest();
    } else if (serviceType == "Lab") {
      displayLabPaymentRequest();
    } else if (serviceType == "Card") {
      ViewPaymentRequest();
    }
  };

  const payed = () => {
    console.log("ppppppppppppppppppppppppppp" + isPayed);
    if (isPayed == true) {
      setPriceStatus("Payed");
      alert("payed" );
      if (serviceType == "Pharmacist") {
        payedPri();
      } else if (serviceType == "Lab") {
        payedLab();
      } else if (serviceType == "Card") {
        payedCard();
      }
    } else {
     
    }
  };
  const payedCard = () => {
    Axios.post("http://localhost:3001/payedCard", {
      priceStatus: "Payed",
      payId: payId,
      datee: getCurrentDate(),
      casherId: sessionStorage.getItem("userId"),
    })
      .then((response) => {})
      .catch((err) => {
        console.log("err", err);
      });
  };
  const payedLab = () => {
    Axios.post("http://localhost:3001/payedLab", {
      priceStatus: "Payed",
      labId: labId,
      datee: getCurrentDate(),
      cashId: sessionStorage.getItem("userId"),
    })
      .then((response) => {})
      .catch((err) => {
        console.log("err", err);
      });
  };
  const getCurrentDate=(separator='-')=>{

    let newDate = new Date()
    let date=newDate.getDate();
     let    month = newDate.getMonth() + 1;
      let   year = newDate.getFullYear();
  
    return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
    }
  const payedPri = () => {
    Axios.post("http://localhost:3001/payedPri", {
      priceStatus: "Payed",
      presId: presId,
      datee: getCurrentDate(),
      casherId: sessionStorage.getItem("userId"),
    })
      .then((response) => {})
      .catch((err) => {
        console.log("err", err);
      });
  };
  useEffect(() => {}, []);

  return (
    < >
      {sessionStorage.getItem("userId") ? (
        
          <Container fluid>
            
                    <h1>List Payment Requests</h1>

                      <form>
                        <select
                          name="cars"
                          id="cars"
                          required
                          onChange={(event) => {
                            setServiceType(event.target.value);
                          }}
                          onClick={display}
                        >
                          <option hidden></option>
                          <option>Pharmacist</option>
                          <option>Lab</option>
                          <option>Card</option>
                        </select>
                        <table>
                          <thead>
                            <tr>
                              <th>No</th>
                              <th>MRN</th>
                              <th>Patient Full name</th>
                              <th>Service Fee</th>
                              <th>Price</th>
                              <th>Date</th>
                              <th>Price Statuse</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {dispaly.map((emp, i) => (
                              <tr>
                                <td>{i + 1}</td>
                                <td>{emp.MRN}</td>
                                <td>
                                  {emp.firstName} {emp.middleName}{" "}
                                  {emp.lastName}
                                </td>
                                <td>
                                  {emp.sFee}
                                  {emp.drugName}
                                  {emp.labOrder}
                                </td>
                                <td>{emp.price}</td>
                                <td>{emp.paymentDate}</td>
                                <td>
                                  <input
                                    id="male"
                                    name="sex"
                                    type="checkbox"
                                    defaultChecked={false}
                                    onChange={() => {
                                      setIsPayed(!isPayed);
                                      setPayId(emp.payId);
                                      setPresId(emp.presId);
                                      setLabId(emp.labId);
                                    }}
                                  />
                                  <label for="male"> Payed {isPayed} :</label>
                                </td>
                                <td>
                                  <button onClick={payed}>send</button>
                                </td>
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

export default memo (ViewPaymentRequests);
