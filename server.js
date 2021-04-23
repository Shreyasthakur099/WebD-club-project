const dotenv = require("dotenv");
const express = require("express");
const app = express();
const path = require("path");
dotenv.config({ path: "./config.env" });

const auth = require("./server/router/auth");
require("./server/db/connection");
// const User = require("./server/db/userSchema");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

const PORT = process.env.PORT || 3000;

app.use( '/',express.static(__dirname +'/public'));

// we link the router files to make our route easy
// app.use('/',require("./server/router/auth"));

app
  .get('/' , (req,res) => {
  res.sendFile( path.join(__dirname+'/public/html/index.html'))})
  .get('/register', auth)
  .post('/studentlogin', auth)
  .get('/feedback' , auth)

  
app.listen(PORT, () => {
  console.log(`server is runnig at port no ${PORT}`);
});
