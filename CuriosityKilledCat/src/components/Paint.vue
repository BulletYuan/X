<template>
  <canvas
    ref="Canvas"
    :width="DRAW.sW"
    :height="DRAW.sH"
    :style="{'width':DRAW.sW+'px','height':DRAW.sH+'px'}"
    @mousedown="mouse(0,$event)"
    @mouseup="mouse(2,$event)"
    @mousemove="mouse(1,$event)"
    @touchstart="touch(0,$event)"
    @touchend="touch(2,$event)"
    @touchmove="touch(1,$event)"
  />
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Paint extends Vue {
  private DRAW = {
    sW: window.innerWidth,
    sH: window.innerHeight,
    curvePoints: []
  };
  private RENDER_REF: HTMLCanvasElement;
  private RENDER_CONTEXT: CanvasRenderingContext2D;
  private DRAWING = false;

  public mounted() {
    this.RENDER_REF = this.$refs.Canvas as HTMLCanvasElement;
    this.RENDER_CONTEXT = this.RENDER_REF.getContext("2d");

    this.RENDER_CONTEXT.strokeStyle = "#fff";
    this.RENDER_CONTEXT.lineWidth = 3;
    this.RENDER_CONTEXT.lineJoin = "round";
    this.RENDER_CONTEXT.lineCap = "round";
    this.RENDER_CONTEXT.imageSmoothingEnabled = true;
  }

  public mouse(type: number, e: MouseEvent) {
    if (type === 0) {
      this.startDraw(e.clientX, e.clientY);
    } else if (type === 1) {
      this.drawing(e.clientX, e.clientY);
    } else {
      this.endDraw();
    }
  }
  public touch(type: number, e: TouchEvent) {
    if (type === 0) {
      this.startDraw(e.touches[0].clientX, e.touches[0].clientY);
    } else if (type === 1) {
      this.drawing(e.touches[0].clientX, e.touches[0].clientY);
    } else {
      this.endDraw();
    }
  }

  public startDraw(x: number, y: number) {
    if (this.RENDER_CONTEXT && this.DRAW.curvePoints.length === 0) {
      this.DRAWING = true;
      // console.log("startDraw", x, y);
      this.DRAW.curvePoints.push([x, y]);
      
    }
  }
  public drawing(x: number, y: number) {
    if (this.DRAWING && this.RENDER_CONTEXT) {
      // console.log("drawing", x, y);
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
        this.DRAW.curvePoints.length = 0;
        this.DRAW.curvePoints.push([x, y]);
      }
    }
  }
  public endDraw() {
    if (this.DRAWING) {
      this.DRAWING = false;
      // console.log("endDraw");
      this.DRAW.curvePoints.length = 0;
      this.RENDER_CONTEXT.save();
    }
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
    ctx.stroke();
    ctx.closePath();
  }
}
</script>
<style lang="scss" scoped>
</style>