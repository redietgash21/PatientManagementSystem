




import React, { useState,memo } from "react";

import { Outlet, Link } from "react-router-dom";
import "../../route/PatientRecord.css";
import Login from "../Login";
import { useNavigate } from "react-router-dom";
function AdminGenerateReport() {
  let navigate = useNavigate();
  {
    /* <div className="BackButton">
          <button onClick={() => navigate(-1)}>&#8592;</button>;
          <button onClick={() => navigate(+1)}>&#8594;</button>;
        </div> */
  }
  //

  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);

  const visibleHandler = () => {
    visible === false ? setVisible(true) : setVisible(false);
  };
  const visibleHandler1 = () => {
    visible1 === false ? setVisible1(true) : setVisible1(false);
  };
  return (
    <div>
      <div className="BodyArea">
        <h3>Manager PAGE</h3>
      </div>
      <div className="Left_Side_Nav">
        <h6>
          {" "}
          {/* to="/Employe" */}
          <Link className="link" onClick={visibleHandler}>
            Manage Employ
          </Link>
        </h6>
        {visible && (
          <div className="SubBody">
            <h6>
              <Link className="link" to="/NewEmployeeReg">
                Add Employ
              </Link>
            </h6>
            <h6>
              <Link className="link" to="/ViewEmploy">
                View Employ
              </Link>
            </h6>
          </div>
        )}
        <h6>
          <Link className="link" onClick={visibleHandler1}>
            Manage Service
          </Link>
        </h6>
        {visible1 && (
          <div className="SubBody">
            <h6>
              <Link className="link" to="/ViewService">
                View Service
              </Link>
            </h6>

            <h6>
              <Link className="link" to="/Add_Service_Price">
                Add Service and Price
              </Link>
            </h6>
          </div>
        )}
        <h6>
          <Link className="link" to="/ViewComment">
            View Comment
          </Link>
        </h6>
        <h6>
          <Link className="link" to="">
            Generate Report
          </Link>
        </h6>
        {/* <div className="Password">
          <button>
            <Link className="link" to="/Employe">
              Manage Employ
            </Link>
          </button>
        </div>
        <div className="Password">
          <button>
            <Link className="link" to="/Manage_Service">
              Manage Service
            </Link>
          </button>
        </div>
        <div className="Password">
          <button>
            <Link className="link" to="/ViewComment">
              View Comment
            </Link>
          </button>
        </div>
        <div className="Password">
          <button>View report</button>
        </div> */}
      </div>
    </div>
  );
}

export default memo (AdminGenerateReport);
