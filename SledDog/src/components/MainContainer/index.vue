<template>
  <div class="page-container">
    <div
      class="page-simulator"
      data-level="page"
      @dragenter="drageenter($event)"
      @dragleave="dragleave($event)"
      @dragover="dragover($event)"
      @drop="drop($event)"
    ></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import HttpRequest from "bullet-request";

import { SideItem } from "@/components/SideContainer";

@Component({
  name: "MainContainer",
  components: {}
})
export default class MainContainer extends Vue {
  @Prop() private page: any;

  _page: any = {

  };

  dragover(e: DragEvent) {
    e.preventDefault();
  }
  drageenter(e: DragEvent) {
    const el = e.target as HTMLElement;
    let classStr = el.getAttribute("class") + "";
    classStr += " drop-active";
    el.setAttribute("class", classStr);
  }
  dragleave(e: DragEvent) {
    const el = e.target as HTMLElement;
    let classStr = el.getAttribute("class") + "";
    let classArr = classStr.split(" ");
    classStr = classArr.reduce((o: string, c: string) => {
      if (c === "drop-active") {
        return o;
      } else {
        return o + " " + c;
      }
    });
    el.setAttribute("class", classStr);
  }
  drop(e: any) {
    const el = e.target as HTMLElement;
    e.preventDefault();
    this.dragleave(e);
    const data = JSON.parse(e.dataTransfer.getData("component")) as SideItem;
    const level = el.dataset["level"] || "";
    this.getComponent(level, data);
  }

  getComponent(level: string, data: SideItem) {
    if (level) {
      new HttpRequest()
        .request({
          url: data.component,
          dataType: "json",
          header: {
            "content-type": "application/json"
          }
        })
        .then(data => {
          console.log(data);
          // this._page.
        });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.page-container {
  width: 100%;
  height: 100%;
  background: #ededed;
  .page-simulator {
    min-height: 100px;
    overflow: auto;
  }
  .drop-active {
    border: 2px #af0070 solid;
    background-color: rgba(175, 0, 112, 0.25);
  }
}
</style>
