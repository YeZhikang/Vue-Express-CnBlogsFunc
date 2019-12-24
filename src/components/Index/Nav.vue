<!--
  这是导航栏界面
-->

<template>
  <div id="Nav-app">
    <header>
      <div id="logBox">
        <span>代码改变世界</span>
        <span class="login">
          <div v-if="noUser">
            [ <router-link to="/log/login">登陆</router-link> · <router-link to="/log/register">注册</router-link> ]
          </div>
          <div v-if="!noUser" id="userBox">
             <router-link to="/log/user">{{userName}}</router-link> · <router-link :to="blogURL">我的博客</router-link> · <router-link to="/log/news">短消息 ({{news}})</router-link>
            · <router-link to="/log/setting">设置</router-link> · <a  @click="logout">退出</a>
          </div>
        </span>
      </div>
      <div class="index-logo">
        <img src="../../images/logo_small.gif">
        <img class="adv1" src="../../images/adv1.jpg">
      </div>
      <div class="navBox">
          <ul>
            <li><router-link to="/log/user/garden/最新动态">园子</router-link></li>
            <li><router-link to="/report">新闻</router-link></li>
            <li><router-link to="/question">博问</router-link></li>
            <li><router-link to="/log/user/garden/全站">闪存</router-link></li>
            <li><router-link to="/fgd/小组">小组</router-link></li>
            <li><router-link to="/fgd/收藏">收藏</router-link></li>
            <li><router-link to="/fgd/招聘">招聘</router-link></li>
            <li><router-link to="/fgd/找找看">找找看</router-link></li>
          </ul>
      </div>
    </header>
  </div>
</template>

<script>
    export default {
        name: "index-Nav",
        data(){
            return{
                noUser:true,
                userName:null,
                news:0,
                blogURL:'/log/blog/'+this.userName
            }
        },
        created() {
            this.$axios.get('/user/getUserInfo').then(res => {
                this.userName = res.data.userName;
                if(this.userName != null){
                    this.noUser = false;
                    this.blogURL = '/log/blog/'+this.userName
                }
            })
        },
        methods:{
            logout(){
                this.$axios.get('/user/pop').then(res => {
                    if(res.data.msg == "succeed"){
                        this.noUser = true
                    }
                })
            }
        }
    }
</script>

<style scoped>

    a{
      text-decoration: none;
    }
    .navBox{
      margin: 8px 0;
      height: 30px;
      background-color: #2b6695;
      box-shadow: 2px 2px 2px darkgray;

    }
    .navBox ul {
      font-family: Arial;
      font-size: 14px;
      list-style: none;
      display: inline-block;
      margin: 0;
      padding: 0;
      line-height: 30px;
      color: white;
    }

    .navBox li{
      padding-left: 14px;

      margin: 0px 0px 0px 4px ;

      display: inline-block;
    }
    #Nav-app{
      margin: 0 11px 0 11px;
    }

    #logBox{
      padding: 0 8px;
    }
    #logBox span{
      font-size: 12px;
      line-height: 22px;
      color: rgb(100,100,100);
    }

    li a:link{
      color: white;
    }

    li a:visited{
      color: white;
    }
    li a:hover{
      color: rgb(222,222,222);
    }
    li a:active{
      color: rgb(222,222,222);
    }

  .login{
    float: right;

  }

  .index-logo{
    border: 0.5px solid rgb(222,222,222);
    border-radius: 3px;
    width: 100%;
    height: 75px;
  }

  .index-logo img:first-child{
    margin:10px;
  }

  .adv1{
    height: 70px;
    width: 500px;
    float: right;
    margin: 2.5px 5px;
  }
  #userBox a{
    font-size: 12px;
    line-height: 22px;
  }
  #userBox a:link{
    color: #2b6695;
  }

    #userBox a:visited{
      color: #2b6695;
    }

    #userBox a:hover{
      color: rgb(105,105,105);
    }

    #userBox a:active{
      color: rgb(105,105,105);
    }
</style>

