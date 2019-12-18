<template>
    <div>
      <el-row>
        <el-col :span="20" :offset="2">
          <el-row>
            <el-col :span="18" :offset="3">
              <div class="search">
                <el-input type="textarea"  :rows="5" >
                </el-input>
                <el-button type="primary">发布</el-button>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  import fgdNav from '@/components/Flash_Group_Directory/Nav'
    export default {
        name: "Flash_Main",
        components: {fgdNav}
    }
</script>

<style scoped>
.el-input{
  width: 700px;
}

  .search{
    margin: 50px auto;
  }
  .el-button{
    margin: 0;
    width: 100%;

  }
</style>
