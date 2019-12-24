var express = require("express");
var router = express.Router();
const nodemailer = require("nodemailer");
const session = require("express-session");
var bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const mongoose = require("mongoose");

Array.prototype.remove = function (val) {
  if(!this){
    return null
  }else{
    for(let i = 0;i<this.length;i++){
      if(this[i] == val){
        return this.splice(i,1);
      }
    }
  }
};

// 制造随机 URL
const getRandom = () => {
  let date = new Date()
  let randomNum = Math.floor(Math.random()*10000).toString();
  let URL = date.getTime().toString()+randomNum;
  return URL;
};

// 获取当前时间
const getTime = () => {
  let date = new Date();
  let time = date.toLocaleString();
  return time;
};

//  mongoose 连接
mongoose.connect("mongodb://127.0.0.1:27017/Demo");
/*
    Schema 集合
 */
const questionSchema = mongoose.Schema({
    answerNumber:Number,
    text:String,
    tags:Array,
    title:String,
    time:String,
    author:String,
    URL:String
});

const adminSchema = mongoose.Schema({
    userName:String,
    time:String,
    from:String
});

const hcSchema = mongoose.Schema({
    title:String,
    author:String,
    tags:Array,
    time:String,
    need:Number,
    text:String,
    URL:String,
    category:String,
    salary:String,
});

const jdSchema = mongoose.Schema({
    title:String,
    author:String,
    tags:Array,
    time:String,
    text:String,
    URL:String,
    category:String,
    salary: String
});

const topicSchema = mongoose.Schema({
    time:String,
    author:String,
    title:String,
    text:String,
    group:String,
    view:Number,
    newEcho:String,
    echo:Number,
    topicId:String,
    html:String
});

let Topic = function (author,title,text,group,html) {
  this.time = getTime();
  this.author = author;
  this.title = title;
  this.text = text;
  this.group = group;
  this.view = 0;
  this.newEcho = "无人";
  this.echo = 0;
  this.html = html;
  this.topicId = "t"+getRandom();
};

const groupSchema = mongoose.Schema({
  time:String,
  author:String,
  title:String,
  text:String,
  groupNumber:Number,
  groupPopular:Number,
  groupId:String,
  types:Array,
  isOpen:Boolean,
  member:Array
});

let Group = function (author,title,text,types,isOpen) {
  this.time = getTime();
  this.author = author;
  this.title = title;
  this.text = text;
  this.groupNumber = 1 ;
  this.groupPopular = 1;
  this.groupId = 'g'+getRandom();
  this.isOpen = isOpen;
  this.types = types;
  this.member = [];
}

const userSchema = mongoose.Schema({
  email:String,
  password:String,
  userName:String,
  userFocusList: Array,
  behavor:Number
});

const mailSchema = mongoose.Schema({
  from:String,
  to:String,
  text:String,
  time:String,
  title:String,
  seen:String,
  newId:String
});


const blogSchema = mongoose.Schema({
  title:String,
  html:String,
  time:String,
  author:String,
  URL:String,
  commentNum:Number,
  likeNum:Number,
  theme:String,
  text:String
});

const mindSchema = mongoose.Schema({
  text:String,
  author:String,
  applaud:Number,
  tags: Array,
  time:String,
  isOpen:Boolean
});

const relationSchema = mongoose.Schema({
  followed:String,
  fan:String,
  time:String
})

let Relation = function (followed,fan,time) {
  this.followed = followed;
  this.fan = fan;
  this.time = getTime()
}

const commentSchema = mongoose.Schema({
  text:String,
  author:String,
  isQuestion:Boolean,
  isBlog:Boolean,
  isTopic:Boolean,
  topicId:String,
  questionId:Number,
  blogId:Number,
  time:String,
});

let comment = mongoose.model("comment",commentSchema)
let user = mongoose.model("user", userSchema);
let mail = mongoose.model("mail",mailSchema);
let blog = mongoose.model("blog",blogSchema);
let mind = mongoose.model("mind",mindSchema);
let question = mongoose.model('question',questionSchema);
let relation = mongoose.model('relation',relationSchema);
let group = mongoose.model('group',groupSchema);
let topic = mongoose.model('topic',topicSchema);
let hc = mongoose.model("hc",hcSchema);
let jd = mongoose.model("jd",jdSchema);
let admin = mongoose.model("admin",adminSchema);

var transporter = nodemailer.createTransport({
  host: 'smtp.qq.com',
  service: 'qq',
  secure: true,
  // 我们需要登录到网页邮箱中，然后配置SMTP和POP3服务器的密码
  auth: {
    user: '2433989458@qq.com',
    pass: 'rshcmkikafwkeagg'
  }
});

router.get('/checkEmail',function (req,res) {
  res.send("ok")
})
//  email 发送
router.post('/checkEmail',jsonParser,function (req,res) {
  function makeNumber(){
    let i =0;
    let number = "";
    for(i;i<6;i++){
      let randomNum = Math.floor(Math.random()*9+1);
      number = number + randomNum.toString();
    }
    return number;
  }
  const emailAddress = req.body.data;
  const number = makeNumber();
  let html = `
      <div>您的验证码是：</div> <h1>
    `+ number+`</h1>`;

  req.session.email = number;
  var mailOptions = {
    // 发送邮件的地址
    from: '2433989458@qq.com', // login user must equal to this user
    // 接收邮件的地址
    to: emailAddress,  //
    // 邮件主题
    subject: '请查收验证码',
    // 以HTML的格式显示，这样可以显示图片、链接、字体颜色等信息
    html: html
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }
    res.status(200).json({message: "succeed"});
    console.log('Message sent: ' + info.response);
  });
});

//  注册并存入数据库操作
router.post('/register',jsonParser,function (req,res) {
  const information = req.body;
  console.log(req.session.email);
  const userName = information.userName;
  const password = information.password;
  const email = information.email;
  const check = information.check;
  console.log(check);
  console.log(req.session.email);
  if(check != req.session.email){
    res.json({errorMsg:"wrong"})
  }else{
    user.find({userName:userName},
      function(err, response){
        if(response.length == 0){
          var newUser = new user({
            userName:userName,
            email: email,
            password: password,
            userFocusList:[],
            behavor:0
          });
          newUser.save(function(err, user){
            if(err)
              res.json({message:"failed"});
            else
              res.json({message:"succeed"});
          })
        }else{
          res.json({message:"该用户名已经存在"})
        }
      });
  }
});

/*
  关系处理
 */
router.post('/relationdeal',jsonParser,(req,res) => {
  console.log(req);
  let fan = req.cookies.userName;
  let followed = req.body.to;
  if(req.body.way){
    let followed = req.body.to;
    let relations = new Relation(followed,fan);
    let newRelation = new relation(relations);
    newRelation.save((err,docs) => {
      if(err){
        console.log(err)
        res.json({
          msg:"error"
        })
      }else{
        res.json({
          code:200,
          msg:"解除关注成功"
        })
      }
    })
  }else{
    relation.remove({
      followed:followed,
      fan:fan
    },(err,docs) => {
      if(err){
        console.log(err)
        res.json({
          msg:"error"
        })
      }else{
        res.json({
          code:200,
          msg:"解除关注成功"
        })
      }
    })
  }
})

/*
  处理关系
 */
router.post('/getrelation',jsonParser,(req,res)=>{
  console.log('getrelation');
  let userName = req.body.userName == null ? req.cookies.userName : req.body.userName;
  console.log(userName)
  const theme = req.body.theme;
  if(theme === "我关注的人"){
    relation.find({
      fan:userName
    },(error, docs) => {
      if(error){
        console.log(err)
        res.json({
          msg:"error"
        })
      }else{
        res.json({
          code:200,
          data:docs
        })
      }
    })
  }else if(theme === "我的粉丝"){
    relation.find({
      followed:userName
    },(error, docs) => {
      if(error){
        console.log(err)
        res.json({
          msg:"error"
        })
      }else{
        res.json({
          code:200,
          data:docs
        })
      }
    })
  }
  /*

    module less:
    缺少小组板块


   */
});


router.post('/questioninfo',jsonParser,(req,res)=>{
  const URL = '/questions/'+req.body.id.toString();
  console.log('get question',URL)
  question.findOne({
    URL:URL
  },(error, docs)=>{
    if(error){
      res.json({
        errMsg:"unexpected error in DB"
      })
    }else{
      res.json({
        data:docs,
        code:200
      })
    }
  })
});

router.post('/topiccomentinfo',jsonParser,(req,res)=>{
  console.log('commentinfo');
  const URL = req.body.id;
  comment.find({
    topicId:req.body.id
  },(error, docs)=>{
    if(error){
      res.json({
        errMsg:"unexpected error in DB"
      })
    }else{
      res.json({
        data:docs,
        code:200
      })
    }
  })
});

router.post('/commentinfo',jsonParser,(req,res)=>{
  console.log('commentinfo');
  const URL = '/questions/'+req.body.id.toString();
  console.log('get question',URL)
  comment.find({
    questionId:req.body.id
  },(error, docs)=>{
    if(error){
      res.json({
        errMsg:"unexpected error in DB"
      })
    }else{
      res.json({
        data:docs,
        code:200
      })
    }
  })
});

router.post('/search',jsonParser,(req,res) => {
  console.log('/search');
  let theme = req.body.theme;
  let data = req.body.data;
  if(theme === 'user'){
    user.findOne({
      userName:data
    },(error, docs) => {
      if(error){
        console.log(error);
        res.json({
          errMsg:"No such a User"
        })
      }else{
        if(!docs){
          res.json({
            errMsg:'error'
          })
        }else {
          res.json({
            code: 200,
            docs: docs
          })
        }
      }
    })
  }else if(theme === 'question'){
    question.find({
      $or: [
        {text: {$regex: data}},
        {title:{$regex: data}}
      ]
    },(error, docs) => {
      if(error){
        console.log(error);
        res.json({
          errMsg:"No such a resultQuery"
        })
      }else{
        if(!docs){
          res.json({
            errMsg:'error'
          })
        }else {
          res.json({
            code: 200,
            docs: docs
          })
        }
      }
    })
  }else if(theme === "all"){
    let result = [];
    user.findOne({
      userName:data
    },(error, docs) => {
      if(error){
        console.log(error);
      }else{
        if(!docs){
        }else {
          result.push({user:docs});
          question.find({
            $or: [
              {text: {$regex: data}},
              {title:{$regex: data}}
            ]
          },(error, docs) => {
            if(error){
              console.log(error);
            }else{
              if(!docs){
              }else {
                result.push({question:docs});
                blog.find({
                  $or: [
                    {text: {$regex: data}},
                    {title:{$regex: data}}
                  ]
                },(error, docs) => {
                  if(error){
                    console.log(error);
                  }else{
                    if(!docs){
                    }else {
                      result.push({blog:docs});
                      res.json({
                        data:result,
                        code:200
                      })
                    }
                  }
                })
              }
            }
          })
        }
      }
    })
  }
});


router.post('/setcomment',jsonParser,(req,res) => {
  console.log('setcomment');
  const commentText = req.body.comment;
  const time = getTime();
  const author = req.cookies.userName;
  const topicId = req.body.id;
  console.log(topicId);
  const newComment = new comment({
    text:commentText,
    author:author,
    isBlog:false,
    isQuestion:false,
    questionId:null,
    blogId:null,
    isTopic:true,
    topicId:topicId,
    time:time
  });
  console.log(newComment);
  newComment.save((error,docs) => {
    if(error){
      res.json({
        errMsg:"error"
      })
    }else{
      topic.findOne({
        topicId:topicId
      },(err,docs) => {
        let echo = docs.echo;
        topic.updateOne({
          topicId:topicId
        },{echo: echo+1},(err,docs) =>{
          if(err) {
            console.log(err)
          }else {
            res.json({
              code: 200,
              msg: "success"
            })
          }
        })
      })
    }
  })
});

router.post('/sendcomment',jsonParser,(req,res) => {
  console.log('sendcomment');
  const commentText = req.body.comment;
  const time = getTime();
  const author = req.cookies.userName;
  const questionId = req.body.id;
  const newComment = new comment({
    text:commentText,
    author:author,
    isBlog:false,
    isQuestion:true,
    questionId:questionId,
    blogId:null,
    time:time
  });
  newComment.save((error,docs) => {
    if(error){
      res.json({
        errMsg:"error"
      })
    }else{
      question.findOne({
        URL:'/questions/'+questionId
      },(err,docs) => {
        let ansNum = docs.answerNumber;
        question.updateOne({
          URL:'/questions/'+questionId
        },{answerNumber: ansNum+1},(err,docs) =>{
          if(err) {
            console.log(err)
          }else {
            res.json({
              code: 200,
              msg: "success"
            })
          }
        })
      })
    }
  })
});

/*
  关注问题列表
 */
router.post('/isfocus',jsonParser,(req,res) => {
  let main = req.body.main;
  console.log(main.URL);
  let userName = req.cookies.userName
  user.findOne({
    userName:userName
  },(error,docs) => {
    if(error){
      console.log(error)
    }else{
      let userFocusList = docs.userFocusList;
      for(let word = 0;word<userFocusList.length;word++){
        if(userFocusList[word].URL === main.URL){
          console.log("have one")
          res.json({
            code:200,
            isFocus:true
          });
          return
        }
      }
    }
  })
});
router.post('/isfocususer',jsonParser,(req,res) => {
  let fan = req.cookies.userName;
  let followed = req.body.userName;
  relation.find({
    fan:fan,
    followed:followed
  },(error,docs) => {
    if(error){
      console.log("error")
    }else{
      if(docs.length === 0){
        res.json({
          isFocus:false
        })
      }else{
        res.json({
          isFocus:true
        })
      }
    }
  })
})
router.post('/getfocuslist',jsonParser,(req,res) => {
  let userName = req.cookies.userName;
  let focusList;
  user.find({
    userName: userName
  },(error,docs) => {
    if(error){
      console.log(error)
    }else{
      if(!docs.userFocusList){
        res.json({
          code:200,
          focusList:[]
        })
      }else{
        focusList = docs.userFocusList;

      }
    }
  })
})

router.post('/focus',jsonParser,(req,res) => {
  let focus = req.body.unfocus;
  let main = req.body.main;
  let userName = req.cookies.userName;
  console.log('ok')
  if(!focus){
    user.findOne({
      userName:userName
    },(error, docs) => {
      let userFocusList = docs.userFocusList;
      userFocusList.push(main);
      user.updateOne({
        userName:userName
      },{
        userFocusList:userFocusList
      },(err,docs) => {
        if(err){
          res.json({
            errMsg:"unexpected error"
          })
        }else{
          res.json({
            code:200
          })
        }
      })
    })
  }else{
    user.findOne({
      userName:userName
    },(error, docs) => {
      let URL = main.URL;
      let userFocusList = docs.userFocusList;
      for(let i = 0;i<userFocusList.length;i++){
        if(userFocusList[i].URL === URL){
          userFocusList.splice(i,1);
          console.log(userFocusList)
        }
      }
      user.updateOne({
        userName :userName
      },{
        userFocusList: userFocusList
      },(err,docs) => {
        if(err){
          res.json({
            errMsg:"unexpected error"
          })
        }else{
          res.json({
            code:200,
            msg:"ok"
          })
        }
      })
    })
  }
})

router.get('/getfocuslist',(req,res) => {
  let userName = req.cookies.userName;
  user.findOne({
    userName:userName
  },(error,docs) => {
    if(error){
      res.json({
        code:500
      })
    }else{
      let focusList = docs.userFocusList;
      console.log(focusList)
      res.json({
        focusList:focusList
      })
    }
  })
})
router.get('/pop',jsonParser,function (req,res) {

  req.cookies.userName = undefined;
    req.session.userName = undefined;
    res.json({msg:"succeed"});

});

//  登陆操作
router.post('/login',jsonParser,function (req,res) {
    let information = req.body;
    let userName = information.userName;
    let password = information.password;
    user.find({userName:userName,password:password},(err, response) =>{
      if(response.length == 1){
        res.cookie("userName",userName);
        req.session.userName = userName;
        res.json({msg:"success"})
      }else{
        res.json({msg:"not found"})
      }
    })
});

router.post('/getactive',jsonParser,(req,res) => {
  const theme = req.body.msg;
  let actives = [];
  let author;
  if(req.body.userName != null) {
    author = req.body.userName
  }else{
    author = req.cookies.userName
  }
  if(theme === "我的"){
      blog.find({
      author:author
    },(error, docs) => {
      if(error){
        console.log(error)
      }else{
        actives.push(...docs);
        comment.find({
          author:req.cookies.userName
        },(error,docs) => {
          if(error){
            console.log(error)
          }else{
            actives.push(...docs)
            mind.find({
              author:req.cookies.userName
            },(error,docs) => {
              if(error){
                console.log(error)
              }else{
                actives.push(...docs)
                question.find({
                  author:req.cookies.userName
                },(error,docs) => {
                  if(error){
                    console.log(error)
                  }else{
                    actives.push(...docs);
                    console.log(actives);
                    res.json({
                      active:actives.slice(-10).reverse(),
                      code:200
                    })
                  }
                })
              }
            })
          }
        })
      }
    })
  }
  else{
    blog.find((error, docs) => {
      if(error){
        console.log(error)
      }else{
        actives.push(...docs);
        comment.find((error,docs) => {
          if(error){
            console.log(error)
          }else{
            actives.push(...docs)
            mind.find((error,docs) => {
              if(error){
                console.log(error)
              }else{
                actives.push(...docs)
                question.find((error,docs) => {
                  if(error){
                    console.log(error)
                  }else{
                    actives.push(...docs)
                    res.json({
                      active:actives.slice(actives.length-10,actives.length).reverse()
                    })
                  }
                })
              }
            })
          }
        })
      }
    })
  }

})

router.get('/getUserInfo',jsonParser,function (req,res) {
    let userName = req.cookies.userName;
    if(!userName){
      res.json({
        msg:"no user"
      })
      return;
    }
    user.findOne({
      userName:userName
    },(error,user) => {
      if(error){
        res.json({userName:userName,err:"unexpected error"})
      }else{
        res.json({
          userName:userName,
          user:{
              userName:userName,
              email:user.email,
              password:user.password
        }})
      }
    });
});

router.post('/getnews',jsonParser,(req,res) => {
    let method = req.body.msg;

    console.log(method);
    if(method == "收件箱"){
      mail.find({
        to:req.cookies.userName
      },(error,docs)=>{
        if(error){
          console.log(error)
        }
        console.log(docs);
        res.json({msg:docs})
      })
    }else if(method == "发件箱"){
      mail.find({
        from:req.cookies.userName
      },(error,docs) => {
        if(error){
          console.log(error)
        }
        console.log(docs);
        res.json({msg:docs})
      })
    }else if(method == "未读消息"){
      mail.find({
        seen:'0',
        to:req.cookies.userName
      },(error,docs)=>{
        res.json({msg:docs})
      })
    }
})

router.post('/readnews',jsonParser,(req,res)=>{
    let _uid = req.body.msg;
    console.log(_uid);
    mail.updateOne({from:'Admin'},{seen:'1'},function (error,doc) {
      if(error){
        console.log(error);

      }
      console.log(doc);
      res.json({msg:"success"})
    })
});

router.post('/postblog',jsonParser,(req,res) => {
  let title = req.body.title;
  let html = req.body.html;
  let theme = req.body.theme;
  let text = req.body.text;
  let date = new Date();
  let randomNum = Math.floor(Math.random()*10000).toString();
  let URL = date.getTime().toString()+randomNum;
  let author = req.cookies.userName;
  let time = date.toLocaleString();
  const newBlog = new blog({
    title:title,
    html:html,
    time:time,
    author:author,
    URL:URL,
    commentNum:0,
    likeNum:0,
    theme:theme,
    text:text
  });
  newBlog.save((error,response) => {
    if(error){
      console.log(error)
    }
    res.json({msg:response})
  });

});


router.post('/sendmail',jsonParser,(req,res) =>{
    let form = req.body.msg;
    let to = form.to;
    let from = req.cookies.userName;
    let text = form.text;
    let title = form.title;
    let time = new Date()
    let randomNum = Math.floor(Math.random()*10000).toString();
    console.log(to,from);
    user.find({
      userName:to
    },(error,response)=>{
      if(error){
        console.log(error)
      }
      console.log(response);
      if(response.length==0){
        res.json({msg:"no user"})
      }else{
        const newMail = new mail({
          from:from,
          to:to,
          text:text,
          title:title,
          time:time.toLocaleString(),
          seen:'0',
          newId:time.getTime().toString()+randomNum
        });
        newMail.save(function(err, mail){
          if(err)
            res.json({message:"failed"});
          else
            res.json({message:"succeed"});
        })
      }
    })
});

router.post('/question',jsonParser,(req,res)=>{
  let newQuestion = new question(req.body.data);
  let date = new Date();
  newQuestion.URL = '/questions/'+getRandom();
  newQuestion.time = date.toLocaleString();
  console.log(newQuestion);
  newQuestion.save((error, response)=>{
    if(error){
      res.json({
        err:'unexpected error'
      })
    }else{
      res.json({
        code:200
      })
    }
  })
})

router.post('/mind',jsonParser,(req,res) => {
    const Mind = req.body.data;
    const newMind = new mind(Mind);
    let date = new Date();
    newMind.time = date.toLocaleString();
    newMind.save( (error, response) => {
        if(error){
          console.log(error);
          res.json({
            code:500,
            errMsg:'Error in saving in DB'
          })
        }else{
          res.json({
            code:200,
            message:"succeed"
          })
        }
    });
});

router.post('/getquestion',jsonParser,(req,res) => {
  const theme = req.body.msg;
  console.log(theme);
  if(theme == "我的博问") {
    question.find({
      author:req.cookies.userName
    },(err,docs) => {
      if(err){
        console.log(err)
        res.json({
          msg:"unexpected error"
        })
      }else{
        console.log(docs);
        res.json({
          code:200,
          data:docs
        })
      }
    })
  }else if(theme == "问题列表"){
    question.find((err,docs) => {
      if(err){
        console.log(err);
        res.json({
          msg:"unexpected error"
        })
      }else{
        console.log(docs);
        res.json({
          code:200,
          data:docs
        })
      }
    })
  }
});

router.post('/getcommandtopics',jsonParser,(req,res)=>{
  topic.find((error,docs)=>{
    console.log(docs);
    res.json({
      code:200,
      data:docs
    })
  })
});

router.post('/adminDelete',jsonParser,(req,res) => {
    let data = req.body.data;
    /*
    判断 data 类型
     */
    if(data.commentNum != null){
      blog.remove({
        URL:data.URL
      },(error,docs) => {
        if(error){
          console.log(error)
        }else{
          res.json({
            code:200,
            msg:"ok"
          })
        }
      })
    }else if(data.isQuestion != null && data.isBlog != null){
      let URL = data.questionId ? data.questionId : data.blogId;
      comment.remove({
        URL: URL
      },(error,docs) => {
        if(error){
          console.log(error)
        }else{
          res.json({
            code:200,
            msg:"ok"
          })
        }
      })
    }else if(data.answerNumber != null){
      question.remove({
        URL:data.URL
      },(error,docs) => {
        if(error){
          console.log(error)
        }else {
          res.json({
            code: 200,
            msg: "ok"
          })
        }
      })
    }else if(data.topicId != null){
      topic.remove({
        topicId: data.topicId
      },(error,docs) => {
        if(error){
          console.log(error)
        }else {
          res.json({
            code: 200,
            msg: "ok"
          })
        }
      })
    }else if(data.applaud != null){
      mind.remove({
        time:data.time,
        author:data.author
      },(error,docs) => {
        if(error){
          console.log(error)
        }else {
          res.json({
            code: 200,
            msg: "ok"
          })
        }
      })
    }
})

router.get('/isAdmin',jsonParser,(req,res) => {
  let userName = req.cookies.userName;
  admin.find({
    userName:userName
  },(error,docs) => {
    if(error){
      console.log(error)
    }else{
      if(docs.length === 0 && userName !== "Admin"){
        res.json({
          isAdmin:false,
          userName:userName
        })
      }else{
        res.json({
          isAdmin:true,
          userName:userName
        })
      }
    }
  })
});

router.get("/getAllActives",jsonParser,(req,res) => {
    let blogs = [];
    let minds = [];
    let questions = [];
    let comments = [];
    let hcs = [];
    let jds = [];
    let users = [];
    let topics = [];
    blog.find((error,docs) => {
      if(error){
        console.log(error)
      }else{
        blogs = docs;
        mind.find((error,docs)=>{
          if(error){
            console.log(error)
          }else{
              minds = docs;
              question.find((error,docs) => {
                if(error){
                  console.log(error)
                }else{
                  questions = docs
                  comment.find((error,docs)=>{
                    if(error){
                      console.log(error)
                    }else{
                      comments = docs;
                      hc.find((error,docs)=>{
                        if(error){
                          console.log(error)
                        }else{
                          hcs = docs
                          jd.find((error,docs) => {
                            if(error){
                              console.log(error)
                            }else{
                              jds = docs
                              user.find((error,docs) => {
                                if(error){
                                  console.log(error)
                                }else{
                                  users = docs
                                  topic.find((error,docs)=>{
                                    if(error){
                                      console.log(error)
                                    }else{
                                      topics = docs
                                      res.json({
                                        allData:{
                                          blogs:blogs,
                                          minds:minds,
                                          questions:questions,
                                          comments:comments,
                                          hcs:hcs,
                                          jds:jds,
                                          users:users,
                                          topics:topics
                                        }
                                      })
                                    }
                                  })
                                }
                              })
                            }
                          })
                        }
                      })
                    }
                  })
                }
              })
          }
        })
      }
    })
})



router.post('/sendtopic',jsonParser,(req,res) => {
    let title = req.body.title;
    let text = req.body.text;
    let html = req.body.html;
    let author = req.cookies.userName;
    let group = req.body.theme;
    let newTopic = new Topic(author,title,text,group,html);
    let aTopic = new topic(newTopic);
    aTopic.save((error, docs) => {
      if(error){
        console.log(error)
      }else{
        user.findOne({
          userName:req.cookies.userName
        },(err,docs) => {
          let behavor = docs.behavor;
          if(!behavor){
            user.update({
              userName:req.cookies.userName
            },{
              behavor: 1
            },(error,docs) => {
              if(error){
                console.log(error)
              }else{
                res.json({
                  code:200,
                  msg:'success'
                })
              }
            })
          }else{
            user.update({
              userName:req.cookies.userName
            },{
              behavor: behavor ++
            },(error, docs)=>{
              if(error){
                console.log(error)
              }else{
                res.json({
                  code:200,
                  msg:'success'
                })
              }
            })
          }
        })

      }
    })
})

router.post('/setgroup',jsonParser,(req,res) => {
  let groupInfo = req.body.group;
  groupInfo.author = req.cookies.userName;

  let aGroup = new Group(groupInfo.author,groupInfo.title,groupInfo.text,groupInfo.types,groupInfo.isOpen);
  aGroup.member = [req.cookies.userName];
  let newGroup = new group(aGroup);
  newGroup.save((error,docs) => {
    if(error){
      console.log(error)
    }else{
      res.json({
        code:200,
        msg:"success"
      })
    }
  })
});

router.post('/gettopic',jsonParser,(req,res) => {
  console.log('gettopic');
  const groupId =  req.body.groupId
  if(!groupId) {
    topic.find((error, docs) => {
      if (error) {
        console.log(error)
      } else {
        res.json({
          code: 200,
          totalData: docs.reverse()
        })
      }
    })
  }else{
    group.findOne({
      groupId:groupId
    },(error, docs) => {
      if(error){
        console.log(error)
      }else{
        let groupName = docs.title;
        topic.find({
          group:groupName
        },(error,docs) => {
          if(error){
            console.log(error)
          }else{
            res.json({
              code: 200,
              totalData: docs.reverse()
            })
          }
        })
      }
    })
  }
});

router.post('/getgroupdetail',jsonParser,(req,res)=>{
  let groupId = req.body.group;
  console.log(group)
  group.findOne({
    groupId:groupId
  },(error,docs)=>{
    if(error){
      console.log(error)
    }else{
      res.json({
        group:docs,
        isAdmin: req.cookies.userName === docs.author
      })
    }
  })
});



router.post('/getgroup',jsonParser,(req,res) => {
  const theme = req.body.theme;
  if(theme === "我的"){
    group.find({
      member:{$elemMatch:{$eq:req.cookies.userName}}
    },(error,docs) => {
      if(error) {
        console.log(error)
      }else{
        for(let i = 0;i<docs.length;i++){
          docs[i].groupNumber = docs[i].member.length;
        }
        res.json({
          groups:docs
        })
      }
    })
  }else{
    group.find((error,docs) => {
      if(error){
        console.log(error)
      }else{
        for(let i = 0;i<docs.length;i++){
          docs[i].groupNumber = docs[i].member.length;
        }
        res.json({
          groups:docs
        })
      }
    })
  }
});

router.post('/topicdetail',jsonParser,(req,res)=>{
  let id = req.body.topicId;
  topic.findOne({
    topicId:id
  },(error,docs)=>{
    if(error){
      console.log(error)
    }else{
      res.json({
        data:docs,
        code:200
      })
    }
  })
});

router.post('/joingroup',jsonParser,(req,res)=>{
  const groupId = req.body.group;
  console.log(groupId);
  group.update({
    groupId:groupId
  },{
    $addToSet:{
      member:req.cookies.userName
    }
  },(error,docs)=>{
    if(error){
      console.log(error)
    }else{
      res.json({
        code:200,
        data:"success"
      })
    }
  })
});

router.post('/searchtopic',jsonParser,(req,res)=>{
  const groupId = req.body.groupId;
  const topicName = req.body.topicName;
  console.log(topicName);
  group.findOne({
    groupId:groupId
  },(err,docs) => {
    if(err){
      console.log(err)
    }else{
      let groupName = docs.title;
      console.log(groupName)
      topic.find({
        title:{$regex:topicName},
        group:groupName
      },(err,docs)=>{
        if(err){
          console.log(err)
        }else{
          res.json({
            topics:docs
          })
        }
      })
    }
  })
})

router.post('/searchgroupmember',jsonParser,(req,res)=>{
  const groupMember = req.body.userName;
  const groupId = req.body.groupId;
  group.findOne({
    groupId:groupId
  },(error,docs)=>{
    if(error){
      console.log(error)
    }else{
      let member = docs.member;
      if(member.includes(groupMember)){
        res.json({
          member:groupMember
        })
      }else{
        res.json({
          wrong:"no user"
        })
      }

    }
  })
});

router.get('/getHistoryData',jsonParser,(req,res) => {
  console.log("haha")
  let userName = req.cookies.userName;
  let totalCount = [];
  let ideData = [];
  let behaviorData = [];
  let fansCount = 0;
  let followedCount = 0;
  let dateCount = [];
  let activeNumber = 0;
  let groupMember = 0;
  blog.find({
      author:userName
    },(error,docs) => {
    if(error){
      console.log(error)
    }else {
      totalCount.push(docs)
      behaviorData.push({
        name:"发博",
        value:docs.length
      })
      comment.find({
        author:userName
      },(error,docs) => {
        if(error){
          console.log(error)
        }else{
          totalCount.push(docs);
          behaviorData.push({
            name:"回答",
            value:docs.length
          })
          mail.find({
            from:userName
          },(error,docs) => {
            if(error){
              console.log(error)
            }else{
              totalCount.push(docs);
              behaviorData.push({
                name:"邮件",
                value:docs.length
              })
              mind.find({
                author:userName,
              },(error,docs) => {
                if(error){
                  console.log(error)
                }else{
                  behaviorData.push({
                    name:"想法",
                    value:docs.length
                  })
                  question.find({
                    author:userName
                  },(error,docs) => {
                    if(error){
                      console.log(error)
                    }else{
                      totalCount.push(docs);
                      behaviorData.push({
                        name:"问题",
                        value:docs.length
                      })
                      group.find({
                        author:userName
                      },(error,docs) => {
                        if(error){
                          console.log(error)
                        }else{
                          ideData.push({
                            name:"组长",
                            value:docs.length
                          });
                          docs.forEach(item => {
                            groupMember += item.member.length
                          })
                          group.find({
                            member:{$in:[userName]}
                          },(error,docs) => {
                            if(error){
                              console.log(error)
                            }else{
                              ideData.push({
                                name:"成员",
                                value:docs.length
                              });
                              docs.forEach(item => {
                                groupMember += item.member.length
                              });
                              relation.find({
                                $or:[
                                  { fan:userName },
                                  { followed:userName }
                                ]
                              },(error,docs) => {
                                if(error){
                                  console.log(error)
                                }else{
                                  console.log(docs)
                                  docs.forEach(item => {
                                    if(item.fan === userName) {
                                      fansCount += 1
                                    }
                                    if(item.followed === userName){
                                      followedCount += 1
                                    }
                                  })
                                  topic.find({
                                    author:userName
                                  },(error,docs) => {
                                    if(error){
                                      console.log(error)
                                    }else{
                                      activeNumber = docs.length*2;
                                      let DateMap = new Map();
                                      totalCount.forEach(sonBehavior => {
                                        sonBehavior.forEach(item => {
                                          let date = item.time.split(',')[0]
                                          if(DateMap.has(date)){
                                            let count = DateMap.get(date);
                                            count += 1;
                                            DateMap.set(date,count);
                                          }else{
                                            DateMap.set(date,1);
                                          }
                                        })
                                      });
                                      let keys = [];
                                      for(let key of DateMap.keys()){
                                        keys.push(key)
                                      }
                                      dateCount = keys;
                                      let totalRes = [];
                                      for(let date = 0;date<dateCount.length;date++){
                                        let res = DateMap.get(dateCount[date]);
                                        totalRes.push(res);
                                      }
                                      console.log(totalRes)
                                      totalCount = totalRes;
                                      user.findOne({
                                        userName:userName
                                      },(error,docs) => {
                                        if(error){
                                          console.log(error)
                                        }else{
                                          let FocusList = docs.userFocusList.length;
                                          console.log(FocusList);
                                          res.json({
                                            allData:{
                                              totalCount:totalCount,
                                              ideData:ideData,
                                              behaviorData:behaviorData,
                                              fansCount:fansCount,
                                              followedCount:followedCount,
                                              dateCount:dateCount,
                                              activeNumber:activeNumber,
                                              groupMember:groupMember,
                                              focusData:[fansCount,followedCount,FocusList]
                                            }
                                          })
                                        }
                                      })
                                    }
                                  })
                                }
                              })
                            }
                          })
                        }
                      })
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
  })
});

router.post('/setAdmin',jsonParser,(req,res)=>{
    let user = req.body.user;
    let newAdmin = new admin({
      userName:user.userName,
      time:getTime(),
      from:req.cookies.userName
    })
    newAdmin.save((error,docs) => {
      if(error){
        console.log(error);
        res.json({
          code:500,
          msg:"error"
        })
      }else{
        res.json({
          code:200,
          msg:"success"
        })
      }
    })
})

router.get('/getcommand',(req,res) => {
  console.log("okkk");
    let blogList = new Array(5);
    let allBlog = null;
    blog.find((error,docs)=>{
      if(error){
        console.log(error)
      }else{
        allBlog = docs
      }
    }).then(() => {
      let mostLike = 0;
      let mostComment = 0;
      let total = 0;
      allBlog.forEach((item)=>{
        console.log(item)
        if(item.likeNum >= mostLike){
          blogList[1] = item;
          mostLike = item.likeNum
        }
        if(item.commentNum >= mostComment){
          blogList[2] = item;
          mostComment = item.commentNum;
          }
        if((item.commentNum + item.likeNum) >= total ){
          blogList[0] = item;
          blogList[3] = item;
          blogList[4] = item;
        }
      })
      console.log(blogList)
      res.json({
        code:200,
        blogs:blogList
      })
    });

})

router.get('/gethclist',(req,res)=>{
  hc.find((error,docs)=>{
    if(error){
      console.log(error)
    }else{
      res.json({
        hcs:docs,
        code:200
      })
    }
  })
});

router.post('/getfindres',jsonParser,(req,res) => {
  let text = req.body.text;
  console.log(text);
  let container = [];
  blog.find({
    $or:[
      {title: { $regex: text }},
      {text: { $regex: text}}
    ]
  },(error,docs) => {
    if(error){
      console.log(error)
    }else{
      container.push(...docs)
      if(container.length > 5){
        res.json({
          data:container.slice(0,5)
        })
      }else{
        question.find({
          $or:[
            {title: { $regex: text }},
            {text: { $regex: text}}
          ]
        },(error,docs) => {
          if(error){
            console.log(error)
          }else{
            container.push(...docs)
            if(container.length > 5){
              res.json({
                data:container.slice(0,5)
              })
            }else{
              mind.find({
                $or:[
                  {title: { $regex: text }},
                  {text: { $regex: text}}
                ]
              },(error,docs) => {
                if(error){
                  console.log(error)
                }else{
                  container.push(...docs)
                  res.json({
                    data:container.slice(0,5)
                  })
                }
              })
            }
          }
        })
      }
    }
  })
})
router.post('/getJDdetail',jsonParser,(req,res) => {
  console.log(req.body.id);
  jd.findOne({
    URL: {$regex: req.body.id}
  }, (error, docs) => {
    if (error) {
      console.log(error)
      res.json({
        code: 500,
        msg: "error"
      })
    } else {
      console.log(docs);
      res.json({
        code: 200,
        jd: docs
      })
    }
  })
})
router.post('/getHCdetail',jsonParser,(req,res) => {
  console.log(req.body.id);
  hc.findOne({
    URL:{$regex:req.body.id}
  },(error,docs) => {
    if(error){
      console.log(error)
      res.json({
        code:500,
        msg:"error"
      })
    }else{
      res.json({
        code:200,
        hc:docs
      })
    }
  })
})
router.get('/getjdlist',(req,res)=>{
  jd.find((error,docs)=>{
    if(error){
      console.log(error)
    }else{
      res.json({
        jds:docs,
        code:200
      })
    }
  })
});


router.post('/postoffer',jsonParser,(req,res) => {
  console.log(req.body.jdForm);
  if(req.body.jdForm){
    console.log(req.body.jdForm);
    let JD = req.body.jdForm;
    let newJd = new jd(
      {
        title : JD.title,
        author: req.cookies.userName,
        tags: JD.tags,
        time:getTime(),
        text : JD.text,
        URL: '/jd/'+getRandom(),
        category:JD.category,
        salary:JD.minSalary + '/' + JD.maxSalary
      }
    )
    newJd.save((error,docs) => {
      if(error){
        console.log(error)
      }else{
        res.json({
          code:200,
          msg:"success"
        })
      }
    })
  }else{
    console.log(req.body.hcForm);
    let HC = req.body.hcForm;
    let newHC = new hc(
      {
        title: HC.title,
        author : req.cookies.userName,
        tags : HC.tags,
        time : getTime(),
        text:HC.text,
        URL:'/hc/'+getRandom(),
        category:HC.category,
        salary:HC.minSalary + '/' + HC.maxSalary
      }
    );
    newHC.save((error,docs) => {
      if(error){
        console.log(error)
      }else{
        res.json({
          code:200,
          msg:"success"
        })
      }
    })
  }
})

module.exports = router;

