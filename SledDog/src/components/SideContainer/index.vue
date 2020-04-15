<template>
  <div class="side-list" :style="{'width':(width||250)+'px','top':(top||0)+'px'}">
    <SideList :options="options" :isActive="true" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import SideList from "./SideList.vue";
import { SideItem } from "./index.d";

@Component({
  name: "SideContainer",
  components: {
    SideList
  }
})
export default class SideContainer extends Vue {
  @Prop() private width?: number;
  @Prop() private top?: number;
  @Prop() private options?: SideItem[];
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.side-list {
  max-width: 250px;
  height: 100%;
  background: #1b1719;
  // position: fixed;
  // top: 0;
  // left: 0;
  // z-index: 1;
}
</style>
