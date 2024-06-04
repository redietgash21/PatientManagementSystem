



import { Link } from "react-router-dom";

import Axios from "axios";
import React, { useState, memo } from "react";
const Diagnosis = (props) => {
  const [MRN, setMRN] = useState(0);
  const [recOffId, setRecOffId] = useState(0);
  const [assignedRoom, setAssignedRoom] = useState("");
  const [datee, setDate] = useState();
  const [alert1, setalert1] = useState(false);
  const [alert2, setalert2] = useState(false);
  const signIn = () => {
    Axios.post("http://localhost:3001/holdQueue", {
      recOffId: recOffId,
      assignedRoom: assignedRoom,
      MRN: MRN,
      datee: datee,
    })
      .then((response) => {
        if (response.data.message) {
          console.log("Rows Inserted Successfully");
          setalert1(true);
          setTimeout(() => {
            setalert1(false);
          }, 5000);
        } else {
          setalert2(true);
          console.log("Something went Wrong...");
          setTimeout(() => {
            setalert2(false);
          }, 4000);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const ValidateInput = () => {
    if (assignedRoom != "" && recOffId != "" && MRN != "" && datee != "") {
      signIn();
    } else {
      setalert2(true);
      setTimeout(() => {
        setalert2(false);
      }, 4000);
    }
  };
  return (
    <div className="BodyParent">
      {sessionStorage.getItem("userId") ? (
        <div className="BodyParent">
          <div className="BodyArea">
            <h3>Rcord Officer Page</h3>
          </div>
          <div className="Left_Side_Nav">
            <div className="Password">
              <button>
                <Link className="link" to="/PatientRecord">
                  Record New Patient
                </Link>
              </button>
            </div>
            <div className="Password">
              <button>
                <Link className="link" to="/ReferInPatient">
                  Record Refer In Patients
                </Link>
              </button>
            </div>
            <div className="Password">
              <button>
                <Link className="link" to="/OrderPayment">
                  Order Payment
                </Link>
              </button>
            </div>

            <div className="Password">
              <button>
                <Link className="link" to="/Diagnosis">
                  Order Diagnosis
                </Link>
              </button>
            </div>

            <div className="Password">
              <button>
                <Link className="link" to="/ViewPatient">
                  View Patient
                </Link>
              </button>
            </div>
            <div className="Password">
              <Link className="link" to="/RecordOfficerGenerateReport">
                <button>Generate Report</button>
              </Link>
            </div>
          </div>
          <div className="BodyArea">
            <h3>Order Diagnosis </h3>
            <div className="patientRecord">
              <form>
                <div
                  style={{
                    minWidth: "500px",
                    alignContent: "center",
                    paddingLeft: "250px",
                    fontSize: "18px",
                  }}
                  className="FormClass"
                >
                  <div className="LoggClass1">
                    <label for="Pr_id">Record Officer Id : </label>
                    <input
                      id="Pr_id"
                      name="Pr_id"
                      type="text"
                      required
                      placeholder="ID"
                      onChange={(event) => {
                        setRecOffId(event.target.value);
                      }}
                    />

                    <label for="Emp_id">MRN : </label>
                    <input
                      id="Emp_id"
                      name="Emp_id"
                      type="text"
                      required
                      placeholder="MRN"
                      onChange={(event) => {
                        setMRN(event.target.value);
                      }}
                    />

                    <label for="MRN">Assigned Room: </label>
                    <input
                      id="MRN"
                      name="MRN"
                      type="text"
                      required
                      placeholder="Assigned Room:"
                      onChange={(event) => {
                        setAssignedRoom(event.target.value);
                      }}
                    />

                    <label for="MRN">Diagnosis Date: </label>
                    <input
                      id="MRN"
                      name="MRN"
                      type="date"
                      required
                      placeholder=" Date:"
                      onChange={(event) => {
                        setDate(event.target.value);
                      }}
                    />
                  </div>{" "}
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
                    onClick={ValidateInput}
                  >
                    Register
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
                  {alert1 && <h5>Registered Succssusfully...</h5>}
                  {alert2 && (
                    <p
                      className="password"
                      style={{
                        // color: "red",
                        backgroundColor: "red",

                        alignContent: "center",
                      }}
                    >
                      Please fill nessessary information...
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default memo (Diagnosis);
