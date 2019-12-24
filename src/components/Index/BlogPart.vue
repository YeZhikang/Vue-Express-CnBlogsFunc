<template>
  <div>
    <div class="card" style="padding-bottom: 0;">
      <div class="aCard">
      <router-link to="/">
         {{$route.params.blogpart}}
      </router-link>
      </div>
    </div>
    <div class="mainPart">
      <div class="top">
        <ul id="rank">
          <li id="editorLike"><a :href="editorLikeBlog.url">【 编辑推荐 】{{editorLikeBlog.name}} ({{editorLikeBlog.comments}}/{{editorLikeBlog.readNum}}) »</a></li>
          <li ><a :href="mostLikesBlog.url">&nbsp;&nbsp;[ 最多推荐 ]{{mostLikesBlog.name}}  ({{mostLikesBlog.comments}}/{{mostLikesBlog.readNum}}) »</a></li>
          <li ><a :href="mostCommentsBlog.url">&nbsp;&nbsp;[ 最多评论 ]{{mostCommentsBlog.name}}  ({{mostCommentsBlog.comments}}/{{mostCommentsBlog.readNum}}) »</a></li>
          <li ><a :href="newsTop.url">&nbsp;&nbsp;[ 新闻头条 ]{{newsTop.name}}  ({{newsTop.comments}}/{{newsTop.readNum}}) »</a></li>
          <li ><a :href="recomdNews.url">&nbsp;&nbsp;[ 推荐新闻 ]{{recomdNews.name}}  ({{recomdNews.comments}}/{{recomdNews.readNum}}) »</a></li>
        </ul>
      </div>
      <div class="middle">
        <ul id="blogs">
          <li v-for="blog in blogs" class="ablog">
            <div class="likeButton">
              <el-button type="text"><i class="el-icon-caret-top"></i></el-button>
              <h4>{{blog.likeNum}}</h4>
            </div>
            <div class="blogMain">
              <h3>{{blog.name}}</h3>
              <div class="blog-icon-main">
                <img class="icon" src="../../images/nav-logo-A.jpeg" >
                <p>{{blog.main}}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "BlogPart",
        data(){
            return{
                blogs:[

                ],
                theme:'',
                editorLikeBlog:{
                    name:'',
                    comments:0,
                    readNum:0,
                    url:''
                },
                mostLikesBlog:{
                    name:'',
                    comments:0,
                    readNum:0,
                    url:''
                },
                mostCommentsBlog:{
                    name:'',
                    comments:0,
                    readNum:0,
                    url:''

                },
                newsTop:{
                    name:'',
                    comments:0,
                    readNum:0,
                    url:''
                },
                recomdNews:{
                    name:'',
                    comments:0,
                    readNum:0,
                    url:''
                }
            }
        },
        computed:{
        },
        watch:{
            /*
                监听路由属性
             */
            $route:{
              handler:function (val, oldVal) {
                this.theme = this.$route.params.blogpart
              },
              deep: true
            }
        },
        methods:{
        },
        mounted() {
          this.$axios.get('/user/getcommand').then(res => {
              if(res.data.code === 200) {
                  this.editorLikeBlog = res.data.blogs[0]
                  this.mostLikesBlog = res.data.blog[1]
                  this.mostCommentsBlog = res.data.blogs[2]
                  this.newsTop = res.data.blog[3]
                  this.recomdNews = res.data.blog[4]
              }
          })
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
    border: 1px solid darkgray;

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

</style>
