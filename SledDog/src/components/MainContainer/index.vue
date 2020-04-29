<template>
  <div class="page-container">
    <!-- <div
      ref="PageContianer"
      class="page-simulator"
      data-level="-1"
      @dragenter="drageenter($event)"
      @dragleave="dragleave($event)"
      @dragover="dragover($event)"
      @drop="drop($event)"
    ></div>-->
    <iframe contenteditable="true" frameborder="0" scrolling="yes" :srcdoc="defaultHTML"></iframe>
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
  defaultHTML: string = `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sled-Dog View</title>
        <style name="drag">
          *{
            box-sizing: content-box;
            background: initial;
          }
          body{
            margin:0;
            height:100vh;
          }
          .drag-element{
            cursor: move;
          }
          
          .drop-container {
            min-height: 100px;
            transition: all .4s;
          }
          .drop-container.drop-active {
            border: 3px #2a7cce dashed;
            background: #8bc0f5;
          }
        </style>
        <script name="drag">
          window.Common={
            Element:null,
          };
          function Common_ParentCommunication(msg){
            window.parent.ChildCommunication(msg);
          }
          function Common_Save(){
            const dragScriptEl=Common_QueryElement('script[name="drag"]');
            const dragStyleEl=Common_QueryElement('style[name="drag"]');
            Common_RemoveElement(document,dragStyleEl);
            Common_RemoveElement(document,dragScriptEl);
          }

          function Common_setAttribute(el,k,v){
            if(el){
              el.setAttribute(k,v);
            }
          }
          function Common_getAttribute(el,k){
            if(el){
              const attr=el.getAttribute(k);
              if(attr){
                return attr+"";
              }
            }
            return "";
          }

          function Common_AppendClass(el,className){
            let classStr = Common_getAttribute(el,"class");
            const classArr = classStr?classStr.split(" "):[];
            classArr.push(className);
            classStr=classArr.join(" ");
            Common_setAttribute(el,"class",classStr);
          }
          function Common_RemoveClass(el,className){
            let classStr = Common_getAttribute(el,"class");
            const classArr = classStr.split(" ");
            let _index=0;
            classArr.every((v,i)=>{
              if(v===className){_index=i;return false}else{return true}
            });
            classArr.splice(_index,1);
            classStr = classArr.join(" ");
            Common_setAttribute(el,"class",classStr);
          }

          function Common_QueryElement(queryString){
            const el=document.querySelector(queryString);
            return el;
          }
          function Common_AddEventListener(el,eventName,eventFunction=function(e){}){
            if(el){
              el.addEventListener(eventName,eventFunction,false);
            }
          }
          function Common_RemoveEventListener(el,eventName,eventFunction=function(e){}){
            if(el){
              el.removeEventListener(eventName,eventFunction,false);
            }
          }
          function Common_AddDragEvent(el){
            Common_AddEventListener(el,'dragenter',Common_DragEnter);
            Common_AddEventListener(el,'dragleave',Common_DragLeave);
            Common_AddEventListener(el,'dragstart',Common_DragStart);
            Common_AddEventListener(el,'dragover',Common_DragOver);
            Common_AddEventListener(el,'drop',Common_Drop);
          }

          function Common_DragEnter(e){
            const el = e.target;
            Common_AppendClass(el,"drop-active");
          }
          function Common_DragLeave(e){
            const el = e.target;
            Common_RemoveClass(el,"drop-active");
          }
          function Common_DragStart(e) {
            const el = e.target;
            if (e.dataTransfer) {
              const cUrl = Common_getAttribute(el,"data-cpt-url");
              e.dataTransfer.setData("cpt-url", cUrl);
              // e.dataTransfer.setData("index", el.dataset["index"]);
              // e.dataTransfer.setData("from", el.dataset["from"]);
            }
          }
          function Common_DragOver(e){
            const el = e.target;
            e.preventDefault();
          }
          function Common_Drop(e){
            const el = e.target;
            Common_RemoveClass(el,"drop-active");
            e.preventDefault();
            if (e.dataTransfer) {
              const cUrl=e.dataTransfer.getData("cpt-url");
              const chld=Common_GenerateElement(cUrl,{});
              console.log(chld)
              Common_AppendElement(el,chld);
            }
          }

          function Common_GenerateElement(cUrl,elObj){
            const el=document.createElement('div');
            el.innerHTML=Math.random()*20+20;

            Common_setAttribute(el,"data-cpt-url",cUrl);
            Common_setAttribute(el,"draggable","true");

            Common_AddDragEvent(el);
            const classStr=["drop-container"].join(" ");
            Common_AppendClass(el,'drop-container');
            return el;
          }
          function Common_AppendElement(elParent,elDom){
            if(elParent&&elDom){
              elParent.appendChild(elDom);
            }
          }
          function Common_InsertBeforeElement(elParent,elBrother,elDom){
            if(elParent&&elDom){
              elParent.insertBefore(elDom,elBrother);
            }
          }
          function Common_RemoveElement(elParent,elDom){
            if(elParent&&elDom){
              elParent.RemoveChild(elDom);
            }
          }
          function Common_MoveElement(elParent,elTarget,elDom){
            if(elParent&&elTarget&&elDom){
              Common_AppendElement(elTarget,elDom);
              Common_RemoveElement(elParent,elDom);
            }
          }
          function Common_CopyElement(elTarget,elDom){
            if(elParent&&elTarget&&elDom){
              Common_AppendElement(elTarget,elDom);
            }
          }
        <\/script>
      </head>
      <body></body>
      <script>
        const bodyEl=Common_QueryElement('body');
        Common_AddDragEvent(bodyEl);
        Common_AppendClass(bodyEl,'drop-container');
      <\/script>
    </html>
  `;

  mounted() {}

  appendClass(el: HTMLElement, className: string) {
    let classStr = el.getAttribute("class") + "";
    classStr += " " + className;
    el.setAttribute("class", classStr);
  }
  removeClass(el: HTMLElement, className: string) {
    let classStr = el.getAttribute("class") + "";
    let classArr = classStr.split(" ");
    classStr = classArr.reduce((o: string, c: string) => {
      if (c === className) {
        return o;
      } else {
        return o + " " + c;
      }
    });
    el.setAttribute("class", classStr);
  }

  appendList(list: any[], value: any) {
    const listTmp = list;
    listTmp.push(value);
    return listTmp;
  }
  removeList(list: any[], index: number) {
    const listTmp = list;
    listTmp.splice(index, 1);
    return listTmp;
  }

  dragover(e: DragEvent) {
    const el = e.target as HTMLElement;
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
    styleArr.push("min-height:100px;");

    el.addEventListener(
      "dragenter",
      (e: DragEvent) => {
        const el = e.target as HTMLElement;
        let classStr = el.getAttribute("class") + "";
        classStr += " drop-active";
        el.setAttribute("class", classStr);
      },
      false
    );
    el.addEventListener(
      "dragleave",
      (e: DragEvent) => {
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
      },
      false
    );
    el.addEventListener(
      "dragover",
      (e: DragEvent) => {
        e.preventDefault();
      },
      false
    );
    el.addEventListener(
      "drop",
      (e: DragEvent) => {
        const el = e.target as HTMLElement;
        e.preventDefault();
        this.dragleave(e);
        if (e.dataTransfer) {
          const data = JSON.parse(
            e.dataTransfer.getData("component")
          ) as SideItem;
          const level = Number(el.dataset["level"]) || 0;
          this.getComponent(level, data);
        }
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
  iframe {
    width: 100%;
    height: 100%;
  }
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
