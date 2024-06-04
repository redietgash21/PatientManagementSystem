




import React, { useState, memo } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import {Container  ,Form,Modal, Col,InputGroup,Button, Nav,Navbar
  , Row,Image} from 'react-bootstrap';
  import "../HR/Employ_reg.css";
const Add_drug = (props) => {
  const [drugName, setDrugName] = useState("");
  const [drugDosage, setDrugDosage] = useState("");
  const [drugCode, setDrugCode] = useState("");
  const [drugType, setDrugType] = useState("");
  const [price, setPrice] = useState("");
  const [id, setId] = useState(0);
  const [drugAmount, setDrugAmount] = useState("");
  const [drugStrength, setDrugStrength] = useState("");
  const [drugFrequency, setDrugFrequency] = useState("");
  const [manufacturePlace, setManufacturePlace] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [manufactureDate, setManufactureDate] = useState("");
  const [alert, setalert] = useState(false);
  const [errorOccured, setErrorOccured] = useState(false);

  const addDrug = () => {
    Axios.post("http://localhost:3001/addDrug", {
      drugFrequency: drugFrequency,
      drugName: drugName,
      drugCode: drugCode,
      drugType: drugType,
      manufacturePlace: manufacturePlace,
      drugAmount: drugAmount,
      drugStrength: drugStrength,
      expireDate: expireDate,
      manufactureDate: manufactureDate,
      drugDosage: drugDosage,
    })
      .then((response) => {})
      .catch((err) => {
        console.log("err", err);
      });
    alert("add drug");
  };
  const addDrugtoService = () => {
    Axios.post("http://localhost:3001/registerService", {
      service: drugName,
      price: price,
      ServiceType: "Drug",
    })
      .then((response) => {})
      .catch((err) => {
        console.log("err", err);
      });
    // alert('add drug')
  };

  const ValidateInput = () => {
    if (
      drugFrequency != "" &&
      drugName != "" &&
      drugCode != "" &&
      drugType != "" &&
      manufacturePlace != "" &&
      drugAmount != "" &&
      expireDate != "" &&
      manufactureDate != "" &&
      drugStrength != "" &&
      drugDosage != "" &&
      drugDosage != ""
    ) {
      addDrugtoService();
      addDrug();

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
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);

  const visibleHandler = () => {
    visible === false ? setVisible(true) : setVisible(false);
  };
  const visibleHandler1 = () => {
    visible1 === false ? setVisible1(true) : setVisible1(false);
  };
  return (
    < >
     <div className="BodyParent">
      {sessionStorage.getItem("userId") ? (
        <Container fluid>
              <h3>Add Drug Page</h3>
                <form>
                  <div
                    className="FormClass">
                    <div className="LoggClass1">
                      <label for="Drug Name">Drug Name :</label>
                      <input
                        id="DrugN"
                        name="DrugN"
                        type="text"
                        onChange={(event) => {
                          setDrugName(event.target.value);
                        }}
                      />
                      <label for="Drug_Code">Drug Code :</label>
                      <input
                        id="Drug_Code"
                        name="Drug_code"
                        type="int"
                        onChange={(event) => {
                          setDrugCode(event.target.value);
                        }}
                      />

                      <label for="Drug_Type"> Drug Type :</label>
                      <input
                        id="Drug_Type"
                        name="Drug_Type"
                        type="text"
                        onChange={(event) => {
                          setDrugType(event.target.value);
                        }}
                      />

                      <label for="Drug_description"> Drug Dosage : </label>
                      <input
                        type="text"
                        id="Drug_description"
                        name="Drug_description"
                        onChange={(event) => {
                          setDrugDosage(event.target.value);
                        }}
                      />

                      <label for="Manufactured_date">
                        {" "}
                        Manufactured Place :
                      </label>
                      <input
                        id="Manufactured_date"
                        name="Manufactured_date"
                        type="text"
                        onChange={(event) => {
                          setManufacturePlace(event.target.value);
                        }}
                      />
                      <label for="Manufactured_date">
                        {" "}
                        Manufactured Date :
                      </label>
                      <input
                        id="Manufactured_date"
                        name="Manufactured_date"
                        type="date"
                        onChange={(event) => {
                          setManufactureDate(event.target.value);
                        }}
                      />
                    </div>
                    <div className="LoggClass1">
                      <label for="Expired_date"> Expired Date :</label>
                      <input
                        id="Expired_date"
                        name="Expired_date"
                        type="date"
                        onChange={(event) => {
                          setExpireDate(event.target.value);
                        }}
                      />

                      <label for="Drug_amount"> Drug frequency :</label>
                      <input
                        id="Drug_amount"
                        name="Drug_amount"
                        type="text"
                        onChange={(event) => {
                          setDrugFrequency(event.target.value);
                        }}
                      />

                      <label for="Drug_amount"> Drug Amount :</label>
                      <input
                        id="Drug_amount"
                        name="Drug_amount"
                        type="text"
                        onChange={(event) => {
                          setDrugAmount(event.target.value);
                        }}
                      />
                      <label for="Drug_strength"> Drug_strength :</label>
                      <input
                        id="Drug_strength"
                        name="Drug_strength"
                        type="text"
                        onChange={(event) => {
                          setDrugStrength(event.target.value);
                        }}
                      />
                      <label for="Drug_strength"> Price :</label>
                      <input
                        id="Drug_strength"
                        name="Drug_strength"
                        type="text"
                        onChange={(event) => {
                          setPrice(event.target.value);
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
                      onClick={() => {
                        ValidateInput();
                      }}
                    >
                      Add
                    </button>
                    {/* <button
                      style={{
                        textAlign: "center",
                        fontSize: "20px",
                        backgroundColor: "red",
                      }}
                      className=" reset"
                      type="reset"
                    >
                      Reset
                    </button> */}
                    {alert && (
                      <p
                        className="password"
                        style={{
                          // color: "red",
                          backgroundColor: "green",

                          alignContent: "center",
                        }}
                      >
                        Employe Registered Successfully!!!
                      </p>
                    )}
                    {errorOccured && (
                      <p
                        className="password"
                        style={{
                          // color: "red",
                          backgroundColor: "red",

                          alignContent: "center",
                        }}
                      >
                        Wrong Inputes combination!!!
                      </p>
                    )}{" "}
                  </div>
                </form>
              
           
        </Container>
      ) : null}
      </div>
    </>
  );
};

export default memo(Add_drug);
