<template>
  <div id="wangeditor">
    <el-row>
      <el-col style="margin-left: 15px;margin-top: 10px">
        <router-link to="/log/user">回到首页</router-link>
      </el-col>
    </el-row>
    <el-row>
      <el-col style="text-align: center;margin-top: 80px;font-family: 'Heiti SC'">
        <h2>组内发言</h2>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="16" :offset="4">
        <div style="text-align: right">
          请选择小组：<select id="theme">
          <option v-for="theme in themes" :value="theme.title">{{theme.title}}</option>
        </select>
        </div>
        <input id="title" type="text" style="width: 936px;padding: 10px;font-size: 18px;font-weight:bold;font-family: 'Heiti SC'" placeholder="请输入标题">
        <div  ref="editorElem" style="text-align:left;"></div>
        <button  type="button" style="width: 100%" @click="getHTML" id="login_click"><a style="width: 100%">提交</a></button>
      </el-col>
    </el-row>

  </div>
</template>

<script>
    import E from "wangeditor"
    export default {
        name: "WriteTopic",
        beforeCreate(){
            this.$router.push(0)
        },
        data(){
            return{
                theme: '博客主页',
                word: '',
                dialogVisible: true,
                themes:[]
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
                document.getElementById('theme').value;
                this.$axios.post('/user/sendtopic',{
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
            },

        },
        created() {
              this.$axios.post('/user//getgroup',{theme:'我的'}).then(res => {
                  this.themes = res.data.groups
              })
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
