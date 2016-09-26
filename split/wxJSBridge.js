!function (e) {
    if (!e.WeixinJSBridge) {
        if (e.navigator && e.navigator.userAgent) {
            var t = e.navigator.userAgent;
            if (t.indexOf("appservice") > -1 || t.indexOf("wechatdevtools") > -1)return
        }
        var n = e.hasOwnProperty("document"), o = !1, r = {}, i = 0, a = {}, u = "custom_event_", c = {};
        if (n) {
            var t = e.navigator.userAgent, s = t.indexOf("Android") != -1;
            o = !s
        }
        var p = function (t, n, i) {
            if (o)e.webkit.messageHandlers.invokeHandler.postMessage({event: t, paramsString: n, callbackId: i}); else {
                var a = WeixinJSCore.invokeHandler(t, n, i);
                if ("undefined" != typeof a && "function" == typeof r[i]) {
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
        }, l = function (e, t, n) {
            var o = JSON.stringify(t || {}), a = ++i;
            r[a] = n, p(e, o, a)
        }, d = function (e, t) {
            var n = r[e];
            "function" == typeof n && n(t), delete r[e]
        }, h = function (e, t) {
            a[e] = t
        }, g = function (e, t, n) {
            n = n || [], n = JSON.stringify(n);
            var o = u + e, r = JSON.stringify(t);
            f(o, r, n)
        }, v = function (e, t) {
            c[u + e] = t
        }, y = function (e, t, n, o) {
            var r;
            r = e.indexOf(u) != -1 ? c[e] : a[e], "function" == typeof r && r(t, n, o)
        };
        e.WeixinJSBridge = {invoke: l, invokeCallbackHandler: d, on: h, publish: g, subscribe: v, subscribeHandler: y}
    }
}(this);
