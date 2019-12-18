<template>
  <div class="mainbody">
    <el-row>
      <el-col :span="3">
        <div class="sidebar">
          <div class="first">
            <h3><i class="el-icon-s-operation"></i>网站分类</h3>
            <ul>
              <li><router-link to="/main/.Net 技术">.Net 技术 ({{blogNum.net}})    <i class="el-icon-arrow-right"></i></router-link></li>
              <li><router-link to="/main/编程语言">编程语言 ({{blogNum.lang}}) <i class="el-icon-arrow-right"></i></router-link></li>
              <li><router-link to="/main/程序设计">程序设计 ({{blogNum.design}}) <i class="el-icon-arrow-right"></i></router-link></li>
              <li><router-link to="/main/Web前端">Web前端 ({{blogNum.front}}) <i class="el-icon-arrow-right"></i></router-link></li>
              <li><router-link to="/main/企业信息化">企业信息化 ({{blogNum.it}}) <i class="el-icon-arrow-right"></i></router-link></li>
              <li><router-link to="/main/手机开发">手机开发 ({{blogNum.mobile}}) <i class="el-icon-arrow-right"></i></router-link></li>
              <li><router-link to="/main/软件工程">软件工程 ({{blogNum.ruangong}}) <i class="el-icon-arrow-right"></i></router-link></li>
              <li><router-link to="/main/数据库技术">数据库技术 ({{blogNum.sqlTech}}) <i class="el-icon-arrow-right"></i></router-link></li>
              <li><router-link to="/main/操作系统">操作系统 ({{blogNum.os}}) <i class="el-icon-arrow-right"></i></router-link></li>
              <li><router-link to="/main/其他分类">其他分类 ({{blogNum.other}}) <i class="el-icon-arrow-right"></i></router-link></li>
              <li><router-link to="/main/所有随笔">所有随笔 ({{blogNum.allBlogs}}) <i class="el-icon-arrow-right"></i></router-link></li>
              <li><router-link to="/main/所有评论">所有评论 ({{blogNum.allComments}}) <i class="el-icon-arrow-right"></i></router-link></li>
            </ul>
          </div>
        </div>
      </el-col>
      <el-col :span="16">
        <router-view></router-view>
      </el-col>
      <el-col :span="4" style="margin-top: 50px;margin-left: 20px">
        <el-row :gutter="12">
          <el-col :span="18">
            <el-input size="mini" v-model="insite" ></el-input>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" size="mini" @click="find()">找找看</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="12" style="margin-top: 15px">
          <el-col :span="18">
            <el-input size="mini" v-model="google"></el-input>
          </el-col>
          <el-col :span="6">
            <el-button type="warning" size="mini"  @click="googleSearch()">谷歌搜</el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>



    export default {
        name: "Sidebar",
        data(){
            return {
                blogNum:{
                    net:0,
                    lang:0,
                    design:0,
                    front:0,
                    it:0,
                    mobile:0,
                    ruangong:0,
                    sqlTech:0,
                    os:0,
                    other:0,
                    allBlogs:0,
                    allComments:0,
                },
                google:'',
                insite:''
            }
        },
        methods:{
            googleSearch(){
                this.$router.push('https://www.google.com/search?q='+this.google+'&oq='+this.google+'&aqs=chrome..69i57.1290j0j4&sourceid=chrome&ie=UTF-8')
            }
        }

    }
</script>

<style scoped>

  .mainbody{
    margin: 8px;

  }
  .first{
    border-top: 1px solid #2b6695;
    border-left: 3px solid #2b6695;
    border-right: 0.5px solid #2b6695;
    border-bottom: 1px solid #2b6695;

  }
  .sidebar{
    margin: 10px 8px 0 3px;
    width: 168px;
  }

  .sidebar h3{
    font-size: 17px;
    font-weight: 400;
    margin: 0px;
    padding: 4px;
    border-bottom: 0.5px solid #2b6695;
    border-right: 0.5px solid #2b6695;
    background-color: rgb(240,240,240);


  }

  ul{
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li{
    line-height: 20px;
    font-size: 12px;
    padding:3px 0px 3px 6px;
    border-bottom: 0.5px solid #2b6695;

  }

  li i{
    color:#2b6695 ;
    float: right;
    line-height: 20px;
    margin-right: 5px;

  }

</style>
