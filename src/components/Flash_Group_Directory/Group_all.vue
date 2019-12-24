<template>
    <div>
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
</template>

<script>
    export default {
        name: "Group_all",
        data(){
            return{
                noGroup:false,
                groups:[
                ]
            }
        },
        mounted() {
            this.$axios.post('/user/getgroup',{theme:'all'}).then(res => {
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
