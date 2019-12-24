<template>
  <div>
    <h3 style="padding-left: 7px;border-left: 7px solid #3a8ee6">修改信息</h3>
    <el-form v-model="groupInfo">
      <el-row style="padding-bottom: 40px">
      <el-col :span="17">
        <el-form-item label="简介">
          <el-input type="textarea" :rows="3" placeholder="讲讲这个小组是来做什么的"></el-input>
        </el-form-item>
        <el-form-item label="公告">
          <el-input type="textarea" :rows="7" placeholder="公告栏目"></el-input>
        </el-form-item>
        <el-button type="primary">提交修改</el-button>
      </el-col>
        <el-col :span="5" :offset="1">
          <div>
            <my-upload field="img"
                       @crop-success="cropSuccess"
                       @crop-upload-success="cropUploadSuccess"
                       @crop-upload-fail="cropUploadFail"
                       v-model="show"
                       :width="300"
                       :height="300"
                       url="http://139.155.76.66:3000/blogs/uploads"
                       :params="params"
                       :headers="headers"
                       img-format="png"></my-upload>
            <img :src="imgDataUrl" style="width: 100%;height: 100%">
            <el-button style="width: 100%;margin-top: 0" size="mini" class="btn" @click="toggleShow">设置头像</el-button>
          </div>
          <h4 style="padding-left: 7px;border-left: 5px solid #939393">组内人员查询</h4>
          <el-input v-model="userName" placeholder="输入用户名" size="mini">
          </el-input>
          <div style="margin-top: 10px;margin-left: 5px">
            <span v-if="blurIt">无该用户</span>
            <span v-if="!noUser"> 姓名 ：{{user}}  <el-button type="text" size="middle" @click="dialogVisible = true"> 操作 </el-button></span>
          </div>
          <el-dialog
            :title="user"
            :visible.sync="dialogVisible"
            width="40%"
            :before-close="handleClose">
            <el-form>
              <el-form-item label="设置管理员">
                <el-switch v-model="changeAdmin"></el-switch>
              </el-form-item>
              <el-form-item label="封禁">
                <el-select v-model="banTime" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.value"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </el-dialog>
          <h4 style="padding-left: 7px;border-left: 5px solid #939393">话题查询</h4>
          <el-input v-model="topicSearch" placeholder="输入话题名" size="mini"></el-input>
          <span v-if="ablurIt">无该用户</span>
          <span v-if="!anoUser" v-for="topic in topics" style="background-color: #e9e9eb;padding: 5px 10px"> {{topic.title}}  <el-button type="text" size="middle" @click="dialogVisible = true"> 操作 </el-button><br></span>


        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
    import myUpload from 'vue-image-crop-upload';

    export default {
        name: "Group_ChangeInfo",
        components: {
            'my-upload': myUpload
        },
        data(){
            return{
                dialogVisible: false,
                userName:'',
                user:null,
                groupInfo:{

                },
                changeInfo:{

                },
                noUser:true,
                blurIt:false,
                anoUser:true,
                ablurIt:false,
                banTime:null,
                changeAdmin:false,
                topicSearch:'',
                options:[
                    {
                        value:'7 天'
                    },
                    {
                        value:'一个月'
                    },
                    {
                        value:'两个月'
                    },
                    {
                        value:'半年'
                    }
                ],
                topics:[],
                imageUrl: '',
                show: false,
                params: {
                    token: '123456798',
                    name: 'avatar'
                },
                headers: {
                    smail: ''
                },
                imgDataUrl: '', // the datebase64 url of created image
            }
        },
        mounted(){
            this.headers.smail = this.$route.params.id;
            this.imgDataUrl = "http://localhost:3000/"+this.$route.params.id+"_images.png";
        },
        methods:{
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },

            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            submitImages(){
                console.log("submitImages");
                let file = document.getElementById("upload_file").files[0];
                let formData = new FormData();
                formData.append('img',file,file.name);
                console.log(formData);
                let config = {
                    headers:{'Content-Type':'multipart/form-data'}
                };  //添加请求头
                this.$axios.post('/blogs/uploads',formData,config).then((response) =>{
                    console.log(response.data);
                })
            },
            toggleShow() {
                this.show = !this.show;
            },
            /**
             * crop success
             *
             * [param] imgDataUrl
             * [param] field
             */
            cropSuccess(imgDataUrl, field){
                console.log('-------- crop success --------');
                this.imgDataUrl = imgDataUrl;
            },
            /**
             * upload success
             *
             * [param] jsonData   服务器返回数据，已进行json转码
             * [param] field
             */
            cropUploadSuccess(jsonData, field){
                console.log('-------- upload success --------');
                console.log(jsonData);
                console.log('field: ' + field);
            },
            /**
             * upload fail
             *
             * [param] status    server api return error status, like 500
             * [param] field
             */
            cropUploadFail(status, field){
                console.log('-------- upload fail --------');
                console.log(status);
                console.log('field: ' + field);
            }
        },
        watch:{
            userName:{
                handler:function (val) {
                    if(!val){
                        this.blurIt = false;
                        this.noUser = true;
                        return;
                    }
                    this.$axios.post('/user/searchgroupmember',{userName:this.userName,groupId:this.$route.params.id}).then(res => {
                        let member = res.data.member;
                        console.log(member);
                        if(member){
                            this.user = member;
                            this.noUser = false
                            this.blurIt = false
                        }else{
                            this.blurIt = true;
                            this.noUser = true
                        }
                    }).catch(error => {
                        console.log(error)
                    })
                }
            },
            topicSearch:{
                handler:function (val) {
                    if(!val){
                        this.ablurIt = false;
                        this.anoUser = true;
                        return;
                    }
                    this.$axios.post('/user/searchtopic',{topicName:this.topicSearch,groupId:this.$route.params.id}).then(res => {
                        this.topics = res.data.topics;
                        if(this.topics){
                            this.anoUser = false
                            this.ablurIt = false
                        }
                    }).catch(error => {
                        console.log(error)
                    })
                }
            }
        }
    }
</script>

<style scoped>

  span{
    font-size: 15px;
    font-family: "Heiti SC";
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
