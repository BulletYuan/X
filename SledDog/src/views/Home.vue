<template>
  <div class="home layout-flex flex-col-start">
    <SideContainer width="250" top="0" :options="options"/>
    <MainContainer :page="page"/>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue } from "vue-property-decorator";
import HttpRequest from "bullet-request";

import SideContainer from "@/components/SideContainer";
import { SideItem } from "@/components/SideContainer/index.d";

import MainContainer from "@/components/MainContainer/index.vue";

@Component({
  name: "Home",
  components: {
    SideContainer,
    MainContainer
  }
})
export default class Home extends Vue {
  base: any = {};
  page: any = {};
  options: SideItem[] = [];

  mounted() {
    this.getBaseConfig();
  }

  getBaseConfig() {
    new HttpRequest()
      .request({
        url: "assets/datas/base.json",
        dataType: "json",
        header: {
          "content-type": "application/json"
        }
      })
      .then((res: any) => {
        if (res) {
          this.base = res;
          if (res["page"]) {
            this.page = res["page"];
          }
          if (res["components"]) {
            const components = res["components"];
            const options = [];
            for (let i = 0; i < components.length; i++) {
              const _child = components[i];
              const _childItem = this.formatComponent(_child);
              options.push(_childItem);
            }
            this.options = options;
          }
        }
      });
  }
  formatComponent(_sideItem: any) {
    const sideItem: SideItem = {
      label: "",
      value: "",
      component: ""
    };
    if (_sideItem) {
      sideItem.label = _sideItem["label"];
      sideItem.value = _sideItem["name"];
      if (_sideItem["children"]) {
        sideItem.isParent = true;
        sideItem.children = [];
        for (let i = 0; i < _sideItem["children"].length; i++) {
          const _child = _sideItem["children"][i];
          const _childItem = this.formatComponent(_child);
          sideItem.children.push(_childItem);
        }
      } else {
        sideItem.component = _sideItem["resource"];
      }
    }
    return sideItem;
  }
}
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100vh;
}
</style>

