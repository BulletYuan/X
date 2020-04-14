<template>
  <div class="home">
    <SideList width="250" top="0" />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue } from "vue-property-decorator";
import SideList from "@/components/SideList.vue";

@Component({
  name: "Home",
  components: {
    SideList
  }
})
export default class Home extends Vue {}
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
}
</style>

