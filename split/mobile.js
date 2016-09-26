!function (e) {
    var t = function (e) {
        return {animationName: e.animationName, elapsedTime: e.elapsedTime}
    }, n = null;
    ["webkitAnimationStart", "webkitAnimationIteration", "webkitAnimationEnd", "animationstart", "animationiteration", "animationend", "webkitTransitionEnd", "transitionend"].forEach(function (i) {
        if (null === n && (n = "webkit" === i.slice(0, 6)), n) {
            if ("webkit" !== i.slice(0, 6))return;
            i = i.slice(6).toLowerCase()
        } else if ("webkit" === i.slice(0, 6))return;
        e.addEventListener(i, function (e) {
            exparser.triggerDocumentEvent(e, i, t(e), !0)
        }, !0)
    })
}(window), function (e) {
    function t(e) {
        "undefined" != typeof WeixinJSBridge ? e() : document.addEventListener("WeixinJSBridgeReady", e, !1)
    }

    t(function () {
        WeixinJSBridge.subscribe("onAppRouteDone", function () {
            window.__onAppRouteDone = !0, exparser.triggerEvent(document, "routeDone", {})
        })
    }), t(function () {
        WeixinJSBridge.subscribe("setKeyboardValue", function (e) {
            e && e.data && exparser.triggerEvent(document, "setKeyboardValue", {
                value: e.data.value,
                cursor: e.data.cursor
            })
        })
    }), t(function () {
        WeixinJSBridge.subscribe("hideKeyboard", function (e) {
            exparser.triggerEvent(document, "hideKeyboard", {})
        })
    }), t(function () {
        WeixinJSBridge.on("onKeyboardComplete", function (e) {
            exparser.triggerEvent(document, "onKeyboardComplete", {value: e.value, inputId: e.inputId})
        })
    })
}(window), function (e) {
    e.addEventListener("load", function (e) {
        exparser.triggerDocumentEvent(e, "load", void 0, !0)
    }, !0), e.addEventListener("error", function (e) {
        exparser.triggerDocumentEvent(e, "error", void 0, !0)
    }, !0), e.addEventListener("focus", function (e) {
        exparser.triggerDocumentEvent(e, "focus", void 0, !0)
    }, !0), e.addEventListener("blur", function (e) {
        exparser.triggerDocumentEvent(e, "blur", void 0, !0)
    }, !0)
}(window), function (e) {
    e.addEventListener("change", function (e) {
        exparser.triggerDocumentEvent(e, "change", {value: e.target.value}, !0)
    }, !0), e.addEventListener("submit", function (e) {
        exparser.triggerDocumentEvent(e, "submit", void 0, !0)
    }, !0), e.addEventListener("reset", function (e) {
        exparser.triggerDocumentEvent(e, "reset", void 0, !0)
    }, !0)
}(window), function (e) {
    e.addEventListener("keydown", function (e) {
        exparser.triggerDocumentEvent(e, "keydown")
    }, !0), e.addEventListener("keyup", function (e) {
        exparser.triggerDocumentEvent(e, "keyup")
    }, !0), e.addEventListener("keypress", function (e) {
        exparser.triggerDocumentEvent(e, "keypress")
    }, !0), e.addEventListener("input", function (e) {
        exparser.triggerDocumentEvent(e, "input")
    }, !0)
}(window), function (e) {
    var t = 10, n = 350, i = 50, r = function (e) {
        return e.touches = [{
            pageX: e.pageX,
            pageY: e.pageY,
            clientX: e.clientX,
            clientY: e.clientY,
            screenX: e.screenX,
            screenY: e.screenY
        }], e
    }, o = function (e, t) {
        return {target: t, touches: e.touches, preventDefault: e.preventDefault.bind(e)}
    }, a = !1, s = 0, c = 0, l = 0, d = 0, u = null, h = !1, p = null, A = function (e) {
        for (; e; e = e.parentNode) {
            var t = e.__wxElem || e;
            if (t.__wxScrolling && Date.now() - t.__wxScrolling < i)return !0
        }
        return !1
    }, g = function () {
        exparser.triggerDocumentEvent(d, "longtap", {x: c, y: l})
    }, f = function (e, t, i) {
        s || (s = e.timeStamp, c = t, l = i, A(e.target) ? (u = null, h = !0, exparser.triggerDocumentEvent(e, "canceltap", {
            x: t,
            y: i
        })) : (u = setTimeout(g, n), h = !1), d = e, a || (p = e.target), exparser.triggerDocumentEvent(e, "track", {
            state: "start",
            x: t,
            y: i
        }), e.defaultPrevented && (s = 0));
    }, v = function (e, n, i) {
        s && (u && (Math.abs(n - c) < t && Math.abs(i - l) < t || (h = !0, clearTimeout(u), u = null, exparser.triggerDocumentEvent(d, "canceltap", {
            x: n,
            y: i
        }))), a || (e = o(e, p)), exparser.triggerDocumentEvent(e, "track", {state: "move", x: n, y: i}))
    }, b = function (e, t, n, i) {
        s && (s = 0, u && (clearTimeout(u), u = null), i && (e = d, t = c, n = l), a || (e = o(e, p)), exparser.triggerDocumentEvent(e, "track", {
            state: "end",
            x: t,
            y: n
        }), i || h || exparser.triggerDocumentEvent(d, "tap", {x: t, y: n}))
    };
    e.addEventListener("scroll", function (e) {
        e.target.__wxScrolling = Date.now()
    }, !0), e.addEventListener("touchstart", function (e) {
        a = !0, exparser.triggerDocumentEvent(e, "touchstart"), 1 === e.touches.length && f(e, e.touches[0].pageX, e.touches[0].pageY)
    }, !0), e.addEventListener("touchmove", function (e) {
        exparser.triggerDocumentEvent(e, "touchmove"), 1 === e.touches.length && v(e, e.touches[0].pageX, e.touches[0].pageY)
    }, !0), e.addEventListener("touchend", function (e) {
        exparser.triggerDocumentEvent(e, "touchend"), 0 === e.touches.length && b(e, e.changedTouches[0].pageX, e.changedTouches[0].pageY)
    }, !0), e.addEventListener("touchcancel", function (e) {
        exparser.triggerDocumentEvent(e, "touchcancel"), b(null, 0, 0, !0)
    }, !0), window.addEventListener("blur", function () {
        b(null, 0, 0, !0)
    }), e.addEventListener("mousedown", function (e) {
        a || s || (r(e), exparser.triggerDocumentEvent(e, "touchstart"), f(e, e.pageX, e.pageY))
    }, !0), e.addEventListener("mousemove", function (e) {
        !a && s && (r(e), exparser.triggerDocumentEvent(e, "touchmove"), v(e, e.pageX, e.pageY))
    }, !0), e.addEventListener("mouseup", function (e) {
        !a && s && (r(e), exparser.triggerDocumentEvent(e, "touchend"), b(e, e.pageX, e.pageY))
    }, !0)
}(window)
