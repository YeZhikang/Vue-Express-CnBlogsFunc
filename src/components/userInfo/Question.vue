<template>
  <div>
  <el-tabs v-model="activeName">
    <el-tab-pane label="问题列表" name="问题列表"><router-link to="/question/questionlist">待解决</router-link>
      <router-link to="/question/highscore">高分</router-link><router-link to="/question/new">新回答</router-link>
      <router-link to="/question/new">已解决</router-link></el-tab-pane>
    <el-tab-pane label="我关注的" name="我关注的"></el-tab-pane>
    <el-tab-pane label="我的博问" name="我的博问"></el-tab-pane>
  </el-tabs>
    <el-row>
      <el-col :span="19">
        <router-view></router-view>
      </el-col>
      <el-col :span="5">
        <div class="logo">
          <router-link to="/writequestion">
          <img src="../../images/askqesbg_h.png">
          </router-link>
          <p class="rankP">
            我的园豆:{{user.douNumber}}<br>
            我的声望:{{user.wang}}<br>
            当前排名:{{user.rank}}
          </p>
        </div>
        <div class="searchQuestion" style="margin-left: 7px">
          <h3>博问搜索</h3>
          <el-input size="mini" v-model="searchQuestion" suffix-icon="el-icon-search"></el-input><el-button size="mini" type="text" @click="search">搜索</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    import PersonNav from "./personNav";
    export default {
        name: "Question",
        components: {PersonNav},
        data(){
            return{
                activeName:this.$route.params.theme,
                searchQuestion:'',
                user:{

                }
            }
        },
        watch:{
            activeName:{
                handler:function (val, oldVal) {
                    this.$router.push('/question/'+val)
                }
            },
            $route:{
                handler:function (val) {
                    this.activeName = val.params.theme
                }
            }
        },
        methods:{
            search(){
                this.$router.push({
                    path:'/question/问题列表',
                    query:{
                      key:this.searchQuestion
                    }
                });
            }
        }
    }
</script>

<style scoped>
  h3{
    margin: 0 0 3px 0;
    font-size: 13px;

  }
  .rankP{
    font-size: 9px;
    color: darkgray;
    margin-left: 7px;
  }
  a{
    font-size: 15px;
    font-family: "Heiti SC";
    text-decoration: none;
    letter-spacing: 2px;
    padding-right: 6px;
    border-right: 1px solid darkgray;
    padding-left: 5px;
  }

  a:link{
    color: #2b6695;
  }

  a:visited{
    color: #2b6695;
  }
  a:hover{
    color: darkgray;
  }

  a:active{
    color: darkgray;
  }
</style>
