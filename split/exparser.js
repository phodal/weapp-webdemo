exparser = function (e) {
    function t(i) {
        if (n[i])return n[i].exports;
        var r = n[i] = {exports: {}, id: i, loaded: !1};
        return e[i].call(r.exports, r, r.exports, t), r.loaded = !0, r.exports
    }

    var n = {};
    return t.m = e, t.c = n, t.p = "", t(0)
}([function (e, exparser, currentModule) {
    var eventHandler = currentModule(1), Behavior = currentModule(3), Element = currentModule(4), Component = currentModule(5), s = currentModule(9), Observer = currentModule(10);
    exparser.Behavior = Behavior,
        exparser.Element = Element,
        exparser.Component = Component,
        exparser.Observer = Observer,
        exparser.registerBehavior = Behavior.create,
        exparser.registerElement = Component.register,
        exparser.createElement = Component.create,
        exparser.createTextNode = s.create,
        exparser.addListenerToElement = eventHandler.addListenerToElement,
        exparser.addListenerToShadowRoot = eventHandler.addListenerToShadowRoot,
        exparser.removeListenerFromElement = eventHandler.removeListenerFromElement,
        exparser.removeListenerFromShadowRoot = eventHandler.removeListenerFromShadowRoot,
        exparser.triggerEvent = eventHandler.triggerEvent,
        exparser.triggerDocumentEvent = eventHandler.triggerDocumentEvent
}, function (e, eventHandler, n) {
    var i = n(2), r = function (e) {
        if (e) {
            for (var t = [], n = 0; n < e.length; n++) {
                var i = e[n];
                t.push({
                    pageX: i.pageX,
                    pageY: i.pageY,
                    clientX: i.clientX,
                    clientY: i.clientY,
                    screenX: i.screenX,
                    screenY: i.screenY
                })
            }
            return t
        }
    }, o = Date.now(), a = function (e, t, n, i) {
        for (var a = !1, s = Date.now() - o, c = r(e.touches), l = e.target.__domElement || e.target, d = l.__wxElement || l, u = function () {
            e.preventDefault && e.preventDefault()
        }, h = function () {
            a = !0
        }, p = function (i, r) {
            var o = i.call(r, {
                target: d,
                currentTarget: r,
                type: t,
                timeStamp: s,
                touches: c,
                keyCode: e.keyCode,
                detail: n,
                preventDefault: u,
                stopPropagation: h
            });
            o === !1 && (u(), a = !0)
        }, A = null, g = l; g; g = g.parentNode) {
            var f = g.__wxElement || g;
            if (g.__wxElement && (g.__wxShadowRootEvents && g.__wxShadowRootEvents[t] && p(g.__wxShadowRootEvents[t], f), A !== f && (l = g, d = l.__wxElement || l), A = f.parentNode, a))break;
            if (g.__wxEvents && g.__wxEvents[t] && p(g.__wxEvents[t], f), i || a)break
        }
    };
    eventHandler.addListenerToElement = function (e, t, n) {
        return e = e.__domElement || e, e.__wxEvents || (e.__wxEvents = Object.create(null)), e.__wxEvents[t] || (e.__wxEvents[t] = i.create()), e.__wxEvents[t].add(n)
    }, eventHandler.addListenerToShadowRoot = function (e, t, n) {
        return e = e.__domElement || e, e.__wxShadowRootEvents || (e.__wxShadowRootEvents = Object.create(null)), e.__wxShadowRootEvents[t] || (e.__wxShadowRootEvents[t] = i.create()), e.__wxShadowRootEvents[t].add(n)
    }, eventHandler.removeListenerFromElement = function (e, t, n) {
        e = e.__domElement || e, e.__wxEvents && e.__wxEvents[t] && e.__wxEvents[t].remove(n)
    }, eventHandler.removeListenerFromShadowRoot = function (e, t, n) {
        e = e.__domElement || e, e.__wxShadowRootEvents && e.__wxShadowRootEvents[t] && e.__wxShadowRootEvents[t].remove(n)
    }, eventHandler.triggerEvent = function (e, t, n, i) {
        a({target: e}, t, n, i)
    }, eventHandler.triggerDocumentEvent = a
}, function (e, t) {
    var n = function () {
    };
    n.prototype = Object.create(Object.prototype, {
        constructor: {
            value: n,
            writable: !0,
            configurable: !0
        }
    }), n.create = function () {
        var e = Object.create(n.prototype);
        return e.empty = !0, e._arr = [], e._index = 0, e
    }, n.prototype.add = function (e) {
        var t = this._index++;
        return this._arr.push({id: t, func: e}), this.empty = !1, t
    }, n.prototype.remove = function (e) {
        var t = this._arr, n = 0;
        if ("function" == typeof e) {
            for (n = 0; n < t.length; n++)if (t[n].func === e)return t.splice(n, 1), this.empty = !t.length, !0
        } else for (n = 0; n < t.length; n++)if (t[n].id === e)return t.splice(n, 1), this.empty = !t.length, !0;
        return !1
    }, n.prototype.call = function (e, t) {
        for (var n = this._arr, i = !1, r = 0; r < n.length; r++) {
            var o = n[r].func.call(e, t);
            o === !1 && (i = !0)
        }
        if (i)return !1
    }, e.exports = n
}, function (e, t) {
    var Behavior = function () {
    };
    Behavior.prototype = Object.create(Object.prototype, {constructor: {value: Behavior, writable: !0, configurable: !0}});
    var i = ["created", "attached", "detached", "contentChanged"], r = 1;
    Behavior.create = function (e) {
        var t = String(r++), o = Behavior.list[e.is || ""] = Object.create(Behavior.prototype, {
            is: {value: e.is || ""},
            _id: {value: t}
        });
        o.template = e.template, o.properties = Object.create(null), o.methods = Object.create(null), o.listeners = Object.create(null);
        for (var a = o.ancestors = [], s = "", c = 0; c < (e.behaviors || []).length; c++) {
            var l = e.behaviors[c];
            "string" == typeof l && (l = Behavior.list[l]);
            for (s in l.properties)o.properties[s] = l.properties[s];
            for (s in l.methods)o.methods[s] = l.methods[s];
            for (var d = 0; d < l.ancestors.length; d++)a.indexOf(l.ancestors[d]) < 0 && a.push(l.ancestors[d])
        }
        for (s in e.properties)o.properties[s] = e.properties[s];
        for (s in e.listeners)o.listeners[s] = e.listeners[s];
        for (s in e)"function" == typeof e[s] && (i.indexOf(s) < 0 ? o.methods[s] = e[s] : o[s] = e[s]);
        return a.push(o), o
    }, Behavior.list = Object.create(null), Behavior.prototype.hasBehavior = function (e) {
        for (var t = 0; t < this.ancestors.length; t++)if (this.ancestors[t].is === e)return !0;
        return !1
    }, Behavior.prototype.getAllListeners = function () {
        for (var e = Object.create(null), t = this.ancestors, n = 0; n < t.length; n++) {
            var i = this.ancestors[n];
            for (var r in i.listeners)e[r] ? e[r].push(i.listeners[r]) : e[r] = [i.listeners[r]]
        }
        return e
    }, Behavior.prototype.getAllLifeTimeFuncs = function () {
        var e = Object.create(null), t = this.ancestors;
        return i.forEach(function (n) {
            for (var i = e[n] = [], r = 0; r < t.length; r++) {
                var o = t[r];
                o[n] && i.push(o[n])
            }
        }), e
    }, e.exports = Behavior
}, function (e, t, n) {
    var i = n(2), r = function () {
    };
    r.prototype = Object.create(Object.prototype, {
        constructor: {
            value: r,
            writable: !0,
            configurable: !0
        }
    }), r.initialize = function (e) {
        return e.__attached = !1, e.parentNode = null, e.childNodes = [], e.__attrObservers = i.create(), e.__childObservers = i.create(), e
    };
    var o = function (e) {
        if (!e.parentNode || e.parentNode.__attached) {
            var t = function (e) {
                e.__attached = !0;
                var n = e.childNodes;
                if (n)for (var i = 0; i < n.length; i++)t(e.childNodes[i])
            };
            t(e);
            var n = function (e) {
                e.__callLifeTimeFuncs("attached");
                var t = e.childNodes;
                if (t)for (var i = 0; i < t.length; i++)n(e.childNodes[i])
            };
            n(e)
        }
    }, a = function (e) {
        if (e.__attached) {
            var t = function (e) {
                e.__attached = !1;
                var n = e.childNodes;
                if (n)for (var i = 0; i < n.length; i++)t(e.childNodes[i])
            };
            t(e);
            var n = function (e) {
                e.__callLifeTimeFuncs("detached");
                var t = e.childNodes;
                if (t)for (var i = 0; i < t.length; i++)n(e.childNodes[i])
            };
            n(e)
        }
    }, s = function (e, t, n) {
        e.__callLifeTimeFuncs("contentChanged", {
            type: t,
            child: n
        }), e.__childObservers.empty || ("add" === t ? e.__childObservers.call(e, {
            type: "childList",
            target: e,
            add: n
        }) : e.__childObservers.call(e, {type: "childList", target: e, remove: n}))
    };
    r.prototype.appendChild = function (e) {
        var t = e.parentNode;
        return e.parentNode = this, t && t.childNodes.splice(t.childNodes.indexOf(e), 1), this.childNodes.push(e), this.__contentElement.appendChild(e.__domElement), t && (a(e), s(t, "remove", e)), o(e), s(this, "add", e), e
    }, r.prototype.insertBefore = function (e, t) {
        var n = this.childNodes.indexOf(t);
        if (n < 0)return this.appendChild(e);
        var i = e.parentNode;
        if (e.parentNode = this, i) {
            var r = i.childNodes.indexOf(e);
            i.childNodes.splice(r, 1), i === this && r < n && n--
        }
        return this.childNodes.splice(n, 0, e), this.__contentElement.insertBefore(e.__domElement, t.__domElement), i && (a(e), s(i, "remove", e)), o(e), s(this, "add", e), e
    }, r.prototype.removeChild = function (e) {
        var t = e.parentNode;
        return t !== this ? null : (e.parentNode = null, t && t.childNodes.splice(t.childNodes.indexOf(e), 1), this.__contentElement.removeChild(e.__domElement), t && (a(e), s(t, "remove", e)), e)
    }, r.prototype.replaceChild = function (e, t) {
        var n = this.childNodes.indexOf(t);
        if (n < 0)return this.appendChild(e), null;
        if (e === t)return a(e), s(this, "remove", e), o(e), s(this, "add", e), null;
        var i = e.parentNode;
        if (e.parentNode = this, t.parentNode = null, i) {
            var r = i.childNodes.indexOf(e);
            i.childNodes.splice(r, 1), i === this && r < n && n--
        }
        return this.childNodes[n] = e, this.__contentElement.replaceChild(e.__domElement, t.__domElement), a(t), s(this, "remove", t), i && (a(e), s(i, "remove", e)), o(e), s(this, "add", e), t
    }, r.prototype.triggerEvent = function (e, t, n) {
        exparser.triggerEvent(this, e, t, n)
    }, r.prototype.addListener = function (e, t) {
        exparser.addListenerToElement(this, e, t)
    }, r.prototype.removeListener = function (e, t) {
        exparser.removeListenerFromElement(this, e, t)
    }, r.prototype.setAttribute = function (e, t) {
        return this.__domElement.setAttribute(e, t)
    }, r.prototype.removeAttribute = function (e) {
        return this.__domElement.removeAttribute(e)
    }, r.prototype.replaceDocumentElement = function (e) {
        this.__attached || (e.parentNode.replaceChild(this.__domElement, e), o(this))
    }, e.exports = r
}, function (e, t, n) {
    function i(e) {
        return e.replace(/[A-Z]/g, function (e) {
            return "-" + e.toLowerCase()
        })
    }

    var r = n(1), o = n(6), a = n(3), s = n(4), c = r.addListenerToElement, l = r.addListenerToShadowRoot, d = o.parseTemplate, u = function () {
    };
    u.prototype = Object.create(Object.prototype, {
        constructor: {
            value: u,
            writable: !0,
            configurable: !0
        }
    }), u.list = Object.create(null);
    var h = function (e, t, n, r) {
        var o = i(n);
        t.type === Boolean ? r ? e.setAttribute(o, "") : e.removeAttribute(o) : t.type === Object || t.type === Array ? e.setAttribute(o, JSON.stringify(r)) : e.setAttribute(o, r)
    };
    u.register = function (e) {
        var t = {is: {value: e.is || ""}}, n = a.create(e), i = Object.create(null);
        Object.keys(n.properties).forEach(function (e) {
            var r = n.properties[e];
            r !== String && r !== Number && r !== Boolean && r !== Object && r !== Array || (r = {type: r}), void 0 === r.value && (r.type === String ? r.value = "" : r.type === Number ? r.value = 0 : r.type === Boolean ? r.value = !1 : r.type === Array ? r.value = [] : r.value = null), i[e] = {
                type: r.type,
                value: r.value,
                coerce: n.methods[r.coerce],
                observer: n.methods[r.observer],
                reflectToAttribute: !!r.reflectToAttribute,
                public: !!r.public
            }, t[e] = {
                enumerable: !0, get: function () {
                    var t = this.__propData[e];
                    return void 0 === t ? i[e].value : t
                }, set: function (t) {
                    var n = i[e];
                    n.type === String ? t = String(t) : n.type === Number ? t = Number(t) : n.type === Boolean ? t = !!t : n.type === Array ? t instanceof Array || (t = [t]) : "object" != typeof t && (t = null);
                    var r = this.__propData[e];
                    n.coerce && (t = n.coerce.call(this, t, r)), this.__propData[e] = t, (n.public || n.reflectToAttribute) && h(this, n, e, t), this.__templateInstance.updateValues(this, this.__propData, e), n.observer && n.observer.call(this, t, r), n.public && !this.__attrObservers.empty && this.__attrObservers.call(this, {
                        type: "properties",
                        target: this,
                        propertyName: e
                    })
                }
            }
        });
        var r = u.list[n.is] = Object.create(s.prototype, t);
        r.__behavior = n;
        for (var o in n.methods)r[o] = n.methods[o];
        r.__lifeTimeFuncs = n.getAllLifeTimeFuncs(), r.__callLifeTimeFuncs = function (e, t) {
            for (var n = this.__lifeTimeFuncs[e], i = 0; i < n.length; i++)n[i].call(this, t)
        };
        var c = {};
        for (var l in i)c[l] = i[l].value;
        var p = document.getElementById(n.is);
        !n.template && p && "TEMPLATE" === p.tagName || (p = document.createElement("template"), p.innerHTML = n.template || ""), r.__defaultValues = JSON.stringify(c), r.__template = d(p, c, n.methods);
        var A = n.getAllListeners(), g = Object.create(null);
        for (var f in A) {
            for (var v = A[f], b = [], w = 0; w < v.length; w++)b.push(n.methods[v[w]]);
            g[f] = b
        }
        r.__innerEvents = g
    }, u.create = function (e) {
        e = e.toLowerCase();
        var t = document.createElement(e), n = u.list[e] || u.list[""], i = Object.create(n);
        i.__domElement = t, s.initialize(i), t.__wxElement = i;
        var r = n.__defaultValues || {};
        i.__propData = JSON.parse(r);
        var o = i.__templateInstance = i.__template.createInstance(i);
        i.__domElement.appendChild(o.frag), i.$ = o.idMap, i.$.dom = i.__domElement, i.__contentElement = i.$.content = o.contentElement || i.__domElement;
        var a = n.__innerEvents;
        for (var d in a) {
            var h = d.split(".", 2), p = h[h.length - 1], A = i, g = !0;
            if (2 === h.length && ("" !== h[0] && (A = i.$[h[0]]), g = !1), A)for (var f = a[d], v = 0; v < f.length; v++)g ? l(A, p, f[v].bind(i)) : c(A, p, f[v].bind(i))
        }
        return i.__callLifeTimeFuncs("created"), i
    }, u.hasProperty = function (e, t) {
        return void 0 !== e.__propData[t]
    }, s.prototype.hasBehavior = function (e) {
        return this.__behavior.hasBehavior(e)
    }, u.register({is: "", template: "<wx-content></wx-content>", properties: {}}), e.exports = u
}, function (e, t, n) {
    function i(e) {
        return e.replace(/-([a-z])/g, function (e, t) {
            return t.toUpperCase()
        })
    }

    function r(e, t) {
        for (var n = 0; n < t.length; n++)e = e.childNodes[t[n]];
        return e
    }

    function o(e, t, n) {
        var i = l.parse(e);
        return {
            bindedProps: i.bindedProps, update: function (e, r, o, a) {
                var s = i.calculate(e, a, t);
                "prop" === n ? r[o] = s : "class" === n ? r.classList.toggle(o, !!s) : "style" === n ? r.style[o] = s : "text" === n ? r.textContent = s : s === !1 ? r.removeAttribute(o) : s === !0 ? r.setAttribute(o, "") : r.setAttribute(o, s)
            }
        }
    }

    function a(e) {
        for (var t = Object.create(null), n = 0; n < e.length; n++)t[e[n].name] = e[n].value;
        return t
    }

    function parseTemplate(e, t, n) {
        var s = a(e.attributes), u = {
            parseTextContent: void 0 !== s["parse-text-content"],
            keepWhiteSpace: void 0 !== s["keep-white-space"]
        }, h = e.content;
        if ("TEMPLATE" !== e.tagName)for (h = document.createDocumentFragment(); e.childNodes.length;)h.appendChild(e.childNodes[0]);
        var p = [], A = [], g = Object.create(null), f = Object.create(null), v = function (e) {
            var t = Object.create(null);
            for (var n in g) {
                var i = g[n];
                t[n] = r(e, i)
            }
            return t
        }, b = function (e) {
            return p.length ? r(e, p) : null
        }, w = function (e) {
            var t = Object.create(null), n = Object.create(null), i = null;
            return A.forEach(function (o) {
                var a = r(e, o.path), s = o.template.createInstance();
                a.parentNode.replaceChild(s.frag, a);
                for (var c in s.idMap)n[c] = s.idMap[c];
                i = s.contentElement || i, t[o.linkedProp] || (t[o.linkedProp] = []), t[o.linkedProp].push({
                    instance: s,
                    scope: o.scope
                })
            }), {idMap: n, contentElement: i, childLinksMap: t}
        }, m = function (e) {
            var t = Object.create(null);
            for (var n in f) {
                var i = f[n];
                t[n] = [];
                for (var o = 0; o < i.length; o++) {
                    var a = i[o], s = r(e, a.path);
                    t[n].push({node: s, attr: a.attr, updater: a.updater})
                }
            }
            return t
        }, x = function (e, r, s) {
            s = s || {};
            for (var u = 0; u < e.length; u++) {
                var h = e[u], v = r.concat(u);
                if (8 !== h.nodeType)if (3 !== h.nodeType)if ("WX-CONTENT" !== h.tagName)if ("WX-REPEAT" !== h.tagName) {
                    var b = h.attributes;
                    if (b) {
                        for (var w = [], m = {}, y = 0; y < b.length; y++) {
                            var _ = b[y];
                            if ("id" === _.name)g[_.value] = r.concat(u), w.push("id"); else if ("parse-text-content" === _.name)m.parseTextContent = !0, w.push("parse-text-content"); else if ("keep-white-space" === _.name)m.keepWhiteSpace = !0, w.push("keep-white-space"); else {
                                var k = "", C = "";
                                if (_.name.slice(-1) === d ? (k = "attr", C = _.name.slice(0, -1)) : ":" === _.name.slice(-1) ? (k = "prop", C = i(_.name.slice(0, -1))) : "class." === _.name.slice(0, 6) ? (k = "class", C = _.name.slice(6)) : "style." === _.name.slice(0, 6) && (k = "style", C = _.name.slice(6)), k) {
                                    for (var E = o(_.value, n, k), I = E.bindedProps, T = E.update, S = 0; S < I.length; S++) {
                                        var B = I[S];
                                        f[B] || (f[B] = []), f[B].push({path: v, attr: C, updater: T})
                                    }
                                    w.push(_.name), T(null, h, C, t)
                                }
                            }
                        }
                        for (var N = 0; N < w.length; N++)h.removeAttribute(w[N]);
                        h.childNodes && x(h.childNodes, v, m), 1 === h.childNodes.length && "WX-CONTENT" === h.childNodes[0].tagName && (p.pop(), h.removeChild(h.childNodes[0]))
                    }
                } else {
                    var D = a(h.attributes), F = l.parseSingleVariable(D.items), P = c.parseWxRepeat(h, t[F], n, {
                        index: D.index || "index",
                        item: D.item || "item"
                    });
                    A.push({path: v, scope: F, linkedProp: F, template: P})
                } else p = v; else {
                    var M = h.textContent;
                    if (s.keepWhiteSpace || (M = M.trim(), "" === M ? (h.parentNode.removeChild(h), u--) : h.textContent = M), s.parseTextContent) {
                        for (var R = o(M, n, "text"), J = R.bindedProps, L = R.update, O = 0; O < J.length; O++) {
                            var Q = J[O];
                            f[Q] || (f[Q] = []), f[Q].push({path: v, attr: "", updater: L})
                        }
                        L(null, h, "", t)
                    }
                } else h.parentNode.removeChild(h), u--
            }
        };
        return x(h.childNodes, [], u), 0 === p.length && (p.push(h.childNodes.length), h.appendChild(document.createElement("wx-content"))), 1 === h.childNodes.length && "WX-CONTENT" === h.childNodes[0].tagName && (p.pop(), h.removeChild(h.childNodes[0])), {
            createInstance: function () {
                var e = document.importNode(h, !0), t = v(e), n = b(e), i = m(e), r = w(e, i), o = r.childLinksMap;
                for (var a in r.idMap)t[a] = t[a] || r.idMap[a];
                return n = n || r.contentElement, {
                    frag: e, idMap: t, contentElement: n, updateValues: function (e, t, n) {
                        void 0 !== n && (i[n] && i[n].forEach(function (n) {
                            n.updater(e, n.node, n.attr, t)
                        }), o[n] && o[n].forEach(function (e) {
                            e.instance.updateValues(t[e.scope])
                        }))
                    }
                }
            }
        }
    }

    var c = n(7), l = n(8), d = String.fromCharCode(36);
    t.parseTemplate = parseTemplate
}, function (e, t, n) {
    function parserWxRepeat(e, t, n, i) {
        var o = i.index, a = i.item, s = r.parseTemplate(e, {}, n);
        return {
            createInstance: function () {
                var e = document.createElement("wx-repeat");
                return {
                    frag: e, updateValues: function (t) {
                        e.innerHTML = "";
                        for (var n in t) {
                            var i = {};
                            i[o] = n, i[a] = t[n];
                            var r = s.createInstance();
                            e.appendChild(r.frag), r.updateValues(e, i, o), r.updateValues(e, i, a)
                        }
                    }
                }
            }
        }
    }

    var r = n(6);
    t.parseWxRepeat = parserWxRepeat
}, function (e, t) {
    var n = function () {
    };
    n.prototype = Object.create(Object.prototype, {
        constructor: {
            value: n,
            writable: !0,
            configurable: !0
        }
    }), n.parse = function (e) {
        for (var t = Object.create(n.prototype), i = e.split(/\{\{(.*?)\}\}/g), r = [], o = 0; o < i.length; o++)if (o % 2) {
            var a = i[o].match(/^(!?)([-_a-zA-Z0-9]+)(?:\((([-_a-zA-Z0-9]+)(,[-_a-zA-Z0-9]+)*)\))?$/) || [!1, ""], s = null;
            if (a[3]) {
                s = a[3].split(",");
                for (var c = 0; c < s.length; c++)r.indexOf(s[c]) < 0 && r.push(s[c])
            } else r.indexOf(a[2]) < 0 && r.push(a[2]);
            i[o] = {not: !!a[1], prop: a[2], callee: s}
        }
        return t.bindedProps = r, t.isSingleVariable = 3 === i.length && "" === i[0] && "" === i[2], t._slices = i, t
    }, n.parseSingleVariable = function (e) {
        var t = (e || "").match(/^\{\{([-_a-zA-Z0-9]+)\}\}$/);
        return t ? t[1] : ""
    };
    var i = function (e, t, n, i) {
        var r = "";
        if (i.callee) {
            for (var o = [], a = 0; a < i.callee.length; a++)o[a] = t[i.callee[a]];
            r = n[i.prop].apply(e, o)
        } else r = t[i.prop];
        return i.not ? !r : r
    };
    n.prototype.calculate = function (e, t, n) {
        var r = this._slices, o = null, a = "";
        if (this.isSingleVariable)o = r[1], a = i(e, t, n, o); else for (var s = 0; s < r.length; s++)o = r[s], a += s % 2 ? i(e, t, n, o) : o;
        return a
    }, e.exports = n
}, function (e, t, n) {
    var i = n(2), r = function () {
    };
    r.prototype = Object.create(Object.prototype, {
        constructor: {
            value: r,
            writable: !0,
            configurable: !0
        }
    }), r.create = function (e) {
        var t = Object.create(r.prototype);
        return t.parentNode = null, t.__domElement = document.createTextNode(e || ""), t.__callLifeTimeFuncs = function () {
        }, t.__textObservers = i.create(), t
    }, Object.defineProperty(r.prototype, "textContent", {
        get: function () {
            return this.__domElement.textContent
        }, set: function (e) {
            this.__domElement.textContent = e, this.__textObservers.empty || this.__textObservers.call(this, {
                type: "characterData",
                target: this
            })
        }
    }), e.exports = r
}, function (e, t) {
    var n = function () {
    };
    n.prototype = Object.create(Object.prototype, {
        constructor: {
            value: n,
            writable: !0,
            configurable: !0
        }
    }), n.create = function (e) {
        var t = Object.create(n.prototype);
        return t._cb = e, t._binded = [], t
    }, n.prototype.observe = function (e, t) {
        t = t || {}, t.properties && e.__attrObservers && this._binded.push({
            funcArr: e.__attrObservers,
            id: e.__attrObservers.add(this._cb)
        }), t.childList && e.__childObservers && this._binded.push({
            funcArr: e.__childObservers,
            id: e.__childObservers.add(this._cb)
        }), t.characterData && e.__textObservers && this._binded.push({
            funcArr: e.__textObservers,
            id: e.__textObservers.add(this._cb)
        })
    }, n.prototype.disconnect = function () {
        for (var e = this._binded, t = 0; t < e.length; t++)e[t].funcArr.remove(e[t].id);
        this._binded = []
    }, e.exports = n
}])
