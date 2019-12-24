<template>
    <div>
      <el-row>
        <el-col :span="24">
            <div v-if="noGroup">
              <h3>抱歉...你现在还没有加入小组</h3>
              <p>小组是一个全新的社群系统。加入小组可以增长知识，结交更多志同道合的人。或许...你有想去的小组？</p>
            </div>
            <div v-if="!noGroup">
              <el-row v-for="group in groups" style="padding-bottom: 10px;border-bottom: 1px dashed darkgrey">
                  <el-col :span="2">
                    <img :src="'http://139.155.76.66:3000/'+group.groupId+'_images.png'" style="width: 100%;height: 100%">
                  </el-col>
                  <el-col :span="21" style="margin-left: 18px">
                    <h4><router-link :to="'/fgd/group/'+group.groupId">{{group.title}}</router-link>  <span>( 成员: {{group.groupNumber}} / 热度: {{group.groupPopular}} )</span> <span style="float: right">成立于 {{group.time}}</span></h4>
                    <p><router-link :to="'/fgd/group/'+group.groupId">{{group.text}}</router-link></p>
                  </el-col>
              </el-row>
            </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
    export default {
        name: "Group_MyGroup",
        data(){
            return{
                noGroup:false,
                groups:[
                    /*
                    {
                        name:'.NET技术',
                        main:'啦啦啦啦苏门答腊岛吗柳德米拉是多么老师点名了',
                        people:400,
                        popular:1023,
                        time:'2019-10-14',
                        url:'https://www.baidu.com'
                    }

                     */
                ]
            }
        },
        mounted() {
            this.$axios.post('/user/getgroup',{theme:'我的'}).then(res => {
                this.groups = res.data.groups;
            }).catch(error => {
                console.log(error)
            })
        }
    }

</script>

<style scoped>
  .el-col h4{
      margin: 3px;
      font-size: 20px;
  }

  .el-col p{
    font-size:13px;
    color: rgb(66,66,66);
  }

  .el-col span{
    font-size: 12px;
    color: rgb(66,66,66);
  }

  a{
    text-decoration: none;
  }

   a:link{
    color: rgb(55,55,55);
  }

   a:visited{
     color: rgb(55,55,55);
  }

  a:hover{
     color: #385677;
   }

  a:active{
    color: #385677;
  }


</style>
