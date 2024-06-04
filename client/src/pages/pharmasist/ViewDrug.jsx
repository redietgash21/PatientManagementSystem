




import Axios from "axios";
import React, { useState, useEffect, memo } from "react";
import { Link } from "react-router-dom";
import {Container  ,Form,Modal, Col,InputGroup,Button, Nav,Navbar
  , Row,Image} from 'react-bootstrap';
const ViewDrug = (props) => {
  const [dispaly, setDisplay] = useState([]);
  const [priceStatus, setPriceStatus] = useState("Not payed");
  const [daysLeft, setDaysLeft] = useState(0);
  const [error, setError] = useState("");
  const [payId, setPayId] = useState("");
  const [TimeDifference, setTimeDifference] = useState([]);
  const [CurrentDate, setCurrentDate] = useState(new Date().valueOf());

  const ViewDrug = () => {
    Axios.get("http://localhost:3001/ViewDrug")
     
      .then((response) => {
        setDisplay(response.data);
        dispaly.map((emp) =>
          setTimeDifference(
            Math.ceil(
              Math.abs(
                new Date(emp.expireDate).valueOf() - new Date().valueOf()
              ) /
                (1000 * 60 * 60 * 24)
            )
          )
        );
        // const myList = myArray.map((item) => <p>{item}</p>);

        console.log(response);
      })
      .catch((err) => {
        console.log("err", error);
      });
  };
  const Cheack = (pp) => {
    if (pp) {
      alert("sjdkahfbvsmnvcx");
    }
  };

  useEffect(() => {
    ViewDrug();
  }, []);
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);

  const visibleHandler = () => {
    visible === false ? setVisible(true) : setVisible(false);
  };
  const visibleHandler1 = () => {
    visible1 === false ? setVisible1(true) : setVisible1(false);
  };
  return (
    <>
      {sessionStorage.getItem("userId") ? (
        <Container fluid>
              <h1>List of Drugs In the System</h1>
                <form>
                  <table>
                    <thead>
                      <tr>
                        
                        <th>Drug Code</th>
                        <th>Drug Name</th>
                        <th>Drug Amount</th>
                        <th>Drug Dosage</th>
                        <th>Drug Strength</th>
                        <th>Manufactured Place </th>
                        <th>Manufactured Date </th>
                        <th>Expired Date </th>

                        <th>Drug Status </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dispaly.map((emp) => (
                        <tr>
                       
                          <td>{emp.drugCode}</td>
                          <td>{emp.drugName}</td>
                          <td>{emp.drugAmount}</td>
                          <td>{emp.drugDosage}</td>
                          <td>{emp.drugStrength}</td>
                          <td>{emp.manufacturePlace}</td>
                          <td>{emp.manufactureDate.toString()}</td>
                          <td>{emp.expireDate.toString()}</td>

                          <td>
                            {Math.ceil(
                              (new Date(emp.expireDate).valueOf() -
                                new Date().valueOf()) /
                                (1000 * 60 * 60 * 24)
                            )}
                            Cheack(
                            {Math.ceil(
                              (new Date(emp.expireDate).valueOf() -
                                new Date().valueOf()) /
                                (1000 * 60 * 60 * 24)
                            )}
                            );
                      
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

export default memo (ViewDrug);
