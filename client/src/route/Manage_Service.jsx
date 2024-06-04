import React from "react";
import { Link } from "react-router-dom";
const Manage_Service = (props) => {
  return (
    <div className="BodyArea">
      <h3>Manage Services</h3>
      <div className="patientRecord">
        <form>
          <div className="Password">
            <button>
              <Link className="link" to="/ViewService">
                View Service
              </Link>
            </button>
          </div>
          <div className="Password">
            <button>
              <Link className="link" to="/Add_Service_Price">
                Add Service and Price
              </Link>
            </button>
          </div>

          {/* <div className="Password">
            <button>View Service Status</button>
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default Manage_Service;
