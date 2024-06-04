






import {Container  ,Form,Modal, Col,InputGroup,Button, Nav,Navbar
  , Row,Image} from 'react-bootstrap';

import Axios from "axios";
import { useState ,useEffect , memo} from "react";
import { Link } from "react-router-dom";
const ViewService = () => {
  const [dispaly, setDisplay] = useState([]);

  const [alert2, setalert2] = useState(false);
  const [serviceType, setServiceType] = useState();
  const [error, setError] = useState("");
  const ViewAppointmnet = (serviceType) => {
    Axios.post("http://localhost:3001/ViewService", {
      serviceType: serviceType
    })
      .then((response) => {
        if (response.data.message) {
          setalert2(true);

          console.log(response.data.message);
        } else if (response.data) {
          setDisplay(response.data);

          console.log(response.data);
        } else {
          console.log("Another Error is Occured");
        }
      })
      .catch((err) => {
        console.log("err", error);
      });
  };

  useEffect(() => {
    ViewAppointmnet();
  }, []);
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);

  const visibleHandler = () => {
    visible === false ? setVisible(true) : setVisible(false);
  };
  const visibleHandler1 = () => {
    visible1 === false ? setVisible1(true) : setVisible1(false);
  };
  return (
    < >
      {sessionStorage.getItem("userId") ? (
        <Container fluid>
       
              <h1>Avalable Services In Hospital is hear...</h1>

             
                <form>
                  <select onChange={(event)=>{
                     setServiceType(event.target.value  );
                        ViewAppointmnet(event.target.value)
                  }}>
                    <option hidden></option>
                    <option >All</option>
                    <option >Card</option>
                    <option >Drug</option>
                    <option >Lab</option>
                  </select>
                  <table>
                    <thead>
                      <tr>
                        <th> Service Type</th>
                        <th>service Fees</th>
                        <th>price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dispaly.map((Patient) => (
                        <tr>
                          <td>{Patient.serviceType}</td>
                          <td>{Patient.serviceFee}</td>

                          <td>{Patient.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* {alert2 && <h1>thier is no Service List hear .....</h1>} */}
                </form>
              
            
          
          {/* </div> */}
        </Container>
      ) : null}
    </>
  );
};

export default memo (ViewService);
