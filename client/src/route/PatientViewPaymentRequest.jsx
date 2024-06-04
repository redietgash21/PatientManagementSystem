import {
    Container,
    Form,
    Modal,
    Col,
    InputGroup,
    Button,
    Nav,
    Navbar,
    Row,
    Image,
  } from "react-bootstrap";
  import Axios from "axios";
  import React, { useState, useEffect } from "react";
  import { Link } from "react-router-dom";
  import Pay from "./Pay";
  import Success from "./Success";
  
  const PatientViewPaymentRequest = (props) => {
    const [dispaly, setDisplay] = useState([]);
    const [priceStatus, setPriceStatus] = useState("Not payed");
    const [error, setError] = useState("");
    const [MRN, setMRN] = useState(sessionStorage.getItem("userId"));
    const [payId, setPayId] = useState("");
    const [presId, setPresId] = useState("");
    const [labId, setLabId] = useState("");
    const [isPayed, setIsPayed] = useState(false);
    const [serviceType, setServiceType] = useState("Card");
    const [Email, setsetEmail] = useState("");
    const ViewPaymentRequest = () => {
      Axios.get("http://localhost:3001/displayIndividualPaymentRequest", {
        MRN: MRN,
      })
        .then((response) => {
          setDisplay(response.data);
          console.log(response);
        })
        .catch((err) => {
          console.log("err", error);
        });
    };
  
    const displayDrugPaymentRequest = () => {
      Axios.get("http://localhost:3001/displayDrugPaymentRequest", { MRN: MRN })
        .then((response) => {
          setDisplay(response.data);
        })
        .catch((err) => {
          console.log("err", error);
        });
    };
    const displayLabPaymentRequest = () => {
      Axios.get("http://localhost:3001/displayLabPaymentRequest", { MRN: MRN })
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
        alert("payed");
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
        MRN: MRN,
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
        month < 10 ? 0${month} : ${month}
      }${separator}${date}`;
    };
    const payedPri = () => {
      Axios.post("http://localhost:3001/payedPri", {
        priceStatus: "Payed",
        presId: presId,
        datee: getCurrentDate(),
        MRN: MRN,
      })
        .then((response) => {})
        .catch((err) => {
          console.log("err", err);
        });
    };
    useEffect(() => {
      ViewPaymentRequest();
    }, []);
    return (
      <Container fluid>
        {MRN ? (
          <div
            className="patientRecord"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <h1>List Payment Requests {MRN}</h1>
            <form>
            {/* <select
              name="services"
              id="services"
              value={serviceType}
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
            </select> */}
            <table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>MRN</th>

                  <th>Service Fee</th>
                  <th>Price</th>
                  <th>Date</th>
                  <th>Price Statuse</th>
                </tr>
              </thead>
              <tbody>
                {dispaly.map((emp, i) => (
                  <tr>
                    <td>{i + 1}</td>
                    <td>{emp.MRN}</td>

                    <td>
                      {emp.sFee}
                      {emp.drugName}
                      {emp.labOrder}
                    </td>
                    <td>{emp.price}</td>
                    <td>{emp.paymentDate}</td>
                    {/* <td>
                      <input
                        id="check"
                        name="check"
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
                    </td> */}
                    <td>
                      {/* <button onClick={payed}>send</button> */}
                      <Pay serviceType={serviceType} emp={emp} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </form>
        </div>
      ) : null}
    </Container>
  );
};

export default PatientViewPaymentRequest;