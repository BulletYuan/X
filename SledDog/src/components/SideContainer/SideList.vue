<template>
  <ul :class="{'active':isActive}">
    <li
      v-for="(sideItem,index) in options"
      :key="sideItem.value"
      :data-item="sideItem"
      :draggable="!sideItem.isParent"
      :class="{'active':sideItem.isParent&&activeList[index]}"
    >
      <p
      @click="itemClick(sideItem,index)">
        <span
          :class="{'arrow':sideItem.isParent, 'fa':true, 'fa-ellipsis-v':!sideItem.isParent,'fa-caret-right':sideItem.isParent}"
        ></span>
        {{sideItem.label}}
      </p>
      <SideList
        v-if="sideItem.isParent"
        :options="sideItem.children"
        :isActive="activeList[index]"
      />
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { SideItem } from "./index.d";

@Component({
  name: "SideList"
})
export default class SideList extends Vue {
  @Prop() private isActive?: boolean;
  @Prop() private options?: SideItem[];

  private activeList: boolean[] = [];

  beforeUpdate() {
    if (this.options && this.options.length !== this.activeList.length) {
      this.activeList = new Array(this.options.length).fill(false);
    }
  }

  itemClick(sideItem: SideItem, index: number) {
    if (sideItem.isParent) {
      const res = this.activeList[index];
      this.$set(this.activeList, index, !res);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
      transform: rotateZ(90deg);
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
      transition: transform 0.4s;
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
</style>
