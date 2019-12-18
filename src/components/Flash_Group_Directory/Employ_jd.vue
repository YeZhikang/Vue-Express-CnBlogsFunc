<template>
  <div>
    <el-row>
      <el-col :span="20">
          <el-card v-for="jd in jds">
            <router-link :to="jd.URL"><h3>{{jd.title}}</h3></router-link>
            <p>{{jd.text}}</p>
          </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "Employ_jd",
        data(){
            return{
                jds:[],

            }
        },
        mounted() {
            this.$axios.get('/user/getjdlist').then(res => {
                this.jds = res.data.jds;
            }).catch(error => {
                console.log(error)
            })
        }
    }
</script>

<style scoped>

</style>
