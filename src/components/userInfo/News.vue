<template>
  <div>
    <el-row>
      <el-col :span="20">
        <router-view></router-view>
      </el-col>
      <el-col :span="3" style="margin-left: 15px">
        <router-link to="/log/user/write" class="settings">» 撰写短消息</router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "News",
        created(){
        },
        data(){
            return{
                activeName:"收件箱"
            }
        },
        watch:{
            activeName:{
                handler:function (val, oldVal) {
                    this.$router.push('/log/user/news/'+val)
                }
            }
        }
    }
</script>

<style scoped>
  .settings{
    font-size: 12px;
    text-decoration:none;
  }
  .settings:link{
    color: darkgray;
  }

  .settings:visited{
    color: darkgray;
  }

  .settings:hover{
    color: #2b6695;
  }
  .settings:active{
    color: #2b6695;
  }
</style>
