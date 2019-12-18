<template>
    <div>
      <el-row>
        <el-dialog title="确认身份" :visible.sync="dialogFormVisible" :close-on-click-modal="isA" :close-on-press-escape="isA" :show-close="isA">
          <el-dialog
            width="30%"
            title="密码错误，请再次输入"
            :visible.sync="innerVisible"
            append-to-body>
          </el-dialog>

          <el-form :model="form">
            <el-form-item label="请输入密码">
              <el-input v-model="form.password" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="checkPassword()">确 定</el-button>
          </div>
        </el-dialog>

        <el-col :span="6">
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
        </el-col>
        <el-col :span="17" :offset="1">
          <el-form>
            <el-row>
              <el-col :span="11">
                <el-form-item label="用户名">
                  <el-input type="text" size="middle" v-model="user.userName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11" :offset="1">
                <el-form-item label="邮箱">
                  <el-input type="text" size="middle" v-model="user.email"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="密码">
                  <el-input type="text" size="middle" v-model="user.password"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="4">
          <el-button type="primary" style="width: 50%;margin-top: 70px" @click="changeUserInfo()">确认</el-button>
        </el-col>
      </el-row>
    </div>
</template>

<script>
    import myUpload from 'vue-image-crop-upload';
    export default {
        name: "Settings",
        data() {
            return {
                innerVisible:false,
                imageUrl: '',
                show: false,
                isA:false,
                params: {
                    token: '123456798',
                    name: 'avatar'
                },
                headers: {
                    smail: ''
                },
                imgDataUrl: '', // the datebase64 url of created image
                user:undefined,
                dialogFormVisible: true,
                form: {
                    password:''
                },
            };
        },
        components: {
            'my-upload': myUpload
        },
        mounted(){
          this.$axios.get('/user/getUserInfo').then(res => {
              this.user = res.data.user;
              console.log(this.user);
              this.headers.smail = this.user.userName;
              this.imgDataUrl = "http://139.155.76.66:3000/"+this.user.userName+"_images.png";
          })
        },
        methods: {
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
            checkPassword(){
              if(this.user.password === this.form.password){
                  this.dialogFormVisible = false
              }else{
                  this.innerVisible = true
              }
            },
            changeUserInfo(){

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

        }
    }
</script>

<style scoped>
  .avatar-uploader  {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  #imgSubmit{
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  #imgSubmit:hover {
    border-color: #409EFF;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
