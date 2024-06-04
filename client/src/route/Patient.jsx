import { useState } from "react";
import React from "react";
import "./PatientRecord.css";
import { Link } from "react-router-dom";
function Patient() {
  return (
    <div className="BodyParent">
      {sessionStorage.getItem("userId") ? (
        <div>
     
          <div>
            <div className="BodyArea">
              <h3>Patient PAGE</h3>
            </div>
            <div className="Left_Side_Nav">
              <form>
                <div className="Password">
                  <Link className="link" to="/ViewPatientHistory">
                    <button>View Medical History</button>
                  </Link>
                </div>
                <div className="Password">
                  <button>
                    {" "}
                    <Link className="link" to="/ViewDrugPriscription">
                      View medical prescription
                    </Link>
                  </button>
                </div>
                <div className="Password">
                  <Link className="link" to="/ViewAppointmnetByPatient">
                    <button>View Appointment</button>
                  </Link>
                </div>
                <div className="Password">
                  <button>
                    <Link className="link" to="/Comment">
                      Give comment
                    </Link>
                  </button>
                </div>
              </form>
            </div>
          </div>{" "}
        </div>
      ) : null}
    </div>
  );
}

export default Patient;
