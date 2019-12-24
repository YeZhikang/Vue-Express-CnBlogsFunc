<template>
  <div>
    <fgd-nav></fgd-nav>
    <Employ></Employ>
    <el-row>
      <el-col :span="20" :offset="2">
        <h4  class="primary" style="margin-left: 0;font-size: 20px">需要职位</h4>
        <h5 class="mainTh" style="font-size: 18px;border-left: 7px #2f435e solid ">职位 : {{jd.title}}    <span style="font-size: 12px;color: darkgrey;"> -----发起人 ： {{jd.author}}  ----- 发布时间 ：{{jd.time}}</span></h5>
        <h5 class="mainTh">薪资要求 : {{jd.salary}}</h5>
        <p class="intro"> 个人介绍 : {{jd.text}}</p>
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
        name: "Group_JDdetail",
        components: {Employ, FgdNav},
        data(){
            return{
                jd:null,
                JDid:this.$route.params.id
            }
        },
        mounted() {
            this.$axios.post('/user/getJDdetail',{id:this.JDid}).then(res => {
                this.jd = res.data.jd;
            }).catch(error => {
                console.log(error)
            })
        },
        methods:{
            connect(){
                this.$router.push({
                    path:'/log/user/write',
                    query:{
                        toId:this.jd.author
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
