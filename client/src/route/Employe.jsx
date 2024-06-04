import React from "react";
import { Link } from "react-router-dom";
const Employe = (props) => {
  return (
    <div className="BodyArea">
      <div className="patientRecord">
        <form>
          <div className="Password">
            <button>
             
              <Link className="link" to="/Employ_reg">
                Add Employ
              </Link>
            </button>
          </div>
          <div className="Password">
            <button>
              <Link className="link" to="/ViewEmploy">
                View Employ
              </Link>
            </button>
          </div>
          <div className="Password">
            <button>
              <Link className="link" to="">
                Update Employ
              </Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Employe;
