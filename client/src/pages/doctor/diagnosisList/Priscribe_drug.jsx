






import {Container  ,Form,Modal, Col,InputGroup,Button, Nav,Navbar
  , Row,Image} from 'react-bootstrap';
  import React, { useEffect } from "react";
import Axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
const Priscribe_drug = (props) => {

  
  const [MRN, setMRN] = useState(props.libraryHistory);
  const [Diseases_description, setDiseases_description] = useState("");
  const [Drug_name, setDrug_name] = useState(0);
  const [servDrug_quantityice, setDrug_quantity] = useState("");
  const [Drug_frequency, setDrug_frequency] = useState(0);
  const [Prscribe_date, setPrscribe_date] = useState("");
  const [DispenseStatus, setDispenseStatus] = useState("Not Dispensed");
  const [alert, setalert] = useState("");
  const [price, setPrice] = useState(0);
  const [dispaly, setDisplay] = useState([]);
  const [ErrorOccured, setErrorOccured] = useState();
  const OrderPriscription = () => {
    Axios.post("http://localhost:3001/Priscription", {
      DoctorID: sessionStorage.getItem("userId"),
      MRN: MRN,
      Diseases_description: Diseases_description,
      servDrug_quantityice: servDrug_quantityice,
      Drug_name: Drug_name,
      Drug_frequency: Drug_frequency,
      Prscribe_date: Prscribe_date,
      DispenseStatus: DispenseStatus,
    })
      .then((response) => {})
      .catch((err) => {
        console.log("err", err);
        console.log("==============================");
      });
  };
  const services = () => {
    Axios.get("http://localhost:3001/displayServiceFromDrug", {}).then(
      (response) => {
        setDisplay(response.data);

        console.log("=========================", response.data[0].price);
      }
    );
  };
  const selectPrice = () => {
    Axios.post("http://localhost:3001/selectPrice", {
      serviceFee: Drug_name,
    })
      .then((response) => {
        setPrice(response.data[0].price);
        // console.log("priceeeeeeeeeeeeeeeeeeeee", response.data[0].price);
      })
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


  console.log(sessionStorage.getItem("userId"));
  useEffect(() => {

      services();
 
    setPrscribe_date(getCurrentDate());
  }, []);
  return (
    < >
      {sessionStorage.getItem("userId") ? (
        <Container fluid>
              <h3>Drug Priscription Page</h3>
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
                      {/* <label for="Emp_id">Doctor ID : </label> */}
                      {/* <input
              id="Emp_id"
              name="Emp_id"
              type="text"
              value={sessionStorage.getItem("userId")}
              onChange={(event) => {
                setDoctorID(event.target.value);
              }}
            /> */}
             <label for="Prscribe_date"> Date :  {Prscribe_date}</label>
             <label for="Emp_id">Doctor ID : </label>
                    <input
                      id="Emp_id"
                      name="Emp_id"
                      type="text"
                      required
                      placeholder="Doctor Id"
                      defaultValue={sessionStorage.getItem("userId")}
                      readOnly
                    />
                      <label for="MRN">Patient MRN : </label>
                      <input
                        id="MRN"
                        name="MRN"
                        type="text"
                        Value={MRN}
                        readOnly
                      
                      />

                      <label for="Diseases_description">
                        Disease_description :{" "}
                      </label>
                      <input
                        id="Diseases_description"
                        name="Diseases_description"
                        type="text-area"
                        onChange={(event) => {
                          setDiseases_description(event.target.value);
                        }}
                      />

                      <label for="Drug_name"> Drug Name : </label>
                      <select
                name="cars"
                id="cars"
                required
                onChange={(event) => {
                  setDrug_name(event.target.value);
                }}
                onClick={selectPrice}
              >
                <option hidden></option>
                {dispaly.map((pp) => (
                  <option value={pp.serviceFee}>{pp.serviceFee}</option>
                ))}
              </select>
                 
              <label for="Drug_quantity">Price : </label>
              <input
                id="Drug_quantity"
                name="Drug_quantity"
                type="text"
                value={price}
              />

                      <label for="Drug_quantity">Quantity : </label>
                      <input
                        id="Drug_quantity"
                        name="Drug_quantity"
                        type="number"
                        onChange={(event) => {
                          setDrug_quantity(event.target.value);
                        }}
                      />

                      <label for="Drug_frequency">Frequency : </label>
                      <input
                        id="Drug_frequency"
                        name="Drug_frequency"
                        type="text"
                        onChange={(event) => {
                          setDrug_frequency(event.target.value);
                        }}
                      />
                      <button
                      style={{ textAlign: "center", fontSize: "20px" }}
                      className="login"
                      onClick={OrderPriscription}
                    >
                      Order
                    </button>
                     
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

export default Priscribe_drug;
