






import React from "react";
import { useEffect, useState ,useContext, memo} from "react";
import Axios from "axios";
import {RecoveryContext} from "../App"

import "../route/PatientRecord.css";
import { Link } from "react-router-dom";
import DoctorWelcomePage from "./doctor/DoctorWelcomePage";
import {Container  ,Form,Modal, Col,InputGroup,Button, Nav,Navbar
  , Row,Image} from 'react-bootstrap';

function MainBody() {
  const [profileImg, setProfileImg] = useState([]);
  const [visibleLSB, setVisibleLSB] = useState("false");
  const {correct,setCorrect}=useContext(RecoveryContext);
  const getProfile = () => {
    Axios.post("http://localhost:3001/getProfile", {
      id: sessionStorage.getItem("userId"),
    })
    .then((response) => {
      setProfileImg(
      "http://localhost:3001/Image/" + response.data[0].imagePath
    );
    // const myList = myArray.map((item) => <p>{item}</p>);
    console.log(response);
    })
    .catch((err) => {
     console.log("err", err);
    });
  };
  useEffect(() => {
    getProfile();
  }, []);
  return (  <>
  {visibleLSB=="true"&&
      <Container fluid>
      {/* {sessionStorage.getItem("userId") ? ( */}
      <Row>
        
        <Col xs={9}>
            {sessionStorage.getItem("employeeJob")==="Doctor"&&
              <DoctorWelcomePage/>
            }
            {sessionStorage.getItem("employeeJob")==="Record Officer"&&
              <DoctorWelcomePage/>
            }
            {sessionStorage.getItem("employeeJob")==="Casher"&&
              <DoctorWelcomePage/>
            }
            {sessionStorage.getItem("employeeJob")==="Lab Technician"&&
              <DoctorWelcomePage/>
            }
            {sessionStorage.getItem("employeeJob")==="Manager"&&
              <DoctorWelcomePage/>
            }
            {sessionStorage.getItem("employeeJob")==="Pharmacist"&&
              <DoctorWelcomePage/>
            }
          </Col>
        </Row>                    
        {/* // ) : null} */}   
      </Container>
    } 
    {visibleLSB=="false"&&
      <Container fluid>
      {/* {sessionStorage.getItem("userId") ? ( */}
     
        <Row xs={9}>
            {sessionStorage.getItem("employeeJob")==="Doctor"&&
              <DoctorWelcomePage/>
            }
            {sessionStorage.getItem("employeeJob")==="Record Officer"&&
              <DoctorWelcomePage/>
            }
            {sessionStorage.getItem("employeeJob")==="Casher"&&
              <DoctorWelcomePage/>
            }
            {sessionStorage.getItem("employeeJob")==="Lab Technician"&&
              <DoctorWelcomePage/>
            }
            {sessionStorage.getItem("employeeJob")==="Manager"&&
              <DoctorWelcomePage/>
            }
            {sessionStorage.getItem("employeeJob")==="Pharmacist"&&
              <DoctorWelcomePage/>
            }
          </Row>
                          
        {/* // ) : null} */}   
      </Container>
    }
       </>
  );
}

export default memo (MainBody);
