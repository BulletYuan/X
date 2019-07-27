# bulletEvents
event system for publish-subscription

# 应用场景

* 发布-订阅模式场景下

* 框架内父子，兄弟组件互相通信

# 属性/方法说明

* **on**

绑定事件

```javascript
BulletEvents.on(
  _k,     // 根键名
  _fk,    // 事件名
  _f,     // 事件方法
  _isO    // 是否执行一次
);
```

* **clear**

清除事件/根

```javascript
BulletEvents.clear(
  _k,     // 根键名
);
BulletEvents.clear(
  _k,     // 根键名
  _fk,    // 事件名
);
```

* **emit**

触发事件

```javascript
BulletEvents.emit(
  _k,     // 根键名
  _fk,    // 事件名
  args... // 事件参数
);
```

* **rename**

重命名根键名/事件名

```javascript
BulletEvents.rename(
  _k,     // 根键名
  _nk,    // 新的根键名
);
BulletEvents.rename(
  _k,     // 根键名
  _nk,    // 新根键名
  _fk,    // 事件名
  _nfk,   // 新事件名
);
```

# 使用方法

`npm i bullet-events --save-dev`

```javascript
import BulletEvents from 'bullet-events';

// 注册并监听方法
BulletEvents.on('test','fn',(msg)=>{
  console.log(msg);
});

// 异步触发方法
BulletEvents.emit('test','fn',1);
// 1
```
