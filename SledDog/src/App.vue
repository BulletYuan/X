<template>
  <div id="app">
    <div class="main-container">
    <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";

export default class App extends Vue {}
</script>

<style lang="scss">
@import "./assets/scss/font-awesome";
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
a{
  text-decoration: none;
}
ul,li,ol{
  list-style: none;
}
.main-container{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
