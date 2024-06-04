








import React, { useState } from "react";
import "./Signin.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import {Container,Form,Modal, InputGroup,Button, Row} from 'react-bootstrap';
import { FaBackward, FaLock, FaUserAlt,FaBackspace,FaUndo,FaUndoAlt , FaIdCardAlt, FaIdBadge, FaIdCard } from "react-icons/fa";

function SignUPEmp() {
  const [userName, setUserName] = useState("");
  const [confirm, setConfirm] = useState("");
  const [passwordd, setPasswordd] = useState("");
  const [id, setID] = useState(0);
  const [clicke,setclick]=useState("");
  const [openModal,setOpenModal] = useState(false);
  const [alert1, setalert1] = useState(false);
  const [alert2, setalert2] = useState(false);
  const [alert3, setalert3] = useState(false);
  const [alert4, setalert4] = useState(false);
  const [alert5, setalert5] = useState(false);
  const [alert6, setalert6] = useState(false);
  const [alert7, setalert7] = useState(false);
  const [alert8, setalert8] = useState(false);
  const [alert9, setalert9] = useState(false);
  const [alert10, setalert10] = useState(false);
  const [alertOne, setalertOne] = useState(false);
  const [alertTwo, setalertTwo] = useState(false);
  const [alertThree, setalertThree] = useState(false);
  const [alertFive, setalertFive] = useState(false);
  const [alertFour, setalertFour] = useState(false);

  const [errorOccured, setErrorOccured] = useState(false);
  const signUP = () => {
  
    Axios.post("http://localhost:3001/signUp", {
      userName: userName,
      table: "employee",
      where: "id",
      passwordd: passwordd,
      id: id,
    })
      .then((response) => {
        if (response.data.message) {
          // setCorrect(response.data.message);
          setErrorOccured(true);
          console.log(response.data.message);
          setTimeout(() => {
            setErrorOccured(false);
          }, 4000);
        } else {
          setalert1(true);
          console.log(response.data);
          setTimeout(() => {
            setalert1(false);
          }, 4000);
        }
      })

      .catch((err) => {
        console.log("err", err);
      });
  };
  const checkUserName = () => {

    Axios.post("http://localhost:3001/checkUserName", {
      userName: userName,

      table: "employee",
      where: "MRN",
    }).then((response) => {
      if (response.data.message) {
        signUP();
      } else {
        console.log("username repeated");
        setalertOne(true);
        console.log(response.data.message);
        setTimeout(() => {
          setalertOne(false);
        }, 4000);
      }
    });
  };
  const checkId = () => {
    Axios.post("http://localhost:3001/checkId", {
      table: "employee",
      IDD: "id",
      Id: id,
    }).then((response) => {
      if (response.data[0]) {
        console.log("IdS...........");
        if (response.data[0].userName) {
          console.log("USER  NAME...........");
          setalertThree(true);
          console.log(response.data.message);
          setTimeout(() => {
            setalertThree(false);
          }, 4000);
        } else {
          checkUserName();
        }
      } else {
        console.log("Id not found");
        setalertTwo(true);
        console.log(response.data.message);
        setTimeout(() => {
          setalertTwo(false);
        }, 4000);
      }
    });
  };
  // const handlePasswordLength = () => {
  //   if (passwordd.length >= 4 && userName.length >= 6) {
  //     setalertFive(false);
  //     checkId();
  //   } else {
  //     setalertFive(true);
  //     setTimeout(() => {
  //       setalertFive(false);
  //     }, 4000);
  //   }
  // };
  // const handleUserNameLength = () => {
  //   if (userName.length >= 6) {
  //     setalertFour(false);
  //     handlePasswordLength();
  //   } else {
  //     setalertFour(true);
  //     setTimeout(() => {
  //       setalertFour(false);
  //     }, 4000);
  //   }
  // };
  const handleConfirm = () => {
    if (id == "") {
      setalert2(true);
      setTimeout(() => {
        setalert2(false);
      }, 4000);
    } else if (userName == "") {
      setalert3(true);
      setTimeout(() => {
        setalert3(false);
      }, 4000);
    } else if (userName.length <= 5) {
      setalert4(true);
      setTimeout(() => {
        setalert4(false);
      }, 4000);
    } else if (userName.length > 20) {
      setalert9(true);
      setTimeout(() => {
        setalert9(false);
      }, 4000);
    } else if (passwordd == "") {
      setalert5(true);
      setTimeout(() => {
        setalert5(false);
      }, 4000);
    } else if (passwordd.length <= 5) {
      setalert6(true);
      setTimeout(() => {
        setalert6(false);
      }, 4000);
    } else if (passwordd.length > 20) {
      setalert10(true);
      setTimeout(() => {
        setalert10(false);
      }, 4000);
    } else if (confirm == "") {
      setalert7(true);
      setTimeout(() => {
        setalert7(false);
      }, 4000);
    } else if (confirm != passwordd) {
      setalert8(true);
      setTimeout(() => {
        setalert8(false);
      }, 4000);
    } else {
      checkId();
    }
  };
  return (
    <>
     <Container style={{margin:"5%"}}>
      
      <Form style={{marginRight:"20%"}}> 
    <Form.Group as={Row}  controlId="validationCustomUsername">
    <Form.Label>ID</Form.Label>
      <InputGroup hasValidation>
        <InputGroup.Text id="inputGroupPrepend"> 
        <FaIdCard/> 
         </InputGroup.Text>
        <Form.Control 
          type="number"
          placeholder="Identification Number"
          aria-describedby="inputGroupPrepend"
          required
          onChange={(event) => {
                         setID(event.target.value);
                      }}
        />
      <Form.Control.Feedback type="invalid">
        Please choose a username.
      </Form.Control.Feedback>
    </InputGroup>
  </Form.Group>
  <Form.Group as={Row}  controlId="validationCustomUsername">
  <Form.Label>User Name:</Form.Label>
      <InputGroup hasValidation>
        <InputGroup.Text id="inputGroupPrepend"> <FaUserAlt/> </InputGroup.Text>
        <Form.Control 
         
                  type="text"
                      placeholder="User Name"
                      aria-describedby="inputGroupPrepend"
                      required
                     onChange={(event) => {
                        setUserName(event.target.value);
                      }}
        />
      <Form.Control.Feedback type="invalid">
        Please enter a password.
      </Form.Control.Feedback>
    </InputGroup>
  </Form.Group >
  <Form.Group as={Row}  controlId="validationCustomUsername">
  <Form.Label>PassWord:</Form.Label>
      <InputGroup hasValidation>
        <InputGroup.Text id="inputGroupPrepend"> <FaLock/> </InputGroup.Text>
        <Form.Control 
         
                        type="password"
                      placeholder="Password"
                      aria-describedby="inputGroupPrepend"
                      required
                      onChange={(event) => {
                         setPasswordd(event.target.value);
                     }}
        />
      <Form.Control.Feedback type="invalid">
        Please enter a password.
      </Form.Control.Feedback>
    </InputGroup>
  </Form.Group >
  <Form.Group as={Row}  controlId="validationCustomUsername">
  <Form.Label>Confirm Password :</Form.Label>
      <InputGroup hasValidation>
        <InputGroup.Text id="inputGroupPrepend"> <FaLock/>  </InputGroup.Text>
        <Form.Control 
          
                     type="password"
                       placeholder="Confirm Password"
                       aria-describedby="inputGroupPrepend"
                      required
                       onChange={(event) => {
                     setConfirm(event.target.value);
                       }}
        />
      <Form.Control.Feedback type="invalid">
        Please enter a password.
      </Form.Control.Feedback>
    </InputGroup>
  </Form.Group >
  
  <p><Link to="/Login"  onClick={()=>{setOpenModal(true)}}>Already have an account</Link></p>
  <Button  onClick={(event) => {
          handleConfirm();
          setclick("clicked");
        }}>Create Account</Button>
 
  
  {/* <button onClick={()=>{closeM(false)}}>X</button> */}
  </Form>
  </Container>

 
    </>
  );
}

export default SignUPEmp;

 