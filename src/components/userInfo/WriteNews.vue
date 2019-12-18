<template>
    <div>
      <el-row>
        <el-col :span="20" :offset="2">
          <el-form v-model="newsForm">
            <el-form-item  label="收件人">
              <el-input v-model="newsForm.to" type="text"></el-input>
            </el-form-item>
            <el-form-item  label="主题">
              <el-input v-model="newsForm.title" type="text"></el-input>
            </el-form-item>
            <el-form-item >
              <el-input type="textarea" placeholder="输入内容" v-model="newsForm.text"
                        :autosize="{ minRows: 8, maxRows: 11}">
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="sendMail()" type="primary">发送</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
</template>

<script>
    export default {
        name: "WriteNews",
        data(){
            return{
                newsForm:{
                    to:'',
                    text:'',
                    title:''
                }
            }
        },
        methods:{
            sendMail(){
              this.$axios.post('/user/sendmail',{msg:this.newsForm}).then(res => {
                  console.log(res)
                  this.$router.push('/log/user/news/发件箱');
              }).catch(error => {
                  console.log(error)
              })
            }
        },
        mounted() {
            let toId = this.$route.query.toId;
            if(toId){
                this.newsForm.to = toId
            }
        }
    }
</script>

<style scoped>

</style>
