<template>
    <div>
      <el-row>
        <el-col :span="24">
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="首页">首页</el-menu-item>
            <el-menu-item index="小组">小组</el-menu-item>
            <el-menu-item index="收藏">收藏</el-menu-item>
            <el-menu-item index="招聘">招聘</el-menu-item>
            <el-menu-item index="找找看">找找看</el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
      <router-view>
      </router-view>
    </div>
</template>

<script>
    export default {
        name: "fgdNav",
        data(){
            return{
                activeIndex:this.$route.name
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                if(key === "首页"){
                    console.log('ok');
                    this.$router.push('/');
                    return;
                }
                this.$router.push({
                    name:key
                })
            }
        },
    }
</script>

<style scoped>

</style>
