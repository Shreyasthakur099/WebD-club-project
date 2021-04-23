const express = require("express");
const router = express.Router();
require("../db/connection");
const User = require("../db/userSchema");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/',express.static('./public'));

router.get("/", (req, res) => {
  // console.log(req.url);
  // res.send(`Home Page`);
  res.status(200).sendFile(__dirname +'../../public/html/index.html');
});


router.get("/register", (req, res) => {
    let designation = req.query.user;
    if(designation=="student"){
      res.status(200).sendFile(path.join(__dirname +'../../../public/html/student.html'))
    }else{
      res.status(200).sendFile(path.join(__dirname +'../../../public/html/admin_login.html'))
    }
});


router.get("/feedback", (req, res) => {
  res.sendFile(path.join(__dirname +'../../../public/html/feedback.html'))
});


router.get("/result", (req, res) => {
  res.send(`Result Page`);
});


router.get("/admin", (req, res) => {
  res.send(`Admin Page`);
});
// ------------POST feedback--------------
router.post("/feedback", (req, res) => {
  console.log(req.body);
});
//----------POST student login data---------
router.post("/studentlogin", (req, res) => {
  const { name, email, enrollment, department, semester, course, session } = req.body;

  if (!name || !email || !enrollment || !department || !semester || !session || !course) {
    res.status(422).send({ error: "Please Fill all the field" });
    return;
  }
  
  User.findOne({ enrollment: enrollment }).then((userExist) => {
    if (userExist) {
      res.status(422).json({ error: "User Already Exist" });
      return;
    }
    //new student
  var user = new User({
      name :req.body.name,
      enrollment :req.body.enrollment,
      email :req.body.email,
      course : req.body.course,
      session:req.body.session,
      department :req.body.department,
      semester :req.body.semester,
      
  })
    // save student data to db
   user.save().then(() => {
        res.redirect('/feedback');
        res.status(201).json({ message: "User Registered Sucessfully" });
        
      }).catch((err) => {
        res.status(500).json({ error: "Failed To Register User" });
        console.log(err);
      });
  });
});


module.exports = router;
