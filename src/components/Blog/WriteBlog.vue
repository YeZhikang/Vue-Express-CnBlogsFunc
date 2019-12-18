<template>
  <div id="wangeditor">
    <el-row>
      <el-col style="margin-left: 15px;margin-top: 10px">
        <router-link to="/log/user">回到首页</router-link>
      </el-col>
    </el-row>
    <el-row>
      <el-col style="text-align: center;margin-top: 80px;font-family: 'Heiti SC'">
        <h2>Tell Me What You Thought</h2>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="16" :offset="4">
        <div style="text-align: right">
        请选择分区：<select id="theme">
          <option value =".Net 技术">.Net 技术</option>
          <option value ="编程语言">编程语言</option>
          <option value="程序设计">程序设计</option>
          <option value="Web前端">Web前端</option>
        <option value ="企业信息化">企业信息化</option>
        <option value ="手机开发">手机开发</option>
        <option value="软件工程">软件工程</option>
        <option value="数据库技术">数据库技术</option>
        <option value ="操作系统">操作系统</option>
        <option value ="其他分类">其他分类</option>
        <option value ="其他分类">所有随笔</option>
        <option value="程序设计">所有评论</option>
        </select>
        </div>
        <input id="title" type="text" style="width: 936px;padding: 10px;font-size: 18px;font-weight:bold;font-family: 'Heiti SC'" placeholder="请输入标题">
        <div  ref="editorElem" style="text-align:left;"></div>
        <button type="button" style="width: 100%" @click="getHTML" id="login_click"><a style="width: 100%">提交</a></button>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import E from "wangeditor"
    export default {
        name: "WriteBlog",
        beforeCreate(){
            this.$router.push(0)
        },
        data(){
            return{
                data(){
                    return{
                        theme:'博客主页',
                        word:'',
                        dialogVisible: true
                    }
                },
                created(){
                    const theme = this.$route.path.split('/')[this.$route.path.split('/').length-1];
                    this.theme = theme;
                },
                methods:{
                    goback(){
                        this.$router.push('/log/blog/'+this.$route.path.split('/')[this.$route.path.split('/').length-2]);
                        this.theme = this.$route.path.split('/')[this.$route.path.split('/').length-1]
                    }
                },
                watch:{
                    $route:{
                        handler:function (val) {
                            this.theme = val.path.split('/')[val.path.split('/').length-1];
                            console.log(this.theme)
                        }
                    }
                }
            }

          },
        mounted() {
            this.editor = new E(this.$refs.editorElem);
            // 编辑器的事件，每次改变会获取其html内容
            this.editor.customConfig.onchange = html => {
                this.editorContent = html;
                this.catchData(this.editorContent); // 把这个html通过catchData的方法传入父组件
            };
            this.editor.customConfig.menus = [
                // 菜单配置
                'head', // 标题
                'bold', // 粗体
                'fontSize', // 字号
                'fontName', // 字体
                'italic', // 斜体
                'underline', // 下划线
                'strikeThrough', // 删除线
                'foreColor', // 文字颜色
                'backColor', // 背景颜色
                'link', // 插入链接
                'list', // 列表
                'justify', // 对齐方式
                'quote', // 引用
                'emoticon', // 表情
                'image', // 插入图片
                'table', // 表格
                'code', // 插入代码
                'undo', // 撤销
                'redo' // 重复
            ];
            this.editor.create(); // 创建富文本实例
        },
        methods:{
            getHTML(){
                document.getElementById('theme').value
                this.$axios.post('/user/postblog',{
                    title:document.getElementById('title').value,
                    html:this.editor.txt.html(),
                    theme:document.getElementById('theme').value,
                    text:this.editor.txt.text()
                }).then(res => {
                    console.log(res);
                    alert("发表成功！")
                    this.$router.push('/');
                }).catch( error => {
                    console.log(error)
                })
            }
        },
        created() {

        }
    }



</script>

<style scoped>
  a{
    color: #ffffff;
  }


  #login_click{  height:40px;}
  #login_click
  {


    text-decoration:none;
    background:#2f435e;
    color:#f2f2f2;
    font-size:16px;
    font-family: 微软雅黑,宋体,Arial,Helvetica,Verdana,sans-serif;
    font-weight:bold;
    border-radius:3px;

    -webkit-transition:all linear 0.30s;
    -moz-transition:all linear 0.30s;
    transition:all linear 0.30s;

  }
  #login_click a:hover { background:#385f9e; }

</style>
