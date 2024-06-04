




import Axios from "axios";
import { Link } from "react-router-dom";
import React, { useEffect, useState, memo } from "react";
import "../doctor/DiagnosisList.css";
import parentContext from "../../App";
const ViewLabOrder = (props) => {
  const [dispaly, setDisplay] = useState([]);
  const [labResult, setLabResult] = useState("");
  const [labId, setLabId] = useState();
  

  const viewLabOrder = () => {
    
    Axios.get("http://localhost:3001/displayLabOrder")
      .then((response) => {

        setDisplay(response.data);
    
      })
      .catch((err) => {
        console.log("err>>>>>>>>>>>>>>>>>", err);
      });
    
  };
  const viewLabResult = () => {
    
    Axios.post("http://localhost:3001/displayLabResult",{
      MRN: props.libraryHistory
    })
      .then((response) => {

        setDisplay(response.data);
    
      })
      .catch((err) => {
        console.log("err>>>>>>>>>>>>>>>>>", err);
      });
    
  };
  const getCurrentDate=(separator='-')=>{

    let newDate = new Date()
    let date=newDate.getDate();
     let    month = newDate.getMonth() + 1;
      let   year = newDate.getFullYear();
  
    return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
    }
  const sendResult=()=>{
   
    Axios.post("http://localhost:3001/sendResult",{
      labId: labId,
      labResult: labResult,
      resultDate: getCurrentDate(), 
      labTechId: sessionStorage.getItem("userId")
    })
    .then((response) => {
      // setLabId(response.data);
     
    })
    .catch((err) => {
      console.log("err==========", err);
    });
  }
  useEffect(() => {
    if(props.taskType=="LabTechn"){
    viewLabOrder();}
    else if (props.taskType=="Doctor"){
   viewLabResult();
    }
  }, []);



  return (
    <div className="BodyArea">
      <table>
        <thead>
          <tr>
            <th>MRN</th>
            <th>Full Name</th>
            <th>Age </th>
            <th>Sex</th>
            <th>Room </th>
            <th>lab order</th>
            <th>Send Lab Result</th>
          </tr>
        </thead>
        <tbody>
        {dispaly.map((pp,i) => (
            
            <tr>
               {/* {dispalyOrder.map((pp,j) => {
                  // <td>{pp}-</td>
                  console.log("dvdfvdf",pp)
               })} */}
              <td> {pp.MRN}</td>
              <td>
                {pp.firstName} {pp.middleName} {pp.lastName}
              </td>
              <td>{pp.age}</td>
              <td>{pp.sex}</td>
            
            
               <td></td>
              
             <td  >  
             {pp.labOrder}
              </td>
              
              <td hidden>{pp.labId}</td>
              <td hidden={props.taskType=="LabTechn"?false:true}>
                <input type="text" onChange={(event)=>{setLabResult(event.target.value);setLabId(pp.labId);}} ></input>
               <button onClick={sendResult}>Send</button>
                {/* {labId} */}
              </td>
              <td hidden={props.taskType=="LabTechn"?true:false}>{pp.labResult}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default memo (ViewLabOrder);