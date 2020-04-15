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
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  ul {
    width: 100%;
    height: 0;
    overflow: hidden;
    &.active {
      height: auto;
    }
  }
  li {
    width: 100%;
    border-bottom: 1px #464545 solid;
    &.active > p {
      color: #ec0097;
      & span.arrow {
        transform: rotateZ(0deg);
      }
    }
    & p {
      padding: 10px;
      cursor: pointer;
      color: #fafafa;
      transition: all 0.4s;
      &:hover {
        color: #ec0097;
      }
      & span {
        margin-right: 10px;
        &.arrow {
          transform: rotateZ(-90deg);
        }
      }
    }
    &[class~="child"] {
      padding-left: 10px;
      &:last-child {
        border-bottom: none;
      }
      &:first-child {
        border-top: 1px #464545 solid;
      }
    }
  }
}
</style>
