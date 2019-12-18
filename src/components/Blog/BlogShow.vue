<template>
  <div style="margin-top: 20px">
    <el-page-header @back="goback" :content="theme">
    </el-page-header>
    <el-row>
      <el-col :span="20" :offset="2" style="margin:20px 0;padding: 20px;font-size: 14px;line-height: 20px">
        <div v-html="html">
        </div>
      </el-col>
      <el-col :span="2">
        <el-button v-if="unfocus" style="display: inline-block" round size="mini" @click="focus()">收藏博客</el-button>
        <el-button v-if="!unfocus" style="display: inline-block" round size="mini" @click="focus()">取消收藏</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "BlogShow",
        data(){
            return{
                theme:'博客主页',
                html:'',
                blog:null,
                unfocus:true,
                url:this.$route.path
            }
        },
        created(){
            this.$router.push(0);
            console.log('ol');
            const id = this.$route.params.title;
            this.$axios.post('/blogs/gethtml',{msg:id}).then(res => {
                let Blog = res.data.msg[0];
                console.log(Blog);
                this.blog = Blog;
                console.log(this.blog)
                this.theme = Blog.title;
                this.html = Blog.html;
            }).catch(err => {
                console.log(err)
            });
        },
        mounted(){
          this.$axios.post('/user/isfocus',{
              main:{
                  text:this.blog,
                  URL:this.url
              }
          }).then(res => {
              this.unfocus = !res.data.isFocus
          }).catch(error => {
              console.log(error)
          })
        },
        methods:{
            goback(){
                this.$router.push('/log/blog/'+this.$route.params.user);
                this.theme = this.$route.path.split('/')[this.$route.path.split('/').length-1]
            },
            focus(){
                this.unfocus = !this.unfocus;
                this.$axios.post('/user/focus',{
                    unfocus:this.unfocus,
                    main:{
                        text:this.blog,
                        URL:this.url
                    }
                }).then(res =>{

                }).catch(error => {
                    console.log(error)
                })
            }
        },
        watch:{
            $route:{
                handler:function (val) {
                    this.$router.go(0);
                    this.theme = val.path.split('/')[val.path.split('/').length-1];
                    console.log(this.theme)
                }
            }
        }
    }
</script>

<style scoped>

</style>
