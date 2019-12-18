<template>
  <div class="hello">
    <IndexNav></IndexNav>
    <sidebar></sidebar>
  </div>
</template>

<script>
import IndexNav from "./Index/Nav";
import Sidebar from "./Index/Sidebar";
export default {
  name: 'HelloWorld',
    components: {Sidebar, IndexNav},
    data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
