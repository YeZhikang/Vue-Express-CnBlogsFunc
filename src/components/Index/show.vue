<template>
  <div>
    <el-row style="margin-left: 25px">
  <el-col>
    <el-tabs v-model="activeName" >
      <el-tab-pane label="最新发布" name="最新发布"></el-tab-pane>
      <el-tab-pane label="推荐新闻" name="推荐新闻"></el-tab-pane>
      <el-tab-pane label="热门新闻" name="热门新闻"></el-tab-pane>
      <el-tab-pane label="最新评论" name="最新评论"></el-tab-pane>
    </el-tabs>
    <el-row v-for="report in reports" style="margin-top: 10px;padding: 10px 0;border-bottom: 1px dashed darkgrey" :gutter="12">
      <el-col :span="2" >
        <div class="like" @click="report.likes++" style="width: 50px;border-radius: 7px">
          <div style="width: 100%;line-height: 30px;text-align: center;background-color: #e9e9eb">
            <span>{{report.likes}}</span>
          </div>
          <div style="width: 100%;line-height: 18px;font-size: 10px;text-align: center;background-color: #f5dab1;height: 18px">
            <span>推荐</span>
          </div>
        </div>
      </el-col>
      <el-col :span="18">
        <h3 class="report-title">{{report.title}}</h3>
        <p class="report-main">{{report.main}}</p>
        <p class="information">{{report.author}} 投递 - 评论 ({{report.comment}}) - 浏览 ({{report.view}}) - theme ({{report.theme}})</p>
      </el-col>
      <el-col :span="3">
        <img src="../../images/nav-logo-A.jpeg" style="width: 100%;height: 100%;">
      </el-col>
    </el-row>
  </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "show",
        data(){
            return{
                activeName:'最新发布',
                reports:[
                    {
                        likes:1,
                        title:"长征八号运载火箭芯二级氢氧发动机高空模拟试验成功 预计明年首飞",
                        main:"新华社北京 12 月 2 日电（记者胡喆）记者从中国航天科技集团有限公司获悉，长征八号运载火箭芯二级氢氧发动机近日成功完成高空模拟试验，意味着该型火箭距明年首飞又近了一步。 据悉，此次试验是为长征八号运载火箭提供交付发动机的校准试验，主要目的是校验发动机大喷管并获取“上天”发动机的性能数据，" +
                            "验证是否",
                        author:'新华社',
                        comment:0,
                        view:0,
                        theme:'国内新闻'
                    }
                ]
            }
        }
    }
</script>

<style scoped>
  ul{
    font-size: 13px;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  li{
    line-height: 20px;
    color: darkgrey;
  }
  .report-title{
    font-size: 16px;
    line-height: 20px;
    margin: 0;
  }
  .report-main{
    font-size: 13px;
    line-height: 15px;
  }
  .information{
    font-size: 12px;
    color: rgb(100,100,100);
    line-height: 20px;
  }
</style>
