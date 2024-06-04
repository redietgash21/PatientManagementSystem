




import React, { useState, memo } from "react";
import "../Signin.css";
import Axios from "axios";
import {Container  ,Form,Modal, Col,InputGroup,Button, Nav,Navbar
  , Row,Image} from 'react-bootstrap';
function ChangeAccount() {
  const [userName, setUserName] = useState("");
  const [confirm, setConfirm] = useState("");
  const [passwordd, setPasswordd] = useState("");
  const [id, setID] = useState(sessionStorage.getItem("userId"));
  const [alert1, setalert1] = useState(false);
  const [alert2, setalert2] = useState(false);
  const [alert3, setalert3] = useState(false);
  const [alert4, setalert4] = useState(false);
  const [alert5, setalert5] = useState(false);
  const [alert6, setalert6] = useState(false);
  const [alert7, setalert7] = useState(false);
  const [alert8, setalert8] = useState(false);
  const [alert9, setalert9] = useState(false);
  const [alertOne, setalertOne] = useState(false);
  const [alertTwo, setalertTwo] = useState(false);
  const [alertThree, setalertThree] = useState(false);
  const [errorOccured, setErrorOccured] = useState(false);
  const [alertChangeold, setalertChangeold] = useState(true);
  const [alertNew, setalertNew] = useState(false);
  const signUP = () => {
    alert("signUp.....");
    Axios.post("http://localhost:3001/SignUp", {
      userName: userName,
      table: "employee",
      IDD: "id",
      passwordd: passwordd,
      id: sessionStorage.getItem("userId"),
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
          console.log(response.data.message);
          setTimeout(() => {
            setalert1(false);
          }, 4000);
        }
      })

      .catch((err) => {
        console.log("err", err);
      });
  };
  const checkAccount = () => {
    Axios.post("http://localhost:3001/CheckAccount", {
      userName: userName,
      table: "employee",

      passwordd: passwordd,
    }).then((response) => {
      if (response.data.message) {
        alert("Account Does not Exist");
        console.log("Account Does not Exist");
        setalertOne(true);
        console.log(response.data.message);
        setTimeout(() => {
          setalertOne(false);
        }, 4000);
      } else if (response.data[0]) {
        setalertChangeold(false);
        setalertNew(true);
        // signUP();
        console.log("chaked succussesfully");
        alert("Cheaked Successfully");
      } else {
        alert("Something Went Wrong....");
      }
    });
  };

  const handleConfirmOld = () => {
    if (userName == "") {
      setalert2(true);
      setTimeout(() => {
        setalert2(false);
      }, 4000);
    } else if (passwordd == "") {
      setalert3(true);
      setTimeout(() => {
        setalert3(false);
      }, 4000);
    } else {
      checkAccount();
      // setErrorOccured(true);
      // setTimeout(() => {
      //   setErrorOccured(false);
      // }, 4000);
    }
  };
  const handleConfirmnew = () => {
    if (userName == "") {
      setalert4(true);

      setTimeout(() => {
        setalert4(false);
      }, 4000);
    } else if (userName.length < 5 || userName.length > 20) {
      setalert8(true);

      setTimeout(() => {
        setalert8(false);
      }, 4000);
    } else if (passwordd == "") {
      setalert5(true);

      setTimeout(() => {
        setalert5(false);
      }, 4000);
    } else if (passwordd.length < 5 || passwordd.length > 20) {
      setalert9(true);

      setTimeout(() => {
        setalert9(false);
      }, 4000);
    } else if (confirm == "") {
      setalert6(true);

      setTimeout(() => {
        setalert6(false);
      }, 4000);
    } else if (confirm !== passwordd) {
      setalert7(true);

      setTimeout(() => {
        setalert7(false);
      }, 4000);
    } else {
      checkUserNameNew();
      // setErrorOccured(true);
      // setTimeout(() => {
      //   setErrorOccured(false);
      // }, 4000);
    }
  };
  const checkUserNameNew = () => {
    Axios.post("http://localhost:3001/checkUserName", {
      userName: userName,
      table: "employee",
      where: "id",
    }).then((response) => {
      if (response.data.message) {
        alert("UserName Not Reapted...");
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

  return (
    < >
      {sessionStorage.getItem("userId") ? (
        <Container fluid>
          <div className="patientRecord">
            {alertChangeold && (
              <div>
                <h3>Please Enter Your User Name And Password </h3>
                <div
                  style={{
                    minWidth: "300px",
                    alignContent: "center",
                    paddingLeft: "25%",
                    paddingTop: "5%",
                    fontSize: "18px",
                  }}
                  className="FormClass"
                >
                  <div className="LoggClass1">
                    <label for="userName">Old User Name:</label>
                    <input
                      id="userName"
                      name="userNamee"
                      placeholder="Old Username"
                      type="text"
                      required
                      onChange={(event) => {
                        setUserName(event.target.value);
                      }}
                    />

                    <label for="password">Old PassWord:</label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Old Password"
                      required
                      onChange={(event) => {
                        setPasswordd(event.target.value);
                      }}
                    />
                  </div>
                </div>
                <div
                  className="logReset"
                  style={{
                    textAlign: "center",
                    fontSize: "20px",
                    padding: "50px",
                  }}
                >
                  <button
                    style={{ textAlign: "center", fontSize: "20px" }}
                    className="login"
                    onClick={handleConfirmOld}
                  >
                    Change Account
                  </button>
                  <button
                    className=" reset"
                    style={{
                      textAlign: "center",
                      fontSize: "20px",
                      backgroundColor: "red",
                    }}
                    type="reset"
                  >
                    Reset
                  </button>
                </div>{" "}
              </div>
            )}

            {alertNew && (
              <div>
                <div
                  style={{
                    minWidth: "300px",
                    alignContent: "center",
                    paddingLeft: "25%",
                    paddingTop: "5%",
                    fontSize: "18px",
                  }}
                  className="FormClass"
                >
                  <div className="LoggClass1">
                    <label for="userName">New User Name:</label>
                    <input
                      id="userName"
                      name="userNamee"
                      type="text"
                      placeholder="New Username"
                      required
                      onChange={(event) => {
                        setUserName(event.target.value);
                      }}
                    />

                    <label for="password">New PassWord:</label>
                    <input
                      id="password"
                      name="password"
                      placeholder="New Password"
                      type="password"
                      required
                      onChange={(event) => {
                        setPasswordd(event.target.value);
                      }}
                    />

                    <label for="confirm password">Confirm Password :</label>
                    <input
                      id="password"
                      name="password"
                      placeholder="Confirmation Password"
                      type="password"
                      required
                      onChange={(event) => {
                        setConfirm(event.target.value);
                      }}
                    />
                  </div>
                </div>
                <div
                  className="logReset"
                  style={{
                    textAlign: "center",
                    fontSize: "20px",
                    padding: "50px",
                  }}
                >
                  <button
                    style={{ textAlign: "center", fontSize: "20px" }}
                    className="login"
                    onClick={handleConfirmnew}
                  >
                    Change Account
                  </button>
                  <button
                    className=" reset"
                    style={{
                      textAlign: "center",
                      fontSize: "20px",
                      backgroundColor: "red",
                    }}
                    type="reset"
                  >
                    Reset
                  </button>
                </div>
              </div>
            )}
          </div>
          {alertThree && (
            <p
              className="password"
              style={{
                // color: "red",
                backgroundColor: "red",

                alignContent: "center",
              }}
            >
              You Have Already An Account!!!
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
              Id Not Found!!!
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
              User Name Repeated!!!
            </p>
          )}
          {alert1 && (
            <p
              className="password"
              style={{
                // color: "red",
                backgroundColor: "green",

                alignContent: "center",
              }}
            >
              Account Created Successfully!!!
            </p>
          )}
          {alert2 && (
            <p
              className="password"
              style={{
                // color: "red",
                backgroundColor: "red",

                alignContent: "center",
              }}
            >
              Please Enter Your User Name!!!
            </p>
          )}
          {alert3 && (
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
          {alert4 && (
            <p
              className="password"
              style={{
                // color: "red",
                backgroundColor: "red",

                alignContent: "center",
              }}
            >
              Please Enter Your User Name!!!
            </p>
          )}
          {alert5 && (
            <p
              className="password"
              style={{
                // color: "red",
                backgroundColor: "red",

                alignContent: "center",
              }}
            >
              Please Enter Your password !!!
            </p>
          )}{" "}
          {alert6 && (
            <p
              className="password"
              style={{
                // color: "red",
                backgroundColor: "red",

                alignContent: "center",
              }}
            >
              Please Enter Your Please Enter confirmation Password!!!
            </p>
          )}
          {alert7 && (
            <p
              className="password"
              style={{
                // color: "red",
                backgroundColor: "red",

                alignContent: "center",
              }}
            >
              ERROR....... Password and confirmation Password Should be the
              same!!!
            </p>
          )}
          {alert8 && (
            <p
              className="password"
              style={{
                // color: "red",
                backgroundColor: "red",

                alignContent: "center",
              }}
            >
              The length of your Username must be 6-20 characters!!!
            </p>
          )}{" "}
          {alert9 && (
            <p
              className="password"
              style={{
                // color: "red",
                backgroundColor: "red",

                alignContent: "center",
              }}
            >
              The length of your Password must be 6-20 characters!!!
            </p>
          )}
          {errorOccured && (
            <p
              className="password"
              style={{
                // color: "red",
                backgroundColor: "red",

                alignContent: "center",
              }}
            >
              Wrong ID/ UserName/ and Password/ combination!!!
            </p>
          )}
        </Container>
      ) : null}
    </>
  );
}

export default memo (ChangeAccount);
