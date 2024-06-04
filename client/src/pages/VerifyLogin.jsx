import { browserHistory } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { useEffect } from "react";


import React from "react";
import logo from "../Image/logo.png";
import Axios from "axios";
import eyasta from  '../doctorsimage/images (17).jpg'
import {Modal,Row, Col,Card, Container,Nav,Form,Carousel,NavDropdown , Image, Button} from 'react-bootstrap';
import Setting from "../Image/Setting.png";
import "../layout/Layout.css";
import "../route/Setting.css";
import Login from "./Login";
import { RecoveryContext } from "../App";
const VerifyLogin = () => {
const {email,otp}=useContext(RecoveryContext);
const [timeCount,setTimer]=React.useState(60);
const [disable,setDisable]=useState(true);
const [OTPinput,setOTPinput]=useState([0,0,0,0]);
function resendOtp(){
  if(disable) return;
  Axios.post("http://localhost:3001/sendemail", {
    OTP: otp,
     recipient_email:email,
   })
     .then(() => setDisable(true))
     .then(() => alert("A new otp has sucessfully been sent to your email"))
     .then(() => setTimer(60))
     .catch(console.log);
     
 }
function verifyOTP(){
  if(parseInt(OTPinput.join(""))===otp){
    return;
  }
  alert("The code you have entered is not correct,try again or re-send the link")
   return;
}

 React.useEffect(()=>{
  let interval=setInterval(()=>{
    setTimer((lastTimerCount)=>{
      lastTimerCount<=1&& clearInterval(interval);
      if(lastTimerCount<=1)setDisable(false);
      if(lastTimerCount<=0)return lastTimerCount;
      return lastTimerCount-1;
    });
  },1000);
  return ()=> clearInterval(interval);
 },[disable]);
 
  return (<>
 
    <Container fluid>
      <h3> Email Verification</h3>
      <p>We have sent a code to your email {email}</p>
      {/* <Form>
    <Row >
      <Col >
      <Form.Control placeholder="First name" />
      </Col>
      <Col  >
      <Form.Control placeholder="First name" />
      </Col>
      <Col  >  
      <Form.Control placeholder="First name" />
      </Col>
      <Col  >  
      <Form.Control placeholder="First name" />
      </Col>
    </Row>
    </Form> */}
      {/* <input type="number" style={{minWidth:"0%",width:"5%", height:"100px"}}/> */}
      <Row style={{marginBottom:"15%"}}>
      
        <Col md={1} style={{minWidth:"25%",width:"10%"}}>
        <Form.Control 
          onChange={(e)=>setOTPinput([
            e.target.value,OTPinput[1],OTPinput[2],OTPinput[3]
          ])}
        style={{
          minWidth:"25%",borderRightColor:"black",width:"50%",height:"200%"}} 
          maxLength="1" type="text"  />
        </Col>
        <Col md={1} style={{minWidth:"25%",width:"10%"}}>
        <Form.Control 
        style={{
          minWidth:"25%",borderRightColor:"black",width:"50%",height:"200%"}} 
          maxLength="1" type="text" 
          onChange={(e)=>setOTPinput([
            OTPinput[0],e.target.value,OTPinput[2],OTPinput[3]
          ])} />
        </Col>
        <Col md={1} style={{minWidth:"25%",width:"10%"}}>
        <Form.Control 
         onChange={(e)=>setOTPinput([
          OTPinput[0],OTPinput[1],e.target.value,OTPinput[3]
        ])}
        style={{
          minWidth:"25%",borderRightColor:"black",width:"50%",height:"200%"}} 
          maxLength="1" type="text"  />
        </Col>
        <Col md={1} style={{minWidth:"25%",width:"10%"}}>
        <Form.Control 
          onChange={(e)=>setOTPinput([
            OTPinput[0],OTPinput[2],OTPinput[3],e.target.value
          ])}
        style={{
          minWidth:"25%",borderRightColor:"black",width:"50%",height:"200%"}} 
          maxLength="1" type="text"  />
        </Col>
      </Row>
   
    <Button onClick={()=>verifyOTP()}>Verify Account</Button>
    <p>Did n't recieve code? </p>
    <a style={{
      color: disable?"gray":"blue",
      cursor: disable?"none":"pointer",
      textDecorationLine: disable?"none":"underline",
    }}
     onClick={()=>resendOtp()}
     >{disable?`Resend OTP in ${timeCount} s`:"Resend OTP"}</a>
   </Container>

</>
  );
};

export default VerifyLogin;
