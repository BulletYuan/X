<template>
  <div class="page-container">
    <div
      ref="PageContianer"
      class="page-simulator"
      data-level="-1"
      @dragenter="drageenter($event)"
      @dragleave="dragleave($event)"
      @dragover="dragover($event)"
      @drop="drop($event)"
    ></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref } from "vue-property-decorator";
import HttpRequest from "bullet-request";

import { SideItem } from "@/components/SideContainer";

import { SledComponent } from "./index.d";

@Component({
  name: "MainContainer",
  components: {}
})
export default class MainContainer extends Vue {
  @Ref() private PageContianer: any;
  @Prop() private page: any;

  pageObj: SledComponent[] = [];

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
    const level = Number(el.dataset["level"]) || 0;
    this.getComponent(level, data);
  }

  getComponent(level: number, data: SideItem) {
    new HttpRequest()
      .request({
        url: data.component,
        dataType: "json",
        header: {
          "content-type": "application/json"
        }
      })
      .then(data => {
        this.pageObjectChanges(level, data as SledComponent);
      });
  }
  pageObjectChanges(level: number, data: SledComponent) {
    let parentEl = this.PageContianer as HTMLElement;
    if (level === -1) {
      this.pageObj.push(data);
      this.pageElementChanges(data as SledComponent, parentEl);
    }
  }
  pageElementChanges(
    data: SledComponent,
    parent: HTMLElement,
    level: number = -1
  ) {
    const el = document.createElement(data.element);
    const classArr: string[] = [];
    const dataArr: string[] = [];
    const styleArr: string[] = [];
    classArr.push(data.name);
    styleArr.push('min-height:100px;');

    el.addEventListener(
      "dragenter",
      (e: DragEvent) => {
        this.drageenter(e);
      },
      false
    );
    el.addEventListener(
      "dragleave",
      (e: DragEvent) => {
        this.dragleave(e);
      },
      false
    );
    el.addEventListener(
      "dragover",
      (e: DragEvent) => {
        this.dragover(e);
      },
      false
    );
    el.addEventListener(
      "drop",
      (e: DragEvent) => {
        this.drop(e);
      },
      false
    );

    if (data.content) {
      if (data.content.html) {
        el.innerHTML = data.content.html;
      }
      if (data.content.components && data.content.components.length > 0) {
        const components = data.content.components;
        for (let i = 0; i < components.length; i++) {
          const component = components[i];
          this.pageElementChanges(component, el);
        }
      }
    }

    el.setAttribute("class", classArr.join(" ").toString());
    el.setAttribute("style", styleArr.join(" ").toString());
    parent.appendChild(el);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.page-container {
  width: 100%;
  height: 100%;
  background: #ededed;
  .page-simulator,
  .page-simulator div {
    min-height: 100px;
    overflow: auto;
  }
  .drop-active {
    border: 2px #af0070 solid;
    background-color: rgba(175, 0, 112, 0.25);
  }
}
</style>
