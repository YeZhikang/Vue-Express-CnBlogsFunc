const express = require("express");
const cors = require('cors');
const app = express();
const session = require("express-session");
const cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const path = require("path");


const upload = multer({ dest: './uploads/' });

app.use(cookieParser('session'));
app.use(cookieParser());
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'uploads')));
app.use('/', express.static('uploads'));


const opt = {
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: {maxAge: 60000 }
};
app.use(session(opt));

var user = require('./user');
var routerblogs = require('./blogs');
app.use(cors({
  origin:['http://127.0.0.1:8080'],
  methods:['GET','POST'],
  credentials: true
}));


app.use('/user', user);
app.use('/blogs', routerblogs);
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
app.use(cors);



app.post('/',function (req,res) {
  console.log("ok");
  res.json({msg:"connection is succeed"})
});

app.post('/uploads', function (req, res) {
  console.log("ok");
  res.send("ok")

});



app.listen(3000, res => {
  console.log("port 3000 is listened")
});

