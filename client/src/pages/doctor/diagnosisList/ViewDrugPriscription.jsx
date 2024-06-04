import Axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ViewDrugPriscription = (props) => {
  const [dispaly, setDisplay] = useState([]);
  const [MRN, setMRN] = useState(sessionStorage.getItem("userId"));
  const [dispense, setdispence] = useState("Dispensed");

  const [error, setError] = useState("");
  const [alert2, setalert2] = useState(false);
  const [alert1, setalert1] = useState(false);

  const ViewDrugPriscription = () => {
    Axios.post("http://localhost:3001/ViewDrugPriscription", {
      MRN: MRN,
    })

      .then((response) => {
        if (response.data.message) {
          setalert1(false);
          setalert2(true);
          console.log(response.data.message);
          setTimeout(() => {
            setalert2(false);
          }, 4000);
        } else if (response.data) {
          setalert1(true);
          setDisplay(response.data);
          console.log(response.data);
        } else {
          console.log("Another Error is Occured");
        }
      })
      .catch((err) => {
        console.log("err", error);
      });
  };
  useEffect(() => {
    ViewDrugPriscription();
  }, []);

  return (
    <div className="BodyParent">
      {sessionStorage.getItem("userId") ? (
        <div>
        
          <div>
            <div className="BodyArea">
              <h1>List of Priscription Requests </h1>

              <div className="patientRecord">
                {/* style=

th, td {
  text-align: "left",
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #D6EEEE;
}
}} */}
                <form>
                  <table>
                    <thead>
                      <tr>
                        <th>Drug Name</th>
                        <th>Quantity</th>
                        <th>Frequency</th>
                        <th>Priscription date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {alert1 &&
                        dispaly.map((drug) => (
                          <tr>
                            <td>{drug.DrugName}</td>
                            <td>{drug.Quantity}</td>
                            <td>{drug.Frequency}</td>
                            <td>{drug.PriscriptionDate}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>

                  {alert2 && (
                    <p
                      style={{
                        // color: "red",
                        backgroundColor: "red",

                        alignContent: "center",
                      }}
                    >
                      There is no any Drug Priscrption...
                    </p>
                  )}
                </form>
              </div>
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
};

export default ViewDrugPriscription;
