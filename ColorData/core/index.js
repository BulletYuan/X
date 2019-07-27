import Enum from './enum';
import canvasDraw from './canvas/draw';

/**
 * ColorData类
 *
 * @export
 * @class ColorData
 */
export default class ColorData {
  /**
   *Creates an instance of ColorData.
   * @param {*} argsObj
   * @memberof ColorData
   */
  constructor(argsObj) {
    this.args = {
      container: 'body',          // 容器query名
      type: Enum.type.topology,   // 绘制类型
      method: Enum.method.canvas, // 绘制方法
      data: [],
      style: {
        background: '#fff',       // 画布背景色
        lineSize: 1,              // 线条宽度
        lineColor: '#333',        // 线条颜色
        strokeSize: 3,            // 边框宽度
        strokeColor: '#09c',      // 边框颜色
        fillColor: '#fafafa',     // 填充颜色
        fontSize: 14,             // 字体大小
        fontColor: '#000',        // 字体颜色
        fontStyle: 'sans-serif',  // 字体样式
      },
    };

    // 初始化参数
    this.args = Object.assign(this.args, argsObj || {});

    // 返回Canvas绘制类实例
    if (window.HTMLCanvasElement && this.args.method === Enum.method.canvas) {
      return new canvasDraw(this.args);
    }
  }

}