import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./PatientRecord.css";
function Drug() {
 
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
       
          <div style={{ display: "flex", top: "0px" }}>
            <div className="BodyArea">
              <h3>Drug Store PAGE</h3>
            </div>
            
            <div className="Left_Side_Nav">
              <div
                style={{
                  fontSize: "30px",
                  paddingTop: "10px",
                  fontFamily: "fantasy",
                }}
              >
                Menu
              </div>
              <div
                className=""
                style={{
                  fontSize: "30px",
                  marginLeft: "10px",
                  fontFamily: "initial",
                }}
              >
                {" "}
                <div className="Password">
                  <Link className="link" to="/ViewPriscriptionRequest">
                    <button>View medical priscription</button>
                  </Link>
                </div>
                <div
                  className=""
                  style={{
                    fontSize: "30px",
                    marginLeft: "10px",
                    fontFamily: "initial",
                  }}
                >
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
                          Manage Drug
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
                            <Link className="link" to="/Add_drug">
                              Add Drug
                            </Link>
                          </button>
                        </div>
                        <div className="Password">
                          <button>
                            <Link className="link" to="/ViewDrug">
                              View Drug
                            </Link>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="Password">
                  <button>
                    <Link className="link" to="/PharmasistGenerateReport">
                      Generate Report
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div> </div>
        
      ) : null}
    </div>
  );
}

export default Drug;
