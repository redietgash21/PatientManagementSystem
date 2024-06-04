





import React, { useState ,lazy,Suspense, memo} from "react";
import "../App.css";
import { Route, Routes } from "react-router-dom";
const Home=lazy(()=>import ("../pages/Home"))
const Patient =lazy(()=>import ("./Patient"))
const PatientRecord=lazy(()=>import ("./PatientRecord"))
const Doctor =lazy(()=>import ("../pages/MainBody"))
const Drug =lazy(()=>import ("./Drug"))
const Nurse =lazy(()=>import ("./Nurse"))
const RadioGrapher =lazy(()=>import ("./RadioGrapher"))
const ViewLabOrder =lazy(()=>import ("../pages/labTechnician/ViewLabOrder"))
const Employ_reg =lazy(()=>import ("../pages/HR/Employ_reg"))
const Add_drug =lazy(()=>import ("../pages/pharmasist/Add_drug"))
const Manage_Service =lazy(()=>import ("./Manage_Service"))
const Add_Service_Price =lazy(()=>import ( "../pages/admin/Add_Service_Price"))
const ViewLabResult =lazy(()=>import ("../pages/doctor/ViewLabResult"))
const Priscribe_drug=lazy(()=>import ( "../pages/doctor/diagnosisList/Priscribe_drug"))
const Comment =lazy(()=>import ("../pages/patient/Comment"))
const Appointment =lazy(()=>import ( "../pages/doctor/diagnosisList/Appointment"))
const Order_Lab =lazy(()=>import ( "./Order_Lab"))
const AboutUs =lazy(()=>import ( "../pages/AboutUs"))
const ContactUs =lazy(()=>import ( "../pages/ContactUs"))
const SelectionPageEmp_Patient =lazy(()=>import ( "./SelectionPageEmp_Patient"))
const LogInSelect =lazy(()=>import ( "../pages/LogInSelect"))
const Employe =lazy(()=>import ( "./Employe"))
const ViewEmploy =lazy(()=>import ( "../pages/HR/ViewEmploy"))
const SignUpPatient =lazy(()=>import ( "../pages/SignUpPatient"))
const MainBody =lazy(()=>import ( "../pages/MainBody"))
const LogInPatient =lazy(()=>import ( "../pages/LogInPatient"))
const Diagnosis =lazy(()=>import ( "../pages/doctor/Diagnosis"))
const DiagnosisList =lazy(()=>import ( "../pages/doctor/DiagnosisList"))
const OrderPayment =lazy(()=>import ( "./OrderPayment"))
const ViewPaymentRequests =lazy(()=>import ( "../pages/casher/ViewPaymentRequests"))
const WritePatientHistory =lazy(()=>import ( "../pages/doctor/diagnosisList/WritePatientHistory"))
const ViewPatientHistory =lazy(()=>import ( "../pages/doctor/diagnosisList/ViewPatientHistory"))
const ReferOut =lazy(()=>import ( "../pages/doctor/diagnosisList/ReferOutPatient"))
const ReferIn =lazy(()=>import ( "../pages/recordOfficer/ReferInPatient"))
const ViewAppointmnet =lazy(()=>import ( "../pages/doctor/diagnosisList/ViewAppointmnet"))
const ViewPriscriptionRequest =lazy(()=>import ( "../pages/casher/ViewPriscriptionRequest"))
const ViewDrug =lazy(()=>import ( "../pages/pharmasist/ViewDrug"))
const ViewService =lazy(()=>import ( "../pages/admin/ViewService"))
const ViewPatient =lazy(()=>import ( "../pages/recordOfficer/ViewPatient"))
const ViewLabRequest =lazy(()=>import ( "../pages/casher/ViewLabRequest"))
const LabResult =lazy(()=>import ( "../pages/labTechnician/LabResult"))
const ViewReferIn =lazy(()=>import ( "../pages/doctor/diagnosisList/ViewReferIn"))
const ViewDrugPriscription =lazy(()=>import ( "../pages/doctor/diagnosisList/ViewDrugPriscription"))
const ViewHistory =lazy(()=>import ( "../pages/doctor/diagnosisList/ViewHistory"))
const ViewComment =lazy(()=>import ( "../pages/admin/ViewComment"))
const LogOut =lazy(()=>import ( "./LogOut"))
const ChangeAccount =lazy(()=>import ( "../pages/settings/ChangeAccount"))
const GenerateReport =lazy(()=>import ( "./GenerateReport"))
const GenerateReportForCasher =lazy(()=>import ( "../pages/casher/GenerateReportForCasher"))
const GenerateReportRecOff =lazy(()=>import ( "../pages/recordOfficer/GenerateReportRecOff"))
const GenerateReportForDoctor =lazy(()=>import ( "../pages/doctor/GenerateReportForDoctor"))
const GenerateReportForLabTech =lazy(()=>import ( "../pages/labTechnician/GenerateReportForLabTech"))
const GenerateReportForManager =lazy(()=>import ( "../pages/admin/GenerateReportForManager"))
const GenerateReportForPharmasist =lazy(()=>import ( "../pages/pharmasist/GenerateReportForPharmasist"))
const AdminGenerateReport =lazy(()=>import ( "../pages/admin/AdminGenerateReport"))
const ViewReport =lazy(()=>import ( "../pages/admin/ViewReport"))


function RouterClass() {

  const [libraryHistory, setLibraryHistory] = useState([]);

  return ( 
    <> 
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="NewEmployeeReg"
            element={<Employ_reg taskType="New" />}
          />
          <Route
            path="EditEmployList"
            element={
              <Employ_reg taskType="Edit" libraryHistory={libraryHistory} />
            }
          />
          <Route
            path="RecordOfficerGenerateReport"
            element={<GenerateReportRecOff />}
          />
          <Route
            path="PharmasistGenerateReport"
            element={<GenerateReportForPharmasist />}
          />
          <Route path="GenerateReportForManager" element={<GenerateReportForManager />} />
          <Route
            path="LabTechGenerateReport"
            element={<GenerateReportForLabTech />}
          />
          <Route
            path="DoctorGenerateReport"
            element={<GenerateReportForDoctor />}
          />
          <Route
            path="CasherGenerateReport"
            element={<GenerateReportForCasher />}
          />
          <Route path="AdminGenerateReport" element={<AdminGenerateReport />} />
          <Route path="ViewReport" element={<ViewReport  />} />
          <Route path="login" element={<Home  openModalL="true" />} />
          <Route path="signupEmp" element={<Home  openModalSU="true" />} />
          <Route path="forgetPassword" element={<Home  openModalfp="true" />} />
          <Route path="verifyLogin" element={<Home  openModalva="true" />} />    
          <Route path="ChangeAccount" element={<ChangeAccount />} />
          <Route path="Doctor" element={<Doctor />} />
          <Route path="Diagnosis" element={<Diagnosis />} />
          <Route path="OrderPayment" element={<OrderPayment />} />
          <Route
            path="DiagnosisList"
            element={
              <DiagnosisList
                setLibraryHistory={setLibraryHistory}
                libraryHistory={libraryHistory}
              />
            }
          />
          <Route
            path="NewEmployeeReg"
            element={<Employ_reg taskType="New" />}
          />
          <Route
            path="EditEmployList"
            element={
              <Employ_reg taskType="Edit" libraryHistory={libraryHistory} />
            }
          />
          <Route
            path="PatientRecord"
            element={<PatientRecord taskType="New" />}
          />
          <Route
            path="EditPatientRecord"
            element={
              <PatientRecord taskType="Edit" libraryHistory={libraryHistory} />
            }
          />
          <Route path="ViewAppointmnetByDoctor" element={<ViewAppointmnet taskType="Doctor" libraryHistory={libraryHistory}/>} />
          <Route path="ViewAppointmnetByPatient" element={<ViewAppointmnet taskType="Patient"/>} />
          <Route
            path="PayBill"
            element={<OrderPayment libraryHistory={libraryHistory} />}
          />
          <Route path="ViewPatientHistory" element={<ViewPatientHistory />} />
          <Route
            path="ViewHistory"
            element={<ViewHistory libraryHistory={libraryHistory} />}
          />
          <Route
            path="ReferInPatient"
            element={<ReferIn libraryHistory={libraryHistory} />}
          />
          <Route
            path="ReferOutPatient"
            element={<ReferOut libraryHistory={libraryHistory} />}
          />
          <Route
            path="Order_Lab"
            element={<Order_Lab libraryHistory={libraryHistory} />}
          />
          <Route
            path="ViewReferIn"
            element={<ViewReferIn libraryHistory={libraryHistory} />}
          />
          <Route path="Admin" element={<Doctor />} />             
          <Route path="Add_drug" element={<Add_drug />} />
          console.log(libraryHistory);
          <Route
            path="WritePatientHistory"
            element={<WritePatientHistory libraryHistory={libraryHistory} />}
          />
          <Route
            path="ViewPatient"
            element={
              <ViewPatient
                setLibraryHistory={setLibraryHistory}
                libraryHistory={libraryHistory}
              />
                }
          />{" "}
          <Route
            path="ViewEmploy"
            element={
              <ViewEmploy
                setLibraryHistory={setLibraryHistory}
                libraryHistory={libraryHistory}
              />
            }
          />
          <Route path="Manage_Service" element={<Manage_Service />} />
          <Route path="AboutUs" element={<AboutUs />} />
          <Route
            path="SelectionPageEmp_Patient"
            element={<SelectionPageEmp_Patient />}
          />
          <Route path="ContactUs" element={<ContactUs />} />
          <Route path="Add_Service_Price" element={<Add_Service_Price />} />
          <Route path="LogInSelect" element={<LogInSelect />} />
          <Route
            path="Appointment"
            element={<Appointment libraryHistory={libraryHistory} />}
          />
          <Route path="SignUpPatient" element={<SignUpPatient />} />             
          <Route path="RecordOfficer" element={<Doctor />} />
          <Route path="PatientRecord" element={<PatientRecord />} />
          <Route path="Patient" element={<Patient />} />
          <Route path="Pharmasisit" element={<Doctor />} />       
          <Route path="Employe" element={<Employe />} />
          <Route path="ViewEmploy" element={<ViewEmploy />} />
          <Route path="ViewPaymentRequests" element={<ViewPaymentRequests />} />
          <Route path="Comment" element={<Comment />} />
          <Route
            path="Priscribe_drug"
            element={<Priscribe_drug libraryHistory={libraryHistory} />}
          />
          <Route path="Drug" element={<Drug />} />
          <Route path="Casher" element={<Doctor />} />
          <Route path="LabTechnitian" element={<Doctor />} />
          <Route path="Nurse" element={<Nurse />} />
          <Route path="RadioGrapher" element={<RadioGrapher />} />
          <Route path="LogInPatient" element={<LogInPatient />} />
          <Route path="ViewDrug" element={<ViewDrug />} />
          <Route path="ViewService" element={<ViewService />} />
          <Route
            path="ViewAllLabResult"
            element={<ViewLabResult taskType="AllPati" />}
          />
          <Route
            path="ViewLabResult"
            element={
              <ViewLabResult
                taskType="OnePati"
                libraryHistory={libraryHistory}
              />
            }
          />
          <Route
            path="ViewLabRequest"
            element={
              <ViewLabRequest
                setLibraryHistory={setLibraryHistory}
                libraryHistory={libraryHistory}
              />
            }
          />
          <Route path="ViewPatient" element={<ViewPatient />} />
          <Route
            path="LabResult"
            element={<LabResult libraryHistory={libraryHistory} />}
          />
          <Route path="LogOut" element={<LogOut />} />
          <Route
            path="ViewLabOrder"
            element={<ViewLabOrder taskType="LabTechn" />}
          />
          <Route
            path="ViewPriscriptionRequest"
            element={<ViewPriscriptionRequest />}
          />
          <Route
            path="ViewDrugPriscription"
            element={<ViewDrugPriscription />}
          />
          <Route path="ViewHistory" element={<ViewHistory />} />
          <Route path="ViewComment" element={<ViewComment />} />
          <Route path="LogInPatient" element={<LogInPatient />} />
          <Route
            path="RecordOfficerGenerateReport"
            element={<GenerateReport taskType="ForRecOff" />}
          />
          <Route
            path="CasherGenerateReport"
            element={<GenerateReport taskType="ForCasher" />}
          />
        </Routes>
      </Suspense>
    </>
  );
}
export default memo (RouterClass);
