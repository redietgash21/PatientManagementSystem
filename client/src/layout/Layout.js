








import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState,useContext } from "react";
import { useEffect } from "react";
import logo from "../Image/logo.png";
import {RecoveryContext} from "../App"
import Axios from "axios";
import eyasta from  '../doctorsimage/images (17).jpg'
import {Row, Col, Container,Nav,Navbar,Dropdown,Button,NavDropdown , Image} from 'react-bootstrap';
import Setting from "../Image/Setting.png";
import { FaBackward } from "react-icons/fa";
import "./Layout.css";
import "../route/Setting.css";
import Login from "../pages/Login";
const Layout = (props) => {
  const {visibleLSB,setVisibleLSB}=useContext(RecoveryContext);
  const [openModal,setOpenModal] = useState(false);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const BrowserRouter = require("react-router-dom").BrowserRouter;
  const [profileImg, setProfileImg] = useState([]);
  const [userName, setuserName] = useState();
  const [office, setOffice] = useState("");
  const showHideModal = ()=>{
    setOpenModal(!openModal);
  }
  const getProfile = () => {
    Axios.post("http://localhost:3001/getProfile", {
      id: sessionStorage.getItem("userId"),
    })
      .then((response) => {
        setProfileImg(
          "http://localhost:3001/Image/" + response.data[0].imagePath
        );
        setuserName(response.data[0].userName);
        // const myList = myArray.map((item) => <p>{item}</p>);

        console.log(response);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  useEffect(() => {
    getProfile();
  }, []);
  const visibleHandler = () => {
    visible === false ? setVisible(true) : setVisible(false);
  };
  return (<>
 
    <Container style={{backgroundColor:"rgb(6, 128, 250)"}} fluid>
    {sessionStorage.getItem("userId") ? (
        <Row style={{backgroundColor:"rgb(6, 128, 250)"}}>
        <Col xs={1}>
          <Image style={{width:"100%"}}src={eyasta} thumbnail />  
        </Col>
        <Col xs={9} ><h1 className="titleHospital">Addis Alem Hospital Managment System </h1></Col>
        <Col xs={1} >
        <Image  style={{width:"100%",height:"75%"}} src={profileImg} />
        </Col>
      <Col  xs={1}>  
      <Col >
               
               
                  <Dropdown>
      <Dropdown.Toggle  id="dropdown-basic">
      &#9881;
      </Dropdown.Toggle>
     
      <Dropdown.Menu>
        <Dropdown.Item > <Button
        style={{width:"100%"}}
                        onClick={() => {
                          navigate("/");
                          sessionStorage.clear("userId");
                          sessionStorage.clear("employeeJob");
                          setVisibleLSB("")
                          window.browserHistory.pushState(null);
                          console.log("UserId delated");
                        }}
                      >
                       
                        <Link className="link" to="/">Logout
                        </Link>
                        </Button></Dropdown.Item>
        <Dropdown.Item > <Button> <Link className="link" to="/ChangeAccount">
                          Manage Account
                        </Link></Button></Dropdown.Item>
       
      </Dropdown.Menu>
     
    </Dropdown> 
           
              
   
              </Col>   
      <h1 style={{ fontSize: "20px", marginLeft: "-20px" }}>

{userName}
</h1> 
     </Col>
     
    
    </Row>
     
     ):(
    <Row style={{backgroundColor:"rgb(6, 128, 250)"}}>
      <Col xs={1}>
        <Image style={{width:"100%"}}src={logo} thumbnail />  </Col>
      <Col xs={6} ><h1 className="titleHospital" style={{color:"#fff"}}>Addis Alem Hospital Managment System</h1></Col>
      <Col  xs={5} >  
      <Navbar bg="primary" expand="lg" style={{float:"right", marginTop:"15px", marginRight:"5%"}}>
   
     
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link ><Link to="/"  style={{color:"black",textDecoration:"none"}}>Home</Link></Nav.Link>
          <Nav.Link  onClick={()=>{ setOpenModal(true)}}><Link to="/Login"  style={{color:"black",textDecoration:"none"}}>Login</Link></Nav.Link>
          <Nav.Link ><a  href="/AboutUs" style={{color:"black",textDecoration:"none"}}>About us</a></Nav.Link>
          <Nav.Link  ><Link to="/Contactus"  style={{color:"black",textDecoration:"none"}}>Contact us</Link></Nav.Link>
        </Nav>
      </Navbar.Collapse>
    
      </Navbar>
  </Col>
    </Row>
     )}
   </Container>

  </>
 
  );
};

export default Layout;
