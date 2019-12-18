<template>
  <div>
    <el-row>
      <el-col :span="4">
        <el-card style="width: 160px">
          <h5 style="display: inline-block">组长</h5><img :src="'http://139.155.76.66:3000/'+members[0]+'_images.png'" style="width: 40px;height: 40px;display: inline-block;border-radius: 50%;float: right">
          <p  class="user">{{members[0]}}</p>
        </el-card>
      </el-col>
      <el-col v-for="num in members.slice(1).length" :span="4">
      <el-card style="width: 160px" >
        <h5 style="display: inline-block">成员</h5><img :src="'http://139.155.76.66:3000/'+members[num]+'_images.png'" style="width: 40px;height: 40px;display: inline-block;border-radius: 50%;float: right">
        <p  class="user" >{{members[num]}}</p>
      </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
    export default {
        name: "Group_Member",
        data(){
            return{
                members:[

                ]
            }
        },
        mounted() {
            const group = this.$route.params.id;
            console.log(group);
            this.$axios.post('/user/getgroupdetail',{group:group}).then(res =>{
                this.members = res.data.group.member;
            }).catch(error => {
                console.log(error);
            })

        }
    }
</script>

<style scoped>
.user{
  font-size: 14px;
  font-family: Arial;
  color: #2f435e;
}
</style>
