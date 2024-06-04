



import Axios from "axios";
import React, { memo ,useState } from "react";
import {Container  } from 'react-bootstrap';
import "../../layout/Sidebar.css"
const Add_Service_Price = (props) => {
  const [service, setService] = useState("");
  const [price, setPrice] = useState(0);
  const [ServiceType, setServiceType] = useState("Card");
  const [alert, setalert] = useState("");
  const [ErrorOccured, setErrorOccured] = useState();
  const add = () => {
    Axios.post("http://localhost:3001/registerService", {
      service: service,
      price: price,
      ServiceType: ServiceType,
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
    if (service != "" && price != "") {
      add();
      setalert(true);

      setTimeout(() => {
        setalert(false);
      }, 4000);
    } else {
      setErrorOccured(true);
      setTimeout(() => {
        setErrorOccured(false);
      }, 4000);
    }
  };
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);

  const visibleHandler = () => {
    visible === false ? setVisible(true) : setVisible(false);
  };
  const visibleHandler1 = () => {
    visible1 === false ? setVisible1(true) : setVisible1(false);
  };
  return (
    <>
      {sessionStorage.getItem("userId") ? (
        <div className="ddddddd">
        
              <h3>Add service and price page</h3>
           
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
                      <label for="Service_Name">Service ff Name :</label>
                      <input
                        id="Service_Name"
                        name="Service_Name"
                        required
                        type="text"
                        onChange={(event) => {
                          setService(event.target.value);
                        }}
                      />
                      
                      <label for="Service_Measurment">
                        Service Measurment :
                      </label>
                      <select
                        onChange={(event) => {
                          setServiceType(event.target.value);
                        }}
                      >
                        <option> Card </option>
                        <option> Lab </option>
                        <option> Drug </option>
                      </select>
                      {ServiceType}
                      <label for="Service_Price">Service Price :</label>
                      <input
                        id="Service_Price"
                        name="Service_Price"
                        required
                        type="number"
                        onChange={(event) => {
                          setPrice(event.target.value);
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
                    {alert && (
                      <p
                        className="password"
                        style={{
                          // color: "red",
                          backgroundColor: "green",

                          alignContent: "center",
                        }}
                      >
                        Your Service is Succssesfully registered...
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
                    )}
                  </div>
                </form>
             
            
        </div>
      ) : null}
    </>
  );
};

export default memo (Add_Service_Price);
