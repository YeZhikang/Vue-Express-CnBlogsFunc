<template>
  <div>
  <el-row>
    <el-col :span="20">
      <el-tabs v-model="activeName">
        <el-tab-pane label="收件箱" name="收件箱"></el-tab-pane>
        <el-tab-pane label="发件箱" name="发件箱"></el-tab-pane>
        <el-tab-pane label="未读消息" name="未读消息"></el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
  <el-row>
    <el-table :data="news" border
              style="width: 100%;" size="mini">
      <el-table-column
        fixed
        prop="from"
        label="发件人"
        width="150">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="250">
      </el-table-column>
      <el-table-column
        prop="time"
        label="发送时间"
        width="170">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="处理"
        width="50">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="查看信件"
      :visible.sync="centerDialogVisible"
      width="50%"
      center>
      <div>
        <h2 style="margin-bottom: 4px">{{title}}</h2>
        <span style="text-align: left;font-size: 12px;color: darkgrey">From:{{from}} <br>To:{{to}}</span>
        <br>
        <p style="margin:30px 30px;line-height: 20px">{{text}}</p>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </el-row>

  </div>
</template>

<script>
    export default {
        name: "NewsRecieved",
        data() {
            return {
                centerDialogVisible: false,
                news: [],
                activeName:null,
                title:'',
                text:'',
                from:'',
                to:''
            }
        },
        created(){
            let path = this.$route.path.split('/');
            let theme = path[path.length-1];
            this.activeName = theme;
        },
        methods: {
            handleClick(row) {
                this.centerDialogVisible = true;
                this.title = row.title;
                this.text = row.text;
                this.from = row.from;
                this.to = row.to;
                this.$axios.post('user/readnews',{msg:row.newId}).catch( res => {

                }).catch( error => {
                    console.log(error)
                })
            }
        },

        watch:{
            activeName:{
                handler:function (val, oldVal) {
                    this.$router.push('/log/user/news/'+val);
                    this.$axios.post('/user/getnews',{msg:val}).then( res => {
                        this.news = res.data.msg;
                    }).catch( error => {
                    })
                }
            },
            $route:{
                handler:function (val) {
                    this.activeName = val.path.split('/')[val.path.split('/').length-1];
                }
            }
        },
    }
</script>

<style scoped>

</style>
