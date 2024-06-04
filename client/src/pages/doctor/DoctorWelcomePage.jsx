






import React from "react";
import { useEffect, useState, memo } from "react";
import Axios from "axios";

import "../../route/PatientRecord.css";
import { Link } from "react-router-dom";
import {Container  ,Form,Modal, Col,InputGroup,Button, Nav,Navbar
  , Row,Image} from 'react-bootstrap';
function DoctorWelcomePage() {
  const [profileImg, setProfileImg] = useState([]);
  const [office, setOffice] = useState("");
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
  return (

    
    <Container fluid >
  
      <h1>Welcome To Addiss Alem Hospital</h1>
      {/* <Image style={{width:"50%",height:"110%"}}src={profileImg} roundedCircle />  */}
     
    
    
    </Container>
  );
}

export default memo (DoctorWelcomePage);
