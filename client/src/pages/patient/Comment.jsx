




import Axios from "axios";
import React, { useState, memo } from "react";
import { Link } from "react-router-dom";
const Comment = (props) => {
  const [MRN, setMRN] = useState(sessionStorage.getItem("userId"));
  const [department, setDepartment] = useState("");
  const [comment, setComment] = useState("");
  const [datee, setDate] = useState("");
  const [email, setEmail] = useState("");
  const [alert, setalert] = useState("");
  const [ErrorOccured, setErrorOccured] = useState();
  const giveComment = () => {
    Axios.post("http://localhost:3001/comment", {
      department: department,
      comment: comment,
      MRN: MRN,
      datee: datee,
      email: email,
    })
      .then((response) => {
        if (response.data.message) {
          // setCorrect(response.data.message);
          setalert(true);
          console.log(response.data.message);
          setTimeout(() => {
            setalert(false);
          }, 4000);
        } else {
          setErrorOccured(true);
          setTimeout(() => {
            setErrorOccured(false);
          }, 4000);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const ValidateInput = () => {
    if (
      MRN != "" &&
      department != "" &&
      comment != "" &&
      datee != "" &&
      email != ""
    ) {
      setErrorOccured(false);
      giveComment();
    } else {
      setErrorOccured(true);
      setTimeout(() => {
        setErrorOccured(false);
      }, 4000);
    }
  };
  return (
    <div className="BodyParent">
      {sessionStorage.getItem("userId") ? (
        <div>
         
          <div>
            <div className="BodyArea">
              <h3>Write your comment hear</h3>
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
                      <label for="MRN">your identification Number : </label>
                      <input
                        id="MRN"
                        name="MRN"
                        type="text"
                        required
                        defaultValue={MRN}
                        onChange={(event) => {
                          setMRN(event.target.value);
                        }}
                      />

                      <label for="comment">department </label>
                      <input
                        id="MRN"
                        name="MRN"
                        type="text"
                        required
                        onChange={(event) => {
                          setDepartment(event.target.value);
                        }}
                      />
                      <label for="comment">Email </label>
                      <input
                        id="MRN"
                        name="MRN"
                        type="text"
                        required
                        onChange={(event) => {
                          setEmail(event.target.value);
                        }}
                      />

                      <label for="comment">put your comment hear : </label>
                      <textarea
                        id="comment"
                        name="comment"
                        type="text"
                        required
                        onChange={(event) => {
                          setComment(event.target.value);
                        }}
                      />

                      <label for="comment_date">Date : </label>
                      <input
                        id="date"
                        name="date"
                        type="date"
                        required
                        onChange={(event) => {
                          setDate(event.target.value);
                        }}
                      />
                    </div>
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
                      onClick={() => {
                        ValidateInput();
                      }}
                    >
                      Add
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
                    {alert && (
                      <p
                        className="password"
                        style={{
                          // color: "red",
                          backgroundColor: "green",

                          alignContent: "center",
                        }}
                      >
                        Your Comment is Succssesfully Send...
                      </p>
                    )}
                    {ErrorOccured && (
                      <p
                        className="password"
                        style={{
                          // color: "red",
                          backgroundColor: "red",

                          alignContent: "center",
                        }}
                      >
                        Something Went Wrong Try Again...
                      </p>
                    )}{" "}
                  </div>
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

export default memo (Comment);
