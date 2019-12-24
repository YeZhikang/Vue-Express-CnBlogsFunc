<template>
  <div>
    <el-row v-for="user in users" class="aActive">
      <el-row>
        <el-col :span="2">
          <img :src="'http://139.155.76.66:3000/'+user+'_images.png'" style="width: 100%;height: 100%">
        </el-col>
        <el-col :span="21" style="margin-left: 15px" class="simple">
          <el-row>
            <router-link :to="'/log/blog/'+user+'/主页'" class="settings">{{user}}</router-link>
            <div style="float: right">
            </div>
          </el-row>
        </el-col>
      </el-row>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "Follow",
        data(){
            return{
                users:[

                ]
            }
        },
        mounted() {
            this.getRelation()
        },
        methods:{
            getRelation(){
                let theme = this.$route.params.follow;
                this.$axios.post('/user/getrelation',{theme:theme}).then(res => {
                    if(theme === "我关注的人") {
                        this.users = [];
                        for(let i = 0;i<res.data.data.length;i++){
                            this.users.push(res.data.data[i].followed)
                        }
                    }else if(theme === "我的粉丝") {
                        this.users = [];
                        for(let i = 0;i<res.data.data.length;i++){
                            this.users.push(res.data.data[i].fan)
                        }
                    }
                }).catch(error => {
                    console.log(error)
                })
            }
        },
        watch:{
            $route:{
                handler:function (val) {
                    this.getRelation()
                }
            }
        }
    }
</script>

<style scoped>
  .aActive{
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px dashed darkgray;
  }
  .simpleA{
    font-size: 12px;
  }
  .simple{
    font-size: 14px;
    color: darkgray;
  }
  .logoSettings{
    padding-bottom: 20px;
    border-bottom: 1px dashed darkgray;
  }

  .name{
    font-family: "Heiti SC";
  }
  .name:link{
    color: #2b6695;
  }

  .name:visited{
    color: #2b6695;
  }

  .settings:hover{
    color: darkgray;
  }
  .settings:active{
    color: darkgray;
  }

  #logo{
    border-radius: 8px;
  }
  .settings{
    font-size: 14px;
    text-decoration:none;
  }
  .settings:link{
    color: darkgray;
  }

  .settings:visited{
    color: darkgray;
  }

  .settings:hover{
    color: #2b6695;
  }
  .settings:active{
    color: #2b6695;
  }
</style>
