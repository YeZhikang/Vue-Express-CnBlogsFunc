<template>
  <div>
    <index-nav></index-nav>
    <el-row>
        <sidebar></sidebar>
      <el-col :span="3" :offset="2" style="position: fixed;right: 80px;top: 350px">
          <el-card class="box-card">
            <ul>
              <li>
                <router-link to="/report/main"> > 新闻主页</router-link>
              </li>
              <li>
                <router-link to="/report/post"> > 投递新闻</router-link>
              </li>
              <li>
                <router-link to="/report/theme"> > 新闻主题 </router-link>
              </li>
            </ul>
          </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
    import IndexNav from "../Index/Nav";
    import Sidebar from "../Index/Sidebar";
    export default {
        mounted(){
        },
        name: "Report",
        components: {Sidebar, IndexNav},
        data(){
            return{

            }
        }
    }
</script>

<style scoped>
  ul{
    font-size: 13px;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  li{
    line-height: 20px;
    color: darkgrey;
  }
  .report-title{
    font-size: 16px;
    line-height: 20px;
    margin: 0;
  }
  .report-main{
    font-size: 13px;
    line-height: 15px;
  }
  .information{
    font-size: 12px;
    color: rgb(100,100,100);
    line-height: 20px;
  }
</style>
