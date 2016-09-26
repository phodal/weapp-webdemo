var Reporter = function(e) {
    function t(i) {
        if (n[i])return n[i].exports;
        var r = n[i] = {exports: {}, id: i, loaded: !1};
        return e[i].call(r.exports, r, r.exports, t), r.loaded = !0, r.exports
    }

    var n = {};
    return t.m = e, t.c = n, t.p = "", t(0)
}([function(e, t, n) {
    "use strict";
    function i(e) {
        "undefined" != typeof WeixinJSBridge ? e() : document.addEventListener("WeixinJSBridgeReady", e, !1)
    }

    function r() {
        var e = arguments;
        i(function() {
            WeixinJSBridge.invoke.apply(WeixinJSBridge, e)
        })
    }

    function o() {
        !A || A.length <= 0 || (r("reportKeyValue", {dataArray: A}), A = [])
    }

    function a() {
        !g || g.length <= 0 || (r("reportIDKey", {dataArray: g}), g = [])
    }

    function s() {
        !f || f.length <= 0 || (r("systemLog", {dataArray: f}), f = [])
    }

    function c(e) {
        return function() {
            try {
                return e.apply(e, arguments)
            } catch (e) {
                throw errorReport(e), e
            }
        }
    }

    function c(e) {
        return function() {
            try {
                return e.apply(e, arguments)
            } catch (e) {
                console.error("reporter error:" + e.stack)
            }
        }
    }

    function l(e) {
        I.__defineGetter__(e, function() {
            return c(E[e])
        })
    }

    var d = n(1), u = 1, h = 20, p = 50, A = [], g = [], f = [], v = "", b = 50, w = 50, m = 20, x = 50, y = 0, _ = 0, k = 0, C = 0;
    r("getPublicLibVersion", {}, function(e) {
        try {
            v = e.version.appVersion + " " + e.version.libVersion
        } catch (e) {
        }
    });
    var E = {
        reportKeyValue: function(e) {
            var t = e.key, n = e.value;
            d.KeyValueType[t] && (Date.now() - y < w || (y = Date.now(), A.push({
                key: d.KeyValueType[t],
                value: n
            }), A.length >= h && o()))
        }, reportIDKey: function(e) {
            var t = e.id, n = e.key;
            d.IDKeyType[n] && (Date.now() - _ < m || (_ = Date.now(), g.push({
                id: t ? t : "356",
                key: d.IDKeyType[n],
                value: 1
            }), g.length >= u && a()))
        }, errorReport: function(e) {
            var t = e.key, n = e.error;
            d.ErrorType[t] && (E.reportIDKey({key: t}), E.reportKeyValue({
                key: "Error",
                value: d.ErrorType[t] + "," + n.name + "," + encodeURIComponent(n.message) + "," + encodeURIComponent(n.stack) + "," + encodeURIComponent(v)
            }), a(), o(), s())
        }, log: function(e) {
            e && "string" == typeof e && (Date.now() - k < x || (k = Date.now(), f.push(e + ""), f.length >= p && s()))
        }, submit: function() {
            Date.now() - C < b || (C = Date.now(), a(), o(), s())
        }
    }, I = {};
    for (var T in E)l(T);
    "undefined" != typeof window && (window.onbeforeunload = function() {
        E.submit()
    }), e.exports = I
}, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0});
    t.IDKeyType = {
        login: 1,
        login_cancel: 2,
        login_fail: 3,
        request_fail: 4,
        connectSocket_fail: 5,
        closeSocket_fail: 6,
        sendSocketMessage_fail: 7,
        uploadFile_fail: 8,
        downloadFile_fail: 9,
        redirectTo_fail: 10,
        navigateTo_fail: 11,
        navigateBack_fail: 12,
        appServiceSDKScriptError: 13,
        webviewSDKScriptError: 14,
        jsEnginScriptError: 15,
        thirdScriptError: 16,
        webviewScriptError: 17,
        exparserScriptError: 18
    }, t.KeyValueType = {Speed: "13544", Error: "13582"}, t.ErrorType = {
        appServiceSDKScriptError: 1,
        webviewSDKScriptError: 2,
        jsEnginScriptError: 3,
        thirdScriptError: 4,
        webviewScriptError: 5,
        exparserScriptError: 6
    }
}])
