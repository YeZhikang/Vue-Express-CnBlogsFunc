<template>
    <div>
      <el-row :gutter="8" style="margin: 20px">
        <h2>新闻主题</h2>
        <el-col :span="6" v-for="theme in themes" style="margin-top: 20px">
          <el-card shadow="hover">
            <p style="color: #006262">{{theme.name}} <i :class="'el-icon-'+theme.logo"></i></p>
          </el-card>
        </el-col>
      </el-row>
    </div>
</template>

<script>
    export default {
        name: "Theme",
        data(){
            return{
                themes:[
                    {
                        name:'民生新闻',
                        logo:'check'
                    },
                    {
                        name:'国内技术圈',
                        logo:'document-remove'
                    },
                    {
                        name:'国际新闻',
                        logo:'finished'
                    },
                    {
                        name:"语言动态",
                        logo:'view'
                    },
                    {
                        name:'大事记',
                        logo:'magic-stick'
                    },
                    {
                        name:'名人说',
                        logo:'s-opportunity'
                    },
                    {
                        name:'技术峰会',
                        logo:'s-comment'
                    },
                ]
            }
        }
    }
</script>

<style scoped>
  h2{
    font-size: 22px;
    font-weight: 400;
    font-family: Arial;
  }
</style>
