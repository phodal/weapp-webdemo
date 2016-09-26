wx = function (e) {
    function t(i) {
        if (n[i])return n[i].exports;
        var r = n[i] = {exports: {}, id: i, loaded: !1};
        return e[i].call(r.exports, r, r.exports, t), r.loaded = !0, r.exports
    }

    var n = {};
    return t.m = e, t.c = n, t.p = "", t(0)
}([function (e, t, n) {
    "use strict";
    function i(e) {
        return l ? void(c[e] = u[e]) : void c.__defineGetter__(e, function () {
            return function () {
                try {
                    return u[e].apply(this, arguments)
                } catch (e) {
                    r(e)
                }
            }
        })
    }

    function r(e) {
        if ("[object Error]" === Object.prototype.toString.apply(e)) {
            if ("WebviewSdkKnownError" == e.type)throw e;
            console.error(e.stack), Reporter.errorReport({key: "webviewSDKScriptError", error: e})
        }
    }

    var o = n(1), a = n(2);
    n(3);
    var s = !1, c = {}, l = "devtools" === (0, a.getPlatform)(), d = function (e, t) {
        (0, o.publish)("INVOKE_METHOD", {name: e, args: t})
    }, u = {
        invoke: o.invoke, on: o.on, reportIDKey: function (e, t) {
            console.warn("reportIDKey has been removed wx")
        }, reportKeyValue: function (e, t) {
            console.warn("reportKeyValue has been removed from wx")
        }, initReady: function () {
            (0, o.invokeMethod)("initReady")
        }, redirectTo: function (e) {
            d("redirectTo", e)
        }, navigateTo: function (e) {
            d("navigateTo", e)
        }, showKeyboard: function (e) {
            (0, o.invokeMethod)("showKeyboard", e)
        }, showDatePickerView: function (e) {
            (0, o.invokeMethod)("showDatePickerView", e)
        }, hideKeyboard: function (e) {
            (0, o.invokeMethod)("hideKeyboard", e)
        }, insertMap: function (e) {
            (0, o.invokeMethod)("insertMap", e)
        }, removeMap: function (e) {
            (0, o.invokeMethod)("removeMap", e)
        }, updateMapCovers: function (e) {
            (0, o.invokeMethod)("updateMapCovers", e)
        }, getRealRoute: a.getRealRoute, getCurrentRoute: function (e) {
            (0, o.invokeMethod)("getCurrentRoute", e, {
                beforeSuccess: function (e) {
                    e.route = e.route.split("?")[0]
                }
            })
        }, getLocalImgData: function (e) {
            "string" == typeof e.path ? u.getCurrentRoute({
                success: function (t) {
                    var n = t.route;
                    e.path = (0, a.getRealRoute)(n || "index.html", e.path), (0, o.invokeMethod)("getLocalImgData", e)
                }
            }) : (0, o.invokeMethod)("getLocalImgData", e)
        }, insertVideoPlayer: function (e) {
            (0, o.invokeMethod)("insertVideoPlayer", e)
        }, removeVideoPlayer: function (e) {
            (0, o.invokeMethod)("removeVideoPlayer", e)
        }, onAppDataChange: function (e) {
            (0, o.subscribe)("pageInitData", function (t) {
                s === !1 && (s = !0, e(t))
            }), (0, o.publish)("pageReady", {}), (0, o.subscribe)("appDataChange", function (t) {
                setTimeout(function () {
                    e(t)
                }, 0)
            })
        }, publishPageEvent: function (e, t) {
            (0, o.publish)("PAGE_EVENT", {eventName: e, data: t})
        }, animationToStyle: a.animationToStyle
    };
    for (var h in u)i(h);
    e.exports = c
}, function (e, t) {
    "use strict";
    function n(e) {
        "undefined" != typeof WeixinJSBridge ? e() : document.addEventListener("WeixinJSBridgeReady", e, !1)
    }

    function i() {
        var e = arguments;
        n(function () {
            WeixinJSBridge.invoke.apply(WeixinJSBridge, e)
        })
    }

    function r() {
        var e = arguments;
        n(function () {
            WeixinJSBridge.on.apply(WeixinJSBridge, e)
        })
    }

    function o() {
        var e = Array.prototype.slice.call(arguments);
        e[1] = {data: e[1], options: {timestamp: Date.now()}}, n(function () {
            WeixinJSBridge.publish.apply(WeixinJSBridge, e)
        })
    }

    function a() {
        var e = Array.prototype.slice.call(arguments), t = e[1];
        e[1] = function (e, n) {
            var i = e.data, r = e.options, o = arguments.length <= 2 || void 0 === arguments[2] ? {} : arguments[2], a = r && r.timestamp || 0, s = Date.now();
            if ("function" == typeof t && t(i, n), s - a > 20) {
                var c = JSON.stringify(i || {}).length;
                Reporter.reportKeyValue({
                    key: "Speed",
                    value: "2," + a + "," + o.nativeTime + "," + o.nativeTime + "," + s + "," + c
                })
            }
        }, n(function () {
            WeixinJSBridge.subscribe.apply(WeixinJSBridge, e)
        })
    }

    function s(e) {
        var t = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1], n = arguments.length <= 2 || void 0 === arguments[2] ? {} : arguments[2], r = {};
        for (var o in t)"function" == typeof t[o] && (r[o] = t[o], delete t[o]);
        i(e, t, function (t) {
            t.errMsg = t.errMsg || e + ":ok";
            var i = 0 === t.errMsg.indexOf(e + ":ok"), o = 0 === t.errMsg.indexOf(e + ":cancel"), a = 0 === t.errMsg.indexOf(e + ":fail");
            "function" == typeof n.beforeAll && n.beforeAll(t), i ? ("function" == typeof n.beforeSuccess && n.beforeSuccess(t), "function" == typeof r.success && r.success(t), "function" == typeof n.afterSuccess && n.afterSuccess(t)) : o ? ("function" == typeof r.cancel && r.cancel(t), "function" == typeof n.cancel && n.cancel(t)) : a && ("function" == typeof r.fail && r.fail(t), "function" == typeof n.fail && n.fail(t)), "function" == typeof r.complete && r.complete(t), "function" == typeof n.complete && n.complete(t)
        })
    }

    function c(e, t) {
        r(e, t)
    }

    Object.defineProperty(t, "__esModule", {value: !0}), t.invoke = i, t.on = r, t.publish = o, t.subscribe = a, t.invokeMethod = s, t.onMethod = c
}, function (e, t) {
    "use strict";
    function n(e, t) {
        if (!(e instanceof t))throw new TypeError("Cannot call a class as a function")
    }

    function i(e, t) {
        if (!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
    }

    function r(e, t) {
        if ("function" != typeof t && null !== t)throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
    }

    function o(e, t) {
        if (0 === t.indexOf("/"))return t.substr(1);
        if (0 === t.indexOf("./"))return o(e, t.substr(2));
        var n, i, r = t.split("/");
        for (n = 0, i = r.length; n < i && ".." === r[n]; n++);
        r.splice(0, n);
        var t = r.join("/"), a = e.length > 0 ? e.split("/") : [];
        a.splice(a.length - n - 1, n + 1);
        var s = a.concat(r), c = s.join("/");
        return c
    }

    function a(e) {
        var t = e.animates, n = e.option, i = void 0 === n ? {} : n, r = i.transformOrigin, o = i.transition;
        if ("undefined" == typeof o || "undefined" == typeof t)return {
            transformOrigin: "",
            transform: "",
            transition: ""
        };
        var a = t.filter(function (e) {
            var t = e.type;
            return "style" !== t
        }).map(function (e) {
            var t = e.type, n = e.args;
            switch (t) {
                case"matrix":
                    return "matrix(" + n.join(",") + ")";
                case"matrix3d":
                    return "matrix3d(" + n.join(",") + ")";
                case"rotate":
                    return n = n.map(l), "rotate(" + n[0] + ")";
                case"rotate3d":
                    return n[3] = l(n[3]), "rotate3d(" + n.join(",") + ")";
                case"rotateX":
                    return n = n.map(l), "rotateX(" + n[0] + ")";
                case"rotateY":
                    return n = n.map(l), "rotateY(" + n[0] + ")";
                case"rotateZ":
                    return n = n.map(l), "rotateZ(" + n[0] + ")";
                case"scale":
                    return "scale(" + n.join(",") + ")";
                case"scale3d":
                    return "scale3d(" + n.join(",") + ")";
                case"scaleX":
                    return "scaleX(" + n[0] + ")";
                case"scaleY":
                    return "scaleY(" + n[0] + ")";
                case"scaleZ":
                    return "scaleZ(" + n[0] + ")";
                case"translate":
                    return n = n.map(c), "translate(" + n.join(",") + ")";
                case"translate3d":
                    return n = n.map(c), "translate3d(" + n.join(",") + ")";
                case"translateX":
                    return n = n.map(c), "translateX(" + n[0] + ")";
                case"translateY":
                    return n = n.map(c), "translateY(" + n[0] + ")";
                case"translateZ":
                    return n = n.map(c), "translateZ(" + n[0] + ")";
                case"skew":
                    return n = n.map(l), "skew(" + n.join(",") + ")";
                case"skewX":
                    return n = n.map(l), "skewX(" + n[0] + ")";
                case"skewY":
                    return n = n.map(l), "skewY(" + n[0] + ")";
                default:
                    return ""
            }
        }).join(" "), s = t.filter(function (e) {
            var t = e.type;
            return "style" === t
        }).reduce(function (e, t) {
            return e[t.args[0]] = t.args[1], e
        }, {});
        return {
            style: s,
            transformOrigin: r,
            transform: a,
            transition: o.duration + "ms " + o.timingFunction + " " + o.delay + "ms"
        }
    }

    function s() {
        return window.navigator ? window.navigator.userAgent.indexOf("wechatdevtools") > -1 ? "devtools" : "android" : "ios"
    }

    function c(e) {
        return "number" == typeof e ? e + "px" : e
    }

    function l(e) {
        return e + "deg"
    }

    Object.defineProperty(t, "__esModule", {value: !0}), t.getRealRoute = o, t.animationToStyle = a, t.getPlatform = s;
    t.WebviewSdkKnownError = function (e) {
        function t(e) {
            n(this, t);
            var r = i(this, Object.getPrototypeOf(t).call(this, "Webview-SDK:" + e));
            return r.type = "WebviewSdkKnownError", r
        }

        return r(t, e), t
    }(Error)
}, function (e, t, n) {
    "use strict";
    function i(e) {
        "loading" !== document.readyState ? e() : document.addEventListener("DOMContentLoaded", e)
    }

    var r = n(1), o = !1, a = ["log", "warn", "error", "info", "debug"];
    a.forEach(function (e) {
        (0, r.subscribe)(e, function (t) {
            var n = t.log;
            console[e].apply(console, n)
        })
    }), (0, r.subscribe)("initLogs", function (e) {
        var t = e.logs;
        o === !1 && (o = !0, t.forEach(function (e) {
            var t = e.method, n = e.log;
            console[t].apply(console, n)
        }), o = !0)
    }), i(function () {
        setTimeout(function () {
            (0, r.publish)("DOMContentLoaded", {})
        }, 1e3)
    })
}])
