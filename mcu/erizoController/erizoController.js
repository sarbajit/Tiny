"use strict";

function safeCall() {
    var e = arguments[0];
    if ("function" == typeof e) {
        var o = Array.prototype.slice.call(arguments, 1);
        e.apply(null, o)
    }
}

function calculateResolutions(e, o) {
    var r = VideoResolutionMap[e.toLowerCase()];
    return r ? o ? r.map(function(e) {
        return e
    }) : [r[0]] : []
}
var crypto = require("crypto"),
    rpcPublic = require("./rpc/rpcPublic"),
    ST = require("./Stream"),
    config = require("./../../etc/woogeen_config"),
    Permission = require("./permission"),
    Getopt = require("node-getopt"),
    io;
GLOBAL.config = config || {}, GLOBAL.config.erizoController = GLOBAL.config.erizoController || {}, GLOBAL.config.erizoController.stunServerUrl = GLOBAL.config.erizoController.stunServerUrl, GLOBAL.config.erizoController.defaultVideoBW = GLOBAL.config.erizoController.defaultVideoBW || 300, GLOBAL.config.erizoController.maxVideoBW = GLOBAL.config.erizoController.maxVideoBW || 300, GLOBAL.config.erizoController.publicIP = GLOBAL.config.erizoController.publicIP || "", GLOBAL.config.erizoController.hostname = GLOBAL.config.erizoController.hostname || "", GLOBAL.config.erizoController.port = GLOBAL.config.erizoController.port || 8080, GLOBAL.config.erizoController.ssl = GLOBAL.config.erizoController.ssl || !1, GLOBAL.config.erizoController.turnServer = GLOBAL.config.erizoController.turnServer || void 0, void 0 !== config.erizoController.turnServer && (GLOBAL.config.erizoController.turnServer.url = GLOBAL.config.erizoController.turnServer.url || "", GLOBAL.config.erizoController.turnServer.username = GLOBAL.config.erizoController.turnServer.username || "", GLOBAL.config.erizoController.turnServer.password = GLOBAL.config.erizoController.turnServer.password || ""), GLOBAL.config.erizoController.warning_n_rooms = void 0 !== GLOBAL.config.erizoController.warning_n_rooms ? GLOBAL.config.erizoController.warning_n_rooms : 15, GLOBAL.config.erizoController.limit_n_rooms = void 0 !== GLOBAL.config.erizoController.limit_n_rooms ? GLOBAL.config.erizoController.limit_n_rooms : 20, GLOBAL.config.erizoController.interval_time_keepAlive = GLOBAL.config.erizoController.interval_time_keepAlive || 1e3, GLOBAL.config.erizoController.sendStats = GLOBAL.config.erizoController.sendStats || !1, GLOBAL.config.erizoController.recording_path = GLOBAL.config.erizoController.recording_path || void 0, GLOBAL.config.erizoController.roles = GLOBAL.config.erizoController.roles || {
    presenter: {
        publish: !0,
        subscribe: !0,
        record: !0
    },
    viewer: {
        subscribe: !0
    },
    viewerWithData: {
        subscribe: !0,
        publish: {
            audio: !1,
            video: !1,
            screen: !1,
            data: !0
        }
    }
};
var getopt = new Getopt([
        ["r", "rabbit-host=ARG", "RabbitMQ Host"],
        ["g", "rabbit-port=ARG", "RabbitMQ Port"],
        ["l", "logging-config-file=ARG", "Logging Config File"],
        ["t", "stunServerUrl=ARG", "Stun Server URL"],
        ["b", "defaultVideoBW=ARG", "Default video Bandwidth"],
        ["M", "maxVideoBW=ARG", "Max video bandwidth"],
        ["i", "publicIP=ARG", "Erizo Controller's public IP"],
        ["H", "hostname=ARG", "Erizo Controller's hostname"],
        ["p", "port", "Port where Erizo Controller will listen to new connections."],
        ["S", "ssl", "Erizo Controller's hostname"],
        ["T", "turn-url", "Turn server's URL."],
        ["U", "turn-username", "Turn server's username."],
        ["P", "turn-password", "Turn server's password."],
        ["R", "recording_path", "Recording path."],
        ["h", "help", "display this help"]
    ]),
    opt = getopt.parse(process.argv.slice(2));
for (var prop in opt.options)
    if (opt.options.hasOwnProperty(prop)) {
        var value = opt.options[prop];
        switch (prop) {
            case "help":
                getopt.showHelp(), process.exit(0);
                break;
            case "rabbit-host":
                GLOBAL.config.rabbit = GLOBAL.config.rabbit || {}, GLOBAL.config.rabbit.host = value;
                break;
            case "rabbit-port":
                GLOBAL.config.rabbit = GLOBAL.config.rabbit || {}, GLOBAL.config.rabbit.port = value;
                break;
            case "logging-config-file":
                GLOBAL.config.logger = GLOBAL.config.logger || {}, GLOBAL.config.logger.config_file = value;
                break;
            default:
                GLOBAL.config.erizoController[prop] = value
        }
    }
var logger = require("./../common/logger").logger,
    rpc = require("./../common/rpc"),
    controller = require("./roomController"),
    log = logger.getLogger("ErizoController"),
    nuveKey, WARNING_N_ROOMS = GLOBAL.config.erizoController.warning_n_rooms,
    LIMIT_N_ROOMS = GLOBAL.config.erizoController.limit_n_rooms,
    INTERVAL_TIME_KEEPALIVE = GLOBAL.config.erizoController.interval_time_keepAlive,
    BINDED_INTERFACE_NAME = GLOBAL.config.erizoController.networkInterface,
    myId, rooms = {},
    myState, calculateSignature = function(e) {
        var o = e.tokenId + "," + e.host,
            r = crypto.createHmac("sha256", nuveKey).update(o).digest("hex");
        return new Buffer(r).toString("base64")
    },
    checkSignature = function(e) {
        var o = calculateSignature(e);
        return o !== e.signature ? (log.info("Auth fail. Invalid signature."), !1) : !0
    },
    sendMsgToRoom = function(e, o, r) {
        e.sockets.map(function(i) {
            log.info("Sending message to", i.id, "in room ", e.id), i.emit(o, r)
        })
    },
    eventReportHandlers = {
        updateStream: function(e, o) {
            rooms[e] ? sendMsgToRoom(rooms[e], "onUpdateStream", o) : log.warn("room not found:", e)
        },
        unpublish: function(e, o) {
            var r = rooms[e];
            if (!r) return void log.warn("room not found:", e);
            var i = o.id;
            log.info("Unpublishing stream:", i), r.controller.removePublisher(i), r.sockets.map(function(e) {
                var o = e.streams.indexOf(i); - 1 !== o && e.streams.splice(o, 1)
            }), r.streams[i] && delete r.streams[i], sendMsgToRoom(r, "onRemoveStream", {
                id: i
            })
        }
    },
    formatDate = function(e, o) {
        var r = {
            "M+": e.getMonth() + 1,
            "d+": e.getDate(),
            "h+": e.getHours(),
            "m+": e.getMinutes(),
            "s+": e.getSeconds(),
            "q+": Math.floor((e.getMonth() + 3) / 3),
            "S+": e.getMilliseconds()
        };
        /(y+)/i.test(o) && (o = o.replace(RegExp.$1, (e.getFullYear() + "").substr(4 - RegExp.$1.length)));
        for (var i in r) new RegExp("(" + i + ")").test(o) && (o = o.replace(RegExp.$1, 1 == RegExp.$1.length ? r[i] : ("00" + r[i]).substr(("" + r[i]).length)));
        return o
    },
    privateRegexp, publicIP, addToCloudHandler = function(e) {
        var o, r, i, t = require("os").networkInterfaces(),
            n = [];
        for (o in t)
            if (t.hasOwnProperty(o))
                for (r in t[o]) t[o].hasOwnProperty(r) && (i = t[o][r], "IPv4" !== i.family || i.internal || o !== BINDED_INTERFACE_NAME && BINDED_INTERFACE_NAME || n.push(i.address));
        privateRegexp = new RegExp(n[0], "g"), publicIP = "" === GLOBAL.config.erizoController.publicIP || void 0 === GLOBAL.config.erizoController.publicIP ? n[0] : GLOBAL.config.erizoController.publicIP;
        var s = function(o) {
            if (!(0 >= o)) {
                var r = {
                    cloudProvider: GLOBAL.config.cloudProvider.name,
                    ip: publicIP,
                    hostname: GLOBAL.config.erizoController.hostname,
                    port: GLOBAL.config.erizoController.port,
                    ssl: GLOBAL.config.erizoController.ssl
                };
                rpc.callRpc("nuve", "addNewErizoController", r, {
                    callback: function(r) {
                        if ("timeout" === r) return log.info("CloudHandler does not respond"), void setTimeout(function() {
                            o -= 1, s(o)
                        }, 3e3);
                        "error" == r && log.info("Error in communication with cloudProvider"), publicIP = r.publicIP, myId = r.id, myState = 2;
                        var i, t = r.ssl;
                        if (t === !0) {
                            log.info("SSL enabled!");
                            var n = require("../../common/cipher");
                            n.unlock(n.k, "../../cert/.woogeen.keystore", function(e, o) {
                                if (!e) try {
                                    i = require("https").createServer({
                                        pfx: require("fs").readFileSync(config.erizoController.keystorePath),
                                        passphrase: o.erizoController
                                    }).listen(r.port)
                                } catch (t) {
                                    e = t
                                }
                                return e ? (log.warn("Failed to setup secured server:", e), process.exit()) : void(io = require("socket.io").listen(i))
                            })
                        } else i = require("http").createServer().listen(r.port), io = require("socket.io").listen(i);
                        var a = setInterval(function() {
                            rpc.callRpc("nuve", "keepAlive", myId, {
                                callback: function(e) {
                                    "whoareyou" === e && (log.info("I don`t exist in cloudHandler. I`m going to be killed"), clearInterval(a), rpc.callRpc("nuve", "killMe", publicIP, {
                                        callback: function() {}
                                    }))
                                }
                            })
                        }, INTERVAL_TIME_KEEPALIVE);
                        rpc.callRpc("nuve", "getKey", myId, {
                            callback: function(o) {
                                return "error" === o || "timeout" === o ? (rpc.callRpc("nuve", "killMe", publicIP, {
                                    callback: function() {}
                                }), log.info("Failed to join nuve network."), process.exit()) : (nuveKey = o, void e())
                            }
                        })
                    }
                })
            }
        };
        s(5)
    },
    updateMyState = function() {
        var e, o, r, i = 0;
        for (o in rooms) rooms.hasOwnProperty(o) && (i += 1);
        e = WARNING_N_ROOMS > i ? 2 : i >= LIMIT_N_ROOMS ? 0 : 1, e !== myState && (myState = e, r = {
            id: myId,
            state: myState
        }, rpc.callRpc("nuve", "setInfo", r, {
            callback: function() {}
        }))
    },
    VideoResolutionMap = {
        cif: [{
            width: 352,
            height: 288
        }],
        vga: [{
            width: 640,
            height: 480
        }, {
            width: 320,
            height: 240
        }],
        svga: [{
            width: 800,
            height: 600
        }, {
            width: 320,
            height: 240
        }],
        xga: [{
            width: 1024,
            height: 768
        }, {
            width: 320,
            height: 240
        }],
        hd720p: [{
            width: 1280,
            height: 720
        }, {
            width: 640,
            height: 360
        }],
        sif: [{
            width: 320,
            height: 240
        }],
        hvga: [{
            width: 480,
            height: 320
        }],
        r480x360: [{
            width: 480,
            height: 360
        }, {
            width: 320,
            height: 240
        }],
        qcif: [{
            width: 176,
            height: 144
        }],
        r192x144: [{
            width: 192,
            height: 144
        }],
        hd1080p: [{
            width: 1920,
            height: 1080
        }, {
            width: 1280,
            height: 720
        }, {
            width: 640,
            height: 360
        }],
        uhd_4k: [{
            width: 3840,
            height: 2160
        }, {
            width: 1280,
            height: 720
        }, {
            width: 640,
            height: 360
        }]
    },
    initMixer = function(e, o, r) {
        if (o.enableMixing && void 0 === e.mixer && void 0 === e.initMixerTimer) {
            var i = e.id;
            e.enableMixing = !0;
            var t = calculateResolutions(o.mediaMixing.video.resolution, o.mediaMixing.video.multistreaming);
            r && e.controller.initMixer(i, o.mediaMixing, function(o) {
                if ("success" === o) {
                    var r = new ST.Stream({
                        id: i,
                        socket: "",
                        audio: !0,
                        video: {
                            device: "mcu",
                            resolutions: t
                        },
                        from: "",
                        attributes: null
                    });
                    e.streams[i] = r, e.mixer = i, sendMsgToRoom(e, "onAddStream", r.getPublicStream()), e.config && e.config.publishLimit > 0 && e.config.publishLimit++
                }
            });
            var n = 10;
            e.initMixerTimer = setInterval(function() {
                return void 0 !== e.mixer ? (log.info("Mixer already existed in Room ", e.id), clearInterval(e.initMixerTimer), void(e.initMixerTimer = void 0)) : void e.controller.initMixer(i, o.mediaMixing, function(o) {
                    if ("success" === o) {
                        var r = new ST.Stream({
                            id: i,
                            socket: "",
                            audio: !0,
                            video: {
                                device: "mcu",
                                resolutions: t
                            },
                            from: "",
                            attributes: null
                        });
                        e.streams[i] = r, e.mixer = i, sendMsgToRoom(e, "onAddStream", r.getPublicStream()), clearInterval(e.initMixerTimer), e.initMixerTimer = void 0, e.config && e.config.publishLimit > 0 && e.config.publishLimit++
                    } else 0 === --n && (log.info("Mixer initialization failed in Room ", e.id), clearInterval(e.initMixerTimer), e.initMixerTimer = void 0)
                })
            }, 100)
        }
    },
    listen = function() {
        log.info("server on"), io.sockets.on("connection", function(e) {
            function o(o, r, i) {
                o.sockets.map(function(t) {
                    t.id !== e.id && (log.info("Sending message to", t.id, "in room ", o.id), t.emit(r, i))
                })
            }
            log.info("Socket connect", e.id), e.on("token", function(r, i) {
                log.debug("New token", r);
                var t, n, s, a = [];
                checkSignature(r) ? rpc.callRpc("nuve", "deleteToken", r.tokenId, {
                    callback: function(l) {
                        if ("error" === l) log.info("Token does not exist"), safeCall(i, "error", "Token does not exist"), e.disconnect();
                        else if ("timeout" === l) log.warn("Nuve does not respond"), safeCall(i, "error", "Nuve does not respond"), e.disconnect();
                        else if (r.host === l.host) {
                            if (e.disconnected) return void log.warn("Client already disconnected");
                            t = l;
                            var c = function() {
                                if (e.disconnected) return void log.warn("Client already disconnected");
                                n = {
                                    name: t.userName,
                                    role: t.role,
                                    id: e.id
                                }, e.user = n;
                                var r = GLOBAL.config.erizoController.roles[t.role] || [];
                                e.user.permissions = {};
                                for (var l in r) e.user.permissions[l] = r[l];
                                if (e.room = rooms[t.room], e.streams = [], e.state = "sleeping", log.debug("OK, Valid token"), !t.p2p && GLOBAL.config.erizoController.sendStats) {
                                    var c = new Date;
                                    rpc.callRpc("stats_handler", "event", [{
                                        room: t.room,
                                        user: e.id,
                                        type: "connection",
                                        timestamp: c.getTime()
                                    }])
                                }
                                e.room.sockets.push(e);
                                for (s in e.room.streams) e.room.streams.hasOwnProperty(s) && a.push(e.room.streams[s].getPublicStream());
                                safeCall(i, "success", {
                                    streams: a,
                                    id: e.room.id,
                                    clientId: e.id,
                                    users: e.room.sockets.map(function(e) {
                                        return e.user
                                    }),
                                    p2p: e.room.p2p,
                                    defaultVideoBW: GLOBAL.config.erizoController.defaultVideoBW,
                                    maxVideoBW: GLOBAL.config.erizoController.maxVideoBW,
                                    stunServerUrl: GLOBAL.config.erizoController.stunServerUrl,
                                    turnServer: GLOBAL.config.erizoController.turnServer
                                }), o(e.room, "onUserJoin", {
                                    user: n
                                })
                            };
                            if (void 0 === rooms[t.room]) {
                                if (0 === myState) return rpc.callRpc("nuve", "reschedule", t.room, {
                                    callback: function() {
                                        var o = "Erizo: out of capacity";
                                        log.warn(o), safeCall(i, "error", o), e.disconnect()
                                    }
                                });
                                var m = function(o, r, i) {
                                        var n = {};
                                        n.id = o, n.sockets = [], n.streams = {}, rooms[o] = n, t.p2p ? (log.debug("Token of p2p room"), n.p2p = !0, r()) : rpc.callRpc("nuve", "getRoomConfig", n.id, {
                                            callback: function(t) {
                                                if ("error" === t) log.error("Room does not exist"), delete rooms[o], i();
                                                else if ("timeout" === t) log.error('Nuve does not respond to "getRoomConfig"'), delete rooms[o], i();
                                                else {
                                                    if (n.p2p = !1, n.config = t, 0 === n.config.userLimit) return log.error("Room", o, "disabled"), delete rooms[o], i();
                                                    rpc.callRpc("nuve", "allocErizoAgent", n.id, {
                                                        callback: function(s) {
                                                            "error" === s ? (log.error("Alloc ErizoAgent error."), delete rooms[o], i()) : "timeout" === s ? (log.error("Alloc ErizoAgent timeout."), delete rooms[o], i()) : (n.agent = s.id, n.controller = controller.RoomController({
                                                                rpc: rpc,
                                                                agent_id: s.id,
                                                                id: n.id
                                                            }), n.controller.addEventListener(function(o, r) {
                                                                if ("unpublish" === o) {
                                                                    var i = r;
                                                                    log.info("ErizoJS stopped", i), sendMsgToRoom(n, "onRemoveStream", {
                                                                        id: i
                                                                    }), n.controller.removePublisher(i);
                                                                    var s = e.streams instanceof Array ? e.streams.indexOf(i) : -1; - 1 !== s && e.streams.splice(s, 1), n.streams[i] && delete n.streams[i], void 0 !== n.mixer && n.mixer === i && (n.mixer = void 0, initMixer(n, t, !1))
                                                                }
                                                            }), initMixer(n, t, !0), r())
                                                        }
                                                    })
                                                }
                                            }
                                        })
                                    },
                                    d = function(e, o) {
                                        setTimeout(function() {
                                            e.enableMixing && void 0 === e.mixer && o > 0 ? (1 === o && log.warn("room initialzation is not ready before room connection return."), d(e, o - 1)) : (updateMyState(), c())
                                        }, 100)
                                    };
                                m(t.room, function() {
                                    d(rooms[t.room], 10)
                                }, function() {
                                    log.warn("initRoom failed."), safeCall(i, "error", "initRoom failed."), e.disconnect()
                                })
                            } else {
                                if (rooms[t.room].config && rooms[t.room].config.userLimit > 0 && rooms[t.room].sockets.length >= rooms[t.room].config.userLimit) return safeCall(i, "error", "Room is full"), e.disconnect();
                                c()
                            }
                        } else log.warn("Invalid host"), safeCall(i, "error", "Invalid host"), e.disconnect()
                    }
                }) : (log.warn("Authentication error"), safeCall(i, "error", "Authentication error"), e.disconnect())
            }), e.on("customMessage", function(o, r) {
                switch (o.type) {
                    case "login":
                        break;
                    case "control":
                        if ("object" == typeof o.payload && null !== o.payload) {
                            var i = o.payload.action;
                            if (/^((audio)|(video))-((in)|(out))-((on)|(off))$/.test(i)) {
                                var t = o.payload.streamId + "";
                                return i = e.room.controller[i], void("function" == typeof i ? i(t, e.id, function(e) {
                                    "function" == typeof r && r(e || "success")
                                }) : "function" == typeof r && r("not implemented"))
                            }
                        }
                        "function" == typeof r && r("error");
                        break;
                    case "data":
                        if (void 0 === e.user || !e.user.permissions[Permission.PUBLISH]) return safeCall(r, "error", "unauthorized");
                        if (e.user.permissions[Permission.PUBLISH] !== !0) {
                            var n = e.user.permissions[Permission.PUBLISH];
                            if (n.data === !1) return safeCall(r, "error", "unauthorized")
                        }
                        var s = o.receiver,
                            a = {
                                data: o.data,
                                from: e.id,
                                to: s
                            };
                        if ("all" === s) return sendMsgToRoom(e.room, "onCustomMessage", a), safeCall(r, "success");
                        for (var l in e.room.sockets)
                            if (e.room.sockets[l].id === s) {
                                try {
                                    e.room.sockets[l].emit("onCustomMessage", a), safeCall(r, "success")
                                } catch (c) {
                                    safeCall(r, "error", c)
                                }
                                return
                            }
                        return safeCall(r, "error", "invalid receiver");
                    default:
                        return safeCall(r, "error", "invalid message type")
                }
            }), e.on("updateStreamAttributes", function(o) {
                e.room.streams[o.id].setAttributes(o.attrs), e.room.streams[o.id].getDataSubscribers().map(function(e) {
                    log.info("Sending new attributes to", e, "in stream ", o.id), io.sockets.to(e).emit("onUpdateAttributeStream", o)
                })
            }), e.on("addToMixer", function(o, r) {
                if (void 0 === e.user || !e.user.permissions[Permission.PUBLISH]) return safeCall(r, "error", "unauthorized");
                if (e.room.enableMixing !== !0 || !e.room.mixer) return safeCall(r, "error", "no mix stream found");
                var i = e.room.streams[o];
                return i ? e.room.p2p ? safeCall(r, "error", "p2p room does not support this action") : void e.room.controller.addToMixer(o, e.room.mixer, function(e) {
                    return e ? safeCall(r, "error", e) : void safeCall(r, "success")
                }) : safeCall(r, "error", "stream does not exist")
            }), e.on("removeFromMixer", function(o, r) {
                if (void 0 === e.user || !e.user.permissions[Permission.PUBLISH]) return safeCall(r, "error", "unauthorized");
                if (e.room.enableMixing !== !0 || !e.room.mixer) return safeCall(r, "error", "no mix stream found");
                var i = e.room.streams[o];
                return i ? e.room.p2p ? safeCall(r, "error", "p2p room does not support this action") : void e.room.controller.removeFromMixer(o, e.room.mixer, function(e) {
                    return e ? safeCall(r, "error", e) : void safeCall(r, "success")
                }) : safeCall(r, "error", "stream does not exist")
            }), e.on("publish", function(o, r, i) {
                var t, n;
                if (void 0 === e.user || !e.user.permissions[Permission.PUBLISH]) return safeCall(i, "error", "unauthorized");
                if (e.user.permissions[Permission.PUBLISH] !== !0) {
                    var s = e.user.permissions[Permission.PUBLISH];
                    for (var a in s)
                        if (o[a] === !0 && s[a] === !1) return safeCall(i, "error", "unauthorized")
                }
                if ("url" === o.state || "recording" === o.state) {
                    t = e.id;
                    var l = r;
                    if ("recording" === o.state) {
                        var c = r;
                        l = GLOBAL.config.erizoController.recording_path ? GLOBAL.config.erizoController.recording_path + c + ".mkv" : "/tmp/" + c + ".mkv"
                    }
                    if (!o.audio && !o.video) return safeCall(i, "error", "no media input is specified to publish");
                    e.room.controller.addExternalInput(t, {
                        url: l,
                        audio: o.audio,
                        video: o.video,
                        unmix: o.unmix,
                        transport: o.transport,
                        buffer_size: o.bufferSize
                    }, e.room.mixer, function(e) {
                        "success" !== e && safeCall(i, e)
                    }, function() {
                        var r = e.room.sockets.indexOf(e);
                        return -1 === r ? void e.room.controller.removePublisher(t) : (n = new ST.Stream({
                            id: t,
                            socket: e.id,
                            audio: o.audio,
                            video: o.video,
                            attributes: o.attributes,
                            from: l
                        }), e.streams.push(t), e.room.streams[t] = n, sendMsgToRoom(e.room, "onAddStream", n.getPublicStream()), void safeCall(i, "success", t))
                    })
                } else if ("data" === o.state || e.room.p2p) "p2pSignaling" === o.state ? io.sockets.to(o.subsSocket).emit("onPublishP2P", {
                    sdp: r,
                    streamId: o.streamId
                }, function(e) {
                    safeCall(i, e)
                }) : (t = 1e18 * Math.random(), n = new ST.Stream({
                    id: t,
                    socket: e.id,
                    audio: o.audio,
                    video: o.video,
                    attributes: o.attributes,
                    from: e.id
                }), e.streams.push(t), e.room.streams[t] = n, safeCall(i, void 0, t), sendMsgToRoom(e.room, "onAddStream", n.getPublicStream()));
                else if ("offer" === o.state && "sleeping" === e.state) {
                    t = e.id;
                    var m = e.room.mixer,
                        d = !1,
                        u = o.unmix;
                    if (o.video && "screen" === o.video.device && (d = !0, t = t.slice(0, -8) + "_SCREEN_", u = !0), -1 !== e.streams.indexOf(t)) return safeCall(i, "error", "already published");
                    if (e.room.config && e.room.config.publishLimit >= 0 && e.room.controller.publisherNum() >= e.room.config.publishLimit) return safeCall(i, "error", "max publishers");
                    if (GLOBAL.config.erizoController.sendStats) {
                        var f = new Date;
                        rpc.callRpc("stats_handler", "event", [{
                            room: e.room.id,
                            user: e.id,
                            type: "publish",
                            stream: t,
                            timestamp: f.getTime()
                        }])
                    }
                    e.room.controller.addPublisher(t, r, m, u, function(o) {
                        e.state = "waitingOk", o = o.replace(privateRegexp, publicIP), safeCall(i, o, t)
                    }, function() {
                        var r = e.room.sockets.indexOf(e);
                        return -1 === r ? void e.room.controller.removePublisher(t) : (n = new ST.Stream({
                            id: t,
                            audio: o.audio,
                            video: o.video,
                            attributes: o.attributes,
                            from: e.id
                        }), e.state = "sleeping", e.room.streams[t] = n, void(void 0 !== e.room.streams[t] && sendMsgToRoom(e.room, "onAddStream", e.room.streams[t].getPublicStream())))
                    }), e.streams.push(t)
                } else "ok" === o.state && "waitingOk" === e.state
            }), e.on("subscribe", function(o, r, i) {
                if (void 0 === e.user || !e.user.permissions[Permission.SUBSCRIBE]) return safeCall(i, "error", "unauthorized");
                if (e.user.permissions[Permission.SUBSCRIBE] !== !0) {
                    var t = e.user.permissions[Permission.SUBSCRIBE];
                    for (var n in t)
                        if (o[n] === !0 && t[n] === !1) return safeCall(i, "error", "unauthorized")
                }
                var s = e.room.streams[o.streamId];
                if (void 0 === s) return safeCall(i, "error", "stream does not exist");
                if (s.hasData() && o.data !== !1 && s.addDataSubscriber(e.id), s.hasAudio() || s.hasVideo())
                    if (e.room.p2p) {
                        var a = s.getSocket();
                        io.sockets.to(a).emit("onSubscribeP2P", {
                            streamId: o.streamId,
                            subsSocket: e.id
                        }, function(e) {
                            safeCall(i, e)
                        })
                    } else {
                        if (GLOBAL.config.erizoController.sendStats) {
                            var l = new Date;
                            rpc.callRpc("stats_handler", "event", [{
                                room: e.room.id,
                                user: e.id,
                                type: "subscribe",
                                stream: o.streamId,
                                timestamp: l.getTime()
                            }])
                        }
                        "object" == typeof o.video && null !== o.video && (s.hasResolution(o.video.resolution) || (o.video = !0)), e.room.controller.addSubscriber(e.id, o.streamId, o.audio, o.video, r, function(e, o) {
                            e = e.replace(privateRegexp, publicIP), safeCall(i, e, o)
                        }, function() {
                            log.info("Subscriber added")
                        })
                    }
                else safeCall(i, void 0)
            }), e.on("startRecorder", function(o, r) {
                if ("function" == typeof o ? (r = o, o = {}) : ("object" != typeof o || null === o) && (o = {}), void 0 === e.user || !e.user.permissions[Permission.RECORD]) return safeCall(r, "error", "unauthorized");
                var i = o.videoStreamId || void 0,
                    t = o.audioStreamId || void 0;
                void 0 === i && void 0 === t ? (i = e.room.mixer, t = e.room.mixer) : void 0 === i ? i = t : void 0 === t && (t = i);
                var n = e.room.streams[i],
                    s = e.room.streams[t];
                if (void 0 === n || void 0 === s) return safeCall(r, "error", "Target video or audio record stream does not exist.");
                if (!n.hasVideo()) return safeCall(r, "error", "No video data from the video stream.");
                if (!s.hasAudio()) return safeCall(r, "error", "No audio data from the audio stream.");
                var a = new Date,
                    l = o.recorderId || formatDate(a, "yyyyMMddhhmmssSS"),
                    c = o.path || GLOBAL.config.erizoController.recording_path || "/tmp",
                    m = require("path").join(c, "room" + e.room.id + "_" + l + ".mkv"),
                    d = o.interval && o.interval > 0 ? o.interval : -1,
                    u = n.getVideoRecorder(),
                    f = s.getAudioRecorder();
                return u && u !== l || f && f !== l ? safeCall(r, "error", "Media recording is going on.") : void e.room.controller.removeExternalOutput(l, !1, function(o) {
                    if (o.success) {
                        for (var a in e.room.streams) e.room.streams.hasOwnProperty(a) && (e.room.streams[a].getVideoRecorder() === l + "" && e.room.streams[a].setVideoRecorder(""), e.room.streams[a].getAudioRecorder() === l + "" && e.room.streams[a].setAudioRecorder(""));
                        log.info("Recorder context cleaned: ", o.text), e.room.controller.addExternalOutput(i, t, l, e.room.mixer, m, d, function(e) {
                            e.success ? (n.setVideoRecorder(l), s.setAudioRecorder(l), log.info("Recorder started: ", m), safeCall(r, "success", {
                                recorderId: l,
                                host: publicIP,
                                path: m
                            })) : safeCall(r, "error", "Error in start recording: " + e.text)
                        })
                    } else safeCall(r, "error", "Error during cleaning recording: " + o.text)
                })
            }), e.on("stopRecorder", function(o, r) {
                return "function" == typeof o ? (r = o, o = {}) : ("object" != typeof o || null === o) && (o = {}), void 0 !== e.user && e.user.permissions[Permission.RECORD] ? void(o.recorderId ? e.room.controller.removeExternalOutput(o.recorderId, !0, function(i) {
                    if (i.success) {
                        for (var t in e.room.streams) e.room.streams.hasOwnProperty(t) && (e.room.streams[t].getVideoRecorder() === o.recorderId + "" && e.room.streams[t].setVideoRecorder(""), e.room.streams[t].getAudioRecorder() === o.recorderId + "" && e.room.streams[t].setAudioRecorder(""));
                        log.info("Recorder stopped: ", i.text), safeCall(r, "success", {
                            host: publicIP,
                            recorderId: i.text
                        })
                    } else safeCall(r, "error", "Error in stop recording: " + i.text)
                }) : safeCall(r, "error", "No recorder to stop.")) : safeCall(r, "error", "unauthorized")
            }), e.on("getRegion", function(o, r) {
                "function" == typeof o ? (r = o, o = {}) : ("object" != typeof o || null === o) && (o = {}), o.id && e.room.mixer ? e.room.controller.getRegion(e.room.mixer, o.id, function(e) {
                    e.success ? (log.info("Region for ", o.id, ": ", e.text), safeCall(r, "success", {
                        region: e.text
                    })) : safeCall(r, "error", "Error in getRegion: " + e.text)
                }) : safeCall(r, "error", "Invalid participant id or mixer not available.")
            }), e.on("setRegion", function(o, r) {
                "function" == typeof o ? (r = o, o = {}) : ("object" != typeof o || null === o) && (o = {}), o.id && o.region && e.room.mixer ? e.room.controller.setRegion(e.room.mixer, o.id, o.region, function(e) {
                    return e ? safeCall(r, "error", e) : void safeCall(r, "success")
                }) : safeCall(r, "error", "Invalid participant/region id or mixer not available.")
            }), e.on("setVideoBitrate", function(o, r) {
                "function" == typeof o ? (r = o, o = {}) : ("object" != typeof o || null === o) && (o = {}), o.id && o.bitrate && e.room.mixer ? e.room.controller.setVideoBitrate(e.room.mixer, o.id, o.bitrate, function(e) {
                    return e ? safeCall(r, "error", e) : void safeCall(r, "success")
                }) : safeCall(r, "error", "Invalid participant id/bitrate or mixer not available.")
            }), e.on("unpublish", function(o, r) {
                if (void 0 === e.user || !e.user.permissions[Permission.PUBLISH]) return safeCall(r, "error", "unauthorized");
                var i = e.streams.indexOf(o);
                if (-1 === i) return safeCall(r, "error", "stream does not exist");
                if (sendMsgToRoom(e.room, "onRemoveStream", {
                        id: o
                    }), e.state = "sleeping", !e.room.p2p && (e.room.controller.removePublisher(o), GLOBAL.config.erizoController.sendStats)) {
                    var t = new Date;
                    rpc.callRpc("stats_handler", "event", [{
                        room: e.room.id,
                        user: e.id,
                        type: "unpublish",
                        stream: o,
                        timestamp: t.getTime()
                    }])
                }
                e.streams.splice(i, 1), e.room.streams[o] && delete e.room.streams[o], safeCall(r, "success")
            }), e.on("unsubscribe", function(o, r) {
                if (!e.user.permissions[Permission.SUBSCRIBE]) return safeCall(r, "error", "unauthorized");
                if (void 0 === e.room.streams[o]) return safeCall(r, "error", "stream does not exist");
                if (e.room.streams[o].removeDataSubscriber(e.id), (e.room.streams[o].hasAudio() || e.room.streams[o].hasVideo()) && !e.room.p2p && (e.room.controller.removeSubscriber(e.id, o), GLOBAL.config.erizoController.sendStats)) {
                    var i = new Date;
                    rpc.callRpc("stats_handler", "event", [{
                        room: e.room.id,
                        user: e.id,
                        type: "unsubscribe",
                        stream: o,
                        timestamp: i.getTime()
                    }])
                }
                safeCall(r, "success")
            }), e.on("disconnect", function() {
                var r, i, t;
                log.info("Socket disconnect ", e.id);
                for (r in e.streams) e.streams.hasOwnProperty(r) && sendMsgToRoom(e.room, "onRemoveStream", {
                    id: e.streams[r]
                });
                if (void 0 !== e.room) {
                    for (r in e.room.streams) e.room.streams.hasOwnProperty(r) && e.room.streams[r].removeDataSubscriber(e.id);
                    i = e.room.sockets.indexOf(e), -1 !== i && e.room.sockets.splice(i, 1), e.room.controller && e.room.controller.removeSubscriptions(e.id);
                    for (r in e.streams) e.streams.hasOwnProperty(r) && (t = e.streams[r], e.room.p2p || (e.room.controller.removePublisher(t), GLOBAL.config.erizoController.sendStats && rpc.callRpc("stats_handler", "event", [{
                        room: e.room.id,
                        user: e.id,
                        type: "unpublish",
                        stream: t,
                        timestamp: (new Date).getTime()
                    }])), e.room.streams[t] && delete e.room.streams[t])
                }
                if (void 0 !== e.room && !e.room.p2p && GLOBAL.config.erizoController.sendStats && rpc.callRpc("stats_handler", "event", [{
                        room: e.room.id,
                        user: e.id,
                        type: "disconnection",
                        timestamp: (new Date).getTime()
                    }]), void 0 !== e.room && 0 === e.room.sockets.length) {
                    if (log.info("Empty room ", e.room.id, ". Deleting it"), !e.room.p2p) {
                        if (void 0 !== e.room.initMixerTimer && (clearInterval(e.room.initMixerTimer), e.room.initMixerTimer = void 0), void 0 === e.room.mixer) return;
                        e.room.controller && "function" == typeof e.room.controller.removePublisher && e.room.controller.removePublisher(e.room.mixer), e.room.streams[e.room.mixer] && delete e.room.streams[e.room.mixer], e.room.mixer = void 0
                    }
                    void 0 !== e.room.agent && rpc.callRpc("nuve", "freeErizoAgent", e.room.agent), delete rooms[e.room.id], updateMyState()
                } else void 0 !== e.room && o(e.room, "onUserLeave", {
                    user: e.user
                })
            })
        })
    };
exports.getUsersInRoom = function(e, o) {
        if (void 0 === rooms[e]) return safeCall(o, void 0);
        var r = [];
        rooms[e].sockets.map(function(e) {
            r.push(e.user)
        }), safeCall(o, r)
    }, exports.deleteUser = function(e, o, r) {
        if (void 0 === rooms[o]) return safeCall(r, "Success");
        var i = [];
        return rooms[o].sockets.map(function(o) {
            o.user.name === e && i.push(o)
        }), 0 === i.length ? (log.error("User", e, "does not exist"), safeCall(r, "User does not exist", 404)) : (i.map(function(e) {
            log.info("Deleted user", e.user.name), e.disconnect()
        }), safeCall(r, "Success"))
    }, exports.deleteRoom = function(e, o) {
        log.info("Deleting room ", e);
        var r = rooms[e];
        if (void 0 === r) return safeCall(o, "Success");
        r.sockets.map(function(e) {
            r.controller.removeSubscriptions(e.id)
        });
        var i = r.streams;
        for (var t in i)(i[t].hasAudio() || i[t].hasVideo()) && (r.p2p || r.controller.removePublisher(t));
        void 0 !== r.agent && rpc.callRpc("nuve", "freeErizoAgent", r.agent), delete rooms[e], updateMyState(), log.info("Deleted room ", e, rooms), safeCall(o, "Success")
    }, exports.updateConfig = function(e, o) {
        safeCall(o, "Success")
    }, exports.getConfig = function(e) {
        safeCall(e, {
            defaultVideoBW: GLOBAL.config.erizoController.defaultVideoBW,
            maxVideoBW: GLOBAL.config.erizoController.maxVideoBW,
            turnServer: GLOBAL.config.erizoController.turnServer,
            stunServerUrl: GLOBAL.config.erizoController.stunServerUrl,
            warning_n_rooms: GLOBAL.config.erizoController.warning_n_rooms,
            limit_n_rooms: GLOBAL.config.erizoController.limit_n_rooms
        })
    }, exports.handleEventReport = function(e, o, r) {
        log.debug(e, o, r), "function" == typeof eventReportHandlers[e] && eventReportHandlers[e](o, r)
    }, ["SIGINT", "SIGTERM"].map(function(e) {
        process.on(e, function() {
            log.warn("Exiting on", e), process.exit()
        })
    }),
    function() {
        0 === LIMIT_N_ROOMS ? log.info("Invalid config: limit_n_rooms == 0") : WARNING_N_ROOMS >= LIMIT_N_ROOMS ? log.info("Invalid config: warning_n_rooms >= limit_n_rooms") : rpc.connect(function() {
            try {
                rpc.setPublicRPC(rpcPublic), addToCloudHandler(function() {
                    var e = "erizoController_" + myId;
                    rpc.bind(e, listen), controller.myId = "erizoController_" + myId
                })
            } catch (e) {
                log.info("Error in Erizo Controller:", e)
            }
        })
    }();
