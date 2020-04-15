<template>
  <div class="home">
    <SideContainer width="250" top="0" :options="options"/>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue } from "vue-property-decorator";
import SideContainer from "@/components/SideContainer";

import { SideItem } from "@/components/SideContainer/index.d";

@Component({
  name: "Home",
  components: {
    SideContainer
  }
})
export default class Home extends Vue {
  options: SideItem[] = [];

  mounted() {
    for (let i = 0; i < 6; i++) {
      const item: SideItem = {
        label: "button" + i,
        value: i,
        component: "button" + i
      };
      if (i === 2 || i === 5) {
        item.isParent = true;
        item.children = [];
        const child: SideItem = {
          label: "button" + i + "-1",
          value: i * 10,
          component: "button" + i * 10
        };
        item.children.push(child);
      }
      this.options.push(item);
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
}
</style>

