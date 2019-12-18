var bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
var express = require("express");
var router = express.Router();
const nodemailer = require("nodemailer");
const session = require("express-session");
const mongoose = require("mongoose");
const mongoDB = "mongodb://127.0.0.1:27017/Demo";
const multer = require('multer');
const upload = multer({ dest: './uploads' });
const path= require('path');
const fs=require('fs');


router.use(upload.any());
mongoose.connect(mongoDB);

//  mongoose 连接

const blogSchema =new mongoose.Schema({
  theme:String
});
let blog = mongoose.model("blogs", blogSchema);


router.post('/getBlog',jsonParser,(req,res) => {
  console.log('ok');
    let page = req.body.page;
    let theme = req.body.msg;
    let totalData ;
    console.log(theme);
    if(theme == "精华"|| theme.indexOf("所有随笔")!=-1){
      blog.find(function (err,response) {
        if(err){
          console.log(err)
        }
        totalData = response.length;
        response = response.slice((page-1)*10,page*10);
        res.json({msg:response,totalData:totalData})
      })
    }else{
      blog.find({
        theme:theme
      },function (err,response) {
        if(err){
          console.log(err)
        }
        totalData = response.length;
        response = response.slice((page-1)*10,page*10);
        res.json({msg:response,totalData:totalData})
      })
    }
});

router.post('/gethtml',jsonParser,function (req,res) {
  console.log(req.cookies.userName)
  let id = req.body.msg;
  console.log(id,"sdadas");
  blog.find({
    URL:id
  },(error,response)=>{
    if(error){
      console.log(error)
    }
    res.json({msg:response})
  })
});

router.post('/uploads',function (req,res) {
  console.log("ok");

  console.log(req.headers.smail);

  const newname=req.files[0].path+path.parse(req.files[0].originalname).ext;
  console.log(path.parse(req.files[0].originalname).ext);
  fs.rename(req.files[0].path,"./uploads/"+req.headers.smail+'_images'+'.png',function(err){
    if(err){
      res.send('上传失败')
    }else{
      res.json({
        msg:"success",
        code:200
      })
    }
  })
})

module.exports = router;
