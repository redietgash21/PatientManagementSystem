






import {Container  ,Form,Modal, Col,InputGroup,Button, Nav,Navbar
  , Row,Image} from 'react-bootstrap';
import { Link } from "react-router-dom";
import Axios from "axios";
import React, { useState, useEffect, memo } from "react";
import "../../App.css";

const ViewEmploy = ({ setLibraryHistory, libraryHistory }) => {
  const [dispaly, setDisplay] = useState([]);
  const [FilteredList, setFilteredList] = useState();
  const [priceStatus, setPriceStatus] = useState("Not payed");
  const [search, setSearch] = useState("");
  const [select, setSelect] = useState("");
  const [error, setError] = useState("");
  const [payId, setPayId] = useState("");

  const displayPateint = () => {
    Axios.get("http://localhost:3001/displayEmploy")
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
                            emp.id.toString().toLowerCase().includes(search) ||
                            emp.age.toString().toLowerCase().includes(search) ||
                            emp.sex.toLowerCase().includes(search) ||
                            emp.phoneNumber
                              .toString()
                              .toLowerCase()
                              .includes(search)
                        )
                        .map((emp) => (
                          <tr key={emp.id}>
                            <td>{emp.id}</td>
                            <td>
                              {emp.firstName} {emp.middleName} {emp.lastName}
                            </td>
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
                              <button className='btnEdit'
                                onClick={() => {
                                
                                  setLibraryHistory(emp);
                                }}
                              >
                                {" "}
                                <Link className="link" to="/EditEmployList">
                                  Edit
                                </Link>
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </form>
             
            
        
          {/* </div> */}
        </Container>
      ) : null}
    </>
  );
};

export default memo (ViewEmploy);
