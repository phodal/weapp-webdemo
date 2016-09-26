「微信小程序」 Web Demo
===

更多精彩内容请关注：

![QRCode](http://articles.phodal.com/qrcode.jpg)

原理
---

### 真实世界下的MINA三基本元素

「微信小程序」的背后运行的是一个名为MINA框架。在之前的几篇文章里，我们介绍得差不多了。现在让我们来作介绍pipeline：

#### Transform wxml和wxss

当我们修改完WXML、WXSS的时候，我们需要重新编译项目才能在浏览器上看到效果。这时候后台就会执行一些**transform**动作：

1. wcc来转换wxml为一个genrateFun，执行这个方法将会得到一个virtual dom
2. wxss就会转换wxss为css——这一点有待商榷。

wcc和wxss，可以从vendor目录下获取到，在“微信web开发者工具”下敲入``help``，你就会得到下面的东东。运行``openVendor()``，你就会得到上面的wcss、wxss、WAService.js、WAWebview.js四个文件了。

#### Transform js文件

对于js文件来说，则是一个拼装的过程，如下是我们的app.js文件：

```javascript
App({
onLaunch: function () { }
})
```

它在转换后会变成：

```javascript
define("app.js", function(require, module){var window={Math:Math}/*兼容babel*/,location,document,navigator,self,localStorage,history,Caches;
        App({
            onLaunch: function () {

            }
        })
});
require("app.js");
```        

我假装你已经知道这是什么了，反正我也不想、也不会解释了~~。同理于：

```javascript
define("pages/index/index.js", function(require, module){var window={Math:Math}/*兼容babel*/,location,document,navigator,self,localStorage,history,Caches;
        Page({
            data: {
                text: initData
            }
        });
    require("pages/index/index.js");
```    

至于它是如何replace或者apend到html中，我就不作解释了。

### MINA如何运行？

为了运行一个Page，我们需要有一个virtual dom，即用wcc转换后的函数，如：

```javascript
 /*v0.7cc_20160919*/
        var $gwxc
        var $gaic={}
        $gwx=function(path,global){
            function _(a,b){b&&a.children.push(b);}
            function _n(tag){$gwxc++;if($gwxc>=16000){throw 'enough, dom limit exceeded, you don\'t do stupid things, do you?'};return {tag:tag.substr(0,3)=='wx-'?tag:'wx-'+tag,attr:{},children:[]}}
            function _s(scope,env,key){return typeof(scope[key])!='undefined'?scope[key]:env[key]}
            function _wl(tname){console.warn('template `' + tname + '` is being call recursively, will be stop.')}
            function _ai(i,p,e,me){var x=_grp(p,e,me);if(x)i.push(x);else{console.warn('path `'+p+'` not found from `'+me+'`')}}
            function _grp(p,e,me){if(p[0]!='/'){var mepart=me.split('/');mepart.pop();var ppart=p.split('/');for(var i=0;i<ppart.length;i++){if( ppart[i]=='..')mepart.pop();else if(!ppart[i])continue;else mepart.push(ppart[i]);}p=mepart.join('/');}if(me[0]=='.'&&p[0]=='/')p='.'+p;if(e[p])return p;if(e[p+'.wxml'])return p+'.wxml';}
//以下省略好多字。
```

然后在我们的html中加一个script，如

```javascript
document.dispatchEvent(new CustomEvent("generateFuncReady", {
        detail: {
            generateFunc: $gwx('index.wxml')
        }
    }))
```    

就会凑发这个事件了。我简单的拆分了WXWebview.js得到了几个功能组件：

 - define.js，这里就是定义AMD模块化的地方
 - exparser.js，用于转换WXML标签到HTML标签
 - exparser-behvaior.js，定义不同标签的一些行为
 - mobile.js，应该是一个事件库，好像我并不关心。
 - page.js，核心代码，即Page、App的定义所在。
 - report.js，**你所说的一切都能够用作为你的呈堂证供**。
 - virtual_dom.js，一个virtual dom实现结合wcc使用，里面应该还有component.css，也可能是叫weui
 - wa-wx.js，定义微信各种API以及WebView和Native的地方，和下面的WX有冲突。
 - wx.js，同上，但是略有不同。
 - wxJSBridge.js，Weixin JS Bridge

于是，我就用上面的组件来定义不同的位置好了。当我们触发自定义的``generateFuncReady``事件时，将由virtual_dom.js来接管这次Render：

```javascript
document.addEventListener("generateFuncReady", function (e) {
    var generateFunc = e.detail.generateFunc;
    wx.onAppDataChange && generateFunc && wx.onAppDataChange(function (e) {
        var i = generateFunc((0, d.getData)());
        if (i.tag = "body", e.options && e.options.firstRender){
            e.ext && ("undefined" != typeof e.ext.webviewId && (window.__webviewId__ = e.ext.webviewId), "undefined" != typeof e.ext.downloadDomain && (window.__downloadDomain__ = e.ext.downloadDomain)), v = f(i, !0), b = v.render(), b.replaceDocumentElement(document.body), setTimeout(function () {
                wx.publishPageEvent(p, {}), r("firstRenderTime", n, Date.now()), wx.initReady && wx.initReady()
            }, 0);
        } else {
            var o = f(i, !1), a = v.diff(o);
            a.apply(b), v = o, document.dispatchEvent(new CustomEvent("pageReRender", {}));
        }
    })
})
```

因此，这里就是负责DOM初始化的地方了，这里得到的Dom结果是这样的：

```html
<wx-view class="btn-area">
    <wx-view class="body-view">
        <wx-text><span style="display:none;"></span><span></span></wx-text>
        <wx-button>add line</wx-button>
        <wx-button>remove line</wx-button>
    </wx-view>
</wx-view>
```

而我们写的wxml是这样的：

```html
<view class="btn-area">
  <view class="body-view">
    <text>{{text}}</text>
    <button bindtap="add">add line</button>
    <button bindtap="remove">remove line</button>
  </view>
</view>
```

很明显view会被转换为wx-view，text会被转换为wx-text等等，以此类推。这个转换是在virtual dom.js中调用的，调用的方法就是exparser。

遗憾的是我现在困在 data初始化上面了~~，这里面有两套不同的事件系统，有一些困扰。其中有一个是：WeixinJSBridge、还有一个是app engine中的事件系统，两个好像不能互调。。。

### 使用WebStorm开发

在浏览器上运行之前，我们需要简单的mock一些方法，如：

 - window.webkit.messageHandlers.invokeHandler.postMessage
 - window.webkit.messageHandlers.publishHandler.postMessage
 - WeixinJSCore.publishHandler
 - WeixinJSCore..invokeHandler

然后把 ``config.json``中的一些内容变成``__wxConfig``，如：

```javascript
__wxConfig = {
    "debug": true,
    "pages": ["index"],
    "window": {
        "backgroundTextStyle": "light",
        "navigationBarBackgroundColor": "#fff",
        "navigationBarTitleText": "WeChat",
        "navigationBarTextStyle": "black"
    },
    "projectConfig": {
    
    },
    "appserviceConfig": {
       
    },
    "appname": "fdfafafafafafafa",
    "appid": "touristappid",
    "apphash": 2107567080,
    "isTourist": true,
    "userInfo": {}
}
```

如这里我们的appname是``哈哈哈哈哈哈哈``——我家在福建。

然后在我们的html中引入各个js文件，啦啦。

我们还需要一个自动化的glup脚本来watch wxml和wxss的修改，然后编译，如：

```javascript
exec('./vendor/wcc -d ' + inputPath + ' > ' + outputFileName, function(err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
});
```        

说了这么多，你还不如去看代码好了。

