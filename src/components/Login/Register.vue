<template>
  <div>
    <el-form label-width="80px" label-position="left" v-model="registerForm">
      <h1>注册</h1>
      <el-form-item label="用户名">
        <el-input type="text" v-model="registerForm.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="registerForm.password"></el-input>
      </el-form-item>
      <el-form-item label="再次确认">
        <el-input type="password" v-model="registerForm.checkPassword"></el-input>
      </el-form-item>
      <el-form-item label="登陆邮箱">
        <el-col :span="15">
        <el-input type="text" v-model="registerForm.email"></el-input>{{warningText}}
        </el-col>
        <el-col :span="8" :offset="1">
          <el-input type="text" placeholder="邮箱验证码" v-model="registerForm.check"></el-input>
        </el-col>
        <el-col>
          <el-button type="text" style="font-size: 12px" @click="sendEmail" :disabled="isTrue" ref="checkButton">发送邮件 {{leftTime}}</el-button>

        </el-col>
      </el-form-item>

      <el-form-item >
        <el-button id='registerButton' type="warning" @click="regist">注册 &nbsp;<i class="el-icon-check" ></i></el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    export default {
        name: "Register",
        data(){
            return{
                registerForm:{
                    userName:'',
                    password:'',
                    email:'',
                    checkPassword:'',
                    check:''
                },
                isTrue:false,
                warningText:'',
                leftTime:null
            }
        },
        methods:{
            sendEmail(){
                const email = this.registerForm.email;
                const emailArray = email.split('@');
                if(emailArray == undefined){
                    this.warningText = "邮箱非法，请确认！";
                    return;
                }
                const userId = email.split('@')[0];
                const mailCom = email.split('@')[1];
                if(userId.length == 0 || mailCom.length == 0){
                    this.warningText = "邮箱非法，请确认！";
                    return;
                }
                this.warningText = ""
                let date = new Date();
                this.isTrue = true;
                let a = setInterval(()=>{
                    var newDate = new Date();
                    this.leftTime = 180 - Math.floor((newDate-date)/1000);
                    if(this.leftTime <= 0){
                        clearInterval(a);
                        this.isTrue = false;
                        this.leftTime = null;
                    }
                },1000);
                this.$axios.post('/user/checkEmail',{data:this.registerForm.email}).then( res => {
                    console.log(res);
                }).catch(error => {
                    console.log(error)
                })
            },
            regist(){
                this.$axios.post('/user/register',this.registerForm).then( res => {
                    if(res.data.message == "succeed"){
                        alert("注册成功");
                        this.$router.push("login");
                    }else{
                        console.log(res.data);
                    }
                } ).catch(error => {
                    console.log(error)
                })
            }
        }
    }
</script>

<style scoped>
  #registerButton{
    width: 80%;
  }
  h1{
    font-size: 22px;
    text-align: center;
    letter-spacing: 6px;
    font-family: "Songti SC";
    color: #2b6695;
  }
</style>
