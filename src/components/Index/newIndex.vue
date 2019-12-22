<template>
  <div style="background-color: #26334c;height: 100%;width: 100%;padding-bottom: 40px">
    <el-row>
      <el-col :span="22" :offset="1" style="padding-top: 40px">
        <div style="float: right;border: 1px dashed white;border-radius: 3px;margin-right: 5px;padding:5px 0px">
          <router-link to="/fgd/小组/最新话题" style="padding-right: 20px;padding-left: 20px">小组</router-link>
          <router-link to="/fgd/招聘/职位信息" style="padding-right: 20px">招聘</router-link>
          <router-link to="/fgd/收藏" style="padding-right: 20px">收藏</router-link>
          <router-link to="/fgd/找找看" style="padding-right: 20px">找找看</router-link>
        </div>
        <h1 v-if="userName">Hello , <a @click="drawer = true"><span style="font-size: 28px" @click="">{{userName}}</span></a></h1>
        <h1 v-if="!userName">Hello , <router-link to="/log/login">请登录</router-link></h1>

      </el-col>
    </el-row>
    <el-row style="margin-top: 20px;padding-bottom: 40px;">
      <el-col :span="14" :offset="1" >
        <h3>{{activeName}} <span style="font-size: 14px">共为你找到了 {{length}} 个结果</span></h3>
        <el-row>
          <el-col :span="19">
            <div style="height: 500px;margin-top: 15px">
              <p v-if="!length" style="margin-top: 20px;font-size: 14px">暂时没有博客,或许你可以写一些？</p>
              <div class="aBlog" v-for="blog in blogs">
                <h5><router-link :to="'/log/blog/'+blog.author+'/p/'+blog.URL">{{blog.title}}</router-link></h5>
                <p>{{blog.text.substring(0,30)}}</p>
              </div>
            </div>
            <el-pagination
              background
              layout="prev, pager, next"
              :total="length"
              @current-change="handleCurrentChange">
            </el-pagination>
          </el-col>
          <el-col :span="5">
            <el-tabs v-model="activeName" tab-position="right" style="color: white" >
              <el-tab-pane label="精华" name="精华"></el-tab-pane>
              <el-tab-pane label=".Net 技术" name=".Net 技术"></el-tab-pane>
              <el-tab-pane label="编程语言" name="编程语言"></el-tab-pane>
              <el-tab-pane label="程序设计" name="程序设计"></el-tab-pane>
              <el-tab-pane label="Web前端" name="Web前端"></el-tab-pane>
              <el-tab-pane label="企业信息化" name="企业信息化"></el-tab-pane>
              <el-tab-pane label="手机开发" name="手机开发"></el-tab-pane>
              <el-tab-pane label="软件工程" name="软件工程"></el-tab-pane>
              <el-tab-pane label="数据库技术" name="数据库技术"></el-tab-pane>
              <el-tab-pane label="操作系统" name="操作系统"></el-tab-pane>
              <el-tab-pane label="其他分类" name="其他分类"></el-tab-pane>
              <el-tab-pane label="所有随笔" name="所有随笔"></el-tab-pane>
              <el-tab-pane label="所有评论" name="所有评论"></el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="7" :offset="1" style="position: fixed;right: 65px">
        <h4>
          新闻
        </h4>
        <div style="height:240px" class="index-box">
          <div v-for="report in reports" class="aReport">
              <h5 style="font-size: 13px"><router-link to="hello">{{report.title}}</router-link></h5>
              <p style="font-size: 6px;color: darkgrey">{{report.main.substring(0,30)}}</p>
          </div>
        </div>
        <h4>
          <router-link to="/question/问题列表">
            问答
          </router-link>
        </h4>
        <div style="height: 240px" class="index-box">
          <div v-for="question in questions" class="aReport">
            <h5 style="font-size: 13px"><router-link to="hello"><router-link :to="question.URL">{{question.title}}</router-link></router-link></h5>
            <p style="font-size: 6px;color: darkgrey">{{question.text.substring(0,30)}}</p>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-drawer
      :visible.sync="drawer"
      :with-header="false"
      size="34%"
      >
      <div style="margin: 0 20px">
        <div style="display: flex">
          <el-avatar size="large" :src="'http://139.155.76.66:3000/'+userName+'_images.png'" style="margin: 19.92px 10px"></el-avatar>
          <h2 style="color: #787878">{{userName}}</h2>
          <el-button type="text"><router-link to="/userChart"  style="margin-left: 200px;color: darkcyan;">查看数据</router-link></el-button>
        </div>
        <div style="margin: 20px 6px;padding:20px 0 ;border-top: 1px dashed #636363;" >
          <el-alert
            :title="'好久不见，你共收到了 '+ newMessage +' 条新消息'"
            type="info">
          </el-alert>
        </div>
        <el-row style="margin-top: 30px">
          <el-col v-for="userBlock in userBlocks" :span="8" :offset="2" >
            <div class="tabA">
              <router-link :to="userBlock.URL">
                <h3 v-bind:style="{backgroundColor:userBlock.color}" style="line-height: 120px;color: white;padding: 5px;text-align: center;border-radius: 10px"><i :class="userBlock.iconClass"> {{userBlock.name}}</i></h3>
              </router-link>
            </div>
          </el-col>
          <el-col :span="8" :offset="2" >
            <div class="tabA"  @click="logout()">
                <h3 v-bind:style="{backgroundColor:userBlock.color}" style="line-height: 120px;color: white;padding: 5px;text-align: center;border-radius: 10px"><i :class="userBlock.iconClass"> {{userBlock.name}}</i></h3>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-drawer>
  </div>
</template>

<script>
    import { Loading } from 'element-ui';

    export default {
        name: "newIndex",
        data(){
            return {
                userName:"",
                blogComment:[],
                activeName:'精华',
                currentPage:1,
                length:0,
                news:0,
                newMessage:1,
                userBlocks:[
                    {
                        name:'个人界面',
                        URL:'/log/user/garden/最新动态',
                        color:'darkcyan',
                        iconClass:'el-icon-user'
                    },
                    {
                        name:'修改信息',
                        URL:'/log/user/settings',
                        color:'#2f435e',
                        iconClass:'el-icon-setting'
                    },
                    {
                        name:'收信',
                        URL:'/log/user/news/收件箱',
                        color:'#825841',
                        iconClass:'el-icon-folder-opened'
                    },
                ],
                userBlock:{
                    name:'注销',
                    URL:'/log/user/news/收件箱',
                    color:'darkred',
                    iconClass:'el-icon-caret-bottom'
                },
                reports:[
                    {
                        likes:1,
                        title:"长征八号运载火箭芯二级氢氧发动机高空模拟试验成功 预计明年首飞",
                        main:"新华社北京 12 月 2 日电（记者胡喆）记者从中国航天科技集团有限公司获悉，长征八号运载火箭芯二级氢氧发动机近日成功完成高空模拟试验，意味着该型火箭距明年首飞又近了一步。 据悉，此次试验是为长征八号运载火箭提供交付发动机的校准试验，主要目的是校验发动机大喷管并获取“上天”发动机的性能数据，" +
                            "验证是否",
                        author:'新华社',
                        comment:0,
                        view:0,
                        theme:'国内新闻'
                    }
                ],
                questions:[],
                drawer:false,
                blogs:[]
            }
        },
        created(){
          this.getUserInfo();
          this.getBlogs();
          this.getQuestion();
        },
        methods: {
            getUserInfo(){
                this.$axios.get('/user/getUserInfo').then(res => {
                    this.userName = res.data.userName;
                    if(this.userName != null){
                        this.noUser = false;
                        this.blogURL = '/log/blog/'+this.userName
                    }
                })
            },
            getBlogs(){
                let loadingInstance = Loading.service({ background: '#26334c' });
                let theme = this.activeName;
                this.$axios.post('/blogs/getBlog',{msg:theme,page:this.currentPage}).then(res => {
                    let data = res.data.msg;
                    console.log(res.data)
                    console.log(data);
                    this.blogs = data;
                    this.length = res.data.totalData;
                    console.log(this.length);
                    this.$nextTick(() => {
                        loadingInstance.close();
                    });
                }).catch(error => {
                    console.log(error)
                })
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.$axios.post('/blogs/getBlog',{msg:this.activeName,page:this.currentPage}).then(res => {
                    let data = res.data.msg;
                    this.blogs = data;
                    console.log(this.blogs)
                }).catch(error => {
                    console.log(error)
                })
            },
            getQuestion(){
                this.$axios.post('/user/getquestion',{msg:"问题列表"}).then(res => {
                    if(res.data.code == 200) {
                        this.questions = res.data.data;
                        this.questions.forEach(item => {
                            item.focusOn = true
                        });
                        console.log(this.questions)
                    }else{

                    }
                }).catch(error => {
                    console.log(error)
                })
            },
            logout(){
                console.log("ok");
                this.$axios.get('/user/pop').then(res => {
                    if(res.data.msg == "succeed"){
                        this.userName = "";
                        this.drawer = false
                    }
                })
            }
        },
        watch:{
            activeName:{
                handler:function (val) {
                    this.getBlogs();
                }
            }
        }
    }
</script>

<style scoped>

  .aBlog{
    padding: 4px 7px;
    border-radius: 3px;
    margin: 4px 0;
    border:1px dashed white;
  }
  .aReport{
    padding: 4px 7px;
    border-radius: 3px;
    margin: 4px 0;
    border:1px dashed white;
    border-top: none;
    border-left: none;
    border-right: none;
  }
  s{
    background: #825841;
  }
  p{
    color: white;
    font-size: 12px;
    font-family: Monaco;
  }
  h5{
    font-size: 14px;
  }
  h1,h4,h3,h5{
    font-family: Monaco;
    font-weight: 400;
    margin-bottom: 0;
    color: white;
  }
  h3{
    font-size: 20px;
    margin-top: 20px;
  }
  h1 {
    font-size: 28px;
  }

  h4{
    font-size: 20px;
    margin-top: 20px;
  }

  h5,p{
    margin: 0;
  }

  >>>.el-tabs__item{
    color: white;
  }

  .index-box{
    margin-top: 10px;
    border:1px dashed white;
    border-radius: 4px;
  }

  a:link{
    color: white;
  }

  a:visited{
    color: #c7c7c7;
  }

  a:hover{
    color: #c7c7c7;
  }

  a:active{
    color: #c7c7c7;

  }
  >>>.rtl{
  }
</style>
