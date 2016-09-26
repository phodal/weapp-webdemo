!function (window) {
    if (!window.WeixinJSBridge) {
        var n = window.hasOwnProperty("document"), notAndroid = !1, r = {}, i = 0, a = {}, custom_event = "custom_event_", events = {};
        if (n) {
            var t = window.navigator.userAgent, s = t.indexOf("Android") != -1;
            notAndroid = !s
        }
        var invokeHandler = function (t, n, i) {
            if (notAndroid)window.webkit.messageHandlers.invokeHandler.postMessage({event: t, paramsString: n, callbackId: i}); else {
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
        }, publishHandler = function (t, n, r) {
            notAndroid ? window.webkit.messageHandlers.publishHandler.postMessage({
                event: t,
                paramsString: n,
                webviewIds: r
            }) : WeixinJSCore.publishHandler(t, n, r)
        }, invoke = function (e, t, n) {
            var o = JSON.stringify(t || {}), a = ++i;
            r[a] = n, invokeHandler(e, o, a)
        }, invokeCallbackHandler = function (e, t) {
            var n = r[e];
            "function" == typeof n && n(t), delete r[e]
        }, on = function (e, t) {
            a[e] = t
        }, publish = function (event, t, options) {
            options = options || [], options = JSON.stringify(options);
            var o = custom_event + event, r = JSON.stringify(t);
            publishHandler(o, r, options)
        }, subscribe = function (eventName, func) {
            events[custom_event + eventName] = func
        }, subscribeHandler = function (e, t, n, o) {
            var r;
            r = e.indexOf(custom_event) != -1 ? events[e] : a[e], "function" == typeof r && r(t, n, o)
        };
        window.WeixinJSBridge = {
            invoke: invoke,
            invokeCallbackHandler: invokeCallbackHandler,
            on: on,
            publish: publish,
            subscribe: subscribe,
            subscribeHandler: subscribeHandler}
    }
}(this);
