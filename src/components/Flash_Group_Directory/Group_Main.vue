<template>
<div>
  <el-row>
    <el-col :span="24" style="margin: auto;text-align: center;background-color: #2f435e">
      <div style="padding: 30px;">
        <h2 class="group-title">加入小组，认识更多有趣的人</h2>
      </div>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="20" :offset="2">
      <el-row>
        <el-col :span="19" style="margin-top: 20px">
          <el-tabs v-model="activeName">
            <el-tab-pane label="最新话题" name="最新话题"></el-tab-pane>
            <el-tab-pane label="我的小组" name="我的小组"></el-tab-pane>
            <el-tab-pane label="所有小组" name="所有小组"></el-tab-pane>
          </el-tabs>
          <router-view></router-view>
        </el-col>
        <el-col :span="4" :offset="1">
          <div style="margin-top: 50px">
            <el-button type="warning" round size="small" @click="turn()">发言</el-button>
            <el-button type="primary" round size="small" @click="setGroup()">创建小组</el-button>
          </div>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</div>
</template>

<script>
    export default {
        name: "Group_Main",
        data(){
            return{
                activeName:'最新话题'
            }
        },
        methods:{
          setGroup(){
            this.$router.push('创建小组')
          },
          turn(){
              this.$router.push('/topicwrite')
          }
        },
        watch:{
            $route:{

            },
            activeName: {
                handler:function (val) {
                    this.$router.push('/fgd/小组/'+val)
                }
            }
        }
    }
</script>

<style scoped>
  .group-title{
    font-size: 38px;
    font-family: "Heiti SC";
    font-weight: 500;
    color: white;
  }
</style>
