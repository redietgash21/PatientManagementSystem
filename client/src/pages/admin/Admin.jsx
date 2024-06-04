



import React , { useState, memo } from "react";

import { Outlet, Link } from "react-router-dom";
import "./PatientRecord.css";
import Login from "../../route/Login";
import { useNavigate } from "react-router-dom";
function Admin() {
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
    <div className="BodyParent">
      {sessionStorage.getItem("userId") ? (
        <div>
        
          {/* <div className="profile">
            <img
              src={profileImg}
              alt=""
              className="imge"
              //  value={profileImg}
            />
            <input name="image" type="file" id="input" accept="image/*" />
          </div> */}

          <div className="Left_Side_Nav">
            <div
              style={{
                fontSize: "22px",
                paddingTop: "10px",
                fontFamily: "fantasy",
              }}
            >
              ☰
            </div>
            <div
              className=""
              style={{
                fontSize: "30px",
                marginLeft: "10px",
                fontFamily: "initial",
              }}
            >
              <div className="Password">
                <button>
                  <Link className="link" onClick={visibleHandler}>
                    Manage Employ
                  </Link>
                </button>
              </div>

              {visible && (
                <div
                  className="SubBody"
                  style={{
                    paddingBottom: "10px",
                    fontSize: "30px",
                    marginLeft: "10px",
                    fontFamily: "initial",
                  }}
                >
                  <div style={{}} className="Password">
                    <button>
                      <Link className="link" to="/NewEmployeeReg">
                        Add Employ
                      </Link>
                    </button>
                  </div>
                  <div className="Password">
                    <button>
                      <Link className="link" to="/ViewEmploy">
                        View Employ
                      </Link>
                    </button>
                  </div>
                </div>
              )}

              <div className="Password">
                <button>
                  <Link className="link" onClick={visibleHandler1}>
                    Manage Service
                  </Link>
                </button>
              </div>

              {visible1 && (
                <div
                  className="SubBody"
                  style={{
                    paddingBottom: "20px",
                  }}
                >
                  <div className="Password">
                    <button>
                      <Link className="link" to="/ViewService">
                        View Service
                      </Link>
                    </button>
                  </div>

                  <div className="Password">
                    <button>
                      <Link className="link" to="/Add_Service_Price">
                        Add Service & Price
                      </Link>
                    </button>
                  </div>
                </div>
              )}
              <div className="Password">
                <button>
                  <Link className="link" to="/ViewComment">
                    View Comment
                  </Link>
                </button>
              </div>
              <div className="Password">
                <button>
                  <Link className="link" to="/GenerateReportForManager">
                    Generate Report
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default memo (Admin);
