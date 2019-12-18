<template>
    <div>
      <el-row>
        <el-col :span="18">
          <el-row>
            <el-col :span="7">
                <img  id="logo" style="width: 100%;height: 100%" :src="'http://139.155.76.66:3000/'+userName+'_images'+'.png'">
            </el-col>
            <el-col :span="16" :offset="1">
                <el-row class="logoSettings">
                  <el-col :span="16">
                    <router-link to="/log/user" class="name">{{userName}}</router-link>
                  </el-col>
                  <el-col :span="6" :offset="2">
                    <router-link to="/log/user/settings" class="settings">修改个人资料</router-link>
                  </el-col>
                </el-row>
                <el-row style="margin-top: 20px">
                    <el-form>
                      <el-form-item style="margin-bottom: 0">
                        <el-input type="textarea" :rows="3" placeholder="你现在在想什么，在做什么？" v-model="text"></el-input>
                      </el-form-item>
                      <el-form-item label="公开它">
                        <el-switch v-model="isOpen"></el-switch>
                        <el-popover
                          ref="popover4"
                          placement="right"
                          width="200"
                          trigger="click">
                        <el-tag
                          :key="tag"
                          v-for="tag in dynamicTags"
                          closable
                          :disable-transitions="false"
                          @close="handleClose(tag)">
                          {{tag}}
                        </el-tag>
                        <el-input
                          class="input-new-tag"
                          v-if="inputVisible"
                          v-model="inputValue"
                          ref="saveTagInput"
                          size="small"
                          @keyup.enter.native="handleInputConfirm"
                          @blur="handleInputConfirm"
                        >
                        </el-input>
                        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                        </el-popover>
                        <el-button v-popover:popover4 style="margin-left: 15px;" type="text">添加标签 {{dynamicTags.length > 0 ? dynamicTags.length : null}}</el-button>

                        <el-button type="text" style="color:darkgoldenrod; float: right;margin-right: 10px" @click="submitMind()">发布</el-button>
                      </el-form-item>
                    </el-form>
                </el-row>
            </el-col>
          </el-row>
          <el-tabs v-model="activeName">
            <el-tab-pane label="最新动态" name="最新动态"></el-tab-pane>
            <el-tab-pane label="我的" name="我的"></el-tab-pane>
            <el-tab-pane label="全站" name="全站"></el-tab-pane>
          </el-tabs>
          <router-view></router-view>
        </el-col>
        <el-col :span="5" :offset="1" class="focus">
          <el-row>
            我的关注：{{myFollowed}}
          </el-row>
          <el-row>
            我的粉丝：{{myFollowers}}
          </el-row>
          <el-row>
            <h3 style="margin-bottom: 0;font-size: 14px">寻找园友</h3>
            <el-input v-model="findUser"></el-input>
            <el-button type="text" size="small" style="float: right" @click="searchUser">查找</el-button>
            <br>
            <p v-if="!haveUser">{{warning}}</p>
            <p><router-link v-if="haveUser" :to="'/log/blog/'+result+'/'">{{result}}</router-link></p>
          </el-row>
        </el-col>

      </el-row>
    </div>
</template>

<script>
    export default {
        name: "Garden",
        data(){
            return{
                findUser:'',
                myFollowed:null,
                myFollowers:null,
                haveUser:false,
                actives:[
                ],
                isOpen:true,
                activeName:this.$route.params.theme,
                imgsSrc:'',
                userName:'',
                dynamicTags: [],
                inputVisible: false,
                inputValue: '',
                text:'',
                result:null
            }
        },

        mounted(){
            this.$axios.get('/user/getUserInfo').then(res => {
                this.userName = res.data.userName
            }).catch(error => {
              console.log(error)
          })
            this.$axios.post('/user/getrelation',{theme:"我关注的人"}).then(res => {
                this.myFollowed = res.data.data.length;
            })
            this.$axios.post('/user/getrelation',{theme:"我的粉丝"}).then(res => {
                this.myFollowers = res.data.data.length;
            })
        },
        methods:{
            handleClose(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            },

            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.dynamicTags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },
            submitMind(){
                const Mind = {
                    tags : this.dynamicTags,
                    text : this.text,
                    author : this.userName,
                    applaud : 0,    // 鼓掌数
                    isOpen:this.isOpen
                };
                this.$axios.post('/user/mind',{data:Mind}).then( res => {
                    if(res.data.code == 200){
                        setTimeout(this.$notify({
                            title:'发送成功',
                        }),1000);
                    }
                }).catch( error => {
                    console.log(error)
                })
            },
            searchUser(){
                this.$axios.post('/user/search',{theme:'user',data:this.findUser}).then(res => {
                    if(res.data.errMsg){
                        this.warning = "没有相关用户";
                        this.haveUser = false
                        return;
                    }else{
                        this.result = res.data.docs.userName;
                        this.haveUser = true;
                    }
                    console.log(this.result)
                }).catch(error => {
                    console.log(error)
                })
            }
        },
        watch:{
            activeName:{
                handler: function (val) {
                    console.log(val);
                    this.$router.push('/log/user/garden/'+val)

                }

              },
            dynamicTags:{
                handler: (val) => {
                }
            },
            findUser:{
                handler:function (val) {
                    this.searchUser();
                }
            }
        },

    }
</script>

<style scoped>
  .focus{
    font-size: 14px;
  }
  .aActive{
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px dashed darkgray;
  }
  .simpleA{
    font-size: 12px;
  }
  .simple{
    font-size: 14px;
    color: darkgray;
  }
.logoSettings{
  padding-bottom: 20px;
  border-bottom: 1px dashed darkgray;
}

.name{
  font-family: "Heiti SC";
}
  .name:link{
  color: #2b6695;
}

.name:visited{
  color: #2b6695;
}

.settings:hover{
  color: darkgray;
}
.settings:active{
  color: darkgray;
}

#logo{
  border-radius: 8px;
}
  .settings{
    font-size: 14px;
    text-decoration:none;
  }
  .settings:link{
    color: darkgray;
  }

  .settings:visited{
    color: darkgray;
  }

  .settings:hover{
    color: #2b6695;
  }
  .settings:active{
    color: #2b6695;
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }

  a{
    font-size: 14px;
    text-decoration: none;
  }

  a:link{
    color: #2f435e;
  }

  a:visited{
    color: #2f435e;
  }

  a:hover{
    color: darkcyan;
  }

  a:active{
    color:darkcyan;
  }
</style>
