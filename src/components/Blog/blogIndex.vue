<template>
  <div>
  <el-row style="margin-top: 30px">
    <el-row>
      <el-col :span="20" :offset="1">
        <h3>发表的博客</h3>
        <el-card v-for="blog in blogs"><router-link :to="'/log/blog/'+userName+'/p/'+blog.URL">
          <h4>{{blog.title}}</h4>
          <p>{{blog.text.length>30 ? blog.text.substring(0,30)+'...':blog.text}}</p>
        </router-link>
        </el-card>
        <h3>问题</h3>
        <el-card v-for="question in questions"><router-link :to="question.URL">
          <h4>{{question.title}}</h4>
          <p>{{question.text.length>30 ? question.text.substring(0,30)+'...':question.text}}</p>
        </router-link>
        </el-card>
        <h3>想法</h3>
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
    export default {
        name: "blogIndex",
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
            const theme = this.$route.path.split('/')[this.$route.path.split('/').length-1];
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
                this.$axios.post('/user/getactive',{msg:"我的"}).then(res => {
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
                    this.theme = val.path.split('/')[val.path.split('/').length-1];
                }
            },
            theme:{

            }
        },
        beforeRouteUpdate (to, from, next) {
            // 在当前路由改变，但是该组件被复用时调用
            // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
            // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
            // 可以访问组件实例 `this`
        },
    }
</script>

<style scoped>

</style>
