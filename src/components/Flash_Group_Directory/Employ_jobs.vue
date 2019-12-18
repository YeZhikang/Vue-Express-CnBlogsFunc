<template>
  <div>
    <el-row>
      <el-col :span="20">
        <el-card v-for="hc in hcs">
          <router-link :to="hc.URL"><h3>{{hc.title}}</h3></router-link>
          <p>{{hc.text}}</p>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "Employ_jobs",
        data(){
            return{
                hcs:[]
            }
        },
        mounted() {
            this.$axios.get('/user/gethclist').then(res => {
                this.hcs = res.data.hcs;
            }).catch(error => {
                console.log(error)
            })
        }
    }
</script>

<style scoped>

</style>
