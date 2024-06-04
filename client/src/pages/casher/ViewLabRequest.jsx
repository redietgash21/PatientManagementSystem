




import {Container  ,Form,Modal, Col,InputGroup,Button, Nav,Navbar
  , Row,Image} from 'react-bootstrap';
  import Axios from "axios";
import React, { useState, useEffect, memo } from "react";
import { Link } from "react-router-dom";
const ViewLabRequest = ({ setLibraryHistory, libraryHistory }) => {
  const [dispaly, setDisplay] = useState([]);
  const [priceStatus, setPriceStatus] = useState("Not payed");
  const [error, setError] = useState("");
  const [payId, setPayId] = useState("");
  const ViewLab = () => {
    Axios.post("http://localhost:3001/ViewLabOrder")
      .then((response) => {
        setDisplay(response.data);
        console.log(response);
      })
      .catch((err) => {
        console.log("err", error);
      });
  };

  useEffect(() => {
    ViewLab();
  }, []);
  const SendLabResult = () => {
    Axios.post("http://localhost:3001/ViewLabOrder")
      .then((response) => {
        setDisplay(response.data);
        console.log(response);
      })
      .catch((err) => {
        console.log("err", error);
      });
  };
  return (
    < >
      {sessionStorage.getItem("userId") ? (
        <Container fluid>
      
            <h1>List Lab Requests</h1>

              <form>
                <table>
                  <thead>
                    <tr>
                      <th>MRN</th>
                      <th> Doctor Id</th>
                      <th>Patient Full name</th>
                      <th>Test name</th>

                      <th> Order Date</th>

                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dispaly.map((emp) => (
                      <tr>
                        <td>{emp.MRN}</td>

                        <td>{emp.docId}</td>
                        <td>
                          {emp.firstName} {emp.middleName} {emp.lastName}
                        </td>
                        <td>{emp.labOrder}</td>
                        <td>{emp.orderDate}</td>

                        <td>
                          <button
                            onClick={() => {
                              // setMRN(pp.MRN);
                              setLibraryHistory(emp);
                            }}
                          >
                            {" "}
                            <Link className="link" to="/LabResult">
                              Send Result
                            </Link>{" "}
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

export default memo (ViewLabRequest);
