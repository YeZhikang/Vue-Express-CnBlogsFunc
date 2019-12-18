<template>
  <div class="mainBox">
    <el-row>
      <el-col :span="8" :offset="8">
        <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
          <el-tab-pane label="用户登陆" name="first"></el-tab-pane>
          <el-tab-pane label="注册" name="second"></el-tab-pane>
          <router-view></router-view>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "LogReg",
        data() {
            return {
                activeName: 'first'
            };
        },
        methods: {
            handleClick(tab) {
                if(tab.index=="0"){
                //    用户登陆
                    this.$router.push('/log/login')
                }else{
                    this.$router.push('/log/register')
                }
            }
        }
    }
</script>

<style scoped>
  .mainBox{
    margin-top: 150px;
  }

</style>
