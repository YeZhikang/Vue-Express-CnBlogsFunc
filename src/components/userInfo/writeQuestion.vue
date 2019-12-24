<template>
    <el-row>
      <el-col :span="14" :offset="1">
        <el-form>
          <el-form-item >
            <h2>写下你的问题</h2>
            <el-input type="text" placeholder="标题" v-model="Question.title"></el-input>
          </el-form-item>
          <el-form-item style="margin-bottom: 0">
            <el-input type="textarea" :rows="7" placeholder="问题内容" v-model="Question.text"></el-input>
          </el-form-item>
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


            <el-button type="text" style="color:darkgoldenrod; float: right;margin-right: 10px" @click="submitQuestion()">发布</el-button>

        </el-form>
      </el-col>
      <el-col :span="6" :offset="1" style="margin-top: 70px; margin-left: 50px;">
        <img :src="'http://139.155.76.66:3000/'+userName+'_images.png'" style="width:100%;height: 100%;  border-radius: 8px;box-shadow: 5px 5px 15px lightgray">
      </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "writeQuestion",
        data(){
            return{
                imgsSrc:'',
                userName:'',
                dynamicTags: [],
                inputVisible: false,
                inputValue: '',
                Question:{
                    answerNumber:0,
                    text:'',
                    tags:[],
                    title:'',
                    time:'',
                    author:''
                }
            }
        },
        mounted(){
            this.$axios.get('/user/getUserInfo').then(res => {
                this.userName = res.data.userName
            }).catch(error => {
                console.log(error)
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
            submitQuestion(){
                let Question = this.Question;
                Question.tags = this.dynamicTags;
                Question.author = this.userName;
                this.$axios.post('/user/question',{data:Question}).then( res => {
                    if(res.data.code == 200){
                        setTimeout(this.$notify({
                            title:'提问成功',
                        }),1000);
                        setTimeout(this.$router.push('/question/我的博问'),1000)
                    }
                }).catch( error => {
                    console.log(error)
                })
            }
        },

    }
</script>

<style scoped>

</style>
