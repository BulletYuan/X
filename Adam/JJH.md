#JING JU HE
**经聚合**

> 聚合小程序 __日志__

----

# app() 

> app.js

|百度 |微信 |阿里 |
|:----:|:----:|:----:|
|onLaunch(options) |onLaunch(options) |onLaunch(options) |
|onShow(options) |onShow(options) |onShow(options) |
|onHide() |onHide() |onHide() |
|_null_ |onError(msg) |onError(msg) |
|_null_ |onPageNotFound({path:"",query:{},isEntryPage:true}) (1.9.90+) |_null_ |
|other |other |other |
|js原型/方法 |js原型/方法 |js原型/方法 |
|getApp() |getApp() |getApp() |

> app.json

|百度 |微信 |阿里 |
|:----:|:----:|:----:|
|pages _[]_ |pages _[]_ |pages _[]_ |
|window _{  navigationBarBackgroundColor,  navigationBarTextStyle,  navigationBarTitleText,  backgroundColor,  backgroundTextStyle,  enablePullDownRefresh,  onReachBottomDistance  }_ |window _{  navigationBarBackgroundColor,  navigationBarTextStyle,  navigationBarTitleText,  navigationStyle,  backgroundColor,  backgroundTextStyle,  backgroundColorTop,  backgroundColorBottom,  enablePullDownRefresh,  onReachBottomDistance  }_ |window _{defaultTitle,  pullRefresh:true,  allowsBounceVertical:"YES/NO",  titleBarColor  }_ |
|_null_ |tabBar _{  color,  selectedColor,  backgroundColor,  borderStyle:"black/white",  list:[  pagePath,  text,  iconPath,  selectedIconPath  ],  position:"bottom/top"  }_ |tabBar _{textColor,  selectedColor,  backgroundColor,  items:[  pagePath,  name,  icon,  activeIcon  ]  }_ |
|_null_ |networkTimeout _{  request:1000,  connectSocket:1000,  uploadFile:1000,  downloadFile:1000  }_ |_null_ |
|_null_ |debug _boolean_ |_null_ |

----

# page()

> page.js

|百度 |微信 |阿里 |
|:----:|:----:|:----:|
|data _{}_ |data _{}_ |data _{}_ |
|onLoad _func(options)_ |onLoad _func(options)_ |onLoad _func(options)_ |
|onReady _func_ |onReady _func_ |onReady _func_ |
|onShow _func_ |onShow _func_ |onShow _func_ |
|onHide _func_ |onHide _func_ |onHide _func_ |
|onUnload _func_ |onUnload _func_ |onUnload _func_ |
|_null_ |_null_ |onTitleClick _func_ |
|_null_ |_null_ |onOptionMenuClick _func_ (1.3.0+) |
|onPullDownRefresh _func_ |onPullDownRefresh _func_ |onPullDownRefresh _func_ |
|onReachBottom _func_ |onReachBottom _func_ |onReachBottom _func_ |
|onShareAppMessage _func({scrollTop})_ |onShareAppMessage _func({scrollTop})_ |onShareAppMessage _func({scrollTop})_ |
|onPageScroll _func_ |onPageScroll _func_ |onPageScroll _func_ |
|onTabItemTap _func(item)_ |onTabItemTap _func(item)_ |_null_ |
|other _any_ |other _any_ |other _any_ |
|js原型/方法 |js原型/方法 |js原型/方法 |
|Page.prototype.setData() |Page.prototype.setData() |Page.prototype.setData() |
|_null_ |Page.prototype.route() |_null_ |
|getCurrentPages() |getCurrentPages() |getCurrentPages() |
|_null_ |_null_ |Page.prototype.$spliceData() (1.7.2+) |

> page.json

|百度 |微信 |阿里 |
|:----:|:----:|:----:|
|_null_ |navigationBarBackgroundColor _HexColor_ |_null_ |
|_null_ |navigationBarTextStyle _"black/white"_ |_null_ |
|_null_ |navigationBarTitleText _String_ |_null_ |
|_null_ |backgroundColor _HexColor_ |_null_ |
|_null_ |backgroundTextStyle _"dark/light"_ |_null_ |
|_null_ |enablePullDownRefresh _Boolean_ |_null_ |
|_null_ |disableScroll _Boolean_ |_null_ |
|_null_ |onReachBottomDistance _50_ |_null_ |
|_null_ |_null_ |defaultTitle _String_ |
|_null_ |_null_ |pullRefresh _Boolean_ |
|_null_ |_null_ |allowsBounceVertical _"YES/NO"_ |
|_null_ |_null_ |titleBarColor _HexColor_ |
|_null_ |_null_ |optionMenu _{icon:""}_ (1.3.0+) |

> router

|百度 |微信 |阿里 |
|:----:|:----:|:----:|
|swan.navigateTo |wx.navigateTo |my.navigateTo |
|swan.redirectTo |wx.redirectTo |my.redirectTo |
|swan.navigateBack |wx.navigateBack |my.navigateBack |
|swan.switchTab |wx.switchTab |my.switchTab |
|swan.reLaunch |wx.reLaunch |_null_ |

# 视图层

> 页面数据

|百度 |微信 |阿里 |
|:----:|:----:|:----:|
|数据绑定  ```<view> {{message}} </view>``` |数据绑定  ```<view> {{message}} </view>``` |数据绑定  ```<view> {{message}} </view>``` |
|列表渲染  ```<view s-for="persons"  s-for-index="idx" s-for-item="p">  {{index}}: {{p.name}}  </view>``` |列表渲染  ```<view wx:for="{{array}}"  wx:for-index="idx"  wx:for-item="item">  {{item}}  </view>``` |列表渲染  ```<view a:for="{{items}}"  a:for-index="idx" a:for-item="p">  {{item}}  </view>``` |
|条件渲染  ```<view s-if="is4G">4G</view>```  ```<view s-elif="isWifi">Wifi</view>```  ```<view s-else>Other</view>``` |条件渲染  ```<view wx:if="{{view == 'WEBVIEW'}}"> WEBVIEW </view>```  ```<view wx:elif="{{view == 'APP'}}"> APP </view>```  ```<view wx:else="{{view == 'MINA'}}"> MINA </view>``` |条件渲染  ```<view a:if="{{view == 'WEBVIEW'}}"> WEBVIEW </view>```  ```<view a:elif="{{view == 'APP'}}"> APP </view>```  ```<view a:else> alipay </view>``` |
|模板  ```<template name="staffName">  <view>FirstName: {{firstName}}, LastName: {{lastName}}</view>  </template>```  ```<template is="staffName"  data="{{ {...staffA} }}"></template>``` |模板  ```<template name="staffName">  <view>FirstName: {{firstName}}, LastName: {{lastName}}</view>  </template>```  ```<template is="staffName"  data="{{...staffA}}"></template>``` |模板  ```<template name="staffName">  <view>FirstName: {{firstName}}, LastName: {{lastName}}</view>  </template>```  ```<template is="staffName"  data="{{...staffA}}"></template>``` |
|控制属性(不需要被双大括号包裹)  ```s-if="flag"``` |控制属性  ```wx:if="{{condition}}"``` |控制属性  ``` a:if="{{condition}}"``` |
|运算  ```数据访问  {{name}}{{person.name}}```  ```一元否定  {{!isOK}}```  ```二元运算  {{num1 + num2}}```  ```二元关系  {{num1 > num2}}```  ```三元条件  {{num1 > num2 ? num1 : num2}}```  ```括号  {{a * (b + c)}}```  ```字符串  {{"hello" + name}}```  ```数值  {{200}}```  ```布尔  {{true}}``` |运算  ```数据访问  {{name}}{{person.name}}```  ```二元运算  {{a + b}}```  ```二元关系  {{length > 5}}```  ```三元条件  {{flag ? true : false}}```  ```字符串  {{"hello" + name}}``` |运算  ```数据访问  {{name}}{{person.name}}```  ```二元运算  {{a + b}}```  ```二元关系  {{length > 5}}```  ```三元条件  {{flag ? true : false}}```  ```字符串  {{"hello" + name}}``` |

> 事件

|百度 |微信 |阿里 |
|:----:|:----:|:----:|
|tap |tap |tap |
|longtap |longtap |longTap |
|longpress |longpress |_null_ |
|touchstart |touchstart |touchStart |
|touchmove |touchmove |touchMove |
|touchcancel |touchcancel |touchCancel |
|touchend |touchend |touchEnd |
|transitionend |transitionend |_null_ |
|animationstart |animationstart |_null_ |
|animationiteration |animationiteration |_null_ |
|animationend |animationend |_null_ |
|_null_ |touchforcechange |_null_ |
|```key 以 bind 或 catch 开头，  衔接事件类型，  例如 bindtap、catchtouchcancel```  ```也可以在 bind 和 catch 后可以紧跟一个冒号，  如 bind:tap、catch:touchstart，  其功能不变```  ```bind 事件绑定不会阻止冒泡事件向上冒泡，  catch 事件绑定可以阻止冒泡事件向上冒泡``` |```key 以 bind 或 catch 开头，  衔接事件类型，  例如 bindtap、catchtouchcancel```  ```也可以在 bind 和 catch 后可以紧跟一个冒号，  如 bind:tap、catch:touchstart，  其功能不变```(1.5.0+)  ```bind 事件绑定不会阻止冒泡事件向上冒泡，  catch 事件绑定可以阻止冒泡事件向上冒泡``` |```key 以on或catch开头，  然后跟上事件的类型，  onTap, catchTap```   ```on 事件绑定不会阻止冒泡事件向上冒泡，  catch 事件绑定可以阻止冒泡事件向上冒泡```|

> 事件对象

|百度 |微信 |阿里 |
|:----:|:----:|:----:|
|type _String_ |type _String_ |type _String_ |
|timeStamp _Integer_ |timeStamp _Integer_ |timeStamp _Integer_ |
|target _{id:"",  tagName:"",  dataset:{}}_ |target _{id:"",  tagName:"",  dataset:{}}_ |target _{id:"",  tagName:"",  dataset:{},  targetDataset:{}}_ |
|currentTarget _{id:"",tagName:"",dataset:{}}_ |currentTarget _{id:"",tagName:"",dataset:{}}_ |_null_ |
|detail _{}_ |detail _{}_ |detail _{}_ |
|touches _[identifier:0,  clientX:0,  clientY:0,  pageX:0,  pageY:0]_ |touches _[identifier:0,  clientX:0,  clientY:0,  pageX:0,  pageY:0]_ |touches _[identifier:0,  clientX:0,  clientY:0,  pageX:0,  pageY:0]_ |
|changedTouches _[identifier:0,  clientX:0,  clientY:0,  pageX:0,  pageY:0]_ |changedTouches _[identifier:0,  clientX:0,  clientY:0,  pageX:0,  pageY:0]_ |changedTouches _[identifier:0,  clientX:0,  clientY:0,  pageX:0,  pageY:0]_ |
|_null_ |_null_ |touches(CanvasTouch) _[identifier:0,  x:0,  y:0]_ |

> 自定义组件

|百度 |微信 |阿里 |
|:----:|:----:|:----:|
|_null_ |1.6.3+ |1.7.0+ |
|_null_ |JSON  ```{  "component":   true  }``` |JSON  ```{  "component":   true  }``` |
|_null_ |JS  ```Component({  properties: {  innerText: {  type: String,  value: 'default value' }},  data: {},  methods: {  customMethod: function(){}  }  })``` |JS  ```Component({  mixins: [],   data: { x: 1 },   props: { y: 1 },   didMount(){},   didUpdate(){},  didUnmount(){},  methods: {   handleTap() {  this.setData({ x: this.data.x + 1});  }, },  })``` |
|_null_ |ParentJSON  ```{"usingComponents":   {  "component-tag-name":   "path/to/the/custom/component"}}``` |ParentJSON  ```{"usingComponents":   {  "customer":   "/components/customer/index"}}``` |
|_null_ |ParentWXML  ```<component-tag-name   inner-text="Some text"></component-tag-name>``` |ParentAXML  ```<customer />``` |

# 组件

> 视图容器

|百度 |微信 |阿里 |
|:----:|:----:|:----:|
|view |view |view |
|scroll-view |scroll-view |scroll-view |
|swiper |swiper |swiper |
|swiper-item |swiper-item |swiper-item |
|movable-area |movable-area |_null_ |
|movable-view |movable-view |_null_ |
|cover-view |cover-view |_null_ |
|cover-image |cover-image |_null_ |

> 基础内容

|百度 |微信 |阿里 |
|:----:|:----:|:----:|
|icon |icon |icon |
|text |text |text |
|progress |progress |progress |
|rich-text |rich-text (1.4.0+) |_null_ |
|icon |icon |icon |
|icon |icon |icon |

> 表单组件

|百度 |微信 |阿里 |
|:----:|:----:|:----:|
|button |button |button |
|checkbox-group |checkbox-group |checkbox-group |
|checkbox |checkbox |checkbox |
|form |form |form |
|input |input |input |
|label |label |label |
|picker |picker |picker |
|picker-view |picker-view |picker-view |
|radio-group |radio-group |radio-group |
|radio |radio |radio |
|slider |slider |slider |
|switch |switch |switch |
|textarea |textarea |textarea |

> 导航

|百度 |微信 |阿里 |
|:----:|:----:|:----:|
|navigator |navigator |navigator |
|_null_ |functional-page-navigator  (2.1.0+  插件的自定义组件中有效) |_null_ |

> 媒体组件

|百度 |微信 |阿里 |
|:----:|:----:|:----:|
|image |image |image |
|audio |audio |_null_ |
|video |video |_null_ |
|camera |camera (1.6.0+) |_null_ |
|live-player |live-player (1.7.0+) |_null_ |
|live-pusher |live-pusher (1.7.0+) |_null_ |

> 地图

|百度 |微信 |阿里 |
|:----:|:----:|:----:|
|map |map |map |
|polyline |_null_ |_null_ |
|circles |_null_ |_null_ |
|controls |_null_ |_null_ |
|position |_null_ |_null_ |

> 画布

|百度 |微信 |阿里 |
|:----:|:----:|:----:|
|canvas |canvas |canvas |

> 开放能力

|百度 |微信 |阿里 |
|:----:|:----:|:----:|
|open-data |open-data (1.4.0+) |_null_ |
|web-view |web-view (1.6.4+) |web-view (1.6.0+) |
|_null_ |ad (1.9.94+) |_null_ |
|_null_ |_null_ |lifestyle (1.3.0+) |
|_null_ |_null_ |contact-button (1.4.1+) |

# API

> __网络__

* 请求

|百度 |微信 |阿里 |
|:----:|:----:|:----:|
|swan.request |wx.request |my.httpRequest |
|url _String_ |url _String_ |url _String_ |
|data _{}/String_ |data _{}/[]/String_ |data _{}_ |
|header _{}_ |header _{}_ |headers _{}_ |
|method _(Upper)String  (OPTIONS,  GET,  HEAD,  POST,  PUT,  DELETE)_ |method _(Upper)String  (OPTIONS,  GET,  HEAD,  POST,  PUT,  DELETE,  TRACE,  CONNECT)_ |method _(Upper)String  (GET,  POST)_ |
|dataType _"json"_ |dataType _"json"_ |dataType _"json,  text,  base64"_ |
|_null_ |responseType _"text,  arraybuffer"_ |_null_ |
|success _func({data,statusCode,header})_ |success _func({data,statusCode,header})_ |success _func({data,statusCode,header})_ |
|fail _func_ |fail _func_ |fail _func_ |
|complete _func_ |complete _func_ |complete _func_ |

* 上传

|百度 |微信 |阿里 |
|:----:|:----:|:----:|
|swan.uploadFile |wx.uploadFile |my.uploadFile |
|url _String_ |url _String_ |url _String_ |
|filePath _String_ |filePath _String_ |filePath _String_ |
|name _String_ |name _String_ |fileName _String_ |
|header _{}_ |header _{}_ |header _{}_ |
|_null_ |_null_ |fileType _"image  / video  / audio"_ |
|success _func({data,statusCode})_ |success _func({data,statusCode})_ |success _func({data,statusCode,header})_ |
|fail _func_ |fail _func_ |fail _func_ |
|complete _func_ |complete _func_ |complete _func_ |

* 下载

|百度 |微信 |阿里 |
|:----:|:----:|:----:|
|swan.downloadFile |wx.downloadFile |my.downloadFile |
|url _String_ |url _String_ |url _String_ |
|header _{}_ |header _{}_ |header _{}_ |
|success _func({tempFilePath,statusCode})_ |success _func({tempFilePath,statusCode})_ |success _func({apFilePath})_ |
|fail _func_ |fail _func_ |fail _func_ |
|complete _func_ |complete _func_ |complete _func_ |

* WebSocket

|百度 |微信 |阿里 |
|:----:|:----:|:----:|
|swan.connectSocket |wx.connectSocket |my.connectSocket |
|url _String_ |url _String_ |url _String_ |
|_null_ |header _{}_ |header _{}_ |
|_null_ |method _(Upper)String  (OPTIONS,  GET,  HEAD,  POST,  PUT,  DELETE,  TRACE,  CONNECT)_ |_null_ |
|_null_ |protocols _[]_ |_null_ |
|_null_ |_null_ |data _{}_ |
|protocolsArray _[]_ |_null_ |_null_ |
|success _func({tempFilePath,statusCode})_ |success _func({tempFilePath,statusCode})_ |success _func({apFilePath})_ |
|fail _func_ |fail _func_ |fail _func_ |
|complete _func_ |complete _func_ |complete _func_ |
| | | |
|swan.onSocketOpen _func(res)_ |wx.onSocketOpen _func(res)_ |my.onSocketOpen _func(res)_ |
|_null_ |_null_ |my.offSocketOpen _func(res)_ |
|swan.onSocketError _func(res)_ |wx.onSocketError _func(res)_ |my.onSocketError _func(res)_ |
|_null_ |_null_ |my.offSocketError _func(res)_ |
|swan.sendSocketMessage  _{data:""/[],  fail:()=>{},  complete:()=>{}}_ |wx.sendSocketMessage  _{data:""/[],  success:()=>{},  fail:()=>{},  complete:()=>{}}_ |my.sendSocketMessage  _{data:""/[],  isBuffer:false,  success:()=>{},  fail:()=>{},  complete:()=>{}}_ |
|swan.onSocketMessage _func(res)_ |wx.onSocketMessage  _func({data:""/[]})_ |my.onSocketMessage _func({data:""/[],isBuffer:true})_ |
|_null_ |_null_ |my.offSocketMessage _func(res)_ |
|swan.closeSocket _{  code:1000,  reason:"",  success:()=>{},  fail:()=>{},  complete:()=>{}}_ |wx.closeSocket _{  code:1000,  reason:"",  success:()=>{},  fail:()=>{},  complete:()=>{}}_ |my.closeSocket _{  success:()=>{},  fail:()=>{},  complete:()=>{}}_ |
|swan.onSocketClose _func(res)_ |wx.onSocketClose _func(res)_ |my.onSocketClose _func(res)_ |
|_null_ |_null_ |my.offSocketClose _func(res)_ |
|SocketTask.send  (对应 swan.sendSocketMessage) |SocketTask.send  (对应 wx.sendSocketMessage) |_null_ |
|SocketTask.close  (对应 swan.closeSocket) |SocketTask.close  (对应 wx.closeSocket) |_null_ |
|SocketTask.onOpen  (对应 swan.onSocketOpen) |SocketTask.onOpen  (对应 wx.onSocketOpen) |_null_ |
|SocketTask.onClose  (对应 swan.onSocketClose) |SocketTask.onClose  (对应 wx.onSocketClose) |_null_ |
|SocketTask.onError  (对应 swan.onSocketError) |SocketTask.onError  (对应 wx.onSocketError) |_null_ |
|SocketTask.onMessage  (对应 swan.onSocketMessage) |SocketTask.onMessage  (对应 wx.onSocketMessage) |_null_ |

> __媒体__

* 图片

|百度 |微信 |阿里 |
|:----:|:----:|:----:|
|swan.chooseImage |wx.chooseImage |my.chooseImage |
|count _9_ |count _9_ |count _1_ |
|sizeType _["original","compressed"]_ |sizeType _["original","compressed"]_ |_null_ |
|sourceType _["album","camera"]_ |sourceType _["album","camera"]_ |sourceType _["album","camera"]_ |
|success _func({tempFilePaths:[],tempFiles:{}})_ |success _func({tempFilePaths:[],tempFiles:{}})_ |success _func({tempFilePaths:[]})_ |
|fail _func_ |fail _func_ |fail _func_ |
|complete _func_ |complete _func_ |complete _func_ |
| | | |
|swan.previewImage |wx.previewImage |my.previewImage |
|current _String_ |current _String_ |current _String_ |
|urls _[]_ |urls _[]_ |urls _[]_ |
|success _func_ |success _func_ |success _func_ |
|fail _func_ |fail _func_ |fail _func_ |
|complete _func_ |complete _func_ |complete _func_ |
| | | |
|swan.getImageInfo |wx.getImageInfo |my.getImageInfo |
|src _String_ |src _String_ |src _String_ |
|success _func({width,height,path:})_ |success _func_ |success _func_ |
|fail _func_ |fail _func_ |fail _func_ |
|complete _func_ |complete _func_ |complete _func_ |