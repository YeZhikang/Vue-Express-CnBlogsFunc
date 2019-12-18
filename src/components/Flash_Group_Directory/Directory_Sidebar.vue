<template>
    <div>
      <el-row>
        <el-col :span="22" :offset="1">
          <h4 class="classic" style="margin-top: 20px">
            收藏夹目录
          </h4>
          <h5 class="classic">问题</h5>
          <ul>
            <li v-for="directory in directoriesQuestion"><router-link :to="directory.URL" class="normal">{{directory.text.title}}</router-link></li>
          </ul>
          <h5 class="classic">博客</h5>
          <ul>
            <li v-for="directory in directoriesBlogs"><router-link :to="directory.URL" class="normal">{{directory.text.title}}</router-link></li>
          </ul>
        </el-col>
      </el-row>
    </div>
</template>

<script>
    import '../../../static/main.css'
    export default {
        name: "Directory_Sidebar",
        data(){
            return {
                directoriesBlogs: [
                    // {
                    //     title:"ok",
                    //     URL:"/hal"
                    // }
                ],
                directoriesQuestion:[

                ]
            }
        },
        mounted() {
            this.$axios.get('/user/getfocuslist').then(res => {
                let directories = res.data.focusList;
                for(let i = 0;i<directories.length;i++){
                    if(directories[i].URL.includes("question")){
                        this.directoriesQuestion.push(directories[i])
                    }else{
                        this.directoriesBlogs.push(directories[i]);
                    }
                }
            })
        }
    }
</script>

<style scoped>

</style>
