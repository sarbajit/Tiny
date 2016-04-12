"use strict";
var logger = require("./../common/logger").logger,
    erizoController = require("./erizoController"),
    log = logger.getLogger("RoomController");
exports.RoomController = function(e) {
    var o = {},
        i = {},
        r = {},
        n = {},
        t = {},
        l = e.rpc,
        a = e.agent_id,
        c = e.id,
        u = 5e3,
        d = [],
        s = function(e, o) {
            return function(i) {
                i !== !0 && (p("unpublish", o), l.callRpc("ErizoAgent_" + a, "deleteErizoJS", [e], {
                    callback: function() {
                        delete n[o]
                    }
                }))
            }
        },
        f = function() {
            for (var e in n) {
                var o = n[e];
                l.callRpc(b(e), "keepAlive", [], {
                    callback: s(o, e)
                })
            }
        };
    setInterval(f, u);
    var v = function(e, o, i) {
            return void 0 !== n[e] ? void i() : GLOBAL.config.erizoController.outOfProcessMixer || void 0 === o || void 0 === n[o] ? void l.callRpc("ErizoAgent_" + a, "createErizoJS", [e], {
                callback: function(o) {
                    log.debug("Answer", o), n[e] = o, i(), l.callRpc("ErizoJS_" + o, "setControllerId", [exports.myId, c], {})
                }
            }) : (n[e] = n[o], void i())
        },
        b = function(e) {
            return "ErizoJS_" + n[e]
        },
        p = function(e, o) {
            for (var i in d) d[i](e, o)
        },
        g = function(e) {
            var o = new RegExp(/\\\//g),
                i = e.replace(o, "/");
            return i
        };
    return o.addEventListener = function(e) {
        d.push(e)
    }, o.initMixer = function(e, n, t) {
        log.info("Adding mixer id ", e), v(e, e, function(a) {
            log.info("Erizo created");
            var c = [e, GLOBAL.config.erizoController.outOfProcessMixer, n];
            l.callRpc(b(e), "initMixer", c, {
                callback: t
            }), r[e] = e, i[e] = [], setTimeout(function() {
                o.addRTSPOut(e, function(o) {
                    log.info("rtsp streaming", e, "->", o)
                })
            }, 1)
        })
    }, o.addExternalInput = function(e, o, n, t, a) {
        void 0 === r[e] ? (log.info("Adding external input peer_id ", e, ", mixer id", n), v(e, n, function() {
            var c = {
                    id: n,
                    oop: GLOBAL.config.erizoController.outOfProcessMixer
                },
                u = [e, o, c];
            l.callRpc(b(e), "addExternalInput", u, {
                callback: t,
                onReady: a
            }), r[e] = e, i[e] = []
        })) : log.info("Publisher already set for", e)
    }, o.addExternalOutput = function(e, o, i, n, a, c, u) {
        void 0 !== r[e] && void 0 !== r[o] ? (log.info("Adding ExternalOutput to " + e + " and " + o + " with url: " + a), v(i, n, function() {
            var r = t[i];
            if (r) return u({
                success: !1,
                text: "the external output is busy"
            });
            var n = b(e),
                d = b(o);
            if (n !== d) return u({
                success: !1,
                text: "cannot make external output for video and audio from different erizo nodes"
            });
            var s = [e, o, i, a, c];
            l.callRpc(b(i), "addExternalOutput", s, {
                callback: function(r) {
                    return "success" === r ? (t[i] = {
                        video: e,
                        audio: o
                    }, u({
                        success: !0,
                        text: a
                    })) : void u({
                        success: !1,
                        text: r
                    })
                }
            })
        })) : u({
            success: !1,
            text: "target stream(s) not found"
        })
    }, o.removeExternalOutput = function(e, o, i) {
        void 0 === o && (o = !0);
        var n = t[e],
            a = null,
            c = null;
        if (n && (a = n.video, c = n.audio), !n || !a || !c) return i(o ? {
            success: !1,
            text: "no external output ongoing"
        } : {
            success: !0,
            text: "no external output context needs to be cleaned"
        });
        var u = b(a),
            d = b(c);
        if (u !== d) return i({
            success: !1,
            text: "cannot stop video and audio external output from different erizo nodes"
        });
        if (void 0 !== r[a] && void 0 !== r[c]) {
            log.info("Stopping ExternalOutput: " + e);
            var s = [e, o];
            l.callRpc(b(e), "removeExternalOutput", s, {
                callback: function(o) {
                    return "success" === o ? (delete t[e], i({
                        success: !0,
                        text: e
                    })) : void i({
                        success: !1,
                        text: "stop external output failed"
                    })
                }
            })
        } else i({
            success: !1,
            text: "Not valid external output to stop"
        })
    }, o.addPublisher = function(e, o, n, t, a, c) {
        void 0 === r[e] ? (log.info("Adding publisher peer_id", e), o = g(o), v(e, n, function() {
            log.info("Erizo created");
            var u = {
                    id: n,
                    oop: GLOBAL.config.erizoController.outOfProcessMixer
                },
                d = [e, o, u, t];
            l.callRpc(b(e), "addPublisher", d, {
                callback: a,
                onReady: c
            }), r[e] = e, i[e] = []
        })) : (log.info("Publisher already set for", e), a("error", "publisher already added"))
    }, o.addSubscriber = function(e, o, n, t, a, c, u) {
        if ("string" != typeof a && (a = JSON.stringify(a)), null === a || null === e) return void c("error", "invalid sdp or id");
        if (a = g(a), void 0 !== r[o] && -1 === i[o].indexOf(e) && null !== a.match("OFFER")) {
            log.info("Adding subscriber ", e, " to publisher ", o), void 0 === n && (n = !0), void 0 === t && (t = !0);
            var d = [e, o, n, t, a];
            l.callRpc(b(o), "addSubscriber", d, {
                callback: c,
                onReady: u
            }), i[o].push(e)
        } else log.info("subscriber", e, "already added"), c("error", "subscriber already added")
    }, o.removePublisher = function(e) {
        if (void 0 !== i[e] && void 0 !== r[e]) {
            var o = -1,
                a = -1;
            for (var c in t) t.hasOwnProperty(c) && (t[c].video === e && (o = c), t[c].audio === e && (a = c));
            if (-1 !== o) {
                log.info("Removing external output", o);
                var u = [o, !1];
                l.callRpc(b(o), "removeExternalOutput", u, {
                    callback: function(e) {}
                }), delete t[o]
            }
            if (-1 !== a && a !== o) {
                log.info("Removing external output", a);
                var u = [a, !1];
                l.callRpc(b(a), "removeExternalOutput", u, {
                    callback: function(e) {}
                }), delete t[a]
            }
            var u = [e];
            l.callRpc(b(e), "removePublisher", u, void 0), log.info("Removing subscribers", e), delete i[e], log.info("Removing publisher", e), delete r[e], log.info("Removed all"), delete n[e], log.info("Removing muxer", e, " muxers left ", Object.keys(r).length)
        }
    }, o.removeSubscriber = function(e, o) {
        var r = i[o].indexOf(e);
        if (-1 !== r) {
            log.info("Removing subscriber ", e, "to muxer ", o);
            var n = [e, o];
            l.callRpc(b(o), "removeSubscriber", n, void 0), i[o].splice(r, 1)
        }
    }, o.removeSubscriptions = function(e) {
        var o, r;
        log.info("Removing subscriptions of ", e);
        for (o in i)
            if (i.hasOwnProperty(o) && (r = i[o].indexOf(e), -1 !== r)) {
                log.info("Removing subscriber ", e, "to muxer ", o);
                var n = [e, o];
                l.callRpc(b(o), "removeSubscriber", n, void 0), i[o].splice(r, 1)
            }
    }, o.addToMixer = function(e, o, i) {
        return void 0 === r[e] ? i("error", "stream not published") : void l.callRpc(b(e), "addToMixer", [e, o], {
            callback: i
        })
    }, o.removeFromMixer = function(e, o, i) {
        return void 0 === r[e] ? i("error", "stream not published") : void l.callRpc(b(e), "removeFromMixer", [e, o], {
            callback: i
        })
    }, o.publisherNum = function() {
        return Object.keys(r).length
    }, o.getRegion = function(e, o, i) {
        if (void 0 === r[o]) return i({
            success: !1,
            text: "stream not published"
        });
        if (void 0 === r[e]) return i({
            success: !1,
            text: "mixer is not available"
        });
        var n = [e, o];
        l.callRpc(b(e), "getRegion", n, {
            callback: function(e) {
                return e ? i({
                    success: !0,
                    text: e
                }) : void i({
                    success: !1,
                    text: "Cannot find the participant in the mixed video"
                })
            }
        })
    }, o.setRegion = function(e, o, i, n) {
        if (void 0 === r[o]) return n("stream not published");
        if (void 0 === r[e]) return n("mixer is not available");
        var t = [e, o, i];
        l.callRpc(b(e), "setRegion", t, {
            callback: n
        })
    }, o.setVideoBitrate = function(e, o, i, n) {
        if (void 0 === r[o]) return n("stream not published");
        if (void 0 === r[e]) return n("mixer is not available");
        var t = [e, o, i];
        l.callRpc(b(e), "setVideoBitrate", t, {
            callback: n
        })
    }, o.addRTSPOut = function(e, o) {
        if (void 0 !== r[e]) {
            var i = [e, e, "", "", 0];
            l.callRpc(b(e), "addExternalOutput", i, {
                callback: function(e) {
                    o(e)
                }
            })
        } else o("mixer not found")
    }, o["audio-in-on"] = function(e, o, r) {
        var n = i[e].indexOf(o); - 1 !== n ? (log.info("Enabling [audio] subscriber", o, "in", e), l.callRpc(b(e), "subscribeStream", [e, o, !0], {
            callback: r
        })) : r("error")
    }, o["audio-in-off"] = function(e, o, r) {
        var n = i[e].indexOf(o); - 1 !== n ? (log.info("Disabling [audio] subscriber", o, "in", e), l.callRpc(b(e), "unsubscribeStream", [e, o, !0], {
            callback: r
        })) : r("error")
    }, o["video-in-on"] = function(e, o, r) {
        var n = i[e].indexOf(o); - 1 !== n ? (log.info("Enabling [video] subscriber", o, "in", e), l.callRpc(b(e), "subscribeStream", [e, o, !1], {
            callback: r
        })) : r("error")
    }, o["video-in-off"] = function(e, o, r) {
        var n = i[e].indexOf(o); - 1 !== n ? (log.info("Disabling [video] subscriber", o, "in", e), l.callRpc(b(e), "unsubscribeStream", [e, o, !1], {
            callback: r
        })) : r("error")
    }, o["audio-out-on"] = function(e, o, i) {
        void 0 !== r[e] ? (log.info("Enabling [audio] publisher", e), l.callRpc(b(e), "publishStream", [e, !0], {
            callback: function(o) {
                o || erizoController.handleEventReport("updateStream", c, {
                    event: "AudioEnabled",
                    id: e,
                    data: null
                }), i(o)
            }
        })) : i("error")
    }, o["audio-out-off"] = function(e, o, i) {
        void 0 !== r[e] ? (log.info("Disabling [audio] publisher", e), l.callRpc(b(e), "unpublishStream", [e, !0], {
            callback: function(o) {
                o || erizoController.handleEventReport("updateStream", c, {
                    event: "AudioDisabled",
                    id: e,
                    data: null
                }), i(o)
            }
        })) : i("error")
    }, o["video-out-on"] = function(e, o, i) {
        void 0 !== r[e] ? (log.info("Enabling [video] publisher", e), l.callRpc(b(e), "publishStream", [e, !1], {
            callback: function(o) {
                o || erizoController.handleEventReport("updateStream", c, {
                    event: "VideoEnabled",
                    id: e,
                    data: null
                }), i(o)
            }
        })) : i("error")
    }, o["video-out-off"] = function(e, o, i) {
        void 0 !== r[e] ? (log.info("Disabling [video] publisher", e), l.callRpc(b(e), "unpublishStream", [e, !1], {
            callback: function(o) {
                o || erizoController.handleEventReport("updateStream", c, {
                    event: "VideoDisabled",
                    id: e,
                    data: null
                }), i(o)
            }
        })) : i("error")
    }, o
};