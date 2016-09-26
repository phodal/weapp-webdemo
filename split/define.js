!function () {
    var e = 1, t = 2, n = {};
    define = function (t, o) {
        n[t] = {status: e, factory: o}
    };
    var o = function (e) {
        var t = e.match(/(.*)\/([^\/]+)?$/);
        return t && t[1] ? t[1] : "./"
    }, r = function (e) {
        var t = o(e);
        return function (n) {
            if ("string" != typeof n)throw new Error("s args must be a string");
            for (var o = [], r = (t + "/" + n).split("/"), i = 0, a = r.length; i < a; ++i) {
                var u = r[i];
                if ("" != u && "." != u)if (".." == u) {
                    if (0 == o.length)throw new Error("can't find module : " + n);
                    o.pop()
                } else i + 1 < a && ".." == r[i + 1] ? i++ : o.push(u)
            }
            try {
                return require(o.join("/"))
            } catch (t) {
                throw new Error("Error, realFilepath = " + o.join("/") + ", modId = " + e + ", requireId = " + n)
            }
        }
    };
    require = function (o) {
        if ("string" != typeof o)throw new Error("require args must be a string");
        var i = n[o];
        if (!i)throw new Error('module "' + o + '" is not defined');
        if (i.status === e) {
            var a = i.factory, u = {}, c = void 0;
            a && (c = a(r(o), u)), i.exports = u.exports || c, i.status = t
        }
        return i.exports
    }, Object.defineProperty ? (Object.defineProperty(window, "require", {
        enumerable: !1,
        configurable: !1,
        writable: !1,
        value: require
    }), Object.defineProperty(window, "define", {
        enumerable: !1,
        configurable: !1,
        writable: !1,
        value: define
    })) : (window.define = define, window.require = require)
}()
