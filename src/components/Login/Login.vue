<template>
  <div>
      <el-form label-width="80px" label-position="left" v-model="loginForm">
        <h1>用户登陆</h1>
        <el-form-item label="用户名">
          <el-input type="text" v-model="loginForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" >
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item label="记住我">
          <el-switch v-model="loginForm.remeberMe"></el-switch>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="login">登陆</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
    export default {
        name: "Login",
        data(){
            return{
                loginForm:{
                    userName:'',
                    password:'',
                    remeberMe:''
                }
            }
        },
        methods:{
            login(){
                this.$axios.post('/user/login',this.loginForm).then( res => {
                    if(res.data.msg == "success"){
                        this.$router.push("/")
                    }else{
                          ;
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    }
</script>

<style scoped>
  .el-button{
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
