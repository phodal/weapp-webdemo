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
        return function (e) {
            if ("string" != typeof e)throw new Error("require args must be a string");
            for (var n = [], o = (t + "/" + e).split("/"), r = 0, i = o.length; r < i; ++r) {
                var a = o[r];
                if ("" != a && "." != a)if (".." == a) {
                    if (0 == n.length)throw new Error("can't find module : " + e);
                    n.pop()
                } else r + 1 < i && ".." == o[r + 1] ? r++ : n.push(a)
            }
            try {
                var s = n.join("/");
                return /\.js$/.test(s) || (s += ".js"), require(s)
            } catch (e) {
                throw e
            }
        }
    };
    require = function (o) {
        if ("string" != typeof o)throw new Error("require args must be a string");
        var i = n[o];
        if (!i)throw new Error('module "' + o + '" is not defined');
        if (i.status === e) {
            var a = i.factory, s = {exports: {}}, c = void 0;
            a && (c = a(r(o), s, s.exports)), i.exports = s.exports || c, i.status = t
        }
        return i.exports
    }
}()
