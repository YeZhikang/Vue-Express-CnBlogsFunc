<template>
  <div>
    <h4 class="primary">我要求职</h4>
    <el-row>
      <el-col :span="20" :offset="1">
        <el-form v-model="jdForm">

          <el-row>
            <el-col :span="15">
              <el-form-item label="职位名">
                <el-input v-model="jdForm.title"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7" style="margin-left: 20px">
              <el-form-item label="学历">
                <el-select v-model="jdForm.category">
                  <el-option
                    v-for="categoryOption in categoryOptions"
                    :key="categoryOption.value"
                    :value="categoryOption.value"
                    :name="categoryOption.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="7">
              <el-form-item label="最低薪资">
                <el-input v-model="jdForm.minSalary" placeholder="单位：元"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-form-item label="最高薪资">
                <el-input v-model="jdForm.maxSalary" placeholder="单位：元"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7" style="margin-left: 20px">
              <el-form-item label="分类">
                <el-select v-model="jdForm.tags">
                  <el-option
                    v-for="theme in themes"
                    :key="theme.value"
                    :value="theme.value"
                    :name="theme.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item label="讲讲你会什么">
                <el-input v-model="jdForm.text" type="textarea" :rows="8">
                </el-input>
              </el-form-item>
              <el-button style="width: 100%;margin-bottom: 60px" type="primary" @click="submitHC()">立即提交</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    import '../../../static/main.css'
    export default {
        name: "Employ_JDP",
        data(){
            return{
                jdForm:{
                    title:'',
                    text:'',
                    category:'',
                    minSalary:null,
                    maxSalary:null,
                    tags:'',
                    theme:"求职",
                },
                categoryOptions:[
                    {
                        value:'高中及以下'
                    },
                    {
                        value:'专科'
                    },
                    {
                        value:'本科'
                    },
                    {
                        value:'硕士'
                    },
                    {
                        value:'博士及以上'
                    }
                ],
                themes:[
                    {
                        value:'开发'
                    },
                    {
                        value:'算法'
                    },
                    {
                        value:'运营'
                    },
                    {
                        value:'产品'
                    },
                    {
                        value:'市场'
                    },
                ]
            }
        },
        methods:{
            submitHC(){
                this.$axios.post('/user/postoffer',{jdForm:this.jdForm}).then(res => {
                    if(res.data.code === 200 ){
                        alert("发送成功");
                        this.$router.push('/fgd/招聘')
                    }
                }).catch(error => {
                    console.log(error)
                })
            }
        }
    }
</script>

<style scoped>

</style>
