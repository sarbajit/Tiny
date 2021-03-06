/*
 * Intel WebRTC SDK version 2.8.0
 * Copyright (c) 2015 Intel <http://webrtc.intel.com>
 * Homepage: http://webrtc.intel.com
 */
! function(a) {
    function b(a) {
        "use strict";
        this.type = a.type, this.attributes = a.attributes
    }
    var c = function() {
            "use strict";
            var a = {};
            return Object.defineProperties(a, {
                version: {
                    get: function() {
                        return "2.8.0"
                    }
                },
                name: {
                    get: function() {
                        return "Intel WebRTC SDK"
                    }
                }
            }), a
        }(),
        d = {},
        e = {};
    d.Base64 = function() {
            "use strict";
            var a, b, c, d, e, f, g, h, i, j, k, l;
            for (a = -1, b = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "/"], c = [], f = 0; f < b.length; f += 1) c[b[f]] = f;
            return g = function(a) {
                d = a, e = 0
            }, h = function() {
                var b;
                return d ? e >= d.length ? a : (b = 255 & d.charCodeAt(e), e += 1, b) : a
            }, i = function(c) {
                var d, e, f;
                for (g(c), d = "", e = new Array(3), f = !1; !f && (e[0] = h()) !== a;) e[1] = h(), e[2] = h(), d += b[e[0] >> 2], e[1] !== a ? (d += b[e[0] << 4 & 48 | e[1] >> 4], e[2] !== a ? (d += b[e[1] << 2 & 60 | e[2] >> 6], d += b[63 & e[2]]) : (d += b[e[1] << 2 & 60], d += "=", f = !0)) : (d += b[e[0] << 4 & 48], d += "=", d += "=", f = !0);
                return d
            }, j = function() {
                if (!d) return a;
                for (;;) {
                    if (e >= d.length) return a;
                    var b = d.charAt(e);
                    if (e += 1, c[b]) return c[b];
                    if ("A" === b) return 0
                }
            }, k = function(a) {
                return a = a.toString(16), 1 === a.length && (a = "0" + a), a = "%" + a, unescape(a)
            }, l = function(b) {
                var c, d, e;
                for (g(b), c = "", d = new Array(4), e = !1; !e && (d[0] = j()) !== a && (d[1] = j()) !== a;) d[2] = j(), d[3] = j(), c += k(d[0] << 2 & 255 | d[1] >> 4), d[2] !== a ? (c += k(d[1] << 4 & 255 | d[2] >> 2), d[3] !== a ? c += k(d[2] << 6 & 255 | d[3]) : e = !0) : e = !0;
                return c
            }, {
                encodeBase64: i,
                decodeBase64: l
            }
        }(), d.Logger = function() {
            "use strict";
            var a, b, c, d, e, f, g, h = 0,
                i = 1,
                j = 2,
                k = 3,
                l = 4,
                m = 5,
                n = h;
            return a = function(a) {
                a > m ? a = m : h > a && (a = h), n = a
            }, b = function() {
                var a = arguments[0],
                    b = arguments;
                if (!(n > a)) {
                    switch (a) {
                        case h:
                            b[0] = "DEBUG:";
                            break;
                        case i:
                            b[0] = "TRACE:";
                            break;
                        case j:
                            b[0] = "INFO:";
                            break;
                        case k:
                            b[0] = "WARNING:";
                            break;
                        case l:
                            b[0] = "ERROR:";
                            break;
                        default:
                            return
                    }
                    console.log.apply(console, b)
                }
            }, c = function() {
                for (var a = [h], c = 0; c < arguments.length; c++) a.push(arguments[c]);
                b.apply(this, a)
            }, d = function() {
                for (var a = [i], c = 0; c < arguments.length; c++) a.push(arguments[c]);
                b.apply(this, a)
            }, e = function() {
                for (var a = [j], c = 0; c < arguments.length; c++) a.push(arguments[c]);
                b.apply(this, a)
            }, f = function() {
                for (var a = [k], c = 0; c < arguments.length; c++) a.push(arguments[c]);
                b.apply(this, a)
            }, g = function() {
                for (var a = [l], c = 0; c < arguments.length; c++) a.push(arguments[c]);
                b.apply(this, a)
            }, {
                DEBUG: h,
                TRACE: i,
                INFO: j,
                WARNING: k,
                ERROR: l,
                NONE: m,
                setLogLevel: a,
                log: b,
                debug: c,
                trace: d,
                info: e,
                warning: f,
                error: g
            }
        }(),
        function() {
            "use strict";

            function b(a) {
                this.mediaStream = a.mediaStream, a.attributes = a.attributes || {}, this.url = function() {
                    return "string" == typeof a.url && "" !== a.url ? a.url : void 0
                }, this.hasVideo = function() {
                    return !!a.video
                }, this.hasAudio = function() {
                    return !!a.audio
                }, this.attributes = function() {
                    return a.attributes
                }, this.attr = function(b, c) {
                    return arguments.length > 1 && (a.attributes[b] = c), a.attributes[b]
                }, this.id = function() {
                    return a.id || null
                }, this.isScreen = function() {
                    return !!a.video && "screen" === a.video.device
                }, this.bitRate = {
                    maxVideoBW: void 0,
                    maxAudioBW: void 0
                }, this.toJson = function() {
                    return {
                        id: this.id(),
                        audio: a.audio,
                        video: a.video,
                        attributes: a.attributes
                    }
                }
            }

            function d(a) {
                b.call(this, a)
            }

            function e(a) {
                b.call(this, a), this.isMixed = function() {
                    return !1
                }, this.from = a.from;
                var c = {},
                    d = this;
                Object.defineProperties(this, {
                    on: {
                        get: function() {
                            return function(a, b) {
                                return c[a] = c[a] || [], c[a].push(b), d
                            }
                        }
                    },
                    emit: {
                        get: function() {
                            return function(a) {
                                if (c[a]) {
                                    var b = [].slice.call(arguments, 1);
                                    c[a].map(function(a) {
                                        a.apply(d, b)
                                    })
                                }
                                return d
                            }
                        }
                    },
                    removeListener: {
                        get: function() {
                            return function(a, b) {
                                return void 0 === b ? c[a] = [] : c[a] && c[a].map(function(d, e) {
                                    d === b && c[a].splice(e, 1)
                                }), d
                            }
                        }
                    },
                    clearListeners: {
                        get: function() {
                            return function() {
                                return c = {}, d
                            }
                        }
                    }
                })
            }

            function f(a) {
                e.call(this, a), this.resolutions = function() {
                    return a.video.resolutions instanceof Array ? a.video.resolutions.map(function(a) {
                        return a
                    }) : []
                }, this.isMixed = function() {
                    return !0
                }
            }

            function g() {
                return null !== a.navigator.appVersion.match(/Chrome\/([\w\W]*?)\./) && a.navigator.appVersion.match(/Chrome\/([\w\W]*?)\./)[1] <= 35
            }

            function h() {
                return a.navigator.appVersion.indexOf("Trident") > -1 && a.navigator.appVersion.indexOf("rv") > -1
            }

            function i(a, b) {
                return {
                    mandatory: {
                        minWidth: a,
                        minHeight: b,
                        maxWidth: a,
                        maxHeight: b
                    },
                    optional: []
                }
            }

            function j(b, d) {
                if ("object" == typeof b && null !== b && void 0 !== b.url) {
                    var e = new c.LocalStream(b);
                    return void("function" == typeof d && d(null, e))
                }
                if ("function" != typeof l && !h()) return void("function" == typeof d && d({
                    code: 1100,
                    msg: "webrtc support not available"
                }));
                var f = arguments[3];
                void 0 === f && (f = 2);
                var i = {};
                if ("object" == typeof b && null !== b) {
                    if (b.video) {
                        if ("screen" === b.video.device && a.navigator.appVersion.match(/Chrome\/([\w\W]*?)\./)[1] < 34 && "function" == typeof d) return void d({
                            code: 1103,
                            msg: "browser screen sharing not supported"
                        });
                        i.video = JSON.parse(JSON.stringify(k[b.video.resolution] || k.unspecified)), h() || !g() && b.video.frameRate instanceof Array && b.video.frameRate.length >= 2 && (i.video.mandatory.minFrameRate = b.video.frameRate[0], i.video.mandatory.maxFrameRate = b.video.frameRate[1])
                    }
                    b.audio && (i.audio = !0)
                } else if ("function" == typeof d) return void d({
                    code: 1107,
                    msg: "USER_INPUT_INVALID"
                });
                var m = function(a) {
                        b.mediaStream = a;
                        var e = new c.LocalStream(b);
                        if (b.video && "screen" === b.video.device && (a.onended = function() {
                                e.close()
                            }), i.video) switch (i.video.mandatory.maxWidth) {
                            case 320:
                                e.bitRate.maxVideoBW = 512;
                                break;
                            case 640:
                                e.bitRate.maxVideoBW = 1024;
                                break;
                            case 1280:
                                e.bitRate.maxVideoBW = 2048
                        }
                        "function" == typeof d && d(null, e)
                    },
                    n = function(a) {
                        var c = {
                            code: 1100,
                            msg: a.name || a
                        };
                        switch (c.msg) {
                            case "Starting video failed":
                            case "TrackStartError":
                                if (b.video = {
                                        device: b.video.device,
                                        extensionId: b.video.extensionId
                                    }, f > 0) return void setTimeout(function() {
                                    j(b, d, f - 1)
                                }, 1);
                                c.msg = "MEDIA_OPTION_INVALID", c.code = 1104;
                                break;
                            case "DevicesNotFoundError":
                                c.msg = "DEVICES_NOT_FOUND", c.code = 1102;
                                break;
                            case "NotSupportedError":
                                c.msg = "NOT_SUPPORTED", c.code = 1105;
                                break;
                            case "PermissionDeniedError":
                                c.msg = "PERMISSION_DENIED", c.code = 1101;
                                break;
                            case "PERMISSION_DENIED":
                                c.code = 1101;
                                break;
                            case "ConstraintNotSatisfiedError":
                                c.msg = "CONSTRAINT_NOT_SATISFIED", c.code = 1106;
                                break;
                            default:
                                c.msg || (c.msg = "UNDEFINED")
                        }
                        "function" == typeof d && d(c)
                    };
                if (b.video && "screen" === b.video.device) {
                    var o = b.video.extensionId || "pndohhifhheefbpeljcmnhnkphepimhe";
                    i.audio = !1;
                    try {
                        chrome.runtime.sendMessage(o, {
                            getStream: !0
                        }, function(a) {
                            return void 0 === a ? void("function" == typeof d && d({
                                code: 1103,
                                msg: "screen sharing plugin inaccessible"
                            })) : (i.video.mandatory.chromeMediaSource = "desktop", i.video.mandatory.chromeMediaSourceId = a.streamId, void l.apply(navigator, [i, m, n]))
                        })
                    } catch (p) {
                        "function" == typeof d && d({
                            code: 1103,
                            msg: "screen sharing plugin inaccessible",
                            err: p
                        })
                    }
                } else h() ? navigator.getUserMedia(i, m, n) : l.apply(navigator, [i, m, n])
            }
            b.prototype.close = function() {
                "function" == typeof this.hide && this.hide(), this.mediaStream && this.mediaStream.getTracks().map(function(a) {
                    "function" == typeof a.stop && a.stop()
                }), this.mediaStream = null, "function" == typeof this.unpublish && this.unpublish(), this.channel && "function" == typeof this.channel.close && this.channel.close()
            }, b.prototype.createObjectURL = function() {
                return this.mediaStream ? (a.URL || webkitURL).createObjectURL(this.mediaStream) : ""
            }, b.prototype.disableAudio = function(a) {
                var b = this;
                if (b.hasAudio() && b.mediaStream) {
                    if (void 0 === a && (a = 0), -1 === a) return b.mediaStream.getAudioTracks().map(function(a) {
                        return a.enabled ? (a.enabled = !1, !0) : !1
                    });
                    var c = b.mediaStream.getAudioTracks();
                    if (c && c[a] && c[a].enabled) return c[a].enabled = !1, !0
                }
                return !1
            }, b.prototype.enableAudio = function(a) {
                var b = this;
                if (b.hasAudio() && b.mediaStream) {
                    if (void 0 === a && (a = 0), -1 === a) return b.mediaStream.getAudioTracks().map(function(a) {
                        return a.enabled !== !0 ? (a.enabled = !0, !0) : !1
                    });
                    var c = b.mediaStream.getAudioTracks();
                    if (c && c[a] && c[a].enabled !== !0) return c[a].enabled = !0, !0
                }
                return !1
            }, b.prototype.disableVideo = function(a) {
                var b = this;
                if (b.hasVideo() && b.mediaStream) {
                    if (void 0 === a && (a = 0), -1 === a) return b.mediaStream.getVideoTracks().map(function(a) {
                        return a.enabled ? (a.enabled = !1, !0) : !1
                    });
                    var c = b.mediaStream.getVideoTracks();
                    if (c && c[a] && c[a].enabled) return c[a].enabled = !1, !0
                }
                return !1
            }, b.prototype.enableVideo = function(a) {
                var b = this;
                if (b.hasVideo() && b.mediaStream) {
                    if (void 0 === a && (a = 0), -1 === a) return b.mediaStream.getVideoTracks().map(function(a) {
                        return a.enabled !== !0 ? (a.enabled = !0, !0) : !1
                    });
                    var c = b.mediaStream.getVideoTracks();
                    if (c && c[a] && c[a].enabled !== !0) return c[a].enabled = !0, !0
                }
                return !1
            }, d.prototype = Object.create(b.prototype), e.prototype = Object.create(b.prototype), f.prototype = Object.create(e.prototype), d.prototype.constructor = d, e.prototype.constructor = e, f.prototype.constructor = f;
            var k = {
                    "true": {
                        mandatory: {}
                    },
                    unspecified: {
                        mandatory: {}
                    },
                    sif: i(320, 240),
                    vga: i(640, 480),
                    hd720p: i(1280, 720),
                    hd1080p: i(1920, 1080)
                },
                l = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
            d.create = function() {
                j.apply(this, arguments)
            }, c.Stream = b, c.LocalStream = d, c.RemoteStream = e, c.RemoteMixedStream = f
        }(), c.EventDispatcher = function(a) {
            "use strict";
            var b = {};
            return a.dispatcher = {}, a.dispatcher.eventListeners = {}, b.addEventListener = function(b, c) {
                void 0 === a.dispatcher.eventListeners[b] && (a.dispatcher.eventListeners[b] = []), a.dispatcher.eventListeners[b].push(c)
            }, b.on = b.addEventListener, b.removeEventListener = function(b, c) {
                if (a.dispatcher.eventListeners[b]) {
                    var d = a.dispatcher.eventListeners[b].indexOf(c); - 1 !== d && a.dispatcher.eventListeners[b].splice(d, 1)
                }
            }, b.clearEventListener = function(b) {
                a.dispatcher.eventListeners[b] = []
            }, b.dispatchEvent = function(b) {
                a.dispatcher.eventListeners[b.type] && a.dispatcher.eventListeners[b.type].map(function(a) {
                    a(b)
                })
            }, b
        }, c.StreamEvent = function(a) {
            "use strict";
            b.call(this, a), this.stream = a.stream, this.msg = a.msg
        }, c.ClientEvent = function(a) {
            "use strict";
            b.call(this, a), this.user = a.user
        }, c.MessageEvent = function(a) {
            "use strict";
            b.call(this, a), this.msg = a.msg
        }, c.ChatEvent = function(a) {
            "use strict";
            b.call(this, a), this.type = a.type, this.senderId = a.senderId, this.peerId = a.peerId
        }, c.DataEvent = function(a) {
            "use strict";
            b.call(this, a), this.type = a.type, this.senderId = a.senderId, this.data = a.data
        }, c.StreamEvent.prototype = Object.create(b.prototype), c.StreamEvent.prototype.constructor = c.StreamEvent, c.ClientEvent.prototype = Object.create(b.prototype), c.ClientEvent.prototype.constructor = c.ClientEvent, c.MessageEvent.prototype = Object.create(b.prototype), c.MessageEvent.prototype.constructor = c.MessageEvent, c.ChatEvent.prototype = Object.create(b.prototype), c.ChatEvent.prototype.constructor = c.ChatEvent, c.DataEvent.prototype = Object.create(b.prototype), c.DataEvent.prototype.constructor = c.DataEvent, c.ConferenceClient = function() {
            "use strict";

            function b() {
                var a = arguments[0];
                if ("function" == typeof a) {
                    var b = Array.prototype.slice.call(arguments, 1);
                    a.apply(null, b)
                }
            }

            function f(b) {
                b.session_id = c.sessionId += 1;
                var d;
                if (null !== a.navigator.userAgent.match("Firefox")) d = e.FirefoxStack(b), d.browser = "mozilla";
                else if (a.navigator.appVersion.indexOf("Trident") > -1) d = e.IEStableStack(b), d.browser = "internet-explorer";
                else {
                    if (!(a.navigator.appVersion.match(/Chrome\/([\w\W]*?)\./)[1] >= 26)) throw "WebRTC stack not available";
                    d = e.ChromeStableStack(b), d.browser = "chrome-stable"
                }
                return d
            }

            function g(a) {
                if (!a.video) return new c.RemoteStream(a);
                switch (a.video.device) {
                    case "mcu":
                        return new c.RemoteMixedStream(a);
                    default:
                        return new c.RemoteStream(a)
                }
            }

            function h(a) {
                var e = a || {};
                this.remoteStreams = {}, this.localStreams = {}, e.state = l, this.setIceServers = function() {
                    return e.userSetIceServers = [], Array.prototype.slice.call(arguments, 0).map(function(a) {
                        a instanceof Array ? a.map(function(a) {
                            "object" == typeof a && null !== a && "string" == typeof a.url && "" !== a.url ? e.userSetIceServers.push(a) : "string" == typeof a && "" !== a && e.userSetIceServers.push({
                                url: a
                            })
                        }) : "object" == typeof a && null !== a && "string" == typeof a.url && "" !== a.url ? e.userSetIceServers.push(a) : "string" == typeof a && "" !== a && e.userSetIceServers.push({
                            url: a
                        })
                    }), e.userSetIceServers
                }, this.getIceServers = function() {
                    return e.userSetIceServers
                }, Object.defineProperties(this, {
                    state: {
                        get: function() {
                            return e.state
                        }
                    }
                }), this.join = function(a, h, i) {
                    var k = this;
                    try {
                        a = JSON.parse(d.Base64.decodeBase64(a))
                    } catch (p) {
                        return b(i, "invalid token")
                    }
                    var q = a.secure === !0,
                        r = a.host;
                    if ("string" != typeof r) return b(i, "invalid host");
                    if (-1 === r.indexOf("http") && (r = q ? "https://" + r : "http://" + r), k.state !== l) return b(i, "connection state invalid");
                    if (k.on("server-disconnected", function() {
                            e.state = l, k.myId = null;
                            var a, b;
                            for (a in k.remoteStreams)
                                if (k.remoteStreams.hasOwnProperty(a)) {
                                    b = k.remoteStreams[a], b.close(), delete k.remoteStreams[a];
                                    var d = new c.StreamEvent({
                                        type: "stream-removed",
                                        stream: b
                                    });
                                    k.dispatchEvent(d)
                                }
                            for (a in k.localStreams) k.localStreams.hasOwnProperty(a) && (b = k.localStreams[a], b.channel && "function" == typeof b.channel.close && b.channel.close(), delete k.localStreams[a]);
                            try {
                                k.socket.disconnect()
                            } catch (f) {}
                        }), e.state = m, void 0 !== k.socket) k.socket.connect();
                    else {
                        var s = function(a) {
                            var b = a.stream;
                            b.channel && "function" == typeof b.signalOnPlayAudio ? k.dispatchEvent(a) : b.channel && "closed" !== b.channel.state ? setTimeout(function() {
                                s(a)
                            }, 20) : d.Logger.warning("event missed:", a.type)
                        };
                        k.socket = io.connect(r, {
                            reconnect: !1,
                            secure: q,
                            "force new connection": !0
                        }), k.socket.on("onAddStream", function(a) {
                            if (void 0 !== k.remoteStreams[a.id]) return void d.Logger.warning("stream already added:", a.id);
                            var b = g({
                                    video: a.video,
                                    audio: a.audio,
                                    id: a.id,
                                    from: a.from,
                                    attributes: a.attributes
                                }),
                                e = new c.StreamEvent({
                                    type: "stream-added",
                                    stream: b
                                });
                            k.remoteStreams[a.id] = b, k.dispatchEvent(e)
                        }), k.socket.on("onRemoveStream", function(a) {
                            var b = k.remoteStreams[a.id];
                            if (b) {
                                b.close(), delete k.remoteStreams[a.id];
                                var d = new c.StreamEvent({
                                    type: "stream-removed",
                                    stream: b
                                });
                                k.dispatchEvent(d)
                            }
                        }), k.socket.on("onSubscribeP2P", function(a) {
                            var b = k.localStreams[a.streamId];
                            void 0 === b.channel && (b.channel = {}), b.channel[a.subsSocket] = f({
                                callback: function(c) {
                                    j(k.socket, "publish", {
                                        state: "p2pSignaling",
                                        streamId: a.streamId,
                                        subsSocket: a.subsSocket
                                    }, c, function(c) {
                                        return "error" === c || "timeout" === c ? void d.Logger.warning("invalid answer") : (b.channel[a.subsSocket].onsignalingmessage = function() {
                                            b.channel[a.subsSocket].onsignalingmessage = function() {}
                                        }, void b.channel[a.subsSocket].processSignalingMessage(c))
                                    })
                                },
                                audio: b.hasAudio(),
                                video: b.hasVideo(),
                                stunServerUrl: k.connSettings.stun,
                                turnServer: k.connSettings.turn
                            }), b.channel[a.subsSocket].addStream(b.mediaStream), b.channel[a.subsSocket].oniceconnectionstatechange = function(c) {
                                "disconnected" === c && (b.channel[a.subsSocket].close(), delete b.channel[a.subsSocket])
                            }
                        }), k.socket.on("onPublishP2P", function(a, d) {
                            var e = k.remoteStreams[a.streamId];
                            e.channel = f({
                                callback: function() {},
                                stunServerUrl: k.connSettings.stun,
                                turnServer: k.connSettings.turn,
                                maxAudioBW: k.connSettings.maxAudioBW,
                                maxVideoBW: k.connSettings.maxVideoBW
                            }), e.channel.onsignalingmessage = function(a) {
                                e.channel.onsignalingmessage = function() {}, b(d, a)
                            }, e.channel.processSignalingMessage(a.sdp), e.channel.onaddstream = function(a) {
                                e.mediaStream = a.stream, o.dispatchEvent(new c.StreamEvent({
                                    type: "p2p-stream-subscribed",
                                    stream: e
                                }))
                            }
                        }), k.socket.on("onVideoHold", function(a) {
                            var b = k.remoteStreams[a.id];
                            if (b) {
                                var d = new c.StreamEvent({
                                    type: "video-hold",
                                    stream: b
                                });
                                s(d)
                            }
                        }), k.socket.on("onVideoReady", function(a) {
                            var b = k.remoteStreams[a.id];
                            if (b) {
                                var d = new c.StreamEvent({
                                    type: "video-ready",
                                    stream: b
                                });
                                s(d)
                            }
                        }), k.socket.on("onAudioHold", function(a) {
                            var b = k.remoteStreams[a.id];
                            if (b) {
                                var d = new c.StreamEvent({
                                    type: "audio-hold",
                                    stream: b
                                });
                                s(d)
                            }
                        }), k.socket.on("onAudioReady", function(a) {
                            var b = k.remoteStreams[a.id];
                            if (b) {
                                var d = new c.StreamEvent({
                                    type: "audio-ready",
                                    stream: b
                                });
                                s(d)
                            }
                        }), k.socket.on("onAllAudioHold", function() {
                            for (var a in k.remoteStreams)
                                if (k.remoteStreams.hasOwnProperty(a)) {
                                    var b = k.remoteStreams[a],
                                        d = new c.StreamEvent({
                                            type: "audio-hold",
                                            stream: b
                                        });
                                    s(d)
                                }
                        }), k.socket.on("onAllAudioReady", function() {
                            for (var a in k.remoteStreams)
                                if (k.remoteStreams.hasOwnProperty(a)) {
                                    var b = k.remoteStreams[a],
                                        d = new c.StreamEvent({
                                            type: "audio-ready",
                                            stream: b
                                        });
                                    s(d)
                                }
                        }), k.socket.on("onUpdateStream", function(a) {
                            var b = k.remoteStreams[a.id];
                            b && b.emit(a.event, a.data)
                        }), k.socket.on("disconnect", function() {
                            if (e.state !== l) {
                                var a = new c.ClientEvent({
                                    type: "server-disconnected"
                                });
                                k.dispatchEvent(a)
                            }
                        }), k.socket.on("onUserJoin", function(a) {
                            var b = new c.ClientEvent({
                                type: "user-joined",
                                user: a.user
                            });
                            k.dispatchEvent(b)
                        }), k.socket.on("onUserLeave", function(a) {
                            var b = new c.ClientEvent({
                                type: "user-left",
                                user: a.user
                            });
                            k.dispatchEvent(b)
                        }), k.socket.on("onCustomMessage", function(a) {
                            var b = new c.MessageEvent({
                                type: "message-received",
                                msg: a
                            });
                            k.dispatchEvent(b)
                        }), k.socket.on("connect_failed", function(a) {
                            b(i, a || "connection_failed")
                        }), k.socket.on("error", function(a) {
                            b(i, a || "connection_error")
                        })
                    }
                    try {
                        k.socket.emit("token", a, function(a, c) {
                            if ("success" === a) {
                                k.connSettings = {
                                    turn: c.turnServer,
                                    stun: c.stunServerUrl,
                                    defaultVideoBW: c.defaultVideoBW,
                                    maxVideoBW: c.maxVideoBW
                                }, k.myId = c.clientId, k.conferenceId = c.id, k.p2p = c.p2p, e.state = n;
                                var d = c.streams.map(function(a) {
                                    return k.remoteStreams[a.id] = g(a), k.remoteStreams[a.id]
                                });
                                return b(h, {
                                    streams: d,
                                    users: c.users
                                })
                            }
                            return b(i, c || "response error")
                        })
                    } catch (t) {
                        b(i, "socket emit error")
                    }
                }
            }

            function i(a, b, c, d) {
                if (!a || !a.connected) return d("socket not ready");
                try {
                    a.emit(b, c, function(a, b) {
                        return "success" === a ? d(null, b) : d(b || "response error")
                    })
                } catch (e) {
                    d("socket emit error")
                }
            }

            function j(a, b, c, d, e) {
                if (!a || !a.connected) return e("error", "socket not ready");
                try {
                    a.emit(b, c, d, function(a, b) {
                        e(a, b)
                    })
                } catch (f) {
                    e("error", "socket emit error")
                }
            }

            function k(a, c, d, e, f) {
                var g = {
                    type: "control",
                    payload: {
                        action: c,
                        streamId: d
                    }
                };
                i(a, "customMessage", g, function(a, c) {
                    return a ? b(f, a) : void b(e, c)
                })
            }
            c.sessionId = 103;
            var l = 0,
                m = 1,
                n = 2,
                o = c.EventDispatcher({});
            return h.prototype = c.EventDispatcher({}), h.prototype.leave = function() {
                var a = new c.ClientEvent({
                    type: "server-disconnected"
                });
                this.dispatchEvent(a)
            }, h.prototype.send = function(a, c, d, e) {
                if (void 0 === a || null === a || "function" == typeof a) return b(e, "nothing to send");
                if ("undefined" == typeof c) c = "all";
                else if ("string" == typeof c);
                else {
                    if ("function" != typeof c) return b(e, "invalid receiver");
                    e = d, d = c, c = "all"
                }
                i(this.socket, "customMessage", {
                    type: "data",
                    data: a,
                    receiver: c
                }, function(a, c) {
                    return a ? b(e, a) : void b(d, c)
                })
            }, h.prototype.publish = function(a, e, g, h) {
                var l = this;
                if (a = a || {}, "function" == typeof e ? (h = g, g = e, e = a.bitRate) : ("object" != typeof e || null === e) && (e = a.bitRate), !(a instanceof c.LocalStream) || ("object" != typeof a.mediaStream || null === a.mediaStream) && void 0 === a.url()) return b(h, "invalid stream");
                if (void 0 !== l.localStreams[a.id()]) return b(h, "already published");
                var m = a.toJson();
                return e.unmix === !0 && (m.unmix = !0), void 0 !== a.url() ? (m.state = "url", m.transport = e.transport, m.bufferSize = e.bufferSize, void j(l.socket, "publish", m, a.url(), function(c, d) {
                    return "success" !== c ? b(h, c) : (a.id = function() {
                        return d
                    }, a.unpublish = function(b, c) {
                        l.unpublish(a, b, c)
                    }, l.localStreams[d] = a, void b(g, a))
                })) : l.p2p ? (l.connSettings.maxVideoBW = e.maxVideoBW, l.connSettings.maxAudioBW = e.maxAudioBW, m.state = "p2p", void j(l.socket, "publish", m, null, function(c, d) {
                    return "error" === c ? b(h, c) : (a.id = function() {
                        return d
                    }, a.unpublish = function(b, c) {
                        l.unpublish(a, b, c)
                    }, l.localStreams[d] = a, void b(g, a))
                })) : (e.maxVideoBW = e.maxVideoBW || l.connSettings.defaultVideoBW, e.maxVideoBW > l.connSettings.maxVideoBW && (e.maxVideoBW = l.connSettings.maxVideoBW), a.channel = f({
                    callback: function(c) {
                        m.state = "offer", j(l.socket, "publish", m, c, function(c, e) {
                            if ("error" === c) return b(h, e);
                            if ("timeout" === c) return b(h, c);
                            a.channel.onsignalingmessage = function() {};
                            var f = function() {
                                    a.id = function() {
                                        return e
                                    }, l.localStreams[e] = a, a.signalOnPlayAudio = function(a, b) {
                                        k(l.socket, "audio-out-on", e, a, b)
                                    }, a.signalOnPauseAudio = function(a, b) {
                                        k(l.socket, "audio-out-off", e, a, b)
                                    }, a.signalOnPlayVideo = function(a, b) {
                                        k(l.socket, "video-out-on", e, a, b)
                                    }, a.signalOnPauseVideo = function(a, b) {
                                        k(l.socket, "video-out-off", e, a, b)
                                    }, a.unpublish = function(b, c) {
                                        l.unpublish(a, b, c)
                                    }, b(g, a), f = function() {}, j = function() {}
                                },
                                j = function() {
                                    i(l.socket, "unpublish", e, function() {}, function() {}), a.channel.close(), a.channel = void 0, b(h, "peer connection failed"), f = function() {}, j = function() {}
                                };
                            a.channel.oniceconnectionstatechange = function(a) {
                                switch (a) {
                                    case "completed":
                                    case "connected":
                                        f();
                                        break;
                                    case "checking":
                                    case "closed":
                                        break;
                                    case "failed":
                                        j();
                                        break;
                                    default:
                                        d.Logger.warning("unknown ice connection state:", a)
                                }
                            }, a.channel.processSignalingMessage(c)
                        })
                    },
                    video: a.hasVideo(),
                    audio: a.hasAudio(),
                    iceServers: l.getIceServers(),
                    stunServerUrl: l.connSettings.stun,
                    turnServer: l.connSettings.turn,
                    maxAudioBW: e.maxAudioBW,
                    maxVideoBW: e.maxVideoBW,
                    videoCodec: e.videoCodec
                }), void a.channel.addStream(a.mediaStream))
            }, h.prototype.mix = function(a, d, e) {
                return a instanceof c.LocalStream ? void i(this.socket, "addToMixer", a.id(), function(a) {
                    return a ? b(e, a) : void b(d, null)
                }) : b(e, "invalid stream")
            }, h.prototype.unmix = function(a, d, e) {
                return a instanceof c.LocalStream ? void i(this.socket, "removeFromMixer", a.id(), function(a) {
                    return a ? b(e, a) : void b(d, null)
                }) : b(e, "invalid stream")
            }, h.prototype.unpublish = function(a, d, e) {
                var f = this;
                return a instanceof c.LocalStream ? void i(f.socket, "unpublish", a.id(), function(c) {
                    return c ? b(e, c) : (a.channel && "function" == typeof a.channel.close && (a.channel.close(), a.channel = null), delete f.localStreams[a.id()], a.id = function() {
                        return null
                    }, a.signalOnPlayAudio = void 0, a.signalOnPauseAudio = void 0, a.signalOnPlayVideo = void 0, a.signalOnPauseVideo = void 0, delete a.unpublish, void b(d, null))
                }) : b(e, "invalid stream")
            }, h.prototype.subscribe = function(a, e, g, h) {
                var l = this,
                    m = !1;
                if ("function" == typeof e ? (h = g, g = e, e = {}) : ("object" != typeof e || null === e) && (e = {}), !(a instanceof c.RemoteStream)) return b(h, "invalid stream");
                if (l.p2p) return o.on("p2p-stream-subscribed", function q(a) {
                    o.removeEventListener("p2p-stream-subscribed", q), b(g, a.stream)
                }), void j(l.socket, "subscribe", {
                    streamId: a.id()
                }, null, function() {});
                if (e.audio === !1 && e.video === !1) return b(h, "no audio or video to subscribe.");
                a.channel = f({
                    callback: function(c) {
                        "OFFER" === JSON.parse(c).messageType && j(l.socket, "subscribe", {
                            streamId: a.id(),
                            audio: a.hasAudio() && e.audio !== !1,
                            video: a.hasVideo() && e.video
                        }, c, function(c, d) {
                            return "error" === c || "timeout" === c ? b(h, d || c) : void a.channel.processSignalingMessage(c)
                        })
                    },
                    audio: a.hasAudio() && e.audio !== !1,
                    video: a.hasVideo() && e.video !== !1,
                    iceServers: l.getIceServers(),
                    stunServerUrl: l.connSettings.stun,
                    turnServer: l.connSettings.turn,
                    videoCodec: e.videoCodec
                }), a.channel.onaddstream = function(c) {
                    a.mediaStream = c.stream, navigator.appVersion.indexOf("Trident") > -1 && (a.pcid = c.pcid), m ? b(g, a) : m = !0
                };
                var n = function() {
                        a.signalOnPlayAudio = function(b, c) {
                            k(l.socket, "audio-in-on", a.id(), b, c)
                        }, a.signalOnPauseAudio = function(b, c) {
                            k(l.socket, "audio-in-off", a.id(), b, c)
                        }, a.signalOnPlayVideo = function(b, c) {
                            k(l.socket, "video-in-on", a.id(), b, c)
                        }, a.signalOnPauseVideo = function(b, c) {
                            k(l.socket, "video-in-off", a.id(), b, c)
                        }, m ? b(g, a) : m = !0, n = function() {}, p = function() {}
                    },
                    p = function() {
                        i(l.socket, "unsubscribe", a.id(), function() {}, function() {}), a.close(), a.signalOnPlayAudio = void 0, a.signalOnPauseAudio = void 0, a.signalOnPlayVideo = void 0, a.signalOnPauseVideo = void 0, b(h, "peer connection failed"), n = function() {}, p = function() {}
                    };
                a.channel.oniceconnectionstatechange = function(a) {
                    switch (a) {
                        case "completed":
                        case "connected":
                            n();
                            break;
                        case "checking":
                        case "closed":
                            break;
                        case "failed":
                            p();
                            break;
                        default:
                            d.Logger.warning("unknown ice connection state:", a)
                    }
                }
            }, h.prototype.unsubscribe = function(a, d, e) {
                var f = this;
                return a instanceof c.RemoteStream ? void i(f.socket, "unsubscribe", a.id(), function(c, f) {
                    return c ? b(e, c) : (a.close(), a.signalOnPlayAudio = void 0, a.signalOnPauseAudio = void 0, a.signalOnPlayVideo = void 0, a.signalOnPauseVideo = void 0, void b(d, f))
                }) : b(e, "invalid stream")
            }, h.prototype.onMessage = function(a) {
                "function" == typeof a && this.on("message-received", a)
            }, h.prototype.shareScreen = function(a, d, e) {
                var f = this;
                "function" == typeof a && (e = d, d = a, a = {}), a = a || {}, c.LocalStream.create({
                    video: {
                        device: "screen",
                        extensionId: a.extensionId,
                        resolution: a.resolution,
                        frameRate: a.frameRate
                    },
                    audio: !1
                }, function(a, c) {
                    return a ? b(e, a) : void f.publish(c, function(a) {
                        b(d, a)
                    }, function(a) {
                        b(e, a)
                    })
                })
            }, h.prototype.playAudio = function(a, b, d) {
                return a instanceof c.Stream && a.hasAudio() && "function" == typeof a.signalOnPlayAudio ? a.signalOnPlayAudio(b, d) : void("function" == typeof d && d("unable to call playAudio"))
            }, h.prototype.pauseAudio = function(a, b, d) {
                return a instanceof c.Stream && a.hasAudio() && "function" == typeof a.signalOnPauseAudio ? a.signalOnPauseAudio(b, d) : void("function" == typeof d && d("unable to call pauseAudio"))
            }, h.prototype.playVideo = function(a, b, d) {
                return a instanceof c.Stream && a.hasVideo() && "function" == typeof a.signalOnPlayVideo ? a.signalOnPlayVideo(b, d) : void("function" == typeof d && d("unable to call playVideo"))
            }, h.prototype.pauseVideo = function(a, b, d) {
                return a instanceof c.Stream && a.hasVideo() && "function" == typeof a.signalOnPauseVideo ? a.signalOnPauseVideo(b, d) : void("function" == typeof d && d("unable to call pauseVideo"))
            }, h.prototype.startRecorder = function(a, c, d) {
                var e = this;
                "function" == typeof a ? (d = c, c = a, a = {}) : ("object" != typeof a || null === a) && (a = {}), i(e.socket, "startRecorder", a, function(a, e) {
                    return a ? b(d, a) : void b(c, e)
                })
            }, h.prototype.stopRecorder = function(a, c, d) {
                var e = this;
                "function" == typeof a ? (d = c, c = a, a = {}) : ("object" != typeof a || null === a) && (a = {}), i(e.socket, "stopRecorder", a, function(a, e) {
                    return a ? b(d, a) : void b(c, e)
                })
            }, h.prototype.getRegion = function(a, c, d) {
                var e = this;
                return "object" != typeof a || null === a || "string" != typeof a.id || "" === a.id ? b(d, "invalid options") : void i(e.socket, "getRegion", {
                    id: a.id
                }, function(a, e) {
                    return a ? b(d, a) : void b(c, e)
                })
            }, h.prototype.setRegion = function(a, c, d) {
                var e = this;
                return "object" != typeof a || null === a || "string" != typeof a.id || "" === a.id || "string" != typeof a.region || "" === a.region ? b(d, "invalid options") : void i(e.socket, "setRegion", {
                    id: a.id,
                    region: a.region
                }, function(a, e) {
                    return a ? b(d, a) : void b(c, e)
                })
            }, h.prototype.setVideoBitrate = function(a, c, d) {
                var e = this;
                "function" == typeof a ? (d = c, c = a, a = {}) : ("object" != typeof a || null === a) && (a = {}), i(e.socket, "setVideoBitrate", a, function(a, e) {
                    return a ? b(d, a) : void b(c, e)
                })
            }, h.create = function(a) {
                return new h(a)
            }, h
        }(), e.ChromeStableStack = function(b) {
            "use strict";
            var c = {},
                e = webkitRTCPeerConnection;
            c.pc_config = {
                iceServers: []
            }, c.con = {
                optional: [{
                    DtlsSrtpKeyAgreement: !0
                }]
            }, b.iceServers instanceof Array ? c.pc_config.iceServers = b.iceServers : (b.stunServerUrl && (b.stunServerUrl instanceof Array ? b.stunServerUrl.map(function(a) {
                "string" == typeof a && "" !== a && c.pc_config.iceServers.push({
                    url: a
                })
            }) : "string" == typeof b.stunServerUrl && "" !== b.stunServerUrl && c.pc_config.iceServers.push({
                url: b.stunServerUrl
            })), b.turnServer && (b.turnServer instanceof Array ? b.turnServer.map(function(a) {
                "string" == typeof a.url && "" !== a.url && c.pc_config.iceServers.push({
                    username: a.username,
                    credential: a.password,
                    url: a.url
                })
            }) : "string" == typeof b.turnServer.url && "" !== b.turnServer.url && c.pc_config.iceServers.push({
                username: b.turnServer.username,
                credential: b.turnServer.password,
                url: b.turnServer.url
            }))), void 0 === b.audio && (b.audio = !0), void 0 === b.video && (b.video = !0), c.mediaConstraints = {
                mandatory: {
                    OfferToReceiveVideo: b.video,
                    OfferToReceiveAudio: b.audio
                }
            }, c.roapSessionId = 103, c.peerConnection = new e(c.pc_config, c.con), d.Logger.debug('Created webkitRTCPeerConnnection with config "' + JSON.stringify(c.pc_config) + '".'), c.peerConnection.onicecandidate = function(a) {
                d.Logger.debug("PeerConnection: ", b.session_id), a.candidate ? c.iceCandidateCount += 1 : (d.Logger.debug("State: " + c.peerConnection.iceGatheringState), void 0 === c.ices && (c.ices = 0), c.ices = c.ices + 1, c.ices >= 1 && c.moreIceComing && (c.moreIceComing = !1, c.markActionNeeded()))
            };
            var f = function(a) {
                var c, d;
                return b.video && b.maxVideoBW && (c = a.match(/m=video.*\r\n/), d = c[0] + "b=AS:" + b.maxVideoBW + "\r\n", a = a.replace(c[0], d)), b.audio && b.maxAudioBW && (c = a.match(/m=audio.*\r\n/), d = c[0] + "b=AS:" + b.maxAudioBW + "\r\n", a = a.replace(c[0], d)), a
            };
            return c.processSignalingMessage = function(a) {
                d.Logger.debug("Activity on conn " + c.sessionId);
                var b, e = JSON.parse(a);
                c.incomingMessage = e, "new" === c.state ? "OFFER" === e.messageType ? (b = {
                    sdp: e.sdp,
                    type: "offer"
                }, c.peerConnection.setRemoteDescription(new RTCSessionDescription(b)), c.state = "offer-received", c.markActionNeeded()) : c.error("Illegal message for this state: " + e.messageType + " in state " + c.state) : "offer-sent" === c.state ? "ANSWER" === e.messageType ? (b = {
                    sdp: e.sdp,
                    type: "answer"
                }, d.Logger.debug("Received ANSWER: ", b.sdp), b.sdp = f(b.sdp), c.peerConnection.setRemoteDescription(new RTCSessionDescription(b)), c.sendOK(), c.state = "established") : "pr-answer" === e.messageType ? (b = {
                    sdp: e.sdp,
                    type: "pr-answer"
                }, c.peerConnection.setRemoteDescription(new RTCSessionDescription(b))) : c.error("offer" === e.messageType ? "Not written yet" : "Illegal message for this state: " + e.messageType + " in state " + c.state) : "established" === c.state && ("OFFER" === e.messageType ? (b = {
                    sdp: e.sdp,
                    type: "offer"
                }, c.peerConnection.setRemoteDescription(new RTCSessionDescription(b)), c.state = "offer-received", c.markActionNeeded()) : c.error("Illegal message for this state: " + e.messageType + " in state " + c.state))
            }, c.addStream = function(a) {
                c.peerConnection.addStream(a), c.markActionNeeded()
            }, c.removeStream = function() {
                c.markActionNeeded()
            }, c.close = function() {
                c.state = "closed", "closed" !== c.peerConnection.signalingState && c.peerConnection.close()
            }, c.markActionNeeded = function() {
                c.actionNeeded = !0, c.doLater(function() {
                    c.onstablestate()
                })
            }, c.doLater = function(b) {
                a.setTimeout(b, 1)
            }, c.onstablestate = function() {
                var a;
                if (c.actionNeeded) {
                    if ("new" === c.state || "established" === c.state) c.peerConnection.createOffer(function(a) {
                        a.sdp = f(a.sdp), d.Logger.debug("Changed", a.sdp);
                        var b = a.sdp;
                        return b !== c.prevOffer ? (c.peerConnection.setLocalDescription(a), c.state = "preparing-offer", void c.markActionNeeded()) : void d.Logger.debug("Not sending a new offer")
                    }, null, c.mediaConstraints);
                    else if ("preparing-offer" === c.state) {
                        if (c.moreIceComing) return;
                        c.prevOffer = c.peerConnection.localDescription.sdp, d.Logger.debug("Sending OFFER: " + c.prevOffer), c.sendMessage("OFFER", c.prevOffer), c.state = "offer-sent"
                    } else if ("offer-received" === c.state) c.peerConnection.createAnswer(function(a) {
                        if (c.peerConnection.setLocalDescription(a), c.state = "offer-received-preparing-answer", c.iceStarted) return void c.markActionNeeded();
                        var b = new Date;
                        d.Logger.debug(b.getTime() + ": Starting ICE in responder"), c.iceStarted = !0
                    }, null, c.mediaConstraints);
                    else if ("offer-received-preparing-answer" === c.state) {
                        if (c.moreIceComing) return;
                        a = c.peerConnection.localDescription.sdp, c.sendMessage("ANSWER", a), c.state = "established"
                    } else c.error("Dazed and confused in state " + c.state + ", stopping here");
                    c.actionNeeded = !1
                }
            }, c.sendOK = function() {
                c.sendMessage("OK")
            }, c.sendMessage = function(a, b) {
                var d = {};
                d.messageType = a, d.sdp = b, "OFFER" === a ? (d.offererSessionId = c.sessionId, d.answererSessionId = c.otherSessionId, d.seq = c.sequenceNumber += 1, d.tiebreaker = Math.floor(429496723 * Math.random() + 1)) : (d.offererSessionId = c.incomingMessage.offererSessionId, d.answererSessionId = c.sessionId, d.seq = c.incomingMessage.seq), c.onsignalingmessage(JSON.stringify(d))
            }, c.error = function(a) {
                throw "Error in RoapOnJsep: " + a
            }, c.sessionId = c.roapSessionId += 1, c.sequenceNumber = 0, c.actionNeeded = !1, c.iceStarted = !1, c.moreIceComing = !0, c.iceCandidateCount = 0, c.onsignalingmessage = b.callback, c.peerConnection.onopen = function() {
                c.onopen && c.onopen()
            }, c.peerConnection.onaddstream = function(a) {
                c.onaddstream && c.onaddstream(a)
            }, c.peerConnection.onremovestream = function(a) {
                c.onremovestream && c.onremovestream(a)
            }, c.peerConnection.oniceconnectionstatechange = function(a) {
                c.oniceconnectionstatechange && c.oniceconnectionstatechange(a.currentTarget.iceConnectionState)
            }, c.onaddstream = null, c.onremovestream = null, c.state = "new", c.markActionNeeded(), c
        }, e.FirefoxStack = function(b) {
            "use strict";
            var c = {},
                e = mozRTCPeerConnection,
                f = mozRTCSessionDescription,
                g = !1;
            c.pc_config = {
                iceServers: []
            }, b.iceServers instanceof Array ? b.iceServers.map(function(a) {
                0 === a.url.indexOf("stun:") && c.pc_config.iceServers.push({
                    url: a.url
                })
            }) : b.stunServerUrl && (b.stunServerUrl instanceof Array ? b.stunServerUrl.map(function(a) {
                "string" == typeof a && "" !== a && c.pc_config.iceServers.push({
                    url: a
                })
            }) : "string" == typeof b.stunServerUrl && "" !== b.stunServerUrl && c.pc_config.iceServers.push({
                url: b.stunServerUrl
            })), void 0 === b.audio && (b.audio = !0), void 0 === b.video && (b.video = !0), c.mediaConstraints = {
                offerToReceiveAudio: b.audio,
                offerToReceiveVideo: b.video,
                mozDontOfferDataChannel: !0
            }, c.roapSessionId = 103, c.peerConnection = new e(c.pc_config), c.peerConnection.onicecandidate = function(a) {
                d.Logger.debug("PeerConnection: ", b.session_id), a.candidate ? c.iceCandidateCount += 1 : (d.Logger.debug("State: " + c.peerConnection.iceGatheringState), void 0 === c.ices && (c.ices = 0), c.ices = c.ices + 1, d.Logger.debug(c.ices), c.ices >= 1 && c.moreIceComing && (c.moreIceComing = !1, c.markActionNeeded()))
            }, d.Logger.debug('Created webkitRTCPeerConnnection with config "' + JSON.stringify(c.pc_config) + '".');
            var h = function(a) {
                    if ("H264" !== b.videoCodec && "h264" !== b.videoCodec) return a;
                    try {
                        var c = a.match(/m=video.*\r\n/g)[0],
                            d = c.replace(/\s120/, "").replace("\r\n", "") + " 120\r\n";
                        return a.replace(c, d)
                    } catch (e) {
                        return a
                    }
                },
                i = function(a) {
                    var b = h(a);
                    return b
                };
            return c.processSignalingMessage = function(a) {
                d.Logger.debug("Activity on conn " + c.sessionId);
                var b, e = JSON.parse(a);
                c.incomingMessage = e, "new" === c.state ? "OFFER" === e.messageType ? (b = {
                    sdp: e.sdp,
                    type: "offer"
                }, c.peerConnection.setRemoteDescription(new f(b), function() {
                    d.Logger.debug("setRemoteDescription succeeded")
                }, function(a) {
                    d.Logger.info("setRemoteDescription failed: " + a.name)
                }), c.state = "offer-received", c.markActionNeeded()) : c.error("Illegal message for this state: " + e.messageType + " in state " + c.state) : "offer-sent" === c.state ? "ANSWER" === e.messageType ? (e.sdp = e.sdp.replace(/ generation 0/g, ""), e.sdp = e.sdp.replace(/ udp /g, " UDP "), b = {
                    sdp: e.sdp,
                    type: "answer"
                }, d.Logger.debug("Received ANSWER: ", b.sdp), b.sdp = i(b.sdp), c.peerConnection.setRemoteDescription(new f(b), function() {
                    d.Logger.debug("setRemoteDescription succeeded")
                }, function(a) {
                    d.Logger.info("setRemoteDescription failed: " + a.name)
                }), c.sendOK(), c.state = "established") : "pr-answer" === e.messageType ? (b = {
                    sdp: e.sdp,
                    type: "pr-answer"
                }, c.peerConnection.setRemoteDescription(new f(b), function() {
                    d.Logger.debug("setRemoteDescription succeeded")
                }, function(a) {
                    d.Logger.info("setRemoteDescription failed: " + a.name)
                })) : c.error("offer" === e.messageType ? "Not written yet" : "Illegal message for this state: " + e.messageType + " in state " + c.state) : "established" === c.state && ("OFFER" === e.messageType ? (b = {
                    sdp: e.sdp,
                    type: "offer"
                }, c.peerConnection.setRemoteDescription(new f(b), function() {
                    d.Logger.debug("setRemoteDescription succeeded")
                }, function(a) {
                    d.Logger.info("setRemoteDescription failed: " + a.name)
                }), c.state = "offer-received", c.markActionNeeded()) : c.error("Illegal message for this state: " + e.messageType + " in state " + c.state))
            }, c.addStream = function(a) {
                g = !0, c.peerConnection.addStream(a), c.markActionNeeded()
            }, c.removeStream = function() {
                c.markActionNeeded()
            }, c.close = function() {
                c.state = "closed", "closed" !== c.peerConnection.signalingState && c.peerConnection.close()
            }, c.markActionNeeded = function() {
                c.actionNeeded = !0, c.doLater(function() {
                    c.onstablestate()
                })
            }, c.doLater = function(b) {
                a.setTimeout(b, 1)
            }, c.onstablestate = function() {
                var a;
                if (c.actionNeeded) {
                    if ("new" === c.state || "established" === c.state) {
                        d.Logger.debug("Creating offer");
                        var b = function() {
                            c.peerConnection.createOffer(function(a) {
                                a.sdp = i(a.sdp);
                                var b = a.sdp;
                                return d.Logger.debug("Changed", a.sdp), b !== c.prevOffer ? (c.peerConnection.setLocalDescription(a), c.state = "preparing-offer", void c.markActionNeeded()) : void d.Logger.debug("Not sending a new offer")
                            }, function(a) {
                                d.Logger.debug("Ups! Something went wrong ", a)
                            }, c.mediaConstraints)
                        };
                        g && (c.mediaConstraints = void 0), b()
                    } else if ("preparing-offer" === c.state) {
                        if (c.moreIceComing) return;
                        c.prevOffer = i(c.peerConnection.localDescription.sdp), d.Logger.debug("Sending OFFER: ", c.prevOffer), c.sendMessage("OFFER", c.prevOffer), c.state = "offer-sent"
                    } else if ("offer-received" === c.state) c.peerConnection.createAnswer(function(a) {
                        if (c.peerConnection.setLocalDescription(a), c.state = "offer-received-preparing-answer", c.iceStarted) return void c.markActionNeeded();
                        var b = new Date;
                        d.Logger.debug(b.getTime() + ": Starting ICE in responder"), c.iceStarted = !0
                    }, function() {
                        d.Logger.debug("Ups! Something went wrong")
                    });
                    else if ("offer-received-preparing-answer" === c.state) {
                        if (c.moreIceComing) return;
                        a = c.peerConnection.localDescription.sdp, c.sendMessage("ANSWER", a), c.state = "established"
                    } else c.error("Dazed and confused in state " + c.state + ", stopping here");
                    c.actionNeeded = !1
                }
            }, c.sendOK = function() {
                c.sendMessage("OK")
            }, c.sendMessage = function(a, b) {
                var d = {};
                d.messageType = a, d.sdp = b, "OFFER" === a ? (d.offererSessionId = c.sessionId, d.answererSessionId = c.otherSessionId, d.seq = c.sequenceNumber += 1, d.tiebreaker = Math.floor(429496723 * Math.random() + 1)) : (d.offererSessionId = c.incomingMessage.offererSessionId, d.answererSessionId = c.sessionId, d.seq = c.incomingMessage.seq), c.onsignalingmessage(JSON.stringify(d))
            }, c.error = function(a) {
                throw "Error in RoapOnJsep: " + a
            }, c.sessionId = c.roapSessionId += 1, c.sequenceNumber = 0, c.actionNeeded = !1, c.iceStarted = !1, c.moreIceComing = !0, c.iceCandidateCount = 0, c.onsignalingmessage = b.callback, c.peerConnection.onopen = function() {
                c.onopen && c.onopen()
            }, c.peerConnection.onaddstream = function(a) {
                c.onaddstream && c.onaddstream(a)
            }, c.peerConnection.onremovestream = function(a) {
                c.onremovestream && c.onremovestream(a)
            }, c.peerConnection.oniceconnectionstatechange = function(a) {
                c.oniceconnectionstatechange && c.oniceconnectionstatechange(a.currentTarget.iceConnectionState)
            }, c.onaddstream = null, c.onremovestream = null, c.state = "new", c.markActionNeeded(), c
        }, e.IEStableStack = function(b) {
            var c = {},
                e = webkitRTCPeerConnection;
            c.pc_config = {
                iceServers: []
            }, b.iceServers instanceof Array ? c.pc_config.iceServers = b.iceServers : (b.stunServerUrl && (b.stunServerUrl instanceof Array ? b.stunServerUrl.map(function(a) {
                "string" == typeof a && "" !== a && c.pc_config.iceServers.push({
                    url: a
                })
            }) : "string" == typeof b.stunServerUrl && "" !== b.stunServerUrl && c.pc_config.iceServers.push({
                url: b.stunServerUrl
            })), b.turnServer && (b.turnServer instanceof Array ? b.turnServer.map(function(a) {
                "string" == typeof a.url && "" !== a.url && c.pc_config.iceServers.push({
                    username: a.username,
                    credential: a.password,
                    url: a.url
                })
            }) : "string" == typeof b.turnServer.url && "" !== b.turnServer.url && c.pc_config.iceServers.push({
                username: b.turnServer.username,
                credential: b.turnServer.password,
                url: b.turnServer.url
            }))), void 0 === b.audio && (b.audio = !0), void 0 === b.video && (b.video = !0), c.mediaConstraints = {
                mandatory: {
                    OfferToReceiveVideo: b.video,
                    OfferToReceiveAudio: b.audio
                }
            }, c.peerConnection = new e(c.pc_config), c.peerConnection.onicegatheringstatechange = function(a) {
                d.Logger.debug("PeerConnection: ", b.session_id), "2" === a ? (void 0 === c.ices && (c.ices = 0), c.ices = c.ices + 1, c.ices >= 1 && c.moreIceComing && (c.moreIceComing = !1, c.markActionNeeded())) : c.iceCandidateCount += 1
            };
            var f = function(a) {
                var c, d;
                return b.video && b.maxVideoBW && (c = a.match(/m=video.*\r\n/), d = c[0] + "b=AS:" + b.maxVideoBW + "\r\n", a = a.replace(c[0], d)), b.audio && b.maxAudioBW && (c = a.match(/m=audio.*\r\n/), d = c[0] + "b=AS:" + b.maxAudioBW + "\r\n", a = a.replace(c[0], d)), a
            };
            return c.processSignalingMessage = function(a) {
                d.Logger.debug("Activity on conn " + c.sessionId);
                var b, e = JSON.parse(a);
                c.incomingMessage = e, "new" === c.state ? "OFFER" === e.messageType ? (b = {
                    sdp: e.sdp,
                    type: "offer"
                }, c.peerConnection.setRemoteDescription(new RTCSessionDescription(b), function() {
                    console.log("set sdp offer success")
                }, function() {
                    console.log("set sdp offer fialed")
                }), c.state = "offer-received", c.markActionNeeded()) : c.error("Illegal message for this state: " + e.messageType + " in state " + c.state) : "offer-sent" === c.state ? "ANSWER" === e.messageType ? (b = {
                    sdp: e.sdp,
                    type: "answer"
                }, d.Logger.debug("Received ANSWER: ", b.sdp), b.sdp = f(b.sdp), c.peerConnection.setRemoteDescription(new RTCSessionDescription(b), function() {
                    console.log("set sdp answer success")
                }, function() {
                    console.log("set sdp answer failed")
                }), c.sendOK(), c.state = "established") : "pr-answer" === e.messageType ? (b = {
                    sdp: e.sdp,
                    type: "pr-answer"
                }, c.peerConnection.setRemoteDescription(new RTCSessionDescription(b), function() {
                    console.log("set sdp pr-answer success")
                }, function() {
                    console.log("set sdp pr-answer failed")
                })) : c.error("offer" === e.messageType ? "Not written yet" : "Illegal message for this state: " + e.messageType + " in state " + c.state) : "established" === c.state && ("OFFER" === e.messageType ? (b = {
                    sdp: e.sdp,
                    type: "offer"
                }, c.peerConnection.setRemoteDescription(new RTCSessionDescription(b), function() {
                    console.log("set sdp established success")
                }, function() {
                    console.log("set sdp established failed")
                }), c.state = "offer-received", c.markActionNeeded()) : c.error("Illegal message for this state: " + e.messageType + " in state " + c.state))
            }, c.addStream = function(a) {
                c.peerConnection.addStream(a), c.markActionNeeded()
            }, c.removeStream = function() {
                c.markActionNeeded()
            }, c.close = function() {
                c.state = "closed", "closed" !== c.peerConnection.signalingState && c.peerConnection.close()
            }, c.markActionNeeded = function() {
                c.actionNeeded = !0, c.doLater(function() {
                    c.onstablestate()
                })
            }, c.doLater = function(b) {
                a.setTimeout(b, 1)
            }, c.onstablestate = function() {
                var a;
                if (c.actionNeeded) {
                    if ("new" === c.state || "established" === c.state) c.peerConnection.createOffer(function(a) {
                        a.sdp = f(a.sdp), d.Logger.debug("Changed", a.sdp);
                        var b = a.sdp;
                        return b !== c.prevOffer ? (c.peerConnection.setLocalDescription(a, function() {
                            console.log("createOffer success")
                        }, function() {
                            console.log("createOffer failed")
                        }), c.state = "preparing-offer", void c.markActionNeeded()) : void d.Logger.debug("Not sending a new offer")
                    }, function(a) {
                        console.log("Failed to create session description: " + a.toString())
                    }, c.mediaConstraints);
                    else if ("preparing-offer" === c.state) {
                        if (c.moreIceComing) return;
                        c.peerConnection.getLocalDescription(function(a) {
                            c.prevOffer = a, d.Logger.debug("Sending OFFER: " + c.prevOffer), c.sendMessage("OFFER", c.prevOffer), c.state = "offer-sent"
                        })
                    } else if ("offer-received" === c.state) c.peerConnection.createAnswer(function(a) {
                        if (c.peerConnection.setLocalDescription(a, function() {
                                console.log("createAnswer success")
                            }, function() {
                                console.log("createAnswer failed")
                            }), c.state = "offer-received-preparing-answer", c.iceStarted) return void c.markActionNeeded();
                        var b = new Date;
                        d.Logger.debug(b.getTime() + ": Starting ICE in responder"), c.iceStarted = !0
                    }, function(a) {
                        console.log("Failed to create session description: " + a.toString())
                    }, c.mediaConstraints);
                    else if ("offer-received-preparing-answer" === c.state) {
                        if (c.moreIceComing) return;
                        c.peerConnection.getLocalDescription(function(b) {
                            a = b, c.sendMessage("ANSWER", a), c.state = "established"
                        })
                    } else c.error("Dazed and confused in state " + c.state + ", stopping here");
                    c.actionNeeded = !1
                }
            }, c.sendOK = function() {
                c.sendMessage("OK")
            }, c.sendMessage = function(a, b) {
                var d = {};
                d.messageType = a, d.sdp = b, "OFFER" === a ? (d.offererSessionId = c.sessionId, d.answererSessionId = c.otherSessionId, d.seq = c.sequenceNumber += 1, d.tiebreaker = Math.floor(429496723 * Math.random() + 1)) : (d.offererSessionId = c.incomingMessage.offererSessionId, d.answererSessionId = c.sessionId, d.seq = c.incomingMessage.seq), c.onsignalingmessage(JSON.stringify(d))
            }, c.error = function(a) {
                throw "Error in RoapOnJsep: " + a
            }, c.sessionId = c.roapSessionId += 1, c.sequenceNumber = 0, c.actionNeeded = !1, c.iceStarted = !1, c.moreIceComing = !0, c.iceCandidateCount = 0, c.onsignalingmessage = b.callback, c.state = "new", c.peerConnection.onopen = function() {
                c.onopen && c.onopen()
            }, c.peerConnection.onaddstream = function(a) {
                c.onaddstream && c.onaddstream(a)
            }, c.peerConnection.onremovestream = function(a) {
                c.onremovestream && c.onremovestream(a)
            }, c.peerConnection.oniceconnectionstatechange = function(a) {
                c.oniceconnectionstatechange && c.oniceconnectionstatechange(a)
            }, c.markActionNeeded(), c
        }, a.Erizo = e, a.Woogeen = c, a.L = d
}(window), ! function(a) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = a();
    else if ("function" == typeof define && define.amd) define([], a);
    else {
        var b;
        "undefined" != typeof window ? b = window : "undefined" != typeof global ? b = global : "undefined" != typeof self && (b = self), b.io = a()
    }
}(function() {
    var a;
    return function b(a, c, d) {
        function e(g, h) {
            if (!c[g]) {
                if (!a[g]) {
                    var i = "function" == typeof require && require;
                    if (!h && i) return i(g, !0);
                    if (f) return f(g, !0);
                    throw new Error("Cannot find module '" + g + "'")
                }
                var j = c[g] = {
                    exports: {}
                };
                a[g][0].call(j.exports, function(b) {
                    var c = a[g][1][b];
                    return e(c ? c : b)
                }, j, j.exports, b, a, c, d)
            }
            return c[g].exports
        }
        for (var f = "function" == typeof require && require, g = 0; g < d.length; g++) e(d[g]);
        return e
    }({
        1: [function(a, b) {
            b.exports = a("./lib/")
        }, {
            "./lib/": 2
        }],
        2: [function(a, b, c) {
            function d(a, b) {
                "object" == typeof a && (b = a, a = void 0), b = b || {};
                var c, d = e(a),
                    f = d.source,
                    j = d.id;
                return b.forceNew || b["force new connection"] || !1 === b.multiplex ? (h("ignoring socket cache for %s", f), c = g(f, b)) : (i[j] || (h("new io instance for %s", f), i[j] = g(f, b)), c = i[j]), c.socket(d.path)
            }
            var e = a("./url"),
                f = a("socket.io-parser"),
                g = a("./manager"),
                h = a("debug")("socket.io-client");
            b.exports = c = d;
            var i = c.managers = {};
            c.protocol = f.protocol, c.connect = d, c.Manager = a("./manager"), c.Socket = a("./socket")
        }, {
            "./manager": 3,
            "./socket": 5,
            "./url": 6,
            debug: 10,
            "socket.io-parser": 46
        }],
        3: [function(a, b) {
            function c(a, b) {
                return this instanceof c ? (a && "object" == typeof a && (b = a, a = void 0), b = b || {}, b.path = b.path || "/socket.io", this.nsps = {}, this.subs = [], this.opts = b, this.reconnection(b.reconnection !== !1), this.reconnectionAttempts(b.reconnectionAttempts || 1 / 0), this.reconnectionDelay(b.reconnectionDelay || 1e3), this.reconnectionDelayMax(b.reconnectionDelayMax || 5e3), this.randomizationFactor(b.randomizationFactor || .5), this.backoff = new l({
                    min: this.reconnectionDelay(),
                    max: this.reconnectionDelayMax(),
                    jitter: this.randomizationFactor()
                }), this.timeout(null == b.timeout ? 2e4 : b.timeout), this.readyState = "closed", this.uri = a, this.connected = [], this.encoding = !1, this.packetBuffer = [], this.encoder = new g.Encoder, this.decoder = new g.Decoder, this.autoConnect = b.autoConnect !== !1, void(this.autoConnect && this.open())) : new c(a, b)
            }
            var d = (a("./url"), a("engine.io-client")),
                e = a("./socket"),
                f = a("component-emitter"),
                g = a("socket.io-parser"),
                h = a("./on"),
                i = a("component-bind"),
                j = (a("object-component"), a("debug")("socket.io-client:manager")),
                k = a("indexof"),
                l = a("backo2");
            b.exports = c, c.prototype.emitAll = function() {
                this.emit.apply(this, arguments);
                for (var a in this.nsps) this.nsps[a].emit.apply(this.nsps[a], arguments)
            }, c.prototype.updateSocketIds = function() {
                for (var a in this.nsps) this.nsps[a].id = this.engine.id
            }, f(c.prototype), c.prototype.reconnection = function(a) {
                return arguments.length ? (this._reconnection = !!a, this) : this._reconnection
            }, c.prototype.reconnectionAttempts = function(a) {
                return arguments.length ? (this._reconnectionAttempts = a, this) : this._reconnectionAttempts
            }, c.prototype.reconnectionDelay = function(a) {
                return arguments.length ? (this._reconnectionDelay = a, this.backoff && this.backoff.setMin(a), this) : this._reconnectionDelay
            }, c.prototype.randomizationFactor = function(a) {
                return arguments.length ? (this._randomizationFactor = a, this.backoff && this.backoff.setJitter(a), this) : this._randomizationFactor
            }, c.prototype.reconnectionDelayMax = function(a) {
                return arguments.length ? (this._reconnectionDelayMax = a, this.backoff && this.backoff.setMax(a), this) : this._reconnectionDelayMax
            }, c.prototype.timeout = function(a) {
                return arguments.length ? (this._timeout = a, this) : this._timeout
            }, c.prototype.maybeReconnectOnOpen = function() {
                !this.reconnecting && this._reconnection && 0 === this.backoff.attempts && this.reconnect()
            }, c.prototype.open = c.prototype.connect = function(a) {
                if (j("readyState %s", this.readyState), ~this.readyState.indexOf("open")) return this;
                j("opening %s", this.uri), this.engine = d(this.uri, this.opts);
                var b = this.engine,
                    c = this;
                this.readyState = "opening", this.skipReconnect = !1;
                var e = h(b, "open", function() {
                        c.onopen(), a && a()
                    }),
                    f = h(b, "error", function(b) {
                        if (j("connect_error"), c.cleanup(), c.readyState = "closed", c.emitAll("connect_error", b), a) {
                            var d = new Error("Connection error");
                            d.data = b, a(d)
                        } else c.maybeReconnectOnOpen()
                    });
                if (!1 !== this._timeout) {
                    var g = this._timeout;
                    j("connect attempt will timeout after %d", g);
                    var i = setTimeout(function() {
                        j("connect attempt timed out after %d", g), e.destroy(), b.close(), b.emit("error", "timeout"), c.emitAll("connect_timeout", g)
                    }, g);
                    this.subs.push({
                        destroy: function() {
                            clearTimeout(i)
                        }
                    })
                }
                return this.subs.push(e), this.subs.push(f), this
            }, c.prototype.onopen = function() {
                j("open"), this.cleanup(), this.readyState = "open", this.emit("open");
                var a = this.engine;
                this.subs.push(h(a, "data", i(this, "ondata"))), this.subs.push(h(this.decoder, "decoded", i(this, "ondecoded"))), this.subs.push(h(a, "error", i(this, "onerror"))), this.subs.push(h(a, "close", i(this, "onclose")))
            }, c.prototype.ondata = function(a) {
                this.decoder.add(a)
            }, c.prototype.ondecoded = function(a) {
                this.emit("packet", a)
            }, c.prototype.onerror = function(a) {
                j("error", a), this.emitAll("error", a)
            }, c.prototype.socket = function(a) {
                var b = this.nsps[a];
                if (!b) {
                    b = new e(this, a), this.nsps[a] = b;
                    var c = this;
                    b.on("connect", function() {
                        b.id = c.engine.id, ~k(c.connected, b) || c.connected.push(b)
                    })
                }
                return b
            }, c.prototype.destroy = function(a) {
                var b = k(this.connected, a);
                ~b && this.connected.splice(b, 1), this.connected.length || this.close()
            }, c.prototype.packet = function(a) {
                j("writing packet %j", a);
                var b = this;
                b.encoding ? b.packetBuffer.push(a) : (b.encoding = !0, this.encoder.encode(a, function(a) {
                    for (var c = 0; c < a.length; c++) b.engine.write(a[c]);
                    b.encoding = !1, b.processPacketQueue()
                }))
            }, c.prototype.processPacketQueue = function() {
                if (this.packetBuffer.length > 0 && !this.encoding) {
                    var a = this.packetBuffer.shift();
                    this.packet(a)
                }
            }, c.prototype.cleanup = function() {
                for (var a; a = this.subs.shift();) a.destroy();
                this.packetBuffer = [], this.encoding = !1, this.decoder.destroy()
            }, c.prototype.close = c.prototype.disconnect = function() {
                this.skipReconnect = !0, this.backoff.reset(), this.readyState = "closed", this.engine && this.engine.close()
            }, c.prototype.onclose = function(a) {
                j("close"), this.cleanup(), this.backoff.reset(), this.readyState = "closed", this.emit("close", a), this._reconnection && !this.skipReconnect && this.reconnect()
            }, c.prototype.reconnect = function() {
                if (this.reconnecting || this.skipReconnect) return this;
                var a = this;
                if (this.backoff.attempts >= this._reconnectionAttempts) j("reconnect failed"), this.backoff.reset(), this.emitAll("reconnect_failed"), this.reconnecting = !1;
                else {
                    var b = this.backoff.duration();
                    j("will wait %dms before reconnect attempt", b), this.reconnecting = !0;
                    var c = setTimeout(function() {
                        a.skipReconnect || (j("attempting reconnect"), a.emitAll("reconnect_attempt", a.backoff.attempts), a.emitAll("reconnecting", a.backoff.attempts), a.skipReconnect || a.open(function(b) {
                            b ? (j("reconnect attempt error"), a.reconnecting = !1, a.reconnect(), a.emitAll("reconnect_error", b.data)) : (j("reconnect success"), a.onreconnect())
                        }))
                    }, b);
                    this.subs.push({
                        destroy: function() {
                            clearTimeout(c)
                        }
                    })
                }
            }, c.prototype.onreconnect = function() {
                var a = this.backoff.attempts;
                this.reconnecting = !1, this.backoff.reset(), this.updateSocketIds(), this.emitAll("reconnect", a)
            }
        }, {
            "./on": 4,
            "./socket": 5,
            "./url": 6,
            backo2: 7,
            "component-bind": 8,
            "component-emitter": 9,
            debug: 10,
            "engine.io-client": 11,
            indexof: 42,
            "object-component": 43,
            "socket.io-parser": 46
        }],
        4: [function(a, b) {
            function c(a, b, c) {
                return a.on(b, c), {
                    destroy: function() {
                        a.removeListener(b, c)
                    }
                }
            }
            b.exports = c
        }, {}],
        5: [function(a, b, c) {
            function d(a, b) {
                this.io = a, this.nsp = b, this.json = this, this.ids = 0, this.acks = {}, this.io.autoConnect && this.open(), this.receiveBuffer = [], this.sendBuffer = [], this.connected = !1, this.disconnected = !0
            }
            var e = a("socket.io-parser"),
                f = a("component-emitter"),
                g = a("to-array"),
                h = a("./on"),
                i = a("component-bind"),
                j = a("debug")("socket.io-client:socket"),
                k = a("has-binary");
            b.exports = c = d;
            var l = {
                    connect: 1,
                    connect_error: 1,
                    connect_timeout: 1,
                    disconnect: 1,
                    error: 1,
                    reconnect: 1,
                    reconnect_attempt: 1,
                    reconnect_failed: 1,
                    reconnect_error: 1,
                    reconnecting: 1
                },
                m = f.prototype.emit;
            f(d.prototype), d.prototype.subEvents = function() {
                if (!this.subs) {
                    var a = this.io;
                    this.subs = [h(a, "open", i(this, "onopen")), h(a, "packet", i(this, "onpacket")), h(a, "close", i(this, "onclose"))]
                }
            }, d.prototype.open = d.prototype.connect = function() {
                return this.connected ? this : (this.subEvents(), this.io.open(), "open" == this.io.readyState && this.onopen(), this)
            }, d.prototype.send = function() {
                var a = g(arguments);
                return a.unshift("message"), this.emit.apply(this, a), this
            }, d.prototype.emit = function(a) {
                if (l.hasOwnProperty(a)) return m.apply(this, arguments), this;
                var b = g(arguments),
                    c = e.EVENT;
                k(b) && (c = e.BINARY_EVENT);
                var d = {
                    type: c,
                    data: b
                };
                return "function" == typeof b[b.length - 1] && (j("emitting packet with ack id %d", this.ids), this.acks[this.ids] = b.pop(), d.id = this.ids++), this.connected ? this.packet(d) : this.sendBuffer.push(d), this
            }, d.prototype.packet = function(a) {
                a.nsp = this.nsp, this.io.packet(a)
            }, d.prototype.onopen = function() {
                j("transport is open - connecting"), "/" != this.nsp && this.packet({
                    type: e.CONNECT
                })
            }, d.prototype.onclose = function(a) {
                j("close (%s)", a), this.connected = !1, this.disconnected = !0, delete this.id, this.emit("disconnect", a)
            }, d.prototype.onpacket = function(a) {
                if (a.nsp == this.nsp) switch (a.type) {
                    case e.CONNECT:
                        this.onconnect();
                        break;
                    case e.EVENT:
                        this.onevent(a);
                        break;
                    case e.BINARY_EVENT:
                        this.onevent(a);
                        break;
                    case e.ACK:
                        this.onack(a);
                        break;
                    case e.BINARY_ACK:
                        this.onack(a);
                        break;
                    case e.DISCONNECT:
                        this.ondisconnect();
                        break;
                    case e.ERROR:
                        this.emit("error", a.data)
                }
            }, d.prototype.onevent = function(a) {
                var b = a.data || [];
                j("emitting event %j", b), null != a.id && (j("attaching ack callback to event"), b.push(this.ack(a.id))), this.connected ? m.apply(this, b) : this.receiveBuffer.push(b)
            }, d.prototype.ack = function(a) {
                var b = this,
                    c = !1;
                return function() {
                    if (!c) {
                        c = !0;
                        var d = g(arguments);
                        j("sending ack %j", d);
                        var f = k(d) ? e.BINARY_ACK : e.ACK;
                        b.packet({
                            type: f,
                            id: a,
                            data: d
                        })
                    }
                }
            }, d.prototype.onack = function(a) {
                j("calling ack %s with %j", a.id, a.data);
                var b = this.acks[a.id];
                b.apply(this, a.data), delete this.acks[a.id]
            }, d.prototype.onconnect = function() {
                this.connected = !0, this.disconnected = !1, this.emit("connect"), this.emitBuffered()
            }, d.prototype.emitBuffered = function() {
                var a;
                for (a = 0; a < this.receiveBuffer.length; a++) m.apply(this, this.receiveBuffer[a]);
                for (this.receiveBuffer = [], a = 0; a < this.sendBuffer.length; a++) this.packet(this.sendBuffer[a]);
                this.sendBuffer = []
            }, d.prototype.ondisconnect = function() {
                j("server disconnect (%s)", this.nsp), this.destroy(), this.onclose("io server disconnect")
            }, d.prototype.destroy = function() {
                if (this.subs) {
                    for (var a = 0; a < this.subs.length; a++) this.subs[a].destroy();
                    this.subs = null
                }
                this.io.destroy(this)
            }, d.prototype.close = d.prototype.disconnect = function() {
                return this.connected && (j("performing disconnect (%s)", this.nsp), this.packet({
                    type: e.DISCONNECT
                })), this.destroy(), this.connected && this.onclose("io client disconnect"), this
            }
        }, {
            "./on": 4,
            "component-bind": 8,
            "component-emitter": 9,
            debug: 10,
            "has-binary": 38,
            "socket.io-parser": 46,
            "to-array": 50
        }],
        6: [function(a, b) {
            (function(c) {
                function d(a, b) {
                    var d = a,
                        b = b || c.location;
                    return null == a && (a = b.protocol + "//" + b.host), "string" == typeof a && ("/" == a.charAt(0) && (a = "/" == a.charAt(1) ? b.protocol + a : b.hostname + a), /^(https?|wss?):\/\//.test(a) || (f("protocol-less url %s", a), a = "undefined" != typeof b ? b.protocol + "//" + a : "https://" + a), f("parse %s", a), d = e(a)), d.port || (/^(http|ws)$/.test(d.protocol) ? d.port = "80" : /^(http|ws)s$/.test(d.protocol) && (d.port = "443")), d.path = d.path || "/", d.id = d.protocol + "://" + d.host + ":" + d.port, d.href = d.protocol + "://" + d.host + (b && b.port == d.port ? "" : ":" + d.port), d
                }
                var e = a("parseuri"),
                    f = a("debug")("socket.io-client:url");
                b.exports = d
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {
            debug: 10,
            parseuri: 44
        }],
        7: [function(a, b) {
            function c(a) {
                a = a || {}, this.ms = a.min || 100, this.max = a.max || 1e4, this.factor = a.factor || 2, this.jitter = a.jitter > 0 && a.jitter <= 1 ? a.jitter : 0, this.attempts = 0
            }
            b.exports = c, c.prototype.duration = function() {
                var a = this.ms * Math.pow(this.factor, this.attempts++);
                if (this.jitter) {
                    var b = Math.random(),
                        c = Math.floor(b * this.jitter * a);
                    a = 0 == (1 & Math.floor(10 * b)) ? a - c : a + c
                }
                return 0 | Math.min(a, this.max)
            }, c.prototype.reset = function() {
                this.attempts = 0
            }, c.prototype.setMin = function(a) {
                this.ms = a
            }, c.prototype.setMax = function(a) {
                this.max = a
            }, c.prototype.setJitter = function(a) {
                this.jitter = a
            }
        }, {}],
        8: [function(a, b) {
            var c = [].slice;
            b.exports = function(a, b) {
                if ("string" == typeof b && (b = a[b]), "function" != typeof b) throw new Error("bind() requires a function");
                var d = c.call(arguments, 2);
                return function() {
                    return b.apply(a, d.concat(c.call(arguments)))
                }
            }
        }, {}],
        9: [function(a, b) {
            function c(a) {
                return a ? d(a) : void 0
            }

            function d(a) {
                for (var b in c.prototype) a[b] = c.prototype[b];
                return a
            }
            b.exports = c, c.prototype.on = c.prototype.addEventListener = function(a, b) {
                return this._callbacks = this._callbacks || {}, (this._callbacks[a] = this._callbacks[a] || []).push(b), this
            }, c.prototype.once = function(a, b) {
                function c() {
                    d.off(a, c), b.apply(this, arguments)
                }
                var d = this;
                return this._callbacks = this._callbacks || {}, c.fn = b, this.on(a, c), this
            }, c.prototype.off = c.prototype.removeListener = c.prototype.removeAllListeners = c.prototype.removeEventListener = function(a, b) {
                if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;
                var c = this._callbacks[a];
                if (!c) return this;
                if (1 == arguments.length) return delete this._callbacks[a], this;
                for (var d, e = 0; e < c.length; e++)
                    if (d = c[e], d === b || d.fn === b) {
                        c.splice(e, 1);
                        break
                    }
                return this
            }, c.prototype.emit = function(a) {
                this._callbacks = this._callbacks || {};
                var b = [].slice.call(arguments, 1),
                    c = this._callbacks[a];
                if (c) {
                    c = c.slice(0);
                    for (var d = 0, e = c.length; e > d; ++d) c[d].apply(this, b)
                }
                return this
            }, c.prototype.listeners = function(a) {
                return this._callbacks = this._callbacks || {}, this._callbacks[a] || []
            }, c.prototype.hasListeners = function(a) {
                return !!this.listeners(a).length
            }
        }, {}],
        10: [function(a, b) {
            function c(a) {
                return c.enabled(a) ? function(b) {
                    b = d(b);
                    var e = new Date,
                        f = e - (c[a] || e);
                    c[a] = e, b = a + " " + b + " +" + c.humanize(f), window.console && console.log && Function.prototype.apply.call(console.log, console, arguments)
                } : function() {}
            }

            function d(a) {
                return a instanceof Error ? a.stack || a.message : a
            }
            b.exports = c, c.names = [], c.skips = [], c.enable = function(a) {
                try {
                    localStorage.debug = a
                } catch (b) {}
                for (var d = (a || "").split(/[\s,]+/), e = d.length, f = 0; e > f; f++) a = d[f].replace("*", ".*?"), "-" === a[0] ? c.skips.push(new RegExp("^" + a.substr(1) + "$")) : c.names.push(new RegExp("^" + a + "$"))
            }, c.disable = function() {
                c.enable("")
            }, c.humanize = function(a) {
                var b = 1e3,
                    c = 6e4,
                    d = 60 * c;
                return a >= d ? (a / d).toFixed(1) + "h" : a >= c ? (a / c).toFixed(1) + "m" : a >= b ? (a / b | 0) + "s" : a + "ms"
            }, c.enabled = function(a) {
                for (var b = 0, d = c.skips.length; d > b; b++)
                    if (c.skips[b].test(a)) return !1;
                for (var b = 0, d = c.names.length; d > b; b++)
                    if (c.names[b].test(a)) return !0;
                return !1
            };
            try {
                window.localStorage && c.enable(localStorage.debug)
            } catch (e) {}
        }, {}],
        11: [function(a, b) {
            b.exports = a("./lib/")
        }, {
            "./lib/": 12
        }],
        12: [function(a, b) {
            b.exports = a("./socket"), b.exports.parser = a("engine.io-parser")
        }, {
            "./socket": 13,
            "engine.io-parser": 25
        }],
        13: [function(a, b) {
            (function(c) {
                function d(a, b) {
                    if (!(this instanceof d)) return new d(a, b);
                    if (b = b || {}, a && "object" == typeof a && (b = a, a = null), a && (a = k(a), b.host = a.host, b.secure = "https" == a.protocol || "wss" == a.protocol, b.port = a.port, a.query && (b.query = a.query)), this.secure = null != b.secure ? b.secure : c.location && "https:" == location.protocol, b.host) {
                        var e = b.host.split(":");
                        b.hostname = e.shift(), e.length ? b.port = e.pop() : b.port || (b.port = this.secure ? "443" : "80")
                    }
                    this.agent = b.agent || !1, this.hostname = b.hostname || (c.location ? location.hostname : "localhost"), this.port = b.port || (c.location && location.port ? location.port : this.secure ? 443 : 80), this.query = b.query || {}, "string" == typeof this.query && (this.query = m.decode(this.query)), this.upgrade = !1 !== b.upgrade, this.path = (b.path || "/engine.io").replace(/\/$/, "") + "/", this.forceJSONP = !!b.forceJSONP, this.jsonp = !1 !== b.jsonp, this.forceBase64 = !!b.forceBase64, this.enablesXDR = !!b.enablesXDR, this.timestampParam = b.timestampParam || "t", this.timestampRequests = b.timestampRequests, this.transports = b.transports || ["polling", "websocket"], this.readyState = "", this.writeBuffer = [], this.callbackBuffer = [], this.policyPort = b.policyPort || 843, this.rememberUpgrade = b.rememberUpgrade || !1, this.binaryType = null, this.onlyBinaryUpgrades = b.onlyBinaryUpgrades, this.pfx = b.pfx || null, this.key = b.key || null, this.passphrase = b.passphrase || null, this.cert = b.cert || null, this.ca = b.ca || null, this.ciphers = b.ciphers || null, this.rejectUnauthorized = b.rejectUnauthorized || null, this.open()
                }

                function e(a) {
                    var b = {};
                    for (var c in a) a.hasOwnProperty(c) && (b[c] = a[c]);
                    return b
                }
                var f = a("./transports"),
                    g = a("component-emitter"),
                    h = a("debug")("engine.io-client:socket"),
                    i = a("indexof"),
                    j = a("engine.io-parser"),
                    k = a("parseuri"),
                    l = a("parsejson"),
                    m = a("parseqs");
                b.exports = d, d.priorWebsocketSuccess = !1, g(d.prototype), d.protocol = j.protocol, d.Socket = d, d.Transport = a("./transport"), d.transports = a("./transports"), d.parser = a("engine.io-parser"), d.prototype.createTransport = function(a) {
                    h('creating transport "%s"', a);
                    var b = e(this.query);
                    b.EIO = j.protocol, b.transport = a, this.id && (b.sid = this.id);
                    var c = new f[a]({
                        agent: this.agent,
                        hostname: this.hostname,
                        port: this.port,
                        secure: this.secure,
                        path: this.path,
                        query: b,
                        forceJSONP: this.forceJSONP,
                        jsonp: this.jsonp,
                        forceBase64: this.forceBase64,
                        enablesXDR: this.enablesXDR,
                        timestampRequests: this.timestampRequests,
                        timestampParam: this.timestampParam,
                        policyPort: this.policyPort,
                        socket: this,
                        pfx: this.pfx,
                        key: this.key,
                        passphrase: this.passphrase,
                        cert: this.cert,
                        ca: this.ca,
                        ciphers: this.ciphers,
                        rejectUnauthorized: this.rejectUnauthorized
                    });
                    return c
                }, d.prototype.open = function() {
                    var a;
                    if (this.rememberUpgrade && d.priorWebsocketSuccess && -1 != this.transports.indexOf("websocket")) a = "websocket";
                    else {
                        if (0 == this.transports.length) {
                            var b = this;
                            return void setTimeout(function() {
                                b.emit("error", "No transports available")
                            }, 0)
                        }
                        a = this.transports[0]
                    }
                    this.readyState = "opening";
                    var a;
                    try {
                        a = this.createTransport(a)
                    } catch (c) {
                        return this.transports.shift(), void this.open()
                    }
                    a.open(), this.setTransport(a)
                }, d.prototype.setTransport = function(a) {
                    h("setting transport %s", a.name);
                    var b = this;
                    this.transport && (h("clearing existing transport %s", this.transport.name), this.transport.removeAllListeners()), this.transport = a, a.on("drain", function() {
                        b.onDrain()
                    }).on("packet", function(a) {
                        b.onPacket(a)
                    }).on("error", function(a) {
                        b.onError(a)
                    }).on("close", function() {
                        b.onClose("transport close")
                    })
                }, d.prototype.probe = function(a) {
                    function b() {
                        if (m.onlyBinaryUpgrades) {
                            var b = !this.supportsBinary && m.transport.supportsBinary;
                            l = l || b
                        }
                        l || (h('probe transport "%s" opened', a), k.send([{
                            type: "ping",
                            data: "probe"
                        }]), k.once("packet", function(b) {
                            if (!l)
                                if ("pong" == b.type && "probe" == b.data) {
                                    if (h('probe transport "%s" pong', a), m.upgrading = !0, m.emit("upgrading", k), !k) return;
                                    d.priorWebsocketSuccess = "websocket" == k.name, h('pausing current transport "%s"', m.transport.name), m.transport.pause(function() {
                                        l || "closed" != m.readyState && (h("changing transport and sending upgrade packet"), j(), m.setTransport(k), k.send([{
                                            type: "upgrade"
                                        }]), m.emit("upgrade", k), k = null, m.upgrading = !1, m.flush())
                                    })
                                } else {
                                    h('probe transport "%s" failed', a);
                                    var c = new Error("probe error");
                                    c.transport = k.name, m.emit("upgradeError", c)
                                }
                        }))
                    }

                    function c() {
                        l || (l = !0, j(), k.close(), k = null)
                    }

                    function e(b) {
                        var d = new Error("probe error: " + b);
                        d.transport = k.name, c(), h('probe transport "%s" failed because of error: %s', a, b), m.emit("upgradeError", d)
                    }

                    function f() {
                        e("transport closed")
                    }

                    function g() {
                        e("socket closed")
                    }

                    function i(a) {
                        k && a.name != k.name && (h('"%s" works - aborting "%s"', a.name, k.name), c())
                    }

                    function j() {
                        k.removeListener("open", b), k.removeListener("error", e), k.removeListener("close", f), m.removeListener("close", g), m.removeListener("upgrading", i)
                    }
                    h('probing transport "%s"', a);
                    var k = this.createTransport(a, {
                            probe: 1
                        }),
                        l = !1,
                        m = this;
                    d.priorWebsocketSuccess = !1, k.once("open", b), k.once("error", e), k.once("close", f), this.once("close", g), this.once("upgrading", i), k.open()
                }, d.prototype.onOpen = function() {
                    if (h("socket open"), this.readyState = "open", d.priorWebsocketSuccess = "websocket" == this.transport.name, this.emit("open"), this.flush(), "open" == this.readyState && this.upgrade && this.transport.pause) {
                        h("starting upgrade probes");
                        for (var a = 0, b = this.upgrades.length; b > a; a++) this.probe(this.upgrades[a])
                    }
                }, d.prototype.onPacket = function(a) {
                    if ("opening" == this.readyState || "open" == this.readyState) switch (h('socket receive: type "%s", data "%s"', a.type, a.data), this.emit("packet", a), this.emit("heartbeat"), a.type) {
                        case "open":
                            this.onHandshake(l(a.data));
                            break;
                        case "pong":
                            this.setPing();
                            break;
                        case "error":
                            var b = new Error("server error");
                            b.code = a.data, this.emit("error", b);
                            break;
                        case "message":
                            this.emit("data", a.data), this.emit("message", a.data)
                    } else h('packet received with socket readyState "%s"', this.readyState)
                }, d.prototype.onHandshake = function(a) {
                    this.emit("handshake", a), this.id = a.sid, this.transport.query.sid = a.sid, this.upgrades = this.filterUpgrades(a.upgrades), this.pingInterval = a.pingInterval, this.pingTimeout = a.pingTimeout, this.onOpen(), "closed" != this.readyState && (this.setPing(), this.removeListener("heartbeat", this.onHeartbeat), this.on("heartbeat", this.onHeartbeat))
                }, d.prototype.onHeartbeat = function(a) {
                    clearTimeout(this.pingTimeoutTimer);
                    var b = this;
                    b.pingTimeoutTimer = setTimeout(function() {
                        "closed" != b.readyState && b.onClose("ping timeout")
                    }, a || b.pingInterval + b.pingTimeout)
                }, d.prototype.setPing = function() {
                    var a = this;
                    clearTimeout(a.pingIntervalTimer), a.pingIntervalTimer = setTimeout(function() {
                        h("writing ping packet - expecting pong within %sms", a.pingTimeout), a.ping(), a.onHeartbeat(a.pingTimeout)
                    }, a.pingInterval)
                }, d.prototype.ping = function() {
                    this.sendPacket("ping")
                }, d.prototype.onDrain = function() {
                    for (var a = 0; a < this.prevBufferLen; a++) this.callbackBuffer[a] && this.callbackBuffer[a]();
                    this.writeBuffer.splice(0, this.prevBufferLen), this.callbackBuffer.splice(0, this.prevBufferLen), this.prevBufferLen = 0, 0 == this.writeBuffer.length ? this.emit("drain") : this.flush()
                }, d.prototype.flush = function() {
                    "closed" != this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length && (h("flushing %d packets in socket", this.writeBuffer.length), this.transport.send(this.writeBuffer), this.prevBufferLen = this.writeBuffer.length, this.emit("flush"))
                }, d.prototype.write = d.prototype.send = function(a, b) {
                    return this.sendPacket("message", a, b), this
                }, d.prototype.sendPacket = function(a, b, c) {
                    if ("closing" != this.readyState && "closed" != this.readyState) {
                        var d = {
                            type: a,
                            data: b
                        };
                        this.emit("packetCreate", d), this.writeBuffer.push(d), this.callbackBuffer.push(c), this.flush()
                    }
                }, d.prototype.close = function() {
                    function a() {
                        d.onClose("forced close"), h("socket closing - telling transport to close"), d.transport.close()
                    }

                    function b() {
                        d.removeListener("upgrade", b), d.removeListener("upgradeError", b), a()
                    }

                    function c() {
                        d.once("upgrade", b), d.once("upgradeError", b)
                    }
                    if ("opening" == this.readyState || "open" == this.readyState) {
                        this.readyState = "closing";
                        var d = this;
                        this.writeBuffer.length ? this.once("drain", function() {
                            this.upgrading ? c() : a()
                        }) : this.upgrading ? c() : a()
                    }
                    return this
                }, d.prototype.onError = function(a) {
                    h("socket error %j", a), d.priorWebsocketSuccess = !1, this.emit("error", a), this.onClose("transport error", a)
                }, d.prototype.onClose = function(a, b) {
                    if ("opening" == this.readyState || "open" == this.readyState || "closing" == this.readyState) {
                        h('socket close with reason: "%s"', a);
                        var c = this;
                        clearTimeout(this.pingIntervalTimer), clearTimeout(this.pingTimeoutTimer), setTimeout(function() {
                            c.writeBuffer = [], c.callbackBuffer = [], c.prevBufferLen = 0
                        }, 0), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), this.readyState = "closed", this.id = null, this.emit("close", a, b)
                    }
                }, d.prototype.filterUpgrades = function(a) {
                    for (var b = [], c = 0, d = a.length; d > c; c++) ~i(this.transports, a[c]) && b.push(a[c]);
                    return b
                }
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {
            "./transport": 14,
            "./transports": 15,
            "component-emitter": 9,
            debug: 22,
            "engine.io-parser": 25,
            indexof: 42,
            parsejson: 34,
            parseqs: 35,
            parseuri: 36
        }],
        14: [function(a, b) {
            function c(a) {
                this.path = a.path, this.hostname = a.hostname, this.port = a.port, this.secure = a.secure, this.query = a.query, this.timestampParam = a.timestampParam, this.timestampRequests = a.timestampRequests, this.readyState = "", this.agent = a.agent || !1, this.socket = a.socket, this.enablesXDR = a.enablesXDR, this.pfx = a.pfx, this.key = a.key, this.passphrase = a.passphrase, this.cert = a.cert, this.ca = a.ca, this.ciphers = a.ciphers, this.rejectUnauthorized = a.rejectUnauthorized
            }
            var d = a("engine.io-parser"),
                e = a("component-emitter");
            b.exports = c, e(c.prototype), c.timestamps = 0, c.prototype.onError = function(a, b) {
                var c = new Error(a);
                return c.type = "TransportError", c.description = b, this.emit("error", c), this
            }, c.prototype.open = function() {
                return ("closed" == this.readyState || "" == this.readyState) && (this.readyState = "opening", this.doOpen()), this
            }, c.prototype.close = function() {
                return ("opening" == this.readyState || "open" == this.readyState) && (this.doClose(), this.onClose()), this
            }, c.prototype.send = function(a) {
                if ("open" != this.readyState) throw new Error("Transport not open");
                this.write(a)
            }, c.prototype.onOpen = function() {
                this.readyState = "open", this.writable = !0, this.emit("open")
            }, c.prototype.onData = function(a) {
                var b = d.decodePacket(a, this.socket.binaryType);
                this.onPacket(b)
            }, c.prototype.onPacket = function(a) {
                this.emit("packet", a)
            }, c.prototype.onClose = function() {
                this.readyState = "closed", this.emit("close")
            }
        }, {
            "component-emitter": 9,
            "engine.io-parser": 25
        }],
        15: [function(a, b, c) {
            (function(b) {
                function d(a) {
                    var c, d = !1,
                        h = !1,
                        i = !1 !== a.jsonp;
                    if (b.location) {
                        var j = "https:" == location.protocol,
                            k = location.port;
                        k || (k = j ? 443 : 80), d = a.hostname != location.hostname || k != a.port, h = a.secure != j
                    }
                    if (a.xdomain = d, a.xscheme = h, c = new e(a), "open" in c && !a.forceJSONP) return new f(a);
                    if (!i) throw new Error("JSONP disabled");
                    return new g(a)
                }
                var e = a("xmlhttprequest"),
                    f = a("./polling-xhr"),
                    g = a("./polling-jsonp"),
                    h = a("./websocket");
                c.polling = d, c.websocket = h
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {
            "./polling-jsonp": 16,
            "./polling-xhr": 17,
            "./websocket": 19,
            xmlhttprequest: 20
        }],
        16: [function(a, b) {
            (function(c) {
                function d() {}

                function e(a) {
                    f.call(this, a), this.query = this.query || {}, h || (c.___eio || (c.___eio = []), h = c.___eio), this.index = h.length;
                    var b = this;
                    h.push(function(a) {
                        b.onData(a)
                    }), this.query.j = this.index, c.document && c.addEventListener && c.addEventListener("beforeunload", function() {
                        b.script && (b.script.onerror = d)
                    }, !1)
                }
                var f = a("./polling"),
                    g = a("component-inherit");
                b.exports = e;
                var h, i = /\n/g,
                    j = /\\n/g;
                g(e, f), e.prototype.supportsBinary = !1, e.prototype.doClose = function() {
                    this.script && (this.script.parentNode.removeChild(this.script), this.script = null), this.form && (this.form.parentNode.removeChild(this.form), this.form = null, this.iframe = null), f.prototype.doClose.call(this)
                }, e.prototype.doPoll = function() {
                    var a = this,
                        b = document.createElement("script");
                    this.script && (this.script.parentNode.removeChild(this.script), this.script = null), b.async = !0, b.src = this.uri(), b.onerror = function(b) {
                        a.onError("jsonp poll error", b)
                    };
                    var c = document.getElementsByTagName("script")[0];
                    c.parentNode.insertBefore(b, c), this.script = b;
                    var d = "undefined" != typeof navigator && /gecko/i.test(navigator.userAgent);
                    d && setTimeout(function() {
                        var a = document.createElement("iframe");
                        document.body.appendChild(a), document.body.removeChild(a)
                    }, 100)
                }, e.prototype.doWrite = function(a, b) {
                    function c() {
                        d(), b()
                    }

                    function d() {
                        if (e.iframe) try {
                            e.form.removeChild(e.iframe)
                        } catch (a) {
                            e.onError("jsonp polling iframe removal error", a)
                        }
                        try {
                            var b = '<iframe src="javascript:0" name="' + e.iframeId + '">';
                            f = document.createElement(b)
                        } catch (a) {
                            f = document.createElement("iframe"), f.name = e.iframeId, f.src = "javascript:0"
                        }
                        f.id = e.iframeId, e.form.appendChild(f), e.iframe = f
                    }
                    var e = this;
                    if (!this.form) {
                        var f, g = document.createElement("form"),
                            h = document.createElement("textarea"),
                            k = this.iframeId = "eio_iframe_" + this.index;
                        g.className = "socketio", g.style.position = "absolute", g.style.top = "-1000px", g.style.left = "-1000px", g.target = k, g.method = "POST", g.setAttribute("accept-charset", "utf-8"), h.name = "d", g.appendChild(h), document.body.appendChild(g), this.form = g, this.area = h
                    }
                    this.form.action = this.uri(), d(), a = a.replace(j, "\\\n"), this.area.value = a.replace(i, "\\n");
                    try {
                        this.form.submit()
                    } catch (l) {}
                    this.iframe.attachEvent ? this.iframe.onreadystatechange = function() {
                        "complete" == e.iframe.readyState && c()
                    } : this.iframe.onload = c
                }
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {
            "./polling": 18,
            "component-inherit": 21
        }],
        17: [function(a, b) {
            (function(c) {
                function d() {}

                function e(a) {
                    if (i.call(this, a), c.location) {
                        var b = "https:" == location.protocol,
                            d = location.port;
                        d || (d = b ? 443 : 80), this.xd = a.hostname != c.location.hostname || d != a.port, this.xs = a.secure != b
                    }
                }

                function f(a) {
                    this.method = a.method || "GET", this.uri = a.uri, this.xd = !!a.xd, this.xs = !!a.xs, this.async = !1 !== a.async, this.data = void 0 != a.data ? a.data : null, this.agent = a.agent, this.isBinary = a.isBinary, this.supportsBinary = a.supportsBinary, this.enablesXDR = a.enablesXDR, this.pfx = a.pfx, this.key = a.key, this.passphrase = a.passphrase, this.cert = a.cert, this.ca = a.ca, this.ciphers = a.ciphers, this.rejectUnauthorized = a.rejectUnauthorized, this.create()
                }

                function g() {
                    for (var a in f.requests) f.requests.hasOwnProperty(a) && f.requests[a].abort()
                }
                var h = a("xmlhttprequest"),
                    i = a("./polling"),
                    j = a("component-emitter"),
                    k = a("component-inherit"),
                    l = a("debug")("engine.io-client:polling-xhr");
                b.exports = e, b.exports.Request = f, k(e, i), e.prototype.supportsBinary = !0, e.prototype.request = function(a) {
                    return a = a || {}, a.uri = this.uri(), a.xd = this.xd, a.xs = this.xs, a.agent = this.agent || !1, a.supportsBinary = this.supportsBinary, a.enablesXDR = this.enablesXDR, a.pfx = this.pfx, a.key = this.key, a.passphrase = this.passphrase, a.cert = this.cert, a.ca = this.ca, a.ciphers = this.ciphers, a.rejectUnauthorized = this.rejectUnauthorized, new f(a)
                }, e.prototype.doWrite = function(a, b) {
                    var c = "string" != typeof a && void 0 !== a,
                        d = this.request({
                            method: "POST",
                            data: a,
                            isBinary: c
                        }),
                        e = this;
                    d.on("success", b), d.on("error", function(a) {
                        e.onError("xhr post error", a)
                    }), this.sendXhr = d
                }, e.prototype.doPoll = function() {
                    l("xhr poll");
                    var a = this.request(),
                        b = this;
                    a.on("data", function(a) {
                        b.onData(a)
                    }), a.on("error", function(a) {
                        b.onError("xhr poll error", a)
                    }), this.pollXhr = a
                }, j(f.prototype), f.prototype.create = function() {
                    var a = {
                        agent: this.agent,
                        xdomain: this.xd,
                        xscheme: this.xs,
                        enablesXDR: this.enablesXDR
                    };
                    a.pfx = this.pfx, a.key = this.key, a.passphrase = this.passphrase, a.cert = this.cert, a.ca = this.ca, a.ciphers = this.ciphers, a.rejectUnauthorized = this.rejectUnauthorized;
                    var b = this.xhr = new h(a),
                        d = this;
                    try {
                        if (l("xhr open %s: %s", this.method, this.uri), b.open(this.method, this.uri, this.async), this.supportsBinary && (b.responseType = "arraybuffer"), "POST" == this.method) try {
                            this.isBinary ? b.setRequestHeader("Content-type", "application/octet-stream") : b.setRequestHeader("Content-type", "text/plain;charset=UTF-8")
                        } catch (e) {}
                        "withCredentials" in b && (b.withCredentials = !0), this.hasXDR() ? (b.onload = function() {
                            d.onLoad()
                        }, b.onerror = function() {
                            d.onError(b.responseText)
                        }) : b.onreadystatechange = function() {
                            4 == b.readyState && (200 == b.status || 1223 == b.status ? d.onLoad() : setTimeout(function() {
                                d.onError(b.status)
                            }, 0))
                        }, l("xhr data %s", this.data), b.send(this.data)
                    } catch (e) {
                        return void setTimeout(function() {
                            d.onError(e)
                        }, 0)
                    }
                    c.document && (this.index = f.requestsCount++, f.requests[this.index] = this)
                }, f.prototype.onSuccess = function() {
                    this.emit("success"), this.cleanup()
                }, f.prototype.onData = function(a) {
                    this.emit("data", a), this.onSuccess()
                }, f.prototype.onError = function(a) {
                    this.emit("error", a), this.cleanup(!0)
                }, f.prototype.cleanup = function(a) {
                    if ("undefined" != typeof this.xhr && null !== this.xhr) {
                        if (this.hasXDR() ? this.xhr.onload = this.xhr.onerror = d : this.xhr.onreadystatechange = d, a) try {
                            this.xhr.abort()
                        } catch (b) {}
                        c.document && delete f.requests[this.index], this.xhr = null
                    }
                }, f.prototype.onLoad = function() {
                    var a;
                    try {
                        var b;
                        try {
                            b = this.xhr.getResponseHeader("Content-Type").split(";")[0]
                        } catch (c) {}
                        a = "application/octet-stream" === b ? this.xhr.response : this.supportsBinary ? "ok" : this.xhr.responseText
                    } catch (c) {
                        this.onError(c)
                    }
                    null != a && this.onData(a)
                }, f.prototype.hasXDR = function() {
                    return "undefined" != typeof c.XDomainRequest && !this.xs && this.enablesXDR
                }, f.prototype.abort = function() {
                    this.cleanup()
                }, c.document && (f.requestsCount = 0, f.requests = {}, c.attachEvent ? c.attachEvent("onunload", g) : c.addEventListener && c.addEventListener("beforeunload", g, !1))
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {
            "./polling": 18,
            "component-emitter": 9,
            "component-inherit": 21,
            debug: 22,
            xmlhttprequest: 20
        }],
        18: [function(a, b) {
            function c(a) {
                var b = a && a.forceBase64;
                (!i || b) && (this.supportsBinary = !1), d.call(this, a)
            }
            var d = a("../transport"),
                e = a("parseqs"),
                f = a("engine.io-parser"),
                g = a("component-inherit"),
                h = a("debug")("engine.io-client:polling");
            b.exports = c;
            var i = function() {
                var b = a("xmlhttprequest"),
                    c = new b({
                        xdomain: !1
                    });
                return null != c.responseType
            }();
            g(c, d), c.prototype.name = "polling", c.prototype.doOpen = function() {
                this.poll()
            }, c.prototype.pause = function(a) {
                function b() {
                    h("paused"), c.readyState = "paused", a()
                }
                var c = this;
                if (this.readyState = "pausing", this.polling || !this.writable) {
                    var d = 0;
                    this.polling && (h("we are currently polling - waiting to pause"), d++, this.once("pollComplete", function() {
                        h("pre-pause polling complete"), --d || b()
                    })), this.writable || (h("we are currently writing - waiting to pause"), d++, this.once("drain", function() {
                        h("pre-pause writing complete"), --d || b()
                    }))
                } else b()
            }, c.prototype.poll = function() {
                h("polling"), this.polling = !0, this.doPoll(), this.emit("poll")
            }, c.prototype.onData = function(a) {
                var b = this;
                h("polling got data %s", a);
                var c = function(a) {
                    return "opening" == b.readyState && b.onOpen(), "close" == a.type ? (b.onClose(), !1) : void b.onPacket(a)
                };
                f.decodePayload(a, this.socket.binaryType, c), "closed" != this.readyState && (this.polling = !1, this.emit("pollComplete"), "open" == this.readyState ? this.poll() : h('ignoring poll - transport state "%s"', this.readyState))
            }, c.prototype.doClose = function() {
                function a() {
                    h("writing close packet"), b.write([{
                        type: "close"
                    }])
                }
                var b = this;
                "open" == this.readyState ? (h("transport open - closing"), a()) : (h("transport not open - deferring close"), this.once("open", a))
            }, c.prototype.write = function(a) {
                var b = this;
                this.writable = !1;
                var c = function() {
                        b.writable = !0, b.emit("drain")
                    },
                    b = this;
                f.encodePayload(a, this.supportsBinary, function(a) {
                    b.doWrite(a, c)
                })
            }, c.prototype.uri = function() {
                var a = this.query || {},
                    b = this.secure ? "https" : "http",
                    c = "";
                return !1 !== this.timestampRequests && (a[this.timestampParam] = +new Date + "-" + d.timestamps++), this.supportsBinary || a.sid || (a.b64 = 1), a = e.encode(a), this.port && ("https" == b && 443 != this.port || "http" == b && 80 != this.port) && (c = ":" + this.port), a.length && (a = "?" + a), b + "://" + this.hostname + c + this.path + a
            }
        }, {
            "../transport": 14,
            "component-inherit": 21,
            debug: 22,
            "engine.io-parser": 25,
            parseqs: 35,
            xmlhttprequest: 20
        }],
        19: [function(a, b) {
            function c(a) {
                var b = a && a.forceBase64;
                b && (this.supportsBinary = !1), d.call(this, a)
            }
            var d = a("../transport"),
                e = a("engine.io-parser"),
                f = a("parseqs"),
                g = a("component-inherit"),
                h = a("debug")("engine.io-client:websocket"),
                i = a("ws");
            b.exports = c, g(c, d), c.prototype.name = "websocket", c.prototype.supportsBinary = !0, c.prototype.doOpen = function() {
                if (this.check()) {
                    var a = this.uri(),
                        b = void 0,
                        c = {
                            agent: this.agent
                        };
                    c.pfx = this.pfx, c.key = this.key, c.passphrase = this.passphrase, c.cert = this.cert, c.ca = this.ca, c.ciphers = this.ciphers, c.rejectUnauthorized = this.rejectUnauthorized, this.ws = new i(a, b, c), void 0 === this.ws.binaryType && (this.supportsBinary = !1), this.ws.binaryType = "arraybuffer", this.addEventListeners()
                }
            }, c.prototype.addEventListeners = function() {
                var a = this;
                this.ws.onopen = function() {
                    a.onOpen()
                }, this.ws.onclose = function() {
                    a.onClose()
                }, this.ws.onmessage = function(b) {
                    a.onData(b.data)
                }, this.ws.onerror = function(b) {
                    a.onError("websocket error", b)
                }
            }, "undefined" != typeof navigator && /iPad|iPhone|iPod/i.test(navigator.userAgent) && (c.prototype.onData = function(a) {
                var b = this;
                setTimeout(function() {
                    d.prototype.onData.call(b, a)
                }, 0)
            }), c.prototype.write = function(a) {
                function b() {
                    c.writable = !0, c.emit("drain")
                }
                var c = this;
                this.writable = !1;
                for (var d = 0, f = a.length; f > d; d++) e.encodePacket(a[d], this.supportsBinary, function(a) {
                    try {
                        c.ws.send(a)
                    } catch (b) {
                        h("websocket closed before onclose event")
                    }
                });
                setTimeout(b, 0)
            }, c.prototype.onClose = function() {
                d.prototype.onClose.call(this)
            }, c.prototype.doClose = function() {
                "undefined" != typeof this.ws && this.ws.close()
            }, c.prototype.uri = function() {
                var a = this.query || {},
                    b = this.secure ? "wss" : "ws",
                    c = "";
                return this.port && ("wss" == b && 443 != this.port || "ws" == b && 80 != this.port) && (c = ":" + this.port), this.timestampRequests && (a[this.timestampParam] = +new Date), this.supportsBinary || (a.b64 = 1), a = f.encode(a), a.length && (a = "?" + a), b + "://" + this.hostname + c + this.path + a
            }, c.prototype.check = function() {
                return !(!i || "__initialize" in i && this.name === c.prototype.name)
            }
        }, {
            "../transport": 14,
            "component-inherit": 21,
            debug: 22,
            "engine.io-parser": 25,
            parseqs: 35,
            ws: 37
        }],
        20: [function(a, b) {
            var c = a("has-cors");
            b.exports = function(a) {
                var b = a.xdomain,
                    d = a.xscheme,
                    e = a.enablesXDR;
                try {
                    if ("undefined" != typeof XMLHttpRequest && (!b || c)) return new XMLHttpRequest
                } catch (f) {}
                try {
                    if ("undefined" != typeof XDomainRequest && !d && e) return new XDomainRequest
                } catch (f) {}
                if (!b) try {
                    return new ActiveXObject("Microsoft.XMLHTTP")
                } catch (f) {}
            }
        }, {
            "has-cors": 40
        }],
        21: [function(a, b) {
            b.exports = function(a, b) {
                var c = function() {};
                c.prototype = b.prototype, a.prototype = new c, a.prototype.constructor = a
            }
        }, {}],
        22: [function(a, b, c) {
            function d() {
                return "WebkitAppearance" in document.documentElement.style || window.console && (console.firebug || console.exception && console.table) || navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31
            }

            function e() {
                var a = arguments,
                    b = this.useColors;
                if (a[0] = (b ? "%c" : "") + this.namespace + (b ? " %c" : " ") + a[0] + (b ? "%c " : " ") + "+" + c.humanize(this.diff), !b) return a;
                var d = "color: " + this.color;
                a = [a[0], d, "color: inherit"].concat(Array.prototype.slice.call(a, 1));
                var e = 0,
                    f = 0;
                return a[0].replace(/%[a-z%]/g, function(a) {
                    "%" !== a && (e++, "%c" === a && (f = e))
                }), a.splice(f, 0, d), a
            }

            function f() {
                return "object" == typeof console && "function" == typeof console.log && Function.prototype.apply.call(console.log, console, arguments)
            }

            function g(a) {
                try {
                    null == a ? localStorage.removeItem("debug") : localStorage.debug = a
                } catch (b) {}
            }

            function h() {
                var a;
                try {
                    a = localStorage.debug
                } catch (b) {}
                return a
            }
            c = b.exports = a("./debug"), c.log = f, c.formatArgs = e, c.save = g, c.load = h, c.useColors = d, c.colors = ["lightseagreen", "forestgreen", "goldenrod", "dodgerblue", "darkorchid", "crimson"], c.formatters.j = function(a) {
                return JSON.stringify(a)
            }, c.enable(h())
        }, {
            "./debug": 23
        }],
        23: [function(a, b, c) {
            function d() {
                return c.colors[k++ % c.colors.length]
            }

            function e(a) {
                function b() {}

                function e() {
                    var a = e,
                        b = +new Date,
                        f = b - (j || b);
                    a.diff = f, a.prev = j, a.curr = b, j = b, null == a.useColors && (a.useColors = c.useColors()), null == a.color && a.useColors && (a.color = d());
                    var g = Array.prototype.slice.call(arguments);
                    g[0] = c.coerce(g[0]), "string" != typeof g[0] && (g = ["%o"].concat(g));
                    var h = 0;
                    g[0] = g[0].replace(/%([a-z%])/g, function(b, d) {
                        if ("%" === b) return b;
                        h++;
                        var e = c.formatters[d];
                        if ("function" == typeof e) {
                            var f = g[h];
                            b = e.call(a, f), g.splice(h, 1), h--
                        }
                        return b
                    }), "function" == typeof c.formatArgs && (g = c.formatArgs.apply(a, g));
                    var i = e.log || c.log || console.log.bind(console);
                    i.apply(a, g)
                }
                b.enabled = !1, e.enabled = !0;
                var f = c.enabled(a) ? e : b;
                return f.namespace = a, f
            }

            function f(a) {
                c.save(a);
                for (var b = (a || "").split(/[\s,]+/), d = b.length, e = 0; d > e; e++) b[e] && (a = b[e].replace(/\*/g, ".*?"), "-" === a[0] ? c.skips.push(new RegExp("^" + a.substr(1) + "$")) : c.names.push(new RegExp("^" + a + "$")))
            }

            function g() {
                c.enable("")
            }

            function h(a) {
                var b, d;
                for (b = 0, d = c.skips.length; d > b; b++)
                    if (c.skips[b].test(a)) return !1;
                for (b = 0, d = c.names.length; d > b; b++)
                    if (c.names[b].test(a)) return !0;
                return !1
            }

            function i(a) {
                return a instanceof Error ? a.stack || a.message : a
            }
            c = b.exports = e, c.coerce = i, c.disable = g, c.enable = f, c.enabled = h, c.humanize = a("ms"), c.names = [], c.skips = [], c.formatters = {};
            var j, k = 0
        }, {
            ms: 24
        }],
        24: [function(a, b) {
            function c(a) {
                var b = /^((?:\d+)?\.?\d+) *(ms|seconds?|s|minutes?|m|hours?|h|days?|d|years?|y)?$/i.exec(a);
                if (b) {
                    var c = parseFloat(b[1]),
                        d = (b[2] || "ms").toLowerCase();
                    switch (d) {
                        case "years":
                        case "year":
                        case "y":
                            return c * k;
                        case "days":
                        case "day":
                        case "d":
                            return c * j;
                        case "hours":
                        case "hour":
                        case "h":
                            return c * i;
                        case "minutes":
                        case "minute":
                        case "m":
                            return c * h;
                        case "seconds":
                        case "second":
                        case "s":
                            return c * g;
                        case "ms":
                            return c
                    }
                }
            }

            function d(a) {
                return a >= j ? Math.round(a / j) + "d" : a >= i ? Math.round(a / i) + "h" : a >= h ? Math.round(a / h) + "m" : a >= g ? Math.round(a / g) + "s" : a + "ms"
            }

            function e(a) {
                return f(a, j, "day") || f(a, i, "hour") || f(a, h, "minute") || f(a, g, "second") || a + " ms"
            }

            function f(a, b, c) {
                return b > a ? void 0 : 1.5 * b > a ? Math.floor(a / b) + " " + c : Math.ceil(a / b) + " " + c + "s"
            }
            var g = 1e3,
                h = 60 * g,
                i = 60 * h,
                j = 24 * i,
                k = 365.25 * j;
            b.exports = function(a, b) {
                return b = b || {}, "string" == typeof a ? c(a) : b["long"] ? e(a) : d(a)
            }
        }, {}],
        25: [function(a, b, c) {
            (function(b) {
                function d(a, b) {
                    var d = "b" + c.packets[a.type] + a.data.data;
                    return b(d)
                }

                function e(a, b, d) {
                    if (!b) return c.encodeBase64Packet(a, d);
                    var e = a.data,
                        f = new Uint8Array(e),
                        g = new Uint8Array(1 + e.byteLength);
                    g[0] = r[a.type];
                    for (var h = 0; h < f.length; h++) g[h + 1] = f[h];
                    return d(g.buffer)
                }

                function f(a, b, d) {
                    if (!b) return c.encodeBase64Packet(a, d);
                    var e = new FileReader;
                    return e.onload = function() {
                        a.data = e.result, c.encodePacket(a, b, !0, d)
                    }, e.readAsArrayBuffer(a.data)
                }

                function g(a, b, d) {
                    if (!b) return c.encodeBase64Packet(a, d);
                    if (q) return f(a, b, d);
                    var e = new Uint8Array(1);
                    e[0] = r[a.type];
                    var g = new u([e.buffer, a.data]);
                    return d(g)
                }

                function h(a, b, c) {
                    for (var d = new Array(a.length), e = m(a.length, c), f = function(a, c, e) {
                            b(c, function(b, c) {
                                d[a] = c, e(b, d)
                            })
                        }, g = 0; g < a.length; g++) f(g, a[g], e)
                }
                var i = a("./keys"),
                    j = a("has-binary"),
                    k = a("arraybuffer.slice"),
                    l = a("base64-arraybuffer"),
                    m = a("after"),
                    n = a("utf8"),
                    o = navigator.userAgent.match(/Android/i),
                    p = /PhantomJS/i.test(navigator.userAgent),
                    q = o || p;
                c.protocol = 3;
                var r = c.packets = {
                        open: 0,
                        close: 1,
                        ping: 2,
                        pong: 3,
                        message: 4,
                        upgrade: 5,
                        noop: 6
                    },
                    s = i(r),
                    t = {
                        type: "error",
                        data: "parser error"
                    },
                    u = a("blob");
                c.encodePacket = function(a, c, f, h) {
                    "function" == typeof c && (h = c, c = !1), "function" == typeof f && (h = f, f = null);
                    var i = void 0 === a.data ? void 0 : a.data.buffer || a.data;
                    if (b.ArrayBuffer && i instanceof ArrayBuffer) return e(a, c, h);
                    if (u && i instanceof b.Blob) return g(a, c, h);
                    if (i && i.base64) return d(a, h);
                    var j = r[a.type];
                    return void 0 !== a.data && (j += f ? n.encode(String(a.data)) : String(a.data)), h("" + j)
                }, c.encodeBase64Packet = function(a, d) {
                    var e = "b" + c.packets[a.type];
                    if (u && a.data instanceof u) {
                        var f = new FileReader;
                        return f.onload = function() {
                            var a = f.result.split(",")[1];
                            d(e + a)
                        }, f.readAsDataURL(a.data)
                    }
                    var g;
                    try {
                        g = String.fromCharCode.apply(null, new Uint8Array(a.data))
                    } catch (h) {
                        for (var i = new Uint8Array(a.data), j = new Array(i.length), k = 0; k < i.length; k++) j[k] = i[k];
                        g = String.fromCharCode.apply(null, j)
                    }
                    return e += b.btoa(g), d(e)
                }, c.decodePacket = function(a, b, d) {
                    if ("string" == typeof a || void 0 === a) {
                        if ("b" == a.charAt(0)) return c.decodeBase64Packet(a.substr(1), b);
                        if (d) try {
                            a = n.decode(a)
                        } catch (e) {
                            return t
                        }
                        var f = a.charAt(0);
                        return Number(f) == f && s[f] ? a.length > 1 ? {
                            type: s[f],
                            data: a.substring(1)
                        } : {
                            type: s[f]
                        } : t
                    }
                    var g = new Uint8Array(a),
                        f = g[0],
                        h = k(a, 1);
                    return u && "blob" === b && (h = new u([h])), {
                        type: s[f],
                        data: h
                    }
                }, c.decodeBase64Packet = function(a, c) {
                    var d = s[a.charAt(0)];
                    if (!b.ArrayBuffer) return {
                        type: d,
                        data: {
                            base64: !0,
                            data: a.substr(1)
                        }
                    };
                    var e = l.decode(a.substr(1));
                    return "blob" === c && u && (e = new u([e])), {
                        type: d,
                        data: e
                    }
                }, c.encodePayload = function(a, b, d) {
                    function e(a) {
                        return a.length + ":" + a
                    }

                    function f(a, d) {
                        c.encodePacket(a, g ? b : !1, !0, function(a) {
                            d(null, e(a))
                        })
                    }
                    "function" == typeof b && (d = b, b = null);
                    var g = j(a);
                    return b && g ? u && !q ? c.encodePayloadAsBlob(a, d) : c.encodePayloadAsArrayBuffer(a, d) : a.length ? void h(a, f, function(a, b) {
                        return d(b.join(""))
                    }) : d("0:")
                }, c.decodePayload = function(a, b, d) {
                    if ("string" != typeof a) return c.decodePayloadAsBinary(a, b, d);
                    "function" == typeof b && (d = b, b = null);
                    var e;
                    if ("" == a) return d(t, 0, 1);
                    for (var f, g, h = "", i = 0, j = a.length; j > i; i++) {
                        var k = a.charAt(i);
                        if (":" != k) h += k;
                        else {
                            if ("" == h || h != (f = Number(h))) return d(t, 0, 1);
                            if (g = a.substr(i + 1, f), h != g.length) return d(t, 0, 1);
                            if (g.length) {
                                if (e = c.decodePacket(g, b, !0), t.type == e.type && t.data == e.data) return d(t, 0, 1);
                                var l = d(e, i + f, j);
                                if (!1 === l) return
                            }
                            i += f, h = ""
                        }
                    }
                    return "" != h ? d(t, 0, 1) : void 0
                }, c.encodePayloadAsArrayBuffer = function(a, b) {
                    function d(a, b) {
                        c.encodePacket(a, !0, !0, function(a) {
                            return b(null, a)
                        })
                    }
                    return a.length ? void h(a, d, function(a, c) {
                        var d = c.reduce(function(a, b) {
                                var c;
                                return c = "string" == typeof b ? b.length : b.byteLength, a + c.toString().length + c + 2
                            }, 0),
                            e = new Uint8Array(d),
                            f = 0;
                        return c.forEach(function(a) {
                            var b = "string" == typeof a,
                                c = a;
                            if (b) {
                                for (var d = new Uint8Array(a.length), g = 0; g < a.length; g++) d[g] = a.charCodeAt(g);
                                c = d.buffer
                            }
                            e[f++] = b ? 0 : 1;
                            for (var h = c.byteLength.toString(), g = 0; g < h.length; g++) e[f++] = parseInt(h[g]);
                            e[f++] = 255;
                            for (var d = new Uint8Array(c), g = 0; g < d.length; g++) e[f++] = d[g]
                        }), b(e.buffer)
                    }) : b(new ArrayBuffer(0))
                }, c.encodePayloadAsBlob = function(a, b) {
                    function d(a, b) {
                        c.encodePacket(a, !0, !0, function(a) {
                            var c = new Uint8Array(1);
                            if (c[0] = 1, "string" == typeof a) {
                                for (var d = new Uint8Array(a.length), e = 0; e < a.length; e++) d[e] = a.charCodeAt(e);
                                a = d.buffer, c[0] = 0
                            }
                            for (var f = a instanceof ArrayBuffer ? a.byteLength : a.size, g = f.toString(), h = new Uint8Array(g.length + 1), e = 0; e < g.length; e++) h[e] = parseInt(g[e]);
                            if (h[g.length] = 255, u) {
                                var i = new u([c.buffer, h.buffer, a]);
                                b(null, i)
                            }
                        })
                    }
                    h(a, d, function(a, c) {
                        return b(new u(c))
                    })
                }, c.decodePayloadAsBinary = function(a, b, d) {
                    "function" == typeof b && (d = b, b = null);
                    for (var e = a, f = [], g = !1; e.byteLength > 0;) {
                        for (var h = new Uint8Array(e), i = 0 === h[0], j = "", l = 1; 255 != h[l]; l++) {
                            if (j.length > 310) {
                                g = !0;
                                break
                            }
                            j += h[l]
                        }
                        if (g) return d(t, 0, 1);
                        e = k(e, 2 + j.length), j = parseInt(j);
                        var m = k(e, 0, j);
                        if (i) try {
                            m = String.fromCharCode.apply(null, new Uint8Array(m))
                        } catch (n) {
                            var o = new Uint8Array(m);
                            m = "";
                            for (var l = 0; l < o.length; l++) m += String.fromCharCode(o[l])
                        }
                        f.push(m), e = k(e, j)
                    }
                    var p = f.length;
                    f.forEach(function(a, e) {
                        d(c.decodePacket(a, b, !0), e, p)
                    })
                }
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {
            "./keys": 26,
            after: 27,
            "arraybuffer.slice": 28,
            "base64-arraybuffer": 29,
            blob: 30,
            "has-binary": 31,
            utf8: 33
        }],
        26: [function(a, b) {
            b.exports = Object.keys || function(a) {
                var b = [],
                    c = Object.prototype.hasOwnProperty;
                for (var d in a) c.call(a, d) && b.push(d);
                return b
            }
        }, {}],
        27: [function(a, b) {
            function c(a, b, c) {
                function e(a, d) {
                    if (e.count <= 0) throw new Error("after called too many times");
                    --e.count, a ? (f = !0, b(a), b = c) : 0 !== e.count || f || b(null, d)
                }
                var f = !1;
                return c = c || d, e.count = a, 0 === a ? b() : e
            }

            function d() {}
            b.exports = c
        }, {}],
        28: [function(a, b) {
            b.exports = function(a, b, c) {
                var d = a.byteLength;
                if (b = b || 0, c = c || d, a.slice) return a.slice(b, c);
                if (0 > b && (b += d), 0 > c && (c += d), c > d && (c = d), b >= d || b >= c || 0 === d) return new ArrayBuffer(0);
                for (var e = new Uint8Array(a), f = new Uint8Array(c - b), g = b, h = 0; c > g; g++, h++) f[h] = e[g];
                return f.buffer
            }
        }, {}],
        29: [function(a, b, c) {
            ! function(a) {
                "use strict";
                c.encode = function(b) {
                    var c, d = new Uint8Array(b),
                        e = d.length,
                        f = "";
                    for (c = 0; e > c; c += 3) f += a[d[c] >> 2], f += a[(3 & d[c]) << 4 | d[c + 1] >> 4], f += a[(15 & d[c + 1]) << 2 | d[c + 2] >> 6], f += a[63 & d[c + 2]];
                    return e % 3 === 2 ? f = f.substring(0, f.length - 1) + "=" : e % 3 === 1 && (f = f.substring(0, f.length - 2) + "=="), f
                }, c.decode = function(b) {
                    var c, d, e, f, g, h = .75 * b.length,
                        i = b.length,
                        j = 0;
                    "=" === b[b.length - 1] && (h--, "=" === b[b.length - 2] && h--);
                    var k = new ArrayBuffer(h),
                        l = new Uint8Array(k);
                    for (c = 0; i > c; c += 4) d = a.indexOf(b[c]), e = a.indexOf(b[c + 1]), f = a.indexOf(b[c + 2]), g = a.indexOf(b[c + 3]), l[j++] = d << 2 | e >> 4, l[j++] = (15 & e) << 4 | f >> 2, l[j++] = (3 & f) << 6 | 63 & g;
                    return k
                }
            }("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/")
        }, {}],
        30: [function(a, b) {
            (function(a) {
                function c(a, b) {
                    b = b || {};
                    for (var c = new d, e = 0; e < a.length; e++) c.append(a[e]);
                    return b.type ? c.getBlob(b.type) : c.getBlob()
                }
                var d = a.BlobBuilder || a.WebKitBlobBuilder || a.MSBlobBuilder || a.MozBlobBuilder,
                    e = function() {
                        try {
                            var a = new Blob(["hi"]);
                            return 2 == a.size
                        } catch (b) {
                            return !1
                        }
                    }(),
                    f = d && d.prototype.append && d.prototype.getBlob;
                b.exports = function() {
                    return e ? a.Blob : f ? c : void 0
                }()
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {}],
        31: [function(a, b) {
            (function(c) {
                function d(a) {
                    function b(a) {
                        if (!a) return !1;
                        if (c.Buffer && c.Buffer.isBuffer(a) || c.ArrayBuffer && a instanceof ArrayBuffer || c.Blob && a instanceof Blob || c.File && a instanceof File) return !0;
                        if (e(a)) {
                            for (var d = 0; d < a.length; d++)
                                if (b(a[d])) return !0
                        } else if (a && "object" == typeof a) {
                            a.toJSON && (a = a.toJSON());
                            for (var f in a)
                                if (a.hasOwnProperty(f) && b(a[f])) return !0
                        }
                        return !1
                    }
                    return b(a)
                }
                var e = a("isarray");
                b.exports = d
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {
            isarray: 32
        }],
        32: [function(a, b) {
            b.exports = Array.isArray || function(a) {
                return "[object Array]" == Object.prototype.toString.call(a)
            }
        }, {}],
        33: [function(b, c, d) {
            (function(b) {
                ! function(e) {
                    function f(a) {
                        for (var b, c, d = [], e = 0, f = a.length; f > e;) b = a.charCodeAt(e++), b >= 55296 && 56319 >= b && f > e ? (c = a.charCodeAt(e++), 56320 == (64512 & c) ? d.push(((1023 & b) << 10) + (1023 & c) + 65536) : (d.push(b), e--)) : d.push(b);
                        return d
                    }

                    function g(a) {
                        for (var b, c = a.length, d = -1, e = ""; ++d < c;) b = a[d], b > 65535 && (b -= 65536, e += t(b >>> 10 & 1023 | 55296), b = 56320 | 1023 & b), e += t(b);
                        return e
                    }

                    function h(a, b) {
                        return t(a >> b & 63 | 128)
                    }

                    function i(a) {
                        if (0 == (4294967168 & a)) return t(a);
                        var b = "";
                        return 0 == (4294965248 & a) ? b = t(a >> 6 & 31 | 192) : 0 == (4294901760 & a) ? (b = t(a >> 12 & 15 | 224), b += h(a, 6)) : 0 == (4292870144 & a) && (b = t(a >> 18 & 7 | 240), b += h(a, 12), b += h(a, 6)), b += t(63 & a | 128)
                    }

                    function j(a) {
                        for (var b, c = f(a), d = c.length, e = -1, g = ""; ++e < d;) b = c[e], g += i(b);
                        return g
                    }

                    function k() {
                        if (s >= r) throw Error("Invalid byte index");
                        var a = 255 & q[s];
                        if (s++, 128 == (192 & a)) return 63 & a;
                        throw Error("Invalid continuation byte")
                    }

                    function l() {
                        var a, b, c, d, e;
                        if (s > r) throw Error("Invalid byte index");
                        if (s == r) return !1;
                        if (a = 255 & q[s], s++, 0 == (128 & a)) return a;
                        if (192 == (224 & a)) {
                            var b = k();
                            if (e = (31 & a) << 6 | b, e >= 128) return e;
                            throw Error("Invalid continuation byte")
                        }
                        if (224 == (240 & a)) {
                            if (b = k(), c = k(), e = (15 & a) << 12 | b << 6 | c, e >= 2048) return e;
                            throw Error("Invalid continuation byte")
                        }
                        if (240 == (248 & a) && (b = k(), c = k(), d = k(), e = (15 & a) << 18 | b << 12 | c << 6 | d, e >= 65536 && 1114111 >= e)) return e;
                        throw Error("Invalid UTF-8 detected")
                    }

                    function m(a) {
                        q = f(a), r = q.length, s = 0;
                        for (var b, c = [];
                            (b = l()) !== !1;) c.push(b);
                        return g(c)
                    }
                    var n = "object" == typeof d && d,
                        o = "object" == typeof c && c && c.exports == n && c,
                        p = "object" == typeof b && b;
                    (p.global === p || p.window === p) && (e = p);
                    var q, r, s, t = String.fromCharCode,
                        u = {
                            version: "2.0.0",
                            encode: j,
                            decode: m
                        };
                    if ("function" == typeof a && "object" == typeof a.amd && a.amd) a(function() {
                        return u
                    });
                    else if (n && !n.nodeType)
                        if (o) o.exports = u;
                        else {
                            var v = {},
                                w = v.hasOwnProperty;
                            for (var x in u) w.call(u, x) && (n[x] = u[x])
                        }
                    else e.utf8 = u
                }(this)
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {}],
        34: [function(a, b) {
            (function(a) {
                var c = /^[\],:{}\s]*$/,
                    d = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
                    e = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                    f = /(?:^|:|,)(?:\s*\[)+/g,
                    g = /^\s+/,
                    h = /\s+$/;
                b.exports = function(b) {
                    return "string" == typeof b && b ? (b = b.replace(g, "").replace(h, ""), a.JSON && JSON.parse ? JSON.parse(b) : c.test(b.replace(d, "@").replace(e, "]").replace(f, "")) ? new Function("return " + b)() : void 0) : null
                }
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {}],
        35: [function(a, b, c) {
            c.encode = function(a) {
                var b = "";
                for (var c in a) a.hasOwnProperty(c) && (b.length && (b += "&"), b += encodeURIComponent(c) + "=" + encodeURIComponent(a[c]));
                return b
            }, c.decode = function(a) {
                for (var b = {}, c = a.split("&"), d = 0, e = c.length; e > d; d++) {
                    var f = c[d].split("=");
                    b[decodeURIComponent(f[0])] = decodeURIComponent(f[1])
                }
                return b
            }
        }, {}],
        36: [function(a, b) {
            var c = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
                d = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
            b.exports = function(a) {
                var b = a,
                    e = a.indexOf("["),
                    f = a.indexOf("]"); - 1 != e && -1 != f && (a = a.substring(0, e) + a.substring(e, f).replace(/:/g, ";") + a.substring(f, a.length));
                for (var g = c.exec(a || ""), h = {}, i = 14; i--;) h[d[i]] = g[i] || "";
                return -1 != e && -1 != f && (h.source = b, h.host = h.host.substring(1, h.host.length - 1).replace(/;/g, ":"), h.authority = h.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), h.ipv6uri = !0), h
            }
        }, {}],
        37: [function(a, b) {
            function c(a, b) {
                var c;
                return c = b ? new e(a, b) : new e(a)
            }
            var d = function() {
                    return this
                }(),
                e = d.WebSocket || d.MozWebSocket;
            b.exports = e ? c : null, e && (c.prototype = e.prototype)
        }, {}],
        38: [function(a, b) {
            (function(c) {
                function d(a) {
                    function b(a) {
                        if (!a) return !1;
                        if (c.Buffer && c.Buffer.isBuffer(a) || c.ArrayBuffer && a instanceof ArrayBuffer || c.Blob && a instanceof Blob || c.File && a instanceof File) return !0;
                        if (e(a)) {
                            for (var d = 0; d < a.length; d++)
                                if (b(a[d])) return !0
                        } else if (a && "object" == typeof a) {
                            a.toJSON && (a = a.toJSON());
                            for (var f in a)
                                if (Object.prototype.hasOwnProperty.call(a, f) && b(a[f])) return !0
                        }
                        return !1
                    }
                    return b(a)
                }
                var e = a("isarray");
                b.exports = d
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {
            isarray: 39
        }],
        39: [function(a, b) {
            b.exports = a(32)
        }, {}],
        40: [function(a, b) {
            var c = a("global");
            try {
                b.exports = "XMLHttpRequest" in c && "withCredentials" in new c.XMLHttpRequest
            } catch (d) {
                b.exports = !1
            }
        }, {
            global: 41
        }],
        41: [function(a, b) {
            b.exports = function() {
                return this
            }()
        }, {}],
        42: [function(a, b) {
            var c = [].indexOf;
            b.exports = function(a, b) {
                if (c) return a.indexOf(b);
                for (var d = 0; d < a.length; ++d)
                    if (a[d] === b) return d;
                return -1
            }
        }, {}],
        43: [function(a, b, c) {
            var d = Object.prototype.hasOwnProperty;
            c.keys = Object.keys || function(a) {
                var b = [];
                for (var c in a) d.call(a, c) && b.push(c);
                return b
            }, c.values = function(a) {
                var b = [];
                for (var c in a) d.call(a, c) && b.push(a[c]);
                return b
            }, c.merge = function(a, b) {
                for (var c in b) d.call(b, c) && (a[c] = b[c]);
                return a
            }, c.length = function(a) {
                return c.keys(a).length
            }, c.isEmpty = function(a) {
                return 0 == c.length(a)
            }
        }, {}],
        44: [function(a, b) {
            var c = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
                d = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
            b.exports = function(a) {
                for (var b = c.exec(a || ""), e = {}, f = 14; f--;) e[d[f]] = b[f] || "";
                return e
            }
        }, {}],
        45: [function(a, b, c) {
            (function(b) {
                var d = a("isarray"),
                    e = a("./is-buffer");
                c.deconstructPacket = function(a) {
                    function b(a) {
                        if (!a) return a;
                        if (e(a)) {
                            var f = {
                                _placeholder: !0,
                                num: c.length
                            };
                            return c.push(a), f
                        }
                        if (d(a)) {
                            for (var g = new Array(a.length), h = 0; h < a.length; h++) g[h] = b(a[h]);
                            return g
                        }
                        if ("object" == typeof a && !(a instanceof Date)) {
                            var g = {};
                            for (var i in a) g[i] = b(a[i]);
                            return g
                        }
                        return a
                    }
                    var c = [],
                        f = a.data,
                        g = a;
                    return g.data = b(f), g.attachments = c.length, {
                        packet: g,
                        buffers: c
                    }
                }, c.reconstructPacket = function(a, b) {
                    function c(a) {
                        if (a && a._placeholder) {
                            var e = b[a.num];
                            return e
                        }
                        if (d(a)) {
                            for (var f = 0; f < a.length; f++) a[f] = c(a[f]);
                            return a
                        }
                        if (a && "object" == typeof a) {
                            for (var g in a) a[g] = c(a[g]);
                            return a
                        }
                        return a
                    }
                    return a.data = c(a.data), a.attachments = void 0, a
                }, c.removeBlobs = function(a, c) {
                    function f(a, i, j) {
                        if (!a) return a;
                        if (b.Blob && a instanceof Blob || b.File && a instanceof File) {
                            g++;
                            var k = new FileReader;
                            k.onload = function() {
                                j ? j[i] = this.result : h = this.result, --g || c(h)
                            }, k.readAsArrayBuffer(a)
                        } else if (d(a))
                            for (var l = 0; l < a.length; l++) f(a[l], l, a);
                        else if (a && "object" == typeof a && !e(a))
                            for (var m in a) f(a[m], m, a)
                    }
                    var g = 0,
                        h = a;
                    f(h), g || c(h)
                }
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {
            "./is-buffer": 47,
            isarray: 48
        }],
        46: [function(a, b, c) {
            function d() {}

            function e(a) {
                var b = "",
                    d = !1;
                return b += a.type, (c.BINARY_EVENT == a.type || c.BINARY_ACK == a.type) && (b += a.attachments, b += "-"), a.nsp && "/" != a.nsp && (d = !0, b += a.nsp), null != a.id && (d && (b += ",", d = !1), b += a.id), null != a.data && (d && (b += ","), b += l.stringify(a.data)), k("encoded %j as %s", a, b), b
            }

            function f(a, b) {
                function c(a) {
                    var c = n.deconstructPacket(a),
                        d = e(c.packet),
                        f = c.buffers;
                    f.unshift(d), b(f)
                }
                n.removeBlobs(a, c)
            }

            function g() {
                this.reconstructor = null
            }

            function h(a) {
                var b = {},
                    d = 0;
                if (b.type = Number(a.charAt(0)), null == c.types[b.type]) return j();
                if (c.BINARY_EVENT == b.type || c.BINARY_ACK == b.type) {
                    for (var e = "";
                        "-" != a.charAt(++d) && (e += a.charAt(d), d != a.length););
                    if (e != Number(e) || "-" != a.charAt(d)) throw new Error("Illegal attachments");
                    b.attachments = Number(e)
                }
                if ("/" == a.charAt(d + 1))
                    for (b.nsp = ""; ++d;) {
                        var f = a.charAt(d);
                        if ("," == f) break;
                        if (b.nsp += f, d == a.length) break
                    } else b.nsp = "/";
                var g = a.charAt(d + 1);
                if ("" !== g && Number(g) == g) {
                    for (b.id = ""; ++d;) {
                        var f = a.charAt(d);
                        if (null == f || Number(f) != f) {
                            --d;
                            break
                        }
                        if (b.id += a.charAt(d), d == a.length) break
                    }
                    b.id = Number(b.id)
                }
                if (a.charAt(++d)) try {
                    b.data = l.parse(a.substr(d))
                } catch (h) {
                    return j()
                }
                return k("decoded %s as %j", a, b), b
            }

            function i(a) {
                this.reconPack = a, this.buffers = []
            }

            function j() {
                return {
                    type: c.ERROR,
                    data: "parser error"
                }
            }
            var k = a("debug")("socket.io-parser"),
                l = a("json3"),
                m = (a("isarray"), a("component-emitter")),
                n = a("./binary"),
                o = a("./is-buffer");
            c.protocol = 4, c.types = ["CONNECT", "DISCONNECT", "EVENT", "BINARY_EVENT", "ACK", "BINARY_ACK", "ERROR"], c.CONNECT = 0, c.DISCONNECT = 1, c.EVENT = 2, c.ACK = 3, c.ERROR = 4, c.BINARY_EVENT = 5, c.BINARY_ACK = 6, c.Encoder = d, c.Decoder = g, d.prototype.encode = function(a, b) {
                if (k("encoding packet %j", a), c.BINARY_EVENT == a.type || c.BINARY_ACK == a.type) f(a, b);
                else {
                    var d = e(a);
                    b([d])
                }
            }, m(g.prototype), g.prototype.add = function(a) {
                var b;
                if ("string" == typeof a) b = h(a), c.BINARY_EVENT == b.type || c.BINARY_ACK == b.type ? (this.reconstructor = new i(b), 0 === this.reconstructor.reconPack.attachments && this.emit("decoded", b)) : this.emit("decoded", b);
                else {
                    if (!o(a) && !a.base64) throw new Error("Unknown type: " + a);
                    if (!this.reconstructor) throw new Error("got binary data when not reconstructing a packet");
                    b = this.reconstructor.takeBinaryData(a), b && (this.reconstructor = null, this.emit("decoded", b))
                }
            }, g.prototype.destroy = function() {
                this.reconstructor && this.reconstructor.finishedReconstruction()
            }, i.prototype.takeBinaryData = function(a) {
                if (this.buffers.push(a), this.buffers.length == this.reconPack.attachments) {
                    var b = n.reconstructPacket(this.reconPack, this.buffers);
                    return this.finishedReconstruction(), b
                }
                return null
            }, i.prototype.finishedReconstruction = function() {
                this.reconPack = null, this.buffers = []
            }
        }, {
            "./binary": 45,
            "./is-buffer": 47,
            "component-emitter": 9,
            debug: 10,
            isarray: 48,
            json3: 49
        }],
        47: [function(a, b) {
            (function(a) {
                function c(b) {
                    return a.Buffer && a.Buffer.isBuffer(b) || a.ArrayBuffer && b instanceof ArrayBuffer
                }
                b.exports = c
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {}],
        48: [function(a, b) {
            b.exports = a(32)
        }, {}],
        49: [function(b, c, d) {
            ! function(b) {
                function c(a) {
                    if (c[a] !== g) return c[a];
                    var b;
                    if ("bug-string-char-index" == a) b = "a" != "a" [0];
                    else if ("json" == a) b = c("json-stringify") && c("json-parse");
                    else {
                        var d, e = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
                        if ("json-stringify" == a) {
                            var f = k.stringify,
                                i = "function" == typeof f && l;
                            if (i) {
                                (d = function() {
                                    return 1
                                }).toJSON = d;
                                try {
                                    i = "0" === f(0) && "0" === f(new Number) && '""' == f(new String) && f(h) === g && f(g) === g && f() === g && "1" === f(d) && "[1]" == f([d]) && "[null]" == f([g]) && "null" == f(null) && "[null,null,null]" == f([g, h, null]) && f({
                                        a: [d, !0, !1, null, "\x00\b\n\f\r	"]
                                    }) == e && "1" === f(null, d) && "[\n 1,\n 2\n]" == f([1, 2], null, 1) && '"-271821-04-20T00:00:00.000Z"' == f(new Date(-864e13)) && '"+275760-09-13T00:00:00.000Z"' == f(new Date(864e13)) && '"-000001-01-01T00:00:00.000Z"' == f(new Date(-621987552e5)) && '"1969-12-31T23:59:59.999Z"' == f(new Date(-1))
                                } catch (j) {
                                    i = !1
                                }
                            }
                            b = i
                        }
                        if ("json-parse" == a) {
                            var m = k.parse;
                            if ("function" == typeof m) try {
                                if (0 === m("0") && !m(!1)) {
                                    d = m(e);
                                    var n = 5 == d.a.length && 1 === d.a[0];
                                    if (n) {
                                        try {
                                            n = !m('"	"')
                                        } catch (j) {}
                                        if (n) try {
                                            n = 1 !== m("01")
                                        } catch (j) {}
                                        if (n) try {
                                            n = 1 !== m("1.")
                                        } catch (j) {}
                                    }
                                }
                            } catch (j) {
                                n = !1
                            }
                            b = n
                        }
                    }
                    return c[a] = !!b
                }
                var e, f, g, h = {}.toString,
                    i = "function" == typeof a && a.amd,
                    j = "object" == typeof JSON && JSON,
                    k = "object" == typeof d && d && !d.nodeType && d;
                k && j ? (k.stringify = j.stringify, k.parse = j.parse) : k = b.JSON = j || {};
                var l = new Date(-0xc782b5b800cec);
                try {
                    l = -109252 == l.getUTCFullYear() && 0 === l.getUTCMonth() && 1 === l.getUTCDate() && 10 == l.getUTCHours() && 37 == l.getUTCMinutes() && 6 == l.getUTCSeconds() && 708 == l.getUTCMilliseconds()
                } catch (m) {}
                if (!c("json")) {
                    var n = "[object Function]",
                        o = "[object Date]",
                        p = "[object Number]",
                        q = "[object String]",
                        r = "[object Array]",
                        s = "[object Boolean]",
                        t = c("bug-string-char-index");
                    if (!l) var u = Math.floor,
                        v = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
                        w = function(a, b) {
                            return v[b] + 365 * (a - 1970) + u((a - 1969 + (b = +(b > 1))) / 4) - u((a - 1901 + b) / 100) + u((a - 1601 + b) / 400)
                        };
                    (e = {}.hasOwnProperty) || (e = function(a) {
                        var b, c = {};
                        return (c.__proto__ = null, c.__proto__ = {
                            toString: 1
                        }, c).toString != h ? e = function(a) {
                            var b = this.__proto__,
                                c = a in (this.__proto__ = null, this);
                            return this.__proto__ = b, c
                        } : (b = c.constructor, e = function(a) {
                            var c = (this.constructor || b).prototype;
                            return a in this && !(a in c && this[a] === c[a])
                        }), c = null, e.call(this, a)
                    });
                    var x = {
                            "boolean": 1,
                            number: 1,
                            string: 1,
                            undefined: 1
                        },
                        y = function(a, b) {
                            var c = typeof a[b];
                            return "object" == c ? !!a[b] : !x[c]
                        };
                    if (f = function(a, b) {
                            var c, d, g, i = 0;
                            (c = function() {
                                this.valueOf = 0
                            }).prototype.valueOf = 0, d = new c;
                            for (g in d) e.call(d, g) && i++;
                            return c = d = null, i ? f = 2 == i ? function(a, b) {
                                var c, d = {},
                                    f = h.call(a) == n;
                                for (c in a) f && "prototype" == c || e.call(d, c) || !(d[c] = 1) || !e.call(a, c) || b(c)
                            } : function(a, b) {
                                var c, d, f = h.call(a) == n;
                                for (c in a) f && "prototype" == c || !e.call(a, c) || (d = "constructor" === c) || b(c);
                                (d || e.call(a, c = "constructor")) && b(c)
                            } : (d = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"], f = function(a, b) {
                                var c, f, g = h.call(a) == n,
                                    i = !g && "function" != typeof a.constructor && y(a, "hasOwnProperty") ? a.hasOwnProperty : e;
                                for (c in a) g && "prototype" == c || !i.call(a, c) || b(c);
                                for (f = d.length; c = d[--f]; i.call(a, c) && b(c));
                            }), f(a, b)
                        }, !c("json-stringify")) {
                        var z = {
                                92: "\\\\",
                                34: '\\"',
                                8: "\\b",
                                12: "\\f",
                                10: "\\n",
                                13: "\\r",
                                9: "\\t"
                            },
                            A = "000000",
                            B = function(a, b) {
                                return (A + (b || 0)).slice(-a)
                            },
                            C = "\\u00",
                            D = function(a) {
                                var b, c = '"',
                                    d = 0,
                                    e = a.length,
                                    f = e > 10 && t;
                                for (f && (b = a.split("")); e > d; d++) {
                                    var g = a.charCodeAt(d);
                                    switch (g) {
                                        case 8:
                                        case 9:
                                        case 10:
                                        case 12:
                                        case 13:
                                        case 34:
                                        case 92:
                                            c += z[g];
                                            break;
                                        default:
                                            if (32 > g) {
                                                c += C + B(2, g.toString(16));
                                                break
                                            }
                                            c += f ? b[d] : t ? a.charAt(d) : a[d]
                                    }
                                }
                                return c + '"'
                            },
                            E = function(a, b, c, d, i, j, k) {
                                var l, m, n, t, v, x, y, z, A, C, F, G, H, I, J, K;
                                try {
                                    l = b[a]
                                } catch (L) {}
                                if ("object" == typeof l && l)
                                    if (m = h.call(l), m != o || e.call(l, "toJSON")) "function" == typeof l.toJSON && (m != p && m != q && m != r || e.call(l, "toJSON")) && (l = l.toJSON(a));
                                    else if (l > -1 / 0 && 1 / 0 > l) {
                                    if (w) {
                                        for (v = u(l / 864e5), n = u(v / 365.2425) + 1970 - 1; w(n + 1, 0) <= v; n++);
                                        for (t = u((v - w(n, 0)) / 30.42); w(n, t + 1) <= v; t++);
                                        v = 1 + v - w(n, t), x = (l % 864e5 + 864e5) % 864e5, y = u(x / 36e5) % 24, z = u(x / 6e4) % 60, A = u(x / 1e3) % 60, C = x % 1e3
                                    } else n = l.getUTCFullYear(), t = l.getUTCMonth(), v = l.getUTCDate(), y = l.getUTCHours(), z = l.getUTCMinutes(), A = l.getUTCSeconds(), C = l.getUTCMilliseconds();
                                    l = (0 >= n || n >= 1e4 ? (0 > n ? "-" : "+") + B(6, 0 > n ? -n : n) : B(4, n)) + "-" + B(2, t + 1) + "-" + B(2, v) + "T" + B(2, y) + ":" + B(2, z) + ":" + B(2, A) + "." + B(3, C) + "Z"
                                } else l = null;
                                if (c && (l = c.call(b, a, l)), null === l) return "null";
                                if (m = h.call(l), m == s) return "" + l;
                                if (m == p) return l > -1 / 0 && 1 / 0 > l ? "" + l : "null";
                                if (m == q) return D("" + l);
                                if ("object" == typeof l) {
                                    for (I = k.length; I--;)
                                        if (k[I] === l) throw TypeError();
                                    if (k.push(l), F = [], J = j, j += i, m == r) {
                                        for (H = 0, I = l.length; I > H; H++) G = E(H, l, c, d, i, j, k), F.push(G === g ? "null" : G);
                                        K = F.length ? i ? "[\n" + j + F.join(",\n" + j) + "\n" + J + "]" : "[" + F.join(",") + "]" : "[]"
                                    } else f(d || l, function(a) {
                                        var b = E(a, l, c, d, i, j, k);
                                        b !== g && F.push(D(a) + ":" + (i ? " " : "") + b)
                                    }), K = F.length ? i ? "{\n" + j + F.join(",\n" + j) + "\n" + J + "}" : "{" + F.join(",") + "}" : "{}";
                                    return k.pop(), K
                                }
                            };
                        k.stringify = function(a, b, c) {
                            var d, e, f, g;
                            if ("function" == typeof b || "object" == typeof b && b)
                                if ((g = h.call(b)) == n) e = b;
                                else if (g == r) {
                                f = {};
                                for (var i, j = 0, k = b.length; k > j; i = b[j++], g = h.call(i), (g == q || g == p) && (f[i] = 1));
                            }
                            if (c)
                                if ((g = h.call(c)) == p) {
                                    if ((c -= c % 1) > 0)
                                        for (d = "", c > 10 && (c = 10); d.length < c; d += " ");
                                } else g == q && (d = c.length <= 10 ? c : c.slice(0, 10));
                            return E("", (i = {}, i[""] = a, i), e, f, d, "", [])
                        }
                    }
                    if (!c("json-parse")) {
                        var F, G, H = String.fromCharCode,
                            I = {
                                92: "\\",
                                34: '"',
                                47: "/",
                                98: "\b",
                                116: "	",
                                110: "\n",
                                102: "\f",
                                114: "\r"
                            },
                            J = function() {
                                throw F = G = null, SyntaxError()
                            },
                            K = function() {
                                for (var a, b, c, d, e, f = G, g = f.length; g > F;) switch (e = f.charCodeAt(F)) {
                                    case 9:
                                    case 10:
                                    case 13:
                                    case 32:
                                        F++;
                                        break;
                                    case 123:
                                    case 125:
                                    case 91:
                                    case 93:
                                    case 58:
                                    case 44:
                                        return a = t ? f.charAt(F) : f[F], F++, a;
                                    case 34:
                                        for (a = "@", F++; g > F;)
                                            if (e = f.charCodeAt(F), 32 > e) J();
                                            else if (92 == e) switch (e = f.charCodeAt(++F)) {
                                            case 92:
                                            case 34:
                                            case 47:
                                            case 98:
                                            case 116:
                                            case 110:
                                            case 102:
                                            case 114:
                                                a += I[e], F++;
                                                break;
                                            case 117:
                                                for (b = ++F, c = F + 4; c > F; F++) e = f.charCodeAt(F), e >= 48 && 57 >= e || e >= 97 && 102 >= e || e >= 65 && 70 >= e || J();
                                                a += H("0x" + f.slice(b, F));
                                                break;
                                            default:
                                                J()
                                        } else {
                                            if (34 == e) break;
                                            for (e = f.charCodeAt(F), b = F; e >= 32 && 92 != e && 34 != e;) e = f.charCodeAt(++F);
                                            a += f.slice(b, F)
                                        }
                                        if (34 == f.charCodeAt(F)) return F++, a;
                                        J();
                                    default:
                                        if (b = F, 45 == e && (d = !0, e = f.charCodeAt(++F)), e >= 48 && 57 >= e) {
                                            for (48 == e && (e = f.charCodeAt(F + 1), e >= 48 && 57 >= e) && J(), d = !1; g > F && (e = f.charCodeAt(F), e >= 48 && 57 >= e); F++);
                                            if (46 == f.charCodeAt(F)) {
                                                for (c = ++F; g > c && (e = f.charCodeAt(c), e >= 48 && 57 >= e); c++);
                                                c == F && J(), F = c
                                            }
                                            if (e = f.charCodeAt(F), 101 == e || 69 == e) {
                                                for (e = f.charCodeAt(++F), (43 == e || 45 == e) && F++, c = F; g > c && (e = f.charCodeAt(c), e >= 48 && 57 >= e); c++);
                                                c == F && J(), F = c
                                            }
                                            return +f.slice(b, F)
                                        }
                                        if (d && J(), "true" == f.slice(F, F + 4)) return F += 4, !0;
                                        if ("false" == f.slice(F, F + 5)) return F += 5, !1;
                                        if ("null" == f.slice(F, F + 4)) return F += 4, null;
                                        J()
                                }
                                return "$"
                            },
                            L = function(a) {
                                var b, c;
                                if ("$" == a && J(), "string" == typeof a) {
                                    if ("@" == (t ? a.charAt(0) : a[0])) return a.slice(1);
                                    if ("[" == a) {
                                        for (b = []; a = K(), "]" != a; c || (c = !0)) c && ("," == a ? (a = K(), "]" == a && J()) : J()), "," == a && J(), b.push(L(a));
                                        return b
                                    }
                                    if ("{" == a) {
                                        for (b = {}; a = K(), "}" != a; c || (c = !0)) c && ("," == a ? (a = K(), "}" == a && J()) : J()), ("," == a || "string" != typeof a || "@" != (t ? a.charAt(0) : a[0]) || ":" != K()) && J(), b[a.slice(1)] = L(K());
                                        return b
                                    }
                                    J()
                                }
                                return a
                            },
                            M = function(a, b, c) {
                                var d = N(a, b, c);
                                d === g ? delete a[b] : a[b] = d
                            },
                            N = function(a, b, c) {
                                var d, e = a[b];
                                if ("object" == typeof e && e)
                                    if (h.call(e) == r)
                                        for (d = e.length; d--;) M(e, d, c);
                                    else f(e, function(a) {
                                        M(e, a, c)
                                    });
                                return c.call(a, b, e)
                            };
                        k.parse = function(a, b) {
                            var c, d;
                            return F = 0, G = "" + a, c = L(K()), "$" != K() && J(), F = G = null, b && h.call(b) == n ? N((d = {}, d[""] = c, d), "", b) : c
                        }
                    }
                }
                i && a(function() {
                    return k
                })
            }(this)
        }, {}],
        50: [function(a, b) {
            function c(a, b) {
                var c = [];
                b = b || 0;
                for (var d = b || 0; d < a.length; d++) c[d - b] = a[d];
                return c
            }
            b.exports = c
        }, {}]
    }, {}, [1])(1)
});
