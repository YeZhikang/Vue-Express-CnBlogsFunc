<template>
  <div>
    <el-row>
      <el-tabs v-model="activeName">
        <el-tab-pane label="精华" name="精华"></el-tab-pane>
        <el-tab-pane label=".Net 技术" name=".Net 技术"></el-tab-pane>
        <el-tab-pane label="编程语言" name="编程语言"></el-tab-pane>
        <el-tab-pane label="程序设计" name="程序设计"></el-tab-pane>
        <el-tab-pane label="Web前端" name="Web前端"></el-tab-pane>
        <el-tab-pane label="企业信息化" name="企业信息化"></el-tab-pane>
        <el-tab-pane label="手机开发" name="手机开发"></el-tab-pane>
        <el-tab-pane label="软件工程" name="软件工程"></el-tab-pane>
        <el-tab-pane label="数据库技术" name="数据库技术"></el-tab-pane>
        <el-tab-pane label="操作系统" name="操作系统"></el-tab-pane>
        <el-tab-pane label="其他分类" name="其他分类"></el-tab-pane>
        <el-tab-pane label="所有随笔" name="所有随笔"></el-tab-pane>
        <el-tab-pane label="所有评论" name="所有评论"></el-tab-pane>
      </el-tabs>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="mainPart" >
          <div class="top">
            <ul id="rank">
              <li id="editorLike"><router-link :to="'/log/blog/'+editorLikeBlog.author+'/p/'+editorLikeBlog.URL">【 编辑推荐 】{{editorLikeBlog.title}} ({{editorLikeBlog.likeNum}}/{{editorLikeBlog.commentNum}}) »</router-link></li>
              <li ><router-link :to="'/log/blog/'+mostLikesBlog.author+'/p/'+mostLikesBlog.URL">&nbsp;&nbsp;[ 最多推荐 ]{{mostLikesBlog.title}}  ({{mostLikesBlog.likeNum}}/{{mostLikesBlog.commentNum}}) »</router-link></li>
              <li ><router-link :to="'/log/blog/'+mostCommentsBlog.author+'/p/'+mostCommentsBlog.URL">&nbsp;&nbsp;[ 最多评论 ]{{mostCommentsBlog.title}}  ({{mostCommentsBlog.likeNum}}/{{mostCommentsBlog.commentNum}}) »</router-link></li>
              <li ><router-link :to="'/log/blog/'+newsTop.author+'/p/'+newsTop.URL">&nbsp;&nbsp;[ 新闻头条 ]{{newsTop.title}}  ({{newsTop.likeNum}}/{{newsTop.commentNum}}) »</router-link></li>
              <li ><router-link :to="'/log/blog/'+recomdNews.author+'/p/'+recomdNews.URL">&nbsp;&nbsp;[ 推荐新闻 ]{{recomdNews.title}}  ({{recomdNews.likeNum}}/{{recomdNews.commentNum}}) »</router-link></li>
            </ul>
          </div>
          <div class="middle">
            <ul id="blogs">
              <li v-for="blog in blogs" class="ablog">
                <div class="likeButton">
                  <el-button type="text"><i class="el-icon-caret-top"></i></el-button>
                  <h4>{{blog.commentNum}}</h4>
                </div>
                <div class="blogMain">
                  <router-link :to="'/log/blog/'+blog.author+'/p/'+blog.URL"><h3>{{blog.title}}</h3></router-link>
                  <div class="blog-icon-main">
                    <img class="icon" :src="'http://139.155.76.66:3000/'+blog.author+'_images.png'" style="width: 50px;height: 50px">
                    <p style="margin-top: 0">{{blog.text.substring(0,30).split('&')[0]}}</p>
                  </div>
                  <div style="padding-bottom: 15px">
                    <router-link to="/">{{blog.author}}</router-link>
                    发布于： {{blog.time}}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="block">
          <el-pagination
            layout="prev, pager, next"
            :total="length"
            @current-change="handleCurrentChange">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    import { Loading } from 'element-ui';
    export default {
        name: "newBlogPart",
        data(){
            return{
                activeName:'精华',
                blogs:[
                    {
                    }
                ],
                theme:'',
                editorLikeBlog:{
                    title:'',
                    likeNum:0,
                    commentNum:0,
                    url:''
                },
                mostLikesBlog:{
                    title:'',
                    likeNum:0,
                    commentNum:0,
                    url:''
                },
                mostCommentsBlog:{
                    title:'',
                    likeNum:0,
                    commentNum:0,
                    url:''
                },
                newsTop:{
                    title:'',
                    likeNum:0,
                    commentNum:0,
                    url:''
                },
                recomdNews:{
                    title:'',
                    likeNum:0,
                    commentNum:0,
                    url:''
                },
                currentPage:1,
                length:0
            }
        },
        beforeCreate(){
            let loadingInstance = Loading.service({ fullscreen: true });
            this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                loadingInstance.close();
            });
        },
        methods:{
            handleCurrentChange(val) {
                this.currentPage = val;
                this.$axios.post('/blogs/getBlog',{msg:this.activeName,page:this.currentPage}).then(res => {
                    let data = res.data.msg;
                    this.blogs = data;
                    console.log(this.blogs)
                    console.log(this.length);
                }).catch(error => {
                    console.log(error)
                })
            }
        },
        created(){
           let theme = this.$route.path.split('/')[this.$route.path.split('/').length-1];
           this.activeName = theme;
           this.$axios.post('/blogs/getBlog',{msg:theme,page:this.currentPage}).then(res => {
                let data = res.data.msg;
                console.log(data);
                this.blogs = data;
                this.length = res.data.totalData;
                console.log(this.length);
                // for(var i = 0;i<data.length;i++){
                //   let blog = {
                //       likeNum:data[i].diggnum,
                //       name:data[i].title,
                //       main:data[i].post_item_summary,
                //       author:data[i].author,
                //       blogURL:'/',
                //       authorURL:'/'
                //   };
                //   console.log(blog.name);
                //   this.blogs.push(blog)
                // }
            }).catch(error => {
                console.log(error)
            });
        },
        mounted(){
            this.$router.push(0);
            this.$axios.get('/user/getcommand').then(res => {
                console.log(res);
                if(res.data.code === 200) {
                    this.editorLikeBlog = res.data.blogs[0]
                    this.mostLikesBlog = res.data.blogs[1]
                    this.mostCommentsBlog = res.data.blogs[2]
                    this.newsTop = res.data.blogs[3]
                    this.recomdNews = res.data.blogs[4]
                }
            })
        },
        watch:{
            $route:{
                handler:function (val) {
                    this.activeName = val.path.split('/')[val.path.split('/').length-1];
                }
            },
            activeName:{
                handler:function (val) {
                    this.$router.push('/main/'+val);
                    console.log(val);
                    this.$axios.post('/blogs/getBlog',{msg:val,page:this.currentPage}).then(res => {
                        let data = res.data.msg;
                        console.log(data);
                        this.blogs = data;
                        this.length = res.data.totalData;
                        console.log(this.length);
                        // for(var i = 0;i<data.length;i++){
                        //   let blog = {
                        //       likeNum:data[i].diggnum,
                        //       name:data[i].title,
                        //       main:data[i].post_item_summary,
                        //       author:data[i].author,
                        //       blogURL:'/',
                        //       authorURL:'/'
                        //   };
                        //   console.log(blog.name);
                        //   this.blogs.push(blog)
                        // }
                    }).catch(error => {
                        console.log(error)
                    });
                }
            },
            blogs:{
                handler:function (val) {
                    let loadingInstance = Loading.service({ fullscreen: true });
                    this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                        loadingInstance.close();
                    });
                }
            }
        }
    }
</script>

<style scoped>
  .ablog{
    border-bottom: 1px dashed darkgray;

  }

  .blog-icon-main{
    display: flex;
  }

  #blogs p{
    padding-left: 8px;
  }
  .icon{
    width: 80px;
    height: 80px;
    margin-bottom: 10px;
  }

  #blogs h4{
    margin-top: 0px;
    font-size: 17px;
    margin-left: 8px;
  }

  .likeButton i{
    font-size: 26px;
    padding-right: 20px;
  }
  .el-button{
    padding-bottom: 4px;
  }
  #blogs li{
    display: flex;
    padding: 0;
    color: #2b6695;

  }

  #blogs h3{
    font-size: 20px;
    margin-top: 9px;
  }

  #blogs {
    margin-left: 8px;
    padding: 0;
  }

  #rank li{
    color: #2b6695;
  }

  #rank{
    list-style: none;
    padding: 0;
  }

  ul{
    margin-top: 4px;
  }

  #editorLike{
    font-size: 14px;
  }

  li{
    font-size: 10px;
  }

  .mainPart{
    width: 100%;
    margin-left: 10px;
    margin-top: 0;

  }
  .card{
    margin-top: 6px;
    margin-left: 15px;

    padding: 3px 5px ;
    font-size: 15px;
  }
  a{
    text-decoration: none;
  }
  a:link{
    color: #2b6695;
  }
  a:visited{
    color: #2b6695;
  }
  a:hover{
    color: darkorange;
  }

  a:active{
    color: darkorange;
  }

  .card{
    display: inline-block;
  }

  .aCard{
    display: inline-block;
    border-top: 1px solid darkgray;
    border-left: 1px solid darkgray;
    border-right: 1px solid darkgray;
    padding: 4px 7px;
  }

  .block{
    text-align: center;
  }
</style>
