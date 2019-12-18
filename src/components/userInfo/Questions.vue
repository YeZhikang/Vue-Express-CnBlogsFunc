<template>
  <div>
    <el-row>
      <el-col :span="20" :offset="2">
        <div style="padding: 10px 20px;border-radius: 7px;box-shadow:rgb(240,240,240) 1px 0px 16px 5px">
          <h2 style="margin-bottom: 4px">{{question.title}} &nbsp;&nbsp;&nbsp;
            <el-button v-if="unfocus" type="text" size="mini" @click="focus">关注问题</el-button>
            <el-button v-if="!unfocus" type="text" size="mini" @click="focus">取消关注</el-button>
          </h2>
          <span style="font-size: 12px;font-weight: 300;color: #2f435e;">提问者：{{question.author}} --- 提问时间：{{question.time}} --- 回答人数：{{question.answerNumber}}</span>
          <hr>
          <p>{{question.text}}</p>
          <div class="tags">
            <span>{{question.tags.length > 0 ? question.tags.toString() : '未设置标签'}}</span>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="20" :offset="2"  style="margin-top: 20px">
        <el-card v-for="comment in comments" shadow="never" body-style="{ padding: '10px' }" >
          <p style="font-size: 13px;line-height: 15px;font-family: 'Heiti SC';margin: 0">{{comment.text}}</p>
          <div class="tags">
            <span>{{comment.author}} -- {{comment.time}}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="20" :offset="2" >
        <el-form>
          <el-form-item label="回复">
            <el-input type="textarea" :rows="7" v-model="commentText" placeholder="友善地说说你的想法"></el-input>
            <el-button type="text" @click="sendComment()">发送</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "Questions",
        data(){
            return{
                questionId : this.$route.params.id,
                question:null,
                comments:null,
                commentText:'',
                unfocus:true
            }
        },
        mounted(){
            this.$axios.post('/user/questioninfo',{id:this.questionId}).then(res => {
                if(res.data.code == 200) {
                    this.question = res.data.data;
                    console.log(this.question);
                }
            }).catch( err => {
                console.log(err)
            }).then(() => {
                this.$axios.post('/user/isfocus',{main:{
                        text:this.question,
                        URL:'/questions/'+this.questionId
                    }}).then(res => {
                    this.unfocus = !res.data.isFocus;
                    console.log(res.data.isFocus);
                })
            })
            this.$axios.post('/user/commentinfo',{id:this.questionId}).then(res => {
                if(res.data.code == 200) {
                    this.comments = res.data.data;
                    console.log(this.comments);
                }
            }).catch( err => {
                console.log(err)
            })
        },
        methods:{
            sendComment(){
                this.$axios.post('/user/sendcomment',{id:this.questionId,comment:this.commentText}).then(res => {
                    if(res.data.code == 200){
                    //    alert
                        alert("发送完成");
                        this.$router.push(0);
                    }else{
                        alert("请再发送一次")
                    }
                }).catch(error => {
                    console.log(error)
                })
            },
            focus(){
                this.unfocus = !this.unfocus;
                this.$axios.post('/user/focus',{
                    unfocus:this.unfocus,
                    main:{
                        text:this.question,
                        URL:'/questions/'+this.questionId
                    }
                }).then(res => {
                    console.log(res)
                }).catch(error => {
                    console.log(error)
                })
            }
        },
        watch:{
        }
    }
</script>

<style scoped>
  .tags{
    text-align: right;
    font-size: 10px;
    color: #2f435e;
  }


</style>
