__appServiceEngine = function (e) {
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
    var o = n(2);
    Object.defineProperty(t, "Page", {
        enumerable: !0, get: function () {
            return o.pageHolder
        }
    });
    var r = n(3);
    Object.defineProperty(t, "App", {
        enumerable: !0, get: function () {
            return r.appHolder
        }
    }), Object.defineProperty(t, "getApp", {
        enumerable: !0, get: function () {
            return r.getApp
        }
    })
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    var o = n(9);
    Object.keys(o).forEach(function (e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
            enumerable: !0, get: function () {
                return o[e]
            }
        })
    });
    var r = n(8);
    Object.keys(r).forEach(function (e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
            enumerable: !0, get: function () {
                return r[e]
            }
        })
    })
}, function (e, appEngine, n) {
    "use strict";
    function o(e) {
        return e && e.__esModule ? e : {default: e}
    }

    Object.defineProperty(appEngine, "__esModule", {value: !0}), appEngine.getRouteToPage = appEngine.getWebviewIdToPage = appEngine.setWxRouteBegin = appEngine.setWxRoute = appEngine.setWxConfig = appEngine.reset = appEngine.pageHolder = appEngine.getCurrentPage = void 0;
    var r = n(1), i = n(6), a = o(i), u = n(1), c = n(4), currentPage = void 0, p = {}, f = {}, l = 0, d = {
            appRouteTime: 0,
            newPageTime: 0,
            pageReadyTime: 0
        },
        reportSpeed = function (e, t, n) {
            var o = c.SPEED_REPORT_TYPE[e];
            o && (Reporter.reportKeyValue({
                key: "Speed",
                value: o + "," + t + ",0,0," + n
            }), Reporter.log("JSEngine SpeedReport:" + e + ",startTime:" + t + ",endTime:" + n + ",cost:" + (n - t)))
        },
        g = (appEngine.getCurrentPage = function () {
            return currentPage
        }, appEngine.pageHolder = function (e) {
            if (!__wxRouteBegin)throw(0, u.error)("Page注册错误", "不要在 " + __wxRoute + ".js 注册多个Page"), new r.AppServiceEngineKnownError("Please do not register multiple Page in " + __wxRoute + ".js");
            __wxRouteBegin = !1;
            var t = __wxConfig.pages, n = t[l];
            if (n !== __wxRoute) {
                var o = t[l];
                throw(0, u.error)("Page注册错误", "没有在 " + o + ".js 找到Page"), new r.AppServiceEngineKnownError("Please register Page in " + o + ".js")
            }
            if (l++, "Object" !== (0, u.getDataType)(e))throw(0, u.error)("Page注册错误", __wxRoute + ".js中Page()的参数不是对象: " + JSON.stringify(e)), new r.AppServiceEngineKnownError("Options is not object: " + JSON.stringify(e) + " in " + __wxRoute + ".js");
            (0, u.info)("Register Page: " + n), f[n] = e
        }, function (e, t, n) {
            var o = void 0;
            f.hasOwnProperty(e) ? o = f[e] : ((0, u.warn)("Page[" + e + "] not found. May be caused by: 1. Forgot to add page route in app.json. 2. Invoking Page() in async task."), o = {}), d.newPageTime = Date.now();
            var r = new a.default(o, t, e);
            (0, u.isDevTools)() && (__wxAppData[e] = r.data, __wxAppData[e].__webviewId__ = t, (0, u.publish)(c.UPDATE_APP_DATA)), currentPage = {
                page: r,
                webviewId: t,
                route: e
            }, r.onLoad(n), r.onShow(), p[t] = {
                page: r,
                route: e
            }, reportSpeed("appRoute2newPage", d.appRouteTime, d.newPageTime)
        }),
        pageOnHide = function (e) {
            e.page.onHide()
        },
        pageUnload = function (e) {
            e.page.onUnload(), (0, u.isDevTools)() && (delete __wxAppData[e.route], (0, u.publish)(c.UPDATE_APP_DATA)), delete p[e.webviewId]
        },
        w = function (e, t, n, o) {
            if ((0, console.log)("On app route: " + e), d.appRouteTime = Date.now(), "navigateTo" === o)currentPage && pageOnHide(currentPage), p.hasOwnProperty(t) ? (0, u.error)("Page route错误", "navigateTo 一个已经存在的webviewId" + t) : g(e, t, n); else if ("redirectTo" === o)currentPage && pageUnload(currentPage), p.hasOwnProperty(t) ? (0, u.error)("Page route错误", "redirectTo 一个已经存在的webviewId" + t) : g(e, t, n); else if ("navigateBack" === o)if (currentPage && pageUnload(currentPage), p.hasOwnProperty(t)) {
                var r = p[t].page;
                currentPage = {webviewId: t, route: e, page: r}, r.onShow()
            } else(0, u.error)("Page route错误", "navigateBack 一个不存在的webviewId" + t); else if ("switchTab" === o)if (currentPage && pageOnHide(currentPage), p.hasOwnProperty(t)) {
                var i = p[t].page;
                currentPage = {webviewId: t, route: e, page: i}, i.onShow()
            } else g(e, t, n); else"appLaunch" === o ? p.hasOwnProperty(t) ? (0, u.error)("Page route错误", "apppLaunch 一个已经存在的webviewId" + t) : g(e, t, n) : (0, u.error)("Page route错误", "非法Open type: " + o)
        },
        b = function (e, t, n, o) {
            if (currentPage)currentPage.page.onRouteEnd(); else if ((0, u.warn)("page isn't ready yet"), p.hasOwnProperty(t)) {
                var r = p[t].page;
                currentPage = {webviewId: t, route: e, page: r}, r.onRouteEnd()
            } else g(e, t, n)
        },
        m = function (e, t, n) {
            if (!p.hasOwnProperty(e))throw new r.AppServiceEngineKnownError("OnWebviewEvent: " + t + ", WebviewId: " + e + " not found");
            var o = p[e], i = o.page;
            if (t === c.DOM_READY_EVENT)return d.pageReadyTime = Date.now(), i.onReady(), void reportSpeed("newPage2pageReady", d.newPageTime, d.pageReadyTime);
            if ((0, u.info)("Invoke event " + t + " in page: " + o.route), !i.hasOwnProperty(t))throw new r.AppServiceEngineKnownError("Do not have " + t + " handler in current page: " + o.route + ". Please make sure that " + t + " handler has been defined in " + o.route + ", or " + o.route + " has been added into app.json");
            var a;
            try {
                a = i[t](n)
            } catch (e) {
                console.error(e.stack), Reporter.errorReport({key: "thirdScriptError", error: e})
            }
            return a
        },
        S = function (e) {
            var t = p[e], n = t.page;
            n.hasOwnProperty("onPullDownRefresh") && ((0, u.info)("Invoke event onPullDownRefresh in page: " + t.route), n.onPullDownRefresh())
        },
        k = function (e, t) {
            var n = e, o = p[t], r = o.page;
            if (r.hasOwnProperty("onMenuShareAppMessage")) {
                (0, u.info)("Invoke event onMenuShareAppMessage in page: " + o.route);
                var i = r.onMenuShareAppMessage() || {};
                n.title = i.title || e.title, n.desc = i.desc || e.desc, n.imgUrl = i.imgUrl || e.imgUrl, n.path = i.path ? (0, u.addHtmlSuffixToUrl)(i.path) : e.path, n.shareAppCard = "undefined" != typeof i.shareAppCard && i.shareAppCard
            }
            return n
        }, _ = function (e, t) {
            var n = e, o = p[t], r = o.page;
            if (r.hasOwnProperty("onMenuShareTimeline")) {
                (0, u.info)("Invoke event onMenuShareTimeline in page: " + o.route);
                var i = r.onMenuShareTimeline() || {};
                n.title = i.title || e.title, n.imgUrl = i.imgUrl || e.imgUrl, n.path = i.path ? (0, u.addHtmlSuffixToUrl)(i.path) : e.path
            }
            return n
        };
    wx.onAppRoute((0, u.surroundByTryCatch)(function (e) {
        var t = e.path, n = e.webviewId, o = e.query || {}, r = e.openType;
        w(t, n, o, r)
    })),
        wx.onAppRouteDone((0, u.surroundByTryCatch)(function (e) {
            var t = e.path, n = e.webviewId, o = e.query || {}, r = e.openType;
            b(t, n, o, r)
        })),
        wx.onWebviewEvent((0, u.surroundByTryCatch)(function (e) {
            var t = e.webviewId, n = e.eventName, o = e.data;
            return m(t, n, o)
        })),
        WeixinJSBridge.on("onPullDownRefresh", (0, u.surroundByTryCatch)(function (e, t) {
            S(t)
        })),
        WeixinJSBridge.on("onMenuShareAppMessage", (0, u.surroundByTryCatch)(function (e, t) {
            var n = k(e, t);
            WeixinJSBridge.invoke("shareAppMessage", n, function () {
            })
        })),
        WeixinJSBridge.on("onMenuShareTimeline", (0, u.surroundByTryCatch)(function (e, t) {
            var n = _(e, t);
            WeixinJSBridge.invoke("shareTimeline", n, function () {
            })
        })),
        WeixinJSBridge.subscribe("pageReady", function (e, t) {
            console.log("23333333");
            if (!p.hasOwnProperty(t))throw new r.AppServiceEngineKnownError("App service not ready, webviewId: " + t);
            var n = p[t].page, o = {};
            (0, u.info)("Update view with init data"), (0, u.info)(n.data), o.webviewId = t, __wxConfig && __wxConfig.downloadDomain && (o.downloadDomain = __wxConfig.downloadDomain), (0, u.publish)("pageInitData", {
                data: {
                    data: n.data || {},
                    ext: o,
                    options: {firstRender: !0}
                }
            }, [t]), n.__webviewReady__ = !0, (0, u.isEmptyObject)(n.__waitingData__) || ((0, u.info)("Update view with waiting data"), (0, u.info)(n.__waitingData__), (0, u.publish)("appDataChange", {data: {data: n.__waitingData__}}, [t]), n.__waitingData__ = {})
        }),

        appEngine.reset = function () {
            currentPage = void 0, p = {}, f = {}, l = 0
        },
        appEngine.setWxConfig = function (config) {
            __wxConfig = config
        },
        appEngine.setWxRoute = function (wxRoute) {
            __wxRoute = wxRoute
        },
        appEngine.setWxRouteBegin = function (routeBegin) {
            __wxRouteBegin = routeBegin
        },
        appEngine.getWebviewIdToPage = function () {
            return p
        },
        appEngine.getRouteToPage = function () {
            return f
        }
}, function (e, t, appEngine) {
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
    }(), i = appEngine(1), Page = appEngine(2), pages = ["onLaunch", "onShow", "onHide", "onUnlaunch"], c = function (e) {
        for (var t = 0; t < pages.length; ++t)if (pages[t] === e)return !0;
        return !1
    }, isCurrentPage = function (e) {
        return "getCurrentPage" === e
    }, app = function () {
        function e(t) {
            var n = this;
            o(this, e), pages.forEach(function (page) {
                var o = function () {
                    var n = (t[page] || i.noop).bind(this);
                    (0, console.log)("App: " + page + " have been invoked");
                    try {
                        n.apply(this, arguments)
                    } catch (e) {
                        console.error(e.stack), Reporter.errorReport({key: "thirdScriptError", error: e})
                    }
                };
                n[page] = o.bind(n)
            });
            for (var r in t)isCurrentPage(r) ? (0, i.warn)("App's " + r + " is write-protected") : c(r) || ("[object Function]" === Object.prototype.toString.call(t[r]) ? this[r] = t[r].bind(this) : this[r] = t[r]);
            this.onLaunch();
            var hidePage = function () {
                var page = this.getCurrentPage();
                page && page.onHide(), this.onHide()
            }, showPage = function () {
                this.onShow();
                var page = this.getCurrentPage();
                page && page.onShow()
            };
            WeixinJSBridge.on("onAppEnterBackground", hidePage.bind(this)), WeixinJSBridge.on("onAppEnterForeground", showPage.bind(this))
        }

        return r(e, [{
            key: "getCurrentPage", value: function () {
                var e = (0, Page.getCurrentPage)();
                if (e)return e.page
            }
        }]), e
    }(), f = void 0;
    t.appHolder = (0, i.surroundByTryCatch)(function (e) {
        f = new app(e)
    }), t.getApp = function () {
        return f
    }
}, function (e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0}), t.DOM_READY_EVENT = "__DOMReady", t.SPEED_REPORT_TYPE = {
        appRoute2newPage: 8,
        newPage2pageReady: 9
    }, t.UPDATE_APP_DATA = "__updateAppData"
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
    }(), i = n(1), a = function () {
        function e() {
            o(this, e)
        }

        return r(e, null, [{
            key: "emit", value: function (e, t) {
                (0, console.log)("Update view with"), (0, console.log)(e), (0, i.publish)("appDataChange", {data: {data: e}}, [t])
            }
        }]), e
    }();
    t.default = a
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
    }(), a = n(1), u = n(7), c = n(5), s = o(c), p = ["onLoad", "onReady", "onShow", "onRouteEnd", "onHide", "onUnload"], f = function (e) {
        for (var t = 0; t < p.length; ++t)if (p[t] === e)return !0;
        return "data" === e
    }, l = ["__wxWebviewId__", "__route__", "__webviewReady__", "__waitingData__"], d = function (e) {
        return l.indexOf(e) !== -1
    }, h = function () {
        function e() {
            var t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0], n = this, o = arguments[1], i = arguments[2];
            r(this, e), this.__wxWebviewId__ = o, this.__route__ = i, this.__webviewReady__ = !1, this.__waitingData__ = {}, this.data = JSON.parse(JSON.stringify(t.data || {})), p.forEach(function (e) {
                var o = function () {
                    var n = (t[e] || a.noop).bind(this);
                    (0, a.info)(this.__route__ + ": " + e + " have been invoked");
                    try {
                        n.apply(this, arguments)
                    } catch (e) {
                        console.error(e.stack), Reporter.errorReport({key: "thirdScriptError", error: e})
                    }
                };
                n[e] = o.bind(n)
            });
            for (var u in t)d(u) ? (0, a.warn)("Page's " + u + " is write-protected") : f(u) || ("[object Function]" === Object.prototype.toString.call(t[u]) ? this[u] = t[u].bind(this) : this[u] = t[u])
        }

        return i(e, [{
            key: "update", value: function () {
                (0, a.warn)("Page.update is deprecated, setData updates the view implicitly")
            }
        }, {
            key: "forceUpdate", value: function () {
                (0, a.warn)("Page.forceUpdate is deprecated, setData updates the view implicitly")
            }
        }, {
            key: "setData", value: function (e) {
                try {
                    var t = (0, a.getDataType)(e);
                    "Object" !== t && (0, a.warn)("setData accepts an Object rather than some " + t);
                    for (var n in e) {
                        var o = (0, u.getObjectByPath)(this.data, n), r = o.obj, i = o.key;
                        r && (r[i] = (0, a.deepCopy)(e[n]))
                    }
                    this.__webviewReady__ ? s.default.emit(e, this.__wxWebviewId__) : (0, a.extend)(this.__waitingData__, e)
                } catch (e) {
                    (0, a.errorReport)(e)
                }
            }
        }, {
            key: "toggleData", value: function (e) {
                try {
                    var t = (0, a.getDataType)(e), n = {}, o = e;
                    if ("String" === t)o = [o]; else if ("Array" !== t)throw new a.AppServiceEngineKnownError("The parameter of Page.toggleData must be Array or String, but found " + t);
                    for (var r in o) {
                        var i = o[r], c = (0, u.getObjectByPath)(this.data, i), p = c.obj, f = c.key;
                        p && (p[f] = !p[f], n[i] = p[f])
                    }
                    this.__webviewReady__ ? s.default.emit(n, this.__wxWebviewId__) : (0, a.extend)(this.__waitingData__, n)
                } catch (e) {
                    (0, a.errorReport)(e)
                }
            }
        }]), e
    }();
    t.default = h
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0}), t.getObjectByPath = t.parsePath = void 0;
    var o = n(1), r = t.parsePath = function (e) {
        for (var t = e.length, n = [], r = "", i = 0, a = !1, u = !1, c = 0; c < t; c++) {
            var s = e[c];
            if ("\\" === s)c + 1 < t && ("." === e[c + 1] || "[" === e[c + 1] || "]" === e[c + 1]) ? (r += e[c + 1], c++) : r += "\\"; else if ("." === s)r && (n.push(r), r = ""); else if ("[" === s) {
                if (r && (n.push(r), r = ""), 0 === n.length)throw new o.AppServiceEngineKnownError("path can not start with []: " + e);
                u = !0, a = !1
            } else if ("]" === s) {
                if (!a)throw new o.AppServiceEngineKnownError("must have number in []: " + e);
                u = !1, n.push(i), i = 0
            } else if (u) {
                if (s < "0" || s > "9")throw new o.AppServiceEngineKnownError("only number 0-9 could inside []: " + e);
                a = !0, i = 10 * i + s.charCodeAt(0) - 48
            } else r += s
        }
        if (r && n.push(r), 0 === n.length)throw new o.AppServiceEngineKnownError("path can not be empty");
        return n
    };
    t.getObjectByPath = function (e, t) {
        for (var n = r(t), i = void 0, a = void 0, u = e, c = 0; c < n.length; c++)Number(n[c]) === n[c] && n[c] % 1 === 0 ? Array.isArray(u) || (i[a] = [], u = i[a]) : (0, o.isPlainObject)(u) || (i[a] = {}, u = i[a]), a = n[c], i = u, u = u[n[c]];
        return {obj: i, key: a}
    }
}, function (e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0}), t.isDevTools = function () {
        return !!("undefined" != typeof window && window.navigator && window.navigator.userAgent && window.navigator.userAgent.indexOf("appservice") > -1)
    }, t.addHtmlSuffixToUrl = function (e) {
        if ("string" != typeof e)return e;
        var t = e.split("?")[0], n = e.split("?")[1];
        return t += ".html", "undefined" != typeof n ? t + "?" + n : t
    }, t.removeHtmlSuffixFromUrl = function (e) {
        return "string" == typeof e && e.indexOf(".html") === e.length - 4 ? e.substring(0, e.length - 5) : e
    }
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

    Object.defineProperty(t, "__esModule", {value: !0});
    var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e
    } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
    }, a = (t.isEmptyObject = function (e) {
        for (var t in e)if (e.hasOwnProperty(t))return !1;
        return !0
    }, t.extend = function (e, t) {
        for (var n = Object.keys(t), o = n.length; o--;)e[n[o]] = t[n[o]];
        return e
    }), u = (t.noop = function () {
    }, t.getDataType = function (e) {
        return Object.prototype.toString.call(e).split(" ")[1].split("]")[0]
    }, t.isObject = function (e) {
        return null !== e && "object" === ("undefined" == typeof e ? "undefined" : i(e))
    }, Object.prototype.hasOwnProperty), c = (t.hasOwn = function (e, t) {
        return u.call(e, t)
    }, t.def = function (e, t, n, o) {
        Object.defineProperty(e, t, {value: n, enumerable: !!o, writable: !0, configurable: !0})
    }, Object.prototype.toString), s = "[object Object]", p = (t.isPlainObject = function (e) {
        return c.call(e) === s
    }, t.error = function (e, t) {
        console.group("%c" + e, "color: red; font-size: x-large"), console.error("%c" + t, "color: red; font-size: x-large"), console.groupEnd()
    }, t.warn = function (e) {
        __wxConfig && __wxConfig.debug && console.warn(e)
    }, t.info = function (e) {
        __wxConfig && __wxConfig.debug && console.info(e)
    }, t.surroundByTryCatch = function (e) {
        return function () {
            try {
                return e.apply(e, arguments)
            } catch (e) {
                return p(e), function () {
                }
            }
        }
    }, t.errorReport = function (e) {
        if ("[object Error]" === Object.prototype.toString.apply(e)) {
            if ("AppServiceEngineKnownError" === e.type)throw e;
            console.error(e.stack), Reporter.errorReport({key: "jsEnginScriptError", error: e})
        }
    });
    t.deepCopy = function (e) {
        return JSON.parse(JSON.stringify(e))
    }, t.AppServiceEngineKnownError = function (e) {
        function t(e) {
            n(this, t);
            var r = o(this, Object.getPrototypeOf(t).call(this, "APP-SERVICE-Engine:" + e));
            return r.type = "AppServiceEngineKnownError", r
        }

        return r(t, e), t
    }(Error), t.publish = function () {
        var e = Array.prototype.slice.call(arguments), t = {options: {timestamp: Date.now()}};
        e[1] ? e[1].options = a(e[1].options || {}, t.options) : e[1] = t, WeixinJSBridge.publish.apply(WeixinJSBridge, e)
    }
}]), Page = __appServiceEngine.Page, App = __appServiceEngine.App, getApp = __appServiceEngine.getApp;
