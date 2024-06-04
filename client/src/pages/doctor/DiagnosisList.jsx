





import Axios from "axios";
import {Container  ,Form,Modal, Col,InputGroup,Button, Nav,Navbar
  , Row,Image} from 'react-bootstrap';
  import { FaBackward, FaLock, FaUserAlt,FaBackspace,FaUndo,FaUndoAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import React, { useEffect, useState, memo } from "react";
import "./DiagnosisList.css";

import referIn from "../../Image/referinIcon.jpg";
import referOut from "../../Image/referoutIcon.jpg";
import labresultIcon from "../../Image/labresultIcon.jpg";
import laborderIcon from "../../Image/laborderIcon.jpg";
import appointmentIcon from "../../Image/appointmentIcon.jpg";

import viewappoicon from "../../Image/viewappoicon.jpg";
import finishedd from "../../Image/finished.jpg";
import prescibeIcon from "../../Image/prescibeIcon.jpg";
import viewPatientHist from "../../Image/viewPatientHist.jpg";
import writePtientHist from "../../Image/writePtientHist.jpg";
import Tooltip from "../../route/Tooltip";
const DiagnosisList = ({ setLibraryHistory, libraryHistory }) => {
  const [dispaly, setDisplay] = useState([]);
  const [office, setOffice] = useState("");
  const [MRN, setMRN] = useState();
  const [payId, setPayId] = useState();
  const [alert1, setalert1] = useState(false);
  const docOffice = () => {
    Axios.post("http://localhost:3001/selectDoctorOffice", {
      id: sessionStorage.getItem("userId"),
    }).then((response) => {
      Axios.post("http://localhost:3001/displayOrderPatient", {
        office: response.data[0].office,
      }).then((response) => {
        setDisplay(response.data);
        console.log("=========================", response.data);
      });
    });
    list();
  };
  const list = () => {};
  const finished = (payId) => {
    if (payId != undefined) {
     
      Axios.post("http://localhost:3001/finshedDiagnosis", {
        payId: payId,
        id: sessionStorage.getItem("userId")
      })
        .then((response) => {})
        .catch((err) => {
          console.log("err", err);
        });
    } else {
      alert("undefined", payId);
    }
  };
  useEffect(() => {
    docOffice();
    // list();
  }, []);

  const VIewHistory = (newMrn) => {
    Axios.post("http://localhost:3001/ViewHistory", {
      MRN: newMrn,
    })
      .then((response) => {
        // console.log(response.data);
        // DiagnosisContext.setLibraryHistory(response.data);
        setLibraryHistory(response.data);
        console.log("====", response.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
    console.log(MRN);
  };
  const viewReferIn = (newMrn) => {
    Axios.post("http://localhost:3001/ViewReferIn", {
      MRN: newMrn,
    })
      .then((response) => {
        setLibraryHistory(response.data);
        console.log("====", response.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
    console.log(MRN);
  };
  // useEffect(() => {
  //   DiagnosisList();
  // }, []);  setMRN({pp.MRN});
  // const DiagnosisContext = useContext(parentContext);

  return (
    < >
     <h1>List of patient In the System</h1>
      <form>
      {sessionStorage.getItem("userId") ? (
        <Container>
           
          <table>
        <thead>
          <tr>
            <th>MRN</th>
            <th>Full Name</th>
            <th>Age </th>
            <th>Sex</th>
            <th>Room </th>
            <th>Action</th>
            <th className='finshh'>Completed</th>
          
          </tr>
        </thead>
        <tbody>
          {dispaly.map((pp) => (
            <tr>
              <td> {pp.MRN}</td>
              <td>
                {pp.firstName} {pp.middleName} {pp.lastName}
              </td>
              <td>{pp.age}</td>
              <td>{pp.sex}</td>
              <td>{pp.assignedRoom}</td>
              <td className="tdAction">
                <div className="divv1">
                 
                    <button 
                      onClick={() => {
                        // setMRN(pp.MRN);
                        viewReferIn(pp.MRN);
                      }}
                    >
                      <Link className="btnAction" to="/ViewReferIn">
                        {/* <img
                          style={{
                            width: "30px",
                            height: "30px",
                            backgroundColor: "black",
                            textAlign: " center",
                            // padding: "0px",
                          }}
                          src={referIn}
                        /> */}
                        Refer in
                      </Link>
                    </button>
                  
                    <button
                      onClick={() => {
                        // setMRN(pp.MRN);
                        VIewHistory(pp.MRN);
                      }}
                    >
                      <Link className="btnAction" to="/ViewHistory">
                        {/* <img
                          style={{
                            width: "30px",
                            height: "30px",
                            backgroundColor: "black",
                            textAlign: " center",
                            
                          }}
                          src={viewPatientHist}
                        /> */}
                       
                          View History
                       
                      </Link>
                    </button>
                  
                    <button
                      onClick={() => {
                        setLibraryHistory(pp.MRN);
                      }}
                    >
                      <Link className="btnAction" to="/Order_Lab">
                        {/* <img
                          style={{
                            width: "30px",
                            height: "30px",
                            backgroundColor: "black",
                            textAlign: " center",

                          }}
                          src={laborderIcon}
                        /> */}
                       
                          Lab Order
                        
                      </Link>
                    </button>
                 
                    <button
                      onClick={() => {
                        // setMRN(pp.MRN);
                        setLibraryHistory(pp.MRN);
                      }}
                    >
                      <Link className="btnAction" to="/Appointment">
                        {/* <img
                          style={{
                            width: "30px",
                            height: "30px",
                            backgroundColor: "black",
                            textAlign: " center",

                          }}
                          src={appointmentIcon}
                        /> */}
                        Appointment
                      </Link>
                      
                    </button>
                 
                    <button
                      onClick={() => {
                        setLibraryHistory(pp.MRN);
                      }}
                    >
                      <Link className="btnAction" to="/Priscribe_drug">
                        {/* <img
                          style={{
                            width: "30px",
                            height: "30px",
                            backgroundColor: "black",
                            textAlign: " center",
                           
                          }}
                          src={prescibeIcon}
                        /> */}
                        prescribe
                      </Link>
                      
                    </button>{" "}
                 
                  
                </div>
                <div className="divv1">
              
                    <button
                      onClick={() => {
                        setLibraryHistory(pp.MRN);
                      }}
                    >
                      <Link className="btnAction" to="/ReferOutPatient">
                        {/* <img
                          style={{
                            width: "30px",
                            height: "30px",
                            backgroundColor: "black",
                            textAlign: " center",
                            
                          }}
                          src={referOut}
                        /> */}
                     
                      Refer Out
                      </Link>
                    </button>
                
                    <button
                      onClick={() => {
                        // setMRN(pp.MRN);
                        setLibraryHistory(pp.MRN);
                      }}
                    >
                      <Link className="btnAction" to="/WritePatientHistory">
                        {/* <img
                          style={{
                            width: "30px",
                            height: "30px",
                            backgroundColor: "black",
                            textAlign: " center",
                          
                          }}
                          src={writePtientHist}
                        /> */}
                      
                      Write History
                      </Link>
                    </button>
                    <button
                      onClick={() => {
                        // setMRN(pp.MRN);
                        setLibraryHistory(pp.MRN);
                      }}
                    >
                      <Link className="btnAction" to="/ViewLabResult">
                        {/* <img
                          style={{
                            width: "30px",
                            height: "30px",
                            backgroundColor: "black",
                            textAlign: " center",
                           
                          }}
                          src={labresultIcon}
                        /> */}
                      
                      Lab Result
                      </Link>
                    </button>{" "}
               
                    <button
                      onClick={() => {
                        setLibraryHistory(pp.MRN);
                       
                      }}
                    >
                      <Link className="btnAction" to="/ViewAppointmnetByDoctor">
                        {/* <img
                          style={{
                            width: "30px",
                            height: "30px",
                            backgroundColor: "black",
                            textAlign: " center",
                            
                          }}
                          src={viewappoicon}
                        /> */}
                        View Appointment
                      </Link>
                      
                    </button>
                  
                </div>
              </td>
              <td className='finshh'>
                {" "}
                <div>
               
                    <button
                      onClick={() => {
                       
                        finished(pp.payId);
                      }}
                    >
                      <img
                        style={{
                          width: "30px",
                          height: "30px",
                          backgroundColor: "white",
                          textAlign: " center",
                          // padding: "0px",
                        }}
                        src={finishedd}
                      />
                    </button>
                 
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
        
        
        </Container>
      ) : null}
          </form>
    </>
  );
};

export default memo ( DiagnosisList);
