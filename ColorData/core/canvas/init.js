
export default class Init {
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
  
  /**
   * 初始化Dom元素
   *
   * @memberof Draw
   */
  initDom() {
    if (this._args.data && this._args.data.length > 0) {
      this._initArgsData(...this._args.data);
    }
    this._canvas = document.createElement('canvas');
    this._canvas.id = `ColorData-Canvas-${Math.random() * (new Date().getTime())}`;
    this._container = document.querySelector(this._args.container);
    if (this._container) {
      this._area = {
        x: this._container.offsetLeft,
        y: this._container.offsetTop,
        w: this._container.offsetWidth,
        h: this._container.offsetHeight,
      };

      this._canvas.style.width = `${this._area.w}px`;
      this._canvas.style.height = `${this._area.h}px`;
      this._canvas.width = this._area.w
      this._canvas.height = this._area.h

      this._container.appendChild(this._canvas);
      this._context = this._canvas.getContext('2d');
      this.bindEvents();
      this.arrange(...this._args.data);
      this.render();
      return this;
    }
    return null;
  }
  /**
   * 初始化参数数据
   *
   * @param {*} nodes 节点数据
   * @memberof Draw
   */
  initArgsData(...nodes) {
    if (nodes.length > 0) {
      for (let i = 0; i < nodes.length; i++) {
        const obj = nodes[i];
        const _obj = {
          name: obj['name'] || `node-${new Date().getTime() * Math.random()}`, // 节点图名称/id
          text: obj['text'] || '', // 图中显示字样
          isShow: obj['isShow'] || true, // 是否默认显示图
          type: obj['type'] || 0, // 0:方框图 1:菱形图 2:椭圆图 3:四边形图
          value: obj['value'] || null,  // 节点图所代表值 [object | string | number | boolean]
          events: obj['events'] || {},  // 节点图所绑定事件
          x: obj['x'] || 0, // 节点图中心点x坐标值
          y: obj['y'] || 0, // 节点图中心点y坐标值
          width: obj['width'] || 160, // 节点图宽度
          height: obj['height'] || 40, // 节点图高度
          children: obj['children'] || [], // 节点图子节点
        };
        this.initArgsData(..._obj.children);
        nodes[i] = Object.assign(obj, _obj);
      }
    }
  }
  /**
   * 触发事件
   *
   * @param {*} element 绑定事件的元素
   * @param {*} event 绑定的事件名称
   * @returns
   * @memberof Draw
   */
  _dispatchEvent(element, event) {
    if (document.createEventObject) {
      // IE浏览器支持fireEvent方法
      var evt = document.createEventObject();
      return element.fireEvent('on' + event, evt)
    }
    else {
      // 其他标准浏览器使用dispatchEvent方法
      var evt = document.createEvent('HTMLEvents');
      evt.initEvent(event, true, true);
      return !element.dispatchEvent(evt);
    }
  }
  /**
   * 元素事件触发控制器
   *
   * @param {*} ev 父级鼠标对象
   * @param {*} evname 触发事件名称
   * @memberof Draw
   */
  _eventsEmitter(ev, name, ...ctx) {
    for (let i = 0; i < Object.keys(BulletEvents._list).length; i++) {
      const _k = Object.keys(BulletEvents._list)[i],
        xy = _k.split('-')[0].split('.'),
        wh = _k.split('-')[1].split('.'),
        eX = ev.clientX,
        eY = ev.clientY;
      if (eX > Number(xy[0]) - Number(wh[0]) / 2 && eX < Number(xy[0]) + Number(wh[0]) / 2
        && eY > Number(xy[1]) - Number(wh[1]) / 2 && eY < Number(xy[1]) + Number(wh[1]) / 2) {
        BulletEvents.emit(_k, name, ctx.length > 0 ? ctx[0] : null, ev);
        break;
      }
    }
  }
  /**
   * 绑定Canvas自身事件
   *
   * @memberof Draw
   */
  bindEvents() {
    if (!this._canvas || !this._context) { return; }
    // 缩放监听事件
    this._canvas.addEventListener('wheel', ev => {
      this._scale = 1 + (ev.deltaY < 0 ? this._scaleStep : -1 * this._scaleStep);
      if (this._scale - this._scaleStep <= 0) {
        this._scale += this._scaleStep;
      }
      this.scale();
    }, true);

    // 点击监听事件
    this._canvas.addEventListener('click', (ev) => {
      this._eventsEmitter(ev, 'click');
    }, true);

    // 移动监听事件
    let _down = false,
      _tX = 0,
      _tY = 0;
    this._canvas.addEventListener('mousedown', (ev) => {
      if (!_down) {
        _down = true;
      }
      this._eventsEmitter(ev, 'mousedown');
    }, true);
    this._canvas.addEventListener('mousemove', (ev) => {
      if (_down) {
        let dX = ev.clientX - _tX,
          dY = ev.clientY - _tY;
        dX = dX > 0 ? Math.min(dX, 20) : Math.max(dX, -20);
        dY = dY > 0 ? Math.min(dY, 20) : Math.max(dY, -20);
        this.move(dX, dY);
        _tX = ev.clientX;
        _tY = ev.clientY;
      }
      this._eventsEmitter(ev, 'mousemove');
    }, true);
    this._canvas.addEventListener('mouseup', (ev) => {
      _down = false;
      _tX = 0;
      _tY = 0;
      this._eventsEmitter(ev, 'mouseup');
    }, true);

    // 双击自动排版事件
    this._canvas.addEventListener('dblclick', () => {
      this._dispatchEvent(this._canvas, 'mouseup');
      this.arrange(...this._args.data);
    }, true);
  }
}