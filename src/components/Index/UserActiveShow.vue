<template>
    <div>
      <el-row>
        <el-col :span="24" :offset="0">
          <fgd-nav style="position: fixed;width: 100%;z-index: 999"></fgd-nav>
          <el-row>
            <el-col :span="4" style="position: fixed;height: 100%;border-right: 1px solid darkgrey;background: rgb(251,251,251);padding-top: 50px">
              <h3 class="primary">{{userName}}</h3>
              <h4 class="primary" style="margin-left: 46px">数据图表</h4>
            </el-col>
            <el-col :span="18" :offset="5" style="margin-top: 120px;display: flex;flex-wrap: wrap">
              <div id="total" :style="{width: '500px', height: '300px'}"></div>
              <div id="theme" :style="{width: '500px', height: '300px'}"></div>
              <div id="relation" :style="{width: '1000px', height: '300px'}"></div>
              <div style="width: 100%;border-top: 1px dashed darkgrey;display: flex">
                <div id="groupInfo" style="margin-top: 40px" :style="{width: '500px', height: '300px'}"></div>
                <div style="margin:30px 100px">
                  <h4>组内成员</h4>
                  <p style="font-family: Monaco;font-size: 30px;text-align: right;color: #565e33"> {{ groupMember }} </p>
                </div>
                <div style="margin:30px 60px">
                  <h4>组内活跃度</h4>
                  <p style="font-family: Monaco;font-size: 30px;text-align: right;color: #364c5e"> {{activeNumber}} </p>
                </div>
              </div>
            </el-col>
          </el-row>

        </el-col>
      </el-row>
    </div>
</template>

<script>
    import '../../../static/main.css';
    import IndexNav from "./Nav";
    import FgdNav from "../Flash_Group_Directory/Nav";
    export default {
        name: "UserActiveShow",
        components: {FgdNav, IndexNav},
        created(){
        },
        mounted(){
            this.getHistoryData();
        },
        data(){
            return{
                userName:null,
                totalCount:null,
                ideData:null,
                behaviorData:null,
                fansCount:null,
                dateCount:null,
                activeNumber:null,
                groupMember:null,
                focusData:[]
            }
        },
        methods:{
            getHistoryData(){
              this.$axios.get('/user/getHistoryData').then(res => {
                  let allData = res.data.allData;
                  this.userName = allData.userName;
                  this.totalCount = allData.totalCount;
                  this.ideData = allData.ideData;
                  this.behaviorData = allData.behaviorData;
                  this.fansCount = allData.fansCount;
                  this.dateCount = allData.dateCount;
                  this.activeNumber = allData.activeNumber;
                  this.groupMember = allData.groupMember;
                  this.focusData = allData.focusData;
                  this.drawLine();
                  this.getUserInfo();
              }).catch(error => {
                  console.log(error)
              })
            },
            getUserInfo(){
                this.$axios.get('/user/getUserInfo').then(res => {
                    this.userName = res.data.userName;
                }).catch(error => {
                    console.log(error)
                })
            },
            drawLine(){
                // 基于准备好的dom，初始化echarts实例
                let total = this.$echarts.init(document.getElementById('total'));
                let theme = this.$echarts.init(document.getElementById("theme"));
                let relation = this.$echarts.init(document.getElementById("relation"));
                let groupInfo = this.$echarts.init(document.getElementById("groupInfo"));
                // 绘制图表
                total.setOption({
                    title: { text: '发帖统计' },
                    tooltip: {},
                    xAxis: {
                        data: this.dateCount
                    },
                    yAxis: {},
                    series: [{
                        name: '发帖量',
                        type: 'bar',
                        data: this.totalCount
                    }]
                });
                groupInfo.setOption({
                    title: { text: '小组统计' },
                    tooltip: {},
                    series: [{
                        name: '身份',
                        type: 'pie',
                        radius: '55%',
                        data: this.ideData
                            // {
                            //     name: "管理员",
                            //     value: 1
                            // },
                            // {
                            //     name: "成员",
                            //     value: 1
                            // },
                    }]
                });
                theme.setOption({
                    title: { text: '行为统计' },
                    tooltip: {},
                    series: [{
                        name: '行为',
                        type: 'pie',
                        radius: '55%',
                        data: this.behaviorData
                        //     [
                        //     {
                        //         name:"发博",
                        //         value:2
                        //     },
                        //     {
                        //         name:"提问",
                        //         value:1
                        //     },
                        //     {
                        //         name:"回答",
                        //         value:2
                        //     },
                        //     {
                        //         name:'小组访问',
                        //         value:1
                        //     }
                        // ]
                    }]
                });
                relation.setOption({
                    title: { text: '收藏、粉丝及关注' },
                    tooltip: {

                    },
                    xAxis: {
                        data: ["关注","粉丝","收藏"]
                    },
                    yAxis: {},
                    series: [{
                        name:'数据',
                        type:'line',
                        data:this.focusData,
                        lineStyle:{
                            normal:{
                                color:"#5d5d82"
                            }
                        },
                        markPoint : {
                            data : [
                                {name : '收藏', value : this.focusData[0], xAxis: "关注", yAxis: this.focusData[0]},
                                {name : '粉丝', value : this.focusData[1], xAxis: "粉丝", yAxis: this.focusData[1]},
                                {name : '关注', value : this.focusData[2], xAxis: "收藏", yAxis: this.focusData[2]},
                            ]
                        },
                    },]
                    //     [
                    //     {
                    //         name: '粉丝量',
                    //         type: 'line',
                    //         data: [5, 20, 11, 10, 10, 20]
                    //     },
                    //     {
                    //         name: '关注量',
                    //         type: "line",
                    //         data: [1, 7, 10, 2, 3, 5]
                    //     }
                    // ]
                });
            },

        }
    }
</script>

<style scoped>
.primary{
  font-weight: 400;
}
</style>
