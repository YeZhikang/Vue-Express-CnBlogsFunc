<template>
    <div style="position: fixed;height: 100%;width: 100%">
      <el-row>
        <el-col :span="14" :offset="5" style="margin-top: 100px;text-align: center">
          <h1>Sorry ! The Page is Not Found...</h1>
          <h3><router-link to="/">点击这里回到主页</router-link></h3>
        </el-col>
      </el-row>
    </div>
</template>

<script>
    export default {
        name: "NotFound"
    }
</script>

<style scoped>

</style>
