<template>
    <div>
      <el-row>
        <el-col :span="15" :offset="1">
          <h3 style="border-left: 6px solid #2f435e;padding-left: 7px;">创建小组</h3>
          <el-form v-model="groupInfo">
            <el-form-item label="小组名称">
              <el-row>
                <el-col :span="15">
                  <el-input v-model="groupInfo.title"></el-input>
                </el-col>
                <el-col :span="5" :offset="1" style="margin-left: 10px">
                  <el-form-item label="开放小组">
                    <el-switch v-model="groupInfo.isOpen"></el-switch>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="小组简介">
              <el-input type="textarea" :rows="8" v-model="groupInfo.text"></el-input>
            </el-form-item>
            <el-form-item label="小组类别: " >
              <el-checkbox-group v-model="groupInfo.types">
                <el-checkbox label="技术分享" name="type"></el-checkbox>
                <el-checkbox label="生活" name="type"></el-checkbox>
                <el-checkbox label="交友" name="type"></el-checkbox>
                <el-checkbox label="学习经验" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="setGroup()">立即创建</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
</template>

<script>
    export default {
        name: "Group_Set",
        data(){
            return{
                groupInfo:{
                    types:[],
                    text:'',
                    title:'',
                    isOpen:true
                }
            }
        },
        methods:{
            setGroup(){
                this.$axios.post('/user/setgroup',{group:this.groupInfo}).then(res => {
                    if(res.data.code === 200){
                        alert("创建成功");
                    }
                }).catch(error => {
                    console.log(error)
                })
            }
        }
    }
</script>

<style scoped>

</style>
