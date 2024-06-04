



import { Link } from "react-router-dom";
import Axios from "axios";
import React, { useState, useEffect, memo } from "react";
import {Container  ,Form,Modal, Col,InputGroup,Button, Nav,Navbar
  , Row,Image} from 'react-bootstrap';
const ViewPatient = ({ setLibraryHistory, libraryHistory }) => {
  const [dispaly, setDisplay] = useState([]);
  const [FilteredList, setFilteredList] = useState();
  const [priceStatus, setPriceStatus] = useState("Not payed");
  const [search, setSearch] = useState("");
  const [select, setSelect] = useState("");
  const [error, setError] = useState("");
  const [payId, setPayId] = useState("");

  const displayPateint = () => {
    Axios.get("http://localhost:3001/displayPateint")
      .then((response) => {
        setDisplay(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log("err", error);
      });
  };
  const displayBySearchPateint = () => {
    Axios.post("http://localhost:3001/displayBySearchPateint", {
      search: search,
      select: select,
    })
      .then((response) => {
        setDisplay(response.data);
        console.log(response);
      })
      .catch((err) => {
        console.log("err", error);
      });
  };

  useEffect(() => {
    if (search == "") {
      displayPateint();
    }
    if (search != "") {
      displayBySearchPateint();
    }
  }, []);
  console.log(search);
  return (
    <>
      {sessionStorage.getItem("userId") ? (
        <>
          <Container fluid>
          
              <h1>List of patient In the System</h1>


                <form>
                  <label for="MRNsearch">Search </label>
                  <input
                    type="search"
                    placeholder="Search..."
                    id="MRNsearch"
                    name="MRNsearch"
                    onChange={(event) => {
                      setSearch(event.target.value);
                      // displayBySearchPateint(search);
                    }}
                  ></input>

                  <table>
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Full Name</th>

                        <th>Image </th>
                        <th>Age </th>
                        <th>Phone number </th>
                        <th>Address </th>
                        <th>Gender </th>
                        <th>Registration date </th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {dispaly
                        .filter(
                          (emp) =>
                            emp.firstName.toLowerCase().includes(search) ||
                            emp.middleName.toLowerCase().includes(search) ||
                            emp.lastName.toLowerCase().includes(search) ||
                            emp.MRN.toString().toLowerCase().includes(search) ||
                            emp.age.toString().toLowerCase().includes(search) ||
                            emp.sex.toLowerCase().includes(search) ||
                            emp.phoneNumber
                              .toString()
                              .toLowerCase()
                              .includes(search)
                        )
                        .map((emp) => (
                          <tr key={emp.MRN}>
                            <td>{emp.MRN}</td>
                            <td>
                              {emp.firstName} {emp.middleName} {emp.lastName}
                            </td>
                            <td>{emp.imagePath}</td>
                            <td>{emp.age}</td>
                            <td>{emp.phoneNumber}</td>
                            <td>
                              {emp.region} {emp.woredaOrSubcity}{" "}
                              {emp.ketenaOrGott}
                              {emp.kebele} {emp.houseNumber}
                            </td>
                            <td>{emp.sex} </td>
                            <td>{emp.registrationDate} </td>
                            <td>
                              <button
                                onClick={() => {
                                  // setMRN(pp.MRN);
                                  setLibraryHistory(emp.MRN);
                                }}
                              >
                                {" "}
                                <Link className="link" to="/PayBill">
                                  Pay Bill
                                </Link>
                              </button>
                            </td>
                            <td>
                              <button
                                onClick={() => {
                                  // setMRN(pp.MRN);
                                  setLibraryHistory(emp.MRN);
                                }}
                              >
                                {" "}
                                <Link className="link" to="/ReferInPatient">
                                  Refer In
                                </Link>
                              </button>
                            </td>
                            <td>
                              <button
                                onClick={() => {
                                  // setMRN(pp.MRN);
                                  setLibraryHistory(emp);
                                }}
                              >
                                {" "}
                                <Link className="link" to="/EditPatientRecord">
                                  Edit
                                </Link>
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </form>
             
         
            
          </Container>
        </>
      ) : null}
    </>
  );
};

export default memo (ViewPatient);
