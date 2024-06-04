






import React, { useState, useEffect, memo } from "react";
import Button from "../../components/Button"
import Label from "../../components/Labels/Label"
import LabelHidden from "../../components/Labels/LabelHidden"
import Select from "../../components/Selects/Select"
import Axios from "axios";
import {Container} from 'react-bootstrap';
import "./Employ_reg.css";
import InputNumberRequired from "../../components/Inputs/InputNumberRequired";
import InputText from "../../components/Inputs/InputText";
import InputNumber from "../../components/Inputs/InputNumber";
import InputReadOnly from "../../components/Inputs/InputReadOnly";
import InputTextRequired from "../../components/Inputs/InputTextRequired";
import InputTextHidden from "../../components/Inputs/InputTextHidden";
import InputTextHiddenNot from "../../components/Inputs/InputTextHiddenNot";
import LabelHiddenNot from "../../components/Labels/LabelHiddenNot";
import SelectHiddenNot from "../../components/Selects/SelectHiddenNot";
function Employ_reg(props) {
  const [profileImg, setProfileImg] = useState(
    "https://th.bing.com/th/id/OIP.S171c9HYsokHyCPs9brbPwHaGP?pid=ImgDet&rs=1"
  );
  const [file, setFile] = useState();
  const [firstName, setFirstName] = useState("");
  const [id, setId] = useState(0);
  const [imgName, setImgName] = useState("");
  const [middleName, setMiddleName] = useState("");
   const [lastName,setLastName] = useState("");
  const [age, setAge] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [region, setRegion] = useState("");
  const [woredaOrSubcity, setWoredaOrSubcity] = useState("");
  const [ketenaOrGott, setKetenaOrGott] = useState("");
  const [kebele, setKebele] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [job, setJob] = useState("Doctor");
  const [specializedIn, setSpecializedIn] = useState("");
  const [gender, setGender] = useState("Male");
  const [OfficeNumber, setOfficeNumber] = useState("");
  const [regDate, setRegDate] = useState("");

  const [alert1, setalert1] = useState(false);
  const [alert2, setalert2] = useState(false);
  const [alert3, setalert3] = useState(false);
  const [alert4, setalert4] = useState(false);
  const [alert5, setalert5] = useState(false);
  const [alert6, setalert6] = useState(false);
  const [alert7, setalert7] = useState(false);
  const [alert8, setalert8] = useState(false);
  const [alert9, setalert9] = useState(false);
  const [alert111, setalert111] = useState(false);
  const [alert11, setalert11] = useState(false);
  const [alert12, setalert12] = useState(false);
  const [alert13, setalert13] = useState(false);
  const [alert14, setalert14] = useState(false);
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
    const url = "http://localhost:3001/registerEmployee";
    const formData = new FormData();
    formData.append("id", id);
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
    formData.append("specializedIn", specializedIn);
    formData.append("gender", gender);
    formData.append("imgName", imgName);
    formData.append("image", file);
    formData.append("job", job);
    formData.append("OfficeNumber", OfficeNumber);
    formData.append("regDate", regDate);
    Axios.post(url, formData).then((response) => {
      if (response.data) {
        // setCorrect(response.data.message);
        setalert1(true);
        console.log("Employ Successfully Registerd");
        setTimeout(() => {
          setalert1(false);
        }, 4000);
      } else {
        setalert1(true);
        console.log("Employ Successfully Registerd");
        setTimeout(() => {
          setalert1(false);
        }, 4000);
      }
      setErrorOccured(true);
      console.log(response.errorOccured);
      setTimeout(() => {
        setErrorOccured(false);
      }, 4000);
    });
  };

  const editEmployee = () => {
    const url = "http://localhost:3001/editEmployeeInfo";
    const formData = new FormData();
    if (!file) {
      // alert("file is undefined")
      Axios.post(url, {
        imgName: props.libraryHistory.imagePath,
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        id: id,
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
      formData.append("id", id);
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
      formData.append("specializedIn", specializedIn);
      formData.append("gender", gender);
      formData.append("job", job);
      formData.append("OfficeNumber", OfficeNumber);
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
  const getEmpId = () => {
    Axios.get("http://localhost:3001/getEmpIdAndIncrementByOne", {})
      .then((response) => {
        if (response.data.message) {
          setId(response.data.message);
        } else {
          setId(response.data[0].id + 1);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const save = () => {
    if (props.taskType == "Edit") {
      alert("edit");
      editEmployee();
    } else if (props.taskType == "New") {
      alert("register Sucesfully");
      register();
    } else {
      alert("null");
    }
    console.log("============****************", props.taskType);
  };
  useEffect(() => {
    setRegDate(getCurrentDate());
    if (props.taskType == "Edit") {
      setFirstName(props.libraryHistory.firstName);
      setLastName(props.libraryHistory.lastName);
      setPhoneNumber(props.libraryHistory.phoneNumber);
      setAge(props.libraryHistory.age);
      setId(props.libraryHistory.id);
      setProfileImg(
        "http://localhost:3001/Image/" + props.libraryHistory.imagePath
      );
      setMiddleName(props.libraryHistory.middleName);
      setKebele(props.libraryHistory.kebele);
      setKetenaOrGott(props.libraryHistory.ketenaOrGott);
      setWoredaOrSubcity(props.libraryHistory.woredaOrSubcity);
      setHouseNumber(props.libraryHistory.houseNumber);
      setRegion(props.libraryHistory.region);
      setSpecializedIn(props.libraryHistory.specializedIn);
      setJob(props.libraryHistory.job);
      setOfficeNumber(props.libraryHistory.office);
      // alert(
      //   "props.empinfo.employeestatus === *&^%$#@##$%^ $%$%$" + employeeStatus
      // );
      // setFile("http://localhost:3001/Image/" + props.empInfo.imagePath);
      if (props.libraryHistory.sex == "female") setGender("female");
      else if (props.libraryHistory.sex == "Male") setGender("Male");
    } else if (props.taskType == "New") {
      getEmpId();

      setPhoneNumber("");
    }
    setRegDate(getCurrentDate());
  }, []);
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);

  const visibleHandler = () => {
    visible === false ? setVisible(true) : setVisible(false);
  };
  const visibleHandler1 = () => {
    visible1 === false ? setVisible1(true) : setVisible1(false);
  };
  const ValidateInput = () => {
    if (age == "") {
      setalert1(true);

      setTimeout(() => {
        setalert1(false);
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
    } else if (job == "") {
      setalert5(true);

      setTimeout(() => {
        setalert5(false);
      }, 4000);
    } else if (OfficeNumber == "") {
      setalert6(true);

      setTimeout(() => {
        setalert6(false);
      }, 4000);
    } else if (region == "") {
      setalert7(true);

      setTimeout(() => {
        setalert7(false);
      }, 4000);
    } else if (woredaOrSubcity == "") {
      setalert8(true);

      setTimeout(() => {
        setalert8(false);
      }, 4000);
    } else if (ketenaOrGott == "") {
      setalert9(true);

      setTimeout(() => {
        setalert9(false);
      }, 4000);
    } else if (kebele == "") {
      setalert111(true);

      setTimeout(() => {
        setalert111(false);
      }, 4000);
    } else if (houseNumber == "") {
      setalert11(true);

      setTimeout(() => {
        setalert11(false);
      }, 4000);
    } else if (phoneNumber == "") {
      setalert12(true);

      setTimeout(() => {
        setalert12(false);
      }, 4000);
    } 
    // else if (phoneNumber != "" && phoneNumber.length != 8) {
    //   setalert14(true);

    //   setTimeout(() => {
    //     setalert14(false);
    //   }, 4000);
    // } 
    else if (imgName == "" || profileImg=="") {
      setalert13(true);

      setTimeout(() => {
        setalert13(false);
      }, 4000);
    } else {
      save();
    }
  };


  return (
    <div className="BodyParent">
      {sessionStorage.getItem("userId") ? (
        <Container fluid>
          {" "}
         
          
              <h3>Employ mangment</h3>
              {/* <form onSubmit={createUser}>
                <input type="text" placeholder="firstname"/>
                <input type="text" placeholder="lastname"/>
                <input type="submit" />
              </form> */}
                <form >
                  <div className="FormClass">
                    <div className="LoggClass1">
                      <Label text="Employ identification Number :"/>
                      <InputReadOnly data={id} />

                      <Label text="Age :"/>
                      <InputNumberRequired data={age} setData={setAge}/>

                      <Label text="First Name :"/>
                      <InputTextRequired data={firstName} setData={setFirstName}/>

                      <Label text="Middle Name :"/>
                      <InputTextRequired data={middleName} setData={setMiddleName}/>

                      <Label text="Last Name :"/>
                      <InputTextRequired data={lastName} setData={setLastName}/>

                    
                      
                      <div
                        className=""
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "2px",
                        
                        }}
                      >

                      
                        <label for="sex"> Sex : </label>
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
                            type="radio"
                            defaultChecked={gender}
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
                            onChange={(event) => {
                              setGender("Female");
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="LoggClass1">
                    <Label text="Job :"/>
                      <Select data={job} setData={setJob} />
                 

                      <LabelHiddenNot hide={job}  text="Specialized In :"/>
                      <InputTextHiddenNot hide={job} data={specializedIn} setData={setSpecializedIn}/>
                     
                      <Label  text="OfficeNumber :"/>
                      <SelectHiddenNot hide={job} data={OfficeNumber} setData={setOfficeNumber}/>
                      <InputTextHidden hide={job} data={OfficeNumber} setData={setOfficeNumber}/>

                      <Label text="Region :"/>
                      <InputTextRequired data={region} setData={setRegion}/>

                      <Label text="woreda / Subcity :"/>
                      <InputTextRequired data={woredaOrSubcity} setData={setWoredaOrSubcity}/>

                      <Label text="ketena / Gott :"/>
                      <InputTextRequired data={ketenaOrGott} setData={setKetenaOrGott}/>
                      
                      <Label text="Kebele :"/>
                      <InputTextRequired data={kebele} setData={setKebele}/>
                      
                    </div>
                    
                    <div className="LoggClass1">

                      <Label text="House Number :"/>
                      <InputTextRequired data={houseNumber} setData={setHouseNumber}/>

                      <Label text="Phone Number :"/>
                      <InputNumberRequired data={phoneNumber} setData={setPhoneNumber}/>

                      <Label text="Image :"/>
                      <InputTextRequired data={kebele} setData={setKebele}/>

                      <Label text="Kebele :"/>
                      <InputTextRequired data={kebele} setData={setKebele}/>
                      
                     
                      <label id="">Image: </label>
                      <img src={profileImg} alt="" value={profileImg} />
                      <input
                        name="image"
                        type="file"
                        id="input"
                        required
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
                    {/* <Button value="Register"/> */}
                  
                    {alert1 && (
                      <p
                        className="password"
                        style={{
                         
                          backgroundColor: "red",

                          alignContent: "center",
                        }}
                      >
                        Please Enter Age!!!
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
                        Please Enter Employ's First Name!!!
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
                        Please Enter Employ's Middle Name!!!
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
                        Please Enter Employ's Last Name!!!
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
                        Please Select Employ's Job!!!
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
                        Please Enter Correct Office Number !!!
                      </p>
                    )}
                    {alert7 && (
                      <p
                        className="password"
                        style={{
                          // color: "red",
                          backgroundColor: "red",

                          alignContent: "center",
                        }}
                      >
                        Please Enter Employ's address Region or City !!!
                      </p>
                    )}
                    {alert8 && (
                      <p
                        className="password"
                        style={{
                          // color: "red",
                          backgroundColor: "red",

                          alignContent: "center",
                        }}
                      >
                        Please Enter Employ's Woreda or Subcity !!!
                      </p>
                    )}
                    {alert9 && (
                      <p
                        className="password"
                        style={{
                          // color: "red",
                          backgroundColor: "red",

                          alignContent: "center",
                        }}
                      >
                        Please Enter Employ's Ketena or Gott !!!
                      </p>
                    )}
                    {alert111 && (
                      <p
                        className="password"
                        style={{
                          // color: "red",
                          backgroundColor: "red",

                          alignContent: "center",
                        }}
                      >
                        Please Enter Employ's kebele !!!
                      </p>
                    )}
                    {alert11 && (
                      <p
                        className="password"
                        style={{
                          // color: "red",
                          backgroundColor: "red",

                          alignContent: "center",
                        }}
                      >
                        Please Enter Employ's House Number !!!
                      </p>
                    )}{" "}
                    {alert12 && (
                      <p
                        className="password"
                        style={{
                          // color: "red",
                          backgroundColor: "red",

                          alignContent: "center",
                        }}
                      >
                        Please Enter Employ's Phone Mumber !!!
                      </p>
                    )}
                    {alert13 && (
                      <p
                        className="password"
                        style={{
                          // color: "red",
                          backgroundColor: "red",

                          alignContent: "center",
                        }}
                      >
                        Employ's Photo is Neccessary !!!
                      </p>
                    )}
                    {alert14 && (
                      <p
                        className="password"
                        style={{
                          // color: "red",
                          backgroundColor: "red",

                          alignContent: "center",
                        }}
                      >
                        Invalid Phone Number... Please Enter The Valid Phone
                        Number !!!
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
                </form>
              
         
      
            {/* </div> */}
         
        </Container>
      ) : null}
    </div>
  );
}

export default memo (Employ_reg);
