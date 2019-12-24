<template>
  <div>
    <el-row class="Title">
      <el-col :span="24" >
        <div class="titleBox">
          <h2>{{userName}}</h2>
        </div>
        <div class="titleRecord" style="float: right">
          <button v-if="isShow" @click="focus" class="focusButton">关注他</button>
          <button v-if="!isShow" @click="focus" class="focusButton">取消关注</button>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div class="navbox">
          <div class="nav-head">
            <h5>导航</h5>
          </div>
          <ul>
            <li><router-link to="/" class="settings">博客园</router-link></li>
            <li><router-link :to="'/log/blog/'+userName+'/主页'" class="settings">首页</router-link></li>
            <li><router-link to="/write" class="settings">新随笔</router-link></li>
            <li><router-link to="/" class="settings">联系</router-link></li>
            <li><router-link to="/" class="settings">订阅</router-link></li>
            <li><router-link to="/" class="settings">管理</router-link></li>
          </ul>
        </div>
        <calendar></calendar>
        <div style="width: 220px">
          <h5 style="margin-top: 50px;margin-left: 0;padding-left: 12px">公告</h5>
          <p style="margin-left: 12px;margin-top: 4px;font-size: 14px">
            昵称：{{userName}}<br>
            园龄：{{age}}<br>
            粉丝：{{fans}}<br>
            关注：{{followed}}
          </p>
        </div>
        <div style="width: 220px">
          <h5 style="margin-top: 50px;margin-left: 0;padding-left: 12px">常用链接</h5>
          <p style="margin-left: 12px;margin-top: 4px;font-size: 14px">
            <router-link class="settings" :to="'/log/blog/'+userName+'/我的博客'">我的随笔</router-link><br>
            <router-link  class="settings" :to="'/log/blog/'+userName+'/我的评论'">我的评论</router-link><br>
            <router-link class="settings" :to="'/log/blog/'+userName+'/我的参与'">我的参与</router-link><br>
            <router-link class="settings" :to="'/log/blog/'+userName+'/最新评论'">最新评论</router-link><br><br>
          </p>
        </div>
      </el-col>
      <el-col :span="19">
        <router-view></router-view>
      </el-col>
    </el-row>

  </div>
</template>

<script>
    import Calendar from "./Calendar";
    export default {
        name: "MyBlogMainPart2",
        components: {Calendar},
        data(){
            return{
                userName:'',
                blogNum: 0,
                articleNum:0,
                commentNum:0,
                quoteNum:0,
                age:0,
                followed:0,
                fans:0,
                isShow:true
            }
        },
        created() {
            this.userName = this.$route.params.user;
            this.$axios.post('/user/isfocususer',{userName:this.userName}).then(res => {
                this.isShow = !res.data.isFocus;
                this.getRelation();
            })
        },
        watch:{
            $route:{
                handler:function (val, oldVal) {
                    this.userName = val
                }
            }
        },
        methods:{
            focus(){
                this.$axios.post('/user/relationdeal',{way:this.isShow,to:this.userName}).then(res => {
                    this.isShow = !this.isShow
                }).catch(error => {
                    console.log(error)
                })
            },
            getRelation(){
                this.$axios.post("/user/getrelation",{theme:'我的粉丝',userName:this.$route.params.user}).then(res => {
                    this.fans = res.data.data.length;
                }).catch(error => {
                    console.log(error)
                })
                this.$axios.post("/user/getrelation",{theme:'我关注的人',userName:this.$route.params.user}).then(res => {
                    this.followed = res.data.data.length;
                }).catch(error => {
                    console.log(error)
                })
            }
        }
    }
</script>

<style scoped>
  .focusButton{
    width: 80px;border-radius: 6px;border: 1px solid darkgrey;background-color: transparent;color: white;margin: 13px 10px
  }
  .navbox{
    background-color: rgb(240,240,240);
    margin: 0px 20px 0 0;
    padding: 4px 4px 4px 0;
  }
  ul{
    list-style: none;
  }
  .titleBox{
    background-color: #20375f;
    height: 80px;

  }
  .titleRecord{
    background-color: black;
    width: 100%;

  }
  h4{
    font-size: 11px;
    margin-right: 10px;
    color: rgb(122,122,122);
  }
  h2{
    font-size: 25px;
    margin: 0 0 0 15px;
    padding-top: 10px;
    color: white;
  }
  h5{
    font-size: 16px;
    margin-left: 12px;
    border-bottom: 1px dashed darkgray;
    margin-bottom: 0;
  }

  ul{
    padding : 0;
    margin-top: 5px;
  }

  li{
    padding-left: 18px;
    font-size: 12px;
  }

  .settings{
    text-decoration:none;
  }
  .settings:link{
    color:  rgb(44,44,44);
  }

  .settings:visited{
    color: rgb(44,44,44);
  }

  .settings:hover{
    color: #2b6695;
  }
  .settings:active{
    color: #2b6695;
  }


</style>
