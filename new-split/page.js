__appServiceEngine__ = function (e) {
    function t(o) {
        if (n[o])return n[o].exports;
        var r = n[o] = {exports: {}, id: o, loaded: !1};
        return e[o].call(r.exports, r, r.exports, t), r.loaded = !0, r.exports
    }

    var n = {};
    return t.m = e, t.c = n, t.p = "", t(0)
}([function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    var o = n(1);
    Object.defineProperty(t, "Page", {
        enumerable: !0, get: function () {
            return o.pageHolder
        }
    }), Object.defineProperty(t, "getCurrentPages", {
        enumerable: !0, get: function () {
            return o.getCurrentPages
        }
    });
    var r = n(14);
    Object.defineProperty(t, "App", {
        enumerable: !0, get: function () {
            return r.appHolder
        }
    }), Object.defineProperty(t, "getApp", {
        enumerable: !0, get: function () {
            return r.getApp
        }
    }), "function" == typeof logxx && logxx("app-service-engine start")
}, function (e, t, n) {
    "use strict";
    function o(e) {
        return e && e.__esModule ? e : {default: e}
    }

    Object.defineProperty(t, "__esModule", {value: !0}), t.getRouteToPage = t.getWebviewIdToPage = t.setWxRouteBegin = t.setWxRoute = t.setWxConfig = t.reset = t.pageHolder = t.getCurrentPages = t.getCurrentPage = void 0;
    var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, i = n(2), a = n(5), s = o(a), c = n(2), u = n(12), l = n(13), f = void 0, d = {}, p = {}, h = [], v = 0, g = ("ios" === (0, c.getPlatform)(), []);
    __wxConfig.tabBar && __wxConfig.tabBar.list && "object" === r(__wxConfig.tabBar.list) && "function" == typeof __wxConfig.tabBar.list.forEach && __wxConfig.tabBar.list.forEach(function (e) {
        g.push(e.pagePath)
    });
    var y = {appRouteTime: 0, newPageTime: 0, pageReadyTime: 0}, b = function (e, t, n) {
        Reporter.speedReport({key: e, timeMark: {startTime: t, endTime: n}})
    }, m = (t.getCurrentPage = function () {
        return f
    }, t.getCurrentPages = function () {
        var e = [];
        return h.forEach(function (t) {
            e.push(t.page)
        }), e
    }, t.pageHolder = function (e) {
        if (!__wxRouteBegin)throw(0, c.error)("Page 注册错误", "Please do not register multiple Pages in " + __wxRoute + ".js"), new i.AppServiceEngineKnownError("Please do not register multiple Pages in " + __wxRoute + ".js");
        __wxRouteBegin = !1;
        var t = __wxConfig.pages, n = t[v];
        if (v++, "Object" !== (0, c.getDataType)(e))throw(0, c.error)("Page 注册错误", "Options is not object: " + JSON.stringify(e) + " in " + __wxRoute + ".js"), new i.AppServiceEngineKnownError("Options is not object: " + JSON.stringify(e) + " in " + __wxRoute + ".js");
        (0, c.info)("Register Page: " + n), p[n] = e
    }, (0, c.surroundByTryCatch)(function (e, t) {
        if (!e.__webviewReady__) {
            (0, c.info)("Update view with init data"), (0, c.info)(e.data);
            var n = {};
            n.webviewId = t, n.enablePullUpRefresh = e.hasOwnProperty("onReachBottom");
            var o = {data: {data: e.data, ext: n, options: {firstRender: !0}}};
            (0, c.publish)("appDataChange", o, [t]), e.__webviewReady__ = !0, e.__waitingData__.forEach(function (t) {
                e.setData(t)
            }), e.__waitingData__ = [], (0, l.triggerAnalytics)("pageReady", e)
        }
    })), w = function (e, t, n) {
        var o = void 0;
        p.hasOwnProperty(e) ? o = p[e] : ((0, c.warn)("Page route 错误", "Page[" + e + "] not found. May be caused by: 1. Forgot to add page route in app.json. 2. Invoking Page() in async task."), o = {}), y.newPageTime = Date.now();
        var r = new s.default(o, t, e);
        m(r, t), (0, c.isDevTools)() && (__wxAppData[e] = r.data, __wxAppData[e].__webviewId__ = t, (0, c.publish)(u.UPDATE_APP_DATA)), f = {
            page: r,
            webviewId: t,
            route: e
        }, h.push(f), r.onLoad(n), r.onShow(), d[t] = {
            page: r,
            route: e
        }, (0, l.triggerAnalytics)("enterPage", r), b("appRoute2newPage", y.appRouteTime, y.newPageTime)
    }, _ = function (e) {
        e.page.onHide(), (0, l.triggerAnalytics)("leavePage", e.page)
    }, k = function (e) {
        e.page.onUnload(), (0, c.isDevTools)() && (delete __wxAppData[e.route], (0, c.publish)(u.UPDATE_APP_DATA)), delete d[e.webviewId], h = h.slice(0, h.length - 1), (0, l.triggerAnalytics)("leavePage", e.page)
    }, S = function (e) {
        return g.indexOf(e.route) !== -1 || g.indexOf(e.route + ".html") !== -1
    }, T = function (e, t, n, o) {
        if ((0, c.info)("On app route: " + e), y.appRouteTime = Date.now(), "navigateTo" === o) f && _(f), d.hasOwnProperty(t) ? (0, c.error)("Page route 错误(system error)", "navigateTo with an already exist webviewId " + t) : w(e, t, n); else if ("redirectTo" === o) f && k(f), d.hasOwnProperty(t) ? (0, c.error)("Page route 错误(system error)", "redirectTo with an already exist webviewId " + t) : w(e, t, n); else if ("navigateBack" === o) {
            for (var r = !1, i = h.length - 1; i >= 0; i--) {
                var a = h[i];
                if (a.webviewId === t) {
                    r = !0, f = a, a.page.onShow(), (0, l.triggerAnalytics)("enterPage", a);
                    break
                }
                k(a)
            }
            r || (0, c.error)("Page route 错误(system error)", "navigateBack with an unexist webviewId " + t)
        } else if ("switchTab" === o) {
            for (var s = !0; h.length > 1;)k(h[h.length - 1]), s = !1;
            if (h[0].webviewId === t) f = h[0]; else {
                if (S(h[0]) ? s && _(h[0]) : k(h[0]), d.hasOwnProperty(t)) {
                    var u = d[t].page;
                    f = {webviewId: t, route: e, page: u}, u.onShow(), (0, l.triggerAnalytics)("enterPage", u)
                } else w(e, t, n);
                h = [f]
            }
        } else"appLaunch" === o ? d.hasOwnProperty(t) ? (0, c.error)("Page route 错误(system error)", "apppLaunch with an already exist webviewId " + t) : w(e, t, n) : (0, c.error)("Page route 错误(system error)", "Illegal open type: " + o)
    }, A = function (e, t, n) {
        if (!d.hasOwnProperty(e))return void(0, c.warn)("事件警告", "OnWebviewEvent: " + t + ", WebviewId: " + e + " not found");
        var o = d[e], r = o.page;
        return t === u.DOM_READY_EVENT ? (y.pageReadyTime = Date.now(), (0, c.info)("Invoke event onReady in page: " + o.route), r.onReady(), void b("newPage2pageReady", y.newPageTime, y.pageReadyTime)) : ((0, c.info)("Invoke event " + t + " in page: " + o.route), r.hasOwnProperty(t) ? r[t](n) : void(0, c.warn)("事件警告", "Do not have " + t + " handler in current page: " + o.route + ". Please make sure that " + t + " handler has been defined in " + o.route + ", or " + o.route + " has been added into app.json"))
    }, P = function (e) {
        var t = d[e], n = t.page;
        n.hasOwnProperty("onPullDownRefresh") && ((0, c.info)("Invoke event onPullDownRefresh in page: " + t.route), n.onPullDownRefresh(), (0, l.triggerAnalytics)("pullDownRefresh", n))
    }, M = function (e, t) {
        var n = e, o = d[t], r = o.page, i = "onShareAppMessage";
        if (r.hasOwnProperty(i)) {
            (0, c.info)("Invoke event onShareAppMessage in page: " + o.route);
            var a = r[i]() || {};
            n.title = a.title || e.title, n.desc = a.desc || e.desc, n.path = a.path ? (0, c.addHtmlSuffixToUrl)(a.path) : e.path, n.success = a.success, n.cancel = a.cancel, n.fail = a.fail, n.complete = a.complete
        }
        return n
    };
    wx.onAppRoute((0, c.surroundByTryCatch)(function (e) {
        var t = e.path, n = e.webviewId, o = e.query || {}, r = e.openType;
        T(t, n, o, r)
    }), "onAppRoute"), wx.onWebviewEvent((0, c.surroundByTryCatch)(function (e) {
        var t = e.webviewId, n = e.eventName, o = e.data;
        return A(t, n, o)
    }, "onWebviewEvent")), WeixinJSBridge.on("onPullDownRefresh", (0, c.surroundByTryCatch)(function (e, t) {
        P(t)
    }, "onPullDownRefresh"));
    var x = function (e, t) {
        var n = M(e, t);
        WeixinJSBridge.invoke("shareAppMessage", n, function (e) {
            /^shareAppMessage:ok/.test(e.errMsg) && "function" == typeof n.success ? n.success(e) : /^shareAppMessage:cancel/.test(e.errMsg) && "function" == typeof n.cancel ? n.cancel(e) : /^shareAppMessage:fail/.test(e.errMsg) && "function" == typeof n.fail && n.cancel(e), "function" == typeof n.complete && n.complete(e)
        })
    };
    WeixinJSBridge.on("onShareAppMessage", (0, c.surroundByTryCatch)(x, "onShareAppMessage"));
    t.reset = function () {
        f = void 0, d = {}, p = {}, h = [], v = 0
    }, t.setWxConfig = function (e) {
        __wxConfig = e
    }, t.setWxRoute = function (e) {
        __wxRoute = e
    }, t.setWxRouteBegin = function (e) {
        __wxRouteBegin = e
    }, t.getWebviewIdToPage = function () {
        return d
    }, t.getRouteToPage = function () {
        return p
    }
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    var o = n(3);
    Object.keys(o).forEach(function (e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
            enumerable: !0, get: function () {
                return o[e]
            }
        })
    });
    var r = n(4);
    Object.keys(r).forEach(function (e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
            enumerable: !0, get: function () {
                return r[e]
            }
        })
    })
}, function (e, t) {
    "use strict";
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

    function i() {
        var e = "";
        return "undefined" != typeof window && window.navigator ? window.navigator.userAgent.indexOf("appservice") > -1 ? e = "devtools" : window.navigator.userAgent.toLowerCase().indexOf("android") > -1 && (e = "android") : e = "android" === __wxConfig.platform ? "android" : "devtools" === __wxConfig.platform ? "devtools" : "ios", e
    }

    Object.defineProperty(t, "__esModule", {value: !0});
    var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
    t.getPlatform = i;
    var s = (t.isEmptyObject = function (e) {
        for (var t in e)if (e.hasOwnProperty(t))return !1;
        return !0
    }, t.extend = function (e, t) {
        for (var n = Object.keys(t), o = n.length; o--;)e[n[o]] = t[n[o]];
        return e
    }), c = (t.noop = function () {
    }, t.getDataType = function (e) {
        return Object.prototype.toString.call(e).split(" ")[1].split("]")[0]
    }, t.isObject = function (e) {
        return null !== e && "object" === ("undefined" == typeof e ? "undefined" : a(e))
    }, Object.prototype.hasOwnProperty), u = (t.hasOwn = function (e, t) {
        return c.call(e, t)
    }, t.def = function (e, t, n, o) {
        Object.defineProperty(e, t, {value: n, enumerable: !!o, writable: !0, configurable: !0})
    }, Object.prototype.toString), l = "[object Object]", f = (t.isPlainObject = function (e) {
        return u.call(e) === l
    }, t.error = function (e, t) {
        console.group(new Date + " " + e), console.error(t), console.groupEnd()
    }, t.warn = function (e, t) {
        console.group(new Date + " " + e), console.warn(t), console.groupEnd()
    }, t.info = function (e) {
        __wxConfig && __wxConfig.debug && console.info(e)
    }, t.surroundByTryCatch = function (e, t) {
        return function () {
            try {
                return e.apply(e, arguments)
            } catch (e) {
                return f(e, t), function () {
                }
            }
        }
    }, t.errorReport = function (e, t) {
        if ("[object Error]" === Object.prototype.toString.apply(e)) {
            if ("AppServiceEngineKnownError" === e.type)throw e;
            Reporter.errorReport({key: "jsEnginScriptError", error: e, extend: t})
        }
    });
    t.AppServiceEngineKnownError = function (e) {
        function t(e) {
            n(this, t);
            var r = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, "APP-SERVICE-Engine:" + e));
            return r.type = "AppServiceEngineKnownError", r
        }

        return r(t, e), t
    }(Error), t.publish = function () {
        var e = Array.prototype.slice.call(arguments), t = {options: {timestamp: Date.now()}};
        e[1] ? e[1].options = s(e[1].options || {}, t.options) : e[1] = t, WeixinJSBridge.publish.apply(WeixinJSBridge, e)
    }
}, function (e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    t.isDevTools = function () {
        return !!("undefined" != typeof window && window.navigator && window.navigator.userAgent && window.navigator.userAgent.indexOf("appservice") > -1)
    }, t.addHtmlSuffixToUrl = function (e) {
        if ("string" != typeof e)return e;
        var t = e.split("?")[0], n = e.split("?")[1];
        return t += ".html", "undefined" != typeof n ? t + "?" + n : t
    }, t.removeHtmlSuffixFromUrl = function (e) {
        return "string" == typeof e && e.indexOf(".html") === e.length - 4 ? e.substring(0, e.length - 5) : e
    }
}, function (e, t, n) {
    "use strict";
    function o(e) {
        return e && e.__esModule ? e : {default: e}
    }

    function r(e, t) {
        if (!(e instanceof t))throw new TypeError("Cannot call a class as a function")
    }

    Object.defineProperty(t, "__esModule", {value: !0});
    var i = function () {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var o = t[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }
        }

        return function (t, n, o) {
            return n && e(t.prototype, n), o && e(t, o), t
        }
    }(), a = n(2), s = n(6), c = n(7), u = o(c), l = n(8), f = o(l), d = ["onLoad", "onReady", "onShow", "onRouteEnd", "onHide", "onUnload"], p = function (e) {
        for (var t = 0; t < d.length; ++t)if (d[t] === e)return !0;
        return "data" === e
    }, h = ["__wxWebviewId__", "__route__", "__webviewReady__", "__waitingData__"], v = function (e) {
        return h.indexOf(e) !== -1
    }, g = function () {
        function e() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n = this, o = arguments[1], i = arguments[2];
            r(this, e), this.__wxWebviewId__ = o, this.__route__ = i, this.__waitingData__ = [], this.__webviewReady__ = !1, t.data = t.data || {}, (0, a.isPlainObject)(t.data) || (0, a.error)("Page data error", "data must be an object, your data is " + JSON.stringify(t.data)), this.data = JSON.parse(JSON.stringify(t.data)), d.forEach(function (e) {
                n[e] = function () {
                    var n = (t[e] || a.noop).bind(this);
                    (0, a.info)(this.__route__ + ": " + e + " have been invoked");
                    try {
                        n.apply(this, arguments)
                    } catch (t) {
                        Reporter.thirdErrorReport({
                            error: t,
                            extend: "Page " + this.__route__ + " catch error in lifeCycleMethod " + e + " function"
                        })
                    }
                }.bind(n)
            });
            var s = function (e) {
                v(e) ? (0, a.warn)("关键字保护", "Page's " + e + " is write-protected") : p(e) || ("Function" === (0, a.getDataType)(t[e]) ? n[e] = function () {
                            var n;
                            try {
                                n = t[e].apply(this, arguments)
                            } catch (t) {
                                Reporter.thirdErrorReport({
                                    error: t,
                                    extend: "Page " + this.__route__ + " catch error in Page." + e + " function"
                                })
                            }
                            return n
                        }.bind(n) : n[e] = (0, f.default)(t[e]))
            };
            for (var c in t)s(c);
            "function" == typeof t.onShareAppMessage && WeixinJSBridge.invoke("showShareMenu", {}, a.info)
        }

        return i(e, [{
            key: "update", value: function () {
                (0, a.warn)("将被废弃", "Page.update is deprecated, setData updates the view implicitly. [It will be removed in 2016.11]")
            }
        }, {
            key: "forceUpdate", value: function () {
                (0, a.warn)("将被废弃", "Page.forceUpdate is deprecated, setData updates the view implicitly. [It will be removed in 2016.11]")
            }
        }, {
            key: "setData", value: function (e) {
                try {
                    var t = (0, a.getDataType)(e);
                    "Object" !== t && (0, a.error)("类型错误", "setData accepts an Object rather than some " + t);
                    for (var n in e) {
                        var o = (0, s.getObjectByPath)(this.data, n), r = o.obj, i = o.key;
                        r && (r[i] = (0, f.default)(e[n]))
                    }
                    this.__webviewReady__ ? u.default.emit(e, this.__wxWebviewId__) : this.__waitingData__.push(e)
                } catch (e) {
                    (0, a.errorReport)(e)
                }
            }
        }]), e
    }();
    t.default = g
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0}), t.getObjectByPath = t.parsePath = void 0;
    var o = n(2), r = t.parsePath = function (e) {
        for (var t = e.length, n = [], r = "", i = 0, a = !1, s = !1, c = 0; c < t; c++) {
            var u = e[c];
            if ("\\" === u) c + 1 < t && ("." === e[c + 1] || "[" === e[c + 1] || "]" === e[c + 1]) ? (r += e[c + 1], c++) : r += "\\"; else if ("." === u) r && (n.push(r), r = ""); else if ("[" === u) {
                if (r && (n.push(r), r = ""), 0 === n.length)throw(0, o.error)("数据路径错误", "Path can not start with []: " + e), new o.AppServiceEngineKnownError("Path can not start with []: " + e);
                s = !0, a = !1
            } else if ("]" === u) {
                if (!a)throw(0, o.error)("数据路径错误", "Must have number in []: " + e), new o.AppServiceEngineKnownError("Must have number in []: " + e);
                s = !1, n.push(i), i = 0
            } else if (s) {
                if (u < "0" || u > "9")throw(0, o.error)("数据路径错误", "Only number 0-9 could inside []: " + e), new o.AppServiceEngineKnownError("Only number 0-9 could inside []: " + e);
                a = !0, i = 10 * i + u.charCodeAt(0) - 48
            } else r += u
        }
        if (r && n.push(r), 0 === n.length)throw(0, o.error)("数据路径错误", "Path can not be empty"), new o.AppServiceEngineKnownError("Path can not be empty");
        return n
    };
    t.getObjectByPath = function (e, t) {
        for (var n = r(t), i = void 0, a = void 0, s = e, c = 0; c < n.length; c++)Number(n[c]) === n[c] && n[c] % 1 === 0 ? Array.isArray(s) || (i[a] = [], s = i[a]) : (0, o.isPlainObject)(s) || (i[a] = {}, s = i[a]), a = n[c], i = s, s = s[n[c]];
        return {obj: i, key: a}
    }
}, function (e, t, n) {
    "use strict";
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
    }(), i = n(2), a = 17, s = {}, c = 0, u = null, l = function () {
        for (var e in s)s[e] && f.emitSync(s[e], e);
        s = {}, u = null
    }, f = function () {
        function e() {
            o(this, e)
        }

        return r(e, null, [{
            key: "emitSync", value: function (e, t) {
                (0, i.publish)("appDataChange", {data: {data: e}}, [t]), c = Date.now()
            }
        }, {
            key: "emit", value: function (t, n) {
                if (Date.now() - c < a) {
                    s[n] || (s[n] = {});
                    for (var o in t)s[n][o] = t[o];
                    return void(u || (u = setTimeout(l, a)))
                }
                e.emitSync(t, n)
            }
        }]), e
    }();
    t.default = f
}, function (e, t, n) {
    "use strict";
    e.exports = n(9)
}, function (e, t, n) {
    "use strict";
    function o(e) {
    }

    function r(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : o;
        if (null === e)return null;
        var n = (0, s.copyValue)(e);
        if (null !== n)return n;
        var r = (0, s.copyCollection)(e, t), a = null !== r ? r : e, c = [e], u = [a];
        return i(e, t, a, c, u)
    }

    function i(e, t, n, o, r) {
        if (null === e)return null;
        var u = (0, s.copyValue)(e);
        if (null !== u)return u;
        var l = (0, c.getKeys)(e).concat((0, c.getSymbols)(e)), f = void 0, d = void 0, p = void 0, h = void 0, v = void 0, g = void 0, y = void 0, b = void 0;
        for (f = 0, d = l.length; f < d; ++f)p = l[f], h = e[p], v = (0, c.indexOf)(o, h), g = void 0, y = void 0, b = void 0, v === -1 ? (g = (0, s.copy)(h, t), y = null !== g ? g : h, null !== h && /^(?:function|object)$/.test("undefined" == typeof h ? "undefined" : a(h)) && (o.push(h), r.push(y))) : b = r[v], n[p] = b || i(h, t, y, o, r);
        return n
    }

    Object.defineProperty(t, "__esModule", {value: !0});
    var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, s = n(10), c = n(11);
    t.default = r
}, function (e, t) {
    "use strict";
    function n(e, t) {
        var n = r(e);
        return null !== n ? n : o(e, t)
    }

    function o(e, t) {
        if ("function" != typeof t)throw new TypeError("customizer is must be a Function");
        if ("function" == typeof e)return e;
        var n = a.call(e);
        if ("[object Array]" === n)return [];
        if ("[object Object]" === n && e.constructor === Object)return {};
        if ("[object Date]" === n)return new Date(e.getTime());
        if ("[object RegExp]" === n) {
            var o = String(e), r = o.lastIndexOf("/");
            return new RegExp(o.slice(1, r), o.slice(r + 1))
        }
        var i = t(e);
        return void 0 !== i ? i : null
    }

    function r(e) {
        var t = "undefined" == typeof e ? "undefined" : i(e);
        return null !== e && "object" !== t && "function" !== t ? e : null
    }

    Object.defineProperty(t, "__esModule", {value: !0});
    var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, a = Object.prototype.toString;
    t.copy = n, t.copyCollection = o, t.copyValue = r
}, function (e, t) {
    "use strict";
    function n(e, t) {
        if ("[object Array]" !== r.call(e))throw new TypeError("array must be an Array");
        var n = void 0, o = void 0, i = void 0;
        for (n = 0, o = e.length; n < o; ++n)if (i = e[n], i === t || i !== i && t !== t)return n;
        return -1
    }

    Object.defineProperty(t, "__esModule", {value: !0});
    var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, r = Object.prototype.toString, i = "function" == typeof Object.keys ? function (e) {
            return Object.keys(e)
        } : function (e) {
            var t = "undefined" == typeof e ? "undefined" : o(e);
            if (null === e || "function" !== t && "object" !== t)throw new TypeError("obj must be an Object");
            var n = [], r = void 0;
            for (r in e)Object.prototype.hasOwnProperty.call(e, r) && n.push(r);
            return n
        }, a = "function" == typeof Symbol ? function (e) {
            return Object.getOwnPropertySymbols(e)
        } : function () {
            return []
        };
    t.getKeys = i, t.getSymbols = a, t.indexOf = n
}, function (e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    t.DOM_READY_EVENT = "__DOMReady", t.UPDATE_APP_DATA = "__updateAppData"
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0}), t.triggerAnalytics = void 0;
    var o = n(1), r = n(6), i = n(2), a = {}, s = {}, c = function (e, t) {
        if ("start" !== e.action && "start_and_report" !== e.action || (s[e.eventID] = {
                eventID: e.eventID,
                data: {}
            }), s[e.eventID]) {
            var n = e.data || {};
            if (t && e.page === t.__route__)for (var o in n) {
                var i = n[o];
                if (i.indexOf("[]") > -1) {
                    if (!(e.index > -1))continue;
                    i = i.replace("[]", "[" + e.index + "]")
                }
                var a = (0, r.getObjectByPath)(t.data || {}, i);
                "undefined" != typeof a.obj && "undefined" != typeof a.key && a.obj[a.key] && (s[e.eventID].data[o] = a.obj[a.key])
            }
            "report" !== e.action && "start_and_report" !== e.action || !function () {
                var t = [];
                Object.keys(s[e.eventID].data).forEach(function (n) {
                    t.push({id: n, value: s[e.eventID].data[n]})
                }), s[e.eventID].data = t, console.log("reportRealtimeAction"), console.log(s[e.eventID]), WeixinJSBridge.invoke("reportRealtimeAction", {actionData: JSON.stringify(s[e.eventID])}), s[e.eventID] = null
            }()
        }
    }, u = !1, l = (t.triggerAnalytics = function (e, t) {
        "pageReady" === e && t && l(t), "launch" !== e || u || (u = !0);
        var n = a[e];
        n && n.forEach(function (n) {
            "enterPage" === e || "leavePage" === e || "pullDownRefresh" === e ? t && n.page === t.__route__ && c(n, t) : c(n)
        })
    }, function (e) {
        if (e && e.__webviewReady__) {
            var t = e.__route__, n = a.click, o = [];
            n && (n.forEach(function (e) {
                e.page === t && e.element && o.push({eventID: e.eventID, page: t, element: e.element, action: e.action})
            }), 0 !== o.length && WeixinJSBridge.publish("analyticsConfig", {data: o}, [e.__wxWebviewId__]))
        }
    });
    WeixinJSBridge.subscribe("analyticsReport", function (e, t) {
        var n = e.data, r = a.click, u = void 0, l = void 0;
        if (r && ("start" === n.action || "start_and_report" === n.action || s[n.eventID])) {
            for (var f = (0, o.getCurrentPages)(), d = 0; d < f.length; d++) {
                var p = f[d];
                if (p.__wxWebviewId__ === t) {
                    l = p;
                    break
                }
            }
            if (l) {
                for (var h = 0; h < r.length; h++) {
                    var v = r[h];
                    if (n.eventID === v.eventID && n.page === v.page && n.element === v.element) {
                        u = (0, i.extend)({}, v);
                        break
                    }
                }
                u && (u.index = n.index, c(u, l))
            }
        }
    })
}, function (e, t, n) {
    "use strict";
    function o(e, t) {
        if (!(e instanceof t))throw new TypeError("Cannot call a class as a function")
    }

    Object.defineProperty(t, "__esModule", {value: !0}), t.getApp = t.appHolder = void 0;
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
    }(), i = n(2), a = n(1), s = n(13), c = ["onLaunch", "onShow", "onHide", "onUnlaunch"], u = !0, l = function (e) {
        for (var t = 0; t < c.length; ++t)if (c[t] === e)return !0;
        return !1
    }, f = function (e) {
        return "getCurrentPage" === e
    }, d = function () {
        function e(t) {
            var n = this;
            o(this, e), c.forEach(function (e) {
                var o = function () {
                    var n = (t[e] || i.noop).bind(this);
                    (0, i.info)("App: " + e + " have been invoked");
                    try {
                        n.apply(this, arguments)
                    } catch (t) {
                        Reporter.thirdErrorReport({
                            error: t,
                            extend: "App catch error in lifeCycleMethod " + e + " function"
                        })
                    }
                };
                n[e] = o.bind(n)
            });
            var r = function (e) {
                f(e) ? (0, i.warn)("关键字保护", "App's " + e + " is write-protected") : l(e) || ("[object Function]" === Object.prototype.toString.call(t[e]) ? n[e] = function () {
                            var n;
                            try {
                                n = t[e].apply(this, arguments)
                            } catch (t) {
                                Reporter.thirdErrorReport({error: t, extend: "App catch error in  " + e + " function"})
                            }
                            return n
                        }.bind(n) : n[e] = t[e])
            };
            for (var d in t)r(d);
            this.onError && Reporter.registerErrorListener(this.onError), this.onLaunch(), (0, s.triggerAnalytics)("launch");
            var p = function () {
                var e = (0, a.getCurrentPages)();
                e.length && e[e.length - 1].onHide(), this.onHide(), (0, s.triggerAnalytics)("background")
            }, h = function () {
                if (this.onShow(), u) u = !1; else {
                    var e = (0, a.getCurrentPages)();
                    e.length && (e[e.length - 1].onShow(), (0, s.triggerAnalytics)("foreground"))
                }
            };
            wx.onAppEnterBackground(p.bind(this)), wx.onAppEnterForeground(h.bind(this))
        }

        return r(e, [{
            key: "getCurrentPage", value: function () {
                (0, i.warn)("将被废弃", "App.getCurrentPage is deprecated, please use getCurrentPages. [It will be removed in 2016.11]");
                var e = (0, a.getCurrentPage)();
                if (e)return e.page
            }
        }]), e
    }(), p = void 0;
    t.appHolder = (0, i.surroundByTryCatch)(function (e) {
        p = new d(e)
    }, "create app instance"), t.getApp = function () {
        return p
    }
}]), Page = __appServiceEngine__.Page, App = __appServiceEngine__.App, getApp = __appServiceEngine__.getApp;
