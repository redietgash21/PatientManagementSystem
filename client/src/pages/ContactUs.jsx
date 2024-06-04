




import React, {memo} from "react";

const ContactUs = (props) => {
  return (
    <div
      className="BodyArea"
      style={{
        width: "100%",
        left: "8px",
        right: "0px",
        marginLeft: "0%",
        borderRadius: "0px",
      }}
    >
      
      <div className="patientRecord">
        <div>
        <h3> Addis Alem Hospital in Bahirdar city at Atse Tewodros sub-city </h3>
        <p></p>
        <p><strong>Tel:</strong>     0999999999</p>
        <p><strong>Fax:</strong>     0999999999</p>
        <p><strong>Email:</strong>   addisalemhospital@gmail.com</p>
        </div>
       
      </div>
    </div>
  );
};

export default memo (ContactUs);
