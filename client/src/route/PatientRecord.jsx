import {Container  ,Form,Modal, Col,InputGroup,Button, Nav,Navbar
  , Row,Image} from 'react-bootstrap';
  import Axios from "axios";
import { Link } from "react-router-dom";
// import { response } from 'express';
import React, { useState, useEffect } from "react";
import "./PatientRecord.css";
function PatientRecord(props) {
  const [profileImg, setProfileImg] = useState(
    "https://th.bing.com/th/id/OIP.S171c9HYsokHyCPs9brbPwHaGP?pid=ImgDet&rs=1"
  );
  const [file, setFile] = useState();
  const [firstName, setFirstName] = useState("");
  const [MRN, setMRN] = useState(0);
  const [imgName, setImgName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [region, setRegion] = useState("");
  const [woredaOrSubcity, setWoredaOrSubcity] = useState("");
  const [ketenaOrGott, setKetenaOrGott] = useState("");
  const [kebele, setKebele] = useState();
  const [houseNumber, setHouseNumber] = useState("");
  const [gender, setGender] = useState("Male");
  const [regDate, setRegDate] = useState("");
  const [alert1, setalert1] = useState(false);
  const [alert2, setalert2] = useState(false);
  const [alert3, setalert3] = useState(false);
  const [alert4, setalert4] = useState(false);
  const [alert5, setalert5] = useState(false);
  const [alert6, setalert6] = useState(false);
  const [alert7, setalert7] = useState(false);
  const [errorOccured, setErrorOccured] = useState(false);
  const getCurrentDate = (separator = "-") => {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${date}`;
  };
  const register = () => {
    const url = "http://localhost:3001/registerPatient";
    const formData = new FormData();
    if (!file) {
      // alert("file is undefined")
      Axios.post(url, {
        imgName: "",
        MRN: MRN,
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,

        age: age,
        region: region,
        woredaOrSubcity: woredaOrSubcity,
        ketenaOrGott: ketenaOrGott,
        kebele: kebele,
        houseNumber: houseNumber,
        gender: gender,
        phoneNumber: phoneNumber,
      })
        .then((response) => {
          if (response.data.message) {
            setalert1(true);
            setTimeout(() => {
              setalert1(false);
            }, 5000);
          } else {
            setErrorOccured(true);
            setTimeout(() => {
              setErrorOccured(false);
            }, 5000);
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    } else {
      {
        formData.append("MRN", MRN);
        formData.append("firstName", firstName);
        formData.append("middleName", middleName);
        formData.append("lastName", lastName);
        formData.append("age", age);
        formData.append("phoneNumber", phoneNumber);
        formData.append("region", region);
        formData.append("woredaOrSubcity", woredaOrSubcity);
        formData.append("ketenaOrGott", ketenaOrGott);
        formData.append("kebele", kebele);
        formData.append("houseNumber", houseNumber);
        formData.append("gender", gender);
        formData.append("imgName", imgName);
        formData.append("image", file);
        formData.append("regDate", regDate);
      }
      Axios.post(url, formData).then((response) => {
        if (response.data.message) {
          setalert1(true);
          setTimeout(() => {
            setalert1(false);
          }, 5000);
        } else {
          setErrorOccured(true);
          setTimeout(() => {
            setErrorOccured(false);
          }, 5000);
        }
        console.log(response);
      });
    }
  };
  const editPatient = () => {
    const url = "http://localhost:3001/editPatientInfo";
    const formData = new FormData();
    if (!file) {
      // alert("file is undefined")
      Axios.post(url, {
        imgName: props.libraryHistory.imagePath,
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        MRN: MRN,
        age: age,
        region: region,
        woredaOrSubcity: woredaOrSubcity,
        ketenaOrGott: ketenaOrGott,
        kebele: kebele,
        houseNumber: houseNumber,
        gender: gender,
        phoneNumber: phoneNumber,
      })
        .then((response) => {
          // alert('image is sucessful...');
        })
        .catch((err) => {
          console.log("err", err);
        });
    } else {
      formData.append("image", file);
      formData.append("MRN", MRN);
      formData.append("firstName", firstName);
      formData.append("middleName", middleName);
      formData.append("lastName", lastName);
      formData.append("age", age);
      formData.append("phoneNumber", phoneNumber);
      formData.append("region", region);
      formData.append("woredaOrSubcity", woredaOrSubcity);
      formData.append("ketenaOrGott", ketenaOrGott);
      formData.append("kebele", kebele);
      formData.append("houseNumber", houseNumber);
      formData.append("gender", gender);
      formData.append("regDate", regDate);
      formData.append(
        "imgName",
        imgName == undefined ? props.libraryHistory.imagePath : imgName
      );
      Axios.post(url, formData)
        .then((response) => {
          //alert('image is sucessful...');
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  };
  const imageHandlerUI = (e) => {
    setProfileImg(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
    console.log("img: " + file);
    setImgName(e.target.files[0].name);
  };
  const getMRN = () => {
    Axios.get("http://localhost:3001/getMrnAndIncrementByOne", {})
      .then((response) => {
        if (response.data.message) {
          setMRN(response.data.message);
        } else {
          setMRN(response.data[0].MRN + 1);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const save = () => {
    if (props.taskType == "Edit") {
    
      editPatient();
    } else if (props.taskType == "New") {
     
      register();
    }
  };
  const getProfile = () => {
    Axios.post("http://localhost:3001/getProfile", {
      id: sessionStorage.getItem("userId"),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  useEffect(() => {
    setRegDate(getCurrentDate());
    getProfile();
    if (props.taskType == "Edit") {
      console.log("EditPatient...");
      console.log(props.libraryHistory.firstName);
      setFirstName(props.libraryHistory.firstName);
      setLastName(props.libraryHistory.lastName);
      setPhoneNumber(props.libraryHistory.phoneNumber);
      setAge(props.libraryHistory.age);
      setMRN(props.libraryHistory.MRN);
      setProfileImg(
        "http://localhost:3001/Image/" + props.libraryHistory.imagePath
      );
      setMiddleName(props.libraryHistory.middleName);
      setKebele(props.libraryHistory.kebele);
      setKetenaOrGott(props.libraryHistory.ketenaOrGott);
      setWoredaOrSubcity(props.libraryHistory.woredaOrSubcity);
      setHouseNumber(props.libraryHistory.houseNumber);
      setRegion(props.libraryHistory.region);
      setRegDate(props.libraryHistory.registrationDate);
      // alert("props.empinfo.employeestatus === *&^%$#@##$%^ $%$%$"+employeeStatus);
      // setFile("http://localhost:3001/Image/"+props.empInfo.imagePath);
      if (props.libraryHistory.sex == "female") setGender("female");
      else if (props.libraryHistory.sex == "Male") setGender("Male");
    } else if (props.taskType == "New") {
      getMRN();

      setPhoneNumber("");
    }
  }, []);

  const ValidateInput = () => {
    if (phoneNumber != "" && phoneNumber.length != 9) {
      setalert6(true);

      setTimeout(() => {
        setalert6(false);
      }, 4000);
    } else if (firstName == "") {
      setalert2(true);

      setTimeout(() => {
        setalert2(false);
      }, 4000);
    } else if (middleName == "") {
      setalert3(true);

      setTimeout(() => {
        setalert3(false);
      }, 4000);
    } else if (lastName == "") {
      setalert4(true);

      setTimeout(() => {
        setalert4(false);
      }, 4000);
    } else if (age == "") {
      setalert5(true);

      setTimeout(() => {
        setalert5(false);
      }, 4000);
    } else {
      save();
    }
  };
  return (
    < >
      {sessionStorage.getItem("userId") ? (
        <Container fluid>
        
              <h3 hidden={props.taskType == "New" ? false : true}>
                RECORD NEW PATIENT PAGE
              </h3>
              <div className="FormClass">
                <div className="LoggClass1">
                  <label for="MRN">Medical Record Number : </label>
                  <input
                    id="MRN"
                    name="MRN"
                    type="text"
                    value={MRN}
                    required
                    placeholder="MRN"
                    // onChange={(event) => {
                    //   setMRN(Math.floor( 1000000 + 1));
                    // }}
                  />

                  <label for="phoneNumber"> Phone Number : +251</label>
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="Number"
                    value={phoneNumber}
                  
                    placeholder="Phone Number"
                    onChange={(event) => {
                      setPhoneNumber(
                        event.target.value.replace(/[^0-9]/gi, "")
                      );
                    }}
                  />

                  <label for="Name">Name :</label>
                  <input
                    id="Name"
                    name="Name"
                    type="text"
                    value={firstName}
                    required
                    placeholder="First Name"
                    onChange={(event) => {
                      setFirstName(event.target.value.replace(/[^a-z]/gi, ""));
                    }}
                  />
                  <label for="middleName">Middle Name :</label>
                  <input
                    id="middleName"
                    name="middleName"
                    type="text"
                    value={middleName}
                    required
                    placeholder="Middle Name"
                    onChange={(event) => {
                      setMiddleName(event.target.value.replace(/[^a-z]/gi, ""));
                    }}
                  />

                  <label for="lastName"> Last Name :</label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={lastName}
                    placeholder="Last Name"
                    onChange={(event) => {
                      setLastName(event.target.value.replace(/[^a-z]/gi, ""));
                    }}
                  />
                  <div
                    className=""
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                      // height: 33px;
                      // min-width: 200px;
                      // border-radius: 8px;
                      // border: solid rgb(187, 189, 189) 0.5px;
                    }}
                  >
                    <label for="Age">Age :</label>
                    <input
                      id="Age"
                      name="Age"
                      type="text"
                      value={age}
                      maxLength={3}
                      required
                      placeholder="Age"
                      onChange={(event) => {
                        setAge(event.target.value.replace(/[^0-9]/gi, ""));
                      }}
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <label for="male"> Male :</label>
                      <input
                        style={{
                          fontsize: "10px",
                          height: "20px",
                        }}
                        id="male"
                        name="sex"
                        required
                        type="radio"
                        defaultChecked={gender == "female" ? gender : null}
                        onChange={(event) => {
                          setGender("Male");
                        }}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <label for="female">Female</label>
                      <input
                        style={{
                          fontsize: "10px",
                          height: "20px",
                        }}
                        type="radio"
                        id="female"
                        name="sex"
                        defaultChecked={gender == "Male" ? gender : null}
                        onChange={(event) => {
                          setGender("male");
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="LoggClass1">
                  <label for="adress"> Region :</label>
                  <input
                    id="regon"
                    name="region"
                    type="text"
                    value={region}
                    placeholder="Region"
                    onChange={(event) => {
                      setRegion(event.target.value);
                    }}
                  />

                  <label for="ketena"> Woreda / Subcity :</label>
                  <input
                    id="ketena"
                    name="ketena"
                    type="text"
                    value={woredaOrSubcity}
                    placeholder="Woreda"
                    onChange={(event) => {
                      setWoredaOrSubcity(event.target.value);
                    }}
                  />
                  <label for="kebele"> Ketena / Gott :</label>
                  <input
                    id="kebele"
                    name="kebele"
                    type="text"
                    value={ketenaOrGott}
                    placeholder="Ketena"
                    onChange={(event) => {
                      setKetenaOrGott(event.target.value);
                    }}
                  />
                  <label for="kebele"> Kebele :</label>
                  <input
                    id="kebele"
                    name="kebele"
                    type="text"
                    value={kebele}
                    placeholder="kebele"
                    onChange={(event) => {
                      setKebele(event.target.value);
                    }}
                  />
                  <label for="houseNumber"> House Number :</label>
                  <input
                    id="houseNumber"
                    name="houseNumber"
                    value={houseNumber}
                    type="text"
                    placeholder="House Number"
                    onChange={(event) => {
                      setHouseNumber(event.target.value);
                    }}
                  />

                  <label id="">Image: </label>
                  <img
                    src={profileImg}
                    alt=""
                    className="imge"
                    value={profileImg}
                  />
                  <input
                    name="image"
                    type="file"
                    id="input"
                    accept="image/*"
                    onChange={imageHandlerUI}
                  />
                  <label htmlFor="input" className="image-upload">
                    Choose File
                  </label>
                </div>
              </div>
              <div
                className="logReset"
                style={{
                  textAlign: "center",
                  fontSize: "20px",
                  padding: "50px",
                }}
              >
                <button
                  style={{ textAlign: "center", fontSize: "20px" }}
                  className="login"
                  onClick={ValidateInput}
                >
                  Register
                </button>
                <button
                  style={{
                    textAlign: "center",
                    fontSize: "20px",
                    backgroundColor: "red",
                  }}
                  className=" reset"
                  type="reset"
                >
                  Reset
                </button>
                {alert1 && (
                  <p
                    className="password"
                    style={{
                      fontsize: "28",
                      // color: "red",
                      backgroundColor: "green",

                      alignContent: "center",
                    }}
                  >
                    Patient Registered Successfully!!!
                  </p>
                )}
                {alert2 && (
                  <p
                    className="password"
                    style={{
                      // color: "red",
                      backgroundColor: "red",

                      alignContent: "center",
                    }}
                  >
                    Please Enter Patient First Name!!!
                  </p>
                )}
                {alert3 && (
                  <p
                    className="password"
                    style={{
                      // color: "red",
                      backgroundColor: "red",

                      alignContent: "center",
                    }}
                  >
                    Please Enter Patient Middle Name!!!
                  </p>
                )}
                {alert4 && (
                  <p
                    className="password"
                    style={{
                      // color: "red",
                      backgroundColor: "red",

                      alignContent: "center",
                    }}
                  >
                    Please Enter Patients Last Name!!!
                  </p>
                )}
                {alert5 && (
                  <p
                    className="password"
                    style={{
                      // color: "red",
                      backgroundColor: "red",

                      alignContent: "center",
                    }}
                  >
                    Please Enter Patients Age!!!
                  </p>
                )}
                {alert6 && (
                  <p
                    className="password"
                    style={{
                      // color: "red",
                      backgroundColor: "red",

                      alignContent: "center",
                    }}
                  >
                    Please Enter Correct Phone Numbe !!!
                  </p>
                )}
                {errorOccured && (
                  <p
                    className="password"
                    style={{
                      // color: "red",
                      backgroundColor: "red",

                      alignContent: "center",
                    }}
                  >
                    Wrong Inputes combination!!!
                  </p>
                )}{" "}
              </div>
              {/* </form> */}
          
       
        </Container>
      ) : null}
    </>
  );
}

export default PatientRecord;
