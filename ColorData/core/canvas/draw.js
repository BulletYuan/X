import BulletEvents from '../libs/bullet-events/bullet-events';

/**
 * Canvas绘制类
 *
 * @export
 * @class Draw
 */
export default class Draw {
  /**
   *Creates an instance of Draw.
   * @param {*} argsObj
   * @memberof Draw
   */
  constructor(argsObj) {
    this._args = argsObj;

    this._container = null;
    this._area = null;
    this._canvas = null;
    this._context = null;
    this._scaleStep = 0.1;
    this._scale = 1;
    this._style = this._args.style;

    this._initDom();
  }

  /**
   * 初始化多边形点集
   *
   * @param {*} pObj 多边形数据对象
   * @returns
   * @memberof Draw
   */
  _initPoints(pObj) {
    if (pObj['type'] === 1) { // 菱形图
      return [
        [pObj['x'], pObj['y'] - pObj['height'] / 2],
        [pObj['x'] + pObj['width'] / 2, pObj['y']],
        [pObj['x'], pObj['y'] + pObj['height'] / 2],
        [pObj['x'] - pObj['width'] / 2, pObj['y']],
      ];
    } else if (pObj['type'] === 2) { // 椭圆图
      let step = (pObj['width'] > pObj['height']) ? 1 / pObj['width'] : 1 / pObj['height'];
      let arr = [];
      for (var i = 0; i < 2 * Math.PI; i += step) {
        arr.push([pObj['x'] + pObj['width'] / 2 * Math.cos(i), pObj['y'] + pObj['height'] / 2 * Math.sin(i)]);
      }
      arr.unshift([pObj['x'] + pObj['width'] / 2, pObj['y']]);
      return arr;
    } else if (pObj['type'] === 3) { // 四边形图
      return [
        [pObj['x'] - pObj['width'] / 2, pObj['y'] - pObj['height'] / 2],
        [pObj['x'] + pObj['width'] / 2, pObj['y'] - pObj['height'] / 2],
        [pObj['x'] + pObj['width'] / 2 + 30, pObj['y'] + pObj['height'] / 2],
        [pObj['x'] - pObj['width'] / 2 + 30, pObj['y'] + pObj['height'] / 2],
      ]
    } else { // 方框图
      return [
        [pObj['x'] - pObj['width'] / 2, pObj['y'] - pObj['height'] / 2],
        [pObj['x'] + pObj['width'] / 2, pObj['y'] - pObj['height'] / 2],
        [pObj['x'] + pObj['width'] / 2, pObj['y'] + pObj['height'] / 2],
        [pObj['x'] - pObj['width'] / 2, pObj['y'] + pObj['height'] / 2],
      ]
    }
  }

  /**
   * 渲染
   *
   * @returns
   * @memberof Draw
   */
  render() {
    this._draw();
    if (window.requestAnimationFrame) {
      window.requestAnimationFrame(() => {
        this.render();
      });
    } else {
      setInterval(() => {
        this.render();
      }, 1000 / 60);
    }
  }
  /**
   * 清空画布
   *
   * @param {*} area 画布区域
   * @returns
   * @memberof Draw
   */
  clean(...area) {
    if (!this._canvas || !this._context) { return; }
    this._context.save();
    this._context.setTransform(1, 0, 0, 1, 0, 0);
    this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    this._context.restore();
  }
  /**
   * 设置canvas缩放比例
   *
   * @param {*} scale 缩放比例
   * @memberof Draw
   */
  scale(...scale) {
    if (!this._canvas || !this._context) { return; }
    if (scale.length > 0) {
      this._scale = scale[0];
    }
    const _self = this;
    function scaleNodes(...nodes) {
      for (let i = 0; i < nodes.length; i++) {
        nodes[i]['x'] *= _self._scale;
        nodes[i]['y'] *= _self._scale;
        nodes[i]['width'] *= _self._scale;
        nodes[i]['height'] *= _self._scale;
        if (nodes[i]['children'] && nodes[i]['children'].length > 0) {
          scaleNodes(...nodes[i]['children']);
        }
      }
      this._style.fontSize *= _self._scale;
    }
    if (this._args.data && this._args.data.length > 0) {
      BulletEvents.clearAll();
      scaleNodes(...this._args.data)
    }
  }
  /**
   * 移动canvas画布
   *
   * @param {*} position xy轴移动值 [dX,dY]
   * @memberof Draw
   */
  move(...dMove) {
    if (!this._canvas || !this._context) { return; }
    if (dMove.length > 0) {
      function moveNodes(...nodes) {
        for (let i = 0; i < nodes.length; i++) {
          nodes[i]['x'] += dMove[0];
          nodes[i]['y'] += dMove[1];
          if (nodes[i]['children'] && nodes[i]['children'].length > 0) {
            moveNodes(...nodes[i]['children']);
          }
        }
      }
      if (this._args.data && this._args.data.length > 0) {
        BulletEvents.clearAll();
        moveNodes(...this._args.data)
      }
    }
  }
  /**
   * 自动排布节点图
   *
   * @param {*} nodes 节点数据
   * @memberof Draw
   */
  arrange(...nodes) {
    if (!nodes) { return; }
    if (nodes.length > 0) {
      let _margin = 30, _lineH = 160, _rowY = 0, _colX = 0, _maxW = 0;

      /**
       * 自动排布子级节点
       *
       * @param {*} node 父级节点数据
       */
      function _arrangeChild(node, _rY) {
        if (node['children'] && node['children'].length > 0) {
          let _crowY = _rY, _cX = node['x'];
          for (let j = 0; j < node['children'].length; j++) {
            const child = node['children'][j];
            _rY += _lineH + _margin;
            child['x'] = _cX - child['width'] / 2 + _margin;
            child['y'] = _rY;
            _cX += child['width'] + _margin;
            _maxW = Math.max(_maxW, _cX);
            _arrangeChild(child, _rY);
            _rY = _crowY;
          }
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node['x'] = _maxW + node['width'] / 2 + _margin;
        node['y'] = _rowY + node['height'] / 2 + _margin;
        _colX = node['x'] - node['width'] / 2;
        _rowY = node['y'];
        _maxW = Math.max(_maxW, _colX) + _margin;
        _arrangeChild(node, _rowY);
        _rowY = 0;
      }
    }
  }

  /**
   * 绘制
   *
   * @returns
   * @memberof Draw
   */
  _draw() {
    this.clean();
    if (!this._canvas || !this._context || !this._args.data) { return; }
    this.drawLine(...this._args.data);
    this.drawNode(...this._args.data);
  }
  /**
   * 设置画线样式
   *
   * @memberof Draw
   */
  _setLine() {
    this._context.lineWidth = this._style.lineSize;
    this._context.lineCap = 'round';
    this._context.lineJoin = 'round';
    this._context.strokeStyle = this._style.lineColor;
  }
  /**
   * 设置画多边形样式
   *
   * @memberof Draw
   */
  _setPolygon() {
    this._context.lineWidth = this._style.strokeSize;
    this._context.lineCap = 'butt';
    this._context.lineJoin = 'miter';
    this._context.strokeStyle = this._style.strokeColor;
    this._context.fillStyle = this._style.fillColor;
  }
  /**
   * 设置字体样式
   *
   * @memberof Draw
   */
  _setFonts() {
    this._context.font = `${this._style.fontSize}px ${this._style.fontStyle}`;
    this._context.fillStyle = this._style.fontColor;
  }

  /**
   * 绘制节点图像
   *
   * @param {*} nodes 节点数据
   * @returns
   * @memberof Draw
   */
  drawNode(...nodes) {
    if (!this._canvas || !this._context || !nodes) { return; }
    if (nodes.length > 0) {
      for (let i = 0; i < nodes.length; i++) {
        const obj = nodes[i];
        this._drawPolygon(obj);
        this._drawText(obj);
        if (obj['children'] && obj['children'].length > 0) {
          this.drawNode(...obj['children']);
        }
      }
    }
  }
  /**
   * 绘制多边形
   *
   * @param {*} pObj 多边形数据对象
   * @returns
   * @memberof Draw
   */
  _drawPolygon(pObj) {
    if (!pObj || !pObj['isShow']) { return; }
    if (typeof pObj['type'] !== 'number') {
      pObj['type'] = 0;
    }
    this._setPolygon();
    this._context.beginPath();
    const points = this._initPoints(pObj);
    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      if (i === 0) {
        this._context.moveTo(point[0], point[1]);
      } else {
        this._context.lineTo(point[0], point[1])
      }
    }
    if (pObj['events'] && Object.keys(pObj['events']).length > 0) {
      for (let i = 0; i < Object.keys(pObj['events']).length; i++) {
        const _fk = Object.keys(pObj['events'])[i];
        BulletEvents.on(`${pObj['x']}.${pObj['y']}-${pObj['width']}.${pObj['height']}`, _fk, pObj['events'][_fk]);
      }
    } else {
      BulletEvents.on(`${pObj['x']}.${pObj['y']}-${pObj['width']}.${pObj['height']}`, 'click', (ev) => {
        console.log('click', pObj, ev);
      });
    }
    this._context.closePath();
    this._context.stroke();
    this._context.fill();
  }
  /**
   * 绘制文字(含换行)
   *
   * @param {*} tObj 文字数据对象
   * @returns
   * @memberof Draw
   */
  _drawText(tObj) {
    if (!tObj || !tObj['text'] || !tObj['x'] || !tObj['y'] || !tObj['width']) { return; }
    this._setFonts();
    let _mW = this._context.measureText(tObj['text']).width,  // 测量的文字总长度
      _tW = 0, // 最大一行的长度
      _cI = 0, // 最大一行末位索引
      row = 1; // 总行数
    if (_mW > tObj['width']) {
      for (let i = 0; i < tObj['text'].length; i++) {
        if (i === tObj['text'].length - 1) {
          this._context.fillText(tObj['text'].substring(_cI, i), tObj['x'] - tObj['width'] / 2, tObj['y'] - tObj['height'] / 2 + 10 + row * this._style.fontSize, tObj['width']);
        }
        _tW += this._context.measureText(tObj['text'][i]).width;
        if (_tW >= tObj['width'] - 10) {
          this._context.fillText(tObj['text'].substring(_cI, i), tObj['x'] - tObj['width'] / 2, tObj['y'] - tObj['height'] / 2 + 10 + row * this._style.fontSize, tObj['width']);
          _cI = i;
          _tW = 0;
          row += 1;
        }
      }
    } else {
      this._context.fillText(tObj['text'], tObj['x'] - tObj['width'] / 2 + ((tObj['width'] - _mW) / 2), tObj['y'], tObj['width']);
    }
  }

  /**
   * 绘制线
   *
   * @param {*} nodes 节点数据
   * @returns
   * @memberof Draw
   */
  drawLine(...nodes) {
    if (!this._canvas || !this._context) { return; }
    if (nodes.length > 0) {
      this._setLine();
      const _self = this;
      function drawChildLine(node) {
        if (node && node['children'] && node['children'].length > 0) {
          for (let j = 0; j < node['children'].length; j++) {
            const nodeN = node['children'][j]
            _self._context.beginPath();
            _self._context.moveTo(node.x, node.y + node.height / 2);
            _self._context.lineTo(nodeN.x, nodeN.y - nodeN.height / 2);
            _self._context.closePath();
            _self._context.stroke();
            drawChildLine(nodeN);
          }
        }
      }
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        drawChildLine(node);
      }
    }
  }
}