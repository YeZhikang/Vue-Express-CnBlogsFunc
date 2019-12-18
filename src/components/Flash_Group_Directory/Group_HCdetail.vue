<template>
  <div>
    <fgd-nav></fgd-nav>
    <Employ></Employ>
    <el-row>
      <el-col :span="20" :offset="2">
          <h4  class="primary" style="margin-left: 0;font-size: 20px">职位信息</h4>
          <h5 class="mainTh" style="font-size: 18px;border-left: 7px #2f435e solid ">职位 : {{hc.title}}    <span style="font-size: 12px;color: darkgrey;"> ----- {{hc.author}}  ----- {{hc.time}}</span></h5>
          <h5 class="mainTh">薪资待遇 : {{hc.salary}}</h5>
          <p class="intro"> 工作介绍 : {{hc.text}}</p>
        <el-button round style="float:right;" size="small" type="danger" @click="connect()">立即联系</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    import FgdNav from "./Nav";
    import Employ from "./Employ";
    import '../../../static/main.css';

    export default {
        name: "Group_HCdetail",
        components: {Employ, FgdNav},
        data(){
            return{
                HCid:this.$route.params.id,
                hc:null
            }
        },
        mounted() {
            this.$axios.post('/user/getHCdetail',{id:this.HCid}).then(res => {
                this.hc = res.data.hc;
                console.log(this.hc)
            }).catch(error => {
                console.log(error)
            })
        },
        methods:{
            connect(){
                this.$router.push({
                    path:'/log/user/write',
                    query:{
                        toId:this.hc.author
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
