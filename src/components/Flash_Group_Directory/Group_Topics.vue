<template>
  <div>
    <el-row>
      <el-col :span="24" :offset="0">
        <el-table
          :data="totalData"
          style="width: 100%">
          <el-table-column
            prop="title"
            label="话题"
            width="600">
          </el-table-column>
          <el-table-column
            prop="echo"
            label="回应">
          </el-table-column>
          <el-table-column
            prop="view"
            label="浏览">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="查看">
            width="80">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看/回复</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "Group_Topics",
        data(){
            return{
                totalData:[
                    {
                    }
                ],
                groupId:this.$route.params.id
            }
        },
        mounted(){
            this.getData()
        },
        methods:{
            getData(){
                this.$axios.post('/user/gettopic',{groupId:this.groupId}).then(res => {
                    if( res.data.code === 200){
                        this.totalData = res.data.totalData;
                    }
                }).catch( error => {
                    console.log(error)
                })
            },
            handleClick(row) {
                this.$router.push('/fgd/topic/'+row.topicId)
            }
        }
    }
</script>

<style scoped>

</style>
