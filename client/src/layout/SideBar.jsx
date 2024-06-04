






import React from "react";
import { useEffect, useState,useContext } from "react";
import Axios from "axios";
import {  FaUsers, FaLock, FaUserAlt,FaBackspace,FaBars,FaFileAlt,FaCaretDown,FaCaretRight,
  FaBriefcaseMedical,FaEnvelopeOpenText,
  FaUndo,FaUndoAlt } from "react-icons/fa";
import "../route/PatientRecord.css";
import   "./Sidebar.css"
import "../App.css";
import {RecoveryContext} from "../App"
import { Link,NavLink, } from "react-router-dom";
import {Container  ,Form,Modal, Col,InputGroup,Button, Nav,Navbar
  , Row,Image,NavDropdown, NavItem} from 'react-bootstrap';
import { FaAccessibleIcon } from "react-icons/fa";
function SideBar({children}) {
  const[isOpen,setIsOpen]=useState(false);
  const toggle=()=>{setIsOpen(!isOpen);}
  const {visibleLSB,setVisibleLSB}=useContext(RecoveryContext);
  const [visibleME,setVisibleME]=useState("false");
  const [visibleMS,setVisibleMS]=useState("false");
  const [profileImg, setProfileImg] = useState([]);
  const [office, setOffice] = useState("");
  const [manageEmp, setManageEmp] = useState(false);
  const [manageS, setManageS] = useState(false);
//   const  menuItem=[
//     {
//       path:"kk",
//       name:"Manage Employee",
//       icon:<FaUsers/>
//    },
//     {
//      path:"nj",
//      name:"Manage Service",
//      icon:<FaBriefcaseMedical/>
//   },
//   {
//     path:"ViewComment",
//     name:"View Comment",
//     icon:<FaEnvelopeOpenText/>
//  },
//  {
//   path:"ny",
//   name:"Generate Report",
//   icon:<FaFileAlt/>
// },

// ]
  return (
<> 
    <div >
      <div className="container"style={{marginLeft:visibleLSB=="true"?"-25px":"-25px"}} >
        <div className="sidebar" style={{width:visibleLSB=="true"?"100%":"50px"}}>
          
          <div className="topSection">
            <h1 style={{display:visibleLSB=="true"?"block":"none"}} className="logo">Menu</h1>
       
          <div className="bars" style={{marginLeft:visibleLSB=="true"?"60%":"0px"}}>
          <FaBars onClick={()=>{visibleLSB=="false"?setVisibleLSB("true"):setVisibleLSB("false")}}/> 
          </div>
        </div>
        {sessionStorage.getItem("employeeJob")=="Manager"&&
      <div>
       <div className={manageEmp?"fam":""}>
        <Link  className="link" onClick={()=>{setManageEmp(!manageEmp);setManageS(false)}}>
          <div className="icon">
          <FaUsers/>
          </div>
          <div className="linkText" style={{display:visibleLSB=="true"?"block":"none"}}>
         ManageEmploye {manageEmp?<FaCaretDown/>:<FaCaretRight />}
          </div>
        </Link>
        <NavLink to="NewEmployeeReg" hidden={manageEmp?false:true} className="link child" activeclassName="active">
          <div className="icon">
         
          </div>
          <div className="linkText" style={{display:visibleLSB=="true"?"block":"none"}}>
         Add Employee 
          </div>
       
        </NavLink>
        <NavLink to="ViewEmploy" hidden={manageEmp?false:true} className="link child" activeclassName="active">
          <div className="icon">
         
          </div>
          <div className="linkText" style={{display:visibleLSB=="true"?"block":"none"}}>
         View Employee 
          </div>
       
        </NavLink>
        </div>
        <div className={manageS?"fam":""}>
        <Link  className="link" onClick={()=>{setManageS(!manageS);setManageEmp(false)}}>
          <div className="icon">
          <FaBriefcaseMedical/>
          </div>
          <div className="linkText" style={{display:visibleLSB=="true"?"block":"none"}}>
         ManageService {manageS?<FaCaretDown/>:<FaCaretRight />}
          </div>
       
        </Link>
        <NavLink to="Add_Service_Price" hidden={manageS?false:true}className="link child" activeclassName="active">
          <div className="icon">
         
          </div>
          <div className="linkText" style={{display:visibleLSB=="true"?"block":"none"}}>
         Add Service & Price 
          </div>
       
        </NavLink>
        <NavLink to="ViewService"  hidden={manageS?false:true} className="link child" activeclassName="active">
          <div className="icon">
         
          </div>
          <div className="linkText" style={{display:visibleLSB=="true"?"block":"none"}}>
         View Service 
          </div>
       
        </NavLink>
        </div>
        <NavLink to="ViewComment" className="link" activeclassName="active">
          <div className="icon">
          <FaEnvelopeOpenText/>
          </div>
          <div className="linkText" style={{display:visibleLSB=="true"?"block":"none"}}>
        View Comment
          </div>
       
        </NavLink>
        <NavLink to="GenerateReportForManager" className="link" activeclassName="active">
          <div className="icon">
          <FaFileAlt/>
          </div>
          <div className="linkText" style={{display:visibleLSB=="true"?"block":"none"}}>
       Generate Report
          </div>
       
        </NavLink>
        </div>}
        {sessionStorage.getItem("employeeJob")=="Casher"&&
      <div>
     
        <NavLink to="ViewPaymentRequests" className="link" activeclassName="active">
          <div className="icon">
          <FaEnvelopeOpenText/>
          </div>
          <div className="linkText" style={{display:visibleLSB=="true"?"block":"none"}}>
          View Payment Requests
          </div>
       
        </NavLink>
        <NavLink to="CasherGenerateReport" className="link" activeclassName="active">
          <div className="icon">
          <FaFileAlt/>
          </div>
          <div className="linkText" style={{display:visibleLSB=="true"?"block":"none"}}>
       Generate Report
          </div>
       
        </NavLink>
        </div>}
        {sessionStorage.getItem("employeeJob")=="Record Officer"&&
      <div>
     
        <NavLink to="PatientRecord" className="link" activeclassName="active">
          <div className="icon">
          <FaEnvelopeOpenText/>
          </div>
          <div className="linkText" style={{display:visibleLSB=="true"?"block":"none"}}>
       Record New Pataient
          </div>
       
        </NavLink>
        <NavLink to="ViewPatient" className="link" activeclassName="active">
          <div className="icon">
          <FaFileAlt/>
          </div>
          <div className="linkText" style={{display:visibleLSB=="true"?"block":"none"}}>
       View Patient
          </div>
       
        </NavLink>
        <div className={manageEmp?"fam":""}>
        <Link  className="link" onClick={()=>{setManageEmp(!manageEmp);setManageS(false)}}>
          <div className="icon">
          <FaFileAlt/>
          </div>
          <div className="linkText" style={{display:visibleLSB=="true"?"block":"none"}}>
         Generate Report {manageEmp?<FaCaretDown/>:<FaCaretRight />}
          </div>
        </Link>
        <NavLink to="RecordOfficerGenerateReport" hidden={manageEmp?false:true} className="link child" activeclassName="active">
          <div className="icon">
         
          </div>
          <div className="linkText" style={{display:visibleLSB=="true"?"block":"none"}}>
         Design Report
          </div>
       
        </NavLink>
        <NavLink to="ViewReport" hidden={manageEmp?false:true} className="link child" activeclassName="active">
          <div className="icon">
          
          </div>
          <div className="linkText" style={{display:visibleLSB=="true"?"block":"none"}}>
       View Report
          </div>
       
        </NavLink>
        </div>
      
        </div>}
        {sessionStorage.getItem("employeeJob")=="Pharmacist"&&
      <div>
       <div className={manageEmp?"fam":""}>
        <Link  className="link" onClick={()=>{setManageEmp(!manageEmp);setManageS(false)}}>
          <div className="icon">
          <FaUsers/>
          </div>
          <div className="linkText" style={{display:visibleLSB=="true"?"block":"none"}}>
         ManageDrug {manageEmp?<FaCaretDown/>:<FaCaretRight />}
          </div>
        </Link>
        <NavLink to="Add_drug" hidden={manageEmp?false:true} className="link child" activeclassName="active">
          <div className="icon">
         
          </div>
          <div className="linkText" style={{display:visibleLSB=="true"?"block":"none"}}>
         Add Drug 
          </div>
       
        </NavLink>
        <NavLink to="ViewDrug" hidden={manageEmp?false:true} className="link child" activeclassName="active">
          <div className="icon">
         
          </div>
          <div className="linkText" style={{display:visibleLSB=="true"?"block":"none"}}>
         View Drug
          </div>
       
        </NavLink>
        </div>
      
        <NavLink to="ViewPriscriptionRequest" hidden={manageS?false:true}className="link child" activeclassName="active">
          <div className="icon">
         
          </div>
          <div className="linkText" style={{display:visibleLSB=="true"?"block":"none"}}>
        View Priscription
          </div>
       
        </NavLink>
        
        <NavLink to="PharmasistGenerateReport" className="link" activeclassName="active">
          <div className="icon">
          <FaFileAlt/>
          </div>
          <div className="linkText" style={{display:visibleLSB=="true"?"block":"none"}}>
       Generate Report
          </div>
       
        </NavLink>
        </div>}
        {sessionStorage.getItem("employeeJob")=="Lab Technician"&&
      <div>
     
        <NavLink to="ViewLabRequest" className="link" activeclassName="active">
          <div className="icon">
          <FaEnvelopeOpenText/>
          </div>
          <div className="linkText" style={{display:visibleLSB=="true"?"block":"none"}}>
       View Lab Order
          </div>
       
        </NavLink>
        
        <NavLink to="LabTechGenerateReport" className="link" activeclassName="active">
          <div className="icon">
          <FaFileAlt/>
          </div>
          <div className="linkText" style={{display:visibleLSB=="true"?"block":"none"}}>
       Generate Report
          </div>
       
        </NavLink>
        </div>}
        {sessionStorage.getItem("employeeJob")=="Doctor"&&
      <div>
     
        <NavLink to="DiagnosisList" className="link" activeclassName="active">
          <div className="icon">
          <FaEnvelopeOpenText/>
          </div>
          <div className="linkText" style={{display:visibleLSB=="true"?"block":"none"}}>
       Diagnosis List
          </div>
       
        </NavLink>
        <NavLink to="ViewAllLabResult" className="link" activeclassName="active">
          <div className="icon">
          <FaFileAlt/>
          </div>
          <div className="linkText" style={{display:visibleLSB=="true"?"block":"none"}}>
       View Lab Result
          </div>
       
        </NavLink>
        <NavLink to="DoctorGenerateReport" className="link" activeclassName="active">
          <div className="icon">
          <FaFileAlt/>
          </div>
          <div className="linkText" style={{display:visibleLSB=="true"?"block":"none"}}>
       Generate Report
          </div>
       
        </NavLink>
        </div>}



      </div>
      
      </div>
     
   
    
    
    </div>

    </>
  );
}

export default SideBar;
