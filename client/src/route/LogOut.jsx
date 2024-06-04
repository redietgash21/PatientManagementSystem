import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Setting from "../Image/Setting.png";

import "./Left_nav.css";
const LogOut = (props) => {
  const [visible, setVisible] = useState(false);
  const [user, setuser] = useState(sessionStorage.getItem("userId"));

  const visibleHandler = () => {
    visible === false ? setVisible(true) : setVisible(false);
  };
  return (
    //  <div className="Container">
    //   <div className="Links"></div>
    <div className="Container">
      <div className="Links">
        <div className="" onClick={visibleHandler}>
          <div className="Logo">
            <img src={Setting} />
          </div>
        </div>
        {visible && (
          <div>
            <div className="password">
              <h6
                onClick={() => {
                  sessionStorage.clear();
                  window.location.reload();
                }}
              >
                {user}
                <Link className="link" to="/">
                  Logout
                </Link>
              </h6>
              <h6>
                <Link className="link" to="/ChangeAccount">
                  Manage Account
                </Link>
              </h6>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogOut;
