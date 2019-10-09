<template>
  <canvas
    ref="Canvas"
    :width="DRAW.sW * DRAW.ratio"
    :height="DRAW.sH * DRAW.ratio"
    :style="{'width':(DRAW.sW)+'px','height':(DRAW.sH)+'px'}"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ClassFrame extends Vue {
  private RENDER_REF: HTMLCanvasElement;
  private RENDER_GL: WebGLRenderingContext;

  private DRAW = {
    sW: window.innerWidth,
    sH: window.innerHeight - 4,
    ratio: window.devicePixelRatio || 1
  };

  public mounted() {
    this.RENDER_REF = this.$refs.Canvas as HTMLCanvasElement;
    this.RENDER_GL = this.RENDER_REF.getContext("webgl");
    this.refreshWindow();
  }

  private refreshWindow() {
    if (this.RENDER_GL) {
      this.RENDER_GL.viewport(
        0,
        0,
        this.DRAW.sW * this.DRAW.ratio,
        this.DRAW.sH * this.DRAW.ratio
      );
    }
  }
  private thrownProgramError(program: WebGLProgram) {
    if (!this.RENDER_GL) {
      return;
    }
    if (
      !this.RENDER_GL.getProgramParameter(program, this.RENDER_GL.LINK_STATUS)
    ) {
      var info = this.RENDER_GL.getProgramInfoLog(program);
      throw "Could not compile WebGL program. \n\n" + info;
    }
  }
  private thrownShaderError(shader: WebGLShader) {
    if (!this.RENDER_GL) {
      return;
    }
    if (
      !this.RENDER_GL.getShaderParameter(shader, this.RENDER_GL.LINK_STATUS)
    ) {
      var info = this.RENDER_GL.getProgramInfoLog(shader);
      throw "Could not compile WebGL shader. \n\n" + info;
    }
  }
  private createProgram(shaders: WebGLShader[]) {
    if (!this.RENDER_GL) {
      return null;
    }
    const program = this.RENDER_GL.createProgram();
    for (let i = 0; i < shaders.length; i++) {
      const shader = shaders[i];
      this.attachShader(program, shader);
    }
    this.linkProgram(program);
    this.thrownProgramError(program);
    return program;
  }
  private createShader(type: GLenum, codesource: string) {
    if (!this.RENDER_GL) {
      return null;
    }
    const shader = this.RENDER_GL.createShader(type);
    this.RENDER_GL.shaderSource(shader, codesource);
    this.RENDER_GL.compileShader(shader);

    this.thrownShaderError(shader);
    return shader;
  }
  private createVertexShader(codesource: string) {
    return this.createShader(this.RENDER_GL.VERTEX_SHADER, codesource);
  }
  private createFragmentShader(codesource: string) {
    return this.createShader(this.RENDER_GL.FRAGMENT_SHADER, codesource);
  }
  private attachShader(program: WebGLProgram, shader: WebGLShader) {
    if (!this.RENDER_GL) {
      return;
    }
    try {
      this.RENDER_GL.attachShader(program, shader);
    } catch (e) {
      console.error("attachShader", e);
    }
  }
  private linkProgram(program: WebGLProgram) {
    if (!this.RENDER_GL) {
      return;
    }
    try {
      this.RENDER_GL.linkProgram(program);
    } catch (e) {
      console.error("linkProgram", e);
    }
  }

  private draw() {
    if (!this.RENDER_GL) {
      return;
    }
    this.RENDER_GL.enable(this.RENDER_GL.DEPTH_TEST);
    this.RENDER_GL.clear(
      this.RENDER_GL.COLOR_BUFFER_BIT | this.RENDER_GL.DEPTH_BUFFER_BIT
    );
    this.RENDER_GL.drawElements(
      this.RENDER_GL.TRIANGLES,
      1,
      this.RENDER_GL.UNSIGNED_BYTE,
      0
    );
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
