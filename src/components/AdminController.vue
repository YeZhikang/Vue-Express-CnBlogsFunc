<template>
    <div>
      <el-row v-if="isAdmin">
        <el-col :span="24" style="border-bottom: 1px dashed darkgrey;height: 50px;position: fixed;">
          <h3 style="margin: 0px 40px;line-height: 50px;">管理员窗口
            <router-link to="/"><span style="margin: 0px 40px;float: right;line-height: 50px;font-size: 14px">回到首页</span></router-link>
          </h3>
        </el-col>
        <el-row style="margin-top: 50px">
          <el-col :span="4" style="position: fixed;height: 100%;background: rgb(247,247,247)">
            <el-tabs v-model="activeName" type="card" tab-position="left">
              <el-tab-pane label="所有信息" name="所有信息"></el-tab-pane>
              <el-tab-pane label="博文" name="博文"></el-tab-pane>
              <el-tab-pane label="问题" name="问题"></el-tab-pane>
              <el-tab-pane label="回答" name="回答"></el-tab-pane>
              <el-tab-pane label="想法" name="想法"></el-tab-pane>
              <el-tab-pane label="简历" name="简历"></el-tab-pane>
              <el-tab-pane label="求职信息" name="求职信息"></el-tab-pane>
              <el-tab-pane label="话题" name="话题"></el-tab-pane>
              <el-tab-pane label="用户" name="用户"></el-tab-pane>
            </el-tabs>
          </el-col>
          <el-col :span="20" :offset="1" style="margin-left:240px">
            <el-table
              v-if="isUser"
              :data="totalData"
              border
              style="width: 100%">
              <el-table-column
                prop="userName"
                label="用户"
              >
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="300">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                  <el-button type="text" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-table
              v-if="!isUser"
              :data="totalData"
              border
              style="width: 100%">
              <el-table-column
                prop="author"
                label="用户"
                width="120">
              </el-table-column>
              <el-table-column

                prop="time"
                label="日期"
                width="150">
              </el-table-column>

              <el-table-column
                prop="title"
                label="内容"
                >
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                  <el-button @click="" type="text" size="small">查看</el-button>
                  <el-button type="text" size="small">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-row>
      <el-row v-if="!isAdmin">
        <el-col :span="24" style="border-bottom: 1px dashed darkgrey;height: 50px">
          <h3 style="margin: 0px 40px;line-height: 50px;">管理员窗口
            <router-link to="/"><span style="margin: 0px 40px;float: right;line-height: 50px;font-size: 14px">回到首页</span></router-link>
          </h3>
          <el-row>
            <el-col :span="12" :offset="6" style="margin-top: 200px">
              <el-card>
                <h4>Sorry ! 你没有管理员权限</h4>
                <h5>{{RemainTime}} 秒后，将回到首页 <router-link to="/">立即跳回</router-link></h5>
              </el-card>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-dialog
        title="用户信息"
        :visible.sync="centerDialogVisible"
        width="45%"
        center>
        <div>
          <div style="display: flex">
            <img style="width: 100px;height: 100px;" :src="'http://139.155.76.66:3000/'+userName+'_images.png'">
            <div style="margin-left: 40px">
              <h3 class="dialog" >  {{user.userName}}</h3>
              <p>邮箱：{{user.email}}  <br> 密码：{{user.password}}</p>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "AdminController",
        data(){
            return{
                isUser:false,
                isAdmin:false,
                blogs:[],
                minds:[],
                questions:[],
                comments:[],
                hcs:[],
                jds:[],
                users:[],
                topics:[],
                RemainTime:5,
                activeName:"话题",
                centerDialogVisible: false,
                user:{
                    userName:'',
                    password:'',
                    email:'',
                },
                totalData:[
                    // {
                    //     time:'2000/01/30',
                    //     author:"Yezhikang",
                    //     action:'发博',
                    //     main:"sdadsa"
                    // }
                ]
            }
        },
        created(){
            this.getUserInfo();
        },
        mounted(){
            this.changeTable();
        },
        methods:{
            getUserInfo(){
                this.$axios.get('/user/isAdmin').then(res => {
                    console.log(res);
                    this.isAdmin = res.data.isAdmin;
                    this.userName = res.data.userName;
                    if(this.isAdmin){
                        this.getAllActives()
                    }else{
                        this.turnToIndex();
                    }
                }).catch(error => {
                    console.log(error)
                })
            },
            handleClick(row) {
                console.log(row);
                this.centerDialogVisible = true;
                this.user = row;
            },
            turnToIndex(){
                if(!this.isAdmin) {
                    let timeRemain = setInterval(() => {
                        this.RemainTime -= 1;
                        if (this.RemainTime === 0) {
                            this.$router.push('/')
                        }
                    }, 1000);
                }
            },
            getAllActives(){
                this.$axios.get('/user/getAllActives').then(res => {
                    console.log(res.data.allData);
                    this.blogs = res.data.allData.blogs;
                    this.minds = res.data.allData.minds;
                    this.questions = res.data.allData.questions;
                    this.comments = res.data.allData.comments;
                    this.hcs = res.data.allData.hcs;
                    this.jds = res.data.allData.jds;
                    this.users = res.data.allData.users;
                    this.topics = res.data.allData.topics;
                    this.changeTable()
                })
            },
            changeTable(){
                let theme = this.activeName;
                this.isUser = false;
                this.totalData = [];
                if( theme === "所有信息" ){
                    let newComments = [];
                    let newMinds = [];
                    this.comments.forEach(item => {
                        item.title = item.text;
                        newComments.push(item)
                    });
                    this.minds.forEach(item => {
                        item.title = item.text;
                        newMinds.push(item);
                    });
                    this.totalData = [];
                    this.totalData.push(...this.blogs,...newMinds,...this.questions,...newComments,...this.topics)
                }else if( theme === "博文" ){
                    this.totalData = this.blogs
                }else if( theme === "问题"){
                    this.totalData = this.questions
                }else if( theme === "回答"){
                    let newComments = [];
                    this.comments.forEach(item => {
                        item.title = item.text;
                        newComments.push(item)
                    });
                    this.totalData = newComments
                }else if( theme === "想法"){
                    let newMinds = [];
                    this.minds.forEach(item => {
                        item.title = item.text;
                        newMinds.push(item);
                    });
                    this.totalData = newMinds
                }else if( theme === "话题"){
                    this.totalData = this.topics;
                }else if( theme === "用户"){
                    this.isUser = true;
                    this.totalData = this.users;
                }
                console.log(this.totalData)
            }
        },
        watch:{
            activeName:{
                handler:function (val) {
                    console.log(val);
                    this.changeTable();
                }
            }
        }
    }
</script>

<style scoped>
>>>.el-tabs__header{
  width: 100%;
}
</style>
