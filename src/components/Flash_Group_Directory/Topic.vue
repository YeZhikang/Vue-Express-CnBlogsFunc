<template>
  <div>
    <el-row>
      <el-col :span="15" :offset="1" >
        <h2 style="border-left: 5px solid #3a8ee6;padding-left: 7px">话题详情</h2>
        <el-card>
          <h3>{{topic.title}}   <span style="font-size: 14px;color: rgb(77,77,77)">由:{{topic.author}} 创建于:{{topic.time}}</span></h3>
          <p>{{topic.text}}</p>
        </el-card>
        <el-row>
          <el-col :span="24" style="margin-top: 20px">
            <el-card v-for="comment in comments" shadow="never" body-style="{ padding: '10px' }" >
              <p style="font-size: 13px;line-height: 15px;font-family: 'Heiti SC';margin: 0">{{comment.text}}</p>
              <div class="tags">
                <span>{{comment.author}} -- {{comment.time}}</span>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-form>
          <el-form-item label="回复">
            <el-input type="textarea" :rows="7" v-model="commentText" placeholder="友善地说说你的想法"></el-input>
            <el-button type="text" @click="sendComment()">发送</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="6" :offset="1">
        <h4>关注其他话题</h4>
        <ul>
          <li v-for="topic in commandTopics">
            <router-link :to="'/fgd/topic/'+topic.topicId"><span>{{topic.title}}</span></router-link>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "Topic",
        data(){
            return{
                topic:{
                },
                commentText:'',
                comments:[

                ],
                commandTopics:[

                ]
            }
        },
        mounted(){
            this.getTopic();
            this.getComments();
            this.getCommandTopics();
        },
        methods:{
            getTopic(){
                const topicId = this.$route.params.id;
                this.$axios.post('/user/topicdetail',{topicId:topicId}).then(res => {
                    this.topic = res.data.data;
                }).catch(error => {
                    console.log(error)
                })
            },
            sendComment(){
                this.$axios.post('/user/setcomment',{id:this.$route.params.id,comment:this.commentText}).then(res => {
                    if(res.data.code == 200){
                        //    alert
                        alert("发送完成");
                    }else{
                        alert("请再发送一次")
                    }
                }).catch(error => {
                    console.log(error)
                })
            },
            getComments(){
                this.$axios.post('/user/topiccomentinfo',{id:this.$route.params.id}).then(res => {
                    if(res.data.code == 200) {
                        this.comments = res.data.data;
                    }
                }).catch( err => {
                    console.log(err)
                })
            },
            getCommandTopics(){
                this.$axios.post('/user/getcommandtopics',{name:this.$route.params.id}).then(res => {
                    if(res.data.code == 200) {
                        this.commandTopics = res.data.data;
                    }
                }).catch( err => {
                    console.log(err)
                })
            }
        },
        watch:{
            $route:{
                handler:function (val) {
                    this.getTopic();
                    this.getComments();
                    this.getCommandTopics();
                }
            }
        }
    }
</script>

<style scoped>
  .tags{
    text-align: right;
    font-size: 10px;
    color: #2f435e;
  }
  ul{
    padding: 0;
    margin: 0;
    list-style: none;
    font-size: 13px;
    color: #2f435e;
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
    color: darkcyan;
  }

  a:active{
    color: darkcyan;
  }
</style>
