<template>
  <div style="width:100%;overflow:hidden">
    <div class="button-bar">
      <button @click="clean()">Clean</button> &nbsp;
      <button @click="getLines()">Export</button> &nbsp;
      <button @click="setLines()">Import</button>
    </div>
    <canvas
      ref="Canvas"
      :width="DRAW.sW * DRAW.ratio"
      :height="DRAW.sH * DRAW.ratio"
      :style="{'width':(DRAW.sW)+'px','height':(DRAW.sH)+'px'}"
      @click.stop.prevent="click($event)"
      @mousedown.stop="mouse(0,$event)"
      @mouseup.stop="mouse(2,$event)"
      @mousemove.stop="mouse(1,$event)"
      @touchstart.stop="touch(0,$event)"
      @touchend.stop="touch(2,$event)"
      @touchmove.stop="touch(1,$event)"
    />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Paint extends Vue {
  private RENDER_REF: HTMLCanvasElement;
  private RENDER_CONTEXT: CanvasRenderingContext2D;

  private DRAW = {
    sW: window.innerWidth,
    sH: window.innerHeight - 4,
    ratio: window.devicePixelRatio || 1,
    points: [], // [beginPoint,...[curvePoints,...]]
    curvePoints: [], // [beginPoint,controlPoint,endPoint]
    edges: [], // [[lt,rt,rb,lb],...]
    edgePoints: [] // [[points],...]
  };
  private DRAWING = false;
  private DRAWSTYLE = {
    draw: {
      strokeStyle: "#fff",
      lineWidth: 3,
      lineJoin: "round",
      lineCap: "round"
    },
    edge: {
      strokeStyle: "#e81d72",
      lineWidth: 5,
      lineJoin: "round",
      lineCap: "round"
    }
  };

  private savingIndex = -1;
  private saving = {
    edge: [],
    edgePoint: []
  };

  public mounted() {
    this.RENDER_REF = this.$refs.Canvas as HTMLCanvasElement;
    this.RENDER_CONTEXT = this.RENDER_REF.getContext("2d");

    this.RENDER_CONTEXT.imageSmoothingEnabled = true;
  }

  public clean() {
    if (this.RENDER_CONTEXT) {
      this.RENDER_CONTEXT.clearRect(
        0,
        0,
        this.DRAW.sW * this.DRAW.ratio,
        this.DRAW.sH * this.DRAW.ratio
      );
      this.DRAW.edges.length = 0;
      this.DRAW.edgePoints.length = 0;
      this.DRAW.points.length = 0;
      this.DRAW.curvePoints.length = 0;
    }
  }
  public getLines() {
    if (this.RENDER_CONTEXT && this.savingIndex >= 0) {
      const edge = this.DRAW.edges[this.savingIndex];
      const edgePoint = this.DRAW.edgePoints[this.savingIndex];
      this.saving.edge = edge;
      this.saving.edgePoint = edgePoint;
      this.clean();
    }
  }
  public setLines() {
    if (this.RENDER_CONTEXT) {
      this.DRAWING = true;
      const epLen = this.saving.edgePoint.length;
      const begin = this.saving.edgePoint[0];
      this.startDraw(begin[0], begin[1]);
      for (let i = 1; i < epLen; i++) {
        const point = this.saving.edgePoint[i];
        this.drawing(point[0], point[1]);
      }
      this.endDraw();
      this.saving.edge.length = 0;
      this.saving.edgePoint.length = 0;
    }
  }
  public mouse(type: number, e: MouseEvent) {
    if (type === 0) {
      this.startDraw(e.clientX * this.DRAW.ratio, e.clientY * this.DRAW.ratio);
    } else if (type === 1) {
      this.drawing(e.clientX * this.DRAW.ratio, e.clientY * this.DRAW.ratio);
    } else {
      this.endDraw();
    }
  }
  public touch(type: number, e: TouchEvent) {
    if (type === 0) {
      this.startDraw(
        e.touches[0].clientX * this.DRAW.ratio,
        e.touches[0].clientY * this.DRAW.ratio
      );
    } else if (type === 1) {
      this.drawing(
        e.touches[0].clientX * this.DRAW.ratio,
        e.touches[0].clientY * this.DRAW.ratio
      );
    } else {
      this.endDraw();
    }
  }
  public click(e: MouseEvent) {
    const [x, y, width, eLen] = [
      e.clientX * this.DRAW.ratio,
      e.clientY * this.DRAW.ratio,
      this.DRAWSTYLE.edge.lineWidth,
      this.DRAW.edges.length
    ];
    for (let i = 0; i < eLen; i++) {
      const points = this.DRAW.edges[i];
      const pLen = points.length;
      let isFind = false;
      for (let j = 0; j < pLen; j++) {
        const point = points[j];
        if (
          point[0] - width <= x &&
          point[0] + width >= x &&
          (point[1] - width <= y && point[1] + width >= y)
        ) {
          this.savingIndex = i;
          isFind = true;
          break;
        }
      }
      if (isFind) {
        break;
      }
      this.savingIndex = -1;
    }
    if (this.savingIndex >= 0) {
      alert(`选择了图像 ${this.savingIndex}`);
    } else {
      alert(`未选中图像`);
    }
  }

  public startDraw(x: number, y: number) {
    if (this.RENDER_CONTEXT && this.DRAW.curvePoints.length === 0) {
      this.DRAWING = true;
      this.setDrawStyle(this.DRAWSTYLE.draw);
      this.DRAW.points.push([x, y]);
      this.DRAW.curvePoints.push([x, y]);
    }
  }
  public drawing(x: number, y: number) {
    if (this.DRAWING && this.RENDER_CONTEXT) {
      if (this.DRAW.curvePoints.length !== 2) {
        this.DRAW.curvePoints.push([x, y]);
      } else {
        const beginPoints = this.DRAW.curvePoints[0];
        const controlPoints = this.DRAW.curvePoints[1];
        const endPoints = [x, y];
        this.drawLine(
          this.RENDER_CONTEXT,
          beginPoints,
          controlPoints,
          endPoints
        );
        this.DRAW.points = this.DRAW.points.concat([
          beginPoints,
          controlPoints,
          [x, y]
        ]);
        this.DRAW.curvePoints.length = 0;
        this.DRAW.curvePoints.push([x, y]);
      }
    }
  }
  public endDraw() {
    if (this.DRAWING) {
      this.DRAWING = false;
      this.DRAW.curvePoints.length = 0;
      this.RENDER_CONTEXT.save();

      if (this.DRAW.points.length > 1) {
        const edge = this.getPointsEdge(this.DRAW.points);
        this.DRAW.edges.push(edge);
        this.drawArea(this.RENDER_CONTEXT, edge);

        const points = this.DRAW.points;
        this.DRAW.edgePoints.push(points);
      }

      this.DRAW.points = [];
    }
  }

  private setDrawStyle(drawStyle) {
    this.RENDER_CONTEXT.strokeStyle = drawStyle.strokeStyle;
    this.RENDER_CONTEXT.lineWidth = drawStyle.lineWidth;
    this.RENDER_CONTEXT.lineJoin = drawStyle.lineJoin;
    this.RENDER_CONTEXT.lineCap = drawStyle.lineCap;
  }
  private getPointsEdge(points: number[][]): number[][] {
    let [xArr, yArr, lt, rt, rb, lb] = [
      [] as number[],
      [] as number[],
      [],
      [],
      [],
      []
    ];
    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      xArr.push(point[0]);
      yArr.push(point[1]);
    }
    const l = Math.max(...xArr);
    const r = Math.min(...xArr);
    const t = Math.max(...yArr);
    const b = Math.min(...yArr);
    lt = [l, t];
    rt = [r, t];
    rb = [r, b];
    lb = [l, b];
    return [lt, rt, rb, lb];
  }

  private drawLine(
    ctx: CanvasRenderingContext2D,
    bP: number[],
    cP: number[],
    eP: number[]
  ) {
    ctx.beginPath();
    ctx.moveTo(bP[0], bP[1]);
    ctx.quadraticCurveTo(cP[0], cP[1], eP[0], eP[1]);
    ctx.closePath();
    ctx.stroke();
  }
  private drawArea(ctx: CanvasRenderingContext2D, points) {
    if (points.length > 0) {
      const bP = points[0];
      this.setDrawStyle(this.DRAWSTYLE.edge);
      ctx.beginPath();
      ctx.moveTo(bP[0], bP[1]);
      for (let i = 0; i < points.length; i++) {
        const point = points[i];
        ctx.lineTo(point[0], point[1]);
      }
      ctx.lineTo(bP[0], bP[1]);
      ctx.closePath();
      ctx.stroke();
    }
  }
}
</script>
<style lang="scss" scoped>
.button-bar {
  position: absolute;
  left: 10px;
  top: 10px;
}
</style>