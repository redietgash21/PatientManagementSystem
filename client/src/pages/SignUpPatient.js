import React, { useState } from "react";
import "./Signin.css";
import Axios from "axios";
function SignUpPatient() {
  const [userName, setUserName] = useState("");
  const [confirm, setConfirm] = useState("");
  const [passwordd, setPasswordd] = useState("");
  const [MRN, setID] = useState("");
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
      table: "patient",
      IDD: "MRN",
      passwordd: passwordd,
      id: MRN,
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
      table: "patient",
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
      table: "patient",
      IDD: "MRN",
      Id: MRN,
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
    if (MRN == "") {
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
    <div
      className="BodyArea"
      style={{
        width: "100%",
        left: "8px",
        right: "0px",
        marginLeft: "0%",
        borderRadius: "0px",
      }}
    >
      <h3> Create Account for Employ </h3>
      <div className="patientRecord">
        <div className="siggnn">
          {/* <form> */}
          <div className="LoggClass">
            <div className="LoggClass1">
              <label for="ID">MRN:</label>
              <input
                id="ID"
                name="ID"
                type="number"
                placeholder="Medical Record Number"
                required
                onChange={(event) => {
                  setID( event.target.value);
                }}
              />

              <div className="Password">
                <label for="userName">User Name:</label>
                <input
                  id="userName"
                  name="userNamee"
                  type="text"
                  placeholder="User Name"
                  required
                  onChange={(event) => {
                    setUserName(event.target.value);
                  }}
                />
              </div>
              <div className="Password">
                <label for="password">PassWord:</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                  onChange={(event) => {
                    setPasswordd(event.target.value);
                  }}
                />
              </div>
              <div className="Password">
                <label for="confirm password">Confirm Password :</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Confirm Password"
                  required
                  onChange={(event) => {
                    setConfirm(event.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div
            className="LoginReset"
            style={{
              textAlign: "center",
              fontSize: "20px",
              paddingTop: "50px",
              paddingBottom: "10px",
            }}
          >
            <button
              style={{
                fontSize: "21px",
                alignContent: "center",
              }}
              className="login"
              onClick={handleConfirm}
            >
              Create Account
            </button>
            <button
              style={{
                textAlign: "center",
                fontSize: "20px",
                backgroundColor: "red",
              }}
              className=" reset"
              type="reset"
            >
              Reset
            </button>
          </div>
          {alertFive && (
            <p
              className="password"
              style={{
                // color: "red",
                backgroundColor: "red",

                alignContent: "center",
              }}
            >
              The Length of Your Password is too Short...!!!
            </p>
          )}{" "}
          {alertFour && (
            <p
              className="password"
              style={{
                // color: "red",
                backgroundColor: "red",

                alignContent: "center",
              }}
            >
              The UserName Should be more than 5 Character...!!!
            </p>
          )}{" "}
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
              Please Enter Your Identification Number!!!
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
              Please Enter Your UserName As you Want!!!
            </p>
          )}
          {alert4 && (
            <div>
              <p
                className="password"
                style={{
                  // color: "red",
                  backgroundColor: "red",

                  alignContent: "center",
                }}
              >
                The Length of Username is too Short!!!
              </p>{" "}
              <p
                className="password"
                style={{
                  // color: "red",
                  // backgroundColor: "red",

                  alignContent: "center",
                }}
              >
                Please Enter At Least Six Characters!!!
              </p>
            </div>
          )}{" "}
          {alert5 && (
            <p
              className="password"
              style={{
                // color: "red",
                backgroundColor: "red",

                alignContent: "center",
              }}
            >
              Please Enter Your Password As you Want!!!
            </p>
          )}{" "}
          {alert6 && (
            <div>
              <p
                className="password"
                style={{
                  // color: "red",
                  backgroundColor: "red",

                  alignContent: "center",
                }}
              >
                The Length of Password is too Short!!!
              </p>{" "}
              <p
                className="password"
                style={{
                  // color: "red",
                  // backgroundColor: "red",

                  alignContent: "center",
                }}
              >
                Please Enter At Least Six Characters!!!
              </p>
            </div>
          )}{" "}
          {alert9 && (
            <div>
              <p
                className="password"
                style={{
                  // color: "red",
                  backgroundColor: "red",

                  alignContent: "center",
                }}
              >
                The Length of Username is too Long!!!
              </p>{" "}
            </div>
          )}{" "}
          {alert10 && (
            <div>
              <p
                className="password"
                style={{
                  // color: "red",
                  backgroundColor: "red",

                  alignContent: "center",
                }}
              >
                The Length of Password is too Long!!!
              </p>{" "}
            </div>
          )}{" "}
          {alert7 && (
            <p
              className="password"
              style={{
                // color: "red",
                backgroundColor: "red",

                alignContent: "center",
              }}
            >
              Please Enter Your Confirmation Password As you Want!!!
            </p>
          )}{" "}
          {alert8 && (
            <p
              className="password"
              style={{
                // color: "red",
                backgroundColor: "red",

                alignContent: "center",
              }}
            >
              Password and Confirmation Password should be the same!!!
            </p>
          )}{" "}
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
          {/* // </form> */}
        </div>
      </div>
    </div>
  );
}

export default SignUpPatient;
