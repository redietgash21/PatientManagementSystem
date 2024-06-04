import Axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
const ViewPatientHistory = () => {
  const [dispaly, setDisplay] = useState([]);
  const [alert, setalert] = useState(false);

  const [MRN, setMRN] = useState(sessionStorage.getItem("userId"));
  const [error, setError] = useState("");
  const viewPatientHistory = () => {
    Axios.post("http://localhost:3001/ViewPatientHistory", { MRN: MRN })
      .then((response) => {
        if (response.data) {
          setDisplay(response.data);
          console.log(response.data);
        } else {
          setalert(true);
          console.log(response.data.message);
          setTimeout(() => {
            setalert(false);
          }, 4000);
        }
      })
      .catch((err) => {
        console.log("err", error);
      });
  };

  useEffect(() => {
    viewPatientHistory();
  }, []);

  return (
    <div className="BodyParent">
      {sessionStorage.getItem("userId") ? (
        <div>
          
          <div>
            <div className="BodyParent">
              {sessionStorage.getItem("userId") ? (
                <div>
                  <div
                    style={{
                      display: "flex",
                      top: "0px",
                      gap: "20%",
                      margin: "10px",
                    }}
                  >
                    {" "}
                    {/* <img
              style={{ borderRadius: " 220px", margin: "10px" }}
              src={profileImg}
              alt=""
              className="imge"
              //  value={profileImg}
            /> */}
                    
                  </div>
                  <div>
                    <div className="BodyArea">
                      <h1>Your Medical History is hear...</h1>

                      <div className="patientRecord">
                        <form>
                          <table>
                            <thead>
                              <tr>
                                <th> History Date</th>
                                <th>MRN</th>
                                <th>Doctor Id</th>
                                <th>Descrption</th>
                              </tr>
                            </thead>
                            <tbody>
                              {dispaly.map((Patient) => (
                                <tr>
                                  <td>{Patient.historyDate}</td>
                                  <td>{Patient.MRN}</td>
                                  <td>{Patient.docId}</td>
                                  <td>{Patient.descriptionn}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
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
           
          </div>{" "}
        </div>
      ) : null}
    </div>
  );
};

export default ViewPatientHistory;
