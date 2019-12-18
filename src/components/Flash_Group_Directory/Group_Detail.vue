<template>
    <div>
      <el-row>
        <el-col :span="15" :offset="1">
          <h2 style="border-left: 5px solid #3a8ee6;padding-left: 7px">小组详情
            <el-button @click="joinGroup()" round type="primary" size="small" style="float: right">加入小组</el-button>
            <el-button v-if="isAdmin" @click="changeInfo()" round type="warning" size="small" style="float: right;margin-right: 15px">修改信息</el-button>
          </h2>

          <el-row>
            <el-col :span="3">
              <img :src="'http://139.155.76.66:3000/'+groupDetail.groupId+'_images.png'" style="width: 80%;height: 80%;margin-top: 10%">
            </el-col>
            <el-col :span="10" :offset="0">
              <h4>{{groupDetail.title}}   <span>( 成员: {{groupDetail.groupNumber}} / 热度: {{groupDetail.groupPopular}} )</span><br><span>成立于 {{groupDetail.time}}</span></h4>
              <p>组长 : <router-link :to="'/log/blog/'+groupDetail.author">{{groupDetail.author}}</router-link></p>
              <p>简介 : {{groupDetail.text}}</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-tabs v-model="activeName" >
                <el-tab-pane label="小组公告" name="小组公告"></el-tab-pane>
                <el-tab-pane label="小组话题" name="小组话题"></el-tab-pane>
                <el-tab-pane label="小组成员" name="小组成员"></el-tab-pane>
              </el-tabs>
              <router-view></router-view>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6" :offset="1">
          <h5>小组 Rank</h5>
          <!--

            小组成员
          -->
        </el-col>
      </el-row>
    </div>
</template>

<script>
    export default {
        name: "Group_Detail",
        data(){
            return{
                groupDetail:{

                },
                activeName:this.$route.name,
                isAdmin:null
            }
        },
        mounted() {
            const group = this.$route.params.id;
            this.$axios.post('/user/getgroupdetail',{group:group}).then(res =>{
                this.groupDetail = res.data.group;
                this.groupDetail.groupNumber = this.groupDetail.member.length;
                this.isAdmin = res.data.isAdmin;
                console.log(this.isAdmin)
                console.log(this.groupDetail)
            }).catch(error => {
                console.log(error);
            })

        },
        watch:{
            activeName:{
                handler:function (val) {
                    this.$router.push('/fgd/group/'+this.$route.params.id+'/'+val);
                }
            },
        },
        methods:{
            joinGroup(){
                this.$axios.post('/user/joingroup',{group:this.groupDetail.groupId}).then(res => {
                    if(res.data.code === 200){
                        alert('加入成功')
                    }
                }).catch(error => {
                    console.log(error)
                })
            },
            changeInfo(){
                this.$router.push('/fgd/group/'+this.$route.params.id+'/changeinfo')
            }
        }
    }
</script>

<style scoped>
  .el-col h4{
    font-size: 20px;
    margin: 0;
  }

  .el-col p{
    font-size:13px;
    color: rgb(66,66,66);
  }

  .el-col span{
    font-size: 12px;
    color: rgb(66,66,66);
  }

  a{
    text-decoration: none;
  }

  a:link{
    color: rgb(55,55,55);
  }

  a:visited{
    color: rgb(55,55,55);
  }

  a:hover{
    color: #385677;
  }

  a:active{
    color: #385677;
  }
</style>
