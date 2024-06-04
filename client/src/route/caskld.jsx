import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
const ViewReferIn = (props) => {
  return (
    <div className="BodyArea">
      <h1>Refered In Patient</h1>

      <div className="patientRecord">
        <form>
          <table>
            <thead>
              <tr>
                <th> Refer In Date</th>

                <th>Refer Reason</th>
              </tr>
            </thead>
            <tbody>
              {props.libraryHistory.map((Patient) => (
                <tr>
                  <td>{Patient.referInDate}</td>

                  <td>{Patient.referReason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};

export default ViewReferIn;
