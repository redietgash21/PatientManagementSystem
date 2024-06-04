import Axios from "axios";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import React, { useState } from "react";
const OrderPayment = (props) => {
  const [MRN, setMRN] = useState(props.libraryHistory);
  const [casherId, setCasherId] = useState(0);
  const [serviceFee, setServiceFee] = useState("");
  const [AssignedRoom, setAssignedRoom] = useState();
  const [alert1, setalert1] = useState(false);
  const [alert2, setalert2] = useState(false);
  const [dispaly, setDisplay] = useState([]);
  const [price, setPrice] = useState(0);
  const [recOffId, setRecOffId] = useState();
  const getCurrentDate = (separator = "-") => {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${date}`;
  };
  const payBill = () => {
    Axios.post("http://localhost:3001/payBill", {
      recOffId: sessionStorage.getItem("userId"),
      serviceFee: serviceFee,
      price: price,
      MRN: MRN,
      datee: getCurrentDate(),
      AssignedRoom: AssignedRoom,
      priceStatus: "Not payed",
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
  const selectPrice = () => {
    Axios.post("http://localhost:3001/selectPrice", {
      serviceFee: serviceFee,
    })
      .then((response) => {
        setPrice(response.data[0].price);
        console.log("====", response.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const services = () => {
    Axios.get("http://localhost:3001/displayService", {}).then((response) => {
      setDisplay(response.data);
      //   console.log("=========================", response.data);
    });
  };
  useEffect(() => {
    services();
  }, []);
  const ValidateInput = () => {
    if (
   
      serviceFee != "" &&
      price != "" &&
      MRN != "" &&
      AssignedRoom != ""
    ) {
      payBill();
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
       
              <h3>Pay Bill</h3>
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
                      <label for="MRN"> Date : {getCurrentDate()}</label>

                      <label for="Pr_id">Record officer : </label>
                      <input id="Pr_id" name="Pr_id" defaultValue={sessionStorage.getItem("userId")} />
                      <label for="Emp_id">MRN : </label>
                      <input
                        id="Emp_id"
                        name="Emp_id"
                        type="text"
                        defaultValue={MRN}
                        required
                        placeholder="MRN "
                      />

                      <label for="MRN">Service Fee</label>
                      <select
                        name="cars"
                        id="cars"
                        required
                        onChange={(event) => {
                          setServiceFee(event.target.value);
                        }}
                        onClick={selectPrice}
                      >
                        <option hidden></option>
                        {dispaly.map((pp) => (
                          <option value={pp.serviceFee}>{pp.serviceFee}</option>
                        ))}
                      </select>

                      <label for="Drug_code">Price </label>
                      <input
                        id="male"
                        name="sex"
                        type="number"
                        Value={price}
                        required
                        placeholder="Price"
                       
                      />

                      <label for="AssRoom">Assigned Room(OPD) </label>
                      <input
                        id="AssRoom"
                        name="AssRoom"
                        type="text"
                        required
                        placeholder="Assigned Room"
                        onChange={(event) => {
                          setAssignedRoom(event.target.value);
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
                    {" "}
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

export default OrderPayment;
