!function (e) {
    if ("function" == typeof logxx && logxx("jsbridge start"), !e.WeixinJSBridge) {
        if (e.navigator && e.navigator.userAgent) {
            var t = e.navigator.userAgent;
            if (t.indexOf("appservice") > -1 || t.indexOf("wechatdevtools") > -1)return
        }
        var n = e.hasOwnProperty("document"), o = !1, r = {}, i = 0, a = {}, s = "custom_event_", c = {};
        if (n) {
            var t = e.navigator.userAgent, u = t.indexOf("Android") != -1;
            o = !u
        }
        var l = function (t, n, i) {
            if (o) e.webkit.messageHandlers.invokeHandler.postMessage({
                event: t,
                paramsString: n,
                callbackId: i
            }); else {
                var a = WeixinJSCore.invokeHandler(t, n, i);
                if ("undefined" != typeof a && "function" == typeof r[i] && "" !== a) {
                    try {
                        a = JSON.parse(a)
                    } catch (e) {
                        a = {}
                    }
                    r[i](a), delete r[i]
                }
            }
        }, f = function (t, n, r) {
            o ? e.webkit.messageHandlers.publishHandler.postMessage({
                    event: t,
                    paramsString: n,
                    webviewIds: r
                }) : WeixinJSCore.publishHandler(t, n, r)
        }, d = function (e, t, n) {
            var o = JSON.stringify(t || {}), a = ++i;
            r[a] = n, l(e, o, a)
        }, p = function (e, t) {
            var n = r[e];
            "function" == typeof n && n(t), delete r[e]
        }, h = function (e, t) {
            a[e] = t
        }, v = function (e, t, n) {
            n = n || [], n = JSON.stringify(n);
            var o = s + e, r = JSON.stringify(t);
            f(o, r, n)
        }, g = function (e, t) {
            c[s + e] = t
        }, y = function (e, t, n, o) {
            var r;
            r = e.indexOf(s) != -1 ? c[e] : a[e], "function" == typeof r && r(t, n, o)
        };
        e.WeixinJSBridge = {invoke: d, invokeCallbackHandler: p, on: h, publish: v, subscribe: g, subscribeHandler: y}
    }
}(this)
