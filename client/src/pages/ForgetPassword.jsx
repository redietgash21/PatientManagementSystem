





import Axios from "axios";


import React, { useState,useContext, memo } from "react";
import { Link } from "react-router-dom";
import {RecoveryContext} from "../App"
import {Container,Form,Modal, InputGroup,Button, Row} from 'react-bootstrap';
import { FaEnvelope } from "react-icons/fa";
import VerifyLogin from "./VerifyLogin";

const ForgetPassword=()=>{
  const {setEmail,setOtp,email,otp}=useContext(RecoveryContext);
 
  const [openModal,setOpenModal] = useState(false);
  const showHideModal = ()=>{
    setOpenModal(!openModal);
  }
  function navigateToOTP(){
    if(email){
      const OTP=Math.floor(Math.random()*9000+1000);
      console.log("=============  OPT is",OTP);
      setOtp(OTP);
      Axios.post("http://localhost:3001/send_recovery_email", {
       OTP,
        recipient_email:email,
      })
        .then(() => 
         setOpenModal(true)
        )
        .catch("catch  ",console.log);
        return
    }
    return alert("please enter your email");
  }
    return(<>
    <Container style={{margin:"5%"}}>
        <h3 style={{textAlign:"center"}}>Forget Password ========{email}</h3>
        <Form style={{marginRight:"20%"}}> 
    <Form.Group as={Row}  controlId="validationCustomUsername">
          <Form.Label>Email</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">  <FaEnvelope/></InputGroup.Text>
            <Form.Control 
              type="text"
              placeholder="email"
              aria-describedby="inputGroupPrepend"
              required
              onChange={(e)=>setEmail(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
       
        <p></p>
        <button><Link to="/verifyLogin"  onClick={()=>{ navigateToOTP()}}>Enter</Link></button>
        
        {/* <button onClick={()=>{closeM(false)}}>X</button> */}
        </Form>
        </Container>
    
        </>)
}

export default memo (ForgetPassword);
