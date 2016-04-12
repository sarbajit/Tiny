/*
 * Intel WebRTC SDK version 2.8.0
 * Copyright (c) 2015 Intel <http://webrtc.intel.com>
 * Homepage: http://webrtc.intel.com
 */
! function(a) {
    ! function() {
        function b() {
            (new L.ElementQueries).init()
        }
        this.L = this.L || {}, this.L.ElementQueries = function() {
            function a(a) {
                a || (a = document.documentElement);
                var b = getComputedStyle(a, "fontSize");
                return parseFloat(b) || 16
            }

            function b(b, c) {
                var d = c.replace(/[0-9]*/, "");
                switch (c = parseFloat(c), d) {
                    case "px":
                        return c;
                    case "em":
                        return c * a(b);
                    case "rem":
                        return c * a();
                    case "vw":
                        return c * document.documentElement.clientWidth / 100;
                    case "vh":
                        return c * document.documentElement.clientHeight / 100;
                    case "vmin":
                    case "vmax":
                        var e = document.documentElement.clientWidth / 100,
                            f = document.documentElement.clientHeight / 100,
                            g = Math["vmin" === d ? "min" : "max"];
                        return c * g(e, f);
                    default:
                        return c
                }
            }

            function c(a) {
                this.element = a, this.options = [];
                var c, d, e, f, g, h, i, j, k = 0,
                    l = 0;
                this.addOption = function(a) {
                    this.options.push(a)
                };
                var m = ["min-width", "min-height", "max-width", "max-height"];
                this.call = function() {
                    for (k = this.element.offsetWidth, l = this.element.offsetHeight, h = {}, c = 0, d = this.options.length; d > c; c++) e = this.options[c], f = b(this.element, e.value), g = "width" == e.property ? k : l, j = e.mode + "-" + e.property, i = "", "min" == e.mode && g >= f && (i += e.value), "max" == e.mode && f >= g && (i += e.value), h[j] || (h[j] = ""), i && -1 === (" " + h[j] + " ").indexOf(" " + i + " ") && (h[j] += " " + i);
                    for (var a in m) h[m[a]] ? this.element.setAttribute(m[a], h[m[a]].substr(1)) : this.element.removeAttribute(m[a])
                }
            }

            function d(a, b) {
                a.elementQueriesSetupInformation ? a.elementQueriesSetupInformation.addOption(b) : (a.elementQueriesSetupInformation = new c(a), a.elementQueriesSetupInformation.addOption(b), new ResizeSensor(a, function() {
                    a.elementQueriesSetupInformation.call()
                })), a.elementQueriesSetupInformation.call()
            }

            function e(a, b, c, e) {
                var f;
                if (document.querySelectorAll && (f = document.querySelectorAll.bind(document)), f || "undefined" == typeof $$ || (f = $$), f || "undefined" == typeof jQuery || (f = jQuery), !f) throw "No document.querySelectorAll, jQuery or Mootools's $$ found.";
                for (var g = f(a), h = 0, i = g.length; i > h; h++) d(g[h], {
                    mode: b,
                    property: c,
                    value: e
                })
            }

            function f(a) {
                var b;
                for (a = a.replace(/'/g, '"'); null !== (b = h.exec(a));) 5 < b.length && e(b[1] || b[5], b[2], b[3], b[4])
            }

            function g(a) {
                var b = "";
                if (a)
                    if ("string" == typeof a) a = a.toLowerCase(), (-1 !== a.indexOf("min-width") || -1 !== a.indexOf("max-width")) && f(a);
                    else
                        for (var c = 0, d = a.length; d > c; c++) 1 === a[c].type ? (b = a[c].selectorText || a[c].cssText, -1 !== b.indexOf("min-height") || -1 !== b.indexOf("max-height") ? f(b) : (-1 !== b.indexOf("min-width") || -1 !== b.indexOf("max-width")) && f(b)) : 4 === a[c].type && g(a[c].cssRules || a[c].rules)
            }
            var h = /,?([^,\n]*)\[[\s\t]*(min|max)-(width|height)[\s\t]*[~$\^]?=[\s\t]*"([^"]*)"[\s\t]*]([^\n\s\{]*)/gim;
            this.init = function() {
                for (var a = 0, b = document.styleSheets.length; b > a; a++) g(document.styleSheets[a].cssText || document.styleSheets[a].cssRules || document.styleSheets[a].rules)
            }
        }, a.addEventListener ? a.addEventListener("load", b, !1) : a.attachEvent("onload", b), this.L.ResizeSensor = function(b, c) {
            function d(b, c) {
                a.OverflowEvent || (b.addEventListener("overflow", function(a) {
                    c.call(this, a)
                }), b.addEventListener("underflow", function(a) {
                    c.call(this, a)
                }))
            }

            function e() {
                this.q = [], this.add = function(a) {
                    this.q.push(a)
                };
                var a, b;
                this.call = function() {
                    for (a = 0, b = this.q.length; b > a; a++) this.q[a].call()
                }
            }

            function f(b, c) {
                return b.currentStyle ? b.currentStyle[c] : a.getComputedStyle ? a.getComputedStyle(b, null).getPropertyValue(c) : b.style[c]
            }

            function g(a, b) {
                function c() {
                    var b = !1,
                        c = a.resizeSensor.offsetWidth,
                        d = a.resizeSensor.offsetHeight;
                    return i != c && (k.width = c - 1 + "px", l.width = c + 1 + "px", b = !0, i = c), j != d && (k.height = d - 1 + "px", l.height = d + 1 + "px", b = !0, j = d), b
                }
                if (a.resizedAttached) {
                    if (a.resizedAttached) return void a.resizedAttached.add(b)
                } else a.resizedAttached = new e, a.resizedAttached.add(b);
                var g = function() {
                    c() && a.resizedAttached.call()
                };
                a.resizeSensor = document.createElement("div"), a.resizeSensor.className = "resize-sensor";
                var h = "position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1;";
                a.resizeSensor.style.cssText = h, a.resizeSensor.innerHTML = '<div class="resize-sensor-overflow" style="' + h + '"><div></div></div><div class="resize-sensor-underflow" style="' + h + '"><div></div></div>', a.appendChild(a.resizeSensor), "absolute" !== f(a, "position") && (a.style.position = "relative");
                var i = -1,
                    j = -1,
                    k = a.resizeSensor.firstElementChild.firstChild.style,
                    l = a.resizeSensor.lastElementChild.firstChild.style;
                c(), d(a.resizeSensor, g), d(a.resizeSensor.firstElementChild, g), d(a.resizeSensor.lastElementChild, g)
            }
            if ("array" == typeof b || "undefined" != typeof jQuery && b instanceof jQuery || "undefined" != typeof Elements && b instanceof Elements)
                for (var h = 0, i = b.length; i > h; h++) g(b[h], c);
            else g(b, c)
        }
    }(), Erizo.AudioPlayer = function(b) {
        "use strict";
        var c, d, e = Erizo.View({});
        return e.id = b.id, e.stream = b.stream.mediaStream, e.elementID = b.elementID, e.stream_url = (a.URL || webkitURL).createObjectURL(e.stream), e.audio = document.createElement("audio"), e.audio.setAttribute("id", "stream" + e.id), e.audio.setAttribute("style", "width: 100%; height: 100%; position: absolute"), e.audio.setAttribute("autoplay", "autoplay"), b.stream instanceof Woogeen.LocalStream && (e.audio.volume = 0), void 0 !== e.elementID ? (e.destroy = function() {
            e.audio.pause(), e.parentNode.removeChild(e.div)
        }, c = function() {
            e.bar.display()
        }, d = function() {
            e.bar.hide()
        }, e.div = document.createElement("div"), e.div.setAttribute("id", "player_" + e.id), e.div.setAttribute("style", "width: 100%; height: 100%; position: relative; overflow: hidden;"), document.getElementById(e.elementID).appendChild(e.div), e.container = document.getElementById(e.elementID), e.parentNode = e.div.parentNode, e.div.appendChild(e.audio), /*e.bar = new Erizo.Bar({
            elementID: "player_" + e.id,
            id: e.id,
            stream: b.stream,
            media: e.audio,
            options: b.options
        }),*/ e.div.onmouseover = c, e.div.onmouseout = d) : (e.destroy = function() {
            e.audio.pause(), e.parentNode.removeChild(e.audio)
        }, document.body.appendChild(e.audio), e.parentNode = document.body), e.audio.src = e.stream_url, e
    }, /*Erizo.Bar = function(a) {
        "use strict";
        var b, c, d = Erizo.View({});
        return d.elementID = a.elementID, d.id = a.id, d.div = document.createElement("div"), d.div.setAttribute("id", "bar_" + d.id), d.bar = document.createElement("div"), d.bar.setAttribute("style", "width: 100%; height: 15%; max-height: 30px; position: absolute; bottom: 0; right: 0; background-color: rgba(255,255,255,0.62)"), d.bar.setAttribute("id", "subbar_" + d.id), c = function(a) {
            "block" !== a ? a = "none" : clearTimeout(b), d.div.setAttribute("style", "width: 100%; height: 100%; position: relative; bottom: 0; right: 0; display:" + a)
        }, d.display = function() {
            c("block")
        }, d.hide = function() {
            b = setTimeout(c, 1e3)
        }, document.getElementById(d.elementID).appendChild(d.div), d.div.appendChild(d.bar), a.stream.screen || void 0 !== a.options && void 0 !== a.options.speaker && a.options.speaker !== !0 || (d.speaker = new Erizo.Speaker({
            elementID: "subbar_" + d.id,
            id: d.id,
            stream: a.stream,
            media: a.media
        })), d.display(), d.hide(), d
    }, Erizo.Speaker = function(a) {
        "use strict";
        var b, c, d, e = Erizo.View({}),
            f = 50;
        return e.elementID = a.elementID, e.media = a.media, e.id = a.id, e.stream = a.stream, e.div = document.createElement("div"), e.div.setAttribute("style", "width: 40%; height: 100%; max-width: 32px; position: absolute; right: 0;z-index:0;"), e.icon = document.createElement("img"), e.icon.setAttribute("id", "volume_" + e.id), e.icon.setAttribute("src", Woogeen.Images.sound48), e.icon.setAttribute("style", "width: 80%; height: 100%; position: absolute;"), e.div.appendChild(e.icon), e.stream instanceof Woogeen.RemoteStream ? (e.picker = document.createElement("input"), e.picker.setAttribute("id", "picker_" + e.id), e.picker.type = "range", e.picker.min = 0, e.picker.max = 100, e.picker.step = 10, e.picker.value = f, e.picker.orient = "vertical", e.div.appendChild(e.picker), e.media.volume = e.picker.value / 100, e.media.muted = !1, e.picker.oninput = function() {
            e.picker.value > 0 ? (e.media.muted = !1, e.icon.setAttribute("src", Woogeen.Images.sound48)) : (e.media.muted = !0, e.icon.setAttribute("src", Woogeen.Images.mute48)), e.media.volume = e.picker.value / 100
        }, b = function(a) {
            e.picker.setAttribute("style", "width: 32px; height: 100px; position: absolute; bottom: 90%; z-index: 1;" + e.div.offsetHeight + "px; right: 0px; -webkit-appearance: slider-vertical; display: " + a)
        }, c = function() {
            e.icon.setAttribute("src", Woogeen.Images.mute48), f = e.picker.value, e.picker.value = 0, e.media.volume = 0, e.media.muted = !0
        }, d = function() {
            e.icon.setAttribute("src", Woogeen.Images.sound48), e.picker.value = f, e.media.volume = e.picker.value / 100, e.media.muted = !1
        }, e.icon.onclick = function() {
            e.media.muted ? d() : c()
        }, e.div.onmouseover = function() {
            b("block")
        }, e.div.onmouseout = function() {
            b("none")
        }, b("none")) : e.stream instanceof Woogeen.LocalStream && (c = function() {
            e.media.muted = !0, e.icon.setAttribute("src", Woogeen.Images.mute48), e.stream.mediaStream.getAudioTracks()[0].enabled = !1
        }, d = function() {
            e.media.muted = !1, e.icon.setAttribute("src", Woogeen.Images.sound48), e.stream.mediaStream.getAudioTracks()[0].enabled = !0
        }, e.icon.onclick = function() {
            e.media.muted ? d() : c()
        }), document.getElementById(e.elementID).appendChild(e.div), e
    },*/ Erizo.VideoPlayer = function(b) {
        "use strict";
        var c, d, e = Erizo.View({});
        e.id = b.id, e.stream = b.stream.mediaStream, e.elementID = b.elementID, c = function() {
            //e.bar.display()
        }, d = function() {
            //e.bar.hide()
        }, e.destroy = function() {
            e.video.pause(), delete e.resizer, e.parentNode.removeChild(e.div)
        }, e.resize = function(a) {
            var b = e.container.offsetWidth,
                c = e.container.offsetHeight;
            a ? (e.video.style.width = "calc(100% + " + (4 / 3 * c - b) + "px)", e.video.style.height = "100%", e.video.style.top = "0px", e.video.style.left = -(4 / 3 * c / 2 - b / 2) + "px") : (e.video.style.height = "100%", e.video.style.width = "100%", e.video.style.left = "0px", e.video.style.top = "0px"), e.containerWidth = b, e.containerHeight = c
        }, 
            e.stream_url = (a.URL || webkitURL).createObjectURL(e.stream), 
            
            
            
        
            e.div = document.createElement("div"), 
            e.div.setAttribute("id", "player_" + e.id), 
            e.div.setAttribute("style", "width: 100%; height: 100%; position: relative; background-color: transparent; overflow: hidden;"), 
            e.video = document.createElement("video"), 
            e.video.setAttribute("id", "stream" + e.id), 
            e.video.setAttribute("style", "width: 100%; height: 100%; position: absolute;"), 
            e.video.setAttribute("autoplay", "autoplay"), 
            
            b.stream instanceof Woogeen.LocalStream && (e.video.volume = 0), void 0 !== e.elementID ? (document.getElementById(e.elementID).appendChild(e.div), e.container = document.getElementById(e.elementID)) : (document.body.appendChild(e.div), e.container = document.body);
        var f = function() {
            function b(a) {
                var b;
                for (var c in d)
                    if ("function" == typeof a[d[c]]) {
                        b = d[c];
                        break
                    }
                    "function" == typeof a[b] && a[b]()
            }

            function c() {
                "function" == typeof document.exitFullscreen ? document.exitFullscreen() : "function" == typeof document.webkitExitFullscreen ? document.webkitExitFullscreen() : "function" == typeof document.mozCancelFullScreen && document.mozCancelFullScreen()
            }
            var d = ["requestFullScreen", "webkitRequestFullScreen", "mozRequestFullScreen", "msRequestFullScreen", "oRequestFullScreen"];
            return function(d) {
                a.innerWidth == screen.width ? c() : b(d)
            }
        }();
        
        return e.parentNode = e.div.parentNode, e.div.appendChild(e.video), e.video.addEventListener("playing", function g() {
            return e.video.videoWidth * e.video.videoHeight > 4 ? void L.Logger.debug("video dimensions:", e.video.videoWidth, e.video.videoHeight) : void setTimeout(g, 50)
        }), e.containerWidth = 0, e.containerHeight = 0, e.resizer = new L.ResizeSensor(e.container, e.resize), e.resize(), e.div.ondblclick = function() {
            f(e.video)
        }, /*e.bar = new Erizo.Bar({
            elementID: "player_" + e.id,
            id: e.id,
            stream: b.stream,
            media: e.video,
            options: b.options
        }),*/ e.div.onmouseover = c, e.div.onmouseout = d, e.video.src = e.stream_url, e
    },Erizo.VideoPlayer2 = function(b) {
        "use strict";
        var c, d, e = Erizo.View({});
        e.id = b.id, e.stream = b.stream.mediaStream, e.elementID = b.elementID, c = function() {
            //e.bar.display()
        }, d = function() {
            //e.bar.hide()
        }, e.destroy = function() {
            e.video.pause(), delete e.resizer, e.parentNode.removeChild(e.div)
        }, e.resize = function(a) {
            var b = e.container.offsetWidth,
                c = e.container.offsetHeight;
            a ? (e.video.style.width = "calc(100% + " + (4 / 3 * c - b) + "px)", e.video.style.height = "100%", e.video.style.top = "0px", e.video.style.left = -(4 / 3 * c / 2 - b / 2) + "px") : (e.video.style.height = "100%", e.video.style.width = "100%", e.video.style.left = "0px", e.video.style.top = "0px"), e.containerWidth = b, e.containerHeight = c
        }, 
            e.stream_url = (a.URL || webkitURL).createObjectURL(e.stream), 
            e.div = document.createElement("div"), 
            e.div.setAttribute("class", "colourfulBackground"), 
            b.stream instanceof Woogeen.LocalStream , void 0 !== e.elementID ? (document.getElementById(e.elementID).appendChild(e.div), e.container = document.getElementById(e.elementID)) : (document.body.appendChild(e.div), e.container = document.body),
            
            e.div1 = document.createElement("div"), 
            e.div1.setAttribute("id", "backgroundVideo"), 
        
            e.div = document.createElement("div"), 
            e.div.setAttribute("id", "player_" + e.id), 
            e.div.setAttribute("style", "width: 100%; height: 100%; position: relative; background-color: transparent; overflow: hidden;"), 
            e.video = document.createElement("video"), 
            e.video.setAttribute("id", "stream" + e.id), 
            e.video.setAttribute("style", "width: 100%; height: 100%; position: absolute;"), 
            e.video.setAttribute("autoplay", "autoplay");/*, 
            b.stream instanceof Woogeen.LocalStream && (e.video.volume = 0), void 0 !== e.elementID ? (document.getElementById(e.elementID).appendChild(e.div1), e.container = document.getElementById(e.elementID)) : (document.body.appendChild(e.div1), e.container = document.body);*/
            
        var f = function() {
            function b(a) {
                var b;
                for (var c in d)
                    if ("function" == typeof a[d[c]]) {
                        b = d[c];
                        break
                    }
                    "function" == typeof a[b] && a[b]()
            }

            function c() {
                "function" == typeof document.exitFullscreen ? document.exitFullscreen() : "function" == typeof document.webkitExitFullscreen ? document.webkitExitFullscreen() : "function" == typeof document.mozCancelFullScreen && document.mozCancelFullScreen()
            }
            var d = ["requestFullScreen", "webkitRequestFullScreen", "mozRequestFullScreen", "msRequestFullScreen", "oRequestFullScreen"];
            return function(d) {
                a.innerWidth == screen.width ? c() : b(d)
            }
        }();
        
        return e.parentNode = e.div.parentNode, e.div1.appendChild(e.video), e.video.addEventListener("playing", function g() {
            return e.video.videoWidth * e.video.videoHeight > 4 ? void L.Logger.debug("video dimensions:", e.video.videoWidth, e.video.videoHeight) : void setTimeout(g, 50)
        }), e.containerWidth = 0, e.containerHeight = 0, e.resizer = new L.ResizeSensor(e.container, e.resize), e.resize(), e.div.ondblclick = function() {
            f(e.video)
        }, /*e.bar = new Erizo.Bar({
            elementID: "player_" + e.id,
            id: e.id,
            stream: b.stream,
            media: e.video,
            options: b.options
        }),*/ e.div.onmouseover = c, e.div.onmouseout = d, e.video.src = e.stream_url, e
    }, Erizo.View = function(a) {
        "use strict";
        var b = Woogeen.EventDispatcher(a);
        return b.url = a.url || ".", b
    }, Woogeen.Images = {
        sound48: "data:image/png;base64,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",
        mute48: "data:image/png;base64,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"
    }, Woogeen.Stream.prototype.show = function(a) {
        "use strict";
        if (!this.mediaStream || this.showing === !0) return this.showing === !0;
        "string" != typeof a && (a = "stream_" + this.id());
        var b = arguments[1] || {};
        return this.elementId = a, this.hasVideo() ? ((this.player = new Erizo.VideoPlayer2({
            id: this.id(),
            stream: this,
            elementID: a,
            options: b
        }), this.showing = !0),(this.player = new Erizo.VideoPlayer({
            id: this.id(),
            stream: this,
            elementID: a,
            options: b
        }), this.showing = !0)) : this.hasAudio() && (this.player = new Erizo.AudioPlayer({
            id: this.id(),
            stream: this,
            elementID: a,
            options: b
        }), this.showing = !0), this.showing === !0
    }, Woogeen.Stream.prototype.hide = function() {
        "use strict";
        this.showing === !0 && this.player && "function" == typeof this.player.destroy && (this.player.destroy(), this.showing = !1)
    }, a.Erizo = Erizo, a.Woogeen = Woogeen, a.L = L
}(window);
