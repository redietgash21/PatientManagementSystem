




import Axios from "axios";

import React, { useState,memo,useContext } from "react";
import { Link } from "react-router-dom";
import {Container,Form,Modal, Col,InputGroup,Button, Row} from 'react-bootstrap';
import { FaBackward, FaLock, FaUserAlt,FaBackspace,FaUndo,FaUndoAlt } from "react-icons/fa";
import ForgetPassword from "./ForgetPassword";
import {RecoveryContext} from "../App"
import Layout from "../layout/Layout";


const Login=(props)=>{
  const [openModal,setOpenModal] = useState(false);
  const [openModalSU,setOpenModalSU] = useState(false);
  const [userName, setUserName] = useState("");
    const [passwordd, setPasswordd] = useState("");
     const [error, setError] = useState(false);
    const [alertOne, setalertOne] = useState(false);
    const [alertTwo, setalertTwo] = useState(false);
      const [clicke,setclick]=useState("");
   
      const {correct,setCorrect}=useContext(RecoveryContext);
    
  const showHideModal = ()=>{
    setOpenModal(!openModal);
  }
  const handleConfirm = () => {
    if (userName == "") {
      setalertOne(true);
      setTimeout(() => {
        setalertOne(false);
      }, 4000);
    } else if (passwordd == "") {
      setalertTwo(true);
      setTimeout(() => {
        setalertTwo(false);
      }, 4000);
    } else {
      setError(false);
      login();
    }
  };
  const login = () => {
        Axios.post("http://localhost:3001/login", {
          userName: userName,
          passwordd: passwordd,
          table: "employee",
        })
          .then((response) => {
            console.log("response   --= fvhb"+response);
            if (response.data.message) {
              // setCorrect(response.data.message);
          setError(true);
          console.log(response.data.message);
          setTimeout(() => {
            setError(false);
          }, 4000);
            } else {
              sessionStorage.setItem("userId", response.data[0].id);
              console.log(response.data[0].id);
              sessionStorage.setItem("employeeJob", response.data[0].job);
              setCorrect(response.data[0].job);
             
          
            }
          })
          .catch((err) => {
            console.log("err==============", err);
          });
      };
     
    return(<>
    <Container style={{margin:"5%"}}>
      
      <Form style={{marginRight:"20%"}}> 
        <Form.Group as={Row}  controlId="validationCustomUsername">
          <Form.Label>Username{clicke}</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">  <FaUserAlt/></InputGroup.Text>
            <Form.Control 
              type="text"
              placeholder="Username"
              aria-describedby="inputGroupPrepend"
              required
              onChange={(e)=>{setUserName(e.target.value)}}
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group as={Row}  controlId="validationCustomUsername">
          <Form.Label>Password</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">  <FaLock/></InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Password"
              aria-describedby="inputGroupPrepend"
              required
              onChange={(e)=>{setPasswordd(e.target.value)}}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a password.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group >
        <p><Link to="/forgetPassword"  onClick={()=>{setOpenModal(true); console.log("forget om"+openModal)}}>forgetpassword?</Link></p>
        <p><Link to="/signupEmp"  onClick={()=>{setOpenModal(true);}}>Do n't have an account</Link></p>
        <Button  onClick={(event) => {
                login();
                setclick("clicked");
              }}>Login</Button>
        
        {/* <button onClick={()=>{closeM(false)}}>X</button> */}
        </Form>
        </Container>
        
          {error && (
            <p
              className="password"
              style={{
                // color: "red",
                backgroundColor: "red",

                alignContent: "center",
              }}
            >
              Wrong User Name and Password combination!!!
            </p>
          )}
          {alertTwo && (
            <p
              className="password"
              style={{
                // color: "red",
                backgroundColor: "red",

                alignContent: "center",
              }}
            >
              Please Enter Your Password!!!
            </p>
          )}
          {alertOne && (
            <p
              className="password"
              style={{
                // color: "red",
                backgroundColor: "red",

                alignContent: "center",
              }}
            >
              Please Enter Your UserName!!!
            </p>
          )}
    
   <Container fluid>
   {correct === "Doctor" && window.location.replace("/Doctor")}
     {correct === "Record Officer" &&
        window.location.replace("/RecordOfficer")}
      {correct === "Casher" && window.location.replace("/Casher")}
      {correct === "Lab Technician" &&
        window.location.replace("/LabTechnitian")}
      {correct === "Manager" && window.location.replace("/Admin")}
      {correct === "Pharmacist" && window.location.replace("/Pharmasisit")}
   </Container>
        </>)
}

export default memo (Login);
