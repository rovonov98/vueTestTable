<template>
  <div id="app">
    <router-view></router-view>  
  </div>
</template>

<script>
import Home from './pages/Home.vue'
export default {
    name: 'app',
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
:root {
  @include responsive-font(16, 9);
}
</style>