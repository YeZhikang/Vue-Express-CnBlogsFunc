<template>
  <div>
    <el-row>
      <el-col :span="24" style="margin: auto;text-align: center;background-color: #0a3e5e">
        <div style="padding: 30px;">
          <h2 class="group-title">找找看</h2>
          <p class="group-intro">你想了解些什么?</p>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="14" :offset="5" style="margin-top: 100px">
        <el-input placeholder="输入你想找的东西" v-model="findText"></el-input>
        <el-card v-for="res in resLists">
          <h4 class="primary" style="margin-left: 0px">{{res.title}}</h4>
          <p class="text">{{res.text}}</p>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    import FgdNav from "./Nav";
    import Employ from "./Employ";
    import '../../../static/main.css';
    export default {
        name: "Find",
        data(){
            return{
              findText:'',
              resLists:null
            }
        },
        watch:{
            findText:{
                handler:function (val) {
                    if(!val){
                        this.resLists = null;
                        return;
                    }
                    this.$axios.post('/user/getfindres',{text:val}).then(
                        res => {
                            console.log(res);
                            this.resLists = res.data.data
                        }
                    ).catch(error => {
                        console.log(error)
                    })
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

  .group-intro{
    font-size: 20px;
    font-family: "Heiti SC";
    font-weight: 500;
    color: white;
  }
</style>
