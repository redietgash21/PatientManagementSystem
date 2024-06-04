  {/* <Navbar bg="primary" expand="lg" style={{float:"right"}}>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link ><Link to="/"  style={{color:"black"}}>Home</Link></Nav.Link>
                  <Nav.Link to="/ContactUs" >Contact us</Nav.Link>
                </Nav>
              </Navbar.Collapse>
           </Navbar> */}
           
           <Row style={{width:"100%"}}>
              <NavDropdown title="Manage Employ" id="basic-nav-dropdown">
                <NavDropdown.Item> 
                  <Link className="link" to="/NewEmployeeReg">   
                    Add Employ                 
                  </Link>
                </NavDropdown.Item>




                //  <div
    //   className="BodyArea"
    //   style={{
    //     width: "100%",
    //     left: "8px",
    //     right: "0px",
    //     marginLeft: "0%",
    //     borderRadius: "0px",
    //   }}
    // >
    //   <h3> Create Account for Employ </h3>
    //   <div className="patientRecord">
    //     <div className="siggnn">
          
    //       <div className="LoggClass">
    //         <div className="LoggClass1">
    //           <label for="ID">ID :</label>
    //           <input
    //             id="ID"
    //             name="ID"
    //             type="number"
    //             placeholder="Identification Number"
    //             required
    //             onChange={(event) => {
    //               setID(event.target.value);
    //             }}
    //           />

    //           <div className="Password">
    //             <label for="userName">User Name:</label>
    //             <input
    //               id="userName"
    //               name="userNamee"
    //               type="text"
    //               placeholder="User Name"
    //               required
    //               onChange={(event) => {
    //                 setUserName(event.target.value);
    //               }}
    //             />
    //           </div>
    //           <div className="Password">
    //             <label for="password">PassWord:</label>
    //             <input
    //               id="password"
    //               name="password"
    //               type="password"
    //               placeholder="Password"
    //               required
    //               onChange={(event) => {
    //                 setPasswordd(event.target.value);
    //               }}
    //             />
    //           </div>
    //           <div className="Password">
    //             <label for="confirm password">Confirm Password :</label>
    //             <input
    //               id="password"
    //               name="password"
    //               type="password"
    //               placeholder="Confirm Password"
    //               required
    //               onChange={(event) => {
    //                 setConfirm(event.target.value);
    //               }}
    //             />
    //           </div>
    //         </div>
    //       </div>
    //       <div
    //         className="LoginReset"
    //         style={{
    //           textAlign: "center",
    //           fontSize: "20px",
    //           paddingTop: "50px",
    //           paddingBottom: "10px",
    //         }}
    //       >
    //         <button
    //           style={{
    //             fontSize: "21px",
    //             alignContent: "center",
    //           }}
    //           className="login"
    //           onClick={handleConfirm}
    //         >
    //           Create Account
    //         </button>
    //         <button
    //           style={{
    //             textAlign: "center",
    //             fontSize: "20px",
    //             backgroundColor: "red",
    //           }}
    //           className=" reset"
    //           type="reset"
    //         >
    //           Reset
    //         </button>
    //       </div>
    //       {alertFive && (
    //         <p
    //           className="password"
    //           style={{
                
    //             backgroundColor: "red",

    //             alignContent: "center",
    //           }}
    //         >
    //           The Length of Your Password is too Short...!!!
    //         </p>
    //       )}{" "}
    //       {alertFour && (
    //         <p
    //           className="password"
    //           style={{
                
    //             backgroundColor: "red",

    //             alignContent: "center",
    //           }}
    //         >
    //           The UserName Should be more than 5 Character...!!!
    //         </p>
    //       )}{" "}
    //       {alertThree && (
    //         <p
    //           className="password"
    //           style={{
              
    //             backgroundColor: "red",

    //             alignContent: "center",
    //           }}
    //         >
    //           You Have Already An Account!!!
    //         </p>
    //       )}
    //       {alertTwo && (
    //         <p
    //           className="password"
    //           style={{
                
    //             backgroundColor: "red",

    //             alignContent: "center",
    //           }}
    //         >
    //           Id Not Found!!!
    //         </p>
    //       )}
    //       {alertOne && (
    //         <p
    //           className="password"
    //           style={{
                
    //             backgroundColor: "red",

    //             alignContent: "center",
    //           }}
    //         >
    //           User Name Repeated!!!
    //         </p>
    //       )}
    //       {alert1 && (
    //         <p
    //           className="password"
    //           style={{
                
    //             backgroundColor: "green",

    //             alignContent: "center",
    //           }}
    //         >
    //           Account Created Successfully!!!
    //         </p>
    //       )}
    //       {alert2 && (
    //         <p
    //           className="password"
    //           style={{
                
    //             backgroundColor: "red",

    //             alignContent: "center",
    //           }}
    //         >
    //           Please Enter Your Identification Number!!!
    //         </p>
    //       )}
    //       {alert3 && (
    //         <p
    //           className="password"
    //           style={{
               
    //             backgroundColor: "red",

    //             alignContent: "center",
    //           }}
    //         >
    //           Please Enter Your UserName As you Want!!!
    //         </p>
    //       )}
    //       {alert4 && (
    //         <div>
    //           <p
    //             className="password"
    //             style={{
                  
    //               backgroundColor: "red",

    //               alignContent: "center",
    //             }}
    //           >
    //             The Length of Username is too Short!!!
    //           </p>{" "}
    //           <p
    //             className="password"
    //             style={{
                 

    //               alignContent: "center",
    //             }}
    //           >
    //             Please Enter At Least Six Characters!!!
    //           </p>
    //         </div>
    //       )}{" "}
    //       {alert5 && (
    //         <p
    //           className="password"
    //           style={{
               
    //             backgroundColor: "red",

    //             alignContent: "center",
    //           }}
    //         >
    //           Please Enter Your Password As you Want!!!
    //         </p>
    //       )}{" "}
    //       {alert6 && (
    //         <div>
    //           <p
    //             className="password"
    //             style={{
                  
    //               backgroundColor: "red",

    //               alignContent: "center",
    //             }}
    //           >
    //             The Length of Password is too Short!!!
    //           </p>{" "}
    //           <p
    //             className="password"
    //             style={{
                 

    //               alignContent: "center",
    //             }}
    //           >
    //             Please Enter At Least Six Characters!!!
    //           </p>
    //         </div>
    //       )}{" "}
    //       {alert9 && (
    //         <div>
    //           <p
    //             className="password"
    //             style={{
                  
    //               backgroundColor: "red",

    //               alignContent: "center",
    //             }}
    //           >
    //             The Length of Username is too Long!!!
    //           </p>{" "}
    //         </div>
    //       )}{" "}
    //       {alert10 && (
    //         <div>
    //           <p
    //             className="password"
    //             style={{
                 
    //               backgroundColor: "red",

    //               alignContent: "center",
    //             }}
    //           >
    //             The Length of Password is too Long!!!
    //           </p>{" "}
    //         </div>
    //       )}{" "}
    //       {alert7 && (
    //         <p
    //           className="password"
    //           style={{
                
    //             backgroundColor: "red",

    //             alignContent: "center",
    //           }}
    //         >
    //           Please Enter Your Confirmation Password As you Want!!!
    //         </p>
    //       )}{" "}
    //       {alert8 && (
    //         <p
    //           className="password"
    //           style={{
                
    //             backgroundColor: "red",

    //             alignContent: "center",
    //           }}
    //         >
    //           Password and Confirmation Password should be the same!!!
    //         </p>
    //       )}{" "}
    //       {errorOccured && (
    //         <p
    //           className="password"
    //           style={{
                
    //             backgroundColor: "red",

    //             alignContent: "center",
    //           }}
    //         >
    //           Wrong ID/ UserName/ and Password/ combination!!!
    //         </p>
    //       )}
          
    //     </div>
    //   </div>
    // </div>