<template>
    <div>
      <el-row>
        <el-col :span="18">
          <h3 class="primary">收藏夹</h3>
          <h4 class="warning">{{title}}</h4>
          <el-row>
            <el-col :span="18" :offset="3" style="margin-bottom: 30px">
              <h3 style="text-align: center;margin-top: 100px;font-weight: 600;font-family: 'Heiti SC';">收藏检索</h3>
              <el-input type="text" placeholder="你收藏了什么好东西？" v-model="word"></el-input>
              <el-card v-for="command in commands" style="margin-top: 5px;margin-bottom: 5px;padding-top: 2px;padding-bottom: 2px">
                <router-link :to="command.URL"><h4>{{command.text.title}}</h4></router-link>
                <p>{{command.text.text}}</p>
              </el-card>
            </el-col>
          </el-row>
        </el-col>
        <el-col class="sidebar" :span="6">
          <Directory_Sidebar></Directory_Sidebar>
        </el-col>
      </el-row>
    </div>
</template>

<script>
    import '../../../static/main.css';
    import Directory_Sidebar from "./Directory_Sidebar";
    export default {
        name: "Directory",
        components: {Directory_Sidebar},
        data(){
            return{
                title:'',
                word:'',
                directories:null,
                commands:[]
            }
        },
        mounted() {
            this.$axios.get('/user/getfocuslist').then(res => {
                this.directories = res.data.focusList;
            })
        },
        watch:{
            word:{
                handler:function (val) {
                    if(!val){
                        this.commands = null;
                        return;
                    }
                    let rcommands = [];
                    this.directories.forEach((item) => {
                        if(item.text.text.includes(val) || item.text.title.includes(val)){
                            rcommands.push(item);
                        }
                    });
                    this.commands = rcommands;
                }
            }
        }
    }
</script>

<style scoped>
  .sidebar{
    height: 100%;
    position: fixed;
    right: 0;
    background-color: #f9f9f9;
    border-left: 1px solid #dedede;
  }

  h4{
    margin: 3px;
  }
</style>
