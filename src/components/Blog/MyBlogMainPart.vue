<template>
  <div style="margin-top: 20px">
    <el-row style="margin-top: 30px">
      <el-row>
        <el-col :span="20" :offset="1">
          <h3>发表的博客</h3>
          <p v-if="!blogs.length">暂时没有博客</p>
          <el-card v-for="blog in blogs"><router-link :to="{name:'detailBlog',params:{title:blog.URL}}">
            <h4>{{blog.title}}</h4>
            <p>{{blog.text.length>30 ? blog.text.substring(0,30)+'...':blog.text}}</p>
          </router-link>
          </el-card>
          <h3>问题</h3>
          <p v-if="!questions.length">暂时没有问题</p>
          <el-card v-for="question in questions"><router-link :to="question.URL">
            <h4>{{question.title}}</h4>
            <p>{{question.text.length>30 ? question.text.substring(0,30)+'...':question.text}}</p>
          </router-link>
          </el-card>
          <h3>想法</h3>
          <p v-if="!minds.length">暂时没有想法</p>
          <el-card v-for="mind in minds">
            <h4>{{mind.name}}</h4>
            <p>{{mind.text.length>30 ? mind.text.substring(0,30)+'...':mind.text}}</p>
          </el-card>
        </el-col>
      </el-row>
    </el-row>
  </div>
</template>

<script>
    import MyBlog from "./MyBlog";
    export default {
        name: "MyBlogMainPart",
        components: {MyBlog},
        data(){
            return{
                theme:'博客主页',
                minds:[],
                questions:[],
                blogs:[],
                userName:''
            }
        },
        created(){
            this.getUserInfo();
            let theme = this.$route.params.theme;
            this.theme = theme;
        },
        mounted(){
            this.getActives();
        },
        methods:{
            goback(){
              this.$router.push('/log/blog/'+this.$route.path.split('/')[this.$route.path.split('/').length-2]);
              this.theme = this.$route.path.split('/')[this.$route.path.split('/').length-1]
            },
            getActives(){
                this.$axios.post('/user/getactive',{msg:"我的",userName:this.$route.params.user}).then(res => {
                    let actives = res.data.active;
                    actives.forEach(item => {
                        if(!item.URL){
                            this.minds.push(item)
                        }else if(item.URL.includes("question")){
                            this.questions.push(item)
                        }else{
                            this.blogs.push(item)
                        }
                    })
                })
            },
            getUserInfo(){
                this.$axios.get('/user/getUserInfo').then(res => {
                    this.userName = res.data.userName;
                }).catch(error => {
                    console.log(error);
                })
            }
        },
        watch:{
            $route:{
                handler:function (val) {
                }
            }
        }
    }
</script>

<style scoped>
  h3{
    font-size: 18px;
    font-weight: 400;
    font-family: "Heiti SC";
    padding-left: 6px;
    margin-left: 3px;
    border-left: 4px solid darkcyan;
  }
  h4,p{
    margin: 0;

  }

  a:link{
    color: #2f435e;
  }

  a:visited{
    color: #2f435e;
  }

  a:hover{
    color: #2f435e;
  }

  a:active{
    color: #2f435e;
  }

  a{
    text-decoration: none;
  }
</style>
