<template>
  <div>
    <el-row style="margin: 10px 0 10px 0;padding: 15px 0 10px 0;border-bottom: 1px dashed darkgray" :gutter="12" v-for="question in questions">
      <el-col :span="3" >
        <div class="likeCard">
          <p style="font-size:14px;padding: 12px 0 ;margin: 0;color: rgb(55,55,55);font-family:'Heiti SC';background-color: lightgray">{{question.answerNumber}}</p>
          <span>回答数</span>
        </div>
      </el-col>
      <el-col :span="21">
        <router-link :to="question.URL"><h4 class="title">{{question.title}}</h4></router-link>
        <p class="main">{{question.text}}</p>
        <div class="from">
          <router-link  :to="'/log/blog/'+question.author+'/主页'">{{question.author}}</router-link> --- <span style="font-size: 10px;">{{question.time}}</span></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "QustionHolding",
        data(){
            return{
                currentTheme:this.$route.params.theme,
                questions:[
                ]
            }
        },
        methods:{
            getQuestion(){
                this.$axios.post('/user/getquestion',{msg:this.currentTheme}).then(res => {
                    if(res.data.code == 200) {
                        this.questions = res.data.data;
                        this.questions.forEach(item => {
                            item.focusOn = true
                        });
                    }else{

                    }
                }).catch(error => {
                    console.log(error)
                })
            },
            searchQuestion(val){
                this.$axios.post('/user/search',{theme:'question',data:val}).then(res => {
                    this.questions = res.data.docs
                })
            }
        },
        mounted() {
            this.getQuestion();
        },
        watch:{

            $route:{
                handler:function (val) {
                    this.currentTheme = val.params.theme;
                    const key = val.query.key;
                    this.getQuestion();
                    if(key){
                        this.searchQuestion(key);
                    }
                }
            }
        }
    }
</script>

<style scoped>
  .title{
    margin: 3px 0;
    font-size: 14px;
    font-weight: 500;
  }
  .main{
    font-size: 12px;
    color: rgb(100,100,100);
  }

  .from{
    text-align: right;
    margin-right: 30px;
    font-size: 13px;

  }
  .likeCard{
    font-size: 12px;
    text-align: center;
    padding: 0;
    width: 50px;
    border-radius: 4px;
    border: 1px solid darkgray;
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
