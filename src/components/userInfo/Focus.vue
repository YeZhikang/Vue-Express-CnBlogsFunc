<template>
  <div>
    <el-row>
    <el-tabs v-model="activeName">
      <el-tab-pane label="我关注的人" name="我关注的人"></el-tab-pane>
      <el-tab-pane label="我的粉丝" name="我的粉丝"></el-tab-pane>
    </el-tabs>
    </el-row>
    <el-row>
      <router-view></router-view>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "Focus",
        created(){
          this.activeName = this.$route.params.follow
        },
        data(){
            return{
                activeName:'我关注的人'
            }
        },
        watch:{
            activeName:{
                handler:function (val, oldVal) {
                    this.$router.push('/log/user/focus/'+val)
                }
            },
            $route:{
                handler:function (val, oldVal) {
                    this.activeName = this.$route.params.follow
                    if(this.$route.path.indexOf("我关注的")!=-1){
                        this.activeName = "我关注的人"
                    }
                    if(this.activeName == "我关注的"){
                        this.activeName = "我关注的人"
                    }
                },
                deep: true
            }
        }
    }
</script>

<style scoped>

</style>
