import React from "react";
import Signin from "../pages/SignUpPatient";
import "./sectEmpPAte.css";

import signUPLogo from "../Image/signUPLogo.png";
import { Link } from "react-router-dom";
const SelectionPageEmp_Patient = (props) => {
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
      <div className="patientRecord">
        <div className="profileLogo">
          <div className="Password">
            <img src={signUPLogo} />
            <button>
              <Link className="link" to="/SignUpPatient">
                Sign Up as Patient{" "}
              </Link>
            </button>
          </div>

          <div className="Password">
            <img src={signUPLogo} />
            <button>
              <Link className="link" to="/SignUpEmp">
                Sign Up as Employ{" "}
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectionPageEmp_Patient;
