<template>
  <div>
  <el-row v-for="active in actives" class="aActive">
    <el-row>
      <el-col :span="2">
        <img :src="'http://139.155.76.66:3000/'+active.author+'_images.png'" style="width: 100%;height: 100%">
      </el-col>
      <el-col :span="21" style="margin-left: 15px" class="simple">
        <el-row>
          <router-link :to="'/log/blog/'+active.author" class="settings">{{active.author}}</router-link>  :
          <router-link class="name">{{active.title}}</router-link>
          <span style="float: right">{{active.time}}</span>
        </el-row>
        <el-row class="simpleA">
          {{ (active.text.length>40) ? active.text.substring(0,40) + '...' : active.text}}
        </el-row>
      </el-col>
    </el-row>
  </el-row>
  </div>
</template>

<script>
    export default {
        name: "Active",
        data(){
            return{
                actives:[

                ],
            }
        },
        mounted() {
            const val = this.$route;
            const theme = val.params.theme;
            this.$axios.post('/user/getactive',{msg:theme}).then(res => {
                console.log(res.data.active);
                this.actives = res.data.active
            }).catch(err => {
                console.log(err)
            })
        },
        watch:{
            $route:{
                handler:function (val) {
                    const theme = val.params.theme;
                    this.$axios.post('/user/getactive',{msg:theme}).then(res => {
                        console.log(res.data.active);
                        this.actives = res.data.active
                    }).catch(err => {
                        console.log(err)
                    })
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
