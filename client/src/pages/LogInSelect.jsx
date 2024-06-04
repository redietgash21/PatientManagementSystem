import React from "react";
import { Router, Route, RouteHandler } from "react-router";

import log from "../Image/log.png";
import { Link } from "react-router-dom";
const LogInSelect = () => {
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
      <h3>Select your Account</h3>
      <div className="patientRecord">
        <div className="profileLogo">
          <div className="Password">
            <img src={log} />
            <button>
              <Link className="link" to="/LogInPatient">
                Log In as Patient{" "}
              </Link>
            </button>
          </div>

          <div className="Password">
            <img src={log} />
            <button>
              <Link className="link" to="/Login">
                Log In as Employ{" "}
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogInSelect;
