





import AboutUs from './AboutUs';
import React, {memo, useState} from 'react';
import Login from './Login';
import {Modal,Row, Col,Card, Container,Nav,Navbar,Carousel,NavDropdown , Image} from 'react-bootstrap';
import docimg from '../doctorsimage/download.jpg';
import eyasta from  '../doctorsimage/images (17).jpg'
import opendoor from  '../doctorsimage/opendoor.jpg'
import Footer from './Footer';
import VerifyLogin from './VerifyLogin';
import ForgetPassword from './ForgetPassword';
import { FaBackward } from "react-icons/fa";
import '../App.css';
import SignUPEmp from './SignUpEmp';

function Home(props) {
  const [openModalL,setOpenModalL] = useState(false);
 
return (<>
 <Container fluid>
    <Row >
      <Col>
        <Carousel>
          <Carousel.Item>
            <Image style={{width:"95%", height:"90vh", marginLeft:"2.5%"}}src="https://www.essence.com/wp-content/uploads/2020/03/GettyImages-641867112-1-1920x1080.jpg?width=1920&height=1080" thumbnail />
            <Carousel.Caption>
              <h3 className='carouselTitle'>Surgery Services</h3>
              <p className='carouselDiscription'>Our expert surgeons provide a full range of surgical 
                procedures, from general to specialized surgeries. 
                We use the latest technology and techniques to 
                ensure the best possible outcomes for our patients.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Image style={{width:"95%", height:"90vh", marginLeft:"2.5%"}}src="https://www.simplemost.com/wp-content/uploads/2020/08/AdobeStock_50872077.jpeg" thumbnail />
            <Carousel.Caption>
              <h3 className='carouselTitle'>Child Treatment Services</h3>
               <p className='carouselDiscription'>Our experienced therapists provide a range of therapies to help children overcome challenges and reach their full potential. We offer individualized treatment plans for speech and language disorders, developmental delays, 
                autism spectrum disorder, ADHD, and behavioral problems.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Image style={{width:"95%", height:"90vh",marginLeft:"2.5%"}}src="https://th.bing.com/th/id/OIP.WKJqjFYHjS8CvZmd97yeNwHaE8?pid=ImgDet&rs=1" thumbnail />
            <Carousel.Caption>
              <h3 className='carouselTitle' >Laboratory Services</h3>
              <p className='carouselDiscription' >
              Our state-of-the-art laboratory provides a comprehensive range of diagnostic tests to support patient care. Our team of experienced laboratory professionals use the latest technology and techniques to ensure accurate and timely results. We offer a wide range of tests, 
              including blood tests, urine tests, and genetic testing.
              </p>

            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Image style={{width:"95%", height:"90vh", marginLeft:"2.5%"}}src="https://stateofreform.com/wp-content/uploads/2021/01/11094.jpg" thumbnail />
            <Carousel.Caption>
              <h3 className='carouselTitle'>Healthcare Consulting Services</h3>
              <p className='carouselDiscription'>
              Our team of experienced healthcare consultants provides 
              tailored solutions to help healthcare organizations 
              improve their performance and achieve their goals. We offer a range of services, including strategic planning, operational efficiency, financial management, 
              clinical quality improvement, and patient satisfaction.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Image style={{width:"95%", height:"90vh", marginLeft:"2.5%"}}src="https://3.bp.blogspot.com/-CQhT-hx7BPE/W4odxg6XKdI/AAAAAAAAApo/uGXrbNKbcswufQbL3g1gGE-JYukOmymFQCLcBGAs/s1600/Screen_Shot_2017-08-09_at_11.21.47_AM_1024x1024.png" thumbnail />
            <Carousel.Caption>
              <h3 className='carouselTitle' > Comprehensive Healthcare Services</h3>
              <p className='carouselDiscription' >
              Our healthcare organization provides a full 
              spectrum of services to meet the diverse needs of our 
              patients. From primary care to specialty care, surgery 
              to rehabilitation, we offer a comprehensive range of 
              services to help individuals and families achieve their 
              health and wellness goals. Our team of experienced
              healthcare professionals 
              is dedicated to providing high-quality, compassionate care.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
     <Container  fluid style={{padding:"3%"}}>
        <Row style={{height:350}} >
        <AboutUs />
        </Row>
     </Container>
        <Container fluid style={{ backgroundColor:"#b3b0b0",padding:"3%"}}>
          <h3 style={{textAlign:"center"}}>OUR DOCTORS</h3>
          <Row >
            <Col >
             <Card className='mb-33' style={{ backgroundColor:"#000", color:"#FFF", marginBottom:"5%"}}>
                <Card.Img src="https://th.bing.com/th/id/OIP.w7d8bjBZ4o3ldOYPr6Vc8AHaLG?pid=ImgDet&rs=1" style={{ width:"90%"}}/>
                <Card.Body>
                  <Card.Title>Dr. Meron Alemu</Card.Title>
                  <Card.Text>Densist</Card.Text>
                </Card.Body>
             </Card>
             <Card className='mb-33' style={{ backgroundColor:"#000", color:"#FFF", marginBottom:"5%"}}>
                <Card.Img src={docimg} style={{ width:"90%"}}/>
                <Card.Body>
                  <Card.Title>Dr. Elsa Sete</Card.Title>
                  <Card.Text>Nuroligist</Card.Text>
                </Card.Body>
             </Card>
            </Col>
            <Col >
             <Card className='mb-33' style={{ backgroundColor:"#000", color:"#FFF", marginBottom:"5%"}}>
                <Card.Img src="https://jay-harold.com/wp-content/uploads/2015/12/Dollarphotoclub_74864725.jpg" style={{ width:"90%"}}/>
                <Card.Body>
                  <Card.Title>Dr. Likodimose Derse</Card.Title>
                  <Card.Text>Surgeon</Card.Text>
                </Card.Body>
             </Card>
             <Card className='mb-33' style={{ backgroundColor:"#000", color:"#FFF", marginBottom:"5%"}}>
                <Card.Img src="https://media.istockphoto.com/photos/african-american-female-doctor-holding-a-clipboard-isolated-picture-id171296819?k=20&m=171296819&s=612x612&w=0&h=qreh0jMvLaTf-32rFJ6k0Xlr2SrM7DO_ckpt_edyv4w=" style={{ width:"90%"}}/>
                <Card.Body>
                  <Card.Title>Dr. Selamwait Thsome</Card.Title>
                  <Card.Text>Laboratory technician</Card.Text>
                </Card.Body>
             </Card>
            </Col>
            <Col >
             <Card className='mb-33' style={{ backgroundColor:"#000", color:"#FFF", marginBottom:"5%"}}>
                <Card.Img src="https://www.shutterstock.com/image-photo/medicine-doctor-black-man-arms-600nw-2374000993.jpg" style={{ width:"90%"}}/>
                <Card.Body>
                  <Card.Title>Dr. Hasen Emran</Card.Title>
                  <Card.Text>Therapist</Card.Text>
                </Card.Body>
             </Card>
             <Card className='mb-33' style={{ backgroundColor:"#000", color:"#FFF", marginBottom:"5%"}}>
                <Card.Img src="https://th.bing.com/th/id/OIP.Kihf68Y6lgfeKi1prJUyEwHaE8?w=600&h=400&rs=1&pid=ImgDetMain" style={{ width:"90%"}}/>
                <Card.Body>
                  <Card.Title>Abdu Mohammed</Card.Title>
                  <Card.Text>Pharmacist</Card.Text>
                </Card.Body>
             </Card>
            </Col>
            <Col >
             <Card className='mb-33' style={{ backgroundColor:"#000", color:"#FFF", marginBottom:"5%"}}>
                <Card.Img src="https://www.youngisthan.in/wp-content/uploads/2018/09/featured-1-11.jpg" style={{ width:"90%"}}/>
                <Card.Body>
                  <Card.Title>Dr. Thomas Weldesenbet</Card.Title>
                  <Card.Text>Medical assistant</Card.Text>
                </Card.Body>
             </Card>
             <Card className='mb-33' style={{ backgroundColor:"#000", color:"#FFF", marginBottom:"5%"}}>
                <Card.Img src="https://c.stocksy.com/a/jnC700/z9/1717507.jpg" style={{ width:"90%"}}/>
                <Card.Body>
                  <Card.Title>Dr. Enatnesh Abera</Card.Title>
                  <Card.Text>Nurse</Card.Text>
                </Card.Body>
             </Card>
            </Col>
          </Row>
        </Container>

      </Col >
   
    </Row >
  
   <Row style={{backgroundColor:"black",color:"white",opacity:0.8,marginTop:5,height:300}}>
            <Col >
            <h3>Addis alem Hospital</h3>
            </Col>
          
   </Row>
 </Container>
 {props.openModalL=="true"&&(
     <Modal style={{marginTop:"7%",opacity:"1"}} size="md" show = {props.openModalL} >
       <Modal.Header style={{backgroundColor:"Blue",color:"whitesmoke",fontsize:"12px",padding:"10px"}}>
          < Modal.Title >Login<a style={{paddingLeft:"250px"}}><FaBackward /></a></Modal.Title>
       </Modal.Header>
       <Modal.Body>
         <Login  closeM={setOpenModalL}/>
       </Modal.Body>
     </Modal>
   )} 
        {props.openModalfp=="true"&&(
     <Modal style={{marginTop:"7%"}} size="md" show = {props.openModalfp} >
       <Modal.Header style={{backgroundColor:"Blue",color:"whitesmoke",fontsize:"12px",padding:"10px"}}>
          < Modal.Title >Forget password<a style={{paddingLeft:"250px"}}><FaBackward /></a></Modal.Title>
       </Modal.Header>
       <Modal.Body>
      
         <ForgetPassword  />
        
       </Modal.Body>
     </Modal>
   )} 
         {props.openModalva=="true"&&(
     <Modal style={{marginTop:"7%",opacity:"1"}} size="md" show = {props.openModalva} >
       <Modal.Header style={{backgroundColor:"Blue",color:"whitesmoke",fontsize:"12px",padding:"10px"}}>
          < Modal.Title >Verify password<a style={{paddingLeft:"250px"}}><FaBackward /></a></Modal.Title>
       </Modal.Header>
       <Modal.Body>
       
          <VerifyLogin  />
        
       </Modal.Body>
     </Modal>
   )} 
         {props.openModalSU=="true"&&(
     <Modal style={{marginTop:"3%",opacity:"1"}} size="md" show = {props.openModalSU} >
       <Modal.Header style={{backgroundColor:"Blue",color:"whitesmoke",fontsize:"12px",padding:"10px"}}>
          < Modal.Title >Sign Up<a style={{paddingLeft:"250px"}}><FaBackward /></a></Modal.Title>
       </Modal.Header>
       <Modal.Body>
       
          <SignUPEmp  />
        
       </Modal.Body>
     </Modal>
   )} 
    </>
    
);
}

export default memo (Home);
