const upload = require("./upload.js");
const express = require("express");
const axios = require("axios");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cookeParser = require("cookie-parser");
const session = require("express-session");
const multer = require("multer");
const mysql = require("mysql2");
const cors = require("cors");
const fs = require("fs");
const bcrypt = require("bcrypt");
const { Console, error } = require("console");
const fetch = require("cross-fetch");

const { Socket } = require("socket.io");

//order_lab.... doctoru yemiyazbet lab
//view_labrequest ..... lab technicial ye mikebelbet
//view_labresult ..... docteru endegena yemiyaybet

require("dotenv").config();
// const userSchema = require("./Validation/Validation");
// const validation = require("./MiddleWare/ValidationMiddleWare");
app.use(
  cors()
  //   {
  //   origin: ["http://localhost:3000"],
  //   methods: ["GET", "POST"],
  //   credentials: true,
  // }
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

app.use((req, res, next) => {
  res.setHeader("Acess-Control-Allow-Origin", "*");
  next();
});

// socket io...
const http = require("http");
const server = http.createServer(app);

io = require("socket.io")(server, {
  cors: { origin: "*" },
});

io.on("connection", (Socket) => {
  console.log("Socket is connected and socket id is", Socket.id);
});
let onlineUsers = [];

const addNewUser = (username, socketId) => {
  !onlineUsers.some((user) => user.username === username) &&
    onlineUsers.push({ username, socketId });
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (username) => {
  return onlineUsers.find((user) => user.username === username);
};

io.on("connection", (socket) => {
  socket.on("newUser", (username) => {
    addNewUser(username, socket.id);
  });

  socket.on("sendNotification", ({ senderName, receiverName, type }) => {
    const receiver = getUser(receiverName);
    io.to(receiver.socketId).emit("getNotification", {
      senderName,
      type,
    });
  });

  socket.on("sendText", ({ senderName, receiverName, text }) => {
    const receiver = getUser(receiverName);
    io.to(receiver.socketId).emit("getText", {
      senderName,
      text,
    });
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

io.listen(5000);

/////////////////////////////////

function sendEmail({ recipient_email, OTP }) {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      auth: {
        user: "redietg003@gmail.com",
        pass: "ubwjjjqjadxs",
      },
    });
    const mail_configs = {
      from: "redietg003@gmail.com",
      to: recipient_email,
      subject: "RESET EYASTA CLINIC PASSWORD",
      //   html: `
      //   <!DOCTYPE html>
      //   <html lang="en">
      //   <head>
      //     <meta charset="UTF-8">
      //     <title>EYASTA CLINIC</title>
      //   </head>
      //   <body>
      //   <div style="font-family:Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
      //     <div style="margin:50px auto;width:70%;padding:20px 0">
      //       <div style="border-bottom:1px solid #eee">
      //         <a href="" style="font-size:1.4em;color:#00466a;text-decoration:none;font-weight:600">
      //           Eyasta cliniccccccccc
      //         </a>
      //       </div>
      //       <p style="font-size:1.1em">Hi</p>
      //       <p >Thankyou for chossing Eyasta clinic use the following OTP  JSDHDJ S </p>
      //       <h2 style="background: #00466a;margin:0 auto;width:max-content;padding: 0 10px;color:#fff;border-radius:4px;">${OTP}</h2>
      //       <p style="font-size:0.9em">Regards,<br/>EYASTA</p>
      //       <hr/>
      //       <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      //         <p>1jsnd11111111111111111</p>
      //         <p>222222222222222222222222</p>
      //         <p>3333333333333333333333333333</p>
      //       </div>
      //     </div>
      //   </div>
      //   </body>
      // </html>
      //   `
      text: "that is me",
    };
    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log("infooo", info);
        console.log("errrrrrooo", error);
        return reject({ message: `An error has occured` });
      }
      return resolve({ message: `Email sent sucessfully` });
    });
  });
}
app.get("/", (req, res) => {
  console.log(process.env.MY_EMAIL);
});
app.post("/send_recovery_email", (req, res) => {
  console.log("some body just hit me", req.body, "   ", process.env.MY_EMAIL);
  sendEmail(req.body)
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});

//####################################### BACK-UP ROUTE ################################

const backupReadData = (query, table) => {
  console.log("read data is working");
  db.query(query, (err, result) => {
    if (err) {
      console.log("unable to fetch data");
    } else {
      console.log(result, "data reads successfully");
      backupWriteData(result, table);
      return result;
    }
  });
};

const backupWriteData = async (data, table) => {
  fetch(`http://localhost:2000/user/${table}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ data, table }),
  })
    .then((result) => console.log(result, "axios result"))
    .catch((err) => console.log(err));
};

const backupHandler = async (table) => {
  console.log("backup working");
  //const employee =
  // "SELECT employee.*,patient.*,appointment.*,lab.*,patientcomment.*,patienthistory.*,priscription.*,referin.*,referout.*,servicelist.*,payment.*,drug.* FROM employee,patient,appointment,lab,patientcomment,patienthistory,priscription,referin,referout,servicelist,payment,drug";
  const appointment = "SELECT * FROM appointment";
  const drug = "SELECT * FROM drug";
  const employee = "SELECT * FROM employee";
  const lab = "SELECT * FROM lab";
  const patient = "SELECT * FROM patient";
  const patientcomment = "SELECT * FROM patientcomment";
  const patienthistory = "SELECT * FROM patienthistory";
  const payment = "SELECT * FROM payment";
  const priscription = "SELECT * FROM priscription";
  const referin = "SELECT * FROM referin";
  const referout = "SELECT * FROM referout";
  const servicelist = "SELECT * FROM servicelist";
  switch (table) {
    case "appointment": {
      const result = backupReadData(appointment, table);
      break;
    }
    case "drug": {
      const result = backupReadData(drug, table);
      break;
    }
    case "employee": {
      const result = backupReadData(employee, table);
      break;
    }
    case "lab": {
      const result = backupReadData(lab, table);
      break;
    }
    case "patient": {
      const result = backupReadData(patient, table);
      break;
    }
    case "patientcomment": {
      const result = backupReadData(patientcomment, table);
      break;
    }
    case "patienthistory": {
      const result = backupReadData(patienthistory, table);
      break;
    }
    case "payment": {
      const result = backupReadData(payment, table);
      break;
    }
    case "priscription": {
      const result = backupReadData(priscription, table);
      break;
    }
    case "referin": {
      const result = backupReadData(referin, table);
      break;
    }
    case "referout": {
      const result = backupReadData(referout, table);
      break;
    }
    case "servicelist": {
      const result = backupReadData(servicelist, table);
      break;
    }
    default: {
      break;
    }
  }
};

app.post("/signUp", async (req, res) => {
  // console.log("========",req.body,"===========")
  const userName = req.body.userName;
  const passwordd = req.body.passwordd;
  const id = req.body.id;
  const where = req.body.IDD;
  const table = req.body.table;

  bcrypt.hash(passwordd, 10).then((hashedPassword) => {
    let signUp = `update ${table} set userName='${userName}',
   passwordd='${hashedPassword}' where ${where} = '${id}'`;
    db.query(
      signUp,
      [table, userName, hashedPassword, id, where],
      (err, result) => {
        if (err) {
          res.send({ message: "wrong user input combination !! " });
          console.log(err);
          console.log(id, "   ", passwordd);
        } else if (result) {
          console.log(signUp, " rows inserted");
          const data = `select * from ${table} where ${where}="${id}";`;
          db.query(data, (err, result) => {
            if (err) {
              console.log(err);
            } else {
              backupHandler("employee");
              backupHandler("patient");
              res.send(result[0]);
            }
          });
        } else {
          res.send("Wrong Id vale");
          res.send({ message: "wrong user name/ password combination !! " });
          console.log("wrong ID/ user name/ password combination !!");
          console.log("signUp", signUp);
        }
      }
    );
  });
});
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

  let editPatient = `update patient set firstName='${firstName}', middleName='${middleName}', 
  lastName='${lastName}', age='${age}', sex='${gender}', 
  imagePath='${imgName}', phoneNumber='${phoneNumber}', region='${region}', woredaOrSubcity='${wos}',
   ketenaOrGott='${kog}', kebele='${kebele}', houseNumber='${houseNumber}' where MRN = ${MRN}`;
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
        res.send({ result });
        backupHandler("patient");
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
  const registerPatient = `insert into patient  (MRN ,firstName ,middleName ,lastName ,age ,sex 
    , imagePath ,phoneNumber ,region ,woredaOrSubcity  ,ketenaOrGott  ,kebele  ,houseNumber,registrationDate)
     values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
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
        backupHandler("patient");
        res.send(err);
      } else {
        res.send({ message: MRN });
        console.log("patient is registered");
      }
    }
  );
});
// cheack Account ............
app.post("/checkAccount", (req, res) => {
  const table = req.body.table;
  const userName = req.body.userName;
  const passwordd = req.body.passwordd;
  console.log(userName, table);
  const cheackempid = `select * from ${table} where userName="${userName}";`;
  db.query(cheackempid, [userName], (err, result) => {
    if (err) {
      res.send({ message: "wrong input combination !! " });
      console.log(err);
    } else if (result.length > 0) {
      backupHandler("patient");
      backupHandler("employee");
      res.send(result);
      console.log("Correct Account...........");
    } else {
      res.send({ message: " Account does not Exist.......   " });
      console.log("Account Does not Exist... ");
    }
  });
});
//gey mrn
app.get("/getMrnAndIncrementByOne", (req, res) => {
  const IncrMRN = `select MRN from patient order by MRN  desc;`;
  db.query(IncrMRN, (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result.length > 0) {
      backupHandler("drug");
      res.send(result);
      console.log("SEND MRNN======");
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
      backupHandler("patient");
      res.send(result);
    } else {
      res.send({ message: "10001" });
      console.log("Emp ID IS EQUAL TO 10001");
    }
  });
});

//register employee
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
  const regDate = req.body.regDate;

  var tmp_path = req.file.path;
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

  const registerEmployee = ` insert into employee (id,firstName,middleName,lastName,imagePath,age,
       phoneNumber,region,woredaOrSubcity ,ketenaOrGott ,kebele ,houseNumber ,specializedIn
        ,employeeStatus,job,sex,office,registrationDate) values(?,?,?,?,?,?,?,?,?,?,?,?,?,'active',?,?,?,?)`;
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
      regDate,
    ],
    (err, result) => {
      if (err) {
        res.send({ message: "wrong Values !! " });
        console.log(err);
        res.send(err);
      } else if (result) {
        backupHandler("employee");
        res.send(result);
        console.log("register Employee", regDate);
      } else {
        res.send({ message: "wrong Values !! " });
        console.log("wrong Values !!");
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
        backupHandler("drug");
        res.send("values inserted");
      }
    }
  );
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
      console.log(" HOLD QUEUE ");
      backupHandler("payment");
      res.send("values inserted");
    }
  });
});
// view payment History
app.get("/displayPaymentRequest", (req, res) => {
  // console.log("serial numbetr"+req.body.serialNumber);
  const serialNumber = req.body.serialNumber;
  const scan = `select s.*, pay.*, p.* from payment pay join patient p on p.MRN=pay.MRN join 
  servicelist s on s.serviceFee=pay.sFee where pay.priceStatus="Not payed";`;
  // const scan = `select s.*, pay.*, p.* from payment pay join patient p on p.MRN=pay.MRN join servicelist s on s.id=pay.sFee where pay.priceStatus="Not payed"`;
  db.query(scan, (err, result) => {
    console.log("scanQuery : ");
    if (err) {
      console.log(err);
    } else {
      console.log("card payement request display");
      //scan,serialNumber," Laptop serial number");
      backupHandler("payment");
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
      console.log(" payed");
      backupHandler("payment");
      res.send("values inserted");
    }
  });
});

/////////////////////////////////////////////////////

// display patient request to patients
app.post("/displayIndividualPaymentRequest", (req, res) => {
  const MRN = req.body.MRN;

  console.log("Patient payment request and MRN: ", { MRN });
  // console.log("serial numbetr"+req.body.serialNumber);
  const serialNumber = req.body.serialNumber;
  //const scan = `select * FROM payment where MRN =${MRN} and priceStatus="Not payed"`;

  const scan = `select s.*, pay.*, p.* from payment pay join patient p on p.MRN=pay.MRN join 
  servicelist s on s.serviceFee=pay.sFee where pay.priceStatus="Not payed" and pay.MRN=${MRN};`;
  db.query(scan, [MRN], (err, result) => {
    console.log("scanQuery : ", scan);
    if (err) {
      console.log(err);
    } else {
      console.log("card payement request display");
      //scan,serialNumber," Laptop serial number");
      res.send(result);
    }
  });
});

app.post("/displayDrugPaymentRequest", (req, res) => {
  const MRN = req.body.MRN;

  console.log("Patient payment request and MRN: ", { MRN });
  const serialNumber = req.body.serialNumber;
  const scan = `select  pri.*, p.*, d.*  from priscription pri join drug d on pri.DrugName=d.DrugName join patient p on p.MRN=pri.Mrn
  where pri.priceStatus="Not payed" and pri.MRN=${MRN};`;
  db.query(scan, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(scan, "Drug is displayedd");
      //scan,serialNumber," Laptop serial number");
      res.send(result);
    }
  });
});

app.post("/displayLabPaymentRequest", (req, res) => {
  const MRN = req.body.MRN;
  const serialNumber = req.body.serialNumber;
  const scan = `select l.labId, l.MRN, l.labOrder,l.price, p.firstName,p.middleName,p.lastName from patient
   p join lab l on p.mrn=l.mrn where l.priceStatus='Not payed' and p.MRN=${MRN};`;
  db.query(scan, [MRN], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Lab request dispalyed");
      //scan,serialNumber," Laptop serial number");
      res.send(result);
    }
  });
});

// end of patient view

app.post("/payed", (req, res) => {
  // console.log("========",req.body,"===========")
  const priceStatus = req.body.priceStatus;
  const payId = req.body.payId;
  let signIn = `update payment set priceStatus='${priceStatus}' where payId = ${payId}`;

  db.query(signIn, [priceStatus, payId], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(" payed");
      res.send("values inserted");
    }
  });
});

///////////////////////////////////////////////////////////////////

app.post("/updateToatalDrug", (req, res) => {
  const drugAmount = req.body.drugAmount;
  const drugName = req.body.drugName;

  let signIn = `update drug set drugAmount='${drugAmount}' where drugName = "${drugName}"`;

  db.query(signIn, [drugAmount, drugName], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      backupHandler("drug");
      console.log(
        " ==========UPDATE THE TOTAL DRUG==========================="
      );
      res.send("values inserted");
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

      console.log("all patients displayed==============");
    }
  });
});

// Triage display Patient

app.get("/TriageDisplayPateint", (req, res) => {
  const getDrugID = `select  py.*, p.* from payment py join patient p 
  on p.MRN=py.MRN where priceStatus='Payed' and assignedRoom="NONE"`;

  db.query(getDrugID, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);

      console.log("all patients displayed==============");
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

      console.log("all patients displayed");
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

      console.log("all Drugs are displayed");
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
      console.log(" free");
      backupHandler("patienthistory");
      res.send("values inserted");
    }
  });
});
app.post("/ViewHistory", (req, res) => {
  const MRN = req.body.MRN;
  const PATIENT = `SELECT * FROM patientHistory where MRN =${MRN}`;
  db.query(PATIENT, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      //scan,serialNumber," Laptop serial number");
      res.send(result);
      console.log("history viewes");
    }
  });
});
// View Individual Patient History
app.post("/ViewPatientHistory", (req, res) => {
  const MRN = req.body.MRN;
  const PATIENT = `SELECT * FROM patientHistory where MRN =${MRN}`;
  db.query(PATIENT, [MRN], (err, result) => {
    if (err) {
      console.log(err);
    } else if (result.length > 0) {
      //scan,serialNumber," Laptop serial number");
      res.send(result);

      console.log("history vieweeeeeeeeeee");
    } else {
      //scan,serialNumber," Laptop serial number");

      res.send({ message: "You have no any Record History yet " });

      console.log("You have no any Record History yet ");
    }
  });
});

// Drug Priscription

app.post("/Priscription", (req, res) => {
  const DoctorID = req.body.DoctorID;
  const MRN = req.body.MRN;
  const Diseases_description = req.body.Diseases_description;

  const Drug_quantity = req.body.servDrug_quantityice;
  const Drug_name = req.body.Drug_name;
  const Drug_frequency = req.body.Drug_frequency;
  const Prscribe_date = req.body.Prscribe_date;
  const price = req.body.price;
  const addPriscrption = `INSERT INTO priscription (MRN,DoctorId,PriscriptionDate,descriptionn,DrugName,Quantity,Frequency,priceStatus,price)
     VALUES(?,?,?,?,?,?,?,"Not payed",?)`;
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
      price,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        backupHandler("priscription");
        console.log(" rows inserted and pescribe drug");
        res.send(result);
      }
    }
  );
});
// view Drug Priscription  ...Doctor...
app.post("/ViewDrugPriscription", (req, res) => {
  const MRN = req.body.MRN;
  const scan = `select * from priscription where DispenseStatus="Not Dispensed" and MRN=${MRN}`;
  db.query(scan, (err, result) => {
    if (err) {
      console.log(err);
    } else if (result.length > 0) {
      //scan,serialNumber," Laptop serial number");
      res.send(result);
    } else {
      //scan,serialNumber," Laptop serial number");

      res.send({ message: "You have no any Priscription yet " });

      console.log("You have no anyPriscription yet ");
    }
  });
});

// view Drug Priscription  ...Patient...
app.post("/ViewDrugPriscriptionpatient", (req, res) => {
  const MRN = req.body.MRN;
  const scan = `select * from priscription where  MRN=${MRN}`;
  db.query(scan, (err, result) => {
    if (err) {
      console.log(err);
    } else if (result.length > 0) {
      //scan,serialNumber," Laptop serial number");
      res.send(result);
    } else {
      //scan,serialNumber," Laptop serial number");

      res.send({ message: "You have no any Priscription yet " });

      console.log("You have no anyPriscription yet ");
    }
  });
});
app.post("/selctTotalDrug", (req, res) => {
  const DrugName = req.body.DrugName;
  const scan = `select drugAmount from drug where drugname='${DrugName}';`;
  db.query(scan, [DrugName], (err, result) => {
    if (err) {
      console.log(err);
    } else if (result.length > 0) {
      //scan,serialNumber," Laptop serial number");
      res.send(result);

      console.log(
        "===========   total drug is send  ******************************"
      );
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
  const presId = req.body.PrescriptionID;
  const datee = req.body.datee;
  const pharmId = req.body.pharmId;

  const addPriscrption = `update priscription set DispenseStatus='Dispensed', dispanseDate='${datee}',
  PharmasistId=${pharmId} where presId = ${presId}`;
  db.query(addPriscrption, [presId, datee, pharmId], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      backupHandler("priscription");
      console.log("Successfully Dispenced");
      res.send("values inserted");
    }
  });
});
app.post("/payedPri", (req, res) => {
  const priceStatus = req.body.priceStatus;
  const datee = req.body.datee;
  const presId = req.body.presId;
  const casherId = req.body.casherId;
  let signIn = `update priscription  set priceStatus ='${priceStatus}' ,
   queueStatus='new',casherId =${casherId}, DispenseStatus="Not Dispensed"  ,paymentDate='${datee}' where presId = ${presId}`;

  db.query(signIn, [priceStatus, presId, casherId, datee], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      backupHandler("priscription");
      console.log(" payed and Queue to diagnosis");
      res.send("values inserted");
    }
  });
});
app.post("/payedLab", (req, res) => {
  const priceStatus = req.body.priceStatus;
  const labId = req.body.labId;
  const cashId = req.body.cashId;
  const datee = req.body.datee;
  let signIn = `update lab set priceStatus='${priceStatus}' ,paymentDate='${datee}', labStatus='new',casherId =${cashId} where labId = ${labId}`;

  db.query(signIn, [priceStatus, labId, cashId, datee], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      backupHandler("lab");
      console.log(" payed and Queue to diagnosis");
      res.send(result);
    }
  });
});
app.post("/payedCard", (req, res) => {
  const priceStatus = req.body.priceStatus;
  const payId = req.body.payId;
  const casherId = req.body.casherId;
  const datee = req.body.datee;
  let signIn = `update payment set priceStatus='${priceStatus}' , diagnosisStatus='new',casherId =${casherId},paymentDate='${datee}'  where payId = ${payId}`;

  db.query(signIn, [priceStatus, payId, casherId], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      backupHandler("payment");
      console.log(" payed and Queue to diagnosis");
      res.send(result);
    }
  });
});

app.post("/getProfile", (req, res) => {
  const id = req.body.id;
  const empl = `SELECT * FROM employee where id ="${id}"`;
  db.query(empl, [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log("Image is SEND");
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
        backupHandler("referout");
        console.log(" refered out");
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
        backupHandler("referin");
        res.send({ message: "values inserted" });
        console.log(" patient refered in");
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
  const serviceType = req.body.serviceType;
  let Service;
  if (serviceType == "All")
    Service = "SELECT * FROM serviceList order by serviceFee asc";
  else
    Service = `SELECT * FROM serviceList where serviceType="${serviceType}"order by serviceFee asc`;
  db.query(Service, [serviceType], (err, result) => {
    if (err) {
      console.log(err);
    } else if (result.length > 0) {
      //scan,serialNumber," Laptop serial number");
      res.send(result);
      console.log("selct from service list  ==", serviceType);
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
  const id = req.body.id;
  let finished = `update payment set diagnosisStatus='finished', docId=${id} where payId = ${payId}`;

  db.query(finished, [payId, id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      backupHandler("payment");
      console.log("Diagnosis Finished");
      res.send("values inserted");
    }
  });
});

app.post("/seenLabResult", (req, res) => {
  const labId = req.body.labId;
  let finished = `update lab set labStatus='seen' where labId = ${labId}`;

  db.query(finished, [labId], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      backupHandler("lab");
      console.log("lab result seen by doctor");
      res.send("values inserted");
    }
  });
});
//
app.post("/displayOrderPatient", (req, res) => {
  const office = req.body.office;
  const scan = `select pay.*, p.* from payment pay join patient p on p.MRN=pay.MRN where pay.priceStatus="Payed" and pay.diagnosisStatus="new" and pay.assignedRoom="${office}"`;
  db.query(scan, [office], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("display diagnosis list to doctor page");
      //scan,serialNumber," Laptop serial number");
      res.send(result);
    }
  });
});
//
app.post("/selectDoctorOffice", (req, res) => {
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
      backupHandler("patienthistory");
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
  const assignedRoom = req.body.AssignedRoom;
  let payBill =
    "INSERT INTO payment (MRN  ,recOffId,sFee ,price , paymentDate, priceStatus ,assignedRoom ) VALUES(?,?,?,?,?,?,?)";
  db.query(
    payBill,
    [MRN, recOffId, serviceFee, price, datee, priceStatus, assignedRoom],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        backupHandler("payment");
        console.log(" register to pay card");
        res.send("values inserted");
      }
    }
  );
});

app.post("/AssignRoom", (req, res) => {
  const recOffId = req.body.recOffId;
  const serviceFee = req.body.serviceFee;
  const MRN = req.body.MRN;
  const datee = req.body.datee;
  const price = req.body.price;
  const priceStatus = req.body.priceStatus;
  const assignedRoom = req.body.AssignedRoom;
  console.log(
    "...................................... Room Assigned............................"
  );
  let AssignRomm = `update payment set assignedRoom='${assignedRoom}' where MRN=${MRN} and assignedRoom="NONE"`;
  db.query(AssignRomm, [assignedRoom], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      backupHandler("payment");
      console.log(" Successfully Room Assigned");
      res.send("values inserted");
    }
  });
});

app.post("/orderLab", (req, res) => {
  const doctorId = req.body.doctorId;
  const serviceFee = req.body.serviceFee;
  const MRN = req.body.MRN;
  const orderDate = req.body.orderDate;
  const price = req.body.price;

  let OrderLab =
    "INSERT INTO lab (MRN  ,docId,orderDate  , price ,labOrder, priceStatus, labStatus ) VALUES(?,?,?,?,?,'Not payed','new')";
  db.query(
    OrderLab,
    [MRN, doctorId, orderDate, price, serviceFee],
    (err, result) => {
      if (err) {
        console.log(err);
      } else if (result) {
        backupHandler("lab");
        console.log("lab ORDER SEND TO casher");
        res.send({ message: "values inserted" });
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
    "INSERT INTO Appointment (MRN  ,docId ,reason , appointmentDate  , assignedRoom,appointmentStatus) VALUES(?,?,?,?,?,'new')";
  db.query(
    giveAppointment,
    [MRN, docId, appReason, dateAndTime, assignedRoom],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        backupHandler("appointment");
        console.log("Appointment ");
        res.send("values inserted");
      }
    }
  );
});
//

// .....

// change User Account
app.post("/ChangeAccount", (req, res) => {
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
      } else if (result.length > 0) {
        backupHandler("patient");
        backupHandler("employee");
        console.log(" rows Selected");
        res.send(result);
      } else {
        res.send("Wrong Input value");
        res.send({ message: "wrong user name/ password combination !! " });
        console.log("wrong ID/ user name/ password combination !!");
        console.log("Change Account");
      }
    }
  );
});
// cheack id   User name
app.post("/checkId", (req, res) => {
  const table = req.body.table;
  const id = req.body.IDD;
  const ID = req.body.Id;
  console.log(ID, table);
  const cheackempid = `select * from ${table} where ${id}="${ID}"`;
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
  const table = req.body.table;
  const cheackempid = `select * from ${table} where username="${userName}"`;
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
  const scan = `select pri.*, p.* from priscription pri join patient 
          p on p.MRN=pri.MRN   where DispenseStatus="Not Dispensed" and priceStatus='Payed';`;
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
// app.post("/login", (req, res) => {
//   const userName = req.body.userName;
//   const passwordd = req.body.passwordd;
//   const table = req.body.table;

//   const login = `select * from ${table} where username="${userName}"`;

//   db.query(login, [table, userName], (err, result) => {

//     if (err) {
//       console.log(err);
//     }
//     else if (result.length > 0) {
//       console.log(result.length,">0");
//       bcrypt.compare(passwordd,result[0].passwordd).then((match)=>{
//         if(!match){
//           console.log("password not correct");
//           res.send({nc: "password not correct"})
//         }
//         else{
//           console.log("password correct")
//           res.send(result);
//         }
//       })
//       // res.send(result);
//     } else {
//       res.send({ message: "wrong user name/ password combination !! " });
//       console.log("wrong user name/ password combination !!");

//     }
//   });
// });
app.post("/login", (req, res) => {
  const userName = req.body.userName;
  const passwordd = req.body.passwordd;
  const table = req.body.table;

  const login = `select * from ${table} where username="${userName}";`;

  db.query(login, [table, userName], (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result.length > 0) {
      bcrypt.compare(passwordd, result[0].passwordd).then((match) => {
        if (!match) {
          res.send({ message: "wrong user name/ password combination !! " });
        } else {
          console.log(login, "ssssssssssssss");
          res.send(result);
        }
      });
      // res.send(result);
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
      console.log("login sucessfuly patient");
    } else {
      res.send({ message: "wrong user name/ password combination !! " });
      console.log("wrong user name/ password combination !!");
      console.log("login");
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
  let signIn = `insert into patientComment (MRN ,department  ,patientComment  ,email  ,commentDate,commentStatus) values(?,?,?,?,?,'new')`;

  db.query(signIn, [MRN, department, comment, email, datee], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      backupHandler("patientcomment");
      console.log("  comment rows inserted");
      res.send({ message: "comments was inserted !!! " });
    }
  });
});
app.get("/displayLabPaymentRequest", (req, res) => {
  const serialNumber = req.body.serialNumber;
  const scan = `select l.labId, l.MRN, l.labOrder,l.price, p.firstName,p.middleName,p.lastName from patient
   p join lab l on p.mrn=l.mrn where l.priceStatus='Not payed';`;
  db.query(scan, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Lab request dispalyed");
      //scan,serialNumber," Laptop serial number");
      res.send(result);
    }
  });
});
// Service register
app.post("/registerService", (req, res) => {
  const service = req.body.service;
  const price = req.body.price;

  const ServiceType = req.body.ServiceType;

  let addService = `insert into serviceList  (serviceFee  ,price,serviceType) values(?,?,?);`;

  db.query(addService, [service, price, ServiceType], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      backupHandler("servicelist");
      console.log("service registered");
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

      console.log(result, "the price is send");
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

      console.log("the service displayed");
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

      console.log("the service displayed  labb");
    }
  });
});
app.get("/displayDrugPaymentRequest", (req, res) => {
  const serialNumber = req.body.serialNumber;
  const scan = `select  pri.*, p.*, d.*  from priscription pri join drug d on pri.DrugName=d.DrugName join patient p on p.MRN=pri.Mrn
  where pri.priceStatus="Not payed";`;
  db.query(scan, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(scan, "Drug is displayedd");
      //scan,serialNumber," Laptop serial number");
      res.send(result);
    }
  });
});

app.get("/displayServiceFromDrug", (req, res) => {
  const getDrugID = `select * from serviceList where serviceType = "Drug"`;
  db.query(getDrugID, (err, result) => {
    if (err) {
      console.log("=======================", err, "=======================");
    } else {
      res.send(result);

      console.log("the service from drug table is displayed");
    }
  });
});
app.get("/displayLabOrder", (req, res) => {
  const selectLabOrder = `    select  l.*, p.* from lab l join patient p 
  on p.MRN=l.MRN where priceStatus='Payed'`;
  db.query(selectLabOrder, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.post("/generateReportForRecordOfficer", (req, res) => {
  const initalDate = req.body.initalDate;
  const CurrentDate = req.body.CurrentDate;
  const id = req.body.id;
  const scan = `select pay.*, p.*,left(paymentDate,10) as payDate  from payment pay join patient p on p.MRN=pay.MRN 
   WHERE (paymentDate BETWEEN '${initalDate}' AND '${CurrentDate}') and pay.recOffId=${id}`;
  db.query(scan, [CurrentDate, initalDate, id], (err, result) => {
    if (err) {
      console.log("error:  ", err);
    } else {
      console.log("report for record officer is send");
      //scan,serialNumber," Laptop serial number");
      res.send(result);
      console.log(scan);
    }
  });
});

var uploadEmpImg = multer({ dest: path.join(__dirname, "Image/temp/") });
var type = uploadEmpImg.single("image");

var type3 = uploadEmpImg.single("image");
app.post("/editEmployeeInfo", type3, (req, res) => {
  const id = req.body.id;
  const job = req.body.job;
  const office = req.body.office;
  const specializedIn = req.body.specializedIn;
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

  let editEmp = `update employee set firstName='${firstName}', middleName='${middleName}', lastName='${lastName}', age='${age}',
    sex='${gender}', imagePath='${imgName}', phoneNumber='${phoneNumber}', region='${region}', woredaOrSubcity='${wos}', 
    ketenaOrGott='${kog}', kebele='${kebele}', houseNumber='${houseNumber}', office='${office}' , specializedIn='${specializedIn}'
     , job='${job}'   where id = ${id}`;
  db.query(
    editEmp,
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
      id,
      specializedIn,
      office,
      job,
    ],
    (err, result) => {
      if (err) {
        console.log("err:  ", err);
      } else {
        backupHandler("employee");
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

      console.log("search by");
    }
  });
});

// dispaly patient to teriage to Triage
app.post("/TriageDisplayBySearchPateint", (req, res) => {
  const search = req.body.search;
  const select = req.body.select;
  const selectBySearch = `select  py.*, p.* from payment py join patient p 
  on p.MRN=py.MRN where priceStatus='Payed', ${select} =${search}`;

  db.query(selectBySearch, [search, select], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      //scan,serialNumber," Laptop serial number");
      res.send(result);

      console.log("search by");
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
  const MRN = req.body.MRN;

  // const selectLabOrder = `    select  l.*, p.* from lab l join patient p
  //  on p.MRN=l.MRN where  labStatus='viewed' and priceStatus='Payed' and p.MRN='${MRN}'`;
  const selectLabOrder = `    select  l.*, p.* from lab l join patient p 
   on p.MRN=l.MRN where p.mrn=${MRN}`;
  db.query(selectLabOrder, [MRN], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("display individual lab result");
      //scan,serialNumber," Laptop serial number");
      res.send(result);
    }
  });
});

app.post("/giveAppointment", (req, res) => {
  const docId = req.body.docId;
  const appReason = req.body.appReason;
  const dateAndTime = req.body.dateAndTime;
  const MRN = req.body.MRN;
  const assignedRoom = req.body.assignedRoom;
  let giveAppointment =
    "INSERT INTO appointment (MRN  ,docId ,reason , appointmentDate  , assignedRoom) VALUES(?,?,?,?,?)";
  db.query(
    giveAppointment,
    [MRN, docId, appReason, dateAndTime, assignedRoom],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        backupHandler("appointment");
        console.log("Appointment ");
        res.send("values inserted");
      }
    }
  );
});

app.post("/ViewAppointmnet", (req, res) => {
  const MRN = req.body.MRN;
  // const PATIENT = select pri.*, p.* from appointment pri join employee p on p.Id=pri.docId where pri.MRN =${MRN};
  const PATIENT = `SELECT * FROM Appointment where MRN =${MRN} and appointmentStatus="new"`;
  db.query(PATIENT, [MRN], (err, result) => {
    if (err) {
      console.log(err);
    } else if (result.length > 0) {
      //scan,serialNumber," Laptop serial number");
      res.send(result);
      console.log("view appoint ", PATIENT);
    } else {
      //scan,serialNumber," Laptop serial number");
      console.log("view appoint ", PATIENT);
      res.send({ message: "You have no any Appointment yet " });

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

// const labResultPicture = upload.fields([{ name: "labResult", maxCount: 1 }]);
// // Submit Lab Result
// app.post("/SubmitLabResult", labResultPicture, (req, res) => {
//   console.log(req.files, "Lab Requests");
//   const LabId = req.body.LabId;
//   const labTechId = req.body.LabTEchnitianId;
//   const Result = req.files.labResult[0].filename;
//   const ResultDate = req.body.ResultDate;
//   let LabResult = `update lab set labTechId='${labTechId}'
//      ,resultDate='${ResultDate}', labResult='${Result}' , labStatus="viewed" where labId =${LabId}`;
//   db.query(LabResult, (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       backupHandler("lab");
//       console.log(" =====lab result is send====");
//       res.send({ message: "Lab Result was Submited" });
//     }
//   });
// });

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
      backupHandler("lab");
      console.log(" =====lab result is send====");
      res.send({ message: "Lab Result was Submited" });
    }
  });
});
app.post("/displayLabResult", (req, res) => {
  const MRN = req.body.MRN;
  const selectLabOrder = `    select  l.*, p.* from lab l join patient p 
  on p.MRN=l.MRN where  labStatus='viewed' and priceStatus='Payed' and p.MRN='${MRN}'`;
  db.query(selectLabOrder, [MRN], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("display lab result");
      //scan,serialNumber," Laptop serial number");
      res.send(result);
    }
  });
});
app.post("/sendResult", (req, res) => {
  // console.log("========",req.body,"===========")
  const labId = req.body.labId;
  const labResult = req.body.labResult;
  const resultDate = req.body.resultDate;
  const labTechId = req.body.labTechId;
  let signIn = `update lab set labTechId=${labTechId}, 
  labResult='${labResult}', resultDate='${resultDate}',labStatus='viewed' where labId = ${labId}`;

  db.query(signIn, [labId, labResult, resultDate, labTechId], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      backupHandler("lab");
      console.log("The lab result is send");
      res.send("values inserted");
    }
  });
});

app.post("/priGRForCaher", (req, res) => {
  const id = req.body.id;
  const scan = `select pri.MRN, left(paymentDate,10) as Date ,pri.DrugName,pri.price, p.firstName,p.middleName,p.lastName from priscription
  pri join patient p on p.mrn=pri.mrn where pri.DispenseStatus !='Not Payed' and pri.casherId=${id};`;
  db.query(scan, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Generate report for Priscription is displayed");
      //scan,serialNumber," Laptop serial number");
      res.send(result);
    }
  });
});
app.post("/labGRForCaher", (req, res) => {
  const id = req.body.id;
  const scan = `select l.MRN, l.labOrder,left(paymentDate,10) as Date ,l.price, p.firstName,p.middleName,p.lastName from lab
    l join patient p on p.mrn=l.mrn where l.priceStatus!='Not payed' and l.casherId=${id}`;
  db.query(scan, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      //scan,serialNumber," Laptop serial number");
      res.send(result);
      console.log("Generate report for Lab is displayed");
    }
  });
});
app.post("/cardGRForCaher", (req, res) => {
  const id = req.body.id;
  const scan = `select pay.MRN, pay.sFee, left(paymentDate,10) as Date,pay.price, p.firstName,p.middleName,p.lastName from PAYMENT
    pay join patient p on p.mrn=pay.mrn where pay.priceStatus!='Not payed' and pay.casherId=${id};`;
  db.query(scan, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Generate report for Card is displayed");
      //scan,serialNumber," Laptop serial number");
      res.send(result);
    }
  });
});

app.post("/finishedDiagnosisGRForDoc", (req, res) => {
  const id = req.body.id;
  const scan = `select * ,left(paymentDate,10) as Date from payment pay join patient p on p.mrn=pay.mrn
   where docId=${id} and diagnosisStatus="finished"`;
  db.query(scan, [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Generate report for Doctor for Diagnosis is displayed");
      //scan,serialNumber," Laptop serial number");
      res.send(result);
    }
  });
});
app.post("/prescribeDrugGRForDoc", (req, res) => {
  const id = req.body.id;
  const scan = `select * ,left(PriscriptionDate,10) as Date from priscription pri join patient p on 
  pri.mrn=p.mrn where DoctorId=${id} `;
  db.query(scan, [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      //scan,serialNumber," Laptop serial number");
      res.send(result);
      console.log("Generate report for Doctor for priscription is displayed");
    }
  });
});
app.post("/generateReportLab", (req, res) => {
  const id = req.body.id;
  const scan = `select * ,left(resultDate,10) as Date from lab l join patient p on 
  l.mrn=p.mrn where labTechId=${id} and labStatus="viewed"`;
  db.query(scan, [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      //scan,serialNumber," Laptop serial number");
      res.send(result);
      console.log("Generate report for Lab Technician  is displayed");
    }
  });
});

app.post("/appointmentGRForDoc", (req, res) => {
  const id = req.body.id;
  const scan = `select * ,left(appointmentDate,10) as Date from appointment pay join patient p on p.mrn=pay.mrn
   where docId=${id} `;
  db.query(scan, [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Generate report for Doctor for Appointment is displayed");
      //scan,serialNumber," Laptop serial number");
      res.send(result);
    }
  });
});

app.get("/getAllDoctors", (req, res) => {
  const querys = `select * from employee where job='Doctor'`;
  db.query(querys, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/setBackupDataToMysql", async (req, res) => {
  //###################### delete tables ######################
  const deleteTable = (table) => {
    const del = `DELETE FROM ${table}`;
    db.query(del, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`${table} is deleted.....`);
      }
    });
  };
  //######################## employee ###########################
  if (req.body.employee.length > 0) {
    deleteTable("referin");
    deleteTable("payment");
    deleteTable("employee");
    req.body.employee.map((d) => {
      const registerEmployee = `insert into employee (id,firstName,middleName,lastName,imagePath,age,
       phoneNumber,region,woredaOrSubcity ,ketenaOrGott ,kebele ,houseNumber ,specializedIn
        ,employeeStatus,userName,passwordd,job,sex,office,registrationDate) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
      db.query(
        registerEmployee,
        [
          d.id,
          d.firstName,
          d.middleName,
          d.lastName,
          d.imagePath,
          d.age,
          d.phoneNumber,
          d.region,
          d.woredaOrSubcity,
          d.ketenaOrGott,
          d.kebele,
          d.houseNumber,
          d.specializedIn,
          d.employeeStatus,
          d.userName ? d.userName : "default",
          d.passwordd ? d.passwordd : "default",
          d.job,
          d.sex,
          d.office,
          d.registrationDate.replace(/-/g, "/").split("T")[0],
        ],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log("employee restored....");
          }
        }
      );
    });
  }

  //####################### appointment ##############################
  if (req.body.appointment.length > 0) {
    deleteTable("appointment");
    req.body.appointment.map((d) => {
      let giveAppointment =
        "INSERT INTO Appointment (appId, MRN  ,docId ,reason , appointmentDate  , assignedRoom,appointmentStatus) VALUES(?,?,?,?,?,?,?)";
      db.query(
        giveAppointment,
        [
          d.appId,
          d.MRN,
          d.docId,
          d.reason,
          d.appointmentDate.replace(/-/g, "/").split("T")[0],
          d.assignedRoom,
          d.appointmentStatus,
        ],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Appointment restored");
          }
        }
      );
    });
  }
  //######################## drug ##################################
  if (req.body.drug.length > 0) {
    deleteTable("drug");
    req.body.drug.map((d) => {
      let addDrug =
        "INSERT INTO drug(drugCode,drugName,drugAmount,drugDosage,drugFrequency  ,drugType,drugStrength,expireDate,manufactureDate,manufacturePlace ) VALUES(?,?,?,?,?,?,?,?,?,?)";
      db.query(
        addDrug,
        [
          d.drugCode,
          d.drugName,
          d.drugAmount,
          d.drugDosage,
          d.drugFrequency,
          d.drugType,
          d.drugStrength,
          d.expireDate.replace(/-/g, "/").split("T")[0],
          d.manufactureDate.replace(/-/g, "/").split("T")[0],
          d.manufacturePlace,
        ],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Drug is Registered");
          }
        }
      );
    });
  }
  //################################# lab ##############################
  if (req.body.lab.length > 0) {
    deleteTable("lab");
    req.body.lab.map((d) => {
      const OrderLab =
        "INSERT INTO lab (labId, MRN, docId, casherId,labTechId,labStatus, price ,labOrder, priceStatus, labResult, orderDate,resultDate,paymentDate ) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)";
      db.query(
        OrderLab,
        [
          d.labId,
          d.MRN,
          d.docId,
          d.casherId,
          d.labTechId,
          d.labStatus,
          d.price,
          d.labOrder,
          d.priceStatus,
          d.labResult,
          d.orderDate.replace(/-/g, "/").split("T")[0],
          d.resultDate.replace(/-/g, "/").split("T")[0],
          d.paymentDate.replace(/-/g, "/").split("T")[0],
        ],
        (err, result) => {
          if (err) {
            console.log(err);
          } else if (result) {
            console.log("lab restored");
          }
        }
      );
    });
  }

  //################################# patient ##############################
  if (req.body.patient.length > 0) {
    deleteTable("patient");
    deleteTable("payment");
    deleteTable("referin");
    req.body.patient.map((d) => {
      const registerPatient = `insert into patient  (MRN ,firstName ,middleName ,lastName ,age,userName,passwordd ,sex 
    , imagePath ,phoneNumber ,region ,woredaOrSubcity  ,ketenaOrGott  ,kebele  ,houseNumber,registrationDate)
     values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
      db.query(
        registerPatient,
        [
          d.MRN,
          d.firstName,
          d.middleName,
          d.lastName,
          d.age,
          d.userName ? d.userName : "default",
          d.passwordd ? d.passwordd : "default",
          d.sex,
          d.imagePath,
          d.phoneNumber,
          d.region,
          d.woredaOrSubcity,
          d.ketenaOrGott,
          d.kebele,
          d.houseNumber,
          d.registrationDate.replace(/-/g, "/").split("T")[0],
        ],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log("patient is restored");
          }
        }
      );
    });
  }

  //################################# patient comment ##############################
  if (req.body.patientcomment.length > 0) {
    deleteTable("patientcomment");
    req.body.patientcommnet.map((d) => {
      let signIn = `insert into patientComment (comId,MRN ,department  ,patientComment  ,email  ,commentDate,commentStatus) values(?,?,?,?,?,?,?)`;
      db.query(
        signIn,
        [
          d.comId,
          d.MRN,
          d.department,
          d.patientComment,
          d.email,
          d.commentDate.replace(/-/g, "/").split("T")[0],
          d.commentStatus,
        ],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log("patient  comment restored....");
          }
        }
      );
    });
  }

  //################################# patient history ##############################
  if (req.body.patienthistory.length > 0) {
    deleteTable("patienthistory");
    req.body.patienthistory.map((d) => {
      let payBill =
        "INSERT INTO patientHistory (pHisId,MRN  ,docId ,descriptionn, historyDate) VALUES(?,?,?,?,?)";
      db.query(
        payBill,
        [
          d.pHisId,
          d.MRN,
          d.docId,
          d.descriptionn,
          d.historyDate.replace(/-/g, "/").split("T")[0],
        ],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log("patient history restored....");
          }
        }
      );
    });
  }

  //###################### referd in ##########################
  if (req.body.referin.length > 0) {
    deleteTable("referIn");
    req.body.referin.map((r) => {
      console.log(r);
      let referIn =
        "INSERT INTO referIn (rInId,MRN,recId,referedBy,rInStatus,referReason,fromHospital,referInDate) VALUES(?,?,?,?,?,?,?,?)";
      db.query(
        referIn,
        [
          r.rInId,
          r.MRN,
          r.recId,
          r.referedBy,
          r.rInStatus,
          r.referReason,
          r.fromHospital,
          r.referInDate.replace(/-/g, "/").split("T")[0],
        ],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log("refered in restored....");
          }
        }
      );
    });
  }

  //################################# payment ##############################
  if (req.body.payment.length > 0) {
    deleteTable("payment");
    req.body.payment.map((d) => {
      let payBill =
        "INSERT INTO payment (payId,MRN,casherId,docId  ,recOffId,sFee ,price , paymentDate, priceStatus ,assignedRoom,diagnosisStatus ) VALUES(?,?,?,?,?,?,?,?,?)";
      db.query(
        payBill,
        [
          d.payId,
          d.MRN,
          d.casherId,
          d.docId,
          d.recOffId,
          d.sFee,
          d.price,
          d.paymentDate.replace(/-/g, "/").split("T")[0],
          d.priceStatus,
          d.assignedRoom,
          d.diagnosisStatus,
        ],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            backupHandler("payment");
            console.log("payment restored....");
          }
        }
      );
    });
  }

  //################################# priscription ##############################
  if (req.body.priscription.length > 0) {
    deleteTable("priscription");
    req.body.priscription.map((d) => {
      const addPriscrption = `INSERT INTO priscription (presId,MRN,DoctorId,DrugName,Quantity,Frequency,PharmasistId,PriscriptionDate,DispenseStatus,description,casherId,queueStatus,price,priceStatus,paymentDate,dipanseDate)
     VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
      db.query(
        addPriscrption,
        [
          d.presId,
          d.MRN,
          d.DoctorId,
          d.DrugName,
          d.Quantity,
          d.Frequency,
          d.PharmasistId,
          d.PriscriptionDate.replace(/-/g, "/").split("T")[0],
          d.DispenseStatus,
          d.description,
          d.casherId,
          d.queueStatus,
          d.price,
          d.priceStatus,
          d.paymentDate.replace(/-/g, "/").split("T")[0],
          d.dipanseDate.replace(/-/g, "/").split("T")[0],
        ],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log("priscription restored....");
          }
        }
      );
    });
  }

  //###################### referd out ##########################
  if (req.body.referout.length > 0) {
    deleteTable("referout");
    req.body.referout.map((d) => {
      let referOut =
        "INSERT INTO referOut  (rOutId,MRN,docId,referReason,toHospital,referDate) VALUES(?,?,?,?,?,?)";
      db.query(
        referOut,
        [
          d.rOutId,
          d.MRN,
          d.docId,
          d.referReason,
          d.toHospital,
          d.referDate.replace(/-/g, "/").split("T")[0],
        ],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log("refered out restored....");
          }
        }
      );
    });
  }
  //################################ service list ######################
  if (req.body.servicelist.length > 0) {
    deleteTable("servicelist");
    req.body.servicelist.map((d) => {
      let addService = `insert into serviceList  (serviceFee  ,price,serviceType) values(?,?,?);`;
      db.query(
        addService,
        [d.serviceFee, d.price, d.serviceType],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log("service list restored....");
          }
        }
      );
    });
  }
  res.status(201).send("data restored successfully");
});

app.listen(3001, () => {
  console.log("running on 3001");
});

app.get("/", (req, res) => {
  res.send("hello worlssdd");
});
