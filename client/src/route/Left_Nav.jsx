import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import "./Left_nav.css";
const Left_Nav = (props) => {
  const [visible, setVisible] = useState(false);

  const visibleHandler = () => {
    visible === false ? setVisible(true) : setVisible(false);
  };
  return (
    <div className="BodyArea">
      <div className="Left_Side_Nav">
        <div className="" onClick={visibleHandler}>
          <h3>&#9776;</h3>
        </div>
        {visible && (
          <div>
            <div className="password">
              <h6>
                <Link className="link" to="/RecordOfficer">
                  Record Officer
                </Link>
              </h6>

              <h6>
                <Link className="link" to="/Admin">
                  Manger
                </Link>
              </h6>
              <h6>
                <Link className="link" to="/Patient">
                  Patient
                </Link>
              </h6>
              <h6>
                <Link className="link" to="/Pharmasisit">
                  Pharmasisit
                </Link>
              </h6>
              <h6>
                <Link className="link" to="/LabTechnitian">
                  Lab Technitian
                </Link>
              </h6>
              <h6>
                <Link className="link" to="/Doctor">
                  Doctor
                </Link>
              </h6>

              <h6>
                <Link className="link" to="/Casher">
                  Casher
                </Link>
              </h6>
              <h6>
                <Link className="link" to="/Nurse">
                  Nurse
                </Link>
              </h6>
              <h6>
                <Link className="link" to="/RadioGrapher">
                  RadioGrapher
                </Link>
              </h6>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Left_Nav;
