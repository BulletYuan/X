<template>
  <div class="side-list" :style="{'width':(width||250)+'px','top':(top||0)+'px'}">
    <ul class="active">
      <li class="active">
        <p>1</p>
      </li>
      <li>
        <p>2</p>
        <ul class="active">
          <li class="child">
            <p>2.1</p>
          </li>
          <li class="child">
            <p>2.2</p>
          </li>
          <li class="child">
            <p>2.3</p>
            <ul class="active">
              <li class="child">
                <p>2.3.1</p>
              </li>
              <li class="child">
                <p>2.3.2</p>
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li>
        <p>3</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "SideList"
})
export default class SideList extends Vue {
  @Prop() private width?: number;
  @Prop() private top?: number;
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
    &.active p{
        color: #ec0097;
    }
    & p {
      padding: 10px;
      cursor: pointer;
      color: #fafafa;
      transition: all .4s;
      &:hover {
        color: #ec0097;
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
