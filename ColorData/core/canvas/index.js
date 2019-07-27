
export default class CanvasRenderer {
  constructor(argsObj){
    this._args = argsObj;

    this._container = null;
    this._area = null;
    this._canvas = null;
    this._context = null;
    this._scaleStep = 0.1;
    this._scale = 1;
    this._style = this._args.style;
  }
}