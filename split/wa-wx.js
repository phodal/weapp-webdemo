wx = function (e) {
    function t(o) {
        if (n[o])return n[o].exports;
        var r = n[o] = {exports: {}, id: o, loaded: !1};
        return e[o].call(r.exports, r, r.exports, t), r.loaded = !0, r.exports
    }

    var n = {};
    return t.m = e, t.c = n, t.p = "", t(0)
}([function (e, t, n) {
    function o(e) {
        return e && e.__esModule ? e : {default: e}
    }

    function r(e) {
        if ("[object Error]" === Object.prototype.toString.apply(e)) {
            if ("AppServiceSdkKnownError" == e.type)throw e;
            S ? console.error(e.stack) : console.error(e.message), Reporter.errorReport({
                key: "appServiceSDKScriptError",
                error: e
            })
        }
    }

    function i(e) {
        return S ? e : function () {
            try {
                return e.apply(e, arguments)
            } catch (e) {
                r(e)
            }
        }
    }

    function a(e) {
        m.__defineGetter__(e, function () {
            return i(O[e])
        })
    }

    function u(e, t, n) {
        var o = (0, p.paramCheck)(t, n);
        return !o || (o = e + ":fail parameter error: " + o, t && ("function" == typeof t.fail && t.fail({errMsg: o}), "function" == typeof t.complete && t.complete({errMsg: o})), console.error(o), !1)
    }

    var c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e
    } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
    }, s = n(1), p = n(2), f = n(3), l = o(f);
    n(4), n(5);
    var d = n(6), h = n(7), g = {}, v = "", y = [], w = [], b = void 0, m = {}, S = "devtools" === (0, p.getPlatform)(), k = !1, _ = !1, P = [], A = [];
    "devtools" === (0, p.getPlatform)() && (0, s.subscribe)("SPECIAL_PAGE_EVENT", function (e) {
        var t = e.data, n = e.eventName, o = arguments.length <= 1 || void 0 === arguments[1] ? 0 : arguments[1];
        if (t && "input" == t.type && "function" == typeof b) {
            var r = b({data: t, eventName: n, webviewId: o});
            "undefined" != typeof r && ("string" == typeof r ? r != t.detail.value && (0, s.publish)("setKeyboardValue", {
                value: r,
                cursor: -1
            }, [o]) : "object" == ("undefined" == typeof r ? "undefined" : c(r)) && (0, s.publish)("setKeyboardValue", {
                value: r.value || "",
                cursor: "undefined" == typeof r.cursor ? -1 : r.cursor
            }, [o]))
        }
    });
    var O = {
        invoke: s.invoke, on: s.on, reportIDKey: function (e, t) {
        }, reportKeyValue: function (e, t) {
        }, onPullDownRefresh: function (e) {
            console.log("onPullDownRefresh has been removed from api list")
        }, setNavigationBarTitle: function () {
            var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
            u("setNavigationBarTitle", e, {title: ""}) && (0, s.invokeMethod)("setNavigationBarTitle", e)
        }, showNavigationBarLoading: function (e) {
            (0, s.invokeMethod)("showNavigationBarLoading", e)
        }, hideNavigationBarLoading: function (e) {
            (0, s.invokeMethod)("hideNavigationBarLoading", e)
        }, stopPullDownRefresh: function (e) {
            (0, s.invokeMethod)("stopPullDownRefresh", e)
        }, redirectTo: function (e) {
            u("redirectTo", e, {url: ""}) && (e.url = (0, p.getRealRoute)(v, e.url), e.url = (0, p.encodeUrlQuery)(e.url), (0, s.invokeMethod)("redirectTo", e, {
                afterSuccess: function () {
                    v = e.url
                }
            }))
        }, navigateTo: function (e) {
            u("navigateTo", e, {url: ""}) && (e.url = (0, p.getRealRoute)(v, e.url), e.url = (0, p.encodeUrlQuery)(e.url), (0, d.notifyCurrentRoutetoContext)(v), (0, s.invokeMethod)("navigateTo", e, {
                afterSuccess: function () {
                    v = e.url
                }
            }))
        }, navigateBack: function (e) {
            (0, s.invokeMethod)("navigateBack", e)
        }, getStorage: function (e) {
            u("getStorage", e, {key: ""}) && (0, s.invokeMethod)("getStorage", e, {
                beforeSuccess: function (e) {
                    e.data = (0, p.stringToAnyType)(e.data, e.dataType), delete e.dataType
                }
            })
        }, getStorageSync: function (e) {
            var t = "ios" === (0, p.getPlatform)() ? "getStorage" : "getStorageSync", n = void 0;
            return (0, s.invokeMethod)(t, {key: e}, {
                beforeAll: function () {
                    var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
                    n = (0, p.stringToAnyType)(e.data, e.dataType)
                }
            }), n
        }, setStorage: function (e) {
            if (u("setStorage", e, {key: ""})) {
                var t = (0, p.anyTypeToString)(e.data), n = t.data, o = t.dataType;
                (0, s.invokeMethod)("setStorage", {
                    key: e.key,
                    data: n,
                    dataType: o,
                    success: e.success,
                    fail: e.fail,
                    complete: e.complete
                })
            }
        }, setStorageSync: function (e) {
            var t = arguments.length <= 1 || void 0 === arguments[1] ? "" : arguments[1], n = "ios" === (0, p.getPlatform)() ? "setStorage" : "setStorageSync", o = (0, p.anyTypeToString)(t), r = o.data, i = o.dataType;
            (0, s.invokeMethod)(n, {key: e, data: r, dataType: i})
        }, clearStorage: function (e) {
            (0, s.invokeMethod)("clearStorage", e)
        }, clearStorageSync: function () {
            var e = "ios" === (0, p.getPlatform)() ? "clearStorage" : "clearStorageSync";
            (0, s.invokeMethod)(e)
        }, request: function () {
            var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
            if (u("request", e, {url: ""})) {
                if ((0, p.validateUrl)(e.url) === !1) {
                    var t = {errMsg: 'request: fail, invalid url "' + e.url + '"'};
                    return "function" == typeof e.fail && e.fail(t), void("function" == typeof e.complete && e.complete(t))
                }
                var n = (0, p.getDataType)(e.header);
                "Undefined" !== n && "Object" !== n && (console.warn("wx.request: header is " + n + ", expect Object."), e.header = {});
                var o = e.header || {}, r = e.method || "GET", i = void 0;
                if (e.dataType = e.dataType || "json", o["content-type"] = o["content-type"] || "application/json", "function" == typeof e.data)throw new p.AppServiceSdkKnownError("request: data can not be a function.");
                i = "string" != typeof e.data ? o["content-type"].indexOf("application/x-www-form-urlencoded") > -1 ? (0, p.urlEncodeFormData)(e.data) : o["content-type"].indexOf("application/json") > -1 ? JSON.stringify(e.data) : "object" === c(e.data) ? JSON.stringify(e.data) : i.toString() : e.data, "GET" === r.toUpperCase() && (e.url = (0, p.addQueryStringToUrl)(e.url, e.data)), (0, s.invokeMethod)("request", {
                    url: e.url,
                    data: i,
                    header: o,
                    method: r,
                    success: e.success,
                    fail: e.fail,
                    complete: e.complete
                }, {
                    beforeSuccess: function (t) {
                        if ("json" === e.dataType)try {
                            t.data = JSON.parse(t.data)
                        } catch (e) {
                        }
                    }
                })
            }
        }, connectSocket: function (e) {
            u("connectSocket", e, {url: ""}) && (0, s.invokeMethod)("connectSocket", e)
        }, closeSocket: function (e) {
            (0, s.invokeMethod)("closeSocket", e)
        }, sendSocketMessage: function (e) {
            u("sendSocketMessage", e, {data: ""}) && (0, s.invokeMethod)("sendSocketMessage", e)
        }, onSocketOpen: function (e) {
            u("onSocketOpen", e, function () {
            }) && (0, s.onMethod)("onSocketOpen", e)
        }, onSocketClose: function (e) {
            u("onSocketClose", e, function () {
            }) && (0, s.onMethod)("onSocketClose", e)
        }, onSocketMessage: function (e) {
            u("onSocketMessage", e, function () {
            }) && (0, s.onMethod)("onSocketMessage", e)
        }, onSocketError: function (e) {
            u("onSocketError", e, function () {
            }) && (0, s.onMethod)("onSocketError", e)
        }, uploadFile: function (e) {
            u("uploadFile", e, {url: "", filePath: "", name: ""}) && (0, s.invokeMethod)("uploadFile", e)
        }, downloadFile: function (e) {
            u("downloadFile", e, {url: ""}) && (0, s.invokeMethod)("downloadFile", e)
        }, chooseImage: function () {
            var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
            (0, s.invokeMethod)("chooseImage", (0, p.assign)({
                count: 9,
                sizeType: ["original", "compressed"],
                sourceType: ["album", "camera"]
            }, e), e)
        }, previewImage: function (e) {
            u("previewImage", e, {urls: [""]}) && (0, s.invokeMethod)("previewImage", e)
        }, startRecord: function (e) {
            (0, s.invokeMethod)("startRecord", e)
        }, stopRecord: function (e) {
            (0, s.invokeMethod)("stopRecord", e)
        }, playVoice: function (e) {
            u("playVoice", e, {filePath: ""}) && (0, s.invokeMethod)("playVoice", e)
        }, pauseVoice: function (e) {
            (0, s.invokeMethod)("pauseVoice", e)
        }, stopVoice: function (e) {
            (0, s.invokeMethod)("stopVoice", e)
        }, onVoicePlayEnd: function (e) {
            (0, s.onMethod)("onVoicePlayEnd", e)
        }, chooseVideo: function () {
            var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
            e.sourceType = e.sourceType || ["album", "camera"], e.camera = e.camera || ["front", "back"], (0, s.invokeMethod)("chooseVideo", e)
        }, getLocation: function (e) {
            (0, s.invokeMethod)("getLocation", e)
        }, openLocation: function () {
            var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
            u("openLocation", e, {}) && (0, s.invokeMethod)("openLocation", e)
        }, getNetworkType: function (e) {
            (0, s.invokeMethod)("getNetworkType", e)
        }, getSystemInfo: function (e) {
            (0, s.invokeMethod)("getSystemInfo", e)
        }, onAccelerometerChange: function (e) {
            k || ((0, s.invokeMethod)("enableAccelerometer", {enable: !0}), k = !0), P.push(e)
        }, onCompassChange: function (e) {
            _ || ((0, s.invokeMethod)("enableCompass", {enable: !0}), _ = !0), A.push(e)
        }, reportAction: function (e) {
            (0, s.invokeMethod)("reportAction", e)
        }, getBackgroundAudioPlayerState: function (e) {
            (0, s.invokeMethod)("getMusicPlayerState", e)
        }, playBackgroundAudio: function () {
            var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
            (0, s.invokeMethod)("operateMusicPlayer", (0, p.assign)({operationType: "play"}, e), {
                beforeAll: function (e) {
                    e.errMsg = e.errMsg.replace("operateMusicPlayer", "playBackgroundAudio")
                }
            })
        }, pauseBackgroundAudio: function () {
            var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
            (0, s.invokeMethod)("operateMusicPlayer", (0, p.assign)({operationType: "pause"}, e), {
                beforeAll: function (e) {
                    e.errMsg = e.errMsg.replace("operateMusicPlayer", "pauseBackgroundAudio")
                }
            })
        }, seekBackgroundAudio: function () {
            var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
            (0, s.invokeMethod)("operateMusicPlayer", (0, p.assign)({operationType: "seek"}, e), {
                beforeAll: function (e) {
                    e.errMsg = e.errMsg.replace("operateMusicPlayer", "seekBackgroundAudio")
                }
            })
        }, stopBackgroundAudio: function () {
            var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
            (0, s.invokeMethod)("operateMusicPlayer", (0, p.assign)({operationType: "stop"}, e), {
                beforeAll: function (e) {
                    e.errMsg = e.errMsg.replace("operateMusicPlayer", "stopBackgroundAudio")
                }
            })
        }, onBackgroundAudioPlay: function (e) {
            (0, s.onMethod)("onMusicPlay", e)
        }, onBackgroundAudioPause: function (e) {
            (0, s.onMethod)("onMusicPause", e)
        }, onBackgroundAudioStop: function (e) {
            (0, s.onMethod)("onMusicEnd", e)
        }, login: function (e) {
            (0, s.invokeMethod)("login", e)
        }, checkLogin: function (e) {
            (0, s.invokeMethod)("checkLogin", e)
        }, authorize: function (e) {
            (0, s.invokeMethod)("authorize", e)
        }, getUserInfo: function (e) {
            (0, s.invokeMethod)("operateWXData", (0, p.assign)({
                data: {
                    api_name: "webapi_getuserinfo",
                    data: e.data || {}
                }
            }, e), {
                beforeAll: function (e) {
                    e.errMsg = e.errMsg.replace("operateWXData", "getUserInfo")
                }, beforeSuccess: function (e) {
                    "android" === (0, p.getPlatform)() && (e.data = JSON.parse(e.data)), e.rawData = e.data.data;
                    try {
                        e.userInfo = JSON.parse(e.data.data), e.signature = e.data.signature, e.encryptData = e.data.encryptData, delete e.data
                    } catch (e) {
                    }
                }
            })
        }, getFriends: function (e) {
            (0, s.invokeMethod)("operateWXData", {
                data: {api_name: "webapi_getfriends", data: e.data || {}},
                success: e.success,
                fail: e.fail,
                complete: e.complete
            }, {
                beforeAll: function (e) {
                    e.errMsg = e.errMsg.replace("operateWXData", "getFriends")
                }, beforeSuccess: function (e) {
                    "android" === (0, p.getPlatform)() && (e.data = JSON.parse(e.data)), e.rawData = e.data.data;
                    try {
                        e.friends = JSON.parse(e.data.data), e.signature = e.data.signature, delete e.data
                    } catch (e) {
                    }
                }
            })
        }, requestPayment: function (e) {
            (0, s.invokeMethod)("requestPayment", e)
        }, verifyPaymentPassword: function (e) {
            (0, s.invokeMethod)("verifyPaymentPassword", e)
        }, bindPaymentCard: function (e) {
            (0, s.invokeMethod)("bindPaymentCard", e)
        }, openAddress: function (e) {
            (0, s.invokeMethod)("openAddress", e)
        }, saveFile: function (e) {
            (0, s.invokeMethod)("saveFile", e)
        }, chooseContact: function (e) {
            (0, s.invokeMethod)("chooseContact", e)
        }, onAppRoute: function (e, t) {
            y.push(e)
        }, onAppRouteDone: function (e, t) {
            w.push(e)
        }, onAppEnterBackground: function (e, t) {
            (0, s.onMethod)("onAppEnterBackground", function () {
                "function" == typeof e && e.apply(e, arguments), Reporter.submit()
            })
        }, onAppEnterForeground: function (e, t) {
            (0, s.onMethod)("onAppEnterForeground", e)
        }, setAppData: function (e) {
            var t = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1], n = arguments[2];
            arguments[3];
            if (t.forceUpdate = "undefined" != typeof t.forceUpdate && t.forceUpdate, (0, p.isObject)(e) === !1)throw new p.AppServiceSdkKnownError("setAppData:data should be an object");
            !function () {
                var o = !1, r = {}, i = function (e, t, n) {
                    o = !0, r[e] = t, "Array" === n || "Object" === n ? g[e] = JSON.parse(JSON.stringify(t)) : g[e] = t
                };
                for (var a in e) {
                    var u = e[a], c = g[a], f = (0, p.getDataType)(c), l = (0, p.getDataType)(u);
                    f !== l ? i(a, u, l) : "Array" == f || "Object" == f ? JSON.stringify(c) !== JSON.stringify(u) && i(a, u, l) : "String" == f || "Number" == f || "Boolean" == f ? c.toString() !== u.toString() && i(a, u, l) : "Date" == f ? c.getTime().toString() !== u.getTime().toString() && i(a, u, l) : c !== u && i(a, u, l)
                }
                t.forceUpdate ? (0, s.publish)("appDataChange", {
                    data: e,
                    option: {timestamp: Date.now(), forceUpdate: !0}
                }, n) : o && (0, s.publish)("appDataChange", {data: r}, n)
            }()
        }, onPageEvent: function (e, t) {
            console.warn("'onPageEvent' is deprecated, use 'Page[eventName]'")
        }, createAnimation: function () {
            var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
            if (u("createAnimation", e, {}))return new l.default(e)
        }, onWebviewEvent: function (e, t) {
            b = e, (0, s.subscribe)("PAGE_EVENT", function (t) {
                var n = t.data, o = t.eventName, r = arguments.length <= 1 || void 0 === arguments[1] ? 0 : arguments[1];
                e({data: n, eventName: o, webviewId: r})
            })
        }, onNativeEvent: function (e) {
            ["onCanvasTouchStart", "onCanvasTouchMove", "onCanvasTouchEnd"].forEach(function (t) {
                (0, s.onMethod)(t, function (n, o) {
                    e({data: n, eventName: t, webviewId: o})
                })
            })
        }, drawCanvas: h.drawCanvas, createContext: h.createContext, hideKeyboard: function (e) {
            "devtools" == (0, p.getPlatform)() ? (0, s.publish)("hideKeyboard", {}) : (0, s.invokeMethod)("hideKeyboard", e)
        }, getPublicLibVersion: function () {
            var e = void 0;
            return (0, s.invokeMethod)("getPublicLibVersion", {
                complete: function (t) {
                    t.version ? e = t.version : (e = t, delete e.errMsg)
                }
            }), e
        }
    };
    (0, s.subscribe)("pageReady", function () {
        (0, s.publish)("pageInitData", {data: g})
    }), (0, s.subscribe)("INVOKE_METHOD", i(function (e, t) {
        var n = e.name, o = e.args;
        O[n](o)
    })), (0, s.onMethod)("onAppRoute", i(function (e) {
        var t = arguments.length <= 1 || void 0 === arguments[1] ? 0 : arguments[1];
        e.path = e.path.substring(0, e.path.length - 5), e.webviewId = "undefined" != typeof e.webviewId ? e.webviewId : t, v = e.path;
        for (var n in e.query)e.query[n] = decodeURIComponent(e.query[n]);
        "navigateBack" != e.openType && "redirectTo" != e.openType || (0, h.clearOldWebviewCanvas)(), (0, h.notifyWebviewIdtoCanvas)(e.webviewId), y.forEach(function (t) {
            t(e)
        })
    })), (0, s.onMethod)("onAppRouteDone", i(function (e) {
        var t = arguments.length <= 1 || void 0 === arguments[1] ? 0 : arguments[1];
        e.path = e.path.substring(0, e.path.length - 5), e.webviewId = "undefined" != typeof e.webviewId ? e.webviewId : t, v = e.path, w.forEach(function (t) {
            t(e)
        }), (0, s.publish)("onAppRouteDone", {}, [t])
    })), (0, s.onMethod)("onKeyboardValueChange", i(function (e) {
        var t = arguments.length <= 1 || void 0 === arguments[1] ? 0 : arguments[1];
        if (e.data && "function" == typeof b) {
            var n = JSON.parse(e.data);
            if (n.bindinput) {
                var o;
                try {
                    o = b({
                        data: {
                            type: "input",
                            target: n.target,
                            currentTarget: n.target,
                            timeStamp: Date.now(),
                            touches: [],
                            detail: {value: e.value, cursor: e.cursor}
                        }, eventName: n.bindinput, webviewId: t
                    })
                } catch (e) {
                    throw new p.AppServiceSdkKnownError("bind key input error")
                }
                "undefined" != typeof o && ("string" == typeof o ? o != e.value && (0, s.invokeMethod)("setKeyboardValue", {
                    value: o,
                    cursor: -1
                }) : "object" == ("undefined" == typeof o ? "undefined" : c(o)) && (0, s.invokeMethod)("setKeyboardValue", {
                    value: o.value || "",
                    cursor: "undefined" == typeof o.cursor ? -1 : o.cursor,
                    inputId: e.inputId
                }))
            }
        }
    })), (0, s.onMethod)("onAccelerometerChange", i(function () {
        var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
        arguments.length <= 1 || void 0 === arguments[1] ? 0 : arguments[1];
        P.forEach(function (t) {
            "function" == typeof t && t(e)
        })
    })), (0, s.onMethod)("onCompassChange", i(function () {
        var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
        arguments.length <= 1 || void 0 === arguments[1] ? 0 : arguments[1];
        A.forEach(function (t) {
            "function" == typeof t && t(e)
        })
    }));
    for (var E in O)a(E);
    e.exports = m
}, function (e, t) {
    function n() {
        WeixinJSBridge.invoke.apply(WeixinJSBridge, arguments)
    }

    function o() {
        WeixinJSBridge.on.apply(WeixinJSBridge, arguments)
    }

    function r() {
        var e = Array.prototype.slice.call(arguments);
        e[1] = {data: e[1], options: {timestamp: Date.now()}}, WeixinJSBridge.publish.apply(WeixinJSBridge, e)
    }

    function i() {
        var e = Array.prototype.slice.call(arguments), t = e[1];
        e[1] = function (e, n) {
            var o = e.data, r = e.options, i = arguments.length <= 2 || void 0 === arguments[2] ? {} : arguments[2], a = r && r.timestamp || 0, u = Date.now();
            if ("function" == typeof t && t(o, n), u - a > 20) {
                var c = JSON.stringify(o || {}).length;
                Reporter.reportKeyValue({
                    key: "Speed",
                    value: "1," + a + "," + i.nativeTime + "," + i.nativeTime + "," + u + "," + c
                })
            }
        }, WeixinJSBridge.subscribe.apply(WeixinJSBridge, e)
    }

    function a(e) {
        var t = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1], o = arguments.length <= 2 || void 0 === arguments[2] ? {} : arguments[2], r = {};
        for (var i in t)"function" == typeof t[i] && (r[i] = t[i], delete t[i]);
        n(e, t, function (t) {
            t.errMsg = t.errMsg || e + ":ok";
            var n = 0 === t.errMsg.indexOf(e + ":ok"), i = 0 === t.errMsg.indexOf(e + ":cancel"), a = 0 === t.errMsg.indexOf(e + ":fail");
            "function" == typeof o.beforeAll && o.beforeAll(t), n ? ("function" == typeof o.beforeSuccess && o.beforeSuccess(t), "function" == typeof r.success && r.success(t), "function" == typeof o.afterSuccess && o.afterSuccess(t)) : i ? ("function" == typeof r.cancel && r.cancel(t), "function" == typeof o.cancel && o.cancel(t), Reporter.reportIDKey({key: e + "_cancel"})) : a && ("function" == typeof r.fail && r.fail(t), "function" == typeof o.fail && o.fail(t), Reporter.reportIDKey({key: e + "_fail"})), "function" == typeof r.complete && r.complete(t), "function" == typeof o.complete && o.complete(t)
        }), Reporter.reportIDKey({key: e})
    }

    function u(e, t) {
        o(e, t)
    }

    Object.defineProperty(t, "__esModule", {value: !0}), t.invoke = n, t.on = o, t.publish = r, t.subscribe = i, t.invokeMethod = a, t.onMethod = u
}, function (e, t) {
    function n(e, t) {
        if (!(e instanceof t))throw new TypeError("Cannot call a class as a function")
    }

    function o(e, t) {
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

    function i(e) {
        var t = Object.prototype.toString.call(e).split(" ")[1].split("]")[0];
        return e = "Array" == t || "Object" == t ? JSON.stringify(e) : "String" == t || "Number" == t || "Boolean" == t ? e.toString() : "Date" == t ? e.getTime().toString() : "Undefined" == t ? "undefined" : "Null" == t ? "null" : "", {
            data: e,
            dataType: t
        }
    }

    function a(e, t) {
        return e = "String" == t ? e : "Array" == t || "Object" == t ? JSON.parse(e) : "Number" == t ? parseFloat(e) : "Boolean" == t ? "true" == e : "Date" == t ? new Date(parseInt(e)) : "Undefined" == t ? void 0 : "Null" == t ? null : ""
    }

    function u(e) {
        return Object.prototype.toString.call(e).split(" ")[1].split("]")[0]
    }

    function c(e) {
        return "Object" === u(e)
    }

    function s(e, t) {
        var n = arguments.length <= 2 || void 0 === arguments[2] ? "data" : arguments[2], o = u(t), r = u(e);
        if (r != o)return n + " should be " + o + " instead of " + r + ";";
        switch (result = "", o) {
            case"String":
            case"Number":
            case"RegExp":
            case"Undefined":
            case"Boolean":
            case"Null":
            case"function":
                break;
            case"Object":
                for (var i in t)result += s(e[i], t[i], n + "." + i);
                break;
            case"Array":
                if (e.length < t.length)return n + " should have at least " + t.length + " item;";
                for (var a = 0; a < t.length; ++a)result += s(e[a], t[a], n + "[" + a + "]")
        }
        return result
    }

    function p(e, t) {
        var n = arguments.length <= 2 || void 0 === arguments[2] || arguments[2];
        if (n && (t = y(t)), 0 === t.indexOf("/"))return t.substr(1);
        if (0 === t.indexOf("./"))return p(e, t.substr(2), !1);
        var o, r, i = t.split("/");
        for (o = 0, r = i.length; o < r && ".." === i[o]; o++);
        i.splice(0, o);
        var t = i.join("/"), a = e.length > 0 ? e.split("/") : [];
        a.splice(a.length - o - 1, o + 1);
        var u = a.concat(i), c = u.join("/");
        return c
    }

    function f() {
        return window.navigator ? window.navigator.userAgent.indexOf("appservice") > -1 ? "devtools" : window.navigator.userAgent.toLowerCase().indexOf("android") > -1 ? "android" : "" : "ios"
    }

    function l(e) {
        if ("object" !== ("undefined" == typeof e ? "undefined" : w(e)))return e;
        var t = [];
        for (var n in e)e.hasOwnProperty(n) && t.push(n + "=" + e[n]);
        return t.join("&")
    }

    function d(e, t) {
        if ("string" == typeof e && "object" === ("undefined" == typeof t ? "undefined" : w(t)) && Object.keys(t).length > 0) {
            var n = e.split("?"), o = n[0], r = (n[1] || "").split("&").reduce(function (e, t) {
                if ("string" == typeof t && t.length > 0) {
                    var n = t.split("="), o = n[0], r = n[1];
                    e[o] = r
                }
                return e
            }, {});
            for (var i in t)t.hasOwnProperty(i) && ("object" === w(t[i]) && (t[i] = JSON.stringify(t[i])), t[i] = encodeURIComponent(t[i]));
            return o + "?" + l(g(r, t))
        }
        return e
    }

    function h(e) {
        return /^(http|https):\/\/.*/i.test(e)
    }

    function g() {
        for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)t[n] = arguments[n];
        return t.reduce(function (e, t) {
            for (var n in t)e[n] = t[n];
            return e
        }, {})
    }

    function v(e) {
        if ("string" == typeof e) {
            var t = e.split("?"), n = t[0], o = (t[1] || "").split("&").reduce(function (e, t) {
                if ("string" == typeof t && t.length > 0) {
                    var n = t.split("="), o = n[0], r = n[1];
                    e[o] = r
                }
                return e
            }, {}), r = [];
            for (var i in o)o.hasOwnProperty(i) && r.push(i + "=" + encodeURIComponent(o[i]));
            return r.length > 0 ? n + "?" + r.join("&") : e
        }
        return e
    }

    function y(e) {
        if ("string" != typeof e)throw new b("wx.redirectTo: invalid url:" + e);
        var t = e.split("?")[0], n = e.split("?")[1];
        return t += ".html", "undefined" != typeof n ? t + "?" + n : t
    }

    Object.defineProperty(t, "__esModule", {value: !0});
    var w = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e
    } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
    };
    t.anyTypeToString = i, t.stringToAnyType = a, t.getDataType = u, t.isObject = c, t.paramCheck = s, t.getRealRoute = p, t.getPlatform = f, t.urlEncodeFormData = l, t.addQueryStringToUrl = d, t.validateUrl = h, t.assign = g, t.encodeUrlQuery = v;
    var b = t.AppServiceSdkKnownError = function (e) {
        function t(e) {
            n(this, t);
            var r = o(this, Object.getPrototypeOf(t).call(this, "APP-SERVICE-SDK:" + e));
            return r.type = "AppServiceSdkKnownError", r
        }

        return r(t, e), t
    }(Error)
}, function (e, t) {
    function n(e) {
        if (Array.isArray(e)) {
            for (var t = 0, n = Array(e.length); t < e.length; t++)n[t] = e[t];
            return n
        }
        return Array.from(e)
    }

    function o(e, t) {
        if (!(e instanceof t))throw new TypeError("Cannot call a class as a function")
    }

    Object.defineProperty(t, "__esModule", {value: !0});
    var r = function () {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var o = t[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }
        }

        return function (t, n, o) {
            return n && e(t.prototype, n), o && e(t, o), t
        }
    }(), i = function () {
        function e() {
            var t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
            o(this, e), this.actions = [], this.currentTransform = [], this.currentStepAnimates = [], this.option = {
                transition: {
                    duration: "undefined" != typeof t.duration ? t.duration : 400,
                    timingFunction: "undefined" != typeof t.timingFunction ? t.timingFunction : "linear",
                    delay: "undefined" != typeof t.delay ? t.delay : 0
                }, transformOrigin: t.transformOrigin || "50% 50% 0"
            }
        }

        return r(e, [{
            key: "export", value: function () {
                var e = this.actions;
                return this.actions = [], {actions: e}
            }
        }, {
            key: "step", value: function () {
                var e = this, t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
                return this.currentStepAnimates.forEach(function (t) {
                    "style" !== t.type ? e.currentTransform[t.type] = t : e.currentTransform[t.type + "." + t.args[0]] = t
                }), this.actions.push({
                    animates: Object.keys(this.currentTransform).reduce(function (t, o) {
                        return [].concat(n(t), [e.currentTransform[o]])
                    }, []),
                    option: {
                        transformOrigin: "undefined" != typeof t.transformOrigin ? t.transformOrigin : this.option.transformOrigin,
                        transition: {
                            duration: "undefined" != typeof t.duration ? t.duration : this.option.transition.duration,
                            timingFunction: "undefined" != typeof t.timingFunction ? t.timingFunction : this.option.transition.timingFunction,
                            delay: "undefined" != typeof t.delay ? t.delay : this.option.transition.delay
                        }
                    }
                }), this.currentStepAnimates = [], this
            }
        }, {
            key: "matrix", value: function () {
                var e = arguments.length <= 0 || void 0 === arguments[0] ? 1 : arguments[0], t = arguments.length <= 1 || void 0 === arguments[1] ? 0 : arguments[1], n = arguments.length <= 2 || void 0 === arguments[2] ? 0 : arguments[2], o = arguments.length <= 3 || void 0 === arguments[3] ? 1 : arguments[3], r = arguments.length <= 4 || void 0 === arguments[4] ? 1 : arguments[4], i = arguments.length <= 5 || void 0 === arguments[5] ? 1 : arguments[5];
                return this.currentStepAnimates.push({type: "matrix", args: [e, t, n, o, r, i]}), this
            }
        }, {
            key: "matrix3d", value: function () {
                var e = arguments.length <= 0 || void 0 === arguments[0] ? 1 : arguments[0], t = arguments.length <= 1 || void 0 === arguments[1] ? 0 : arguments[1], n = arguments.length <= 2 || void 0 === arguments[2] ? 0 : arguments[2], o = arguments.length <= 3 || void 0 === arguments[3] ? 0 : arguments[3], r = arguments.length <= 4 || void 0 === arguments[4] ? 0 : arguments[4], i = arguments.length <= 5 || void 0 === arguments[5] ? 1 : arguments[5], a = arguments.length <= 6 || void 0 === arguments[6] ? 0 : arguments[6], u = arguments.length <= 7 || void 0 === arguments[7] ? 0 : arguments[7], c = arguments.length <= 8 || void 0 === arguments[8] ? 0 : arguments[8], s = arguments.length <= 9 || void 0 === arguments[9] ? 0 : arguments[9], p = arguments.length <= 10 || void 0 === arguments[10] ? 1 : arguments[10], f = arguments.length <= 11 || void 0 === arguments[11] ? 0 : arguments[11], l = arguments.length <= 12 || void 0 === arguments[12] ? 0 : arguments[12], d = arguments.length <= 13 || void 0 === arguments[13] ? 0 : arguments[13], h = arguments.length <= 14 || void 0 === arguments[14] ? 0 : arguments[14], g = arguments.length <= 15 || void 0 === arguments[15] ? 1 : arguments[15];
                return this.currentStepAnimates.push({
                    type: "matrix3d",
                    args: [e, t, n, o, r, i, a, u, c, s, p, f, l, d, h, g]
                }), this.stepping = !1, this
            }
        }, {
            key: "rotate", value: function () {
                var e = arguments.length <= 0 || void 0 === arguments[0] ? 0 : arguments[0];
                return this.currentStepAnimates.push({type: "rotate", args: [e]}), this
            }
        }, {
            key: "rotate3d", value: function () {
                var e = arguments.length <= 0 || void 0 === arguments[0] ? 0 : arguments[0], t = arguments.length <= 1 || void 0 === arguments[1] ? 0 : arguments[1], n = arguments.length <= 2 || void 0 === arguments[2] ? 0 : arguments[2], o = arguments.length <= 3 || void 0 === arguments[3] ? 0 : arguments[3];
                return this.currentStepAnimates.push({type: "rotate3d", args: [e, t, n, o]}), this.stepping = !1, this
            }
        }, {
            key: "rotateX", value: function () {
                var e = arguments.length <= 0 || void 0 === arguments[0] ? 0 : arguments[0];
                return this.currentStepAnimates.push({type: "rotateX", args: [e]}), this.stepping = !1, this
            }
        }, {
            key: "rotateY", value: function () {
                var e = arguments.length <= 0 || void 0 === arguments[0] ? 0 : arguments[0];
                return this.currentStepAnimates.push({type: "rotateY", args: [e]}), this.stepping = !1, this
            }
        }, {
            key: "rotateZ", value: function () {
                var e = arguments.length <= 0 || void 0 === arguments[0] ? 0 : arguments[0];
                return this.currentStepAnimates.push({type: "rotateZ", args: [e]}), this.stepping = !1, this
            }
        }, {
            key: "scale", value: function () {
                var e = arguments.length <= 0 || void 0 === arguments[0] ? 1 : arguments[0], t = arguments[1];
                return t = "undefined" != typeof t ? t : e, this.currentStepAnimates.push({
                    type: "scale",
                    args: [e, t]
                }), this
            }
        }, {
            key: "scale3d", value: function () {
                var e = arguments.length <= 0 || void 0 === arguments[0] ? 1 : arguments[0], t = arguments.length <= 1 || void 0 === arguments[1] ? 1 : arguments[1], n = arguments.length <= 2 || void 0 === arguments[2] ? 1 : arguments[2];
                return this.currentStepAnimates.push({type: "scale3d", args: [e, t, n]}), this
            }
        }, {
            key: "scaleX", value: function () {
                var e = arguments.length <= 0 || void 0 === arguments[0] ? 1 : arguments[0];
                return this.currentStepAnimates.push({type: "scaleX", args: [e]}), this
            }
        }, {
            key: "scaleY", value: function () {
                var e = arguments.length <= 0 || void 0 === arguments[0] ? 1 : arguments[0];
                return this.currentStepAnimates.push({type: "scaleY", args: [e]}), this
            }
        }, {
            key: "scaleZ", value: function () {
                var e = arguments.length <= 0 || void 0 === arguments[0] ? 1 : arguments[0];
                return this.currentStepAnimates.push({type: "scaleZ", args: [e]}), this
            }
        }, {
            key: "skew", value: function () {
                var e = arguments.length <= 0 || void 0 === arguments[0] ? 0 : arguments[0], t = arguments.length <= 1 || void 0 === arguments[1] ? 0 : arguments[1];
                return this.currentStepAnimates.push({type: "skew", args: [e, t]}), this
            }
        }, {
            key: "skewX", value: function () {
                var e = arguments.length <= 0 || void 0 === arguments[0] ? 0 : arguments[0];
                return this.currentStepAnimates.push({type: "skewX", args: [e]}), this
            }
        }, {
            key: "skewY", value: function () {
                var e = arguments.length <= 0 || void 0 === arguments[0] ? 0 : arguments[0];
                return this.currentStepAnimates.push({type: "skewY", args: [e]}), this
            }
        }, {
            key: "translate", value: function () {
                var e = arguments.length <= 0 || void 0 === arguments[0] ? 0 : arguments[0], t = arguments.length <= 1 || void 0 === arguments[1] ? 0 : arguments[1];
                return this.currentStepAnimates.push({type: "translate", args: [e, t]}), this
            }
        }, {
            key: "translate3d", value: function () {
                var e = arguments.length <= 0 || void 0 === arguments[0] ? 0 : arguments[0], t = arguments.length <= 1 || void 0 === arguments[1] ? 0 : arguments[1], n = arguments.length <= 2 || void 0 === arguments[2] ? 0 : arguments[2];
                return this.currentStepAnimates.push({type: "translate3d", args: [e, t, n]}), this
            }
        }, {
            key: "translateX", value: function () {
                var e = arguments.length <= 0 || void 0 === arguments[0] ? 0 : arguments[0];
                return this.currentStepAnimates.push({type: "translateX", args: [e]}), this
            }
        }, {
            key: "translateY", value: function () {
                var e = arguments.length <= 0 || void 0 === arguments[0] ? 0 : arguments[0];
                return this.currentStepAnimates.push({type: "translateY", args: [e]}), this
            }
        }, {
            key: "translateZ", value: function () {
                var e = arguments.length <= 0 || void 0 === arguments[0] ? 0 : arguments[0];
                return this.currentStepAnimates.push({type: "translateZ", args: [e]}), this
            }
        }, {
            key: "opacity", value: function (e) {
                return this.currentStepAnimates.push({type: "style", args: ["opacity", e]}), this
            }
        }, {
            key: "backgroundColor", value: function (e) {
                return this.currentStepAnimates.push({type: "style", args: ["backgroundColor", e]}), this
            }
        }, {
            key: "width", value: function (e) {
                return "number" == typeof e && (e += "px"), this.currentStepAnimates.push({
                    type: "style",
                    args: ["width", e]
                }), this
            }
        }, {
            key: "height", value: function (e) {
                return "number" == typeof e && (e += "px"), this.currentStepAnimates.push({
                    type: "style", args: ["height", e]
                }), this
            }
        }, {
            key: "left", value: function (e) {
                return "number" == typeof e && (e += "px"), this.currentStepAnimates.push({
                    type: "style",
                    args: ["left", e]
                }), this
            }
        }, {
            key: "right", value: function (e) {
                return "number" == typeof e && (e += "px"), this.currentStepAnimates.push({
                    type: "style",
                    args: ["right", e]
                }), this
            }
        }, {
            key: "top", value: function (e) {
                return "number" == typeof e && (e += "px"), this.currentStepAnimates.push({
                    type: "style",
                    args: ["top", e]
                }), this
            }
        }, {
            key: "bottom", value: function (e) {
                return "number" == typeof e && (e += "px"), this.currentStepAnimates.push({
                    type: "style",
                    args: ["bottom", e]
                }), this
            }
        }]), e
    }();
    t.default = i
}, function (e, t, n) {
    n(1);
    if ("undefined" != typeof Function) {
        var o = Function;
        Function.constructor = function () {
            return arguments[arguments.length - 1] = "console.warn('can not create Function')", o.apply(this, arguments)
        }, Function.prototype.constructor = function () {
            return arguments[arguments.length - 1] = "console.warn('can not create Function')", o.apply(this, arguments)
        }, Function = function () {
            return arguments[arguments.length - 1] = "console.warn('can not create Function')", o.apply(this, arguments)
        }
    }
    "undefined" != typeof eval && (eval = void 0), "undefined" == typeof window && (window = {Math: Math})
}, function (e, t, n) {
    var o = n(1), r = n(2);
    "undefined" != typeof __wxConfig && __wxConfig.debug && "devtools" !== (0, r.getPlatform)() && !function () {
        var e = [], t = ["log", "warn", "error", "info", "debug"];
        t.forEach(function (t) {
            var n = console[t];
            console[t] = function () {
                var r = Array.prototype.slice.call(arguments);
                e.push({method: t, log: r}), n.apply(console, arguments), (0, o.publish)(t, {log: r})
            }
        }), (0, o.subscribe)("DOMContentLoaded", function () {
            (0, o.publish)("initLogs", {logs: e})
        })
    }()
}, function (e, t, n) {
    function o(e) {
        h = e
    }

    function r(e) {
        var t = null;
        if (null != (t = /^#([0-9|A-F|a-f]{6})$/.exec(e))) {
            var n = parseInt(t[1].slice(0, 2), 16), o = parseInt(t[1].slice(2, 4), 16), r = parseInt(t[1].slice(4), 16);
            return [n, o, r, 255]
        }
        return null != (t = /^rgb\((.+)\)$/.exec(e)) ? t[1].split(",").map(function (e) {
            return parseInt(e.trim())
        }).concat(255) : null != (t = /^rgba\((.+)\)$/.exec(e)) ? t[1].split(",").map(function (e, t) {
            return 3 == t ? Math.floor(255 * parseFloat(e.trim())) : parseInt(e.trim())
        }) : void 0
    }

    function i(e, t) {
        this.type = e, this.data = t, this.colorStop = []
    }

    function a() {
        this.actions = [], this.path = []
    }

    function u(e) {
        if (Array.isArray(e)) {
            var t = [];
            return e.forEach(function (e) {
                t.push(u(e))
            }), t
        }
        if ("object" == ("undefined" == typeof e ? "undefined" : c(e))) {
            var t = {};
            for (var n in e)t[n] = u(e[n]);
            return t
        }
        return e
    }

    Object.defineProperty(t, "__esModule", {value: !0}), t.Context = t.notifyCurrentRoutetoContext = void 0;
    var c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e
    } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
    }, s = n(2), p = ["scale", "rotate", "translate", "save", "restore"], f = ["drawImage", "fillText", "fill", "stroke", "clearRect"], l = ["beginPath", "moveTo", "lineTo", "rect", "arc", "quadraticCurveTo", "bezierCurveTo", "closePath"], d = ["setFillStyle", "setStrokeStyle", "createLinearGradient", "createRadialGradient", "setShadow", "setFontSize", "setLineCap", "setLineJoin", "setLineWidth", "setMiterLimit"], h = "";
    i.prototype.addColorStop = function (e, t) {
        this.colorStop.push([e, r(t)])
    }, a.prototype.getActions = function () {
        var e = u(this.actions);
        return this.actions = [], this.path = [], e
    }, a.prototype.clearActions = function () {
        this.actions = [], this.path = []
    }, [].concat(p, f).forEach(function (e) {
        "fill" == e || "stroke" == e ? a.prototype[e] = function () {
            this.actions.push({method: e + "Path", data: u(this.path)})
        } : "fillText" == e ? a.prototype[e] = function (t, n, o) {
            this.actions.push({method: e, data: [t.toString(), n, o]})
        } : "drawImage" == e ? a.prototype[e] = function (t, n, o, r, i) {
            "devtools" == (0, s.getPlatform)() || /wxfile:\/\//.test(t) || (t = (0, s.getRealRoute)(h, t).replace(/.html$/, "")), this.actions.push({
                method: e,
                data: [t, n, o, r, i]
            })
        } : a.prototype[e] = function () {
            this.actions.push({method: e, data: [].slice.apply(arguments)})
        }
    }), l.forEach(function (e) {
        "beginPath" == e ? a.prototype[e] = function () {
            this.path = []
        } : "lineTo" == e ? a.prototype.lineTo = function () {
            0 == this.path.length ? this.path.push({
                method: "moveTo",
                data: [].slice.apply(arguments)
            }) : this.path.push({method: "lineTo", data: [].slice.apply(arguments)})
        } : a.prototype[e] = function () {
            this.path.push({method: e, data: [].slice.apply(arguments)})
        }
    }), d.forEach(function (e) {
        "createLinearGradient" == e ? a.prototype[e] = function () {
            return new i("linear", [].slice.apply(arguments, [0, 4]))
        } : "createRadialGradient" == e ? a.prototype[e] = function () {
            return new i("radial", [].slice.apply(arguments, [0, 3]))
        } : "setFillStyle" == e || "setStrokeStyle" == e ? a.prototype[e] = function () {
            var t = arguments[0];
            "string" == typeof t ? this.actions.push({
                method: e,
                data: ["normal", r(t)]
            }) : "object" == ("undefined" == typeof t ? "undefined" : c(t)) && t instanceof i && this.actions.push({
                method: e,
                data: [t.type, t.data, t.colorStop]
            })
        } : "setShadow" == e ? a.prototype[e] = function () {
            var t = [].slice.apply(arguments, [0, 4]);
            t[3] = r(t[3]), this.actions.push({method: e, data: t})
        } : a.prototype[e] = function () {
            this.actions.push({method: e, data: [].slice.apply(arguments, [0, 1])})
        }
    }), t.notifyCurrentRoutetoContext = o, t.Context = a
}, function (e, t, n) {
    function o(e, t) {
        return e + "canvas" + t
    }

    function r() {
        console.log(l);
        for (var e in l)if (0 == e.indexOf(f + "canvas")) {
            l[e];
            delete l[e]
        }
    }

    function i(e) {
        f = e
    }

    function a(e, t, n, o) {
        var r = (0, p.getPlatform)();
        "ios" == r || "android" == r ? WeixinJSBridge.invoke("drawCanvas", {canvasId: e, actions: t}, function (e) {
            e.errMsg && /ok/.test(e.errMsg) ? "function" == typeof n && n() : "function" == typeof o && o(e.errMsg)
        }) : WeixinJSBridge.publish("canvas" + e + "actionsChanged", t)
    }

    function u(e) {
        var t = e.canvasId, n = e.actions, r = e.success, i = e.fail;
        if (t && Array.isArray(n)) {
            var u = o(f, t);
            if ("number" == typeof l[u]) {
                var c = l[u];
                a(c, n, r, i)
            } else d[u] = d[u] || [], d[u] = d[u].concat({actions: n, success: r, fail: i})
        }
    }

    function c() {
        return new s.Context
    }

    Object.defineProperty(t, "__esModule", {value: !0}), t.createContext = t.drawCanvas = t.notifyWebviewIdtoCanvas = t.clearOldWebviewCanvas = void 0;
    var s = (n(1), n(6)), p = n(2), f = 0, l = {}, d = {};
    WeixinJSBridge.subscribe("canvasInsert", function (e, t) {
        var n = e.canvasId, r = e.canvasNumber, i = o(f, n);
        l[i] = l[i] || r, Array.isArray(d[i]) && (d[i].forEach(function (e) {
            a(r, e.actions, e.success, e.fail)
        }), delete d[i])
    }), WeixinJSBridge.subscribe("canvasRemove", function (e, t) {
        var n = e.canvasId, r = o(f, n);
        l[r] && delete l[r]
    }), t.clearOldWebviewCanvas = r, t.notifyWebviewIdtoCanvas = i, t.drawCanvas = u, t.createContext = c
}])
