import Axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const ViewLabResult = (props) => {
  const [dispaly, setDisplay] = useState([]);
  const [priceStatus, setPriceStatus] = useState("Not payed");
  const [error, setError] = useState("");
  const [MRN, setMRN] = useState("");
  const [payId, setPayId] = useState("");
  const ViewLab = () => {
    Axios.post("http://localhost:3001/ViewLabResult")
      .then((response) => {
        setDisplay(response.data);
        console.log(response);
      })
      .catch((err) => {
        console.log("err", error);
      });
  };
  const ViewIndLab = () => {
    Axios.post("http://localhost:3001/ViewIndividualLabResult", {
      MRN: props.libraryHistory,
    })
      .then((response) => {
        setDisplay(response.data);
        console.log(response);
      })
      .catch((err) => {
        console.log("err", error);
      });
  };

  useEffect(() => {
    console.log(
      " jvh hhhdifbav======================  " + props.libraryHistory
    );
    if (props.taskType == "OnePati") {
      ViewIndLab();
    } else if (props.taskType == "AllPati") {
      ViewLab();
    }
  }, []);
  const SendLabResult = () => {
    Axios.post("http://localhost:3001/ViewLabOrder")
      .then((response) => {
        setDisplay(response.data);
        console.log(response);
      })
      .catch((err) => {
        console.log("err", error);
      });
  };
  return (
    <div className="BodyArea">
      <h1>Lab Results for Specified Person</h1>

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
                <th>MRN </th>
                <th> Lab Tecnitian Id</th>
                <th>Patient Full name</th>
                <th>Test name</th>

                <th> Order Date</th>
                <th>Result</th>

                <th> Result Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {dispaly.map((emp) => (
                <tr>
                  <td>{emp.MRN}</td>

                  <td>{emp.labTechId}</td>
                  <td>
                    {emp.firstName} {emp.middleName} {emp.lastName}
                  </td>
                  <td>{emp.labOrder}</td>
                  <td>{emp.orderDate}</td>
                  <td>{emp.labResult}</td>
                  <td>{emp.resultDate}</td>

                  <td>
                    <button
                      onClick={() => {
                        // setMRN(pp.MRN);
                        // setLibraryHistory(emp);
                      }}
                    >
                      {" "}
                      <Link className="link" to="/LabResult">
                        Approved?
                      </Link>{" "}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};

export default ViewLabResult;
