



const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cookeParser = require("cookie-parser");
const session = require("express-session");
const multer = require("multer");
const mysql = require("mysql2");
const cors = require("cors");
const fs = require("fs");
const bcrypt=require("bcrypt")
const { Console } = require("console");
// const{encrypt,decrypt}=require("./encryptionHandler")
app.use(
  cors(
  //   {
  //   origin: ["http://localhost:3000"],
  //   methods: ["GET", "POST"],
  //   credentials: true,
  // }
  )
);
app.use("/Image", express.static(path.join(__dirname, "Image")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    key: "userId",
    secret: "becareful",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);
app.use(express.json());
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "PFH#23kgrw9",
  database: "PMS",
});
db.connect((err) => {
  if (err) console.log("Error while connecting to database: ", err);
  else console.log("Server is running...");
});
app.post("/signUp", (req, res) => {
  // console.log("========",req.body,"===========")
  const userName = req.body.userName;
  const passwordd = req.body.passwordd;
  const id = req.body.id;
  const where = req.body.where;
  const table = req.body.table;
  
 bcrypt.hash(passwordd,10).then((hashedPassword)=>{
  let signUp = `update ${table} set userName='${userName}',
   passwordd='${hashedPassword}' where ${where} = '${id}'`;
  db.query(signUp, [table, userName,hashedPassword, id, where], (err, result) => {
    if (err) {
      res.send({ message: "wrong user input combination !! " });
      console.log(err);
      console.log(id, "   ", passwordd);
    } else if (result) {
      console.log(signUp, " rows inserted");

      res.send(result);
    } else {
      res.send("Wrong Id vale");
      res.send({ message: "wrong user name/ password combination !! " });
      console.log("wrong ID/ user name/ password combination !!");
      console.log("signUp", signUp);
    }
  });
 })
  
 
});
// app.post("/signUp", (req, res) => {
//   // console.log("========",req.body,"===========")
//   const userName = req.body.userName;
//   const passwordd = req.body.passwordd;
//   const id = req.body.id;
//   const where = req.body.where;
//   const table = req.body.table;
//   const hashedPasword= bcrypt(passwordd);
//   let signUp = `update ${table} set userName='${userName}', passwordd='${hashedPasword.password}', iv='${hashedPasword.iv} where ${where} = '${id}'`;
//   db.query(signUp, [table, userName,hashedPasword.password, id, where], (err, result) => {
//     if (err) {
//       res.send({ message: "wrong user input combination !! " });
//       console.log(err);
//       console.log(id, "   ", passwordd);
//     } else if (result) {
//       console.log(signUp, " rows inserted");

//       res.send(result);
//     } else {
//       res.send("Wrong Id vale");
//       res.send({ message: "wrong user name/ password combination !! " });
//       console.log("wrong ID/ user name/ password combination !!");
//       console.log("signUp", signUp);
//     }
//   });
// });
var uploadEmpImg = multer({ dest: path.join(__dirname, "Image/temp/") });
var type = uploadEmpImg.single("image");
//edit Patient...
var type2 = uploadEmpImg.single("image");
app.post("/editPatientInfo", type2, (req, res) => {
  const MRN = req.body.MRN;

  const firstName = req.body.firstName;
  const middleName = req.body.middleName;
  const lastName = req.body.lastName;
  const age = req.body.age;
  const phoneNumber = req.body.phoneNumber;
  const gender = req.body.gender;
  const region = req.body.region;
  const wos = req.body.woredaOrSubcity;
  const kog = req.body.ketenaOrGott;
  const kebele = req.body.kebele;
  const houseNumber = req.body.houseNumber;
  const imgName = req.body.imgName;

  if (req.file) {
    var tmp_path = req.file.path;

    console.log(tmp_path);
    var target_path = path.join(__dirname, "Image/") + req.file.originalname;
    var src = fs.createReadStream(tmp_path);
    var dest = fs.createWriteStream(target_path);
    src.pipe(dest);

    //remove temp files
    const directory = path.join(__dirname, "Image/temp/");
    fs.readdir(directory, (err, files) => {
      if (err) throw err;
      for (const file of files) {
        fs.unlink(path.join(directory, file), (err) => {
          if (err) throw err;
        });
      }
    });
  }

  let editPatient = `update patient set firstName='${firstName}', middleName='${middleName}', lastName='${lastName}', age='${age}', sex='${gender}', imagePath='${imgName}', phoneNumber='${phoneNumber}', region='${region}', woredaOrSubcity='${wos}', ketenaOrGott='${kog}', kebele='${kebele}', houseNumber='${houseNumber}' where MRN = ${MRN}`;
  db.query(
    editPatient,
    [
      firstName,
      middleName,
      lastName,
      phoneNumber,
      imgName,
      age,
      gender,
      region,
      wos,
      houseNumber,
      kog,
      kebele,
      MRN,
    ],
    (err, result) => {
      if (err) {
        console.log("err:  ", err);
      } else {
        console.log(" edit patient");
        // res.send({message:"Success"});
      }
    }
  );
});
//register patient
app.post("/registerPatient", type, (req, res) => {
  const MRN = req.body.MRN;
  const firstName = req.body.firstName;
  const middleName = req.body.middleName;
  const lastName = req.body.lastName;
  const age = req.body.age;
  const phoneNumber = req.body.phoneNumber;
  const gender = req.body.gender;
  const region = req.body.region;
  const wos = req.body.woredaOrSubcity;
  const kog = req.body.ketenaOrGott;
  const kebele = req.body.kebele;
  const houseNumber = req.body.houseNumber;
  const imgName = req.body.imgName;
  const registrationDate = req.body.regDate;
  var tmp_path = req.file.path;

  console.log(tmp_path);
  var target_path = path.join(__dirname, "Image/") + req.file.originalname;
  var src = fs.createReadStream(tmp_path);
  var dest = fs.createWriteStream(target_path);
  src.pipe(dest);

  //remove temp files
  const directory = path.join(__dirname, "Image/temp/");
  fs.readdir(directory, (err, files) => {
    if (err) throw err;
    for (const file of files) {
      fs.unlink(path.join(directory, file), (err) => {
        if (err) throw err;
      });
    }
  });
  const registerPatient = `insert into patient  (MRN ,firstName ,middleName ,lastName ,age ,sex , imagePath ,phoneNumber ,region ,woredaOrSubcity  ,ketenaOrGott  ,kebele  ,houseNumber,registrationDate) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
  db.query(
    registerPatient,
    [
      MRN,
      firstName,
      middleName,
      lastName,
      age,
      gender,
      imgName,
      phoneNumber,
      region,
      wos,
      kog,
      kebele,
      houseNumber,
      registrationDate,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(
          registerPatient,
          " MRN  = ",
          firstName,
          " firstname  = ",
          imgName,
          "regDate",
          registrationDate
        );
        // res.send("values inserted");
      }
    }
  );
});

//gey mrn
app.get("/getMrnAndIncrementByOne", (req, res) => {
  const IncrMRN = `select MRN from patient order by MRN  desc;`;
  db.query(IncrMRN, (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result.length > 0) {
      res.send(result);

      console.log(result);
    } else {
      res.send({ message: "100001" });
      console.log("MRN IS EQUAL TO 100001");
    }
  });
});
app.get("/getEmpIdAndIncrementByOne", (req, res) => {
  const IncrId = `select id from employee order by id  desc;`;
  db.query(IncrId, (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result.length > 0) {
      res.send(result);

      console.log(result);
    } else {
      res.send({ message: "10001" });
      console.log("Emp ID IS EQUAL TO 10001");
    }
  });
});

//register employee
app.post("/registerEmployee", type, (req, res) => {
  // to recieve data from client side (user interface )
  const id = req.body.id;
  const firstName = req.body.firstName;
  const middleName = req.body.middleName;
  const lastName = req.body.lastName;
  const age = req.body.age;
  const region = req.body.region;
  const wos = req.body.woredaOrSubcity;
  const kog = req.body.ketenaOrGott;
  const kebele = req.body.kebele;
  const houseNumber = req.body.houseNumber;
  const phoneNumber = req.body.phoneNumber;
  const gender = req.body.gender;
  const job = req.body.job;
  const office = req.body.OfficeNumber;
  const specializedIn = req.body.specializedIn;
  const imgName = req.body.imgName;

  var tmp_path = req.file.path;

  console.log(tmp_path);
  var target_path = path.join(__dirname, "Image/") + req.file.originalname;
  var src = fs.createReadStream(tmp_path);
  var dest = fs.createWriteStream(target_path);
  src.pipe(dest);

  //remove temp files
  const directory = path.join(__dirname, "Image/temp/");
  fs.readdir(directory, (err, files) => {
    if (err) throw err;
    for (const file of files) {
      fs.unlink(path.join(directory, file), (err) => {
        if (err) throw err;
      });
    }
  });
  // MySQL command to insert in to table employee in database

  const registerEmployee =
    "insert into employee (id,firstName,middleName,lastName,imagePath,age, phoneNumber,region,woredaOrSubcity ,ketenaOrGott ,kebele ,houseNumber ,specializedIn ,employeeStatus,job,sex,office) values(?,?,?,?,?,?,?,?,?,?,?,?,?,'active',?,?,?)";
  db.query(
    registerEmployee,
    [
      id,
      firstName,
      middleName,
      lastName,
      imgName,
      age,
      phoneNumber,
      region,
      wos,
      kog,
      kebele,
      houseNumber,
      specializedIn,
      job,
      gender,
      office,
    ],
    (err, result) => {
      if (err) {
        res.send({ message: "wrong Values !! " });
        console.log(err);
        res.send(err);
        console.log("Values are not inserted in");
      } else if (result) {
        res.send(result);

        console.log("Values are inserted in");
      } else {
        res.send({ message: "wrong Values !! " });
        console.log("wrong Values !!");
        console.log("registerEmployee", registerEmployee);
      }
    }
  );
});

app.post("/addDrug", (req, res) => {
  const drugName = req.body.drugName;
  const drugCode = req.body.drugCode;
  const drugType = req.body.drugType;
  const drugFrequency = req.body.drugFrequency;
  const manufacturePlace = req.body.manufacturePlace;
  const drugAmount = req.body.drugAmount;
  const drugStrength = req.body.drugStrength;
  const expireDate = req.body.expireDate;
  const manufactureDate = req.body.manufactureDate;
  const drugDosage = req.body.drugDosage;
  let addDrug =
    "INSERT INTO drug(drugCode,drugName,drugAmount,drugDosage,drugFrequency  ,drugType,drugStrength,expireDate,manufactureDate,manufacturePlace ) VALUES(?,?,?,?,?,?,?,?,?,?)";
  db.query(
    addDrug,
    [
      drugCode,
      drugName,
      drugAmount,
      drugDosage,
      drugFrequency,
      drugType,
      drugStrength,
      expireDate,
      manufactureDate,
      manufacturePlace,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Drug is Registered");
        res.send("values inserted");
      }
    }
  );
});

//Order Payment
app.post("/payBill", (req, res) => {
  const casherId = req.body.casherId;
  const serviceFee = req.body.serviceFee;
  const MRN = req.body.MRN;
  const datee = req.body.datee;
  const price = req.body.price;
  const AssignedRoom = req.body.AssignedRoom;
  const priceStatus = req.body.priceStatus;
  let payBill =
    "INSERT INTO payment (MRN  ,casherId ,sFee ,price , paymentDate, priceStatus,assignedRoom ) VALUES(?,?,?,?,?,?,?)";
  db.query(
    payBill,
    [MRN, casherId, serviceFee, price, datee, priceStatus, AssignedRoom],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result.affectedRows, " rows inserted");
        console.log(" free");
        res.send("values inserted");
      }
    }
  );
});
//fetch casher
app.post("/payBill", (req, res) => {
  const casherId = req.body.casherId;
  const empl = `SELECT * FROM payment where casherId ="${casherId}"`;
  db.query(empl, [casherId], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log("casherId", casherId);
    }
  });
});
//hold Queue
app.post("/holdQueue", (req, res) => {
  const recOffId = req.body.recOffId;
  const assignedRoom = req.body.assignedRoom;
  const MRN = req.body.MRN;
  const datee = req.body.datee;
  let holdQueue =
    "INSERT INTO diagnosis(recOffId ,MRN,assignedRoom ,diagnosisDate ) VALUES(?,?,?,?)";
  db.query(holdQueue, [recOffId, MRN, assignedRoom, datee], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result.affectedRows, " rows inserted");
      console.log(" HOLD QUEUE ");
      res.send("values inserted");
    }
  });
});
// view payment History
app.get("/displayPaymentRequest", (req, res) => {
  // console.log("serial numbetr"+req.body.serialNumber);
  const serialNumber = req.body.serialNumber;
  const scan=`select s.*, pay.*, p.* from payment pay join patient p on p.MRN=pay.MRN join 
  servicelist s on s.serviceFee=pay.sFee where pay.priceStatus="Not payed";`;
  // const scan = `select s.*, pay.*, p.* from payment pay join patient p on p.MRN=pay.MRN join servicelist s on s.id=pay.sFee where pay.priceStatus="Not payed"`;
  db.query(scan, (err, result) => {
    console.log("scanQuery : ");
    if (err) {
      console.log(err);
    } else {
      console.log();
      //scan,serialNumber," Laptop serial number");
      res.send(result);
    }
  });
});
app.post("/payed", (req, res) => {
  // console.log("========",req.body,"===========")
  const priceStatus = req.body.priceStatus;
  const payId = req.body.payId;
  let signIn = `update payment set priceStatus='${priceStatus}' where payId = ${payId}`;

  db.query(signIn, [priceStatus, payId], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(signIn, " payed");
      res.send("values inserted");
    }
  });
});
app.post("/updateToatalDrug", (req, res) => {
  // console.log("========",req.body,"===========")
  const drugAmount = req.body.drugAmount;
  const drugName = req.body.drugName;

  let signIn = `update drug set drugAmount='${drugAmount}' where drugName = "${drugName}"`;

  db.query(signIn, [drugAmount, drugName], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(signIn);
      console.log(" ==========UPDATE THE TOTAL DRUG===========================");
      res.send("values inserted");
    }
  });
});
app.post("/displayOrderPatient", (req, res) => {
  // console.log("serial numbetr"+req.body.serialNumber);
  const office = req.body.office;
  const scan = `select pay.*, p.* from payment pay join patient p on p.MRN=pay.MRN where pay.priceStatus="Payed" and pay.diagnosisStatus="new" and pay.assignedRoom='${office}'`;
  db.query(scan, [office], (err, result) => {
    console.log("scanQuery : ", scan);
    if (err) {
      console.log(err);
    } else {
      console.log();
      //scan,serialNumber," Laptop serial number");
      res.send(result);
    }
  });
});

app.get("/displayPateint", (req, res) => {
  const getDrugID = `select * from patient order by MRN desc`;
  db.query(getDrugID, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);

      console.log(result, "all patients displayed");
    }
  });
});

app.get("/displayEmploy", (req, res) => {
  const getDrugID = `select * from Employee order by id desc`;
  db.query(getDrugID, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);

      console.log(result, "all patients displayed");
    }
  });
});
app.get("/ViewDrug", (req, res) => {
  const getDrugID = `select * from Drug order by drugName `;
  db.query(getDrugID, (err, result) => {
    if (err) {
      res.send(err);
      console.log(err);
    } else {
      res.send(result);

      console.log( "all Drugs are displayed");
    }
  });
});
app.post("/WritePatientHistory", (req, res) => {
  console.log("hello patient");
  const docId = req.body.docId;
  const descriptionn = req.body.descriptionn;
  const MRN = req.body.MRN;
  const historyDate = req.body.historyDate;
  let payBill =
    "INSERT INTO patientHistory (MRN  ,docId ,descriptionn, historyDate) VALUES(?,?,?,?)";
  db.query(payBill, [MRN, docId, descriptionn, historyDate], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result.affectedRows, " rows inserted");
      console.log(" free");
      res.send("values inserted");
    }
  });
});
app.post("/ViewHistory", (req, res) => {
  console.log("hello");
  const MRN = req.body.MRN;
  const PATIENT = `SELECT * FROM patientHistory where MRN =${MRN}`;
  db.query(PATIENT, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      //scan,serialNumber," Laptop serial number");
      res.send(result);
      console.log(result);
      console.log(MRN);
    }
  });
});
// View Individual Patient History
app.post("/ViewPatientHistory", (req, res) => {
  console.log("hello");
  const MRN = req.body.MRN;
  const PATIENT = `SELECT * FROM patientHistory where MRN =${MRN}`;
  db.query(PATIENT, [MRN], (err, result) => {
    if (err) {
      console.log(err);
    } else if (result.length > 0) {
      //scan,serialNumber," Laptop serial number");
      res.send(result);
      console.log(result);
      console.log(MRN);
    } else {
      //scan,serialNumber," Laptop serial number");

      res.send({ message: "You have no any Record History yet " });
      console.log(MRN);
      console.log("You have no any Record History yet ");
    }
  });
});

// Drug Priscription
app.post("/Priscription", (req, res) => {
  // console.log(req.body.DoctorID);
  const MRN = req.body.MRN;
  const DoctorID = req.body.DoctorID;
  const Diseases_description = req.body.Diseases_description;

  const Drug_quantity = req.body.servDrug_quantityice;
  const Drug_name = req.body.Drug_name;
  const Drug_frequency = req.body.Drug_frequency;
  const Prscribe_date = req.body.Prscribe_date;
  const DispenseStatus = req.body.DispenseStatus;

  const addPriscrption = `INSERT INTO priscription (MRN,DoctorId,PriscriptionDate,DrugName
    ,Quantity,Frequency,descriptionn,DispenseStatus,priceStatus) VALUES(?,?,?,?,?,?,?,?,'Not payed')`;
  db.query(
    addPriscrption,
    [
      MRN,
      DoctorID,
      Prscribe_date,
      Drug_name,
      Drug_quantity,
      Drug_frequency,
      Diseases_description,
      DispenseStatus,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result.affectedRows, " rows inserted");
        console.log(result);
        res.send("values inserted");
      }
    }
  );
});

// view Drug Priscription  ...Patient...
app.post("/ViewDrugPriscription", (req, res) => {
  // console.log("serial numbetr"+req.body.serialNumber);
  const MRN = req.body.MRN;
  const scan = `select * from priscription where DispenseStatus="Not Dispensed" and MRN=${MRN}`;
  db.query(scan, (err, result) => {
    console.log("scanQuery : ", scan);
    if (err) {
      console.log(err);
    } else if (result.length > 0) {
      //scan,serialNumber," Laptop serial number");
      res.send(result);
      console.log(result);
      console.log(MRN);
    } else {
      //scan,serialNumber," Laptop serial number");

      res.send({ message: "You have no any Priscription yet " });
      console.log(MRN);
      console.log("You have no anyPriscription yet ");
    }
  });
});


app.post("/selctTotalDrug", (req, res) => {
  // console.log("serial numbetr"+req.body.serialNumber);
  const DrugName = req.body.DrugName;
  const scan = `select drugAmount from drug where drugname='${DrugName}';`;
  db.query(scan, [DrugName],(err, result) => {
    console.log("scanQuery : ", scan);
    if (err) {
      console.log(err);
    } else if (result.length > 0) {
      //scan,serialNumber," Laptop serial number");
      res.send(result);
   
      console.log("===========   total drug is send  ******************************");
    } else {
      //scan,serialNumber," Laptop serial number");

      res.send({ message: "You have no any Priscription yet " });
   
      console.log("You have no anyPriscription yet ");
    }
  });
});

// View Comment...

app.post("/ViewComment", (req, res) => {
  // console.log("serial numbetr"+req.body.serialNumber);

  const scan = `select pri.*, p.* from patientComment pri join patient p on p.MRN=pri.MRN order by commentDate  desc`;
  db.query(scan, (err, result) => {
    console.log("scanQuery : ", scan);
    if (err) {
      console.log(err);
    } else {
      console.log("sucessful view Comment ...");

      res.send(result);
    }
  });
});

//Dispence Priscription

app.post("/DispencePriscription", (req, res) => {
  // console.log(req.body.DoctorID);

  const presId = req.body.PrescriptionID;
  const DispenseStatus = req.body.dispense;
  console.log(presId);
  const addPriscrption = `update priscription set DispenseStatus='${DispenseStatus}' where presId = ${presId}`;
  db.query(addPriscrption, [presId, DispenseStatus], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result.affectedRows, "Successfully Dispenced");
      console.log(result);
      res.send("values inserted");
    }
  });
});
app.post('/payedPri', (req, res)=>{
  // console.log("========",req.body,"===========")
  const priceStatus= req.body.priceStatus;
  const presId= req.body.presId;
  const casherId= req.body.casherId;
  let signIn = `update priscription  set priceStatus ='${priceStatus}' ,
   queueStatus='new',casherId =${casherId} where presId = ${presId}`;
  

  db.query(signIn,
     [ priceStatus, presId,casherId], (err, result)=>{
      if(err){
         console.log(err);
      }
      else{
         console.log(" payed and Queue to diagnosis");
         res.send("values inserted");
      }
     }
);

});
app.post('/payedLab', (req, res)=>{
  // console.log("========",req.body,"===========")
  const priceStatus= req.body.priceStatus;
  const labId= req.body.labId;
  const docId= req.body.docId;
  let signIn = `update lab set priceStatus='${priceStatus}' , labStatus='new',docId =${docId} where labId = ${labId}`;
  

  db.query(signIn,
     [ priceStatus, labId,docId], (err, result)=>{
      if(err){
         console.log(err);
      }
      else{
         console.log(" payed and Queue to diagnosis");
         res.send("values inserted");
      }
     }
);

});
app.post('/payedCard', (req, res)=>{
  // console.log("========",req.body,"===========")
  const priceStatus= req.body.priceStatus;
  const payId= req.body.payId;
  const casherId= req.body.casherId;
  let signIn = `update payment set priceStatus='${priceStatus}' , diagnosisStatus='new',casherId =${casherId} where payId = ${payId}`;
  

  db.query(signIn,
     [ priceStatus, payId,casherId], (err, result)=>{
      if(err){
         console.log(err);
      }
      else{
         console.log(" payed and Queue to diagnosis");
         res.send("values inserted");
      }
     }
);

});
app.post("/getProfile", (req, res) => {
  const id = req.body.id;
  const empl = `SELECT imagePath FROM employee where id ="${id}"`;
  db.query(empl, [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log("Image is SEND", empl);
    }
  });
});
//Refer In
app.post("/ViewReferIn", (req, res) => {
  const MRN = req.body.MRN;
  const PATIENT = "SELECT * FROM referIn where MRN =?";
  db.query(PATIENT, [MRN], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      //scan,serialNumber," Laptop serial number");
      res.send(result);
      console.log("display refered in patient");
    }
  });
});

////

app.post("/ReferOutPatient", (req, res) => {
  const docId = req.body.docId;
  const referedTo = req.body.referedTo;
  const MRN = req.body.MRN;
  const datee = req.body.datee;
  const referedReason = req.body.referedReason;
  let referOut =
    "INSERT INTO referOut  (MRN,docId,referReason,toHospital,referDate) VALUES(?,?,?,?,?)";
  db.query(
    referOut,
    [MRN, docId, referedReason, referedTo, datee],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result.affectedRows, " rows inserted");
        console.log(" refered out", referOut);
        res.send("values inserted");
      }
    }
  );
});

app.post("/ReferInPatient", (req, res) => {
  const recId = req.body.recId;
  const referedBy = req.body.referedBy;
  const referedFrom = req.body.referedFrom;
  const MRN = req.body.MRN;
  const datee = req.body.datee;
  const referedReason = req.body.referedReason;
  let referIn =
    "INSERT INTO referIn (MRN  ,recId  ,referedBy, referReason , fromHospital  ,referInDate,rInStatus) VALUES(?,?,?,?,?,?,'not viewed')";
  db.query(
    referIn,
    [MRN, recId, referedBy, referedReason, referedFrom, datee],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send({ message: "values inserted" });
        console.log(result.affectedRows, " rows inserted");
        console.log(" refered in", referIn);
      }
    }
  );
});

//View Refer In...
app.post("/ViewReferIn", (req, res) => {
  const MRN = req.body.MRN;
  const PATIENT = "SELECT * FROM referIn where MRN =?";
  db.query(PATIENT, [MRN], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      //scan,serialNumber," Laptop serial number");
      res.send(result);
      console.log("display refered in patient");
    }
  });
});
//Service List...
app.post("/ViewService", (req, res) => {
  console.log("Services.....");

  const Service = "SELECT * FROM serviceList ";
  db.query(Service, (err, result) => {
    if (err) {
      console.log(err);
    } else if (result.length > 0) {
      //scan,serialNumber," Laptop serial number");
      res.send(result);
      console.log(result);
    } else {
      {
        res.send({ message: "Service not found..." });
        console.log("Service not found...");
      }
    }
  });
});
//
app.post("/finshedDiagnosis", (req, res) => {
  const payId = req.body.payId;
  let finished = `update payment set diagnosisStatus='finished' where payId = ${payId}`;

  db.query(finished, [payId], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Diagnosis Finished");
      res.send("values inserted");
    }
  });
});
//
app.post("/displayOrderPatient", (req, res) => {
  // console.log("serial numbetr"+req.body.serialNumber);
  const office = req.body.office;
  const scan = `select pay.*, p.* from payment pay join patient p on p.MRN=pay.MRN where pay.priceStatus="Payed" and pay.diagnosisStatus="new" and pay.assignedRoom="${office}"`;
  db.query(scan, [office], (err, result) => {
    console.log("scanQuery : ", scan);
    if (err) {
      console.log(err);
    } else {
      console.log("display");
      //scan,serialNumber," Laptop serial number");
      res.send(result);
    }
  });
});
//
app.post("/selectDoctorOffice", (req, res) => {
  // console.log("serial numbetr"+req.body.serialNumber);
  const id = req.body.id;
  const selectOffice = ` select office from employee where id=${id}`;
  db.query(selectOffice, [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("office number of doctor send");
      //scan,serialNumber," Laptop serial number");
      res.send(result);
    }
  });
});
//
app.post("/WritePatientHistory", (req, res) => {
  const docId = req.body.docId;
  const descriptionn = req.body.descriptionn;
  const MRN = req.body.MRN;
  const historyDate = req.body.historyDate;
  let payBill =
    "INSERT INTO patientHistory (MRN  ,docId ,descriptionn, historyDate) VALUES(?,?,?,?)";
  db.query(payBill, [MRN, docId, descriptionn, historyDate], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result.affectedRows, " rows inserted");
      console.log(" free");
      res.send("values inserted");
    }
  });
});

//hold Queue
app.post("/payBill", (req, res) => {
  const recOffId = req.body.recOffId;
  const serviceFee = req.body.serviceFee;
  const MRN = req.body.MRN;
  const datee = req.body.datee;
  const price = req.body.price;
  const priceStatus = req.body.priceStatus;
  const assignedRoom = req.body.assignedRoom;
  let payBill =
    "INSERT INTO payment (MRN  ,recOffId,sFee ,price , paymentDate, priceStatus ,assignedRoom ) VALUES(?,?,?,?,?,?,?)";
  db.query(
    payBill,
    [MRN, recOffId, serviceFee, price, datee, priceStatus, assignedRoom],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result.affectedRows, " rows inserted");
        console.log(" free");
        res.send("values inserted");
      }
    }
  );
});

app.post("/orderLab", (req, res) => {
  const doctorId = req.body.doctorId;
  const serviceFee = req.body.serviceFee;
  const MRN = req.body.MRN;
  const orderDate = req.body.orderDate;
  const price = req.body.price;

  let OrderLab =
    "INSERT INTO lab (MRN  ,docId,orderDate  , price ,labOrder, priceStatus ) VALUES(?,?,?,?,?,'Not payed')";
  db.query(
    OrderLab,
    [MRN, doctorId, orderDate, price, serviceFee],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(" =========");
        res.send({ message: "values inserted" });
        console.log(OrderLab, " rows inserted");
      }
    }
  );
});

//    AppointDate
app.post("/Appointment", (req, res) => {
  const docId = req.body.docId;
  const appReason = req.body.AppointReason;
  const dateAndTime = req.body.AppointDate;
  const MRN = req.body.MRN;
  const assignedRoom = req.body.AppointRoom;
  let giveAppointment =
    "INSERT INTO Appointment (MRN  ,docId ,reason , appointmentDate  , assignedRoom) VALUES(?,?,?,?,?)";
  db.query(
    giveAppointment,
    [MRN, docId, appReason, dateAndTime, assignedRoom],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result.affectedRows, " rows inserted");
        console.log("Appointment ");
        res.send("values inserted");
      }
    }
  );
});
//
app.post("/Priscription", (req, res) => {
  const DoctorID = req.body.DoctorID;
  const MRN = req.body.MRN;
  const Diseases_description = req.body.Diseases_description;

  const Drug_quantity = req.body.servDrug_quantityice;
  const Drug_name = req.body.Drug_name;
  const Drug_frequency = req.body.Drug_frequency;
  const Prscribe_date = req.body.Prscribe_date;

  const addPriscrption =
    "INSERT INTO priscription (MRN,DoctorId,PriscriptionDate,PriscriptionReason,DrugName,Quantity,Frequency) VALUES(?,?,?,?,?,?,?)";
  db.query(
    addPriscrption,
    [
      MRN,
      DoctorID,
      Prscribe_date,
      Diseases_description,
      Drug_name,
      Drug_quantity,
      Drug_frequency,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result.affectedRows, " rows inserted and pescribe drug");
        res.send(result);
      }
    }
  );
});
// .....

// change User Account
app.post("/ChangeAccount", (req, res) => {
  // console.log("========",req.body,"===========")
  const userName = req.body.userName;
  const passwordd = req.body.passwordd;
  const id = req.body.id;
  const where = req.body.where;
  const table = req.body.table;
  let ChangeAcc = `select * from ${table} where userName='${userName}'and passwordd='${passwordd}' and ${where} = '${id}'`;
  db.query(
    ChangeAcc,
    [table, userName, passwordd, id, where],
    (err, result) => {
      if (err) {
        res.send({ message: "wrong user input combination !! " });
        console.log(err);
        console.log(id, "   ", passwordd);
      } else if (result.length > 0) {
        console.log(ChangeAcc, " rows Selected");

        res.send(result);
      } else {
        res.send("Wrong Input value");
        res.send({ message: "wrong user name/ password combination !! " });
        console.log("wrong ID/ user name/ password combination !!");
        console.log("Change Account", ChangeAcc);
      }
    }
  );
});
// cheack id   User name
app.post("/checkId", (req, res) => {
  const ID = req.body.Id;
  console.log(ID);
  const cheackempid = `select * from employee where id="${ID}"`;
  db.query(cheackempid, [ID], (err, result) => {
    if (err) {
      res.send({ message: "wrong input combination !! " });
      console.log(err);
    } else if (result.length) {
      res.send(result);

      console.log("Correct Identification Number");
    } else {
      res.send({ message: "Wrong Identification Number " });
      console.log("Wrong Identification Number ");
    }
  });
});
app.post("/checkMRN", (req, res) => {
  const MRN = req.body.MRN;

  const cheackempid = `select * from patient where MRN="${MRN}"`;
  db.query(cheackempid, [MRN], (err, result) => {
    if (err) {
      console.log(err);
    } else if (result.length > 0) {
      res.send(result);

      console.log("Correct Identification Number");
    } else {
      res.send({ message: "Wrong Identification Number " });
      console.log("Wrong Identification Number ");
    }
  });
});
// Cheack user Name... checkUserName
app.post("/checkUserName", (req, res) => {
  const userName = req.body.userName;

  const cheackempid = `select * from employee where username="${userName}"`;
  db.query(cheackempid, [userName], (err, result) => {
    if (err) {
      console.log(err);
    } else if (result.length > 0) {
      res.send(result);

      console.log("username repeated");
    } else {
      res.send({ message: "username not repeated " });
      console.log("not repeated username");
    }
  });
});
// Cheack user Name... checkUserName   checkUserNameNew
app.post("/checkUserNameNew", (req, res) => {
  const userName = req.body.userName;
  const Id = req.body.where;

  const cheackempid = `select * from employee where username="${userName}" and id !="${Id}"`;
  db.query(cheackempid, [userName], (err, result) => {
    if (err) {
      console.log(err);
    } else if (result.length > 0) {
      res.send(result);

      console.log("username repeated");
    } else {
      res.send({ message: "username not repeated " });
      console.log("not repeated username");
    }
  });
});


// View Drug Priscription....doctor
app.get("/ViewPriscription", (req, res) => {
  // console.log("serial numbetr"+req.body.serialNumber);

  const scan = `select pri.*, p.* from priscription pri join patient 
          p on p.MRN=pri.MRN   where DispenseStatus="Not Dispensed" and priceStatus='Payed';`
  db.query(scan, (err, result) => {
  
    if (err) {
      console.log(err);
    } else {
      console.log("sucessful view Priscription history");

      res.send(result);
    }
  });
});
//login as Employ
app.post("/login", (req, res) => {
  const userName = req.body.userName;
  const passwordd = req.body.passwordd;
  const table = req.body.table;
 
  const login = `select * from ${table} where username="${userName}"`;

  db.query(login, [table, userName], (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result.length > 0) {
      bcrypt.compare(passwordd,result[0].passwordd).then((match)=>{
        if(!match){
          res.send("password not correct")
          console.log("err:---- "+result)
        }
        else{
          console.log("result: "+result)
          res.send(result);
        }
      })
      
    } else {
      res.send({ message: "wrong user name/ password combination !! " });
      console.log("wrong user name/ password combination !!");
     
    }
  });
});

//login as Patient
app.post("/logInPatient", (req, res) => {
  const userName = req.body.userName;
  const passwordd = req.body.passwordd;
  const login = `select MRN from patient where username="${userName}" and passwordd= "${passwordd}"`;
  db.query(login, [userName, passwordd], (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result.length > 0) {
      res.send(result);

      console.log(login, "login sucessfuly patient");
    } else {
      res.send({ message: "wrong user name/ password combination !! " });
      console.log("wrong user name/ password combination !!");
      console.log("login", login);
    }
  });
});
// coment ...
app.post("/comment", (req, res) => {
  // console.log("========",req.body,"===========")
  const department = req.body.department;
  const comment = req.body.comment;
  const MRN = req.body.MRN;
  const datee = req.body.datee;
  const email = req.body.email;
  let signIn = `insert into patientComment (MRN ,department  ,patientComment  ,email  ,commentDate) values(?,?,?,?,?)`;

  db.query(signIn, [MRN, department, comment, email, datee], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(signIn, "  comment rows inserted");
      res.send({ message: "comments was inserted !!! " });
    }
  });
});
app.get('/displayLabPaymentRequest', (req,res)=>{
  // console.log("serial numbetr"+req.body.serialNumber);
  const serialNumber= req.body.serialNumber; 
  const scan=`select l.labId, l.MRN, l.labOrder,l.price, p.firstName,p.middleName,p.lastName from patient
   p join lab l on p.mrn=l.mrn where l.priceStatus='Not payed';`;
  db.query(scan, (err,result)=>{
     console.log("scanQuery : ",scan);
       if(err){
        console.log(err);
       }
       else{
        console.log();
        //scan,serialNumber," Laptop serial number");
        res.send(result);
       }
  });

})
// Service register
app.post("/registerService", (req, res) => {
  // console.log("========",req.body,"===========")
  const service = req.body.service;
  const price = req.body.price;

  const ServiceType = req.body.ServiceType;

  let addService = `insert into serviceList  (serviceFee  ,price,serviceType) values(?,?,?);`;

  db.query(addService, [service, price, ServiceType], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log( "service registered");
      res.send({ message: "Serviice was inserted !!! " });
    }
  });
});
// select service....
app.post("/selectPrice", (req, res) => {
  const serviceFee = req.body.serviceFee;
  const getDrugID = `select price from servicelist where serviceFee='${serviceFee}'`;
  db.query(getDrugID, [serviceFee], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);

      console.log(getDrugID, "the price is send");
    }
  });
});
// Display sevice
app.get("/displayService", (req, res) => {
  const getDrugID = `select * from serviceList where serviceType = "Card";`;
  db.query(getDrugID, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);

      console.log(result, "the service displayed");
    }
  });
});
app.get("/displayServiceFromLab", (req, res) => {
  const getDrugID = `select * from serviceList where serviceType = "lab";`;
  db.query(getDrugID, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);

      console.log(result, "the service displayed");
    }
  });
});
app.get('/displayDrugPaymentRequest', (req,res)=>{
  // console.log("serial numbetr"+req.body.serialNumber);
  const serialNumber= req.body.serialNumber; 
  const scan=`select s.*, pri.*, p.*, d.*  from priscription pri join drug d on pri.DrugName=d.DrugName join 
  servicelist s on s.serviceFee=d.drugId join patient p on p.MRN=pri.Mrn
   where pri.priceStatus="Not payed";`;
  db.query(scan, (err,result)=>{
     console.log("scanQuery : ",scan);
       if(err){
        console.log(err);
       }
       else{
        console.log();
        //scan,serialNumber," Laptop serial number");
        res.send(result);
       }
  });

})

app.get("/displayServiceFromDrug", (req, res) => {
  const getDrugID = `select d.*, sl.* from servicelist sl join drug d where d.drugId=sl.serviceFee;;`;
  db.query(getDrugID, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);

      console.log(result, "the service from drug table is displayed");
    }
  });
});
app.get('/displayLabOrder', (req,res)=>{
  const selectLabOrder=`    select  l.*, p.* from lab l join patient p 
  on p.MRN=l.MRN where priceStatus='Payed'`;
  db.query(selectLabOrder, (err,result)=>{
  
       if(err){
        console.log(err);
       }
       else{
        console.log(result);
        //scan,serialNumber," Laptop serial number");
        res.send(result);
       }
  });
});
app.post("/generateReportForRecordOfficer", (req, res) => {
  const initalDate = req.body.initalDate;
  const CurrentDate = req.body.CurrentDate;
  const scan = `select pay.*, p.* from payment pay join patient p on p.MRN=pay.MRN 
   WHERE (paymentDate BETWEEN '${initalDate}' AND '${CurrentDate}')`;
  db.query(scan, [CurrentDate, initalDate], (err, result) => {
    console.log("scanQuery : ", scan);
    if (err) {
      console.log(err);
    } else {
      console.log("report for record officer is send");
      //scan,serialNumber," Laptop serial number");
      res.send(result);
    }
  });
});

app.get("/cardGRForCaher", (req, res) => {
  // console.log("serial numbetr"+req.body.serialNumber);
  const serialNumber = req.body.serialNumber;
  const scan = `select pay.MRN, pay.sFee,pay.price, p.firstName,p.middleName,p.lastName from PAYMENT
    pay join patient p on p.mrn=pay.mrn where pay.priceStatus='Payed';`;
  db.query(scan, (err, result) => {
    console.log("scanQuery : ", scan);
    if (err) {
      console.log(err);
    } else {
      console.log();
      //scan,serialNumber," Laptop serial number");
      res.send(result);
    }
  });
});

var uploadEmpImg = multer({ dest: path.join(__dirname,'Image/temp/')});
var type = uploadEmpImg.single('image');

 
var type3 = uploadEmpImg.single('image');
app.post('/editEmployeeInfo', type3, (req, res)=>{
     const id=req.body.id;
     const job=req.body.job;
     const office=req.body.office;
     const specializedIn=req.body.specializedIn;
  const firstName=req.body.firstName;
  const middleName=req.body.middleName;
  const lastName=req.body.lastName;
  const age=req.body.age;
  const phoneNumber=req.body.phoneNumber;
  const gender=req.body.gender;
  const region=req.body.region;
  const wos=req.body.woredaOrSubcity;
  const kog=req.body.ketenaOrGott;
  const kebele=req.body.kebele;
  const houseNumber=req.body.houseNumber;
  const imgName=req.body.imgName;

   if(req.file){

      var tmp_path = req.file.path;
      
      console.log(tmp_path);
      var target_path = path.join(__dirname, 'Image/') + req.file.originalname;
      var src = fs.createReadStream(tmp_path);
      var dest = fs.createWriteStream(target_path);
      src.pipe(dest);
      
      //remove temp files  
      const directory = path.join(__dirname,'Image/temp/')
      fs.readdir(directory, (err, files) => {
         if (err) throw err;
         for (const file of files) {
            fs.unlink(path.join(directory, file), err => {
            if (err) throw err;
            });
         }});
   }

   let editEmp = `update employee set firstName='${firstName}', middleName='${middleName}', lastName='${lastName}', age='${age}',
    sex='${gender}', imagePath='${imgName}', phoneNumber='${phoneNumber}', region='${region}', woredaOrSubcity='${wos}', 
    ketenaOrGott='${kog}', kebele='${kebele}', houseNumber='${houseNumber}', office='${office}' , specializedIn='${specializedIn}'
     , job='${job}'   where id = ${id}`;
  db.query(editEmp,
     [firstName, middleName, lastName, phoneNumber, imgName,age, gender, region, wos, houseNumber,kog, kebele,id,specializedIn,office,job], (err, result)=>{
      if(err){
         console.log("err:  ",err);
      }
      else{
         console.log(" edit employee");
         // res.send({message:"Success"});
      }
     }
);
});
app.post("/displayBySearchPateint", (req, res) => {
  const search = req.body.search;
  const select = req.body.select;
  const selectBySearch = `SELECT * FROM patient where ${select} =${search}`;
  db.query(selectBySearch, [search, select], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      //scan,serialNumber," Laptop serial number");
      res.send(result);
      console.log(result);
      console.log("search by", select);
    }
  });
});

app.get("/labGRForCaher", (req, res) => {
  // console.log("serial numbetr"+req.body.serialNumber);
  const serialNumber = req.body.serialNumber;
  const scan = `select l.MRN, l.labOrder,l.price, p.firstName,p.middleName,p.lastName from lab
    l join patient p on p.mrn=l.mrn where l.priceStatus='Payed';`;
  db.query(scan, (err, result) => {
    console.log("scanQuery : ", scan);
    if (err) {
      console.log(err);
    } else {
      console.log();
      //scan,serialNumber," Laptop serial number");
      res.send(result);
    }
  });
});
// view Lab Result
app.post("/ViewLabResult", (req, res) => {
  const LabId = req.body.LabId;
  // const selectLabOrder = `    select  l.*, p.* from lab l join patient p
  //  on p.MRN=l.MRN where  labStatus='viewed' and priceStatus='Payed' and p.MRN='${MRN}'`;
  const selectLabOrder = `    select  l.*, p.* from lab l join patient p 
   on p.MRN=l.MRN `;
  db.query(selectLabOrder, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("display lab result");
      //scan,serialNumber," Laptop serial number");
      res.send(result);
    }
  });
});

app.post("/ViewIndividualLabResult", (req, res) => {
  console.log("========",req.body,"============")
  const MRN = req.body.MRN;

  // const selectLabOrder = `    select  l.*, p.* from lab l join patient p
  //  on p.MRN=l.MRN where  labStatus='viewed' and priceStatus='Payed' and p.MRN='${MRN}'`;
  const selectLabOrder = `    select  l.*, p.* from lab l join patient p 
   on p.MRN=l.MRN where p.mrn=${MRN}`;
  db.query(selectLabOrder,[MRN], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("display lab result");
      //scan,serialNumber," Laptop serial number");
      res.send(result);
    }
  });
});

app.post("/giveAppointment",(req,res)=>{
  const docId= req.body.docId;
  const appReason=req.body.appReason;
  const dateAndTime= req.body.dateAndTime;
  const MRN= req.body.MRN;
  const assignedRoom= req.body.assignedRoom;
  let giveAppointment = "INSERT INTO appointment (MRN  ,docId ,reason , appointmentDate  , assignedRoom) VALUES(?,?,?,?,?)";
  db.query(giveAppointment,
     [ MRN, docId,appReason,dateAndTime , assignedRoom], (err, result)=>{
      if(err){
         console.log(err);
      }
      else{
         console.log(result.affectedRows," rows inserted");
         console.log("Appointment ");
         res.send("values inserted");
      }
     }
);
})


app.post("/ViewAppointmnet", (req, res) => {
  console.log("hello");
  const MRN = req.body.MRN;
  // const PATIENT = select pri.*, p.* from appointment pri join employee p on p.Id=pri.docId where pri.MRN =${MRN};
  const PATIENT = `SELECT * FROM Appointment where MRN =${MRN}`;
  db.query(PATIENT, [MRN], (err, result) => {
    if (err) {
      console.log(err);
    } else if (result.length > 0) {
      //scan,serialNumber," Laptop serial number");
      res.send(result);
      console.log(result);
      console.log(MRN);
    } else {
      //scan,serialNumber," Laptop serial number");

      res.send({ message: "You have no any Appointment yet " });
      console.log(MRN);
      console.log("You have no anyAppointment yet ");
    }
  });
});
// View Lab Orders
app.post("/ViewLabOrder", (req, res) => {
  // const MRN = req.body.MRN;
  const viewLabOrder = `select pri.*, p.* from lab pri join patient p on p.MRN=pri.MRN where
   pri.priceStatus='Payed' and pri.labStatus="new"`;
  db.query(viewLabOrder, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      //scan,serialNumber," Laptop serial number");
      res.send(result);
      console.log(result);
      console.log("display lab order");
    }
  });
});
// Submit Lab Result
app.post("/SubmitLabResult", (req, res) => {
  const LabId = req.body.LabId;
  const labTechId = req.body.LabTEchnitianId;
  const Result = req.body.Result;
  const ResultDate = req.body.ResultDate;

  let LabResult = `update lab set labTechId='${labTechId}'
     ,resultDate='${ResultDate}', labResult='${Result}' , labStatus="viewed" where labId =${LabId}`;
  db.query(LabResult, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(" =========");
      res.send({ message: "Lab Result was Submited" });
      console.log(LabResult, " rows inserted");
    }
  });
});
app.post('/displayLabResult', (req,res)=>{
  const MRN=req.body.MRN;
  const selectLabOrder=`    select  l.*, p.* from lab l join patient p 
  on p.MRN=l.MRN where  labStatus='viewed' and priceStatus='Payed' and p.MRN='${MRN}'`;
  db.query(selectLabOrder,[MRN], (err,result)=>{
  
       if(err){
        console.log(err);
       }
       else{
        console.log("display lab result");
        //scan,serialNumber," Laptop serial number");
        res.send(result);
       }
  });

});
app.post('/sendResult', (req, res)=>{
  // console.log("========",req.body,"===========")
  const labId= req.body.labId;
  const labResult= req.body.labResult;
  const resultDate= req.body.resultDate;
  const labTechId=req.body.labTechId;
  let signIn = `update lab set labTechId=${labTechId}, 
  labResult='${labResult}', resultDate='${resultDate}',labStatus='viewed' where labId = ${labId}`;
  

  db.query(signIn,
     [ labId, labResult, resultDate, labTechId], (err, result)=>{
      if(err){
         console.log(err);
        
      }
      else{
         console.log("The lab result is send");
         res.send("values inserted");
      }
     }
);

});

app.get("/priGRForCaher", (req, res) => {
  // console.log("serial numbetr"+req.body.serialNumber);
  const serialNumber = req.body.serialNumber;
  const scan = `select pri.MRN, pri.DrugName,pri.price, p.firstName,p.middleName,p.lastName from priscription
    pri join patient p on p.mrn=pri.mrn where pri.DispenseStatus='Payed';`;
  db.query(scan, (err, result) => {
    console.log("scanQuery : ", scan);
    if (err) {
      console.log(err);
    } else {
      console.log();
      //scan,serialNumber," Laptop serial number");
      res.send(result);
    }
  });
});
app.listen(3001, () => {
  console.log("running on 3001");
});

app.get("/", (req, res) => {
  res.send("hello worlssdd");
});


