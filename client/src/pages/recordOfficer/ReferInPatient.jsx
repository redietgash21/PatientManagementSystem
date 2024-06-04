




import Axios from "axios";
import { Link } from "react-router-dom";
import React, { useState, useEffect, memo } from "react";
const ReferInPatient = (props) => {
  const [recId, setRecId] = useState(sessionStorage.getItem("userId"));
  const [MRN, setMRN] = useState(props.libraryHistory);
  const [referedFrom, setReferedFrom] = useState("");
  const [referedBy, setReferedBy] = useState("");
  const [referedReason, setReferedReason] = useState("");
  const [datee, setDate] = useState();
  const [alert1, setalert1] = useState(false);
  const [alert2, setalert2] = useState(false);
  const ReferInPatient = () => {
    Axios.post("http://localhost:3001/ReferInPatient", {
      recId: recId,
      referedBy: referedBy,
      referedFrom: referedFrom,
      MRN: MRN,
      datee: datee,
      referedReason: referedReason,
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
  const getCurrentDate = (separator = "-") => {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${date}`;
  };
  const ValidateInput = () => {
    if (
      recId != "" &&
      referedBy != "" &&
      referedFrom != "" &&
      MRN != "" &&
      datee != "" &&
      referedReason != ""
    ) {
      ReferInPatient();
    } else {
      setalert2(true);
      setTimeout(() => {
        setalert2(false);
      }, 4000);
    }
  };
  useEffect(() => {
    setDate(getCurrentDate());
  }, []);
  return (
    <div className="BodyParent">
      {sessionStorage.getItem("userId") ? (
       
        <div>
          {" "}
          <div
            style={{ display: "flex", top: "0px", gap: "20%", margin: "10px" }}
          >
            {" "}
            {/* <img
              style={{ borderRadius: " 220px", margin: "10px" }}
              src={profileImg}
              alt=""
              className="imge"
              //  value={profileImg}
            /> */}
            <h1 style={{ fontSize: "30px", margin: "20px" }}>
              {" "}
              well come to Record officer page
            </h1>
          </div>
          
        
          
              <h3>Refer In Patient</h3>
              <div className="patientRecord">
                <form>
                  <div
                    className="FormClass"
                    style={{
                      minWidth: "500px",
                      alignContent: "center",
                      paddingLeft: "250px",
                      fontSize: "18px",
                    }}
                  >
                    <div className="LoggClass1">
                    <label for="MRN"> Date:   {datee} </label>
                      <label for="Pr_id">Record Officer Id : </label>
                      <input
                        required
                        placeholder="Record officer ID"
                        id="Pr_id"
                        name="Pr_id"
                        type="text"
                        defaultValue={sessionStorage.getItem("userId")}
                      />

                      <label for="Emp_id">MRN : </label>
                      {/* {props.libraryHistory.map((Patient) => ( */}
                      <input
                        required
                        placeholder="MRN"
                        defaultValue={MRN}
                        onChange={(event) => {
                          setMRN(event.target.value);
                        }}
                      />
                      {/* ))} */}

                      <label for="MRN">From</label>
                      <input
                        required
                        placeholder="Refer From"
                        onChange={(event) => {
                          setReferedFrom(event.target.value);
                        }}
                      />

                    
                     

                      <label for="Drug_code">Refered By:</label>
                      <input
                        id="male"
                        name="sex"
                        type="text"
                        required
                        placeholder="refer by"
                        onChange={(event) => {
                          setReferedBy(event.target.value);
                        }}
                      />
                      <label for="MRN">Refered Reason: </label>
                      <input
                        id="MRN"
                        name="MRN"
                        type="text"
                        required
                        placeholder="refer reason"
                        onChange={(event) => {
                          setReferedReason(event.target.value);
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
      ) : null}
    </div>
  );
};

export default memo (ReferInPatient);
