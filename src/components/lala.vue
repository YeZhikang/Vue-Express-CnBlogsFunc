<template>
    <div>
      <router-link :to="{name:'lala1',params:{been:'haha'}}">lala1</router-link>
      <router-link :to="{name:'lala2',params:{id:'1231'}}">lala2</router-link>
      <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "lala"
    }
</script>

<style scoped>

</style>
