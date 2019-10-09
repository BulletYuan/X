<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
    <!-- <Demo /> -->
    <!-- <Paint /> -->
    <ClassFrame />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import HelloWorld from "./components/HelloWorld.vue";
import Demo from "./components/Demo.vue";
import Paint from "./components/Paint.vue";
import ClassFrame from "./components/ClassFrame.vue";

@Component({
  components: {
    Demo,
    Paint,
    ClassFrame
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: content-box;
}
html {
  background-color: #2c3e50;
  color: #fafafa;
  font-size: 14px;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
input,
select,
textarea,
button,
.btn {
  outline: none;
  padding: 5px 10px;
  background-color: #fff;
  color: #333;
  border: 1px #ddd solid;
  border-radius: 5px;
}
</style>
