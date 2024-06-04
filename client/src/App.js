





import React, { useState ,createContext} from "react";
import "./App.css";

import Layout from "./layout/Layout";
import RouterClass from "./route/RouterClass";
import SideBar from "./layout/SideBar";
import {Col, Row} from 'react-bootstrap';
export const RecoveryContext=createContext();

function App() {
  const [visibleLSB, setVisibleLSB] = useState("false");
  const [correct, setCorrect] = useState("");
  const [email,setEmail]=useState('')
  const [otp,setOtp]=useState('')
  return (
   <>  
      <RecoveryContext.Provider 
        value={{ otp,         setOtp,
                  email,       setEmail,
                  correct,     setCorrect,
                  visibleLSB,  setVisibleLSB
              }} >
          <Layout />
          { sessionStorage.getItem("employeeJob")==null&&
            <div >
              <RouterClass/>
            </div>
          }
          {sessionStorage.getItem("employeeJob")!=null&&
            <div >
              {visibleLSB=="false"&&
                <Row>
                  <Col xs="auto" >
                    <SideBar/>
                  </Col>
                  <Col xs={11} >
                    <RouterClass/>
                  </Col>
                </Row>   
              }  
              {visibleLSB=="true"&&
                <Row>
                  <Col>
                    <SideBar/>
                  </Col>
                  <Col xs={9} style={{padding:"15px",}}>
                    <RouterClass/>
                  </Col>
                </Row>   
              }        
            </div>
          }
      </RecoveryContext.Provider>
    </>
  
  );
}
export default App;
 

