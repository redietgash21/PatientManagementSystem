import React, { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import "./Login.css";
import Patient from "../route/Patient";
const LogInPatient = (props) => {
  const [userName, setUserName] = useState("");
  const [passwordd, setPasswordd] = useState("");
  const [correct, setCorrect] = useState(false);
  const [alertOne, setalertOne] = useState(false);
  const [alertTwo, setalertTwo] = useState(false);
  const [alertThree, setalertThree] = useState(false);
  const [loginVal, setLogin] = useState(true);
  const [error, setError] = useState(false);
  const [errorVisible, seterrorVisible] = useState(false);
  const login = () => {
    Axios.post("http://localhost:3001/login", {
      userName: userName,
      passwordd: passwordd,
      table: "patient",
    })
      .then((response) => {
        console.log(response);
        if (response.data.message) {
          setCorrect(false);
          setError(true);
          console.log(response.data.message);
          setTimeout(() => {
            setError(false);
          }, 4000);
        } else {
          sessionStorage.setItem("userId", response.data[0].MRN);
          console.log(response.data[0].MRN);
          setCorrect(true);
          // userId(response.data[0].MRN);
          setLogin(false);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

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
  return (
    <div className="login">
      <header
        className="BodyArea"
        style={{
          width: "100%",
          left: "8px",
          right: "0px",
          marginLeft: "0%",
          borderRadius: "0px",
        }}
      >
        <h3>Log In To AAHMS</h3>
        <div className="LoggClass">
          <label
            for="password"
            style={{
              // color: "red",

              fontSize: "24px",
              alignContent: "center",
              paddingTop: "15px",
              color: "white",
            }}
          >
            Username
          </label>

          <input
            id="userName"
            name="userNamee"
            type="text"
            required
            placeholder="Username:"
            onChange={(event) => {
              setUserName(event.target.value);
            }}
          />

          <label
            style={{
              // color: "red",

              fontSize: "24px",
              alignContent: "center",
              paddingTop: "15px",
              color: "white",
            }}
            for="password"
          >
            Password
          </label>

          <input
            id="password"
            name="password"
            required
            placeholder="Password:"
            type="password"
            onChange={(event) => {
              setPasswordd(event.target.value);
            }}
          />
        </div>

        <div className="LoginReset">
          <button
            style={{
              // color: "red",

              fontSize: "21px",
              alignContent: "center",
            }}
            className="login"
            onClick={handleConfirm}
          >
            Log In
          </button>
        </div>

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
      </header>

      {correct && window.location.replace("/Patient")}
    </div>
  );
};

export default LogInPatient;
