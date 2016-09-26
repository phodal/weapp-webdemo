window.exparser.registerBehavior({
    is: "wx-base",
    properties: {id: {type: String, reflectToAttribute: !0}, hidden: {type: Boolean, reflectToAttribute: !0}},
    _isDevTools: function () {
        return /wechatdevtools/.test(window.navigator.userAgent.toLowerCase())
    },
    debounce: function (e, t, n) {
        var i = this;
        this.__debouncers = this.__debouncers || {}, this.__debouncers[e] && clearTimeout(this.__debouncers[e]), this.__debouncers[e] = setTimeout(function () {
            "function" == typeof t && t(), i.__debouncers[e] = void 0
        }, n)
    }
}), window.exparser.registerBehavior({
    is: "wx-data-component",
    properties: {name: {type: String, reflectToAttribute: !0}},
    getFormData: function () {
        return this.value || ""
    },
    resetFormData: function () {
    }
}), window.exparser.registerBehavior({
    is: "wx-disabled",
    properties: {disabled: {type: Boolean, value: !1, reflectToAttribute: !0}}
}), window.exparser.registerBehavior({
    is: "wx-group",
    properties: {value: {type: String, reflectToAttribute: !0}, curItem: {type: Object}},
    listeners: {
        itemNameChange: "handleItemNameChange",
        itemCheckedChange: "handleItemCheckedChange",
        itemCheck: "handleCheck"
    },
    handleItemCheckedChange: function (e) {
        return e.target.checked ? this.curItem !== e.target && (!this.curItem || (this.curItem.checked = !1), this.curItem = e.target, this.value = e.target.value) : this.curItem === e.target && (this.curItem = null, this.value = ""), !1
    },
    handleItemNameChange: function (e) {
        return e.target === this.curItem && (this.value = e.detail.newval), !1
    },
    handleCheck: function (e) {
        return this.triggerEvent("change", {value: e.detail.value}, !0), !1
    },
    resetFormData: function () {
        if (this.hasBehavior("wx-data-component")) {
            var e = function e(t) {
                t.childNodes.forEach(function (t) {
                    t instanceof exparser.Element && !t.hasBehavior("wx-group") && (t.hasBehavior("wx-item") && t.resetFormData(), e(t))
                })
            };
            e(this)
        }
    }
}), window.exparser.registerBehavior({
    is: "wx-hover",
    properties: {
        hoverStartTime: {type: Number, value: 50},
        hoverStayTime: {type: Number, value: 100},
        hoverClass: {type: String, value: ""},
        hoverStyle: {type: String, value: ""}
    },
    listeners: {
        touchstart: "_hoverTouchStart",
        touchend: "_hoverTouchEnd",
        canceltap: "_hoverCancel",
        touchcancel: "_hoverCancel"
    },
    _hoverTouchStart: function (e) {
        var t = this;
        if ("none" == this.hoverStyle || "none" == this.hoverClass || this.disabled); else {
            if (window.__hoverStyleTimeId)return;
            this.__hoverStyleTimeId = setTimeout(function () {
                t.hoverClass ? t.$.dom.classList.add(t.hoverClass) : t.$.dom.classList.add(t.is.replace("wx-", "") + "-hover")
            }, this.hoverStartTime), window.__hoverStyleTimeId = this.__hoverStyleTimeId
        }
    },
    _hoverTouchEnd: function () {
        var e = this;
        this.__hoverStyleTimeId && (window.__hoverStyleTimeId == this.__hoverStyleTimeId && (window.__hoverStyleTimeId = void 0), this.__hoverStyleTimeId = void 0), setTimeout(function () {
            e._hoverReset()
        }, this.hoverStayTime)
    },
    _hoverCancel: function () {
        this.__hoverStyleTimeId && (clearTimeout(this.__hoverStyleTimeId), window.__hoverStyleTimeId == this.__hoverStyleTimeId && (window.__hoverStyleTimeId = void 0), this.__hoverStyleTimeId = void 0), this._hoverReset()
    },
    _hoverReset: function () {
        "none" == this.hoverStyle || "none" == this.hoverClass || (this.hoverClass ? this.$.dom.classList.remove(this.hoverClass) : this.$.dom.classList.remove(this.is.replace("wx-", "") + "-hover"))
    }
}), window.exparser.registerBehavior({
    is: "wx-input-base",
    properties: {
        focus: {type: Number, value: 0, observer: "_focusChange"},
        autoFocus: {type: Boolean, value: !1, reflectToAttribute: !0},
        placeholder: {type: String, value: "", reflectToAttribute: !0, observer: "_placeholderChange"},
        placeholderStyle: {type: String, value: ""},
        placeholderClass: {type: String, value: ""},
        formate: {type: String},
        formatePm: {type: String, value: "下午"},
        formateAm: {type: String, value: "上午"},
        fields: {type: String, value: "day", reflectToAttribute: !0},
        start: {type: String, value: ""},
        end: {type: String, value: ""},
        value: {type: String, value: "", coerce: "_valueChange", public: !0},
        showValue: {type: String, value: "", observer: "_showValueChange"},
        maxlength: {type: Number, value: 140, observer: "_maxlengthChanged", reflectToAttribute: !0},
        type: {type: String, value: "text", reflectToAttribute: !0},
        password: {type: Boolean, value: !1, reflectToAttribute: !0},
        disabled: {type: Boolean, value: !1, reflectToAttribute: !0},
        bindinput: {type: String, value: ""}
    },
    resetFormData: function () {
        this._keyboardShow && (this.__formResetCallback = !0, wx.hideKeyboard()), this.value = "", this.showValue = ""
    },
    getFormData: function (e) {
        this._keyboardShow ? this.__formCallback = e : "function" == typeof e && e(this.value)
    },
    _formGetDataCallback: function () {
        "function" == typeof this.__formCallback && this.__formCallback(this.value), this.__formCallback = void 0
    },
    _focusChange: function (e) {
        this._couldFocus(Boolean(e))
    },
    _couldFocus: function (e) {
        !this._keyboardShow && this._attached && e && this._inputFocus()
    },
    _placeholderChange: function () {
        this._checkPlaceholderStyle(this.value)
    },
    _getPlaceholderClass: function (e) {
        return e ? e : "input-placeholder"
    },
    _checkPlaceholderStyle: function (e) {
        e ? (this.$.input.style.display = "flex", this.$.input.style.display = "-ms-flexbox", this.$.input.style.display = "-webkit-box", this.$.placeholder.style.display = "none") : (this.$.input.style.display = "none", this.$.placeholder.style.display = "flex", this.$.placeholder.style.display = "-ms-flexbox", this.$.placeholder.style.display = "-webkit-box")
    },
    _showValueFormate: function (e) {
        this.password || "password" == this.type ? this.showValue = e ? new Array(e.length + 1).join("●") : "" : this.showValue = e
    },
    _maxlengthChanged: function (e, t) {
        if ("date" != this.type && "time" != this.type) {
            var n = this.value.slice(0, e);
            n != this.value && (this.value = n)
        }
    },
    _valueChange: function (e, t) {
        return console.info("!!! " + t + " => " + e), this._keyboardShow || ("date" != this.type && "time" != this.type && this.maxlength > 0 && (e = e.slice(0, this.maxlength)), this._checkPlaceholderStyle(e)), this._showValueFormate(e), e
    },
    _showValueChange: function (e) {
        return e
    }
}), window.exparser.registerBehavior({
    is: "wx-item",
    properties: {
        value: {type: String, public: !0, observer: "valueChange"},
        checked: {type: Boolean, value: !1, observer: "checkedChange", public: !0}
    },
    valueChange: function (e, t) {
        this.triggerEvent("itemNameChange", {newval: e, oldval: t})
    },
    checkedChange: function (e, t) {
        this.triggerEvent("itemCheckedChange", {newval: e, oldval: t})
    },
    attached: function () {
        this.triggerEvent("itemNameChange", {
            newval: this.value,
            oldval: void 0
        }), this.triggerEvent("itemCheckedChange", {newval: this.checked, oldval: void 0})
    },
    itemCheck: function () {
        this.triggerEvent("itemCheck", {value: this.value})
    },
    resetFormData: function () {
        this.checked = !1
    }
}), window.exparser.registerBehavior({
    is: "wx-label-target", properties: {}, handleLabelTap: function () {
    }
}), window.exparser.registerBehavior({
    is: "wx-mask-behavior",
    properties: {mask: {type: Boolean, value: !1, reflectToAttribute: !0}},
    _getMaskStyle: function (e) {
        return e ? "" : "background-color: transparent"
    }
}), window.exparser.registerBehavior({
    is: "wx-player",
    properties: {
        src: {type: String, reflectToAttribute: !0, observer: "srcChanged"},
        poster: {type: String, reflectToAttribute: !0, observer: "posterChanged"},
        _buttonType: {type: String, value: "play"},
        _currentTime: {type: String, value: "00:00"},
        _duration: {type: String, value: "00:00"}
    },
    _formatTime: function (e) {
        var t = Math.floor(e / 3600), n = Math.floor((e - 3600 * t) / 60), i = e - 3600 * t - 60 * n;
        return 0 == t ? (n >= 10 ? n : "0" + n) + ":" + (i >= 10 ? i : "0" + i) : (t >= 10 ? t : "0" + t) + ":" + (n >= 10 ? n : "0" + n) + ":" + (i >= 10 ? i : "0" + i)
    },
    _publish: function (e, t) {
        this.triggerEvent(e, t)
    },
    attached: function () {
        var e = this.$.player, t = this, n = {};
        for (var i in MediaError)n[MediaError[i]] = i;
        e.onerror = function (e) {
            if (e.stopPropagation(), e.srcElement.error) {
                var i = e.srcElement.error.code;
                t._publish("error", {errMsg: n[i]}), console.log(n[i])
            }
        }, e.onplay = function (n) {
            n.stopPropagation(), "AUDIO" == e.tagName && t._publish("play", {}), t._buttonType = "pause"
        }, e.onpause = function (n) {
            n.stopPropagation(), "AUDIO" == e.tagName && t._publish("pause", {}), t._buttonType = "play"
        }, "AUDIO" == e.tagName && (e.onratechange = function (n) {
            n.stopPropagation(), t._publish("ratechange", {playbackRate: e.playbackRate})
        }, e.onended = function (e) {
            e.stopPropagation(), t._publish("ended", {})
        });
        var r = 0;
        e.addEventListener("timeupdate", function (n) {
            n.stopPropagation(), "AUDIO" == e.tagName && Math.abs(e.currentTime - r) % e.duration >= 1 && (t._publish("timeupdate", {
                currentTime: e.currentTime,
                duration: e.duration
            }), r = 1e3 * e.currentTime), t._currentTime = t._formatTime(Math.floor(e.currentTime)), t._duration = t._formatTime(Math.floor(e.duration))
        })
    }
}), window.exparser.registerElement({
    is: "wx-native",
    properties: {
        hidden: {type: Boolean, value: !1, reflectToAttribute: !0, observer: "hiddenChanged"},
        _isReady: {type: Boolean, value: !1},
        _deferred: {type: Array, value: []},
        _isError: {type: Boolean, value: !1},
        _box: {type: Object, value: {left: 0, top: 0, width: 0, height: 0}}
    },
    _isiOS: function () {
        var e = window.navigator.userAgent.toLowerCase();
        return !/wechatdevtools/.test(e) && /iphone/.test(e)
    },
    _isAndroid: function () {
        var e = window.navigator.userAgent.toLowerCase();
        return !/wechatdevtools/.test(e) && /android/.test(e)
    },
    _isMobile: function () {
        var e = window.navigator.userAgent.toLowerCase();
        return !/wechatdevtools/.test(e) && (/iphone/.test(e) || /android/.test(e))
    },
    _getBox: function () {
        var e = this.$.dom.getBoundingClientRect(), t = {
            left: e.left + window.scrollX,
            top: e.top + window.scrollY,
            width: this.$.dom.offsetWidth,
            height: this.$.dom.offsetHeight
        };
        return t
    },
    _diff: function () {
        var e = this._getBox(), t = !1;
        for (var n in e)t = t || e[n] != this._box[n];
        return t
    },
    _ready: function () {
        this._isReady = !0, this._deferred.forEach(function (e) {
            this[e.callback].apply(this, e.args)
        }, this), this._deferred = []
    },
    hiddenChanged: function (e, t) {
        if (!this._isError)return this._isReady ? void this._hiddenChanged(e, t) : void this._deferred.push({
            callback: "hiddenChanged",
            args: [e, t]
        })
    },
    _pageReRenderCallback: function () {
        this._isError || this._diff() && (this._box = this._getBox(), this._updatePosition())
    }
}), window.exparser.registerElement({
    is: "wx-action-sheet",
    template: '\n    <div class="wx-action-sheet-mask" id="mask" style.z-index="1000" style="display: none;"></div>\n    <div class="wx-action-sheet" class.wx-action-sheet-show="{{!hidden}}">\n      <div class="wx-action-sheet-menu">\n        <wx-content></wx-content>\n      </div>\n    </div>\n  ',
    behaviors: ["wx-base"],
    properties: {hidden: {type: Boolean, value: !0, observer: "hiddenChange"}},
    listeners: {"mask.tap": "hide", actionSheetCancel: "cancel"},
    cancel: function (e) {
        return this.hide(), !1
    },
    hide: function () {
        this.triggerEvent("change", {}, !0)
    },
    hiddenChange: function (e) {
        var t = this.$.mask;
        e ? (setTimeout(function () {
            t.style.display = "none"
        }, 300), t.style.backgroundColor = "rgba(0,0,0,0)") : (t.style.display = "block", t.focus(), t.style.backgroundColor = "rgba(0,0,0,0.6)")
    }
}), window.exparser.registerElement({
    is: "wx-action-sheet-cancel",
    template: '\n    <div class="wx-action-sheet-middle" id="middle"></div>\n    <div class="wx-action-sheet-cancel" id="cancel">\n      <wx-content></wx-content>\n    </div>\n  ',
    properties: {},
    listeners: {"middle.tap": "handleMiddleTap", "cancel.tap": "handleCancelTap"},
    behaviors: ["wx-base"],
    handleMiddleTap: function (e) {
        return !1
    },
    handleCancelTap: function (e) {
        this.triggerEvent("actionSheetCancel")
    }
}), window.exparser.registerElement({
    is: "wx-action-sheet-item",
    template: "\n    <wx-content></wx-content>\n  ",
    properties: {},
    behaviors: ["wx-base"]
}), window.exparser.registerElement({
    is: "wx-audio",
    behaviors: ["wx-base", "wx-player"],
    template: '<audio id="player" loop$="{{loop}}" style="display: none;"></audio>\n  <div id="default" class="default" style="display: none;">\n    <div id="poster" class="left">\n      <div id="button" class$="button {{_buttonType}}"></div>\n    </div>\n    <div class="right">\n      <div class="time" parse-text-content>{{_currentTime}}</div>\n      <div class="info">\n        <div class="name" parse-text-content>{{name}}</div>\n        <div class="author" parse-text-content>{{author}}</div>\n      </div>\n    </div>\n  </div>\n  <div id="fakebutton"></div>',
    properties: {
        action: {type: Object, observer: "actionChanged"},
        name: {type: String, value: "未知歌曲"},
        author: {type: String, value: "未知作者"},
        loop: {type: Boolean, value: !1, reflectToAttribute: !0},
        controls: {type: Boolean, value: !1, reflectToAttribute: !0, observer: "controlsChanged"},
        _srcTimer: {type: Number},
        _actionTimer: {type: Number},
        _canSrc: {type: Boolean, value: !0},
        _deferredSrc: {type: String, value: ""},
        _canAction: {type: Boolean, value: !1},
        _deferredAction: {type: Array, value: []}
    },
    _reset: function () {
        this._buttonType = "play", this._currentTime = "00:00", this._duration = "00:00"
    },
    _readySrc: function () {
        this._canSrc = !0, this.srcChanged(this._deferredSrc), this._deferredSrc = ""
    },
    _readyAction: function () {
        this._canAction = !0, this._deferredAction.forEach(function (e) {
            this.actionChanged(e)
        }, this), this._deferredAction = []
    },
    srcChanged: function (e, t) {
        if (e) {
            console.log("音频组件: 更新资源 " + e), clearTimeout(this._srcTimer), this._canAction = !1, this.$.player.src = e;
            var n = this;
            this._srcTimer = setTimeout(function () {
                n._reset(), n._readyAction()
            }, 0)
        }
    },
    posterChanged: function (e, t) {
        this.$.poster.style.backgroundImage = "url('" + e + "')"
    },
    controlsChanged: function (e, t) {
        this.$.default.style.display = e ? "" : "none"
    },
    actionChanged: function (e, t) {
        if (console.log("有新动作"), console.log(e), e) {
            if (!this._canAction)return void this._deferredAction.push(e);
            var n = e.method, i = null;
            if (null != (i = /^set([a-z|A-Z]*)/.exec(n))) {
                var r = i[1], o = e.data;
                r = r[0].toLowerCase() + r.slice(1), "playbackRate" == r || "currentTime" == r ? this.$.player[r] = o : this._publishError(i[1] + " is not a action")
            } else"play" != n && "pause" != n || this.$.fakebutton.click();
            this.action = null
        }
    },
    attached: function () {
        var e = this.$.player, t = this;
        this.$.button.onclick = function (e) {
            e.stopPropagation(), t.action = {method: t._buttonType}
        }, this.$.fakebutton.onclick = function (n) {
            n.stopPropagation(), e[t.action.method]()
        }
    }
}), window.exparser.registerElement({
    is: "wx-button",
    template: "\n    <wx-content></wx-content>\n  ",
    behaviors: ["wx-base", "wx-hover", "wx-label-target"],
    properties: {
        type: {type: String, value: "default", reflectToAttribute: !0},
        size: {type: String, value: "default", reflectToAttribute: !0},
        disabled: {type: Boolean, reflectToAttribute: !0},
        plain: {type: Boolean, reflectToAttribute: !0},
        loading: {type: Boolean, reflectToAttribute: !0},
        formType: {type: String, reflectToAttribute: !0}
    },
    listeners: {tap: "handleLabelTap"},
    handleLabelTap: function () {
        return !this.disabled && void("submit" === this.formType ? this.triggerEvent("formSubmit") : "reset" === this.formType && this.triggerEvent("formReset"))
    }
}), function () {
    function e(e, t, n, i) {
        n = Array.prototype.slice.call(n);
        var r = e + "." + t + "(" + n.map(function (e) {
                return "string" == typeof e ? "'" + e + "'" : e
            }).join(", ") + ")";
        return i && (r = i + " = " + r), r
    }

    function t(e) {
        var t = e.slice(0);
        return t[3] = t[3] / 255, "rgba(" + t.join(",") + ")"
    }

    window.exparser.registerElement({
        is: "wx-canvas",
        behaviors: ["wx-base", "wx-native"],
        template: '<canvas id="canvas" width="300" height="150"></canvas>',
        properties: {canvasId: {type: String, reflectToAttribute: !0}, _style: {type: Object, value: {}}},
        _updatePosition: function () {
            this.$.canvas.width = this._box.width, this.$.canvas.height = this._box.height, this._isMobile() ? WeixinJSBridge.invoke("updateCanvas", {
                canvasId: this._canvasNumber,
                position: this._box
            }, function (e) {
            }) : this.actionsChanged(this.actions)
        },
        attached: function () {
            var e = (this.$.canvas, this);
            if (this._image = new Image, this._box = this._getBox(), this.$.canvas.width = this.$.dom.offsetWidth, this.$.canvas.height = this.$.dom.offsetHeight, !this.canvasId)return this.triggerEvent("error", {errMsg: "canvas-id attribute is undefined"}), this._isError = !0, void(this.$.dom.style.display = "none");
            window.__canvasNumber__ = window.__canvasNumber__ || {};
            var t = __webviewId__ + "canvas" + this.canvasId;
            if ("number" == typeof window.__canvasNumber__[t])return this.triggerEvent("error", {errMsg: "canvas-id " + e.canvasId + " in this page has already existed"}), this._isError = !0, void(this.$.dom.style.display = "none");
            for (var n in window.__canvasNumber__);
            "undefined" == typeof n ? window.__canvasNumber__[t] = 1e3 : window.__canvasNumber__[t] = window.__canvasNumber__[n] + 1, this._canvasNumber = window.__canvasNumber__[t], this._isMobile() ? (e._isReady = !1, WeixinJSBridge.invoke("insertCanvas", {
                canvasId: e._canvasNumber,
                position: e._box,
                hide: this.hidden
            }, function (t) {
                WeixinJSBridge.publish("canvasInsert", {
                    canvasId: e.canvasId,
                    canvasNumber: e._canvasNumber
                }), e._ready(), document.addEventListener("pageReRender", e._pageReRenderCallback.bind(e))
            })) : (WeixinJSBridge.publish("canvasInsert", {
                canvasId: e.canvasId,
                canvasNumber: e._canvasNumber
            }), WeixinJSBridge.subscribe("canvas" + e._canvasNumber + "actionsChanged", function (t) {
                e.actions = t, e.actionsChanged(t)
            }), e._ready(), document.addEventListener("pageReRender", e._pageReRenderCallback.bind(e)))
        },
        detached: function () {
            var e = __webviewId__ + "canvas" + this.canvasId;
            delete window.__canvasNumber__[e], this._isMobile() && WeixinJSBridge.invoke("removeCanvas", {canvasId: this._canvasNumber}, function (e) {
            }), WeixinJSBridge.publish("canvasRemove", {canvasId: this.canvasId, canvasNumber: this._canvasNumber})
        },
        actionsChanged: function (n, i) {
            if (!this._isMobile() && n) {
                var r = this.$.canvas, o = r.getContext("2d"), a = this;
                o.clearRect(0, 0, r.width, r.height), n.forEach(function (n) {
                    var i = n.method, r = n.data;
                    if (/^set/.test(i)) {
                        var s = i[3].toLowerCase() + i.slice(4), c = void 0, l = "";
                        if ("fillStyle" == s || "strokeStyle" == s) {
                            if ("normal" == r[0])l = c = t(r[1]); else if ("linear" == r[0]) {
                                var c = o.createLinearGradient.apply(o, r[1]);
                                l = "context.createLinearGradient(" + r[1].join(",") + ")", r[2].forEach(function (e) {
                                    var n = e[0], i = t(e[1]);
                                    c.addColorStop(n, i), l += ".addColorStop(" + i + ")"
                                })
                            } else if ("radial" == r[0]) {
                                var d = r[1][0], u = r[1][1], h = r[1][2], p = [d, u, 0, d, u, h], c = o.createRadialGradient.apply(o, p);
                                l = e("context", "createRadialGradient", p), r[2].forEach(function (e) {
                                    var n = e[0], i = t(e[1]);
                                    c.addColorStop(n, i), l += ".addColorStop(" + i + ")"
                                })
                            }
                            a._style[s] = c
                        } else if ("shadow" == s) {
                            var A = ["shadowOffsetX", "shadowOffsetY", "shadowBlur", "shadowColor"];
                            r.forEach(function (e, n) {
                                a._style[A[n]] = e, "shadowColor" == A[n] && (a._style.shadowColor = t(e))
                            })
                        } else"fontSize" == s ? a._style[s] = r[0] : a._style[s] = r[0]
                    } else if ("fillPath" == i || "strokePath" == i || "fillText" == i) {
                        i = i.replace(/Path/, ""), o.save();
                        for (var d in a._style)"fontSize" == d ? o.font = o.font.replace(/\d+\.?\d*px/, a._style.fontSize + "px") : o[d] = a._style[d];
                        if ("fill" == i || "stroke" == i) {
                            o.beginPath();
                            var g = r;
                            g.forEach(function (e) {
                                if ("arc" == e.method) {
                                    var t = e.data[3] + e.data[4];
                                    e.data[4] = t, o.arc.apply(o, e.data)
                                } else o[e.method].apply(o, e.data)
                            }), o[i]()
                        } else o[i].apply(o, r);
                        o.restore()
                    } else"drawImage" == i ? (this._image.src = r[0], r[0] = this._image, this._image.onload = function () {
                        o.drawImage.apply(o, r)
                    }) : o[i].apply(o, r)
                }, this)
            }
        },
        _hiddenChanged: function (e, t) {
            this._isMobile() ? (this.$.dom.style.display = e ? "none" : "", WeixinJSBridge.invoke("updateCanvas", {
                canvasId: this._canvasNumber,
                hide: e
            }, function (e) {
                console.log(e)
            })) : this.$.dom.style.display = e ? "none" : ""
        }
    })
}(), window.exparser.registerElement({
    is: "wx-checkbox-group",
    template: '\n    <span id="wrapper"><wx-content></wx-content></span>\n  ',
    behaviors: ["wx-base", "wx-data-component", "wx-group"],
    properties: {value: {type: Array, value: [], reflectToAttribute: !0}},
    remove: function (e) {
        if (void 0 !== e) {
            var t = this.value.indexOf(e);
            t !== -1 && this.value.splice(t, 1)
        }
    },
    add: function (e) {
        void 0 !== e && this.value.indexOf(e) === -1 && this.value.push(e)
    },
    handleItemCheckedChange: function (e) {
        return e.target.checked ? this.add(e.target.value) : this.remove(e.target.value), !1
    },
    handleItemNameChange: function (e) {
        return e.target.checked && (this.remove(e.detail.oldval), this.add(e.detail.newval)), !1
    },
    handleCheck: function () {
        return this.triggerEvent("change", {value: this.value}, !0), !1
    }
}), window.exparser.registerElement({
    is: "wx-checkbox",
    template: '\n    <input id="input" type="checkbox" checked:="{{checked}}" disabled$="{{disabled}}" />\n    <wx-content></wx-content>\n  ',
    behaviors: ["wx-base", "wx-label-target", "wx-item", "wx-disabled"],
    properties: {},
    listeners: {"input.change": "inputChange"},
    handleLabelTap: function (e) {
        this.disabled || (this.checked = !this.checked, this.inputChange())
    },
    inputChange: function (e) {
        this.checked = this.$.input.checked, this.itemCheck()
    }
}), window.exparser.registerElement({
    is: "wx-form",
    template: '\n    <span id="wrapper"><wx-content></wx-content></span>\n  ',
    behaviors: ["wx-base"],
    properties: {reportSubmit: {type: Boolean, value: !1}},
    listeners: {formSubmit: "submitHandler", formReset: "resetHandler"},
    resetDfs: function (e) {
        if (e.childNodes)for (var t = 0; t < e.childNodes.length; ++t) {
            var n = e.childNodes[t];
            n instanceof exparser.Element && (n.hasBehavior("wx-data-component") && n.resetFormData(), this.resetDfs(n))
        }
    },
    getFormData: function (e, t) {
        return e.name && e.hasBehavior("wx-data-component") ? "WX-INPUT" === e.__domElement.tagName || "WX-PICKER" === e.__domElement.tagName ? e.getFormData(function (e) {
            t(e)
        }) : t(e.getFormData()) : t()
    },
    asyncDfs: function (e, t) {
        var n = this, i = function () {
            "function" == typeof t && t(), t = void 0
        };
        if (!e.childNodes)return i();
        for (var r = e.childNodes.length, o = 0; o < e.childNodes.length; ++o) {
            var a = e.childNodes[o];
            a instanceof exparser.Element ? !function (e) {
                n.getFormData(e, function (t) {
                    "undefined" != typeof t && (n._data[e.name] = t), n.asyncDfs(e, function () {
                        0 == --r && i()
                    })
                })
            }(a) : --r
        }
        0 == r && i()
    },
    submitHandler: function () {
        var e = this;
        return this._data = Object.create(null), this.asyncDfs(this, function () {
            e.reportSubmit && !e._isDevTools() ? WeixinJSBridge.invoke("reportSubmitForm", {}, function (t) {
                e.triggerEvent("submit", {value: e._data, formId: t.formId}, !0)
            }) : e.triggerEvent("submit", {value: e._data}, !0)
        }), !1
    },
    resetHandler: function () {
        return this._data = Object.create(null), this.resetDfs(this), this.triggerEvent("reset", {}, !0), !1
    }
}), window.exparser.registerElement({
    is: "wx-icon",
    template: '<i class$="wx-icon-{{type}}" style.color="{{color}}" style.font-size="{{size}}px"></i>',
    behaviors: ["wx-base"],
    properties: {
        type: {type: String, reflectToAttribute: !0},
        size: {type: Number, value: 23, reflectToAttribute: !0},
        color: {type: String, reflectToAttribute: !0}
    }
}), window.exparser.registerElement({
    is: "wx-image",
    template: '<div id="div"></div>',
    behaviors: ["wx-base"],
    properties: {
        src: {type: String, reflectToAttribute: !0, observer: "srcChanged"},
        mode: {type: String, reflectToAttribute: !0, observer: "modeChanged"},
        _disableSizePositionRepeat: {type: Boolean, value: !1},
        backgroundSize: {type: String, observer: "backgroundSizeChanged", value: "100% 100%", reflectToAttribute: !0},
        backgroundPosition: {type: String, observer: "backgroundPositionChanged", reflectToAttribute: !0},
        backgroundRepeat: {
            type: String,
            observer: "backgroundRepeatChanged",
            value: "no-repeat",
            reflectToAttribute: !0
        },
        _img: {type: Object}
    },
    _publishError: function (e) {
        this.triggerEvent("error", e)
    },
    _ready: function () {
        if (!(this._img && this._img instanceof Image)) {
            this._img = new Image;
            var e = this;
            this._img.onerror = function (t) {
                t.stopPropagation();
                var n = {errMsg: "GET " + e._img.src + " 404 (Not Found)"};
                e._publishError(n)
            }, this._img.onload = function (t) {
                t.stopPropagation(), e.triggerEvent("load", {})
            }
        }
    },
    attached: function () {
        this._ready(), this.backgroundSizeChanged(this.backgroundSize), this.backgroundRepeatChanged(this.backgroundRepeat)
    },
    _srcChanged: function (e) {
        this._img.src = e, this.$.div.style.backgroundImage = "url('" + e + "')"
    },
    srcChanged: function (e, t) {
        if (e) {
            var n = (this.$.div, window.navigator.userAgent.toLowerCase()), i = this;
            this._ready();
            var r = {
                success: function (e) {
                    i._srcChanged(e.localData)
                }, fail: function (e) {
                    i._publishError(e)
                }
            };
            !/wechatdevtools/.test(n) && /iphone/.test(n) ? /^(http|https):\/\//.test(e) ? this._srcChanged(e) : /^wxfile:\/\//.test(e) ? (r.filePath = e, wx.getLocalImgData(r)) : (r.path = e, wx.getLocalImgData(r)) : !/wechatdevtools/.test(n) && /android/.test(n) ? /^wxfile:\/\//.test(e) || /^(http|https):\/\//.test(e) ? this._srcChanged(e) : wx.getCurrentRoute({
                success: function (t) {
                    console.log(t), console.log(t.route);
                    var n = wx.getRealRoute(t.route, e);
                    console.log(n), i._srcChanged(n)
                }
            }) : this._srcChanged(e)
        }
    },
    _checkMode: function (e) {
        for (var t = ["scaleToFill", "aspectFit", "aspectFill", "top", "bottom", "center", "left", "right", "top left", "top right", "bottom left", "bottom right"], n = !1, i = 0; i < t.length; i++)if (e == t[i]) {
            n = !0;
            break
        }
        return n
    },
    modeChanged: function (e, t) {
        if (!this._checkMode(e))return void(this._disableSizePositionRepeat = !1);
        switch (this._disableSizePositionRepeat = !0, this.$.div.style.backgroundSize = "auto auto", this.$.div.style.backgroundPosition = "0% 0%", this.$.div.style.backgroundRepeat = "no-repeat", e) {
            case"scaleToFill":
                this.$.div.style.backgroundSize = "100% 100%";
                break;
            case"aspectFit":
                this.$.div.style.backgroundSize = "contain", this.$.div.style.backgroundPosition = "center center";
                break;
            case"aspectFill":
                this.$.div.style.backgroundSize = "cover", this.$.div.style.backgroundPosition = "center center";
                break;
            case"top":
                this.$.div.style.backgroundPosition = "top center";
                break;
            case"bottom":
                this.$.div.style.backgroundPosition = "bottom center";
                break;
            case"center":
                this.$.div.style.backgroundPosition = "center center";
                break;
            case"left":
                this.$.div.style.backgroundPosition = "center left";
                break;
            case"right":
                this.$.div.style.backgroundPosition = "center right";
                break;
            case"top left":
                this.$.div.style.backgroundPosition = "top left";
                break;
            case"top right":
                this.$.div.style.backgroundPosition = "top right";
                break;
            case"bottom left":
                this.$.div.style.backgroundPosition = "bottom left";
                break;
            case"bottom right":
                this.$.div.style.backgroundPosition = "bottom right"
        }
    },
    backgroundSizeChanged: function (e, t) {
        this._disableSizePositionRepeat || (this.$.div.style.backgroundSize = e)
    },
    backgroundPositionChanged: function (e, t) {
        this._disableSizePositionRepeat || (this.$.div.style.backgroundPosition = e)
    },
    backgroundRepeatChanged: function (e, t) {
        this._disableSizePositionRepeat || (this.$.div.style.backgroundRepeat = e)
    }
}), /wechatdevtools/.test(window.navigator.userAgent.toLowerCase()) && window.exparser.registerElement({
    is: "wx-input",
    template: '\n    <div id="wrapper" disabled$="{{disabled}}">\n      <p id="placeholder" class$="{{_getPlaceholderClass(placeholderClass)}}" style$="{{placeholderStyle}}" parse-text-content>{{placeholder}}</p>\n      <input id="input" type$="{{_getType(type,password)}}" maxlength$="{{maxlength}}" value$="{{showValue}}" disabled$="{{disabled}}" >\n    </div>\n    ',
    behaviors: ["wx-base", "wx-data-component", "wx-input-base"],
    properties: {},
    listeners: {
        touchend: "_inputFocus",
        "input.focus": "_inputFocus",
        "input.blur": "_inputBlur",
        "input.change": "_inputChange",
        "input.input": "_inputKey"
    },
    attached: function () {
        var e = this;
        this._checkPlaceholderStyle(this.value), this._attached = !0, window.__onAppRouteDone && this._couldFocus(this.autoFocus), exparser.addListenerToElement(document, "routeDone", function () {
            e._couldFocus(e.autoFocus)
        }), exparser.addListenerToElement(document, "setKeyboardValue", function (t) {
            if (e._keyboardShow) {
                e.value = t.detail.value;
                var n = t.detail.cursor;
                "undefined" != typeof n && n != -1 && e.$.input.setSelectionRange(n, n)
            }
        }), exparser.addListenerToElement(document, "hideKeyboard", function (t) {
            e.$.input.blur()
        }), this.autoFocus && setTimeout(function () {
            e._couldFocus(e.autoFocus)
        }, 500)
    },
    _getType: function (e, t) {
        return t || "password" == e ? "password" : "text"
    },
    _showValueChange: function (e) {
        this.$.input.value = e
    },
    _inputFocus: function (e) {
        this.disabled || (console.log("focus"), this._keyboardShow = !0, this.triggerEvent("focus", {value: this.value}, !0), this.$.placeholder.style.display = "none", this.$.input.style.display = "flex", this.$.input.focus())
    },
    _inputBlur: function (e) {
        this._keyboardShow = !1, this.focus = 0, this.triggerEvent("blur", {value: this.value}, !0), this._checkPlaceholderStyle(this.value)
    },
    _inputKey: function (e) {
        if (this.bindinput) {
            var t = {
                id: this.$.dom.id,
                dataset: this.$.dom.dataset,
                offsetTop: this.$.dom.offsetTop,
                offsetLeft: this.$.dom.offsetLeft
            };
            WeixinJSBridge.publish("SPECIAL_PAGE_EVENT", {
                eventName: this.bindinput,
                data: {
                    data: {
                        type: "input",
                        timestamp: Date.now(),
                        detail: {value: e.target.value, cursor: this.$.input.selectionStart},
                        target: t,
                        currentTarget: t,
                        touches: []
                    }, eventName: this.bindinput
                }
            })
        }
        return !1
    },
    _inputChange: function (e) {
        var t = e.target.value;
        this.value = t, this.triggerEvent("change", {value: t}, !0), this._formGetDataCallback()
    }
}), /wechatdevtools/.test(window.navigator.userAgent.toLowerCase()) || window.exparser.registerElement({
    is: "wx-input",
    template: '\n    <div id="wrapper" disabled$="{{disabled}}">\n      <p id="placeholder" class$="{{_getPlaceholderClass(placeholderClass)}}" style$="{{placeholderStyle}}" parse-text-content>{{placeholder}}</p>\n      <p id="input" parse-text-content keep-white-space>{{showValue}}</p>\n    </div>\n  ',
    behaviors: ["wx-base", "wx-data-component", "wx-input-base"],
    properties: {},
    listeners: {touchend: "_inputFocus"},
    attached: function () {
        var e = this;
        this._checkPlaceholderStyle(this.value), this._attached = !0, window.__onAppRouteDone && this._couldFocus(this.autoFocus), exparser.addListenerToElement(document, "routeDone", function () {
            e._couldFocus(e.autoFocus)
        }), exparser.addListenerToElement(document, "onKeyboardComplete", function (t) {
            t.detail.inputId == e._inputId && (e.value = t.detail.value, e.__formResetCallback && (e.value = "", e.__formResetCallback = void 0), e.triggerEvent("change", {value: e.value}, !0), e.triggerEvent("blur", {value: e.value}, !0), e._formGetDataCallback(), e._showValueFormate(e.value), e._resetInputState())
        }), exparser.addListenerToElement(document, "touchstart", function () {
            e._keyboardShow && (console.info("hideKeyboard"), wx.hideKeyboard())
        })
    },
    _getType: function () {
        this._showValueFormate(this.value)
    },
    _inputFocus: function (e) {
        if (!this.disabled) {
            if (this.triggerEvent("focus", {value: this.value}, !0), this._keyboardShow)return !0;
            var t = this.$.wrapper;
            this._placeholder = this.placeholder, this.placeholder = "";
            try {
                var n = window.getComputedStyle(t), i = ["Left", "Right"].map(function (e) {
                    return parseInt(n["border" + e + "Width"]) + parseInt(n["padding" + e])
                }), r = ["Top", "Bottom"].map(function (e) {
                    return parseInt(n["border" + e + "Width"]) + parseInt(n["padding" + e])
                }), o = t.getBoundingClientRect(), a = parseInt(n.fontWeight);
                isNaN(a) ? a = n.fontWeight : a < 500 ? a = "normal" : a >= 500 && (a = "bold");
                var s = {
                    width: o.width - i[0] - i[1],
                    height: o.height - r[0] - r[1],
                    left: o.left + i[0] + window.scrollX,
                    top: o.top + r[0] + window.scrollY,
                    fontFamily: n.fontFamily,
                    fontSize: parseFloat(n.fontSize) || 14,
                    fontWeight: a,
                    color: this._getHexColor(n.color),
                    backgroundColor: "#00000000"
                };
                console.info(JSON.stringify(s)), this._showNativeInput(s)
            } catch (e) {
                this._resetInputState()
            }
            return !1
        }
    },
    _valueChange: function (e, t) {
        return this._keyboardShow || ("date" != this.type && "time" != this.type && this.maxlength > 0 && (e = e.slice(0, this.maxlength)), this._checkPlaceholderStyle(e), this._showValueFormate(e)), e
    },
    _showNativeInput: function (e) {
        var t = this, n = {
            bindinput: this.bindinput,
            target: {
                id: this.$.dom.id,
                dataset: this.$.dom.dataset,
                offsetTop: this.$.dom.offsetTop,
                offsetLeft: this.$.dom.offsetLeft
            }
        };
        wx.showKeyboard({
            type: "password" == this.type ? "text" : this.type,
            maxLength: this.maxlength,
            defaultValue: this.value,
            password: this.password || "password" == this.type,
            style: e,
            data: this.bindinput ? JSON.stringify(n) : "",
            success: function (e) {
                /:ok/.test(e.errMsg) ? (t._inputId = e.inputId, t._keyboardShow = !0, t.showValue = " ") : console.error(e.errMsg)
            }
        })
    },
    _resetInputState: function () {
        this._keyboardShow = !1, this._inputId = void 0, "undefined" != typeof this._placeholder && (this.placeholder = this._placeholder, this._placeholder = void 0), this.focus = 0, this._checkPlaceholderStyle(this.value)
    },
    _getHexColor: function (e) {
        if (e.indexOf("#") >= 0)return e;
        var t = e.match(/\d+/g), n = parseInt(t[0]);
        n = n > 9 ? n.toString(16) : "0" + n;
        var i = parseInt(t[1]);
        i = i > 9 ? i.toString(16) : "0" + i;
        var r = parseInt(t[2]);
        r = r > 9 ? r.toString(16) : "0" + r;
        var o = "#" + n + i + r;
        if (t.length > 3) {
            var a = parseFloat(t.slice(3).join("."));
            0 == a ? o += "00" : a >= 1 ? o += "ff" : (a = parseInt(255 * a), a = a > 9 ? a.toString(16) : "0" + a, o += a)
        }
        return o
    }
}), window.exparser.registerElement({
    is: "wx-label",
    template: "\n    <wx-content></wx-content>\n  ",
    properties: {for: {type: String, reflectToAttribute: !0}},
    listeners: {tap: "onTap"},
    behaviors: ["wx-base"],
    handleNode: function (e) {
        return !!(e instanceof exparser.Element && e.hasBehavior("wx-label-target")) && (e.handleLabelTap(), !0)
    },
    dfs: function (e) {
        if (this.handleNode(e))return !0;
        if (!e.childNodes)return !1;
        for (var t = 0; t < e.childNodes.length; ++t)if (this.dfs(e.childNodes[t]))return !0;
        return !1
    },
    onTap: function (e) {
        for (var t = e.target; t !== this; t = t.parentNode)if (t instanceof exparser.Element && t.hasBehavior("wx-label-target"))return;
        if (this.for) {
            var n = document.getElementById(this.for);
            n && this.handleNode(n.__wxElement)
        } else this.dfs(this)
    }
}), window.exparser.registerElement({
    is: "wx-loading",
    template: '\n    <div class="wx-loading-mask" style$="background-color: transparent;"></div>\n    <div class="wx-loading">\n      <i class="wx-loading-icon"></i><p class="wx-loading-content"><wx-content></wx-content></p>\n    </div>\n  ',
    behaviors: ["wx-base"]
}), window.exparser.registerElement({
    is: "wx-map",
    behaviors: ["wx-base", "wx-native"],
    template: '<div id="map" style="width: 100%; height: 100%;"></div>',
    properties: {
        latitude: {type: Number, reflectToAttribute: !0, observer: "latitudeChanged", value: 39.92},
        longitude: {type: Number, reflectToAttribute: !0, observer: "longitudeChanged", value: 116.46},
        scale: {type: Number, reflectToAttribute: !0, observer: "scaleChanged", scale: 16},
        markers: {type: Array, value: [], reflectToAttribute: !1, observer: "markersChanged"},
        covers: {type: Array, value: [], reflectToAttribute: !1, observer: "coversChanged"},
        _mapId: {type: Number}
    },
    _delay: function (e, t, n) {
        this._deferred.push({callback: e, args: [t, n]})
    },
    _update: function (e, t) {
        e.mapId = this._mapId, e.hide = this.hidden, WeixinJSBridge.invoke("updateMap", e, function (e) {
        })
    },
    _updatePosition: function () {
        this._isMobile() && WeixinJSBridge.invoke("updateMap", {
            mapId: this._mapId,
            position: this._box,
            covers: this.covers || []
        }, function (e) {
            console.log(e)
        })
    },
    _hiddenChanged: function (e, t) {
        this._isMobile() ? (this.$.dom.style.display = e ? "none" : "", WeixinJSBridge.invoke("updateMap", {
            mapId: this._mapId,
            hide: e
        }, function (t) {
            console.log("地图组件: 显示/隐藏 " + e + " 响应: " + t.errMsg)
        })) : this.$.dom.style.display = e ? "none" : ""
    },
    latitudeChanged: function (e, t) {
        if (e)return this._isReady ? void(this._isMobile() && this._update({
            centerLatitude: e,
            centerLongitude: this.longitude
        }, "纬度")) : void this._delay("latitudeChanged", e, t)
    },
    longitudeChanged: function (e, t) {
        if (e)return this._isReady ? void(this._isMobile() && this._update({
            centerLatitude: this.latitude,
            centerLongitude: e
        }, "经度")) : void this._delay("longitudeChanged", e, t)
    },
    scaleChanged: function (e, t) {
        if (e)return this._isReady ? void(this._isMobile() && this._update({
            centerLatitude: this.latitude,
            centerLongitude: this.longitude,
            scale: e || 14
        }, "缩放")) : void this._delay("scaleChanged", e, t)
    },
    coversChanged: function (e, t) {
        if (e)return this._isReady ? void(this._isMobile() && this._update({
            centerLatitude: this.latitude,
            centerLongitude: this.longitude,
            covers: e || []
        }, "覆盖物")) : void this._delay("coversChanged", e, t)
    },
    attached: function () {
        var e = this;
        this._box = this._getBox(), console.log({
            centerLongitude: this.longitude,
            centerLatitude: this.latitude
        }), this._isMobile() ? WeixinJSBridge.invoke("insertMap", {
            position: this._box,
            centerLongitude: this.longitude,
            centerLatitude: this.latitude,
            scale: this.scale,
            covers: this.covers || [],
            markers: this.markers || [],
            hide: this.hidden
        }, function (t) {
            /ok/.test(t.errMsg) ? (e._mapId = t.mapId, e._ready(), document.addEventListener("pageReRender", e._pageReRenderCallback.bind(e))) : (console.log("地图组件: 插入失败 errMsg: " + t.errMsg), e.triggerEvent("error", {errMsg: t.errMsg}))
        }) : this._ready()
    },
    detached: function () {
        this._isMobile() && WeixinJSBridge.invoke("removeMap", {mapId: this._mapId}, function (e) {
        })
    }
}), window.exparser.registerElement({
    is: "wx-mask",
    template: '\n    <div class="wx-mask" id="mask" style="display: none;">\n  ',
    behaviors: ["wx-base"],
    properties: {hidden: {type: Boolean, value: !0, observer: "hiddenChange"}},
    hiddenChange: function (e) {
        var t = this.$.mask;
        e === !0 ? (setTimeout(function () {
            t.style.display = "none"
        }, 300), this.$.mask.classList.add("wx-mask-transparent")) : (t.style.display = "block", t.focus(), t.classList.remove("wx-mask-transparent"))
    }
}), window.exparser.registerElement({
    is: "wx-modal",
    template: '\n    <div id="mask" class="wx-modal-mask"></div>\n    <div class="wx-modal-dialog">\n      <div class="wx-modal-dialog-hd">\n        <strong parse-text-content>{{title}}</strong>\n      </div>\n      <div class="wx-modal-dialog-bd">\n        <wx-content></wx-content>\n      </div>\n      <div class="wx-modal-dialog-ft">\n        <a hidden$="{{noCancel}}" id="cancel" class="wx-modal-btn-default" parse-text-content>{{cancelText}}</a>\n        <a id="confirm" class="wx-modal-btn-primary" parse-text-content>{{confirmText}}</a>\n      </div>\n    </div>\n  ',
    behaviors: ["wx-base"],
    properties: {
        title: {type: String, reflectToAttribute: !0},
        noCancel: {type: Boolean, value: !1, reflectToAttribute: !0},
        confirmText: {type: String, value: "确定", reflectToAttribute: !0},
        cancelText: {type: String, value: "取消", reflectToAttribute: !0}
    },
    listeners: {"mask.tap": "_handleCancel", "confirm.tap": "_handleConfirm", "cancel.tap": "_handleCancel"},
    _handleConfirm: function () {
        this.triggerEvent("confirm", {}, !0)
    },
    _handleCancel: function () {
        this.triggerEvent("cancel", {}, !0)
    }
}), window.exparser.registerElement({
    is: "wx-navigator",
    behaviors: ["wx-base", "wx-hover"],
    template: '<div id="wrapper"><wx-content></wx-content></div>',
    properties: {
        url: {type: String, reflectToAttribute: !0},
        redirect: {type: Boolean, value: !1, reflectToAttribute: !0},
        hoverClass: {type: String, value: ""},
        hoverStyle: {type: String, value: ""}
    },
    listeners: {tap: "navigateTo"},
    attached: function () {
        this.hoverStayTime = 400
    },
    navigateTo: function () {
        this.url ? this.redirect ? wx.redirectTo({url: this.url}) : wx.navigateTo({url: this.url}) : console.log("navigator should have url attribute")
    }
}), /wechatdevtools/.test(window.navigator.userAgent.toLowerCase()) && window.exparser.registerElement({
    is: "wx-picker",
    template: '\n  \t<div id="wrapper"><wx-content></wx-content></div>\n    <div id="selector" style="display:none;" class="wx-picker" >\n      <div class="wx-picker-hd">\n        <a class="wx-picker-action" id="cancel">取消</a>\n        <a class="wx-picker-action" id="confirm">确定</a>\n      </div>\n      <div class="wx-picker-bd">\n        <div class="wx-picker-group" id="group">\n          <div class="wx-picker-mask2">\n          </div>\n          <div class="wx-picker-indicator">\n          </div>\n          <div class="wx-picker-content" id="inner">\n          </div>\n        </div>\n      </div>\n    </div>\n  ',
    behaviors: ["wx-base", "wx-data-component"],
    properties: {
        curLoc: {type: Number, value: 0},
        diffLoc: {type: Number, value: 0},
        range: {type: Array, value: [], observer: "rangeChange"},
        value: {type: Number, value: 0, coerce: "valueChange", reflectToAttribute: !0},
        mode: {type: String, value: "selector", reflectToAttribute: !0},
        fields: {type: String, value: "day", reflectToAttribute: !0},
        start: {type: String, value: ""},
        end: {type: String, value: ""}
    },
    attached: function () {
        this.insertItem(this.range)
    },
    valueChange: function (e) {
        return isNaN(parseInt(e)) || (e >= this.range.length && (e = this.range.length - 1), this.curLoc = 34 * (3 - e), this.$.inner.style.transform = "translate3d(0px, " + this.curLoc + "px, 0px)"), e
    },
    rangeChange: function (e) {
        this.insertItem(e)
    },
    insertItem: function (e) {
        if ("selector" == this.mode) {
            this.$.inner.innerHTML = "";
            for (var t = 0; t < e.length; t++) {
                var n = document.createElement("wx-picker-item");
                n.innerHTML = '<div class="wx-picker-item">' + e[t] + "</div>", this.$.inner.appendChild(n)
            }
        }
    },
    listeners: {
        tap: "showPickerView",
        "cancel.tap": "hide",
        "confirm.tap": "confirm",
        "group.touchstart": "getStartLoc",
        "group.touchmove": "moveWrapper",
        "group.touchend": "moveEnd"
    },
    showPickerView: function () {
        "selector" == this.mode && (this.$.selector.style.display = "block")
    },
    pickerGetMaskStyle: function (e) {
        return "z-index:1000;" + (e ? "" : "background-color: transparent")
    },
    getStartLoc: function (e) {
        this.startLoc = e.touches[0].clientY
    },
    moveWrapper: function (e) {
        return this.diffLoc = e.touches[0].clientY - this.startLoc, this.$.inner.style.transition = "all 0s", this.$.inner.style.transform = "translate3d(0px, " + (this.diffLoc + this.curLoc) + "px, 0px)", !1
    },
    moveEnd: function (e) {
        this.curLoc = this.diffLoc + this.curLoc;
        var t = this.curLoc % 34;
        t < 0 && (t += 34), t < 17 ? this.curLoc = this.curLoc - t : this.curLoc = this.curLoc - t + 34, this.curLoc < Math.min(34 * (4 - this.childNodes.length), 0) ? this.curLoc = Math.min(34 * (4 - this.childNodes.length), 0) : this.curLoc > 102 && (this.curLoc = 102), this.$.inner.style.transition = "all 0.3s", this.$.inner.style.transform = "translate3d(0px, " + this.curLoc + "px, 0px)"
    },
    hide: function () {
        return console.log(11), this.$.selector.style.display = "none", !1
    },
    confirm: function (e) {
        var t = 3 - this.curLoc / 34;
        return this.value = t, this.triggerEvent("change", {value: this.value}, !0), this.hide(), !1
    }
}), /wechatdevtools/.test(window.navigator.userAgent.toLowerCase()) || window.exparser.registerElement({
    is: "wx-picker",
    template: '<div id="wrapper"><wx-content></wx-content></div>',
    behaviors: ["wx-base", "wx-data-component"],
    properties: {
        range: {type: Array, value: []},
        value: {type: String, value: "", reflectToAttribute: !0},
        mode: {type: String, value: "selector", reflectToAttribute: !0},
        fields: {type: String, value: "day", reflectToAttribute: !0},
        start: {type: String, value: ""},
        end: {type: String, value: ""}
    },
    listeners: {tap: "showPickerView"},
    resetFormData: function () {
        "selector" == this.mode ? this.value = -1 : this.value = ""
    },
    getFormData: function (e) {
        this.__pickerShow ? this.__formCallback = e : "function" == typeof e && e(this.value)
    },
    formGetDataCallback: function () {
        "function" == typeof this.__formCallback && this.__formCallback(this.value), this.__formCallback = void 0
    },
    showPickerView: function () {
        "date" == this.mode || "time" == this.mode ? this.showDatePickerView() : this.showSelector()
    },
    getCustomerStyle: function () {
        var e = this.$.wrapper.getBoundingClientRect();
        return {width: e.width, height: e.height, left: e.left + window.scrollX, top: e.top + window.scrollY}
    },
    showSelector: function (e) {
        var t = this, n = parseInt(this.value);
        (isNaN(n) || n >= this.range.length) && (n = 0);
        for (var i = [], r = 0; r < this.range.length; r++)i.push(this.range[r] + "");
        WeixinJSBridge.invoke("showPickerView", {array: i, current: n, style: this.getCustomerStyle()}, function (e) {
            console.info(JSON.stringify(e)), /:ok/.test(e.errMsg) ? (t.value = e.index, t.triggerEvent("change", {value: t.value}, !0)) : console.error(e.errMsg), t.resetPickerState(), t.formGetDataCallback()
        }), this.__pickerShow = !0
    },
    showDatePickerView: function () {
        var e = this;
        WeixinJSBridge.invoke("showDatePickerView", {
            range: {start: this.start, end: this.end},
            mode: this.mode,
            current: this.value,
            fields: this.fields,
            style: this.getCustomerStyle()
        }, function (t) {
            console.info(JSON.stringify(t)), /:ok/.test(t.errMsg) ? (e.value = t.value, e.triggerEvent("change", {value: e.value}, !0)) : console.error(t.errMsg), e.resetPickerState(), e.formGetDataCallback()
        }), this.__pickerShow = !0
    },
    resetPickerState: function () {
        this.__pickerShow = !1
    }
}), window.exparser.registerElement({
    is: "wx-picker-item",
    template: '\n    <div class="wx-picker-item" class.wx-picker-item-disabled="{{disabled}}">\n      <wx-content></wx-content>\n    </div>\n  ',
    properties: {},
    behaviors: ["wx-base", "wx-disabled", "wx-item"]
}), window.exparser.registerElement({
    is: "wx-progress",
    template: '\n    <div class="wx-progress-bar" style.height="{{strokeWidth}}px">\n      <div class="wx-progress-inner-bar" style.width="{{curPercent}}%" style.background-color="{{color}}"></div>\n    </div>\n    <p class="wx-progress-info" parse-text-content hidden$="{{!showInfo}}">\n      {{curPercent}}%\n    </p>\n  ',
    behaviors: ["wx-base"],
    properties: {
        percent: {type: Number, reflectToAttribute: !0, observer: "percentChange"},
        curPercent: {type: Number},
        showInfo: {type: Boolean, value: !1, reflectToAttribute: !0},
        strokeWidth: {type: Number, value: 6, reflectToAttribute: !0},
        color: {type: String, value: "#09BB07", reflectToAttribute: !0},
        active: {type: Boolean, value: !1, reflectToAttribute: !0, observer: "activeAnimation"}
    },
    percentChange: function (e) {
        e > 100 && (this.percent = 100), e < 0 && (this.percent = 0), this.__timerId && clearInterval(this.__timerId), this.activeAnimation(this.active)
    },
    activeAnimation: function (e) {
        if (!isNaN(this.percent))if (e) {
            var t = function () {
                return this.percent <= this.curPercent + 1 ? (this.curPercent = this.percent, void clearInterval(this.__timerId)) : void++this.curPercent
            };
            this.curPercent = 0, this.__timerId = setInterval(t.bind(this), 30), t.call(this)
        } else this.curPercent = this.percent
    },
    detached: function () {
        this.__timerId && clearInterval(this.__timerId)
    }
}), window.exparser.registerElement({
    is: "wx-radio",
    template: '\n    <input id="input" class="wx-radio-check" type="radio" checked:="{{checked}}" disabled$="{{disabled}}"/>\n    <wx-content></wx-content>\n  ',
    behaviors: ["wx-base", "wx-label-target", "wx-disabled", "wx-item"],
    properties: {},
    listeners: {"input.change": "inputChange"},
    handleLabelTap: function (e) {
        this.disabled || this.checked || (this.checked = !this.checked, this.inputChange())
    },
    inputChange: function (e) {
        this.checked = this.$.input.checked, this.itemCheck()
    }
}), window.exparser.registerElement({
    is: "wx-radio-group",
    template: '\n    <span id="wrapper">\n      <wx-content></wx-content>\n    </span>\n  ',
    behaviors: ["wx-base", "wx-data-component", "wx-group"],
    properties: {}
}), window.exparser.registerElement({
    is: "wx-scroll-view",
    template: '\n    <div id="main" class="wx-scroll-view" style$="overflow-x: hidden; overflow-y: hidden;">\n      <wx-content></wx-content>\n      <div style$="position: fixed; top: 0; left: 0; width: 1px; height: 1px; background-color: transparent; opacity: .01; font-size: 1px; overflow: hidden;">.</div>\n    </div>\n  ',
    behaviors: ["wx-base"],
    properties: {
        scrollX: {type: Boolean, value: !1, reflectToAttribute: !0},
        scrollY: {type: Boolean, value: !1, reflectToAttribute: !0},
        upperThreshold: {type: Number, value: 50, reflectToAttribute: !0},
        lowerThreshold: {type: Number, value: 50, reflectToAttribute: !0},
        scrollTop: {type: Number, observer: "_scrollTopChanged", reflectToAttribute: !0},
        scrollLeft: {type: Number, observer: "_scrollLeftChanged", reflectToAttribute: !0},
        scrollIntoView: {type: String, observer: "_srollIntoViewChanged", reflectToAttribute: !0}
    },
    listeners: {"main.track": "_handleTrack"},
    created: function () {
        this._lastScrollTop = this.scrollTop || 0, this._lastScrollLeft = this.scrollLeft || 0
    },
    attached: function () {
        var e = this;
        this._scrollTopChanged(this.scrollTop), this._scrollLeftChanged(this.scrollLeft), this._srollIntoViewChanged(this.scrollIntoView), this.__handleScroll = function (t) {
            e._handleScroll.bind(e, t)()
        }, this.$.main.addEventListener("scroll", this.__handleScroll), this.$.main.style.overflowX = this.scrollX ? "auto" : "hidden", this.$.main.style.overflowY = this.scrollY ? "auto" : "hidden"
    },
    detached: function () {
        this.$.main.removeEventListener("scroll", this.__handleScroll)
    },
    _getStyle: function (e, t) {
        var n = e ? "auto" : "hidden", i = t ? "auto" : "hidden";
        return "overflow-x: " + n + "; overflow-y: " + i + ";"
    },
    _handleTrack: function (e) {
        return "start" === e.detail.state ? (this._x = e.detail.x, this._y = e.detail.y, void(this._noBubble = null)) : ("end" === e.detail.state && (this._noBubble = !1), null === this._noBubble && this.scrollY && (Math.abs(this._y - e.detail.y) / Math.abs(this._x - e.detail.x) > 1 ? this._noBubble = !0 : this._noBubble = !1), null === this._noBubble && this.scrollX && (Math.abs(this._x - e.detail.x) / Math.abs(this._y - e.detail.y) > 1 ? this._noBubble = !0 : this._noBubble = !1), this._x = e.detail.x, this._y = e.detail.y, void(this._noBubble && e.stopPropagation()))
    },
    _handleScroll: function (e) {
        clearTimeout(this._timeout), this._timeout = setTimeout(function () {
            var e = this.$.main;
            if (this.scrollY) {
                var t = this._lastScrollTop - e.scrollTop > 0, n = this._lastScrollTop - e.scrollTop < 0;
                e.scrollTop <= this.upperThreshold && t && this.triggerEvent("scrolltoupper", {direction: "top"}, !0), e.scrollTop + e.offsetHeight + this.lowerThreshold >= e.scrollHeight && n && this.triggerEvent("scrolltolower", {direction: "bottom"}, !0)
            }
            if (this.scrollX) {
                var i = this._lastScrollLeft - e.scrollLeft > 0, r = this._lastScrollLeft - e.scrollLeft < 0;
                e.scrollLeft <= this.upperThreshold && i && this.triggerEvent("scrolltoupper", {direction: "left"}, !0), e.scrollLeft + e.offsetWidth + this.lowerThreshold >= e.scrollWidth && r && this.triggerEvent("scrolltolower", {direction: "right"}, !0)
            }
            this._lastScrollTop = e.scrollTop, this._lastScrollLeft = e.scrollLeft, this.triggerEvent("scroll", {
                scrollLeft: e.scrollLeft,
                scrollTop: e.scrollTop,
                deltaX: this._lastScrollLeft - e.scrollLeft,
                deltaY: this._lastScrollTop - e.scrollTop
            }, !0)
        }.bind(this), 50)
    },
    _scrollTopChanged: function (e) {
        this.scrollY && (this.$.main.scrollTop = e)
    },
    _scrollLeftChanged: function (e) {
        this.scrollX && (this.$.main.scrollLeft = e)
    },
    _srollIntoViewChanged: function (e) {
        if (e) {
            var t = this.$.dom.querySelector("#" + e);
            t && (this.$.main.scrollTop = t.offsetTop)
        }
    }
}), window.exparser.registerElement({
    is: "wx-slider",
    template: '\n    <div class="wx-slider-wrapper" class.wx-slider-disabled="{{disabled}}">\n      <div class="wx-slider-handle-wrapper" id="wrapper">\n        <div class="wx-slider-handle" style.left="{{_getValueWidth(value,min,max)}}" id="handle">\n        </div>\n        <div class="wx-slider-track" style.width="{{_getValueWidth(value,min,max)}}"></div>\n        <div class="wx-slider-step" id="step"></div>\n      </div>\n      <span hidden$="{{!showValue}}" class="wx-slider-value">\n        <p parse-text-content>{{value}}</p>\n      </span>\n    </div>\n  ',
    properties: {
        min: {type: Number, value: 0, reflectToAttribute: !0, observer: "_revalicateRange"},
        max: {type: Number, value: 100, reflectToAttribute: !0, observer: "_revalicateRange"},
        step: {type: Number, value: 1, reflectToAttribute: !0},
        value: {type: Number, value: 0, reflectToAttribute: !0, coerce: "_filterValue"},
        showValue: {type: Boolean, value: !1, reflectToAttribute: !0}
    },
    listeners: {"handle.track": "_onTrack", "wrapper.tap": "_onTap"},
    behaviors: ["wx-base", "wx-data-component", "wx-disabled"],
    _filterValue: function (e) {
        if (e < this.min)return this.min;
        if (e > this.max)return this.max;
        var t = Math.round((e - this.min) / this.step);
        return t * this.step + this.min
    },
    _revalicateRange: function () {
        this.value = this._filterValue(this.value)
    },
    _getValueWidth: function (e, t, n) {
        return 100 * (e - t) / (n - t) + "%"
    },
    _getXPosition: function (e) {
        for (var t = e.offsetLeft; e; e = e.offsetParent)t += e.offsetLeft;
        return t - document.body.scrollLeft
    },
    _onUserChangedValue: function (e) {
        var t = this.$.step.offsetWidth, n = this._getXPosition(this.$.step), i = (e.detail.x - n) * (this.max - this.min) / t + this.min;
        i = this._filterValue(i), this.value = i
    },
    _onTrack: function (e) {
        if (!this.disabled)return "move" === e.detail.state ? (this._onUserChangedValue(e), !1) : void("end" === e.detail.state && this.triggerEvent("change", {value: this.value}, !0))
    },
    _onTap: function (e) {
        this.disabled || (this._onUserChangedValue(e), this.triggerEvent("change", {value: this.value}, !0))
    },
    resetFormData: function () {
        this.value = this.min
    }
}), window.exparser.registerElement({
    is: "wx-selector-item",
    template: '\n    <li id="main" class$="wx-selector-item{{getSelected(checked)}}{{getDisabled(disabled)}}">\n      <i class$="wx-icon-{{icon}}" hidden$="{{!icon}}" style.size="14"></i>\n      <wx-content></wx-content>\n    </li>\n  ',
    behaviors: ["wx-base", "wx-disabled", "wx-item"],
    properties: {icon: {type: String, reflectToAttribute: !0}, text: {type: String}},
    listeners: {tap: "onThisTap"},
    getDisabled: function (e) {
        return e ? " wx-selector-item-disabled" : ""
    },
    getSelected: function (e) {
        return e ? " wx-selector-item-selected" : ""
    },
    onThisTap: function (e) {
        this.disabled || (this.checked = !0, this.itemCheck())
    },
    attached: function () {
        this.text = this.$.content.innerHTML, this.triggerEvent("itemCheckedChange", {
            newval: this.checked,
            oldval: void 0
        })
    }
}), window.exparser.registerElement({
    is: "wx-swiper",
    template: '\n    <div id="slidesWrapper" class="wx-swiper-wrapper">\n      <div id="slides" class="wx-swiper-slides" class.wx-swiper-slides-tracking="{{_tracking}}" style.transition-duration="{{duration}}ms">\n        <wx-content></wx-content>\n      </div>\n      <div id="slidesDots" hidden$="{{!indicatorDots}}" class="wx-swiper-dots" class.wx-swiper-dots-horizontal="{{!vertical}}" class.wx-swiper-dots-vertical="{{vertical}}">\n        <wx-repeat items="{{_slidesVisible}}">\n          <div data-dot-index$="{{index}}" class="wx-swiper-dot" class.wx-swiper-dot-active="{{item}}" style.transition-duration="{{duration}}ms"></div>\n        </wx-repeat>\n      </div>\n    </div>\n  ',
    behaviors: ["wx-base"],
    properties: {
        indicatorDots: {type: Boolean, value: !1, reflectToAttribute: !0},
        vertical: {type: Boolean, value: !1, observer: "_initSlides", reflectToAttribute: !0},
        autoplay: {type: Boolean, value: !1, observer: "_autoplayChanged", reflectToAttribute: !0},
        interval: {type: Number, value: 5e3, reflectToAttribute: !0},
        duration: {type: Number, value: 1e3, reflectToAttribute: !0},
        current: {
            type: Number,
            value: 0,
            coerce: "_normalizeCurrentSlide",
            observer: "_currentSlideChanged",
            reflectToAttribute: !0
        },
        _slidesVisible: Array,
        _tracking: Boolean
    },
    listeners: {"slides.track": "handleContentTrack", "slidesDots.tap": "handleDotTap"},
    attached: function () {
        this._attached = !0, this._initSlides(), this.autoplay && this._scheduleNextSlide()
    },
    detached: function () {
        this._attached = !1, this._cancelSchedule()
    },
    contentChanged: function () {
        this._initSlides()
    },
    _initSlides: function () {
        if (this._attached) {
            for (var e = this.$.content.childNodes, t = 0, n = this.vertical, i = 0; i < e.length; i++) {
                var r = e[i];
                "WX-SWIPER-ITEM" === r.tagName && (r.style.position = "absolute", r.style.width = "100%", r.style.height = "100%", n ? (r.style.left = 0, r.style.top = 100 * t + "%") : (r.style.top = 0, r.style.left = 100 * t + "%"), t++)
            }
            this._slideCount = t;
            var o = this._normalizeCurrentSlide(this.current);
            n ? (this.$.slides.style.top = 100 * -o + "%", this.$.slides.style.left = 0) : (this.$.slides.style.top = 0, this.$.slides.style.left = 100 * -o + "%"), this._updateDots(o)
        }
    },
    _getDirectionName: function (e) {
        return e ? "vertical" : "horizontal"
    },
    _scheduleNextSlide: function () {
        var e = this;
        this._cancelSchedule(), this._attached && (this._scheduleTimeoutObj = setTimeout(function () {
            e._scheduleTimeoutObj = null, e.current++
        }, this.interval))
    },
    _cancelSchedule: function () {
        this._scheduleTimeoutObj && (clearTimeout(this._scheduleTimeoutObj), this._scheduleTimeoutObj = null)
    },
    _updateDots: function (e) {
        for (var t = [], n = 0; n < this._slideCount; n++)t[n] = n === e;
        this._slidesVisible = t
    },
    _gotoSlide: function (e) {
        this._slideCount && (this._updateDots(e), this.vertical ? this.$.slides.style.top = -100 * e + "%" : this.$.slides.style.left = -100 * e + "%", this.autoplay && this._scheduleNextSlide(), this.triggerEvent("change", {current: e}, !0))
    },
    _autoplayChanged: function (e) {
        e ? this._scheduleNextSlide() : this._cancelSchedule()
    },
    _normalizeCurrentSlide: function (e) {
        return this._slideCount ? (Math.round(e) % this._slideCount + this._slideCount) % this._slideCount : e
    },
    _currentSlideChanged: function (e) {
        this._gotoSlide(e)
    },
    handleDotTap: function (e) {
        var t = Number(e.target.dataset.dotIndex);
        this.current = t
    },
    handleContentTrack: function (e) {
        if ("start" === e.detail.state)return this._contentTrackX = parseFloat(this.$.slides.style.left), this._contentTrackY = parseFloat(this.$.slides.style.top), this._contentTrackStartX = e.detail.x, this._contentTrackStartY = e.detail.y, this._contentTrackPrevX = e.detail.x, this._contentTrackPrevY = e.detail.y, this._contentTrackS = 0, this._contentTrackT = Date.now(), this._tracking = !0, void(this._trackingDirectionChecked = !1);
        if (this._tracking) {
            var t = e.detail.x - this._contentTrackStartX, n = e.detail.y - this._contentTrackStartY, i = e.detail.x - this._contentTrackPrevX, r = e.detail.y - this._contentTrackPrevY;
            if (this._contentTrackPrevX = e.detail.x, this._contentTrackPrevY = e.detail.y, !this._trackingDirectionChecked) {
                if (Math.abs(t) <= Math.abs(n) && !this.vertical || Math.abs(t) >= Math.abs(n) && this.vertical)return void(this._tracking = !1);
                this._trackingDirectionChecked = !0
            }
            if ("end" === e.detail.state) {
                this.autoplay && this._scheduleNextSlide(), this._tracking = !1;
                var o = 0;
                Math.abs(this._contentTrackS) / (Date.now() - this._contentTrackT) > 1 && (o = 50 * this._contentTrackS / Math.abs(this._contentTrackS));
                var a = 0;
                return a = this.vertical ? this._normalizeCurrentSlide(-(parseFloat(this.$.slides.style.top) + o) / 100) : this._normalizeCurrentSlide(-(parseFloat(this.$.slides.style.left) + o) / 100), void(this.current !== a ? this.current = a : this.vertical ? this.$.slides.style.top = -100 * a + "%" : this.$.slides.style.left = -100 * a + "%")
            }
            this._cancelSchedule();
            var s = this._slideCount, c = function (e) {
                return .5 - .25 / (e + .5)
            };
            if (this._contentTrackS = 0, this._contentTrackT = Date.now(), this.vertical) {
                var l = this._contentTrackY + n / this.$.slidesWrapper.offsetHeight * 100;
                l > 0 ? l = 100 * c(l / 100) : 100 - l > 100 * s ? l = 100 * (1 - c(1 - l / 100 - s) - s) : this._contentTrackS = r, this.$.slides.style.top = l + "%"
            } else {
                var d = this._contentTrackX + t / this.$.slidesWrapper.offsetWidth * 100;
                d > 0 ? d = 100 * c(d / 100) : 100 - d > 100 * s ? d = 100 * (1 - c(1 - d / 100 - s) - s) : this._contentTrackS = i, this.$.slides.style.left = d + "%"
            }
            return !1
        }
    }
}), window.exparser.registerElement({
    is: "wx-swiper-item",
    template: "\n    <wx-content></wx-content>\n  ",
    properties: {},
    behaviors: ["wx-base"]
}), window.exparser.registerElement({
    is: "wx-switch",
    template: '\n    <div class$="{{getDisabledClass(disabled)}}" style="display: inline-block">\n      <span hidden$="{{!isSwitch(type)}}">\n        <input id="switchInput" class="weui_switch" type="checkbox" checked:="{{checked}}" disabled$="{{disabled}}" />\n      </span>\n      <span hidden$="{{!isCheckbox(type)}}">\n        <label class="weui_switch_checkbox_wrapper">\n          <span id="checkbox" class$="weui_switch_checkbox{{getCheckboxClass(checked)}}">\n            <span class="weui_switch_checkbox_inner">\n            </span>\n            <input id="checkboxInput" type="checkbox" class="weui_switch_checkbox_input" checked$="{{checked}}" disabled$="{{disabled}}" />\n          </span>\n        </label>\n      </span>\n    </div>\n  ',
    properties: {
        checked: {type: Boolean, value: !1, reflectToAttribute: !0},
        type: {type: String, value: "switch", reflectToAttribute: !0}
    },
    behaviors: ["wx-base", "wx-label-target", "wx-disabled", "wx-data-component"],
    listeners: {"switchInput.change": "onInputChange", "checkboxInput.change": "onInputChange"},
    handleLabelTap: function (e) {
        this.disabled || (this.checked = !this.checked)
    },
    onInputChange: function (e) {
        return this.checked = !this.checked, this.disabled ? void(this.checked = !this.checked) : void this.triggerEvent("change", {value: this.checked}, !0)
    },
    getCheckboxClass: function (e) {
        return e ? " weui_switch_checkbox_checked" : ""
    },
    isSwitch: function (e) {
        return "switch" === e
    },
    isCheckbox: function (e) {
        return "checkbox" === e
    },
    getDisabledClass: function (e) {
        return e ? "weui_switch_disabled" : ""
    },
    getFormData: function () {
        return this.checked
    },
    resetFormData: function () {
        this.checked = !1
    }
}), window.exparser.registerElement({
    is: "wx-text",
    template: '\n    <span id="raw" style="display:none;"><wx-content></wx-content></span>\n    <span id="main"></span>\n  ',
    behaviors: ["wx-base"],
    _htmlEncode: function (e) {
        return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/\'/g, "&apos;")
    },
    _contentChanged: function () {
        this.$.main.innerHTML = this._htmlEncode(this.$.raw.textContent).replace(/\n/g, "<br>")
    },
    attached: function () {
        this._contentChanged()
    },
    contentChanged: function () {
        this._contentChanged()
    }
}), window.exparser.registerElement({
    is: "wx-toast",
    template: '\n    <div class="wx-toast-mask" id="mask" style$="{{_getMaskStyle(mask)}}"></div>\n    <div class="wx-toast">\n      <i class$="wx-toast-icon wx-icon-{{icon}}" style.color="#FFFFFF" style.font-size="55px" style.display="block"></i>\n      <p class="wx-toast-content"><wx-content></wx-content></p>\n    </div>\n  ',
    behaviors: ["wx-base", "wx-mask-behavior"],
    properties: {
        icon: {type: String, value: "success_no_circle", reflectToAttribute: !0},
        hidden: {type: Boolean, value: !0, reflectToAttribute: !0, observer: "hiddenChange"},
        duration: {type: Number, value: 1500, reflectToAttribute: !0, observer: "durationChange"}
    },
    durationChange: function (e, t) {
        this.timer && (clearTimeout(this.timer), this.hiddenChange(this.hidden))

    },
    hiddenChange: function (e) {
        if (!e && 0 != this.duration) {
            var t = this;
            this.timer = setTimeout(function () {
                t.triggerEvent("change", {value: t.hidden}, !0)
            }, this.duration)
        }
    }
}), window.exparser.registerElement({
    is: "wx-video",
    behaviors: ["wx-base", "wx-player", "wx-native"],
    template: '<div class="container">\n    <video id="player" webkit-playsinline style="display: none;"></video>\n    <div id="default" class="bar" style="display: none;">\n      <div id="button" class$="button {{_buttonType}}"></div>\n      <div class="time currenttime" parse-text-content>{{_currentTime}}</div>\n      <div id="progress" class="progress">\n        <div id="ball" class="ball" style$="left: {{_progressLeft}}px;">\n          <div class="inner"></div>\n        </div>\n        <div class="inner" style$="width: {{_progressLength}}px;"></div>\n      </div>\n      <div class="time duration" parse-text-content>{{_duration}}</div>\n      <div id="fullscreen" class="fullscreen"></div>\n    </div>\n  </div>\n  <div id="fakebutton"></div>',
    properties: {
        _videoId: {type: Number},
        _progressLeft: {type: Number, value: -22},
        _progressLength: {type: Number, value: 0}
    },
    _reset: function () {
        this._buttonType = "play", this._currentTime = "00:00", this._duration = "00:00", this._progressLeft = -22, this._progressLength = 0
    },
    _update: function (e, t) {
        var n = this;
        e.videoPlayerId = this._videoId, e.hide = this.hidden, console.log(e), WeixinJSBridge.invoke("updateVideoPlayer", e, function (e) {
            /ok/.test(e.errMsg) ? console.log("视频组件: 更新" + t + "成功 " + e.errMsg) : n._publish("error", {errMsg: e.errMsg})
        })
    },
    _updatePosition: function () {
        this._isiOS() ? this._update({position: this._box}, "位置") : (this.$.player.width = this._box.width, this.$.player.height = this._box.height)
    },
    _hiddenChanged: function (e, t) {
        this._isiOS() ? (this.$.dom.style.display = e ? "none" : "", this._update({hide: e}, e ? "隐藏" : "显示")) : (this.$.player.pause(), this.$.dom.style.display = e ? "none" : "")
    },
    posterChanged: function (e, t) {
        if (!this._isError)return this._isReady ? void(this._isiOS() && (/http:\/\//.test(e) || /https:\/\//.test(e)) ? this._update({poster: e}, "封面") : this.$.player.poster = e) : void this._deferred.push({
            callback: "posterChanged",
            args: [e, t]
        })
    },
    srcChanged: function (e, t) {
        if (!this._isError && e) {
            if (!this._isReady)return void this._deferred.push({callback: "srcChanged", args: [e, t]});
            if (this._isiOS())console.log("视频组件: 当前环境 iphone"), /wxfile:\/\//.test(e) || /http:\/\//.test(e) || /https:\/\//.test(e) ? this._update({filePath: e}, "资源") : this._publish("error", {errMsg: "MEDIA_ERR_SRC_NOT_SUPPORT"}); else {
                console.log("视频组件: 当前环境 Android/开发者工具"), this.$.player.src = e, console.log(this.$.player.src);
                var n = this;
                setTimeout(function () {
                    n._reset()
                }, 0)
            }
        }
    },
    _computeProgress: function (e) {
        var t = this.$.progress.getBoundingClientRect().left, n = this.$.progress.offsetWidth, i = (e - t) / n;
        this.$.player.currentTime = this.$.player.duration * i
    },
    attached: function () {
        var e = this;
        this._isiOS() ? (console.log("视频组件: iOS 不显示默认控件"), this._box = this._getBox(), WeixinJSBridge.invoke("insertVideoPlayer", {
            position: this._box,
            hide: this.hidden
        }, function (t) {
            /ok/.test(t.errMsg) ? (e._videoId = t.videoPlayerId, e._ready(), document.addEventListener("pageReRender", e._pageReRenderCallback.bind(e))) : (e._isError = !0, e.$.dom.style.display = "none", e._publish("error", {errMsg: t.errMsg}))
        })) : this._isAndroid() ? (this.$.player.style.display = "", this.$.player.controls = !0, this._ready(), document.addEventListener("pageReRender", this._pageReRenderCallback.bind(this))) : (this.$.default.style.display = "", this.$.player.style.display = "", this.$.player.addEventListener("timeupdate", function (t) {
            t.stopPropagation();
            var n = e.$.player.currentTime / e.$.player.duration;
            e._progressLength = Math.floor(e.$.progress.offsetWidth * n), e._progressLeft = e._progressLength - 22
        }), this.$.button.onclick = function (t) {
            t.stopPropagation(), e.$.player[e._buttonType]()
        }, this.$.progress.onclick = function (t) {
            t.stopPropagation(), e._computeProgress(t.clientX)
        }, this._ready(), document.addEventListener("pageReRender", this._pageReRenderCallback.bind(this)))
    },
    detached: function () {
        this._isiOS() && wx.removeVideoPlayer({
            videoPLayerId: this._videoId, success: function (e) {
            }
        })
    }
}), window.exparser.registerElement({
    is: "wx-view",
    template: "<wx-content></wx-content>",
    behaviors: ["wx-base"],
    properties: {
        inline: {type: Boolean, reflectToAttribute: !0},
        scrollTop: {type: Number, observer: "_scrollTopChanged"},
        scrollLeft: {type: Number, observer: "_scrollLeftChanged"},
        scrollIntoView: {type: String, observer: "_srollIntoViewChanged"}
    },
    _scrollTopChanged: function (e) {
        NaN !== Number(e) && (this.$.dom.scrollTop = e)
    },
    _scrollLeftChanged: function (e) {
        NaN !== Number(e) && (this.$.dom.scrollLeft = e)
    },
    _srollIntoViewChanged: function (e) {
        if (e) {
            var t = this.$.dom.querySelector("#" + e);
            t && (this.$.dom.scrollTop = t.offsetTop)
        }
    }
})
