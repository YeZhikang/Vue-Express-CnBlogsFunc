<template>
  <div>
    <el-row>
      <el-col :span="24" style="margin: auto;text-align: center;background-color: #5e2d39">
        <div style="padding: 30px;">
          <h2 class="group-title">招聘</h2>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="20" :offset="2">
        <el-row>
          <el-col :span="19" style="margin-top: 20px">
            <el-tabs v-model="activeName">
              <el-tab-pane label="职位信息" name="职位信息"></el-tab-pane>
              <el-tab-pane label="需要职位" name="需要职位"></el-tab-pane>
            </el-tabs>
            <router-view></router-view>
          </el-col>
          <el-col :span="4" :offset="1">
            <div style="margin-top: 50px">
              <el-button type="warning" round size="small" @click="submitHC()">发布职位</el-button>
              <el-button type="primary" round size="small" @click="submitJD()">我要求职</el-button>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "Employ",
        data(){
            return{
                activeName:'职位信息',
            }
        },
        watch:{
            activeName:{
                handler:function (val) {
                    if(val === "职位信息" || val === "需要职位") {
                        this.$router.push('/fgd/招聘/' + val)
                    }
                }
            }
        },
        created(){
            this.activeName = this.$route.name
        },
        methods:{
            submitHC(){
                this.$router.push('/fgd/招聘/发布职位')
            },
            submitJD(){
                this.$router.push('/fgd/招聘/我要求职')
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
