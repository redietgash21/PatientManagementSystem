



import Axios from "axios";
import React, { useState, useEffect,memo } from "react";
import { Link } from "react-router-dom";
import {Container  ,Form,Modal, Col,InputGroup,Button, Nav,Navbar
  , Row,Image} from 'react-bootstrap';
const ViewPriscriptionRequest = (props) => {
  const [dispaly, setDisplay] = useState([]);
  const [dispense, setdispence] = useState("Dispensed");
  const [drugName, setDrugName] = useState("Dispensed");
  const [totalDrug, setTotalDrug] = useState(0);
  const [priscDrugamount, setPriscDrugamount] = useState(0);
  const [error, setError] = useState("");
  const [PrescriptionID, setPrescriptionID] = useState(0);
  const ViewPaymentRequest = () => {
    Axios.get("http://localhost:3001/ViewPriscription")

      .then((response) => {
        setDisplay(response.data);
        console.log(response);
      })
      .catch((err) => {
        console.log("err", error);
      });
  };
  const Dispense = (presId) => {
    alert("           dispensed")
    Axios.post("http://localhost:3001/DispencePriscription", {
      PrescriptionID: presId,
      datee: getCurrentDate(),
      pharmId: sessionStorage.getItem("userId"),
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
  const selctTotalDrug = (drugName,Quantity,presId) => {
    alert(drugName+"== =="+Quantity+"===== ===="+presId)
    Axios.post("http://localhost:3001/selctTotalDrug", {
      DrugName: drugName,
    })

      .then((response) => {
        if((response.data[0].drugAmount>=Quantity)==true){
          let newtot=response.data[0].drugAmount-Quantity
       
           
           
        Dispense(presId);
        updateToatalDrug(newtot,drugName);
        
        }
        else{
          alert("Not ENOUGH DRUG EXISTS")
        }
       
        
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  useEffect(() => {
    ViewPaymentRequest();
  }, []);

  const updateToatalDrug = (TOT,drugName) => {
   
    Axios.post("http://localhost:3001/updateToatalDrug", {
      drugAmount: TOT,
      drugName: drugName
    })
      .then((response) => {})
      .catch((err) => {
        console.log("err", err);
      });
     
  };

  // useEffect(() => {
  //   Dispense();
  // }, []);

  return (
    <>
      {sessionStorage.getItem("userId") ? (
        <Container>
              <h1>List of Priscription Requests </h1>
                <form>
                  <table>
                    <thead>
                      <tr>
                        <th>MRN</th>
                        <th>Patient Full name</th>
                        <th>Drug Name</th>
                        <th>Quantity</th>
                        <th>Frequency</th>
                        <th>Priscription date</th>

                        <th>Dispense Status </th>

                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dispaly.map((PRI) => (
                        <tr>
                          <td>{PRI.MRN}</td>
                          <td>
                            {PRI.firstName} {PRI.middleName} {PRI.lastName}
                          </td>
                          <td>{PRI.DrugName}</td>
                          <td>{PRI.Quantity}</td>
                          <td>{PRI.Frequency}</td>
                          <td>{PRI.PriscriptionDate}</td>
                          <td>{PRI.DispenseStatus}</td>

                          <td>
                            {" "}
                            <button
                              onClick={(event) => {
                               
                        
                        selctTotalDrug(PRI.DrugName,PRI.Quantity,PRI.presId);
                              }}
                            >
                              Dispense{" "}
                            </button>
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

export default memo (ViewPriscriptionRequest);
