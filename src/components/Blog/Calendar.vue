<template>
  <div>
    <el-calendar
      defaultValue="2019-05"
      @date-change="change"
      @pick="pick"
      :render-content="renderContent"
      :data="datedef"
      :prop="prop"
      style="height: 200px"></el-calendar>
  </div>
</template>

<script>
    export default{
        name:'calendar',
        data(){
            return{
                value1:new Date(),
                small:"small"
            }
        }
    }
</script>
<style>
.el-calendar__header{
  font-size: 12px;
}

  .el-button{
    display: none;
  }

.el-calendar__body{
  padding: 0;
  height: 220px;
}
.el-calendar__header{
  display: none;
}
.el-calendar-table{
  width: 220px;
}
  .el-calendar-table .el-calendar-day{
    height: 30px;
  }

  span{
    font-size: 12px;
  }
</style>
