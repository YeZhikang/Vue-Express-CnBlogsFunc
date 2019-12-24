<template>
    <div>
    <div class="personNav">
        <ul class="personNav-ul">
          <li><router-link to="/">首页</router-link></li>
          <li><router-link to="/">新闻</router-link></li>
          <li><router-link to="/fgd/找找看">找找看</router-link></li>
        </ul>
    </div>
      <el-row style="margin-top: 10px">
        <el-col :span="16" :offset="4">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="园子" name="园子"></el-tab-pane>
            <el-tab-pane label="关注" name="关注"></el-tab-pane>
            <el-tab-pane label="粉丝" name="粉丝"></el-tab-pane>
            <el-tab-pane label="随便看看" name="随便看看"></el-tab-pane>
            <el-tab-pane label="消息" name="消息"></el-tab-pane>
          </el-tabs>
          <el-row id="senior">
            <el-col :span="5" :offset="0" id="userName">
              <span class="userName">欢迎你：{{userName}}</span>
            </el-col>
            <el-col :offset="14" :span="5">
              <img src="../../images/person-log.png" style="width: 165px ; height: 60px">
            </el-col>
          </el-row>
          <el-row style="margin-top: 15px">
            <el-col :span="4" :offset="0">
              <div class="person-sidebar">
                <ul class="func">
                  <li><router-link to="/flash" style="margin-left: 10px">闪存  &nbsp;&nbsp;&nbsp;<i class="el-icon-magic-stick" style="float: right;margin-right: 10px"></i></router-link></li>
                  <li><router-link :to="'/log/blog/'+userName+'/主页'" style="margin-left: 10px">博客  &nbsp;&nbsp;&nbsp;<i class="el-icon-collection-tag" style="float: right;margin-right: 10px"></i></router-link></li>
                  <li><router-link to="/fgd/小组" style="margin-left: 10px">小组  &nbsp;&nbsp;&nbsp;<i class="el-icon-user" style="float: right;margin-right: 10px"></i></router-link></li>
                  <li><router-link to="/report/main" style="margin-left: 10px">新闻  &nbsp;&nbsp;&nbsp;<i class="el-icon-tickets" style="float: right;margin-right: 10px"></i></router-link></li>
                  <li><router-link to="/question" style="margin-left: 10px">博问  &nbsp;&nbsp;&nbsp;<i class="el-icon-chat-line-round" style="float: right;margin-right: 10px"></i></router-link></li>
                  <li><router-link to="/hold" style="margin-left: 10px">收藏  &nbsp;&nbsp;&nbsp;<i class="el-icon-folder-opened" style="float: right;margin-right: 10px"></i></router-link></li>
                  <li><router-link to="/findwork" style="margin-left: 10px">招聘  &nbsp;&nbsp;&nbsp;<i class="el-icon-goods" style="float: right;margin-right: 10px"></i></router-link></li>
                </ul>
              </div>
            </el-col>
            <el-col :span="19" style="margin-left: 20px">
              <router-view></router-view>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
</template>

<script>
    export default {
        name: "personNav",
        created(){
            const url = this.$route.path;
            if(url.indexOf('/focus/我的粉丝')!=-1){
                this.activeName = "粉丝"
            }
        },
        mounted(){
            this.$axios.get('/user/getUserInfo').then(res => {
                this.userName = res.data.userName
            })
        },
        data(){
            return {
                activeName: '园子',
                userName:""
            }
        },
        watch:{
            activeName:{
                handler:function (val, oldVal) {
                    if(val == "园子"){
                        this.$router.push("/log/user/garden");
                    }
                    if(val == "关注"){
                        this.$router.push("/log/user/focus");
                    }if(val == "粉丝"){
                        this.$router.push("/log/user/fans");
                    }if(val == "随便看看"){
                        this.$router.push("/log/user/look");
                    }if(val == "消息"){
                        this.$router.push("/log/user/news");
                    }
                }
            }
        }
    }
</script>

<style scoped>
  .person-sidebar{
    width: 100%;
    background-color: rgb(244,244,244);
  }

  .func{
    padding: 10px;
    list-style: none;
    margin: 0;

  }

  .func li{
    margin-bottom: 5px;
    border-bottom: 1px dashed darkgray;
  }
  #senior{
    padding-bottom: 10px;
    border-bottom: 1px solid rgb(222,222,222);
  }
  #userName{
    margin-top: 42px;
  }
  .userName{
    font-size: 18px;
    font-family: "Heiti SC";
  }
  .personNav-ul{
      padding: 0;
      list-style: none;
    margin: 0;
    background-color: rgb(250,250,250);
    border-bottom: 1px solid darkgray;
  }
  .personNav-ul li{
    display: inline-block;
    font-size: 12px;
    line-height: 35px;
    padding-left: 10px;
  }
  a:link{
    color: rgb(122,122,122);
  }
  a:visited{
    color: rgb(122,122,122);
  }
  a:hover{
    color: #2b6695;;
  }

  a:active{
    color: #2b6695;;
  }

  a{
    text-decoration: none;
  }

  a{
    font-family: "Heiti SC";
  }


</style>
