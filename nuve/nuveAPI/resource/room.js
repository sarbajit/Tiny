"use strict";

function defaultMediaMixing() {
    return {
        video: {
            avCoordinated: 0,
            maxInput: 16,
            resolution: "vga",
            multistreaming: 0,
            bitrate: 0,
            bkColor: "black",
            layout: {
                base: "fluid",
                custom: []
            }
        },
        audio: null
    }
}

function Room(i) {
    this.name = i.name + "", this.pin = i.pin, this.mode = i.mode, this.publishLimit = i.publishLimit, this.userLimit = i.userLimit, this.mediaMixing = i.mediaMixing, this.enableMixing = i.enableMixing
}

function validateRGBValue(i) {
    if (void 0 === i || null === i) i = 0;
    else if ("string" == typeof i) {
        if (i = parseInt(i, 10), isNaN(i) || 0 > i) return -1
    } else if ("number" != typeof i) return -1;
    return i > 255 ? -1 : i
}

function generateLectureTemplates(i) {
    var e = [{
        region: [{
            id: "1",
            left: 0,
            top: 0,
            relativesize: 1,
            priority: 1
        }]
    }, {
        region: [{
            id: "1",
            left: 0,
            top: 0,
            relativesize: .667,
            priority: 1
        }, {
            id: "2",
            left: .667,
            top: 0,
            relativesize: .333,
            priority: 1
        }, {
            id: "3",
            left: .667,
            top: .333,
            relativesize: .333,
            priority: 1
        }, {
            id: "4",
            left: .667,
            top: .667,
            relativesize: .333,
            priority: 1
        }, {
            id: "5",
            left: .333,
            top: .667,
            relativesize: .333,
            priority: 1
        }, {
            id: "6",
            left: 0,
            top: .667,
            relativesize: .333,
            priority: 1
        }]
    }];
    if (i > 6) {
        var t = i / 2;
        t = t > Math.floor(t) ? t + 1 : t, t = t > 7 ? 7 : t;
        for (var o = 4; t >= o; o++) {
            for (var n = 1 * (o - 1) / o, a = 1 / o, r = [{
                    id: "1",
                    left: 0,
                    top: 0,
                    relativesize: n,
                    priority: 1
                }], s = 2, d = 0; o > d; d++) r.push({
                id: "" + s++,
                left: n,
                top: 1 * d / o,
                relativesize: a,
                priority: 1
            });
            for (var l = o - 2; l >= 0; l--) r.push({
                id: "" + s++,
                left: 1 * l / o,
                top: n,
                relativesize: a,
                priority: 1
            });
            e.push({
                region: r
            })
        }
        if (i > 14) {
            var t = (i + 3) / 4;
            t = t > Math.floor(t) ? t + 1 : t, t = t > 7 ? 7 : t;
            for (var o = 4; t >= o; o++) {
                for (var n = 1 * (o - 2) / o, a = 1 / o, r = [{
                        id: "1",
                        left: 0,
                        top: 0,
                        relativesize: n,
                        priority: 1
                    }], s = 2, d = 0; o - 1 > d; d++) r.push({
                    id: "" + s++,
                    left: n,
                    top: 1 * d / o,
                    relativesize: a,
                    priority: 1
                });
                for (var l = o - 3; l >= 0; l--) r.push({
                    id: "" + s++,
                    left: 1 * l / o,
                    top: n,
                    relativesize: a,
                    priority: 1
                });
                for (var d = 0; o > d; d++) r.push({
                    id: "" + s++,
                    left: n + a,
                    top: 1 * d / o,
                    relativesize: a,
                    priority: 1
                });
                for (var l = o - 2; l >= 0; l--) r.push({
                    id: "" + s++,
                    left: 1 * l / o,
                    top: n + a,
                    relativesize: a,
                    priority: 1
                });
                e.push({
                    region: r
                })
            }
        }
    }
    return e
}

function generateFluidTemplates(i) {
    var e = [],
        t = Math.sqrt(i);
    t = t > Math.floor(t) ? Math.floor(t) + 1 : Math.floor(t);
    for (var o = 1; t >= o; o++) {
        for (var n = [], a = 1 / o, r = 1, s = 0; o > s; s++)
            for (var d = 0; o > d; d++) {
                var l = {
                    id: String(r++),
                    left: 1 * d / o,
                    top: 1 * s / o,
                    relativesize: a,
                    priority: 1
                };
                n.push(l)
            }
        e.push({
            region: n
        })
    }
    return e
}

function isTemplatesValid(i) {
    if (!(i instanceof Array)) return !1;
    for (var e in i) {
        var t = i[e].region;
        if (!(t instanceof Array)) return !1;
        for (var o in t)
            if ("number" != typeof t[o].left || t[o].left < 0 || t[o].left > 1 || "number" != typeof t[o].top || t[o].top < 0 || t[o].top > 1 || "number" != typeof t[o].relativesize || t[o].relativesize < 0 || t[o].relativesize > 1) return !1
    }
    return !0
}
var meta = require("../public/meta.json"),
    log = require("./../logger").logger.getLogger("Room");
Room.prototype.validate = function() {
    if (void 0 === this.mode || null === this.mode || "" === this.mode) this.mode = "hybrid";
    else {
        if ("string" != typeof this.mode) return null;
        if (this.mode = this.mode.toLowerCase(), -1 === meta.mode.indexOf(this.mode)) return null
    }
    if (void 0 === this.enableMixing || null === this.enableMixing ? this.enableMixing = 1 : "1" === this.enableMixing || 1 === this.enableMixing || this.enableMixing === !0 ? this.enableMixing = 1 : this.enableMixing = 0, void 0 === this.publishLimit || null === this.publishLimit) this.publishLimit = -1;
    else if ("string" == typeof this.publishLimit) {
        if (this.publishLimit = parseInt(this.publishLimit, 10), isNaN(this.publishLimit) || this.publishLimit < -1) return null
    } else if ("number" != typeof this.publishLimit || this.publishLimit < -1) return null;
    if (void 0 === this.userLimit || null === this.userLimit) this.userLimit = -1;
    else if ("string" == typeof this.userLimit) {
        if (this.userLimit = parseInt(this.userLimit, 10), isNaN(this.userLimit) || this.userLimit < -1) return null
    } else if ("number" != typeof this.userLimit || this.userLimit < -1) return null;
    if ("string" == typeof this.mediaMixing) try {
        this.mediaMixing = JSON.parse(this.mediaMixing)
    } catch (i) {
        return null
    }
    if (void 0 === this.mediaMixing || null === this.mediaMixing) return this.mediaMixing = defaultMediaMixing(), this;
    if ("object" != typeof this.mediaMixing) return null;
    if (void 0 === this.mediaMixing.video || null === this.mediaMixing.video) this.mediaMixing.video = defaultMediaMixing().video;
    else {
        if ("object" != typeof this.mediaMixing.video) return null;
        if ("1" === this.mediaMixing.video.avCoordinated || 1 === this.mediaMixing.video.avCoordinated || this.mediaMixing.video.avCoordinated === !0 ? this.mediaMixing.video.avCoordinated = 1 : this.mediaMixing.video.avCoordinated = 0, "1" === this.mediaMixing.video.multistreaming || 1 === this.mediaMixing.video.multistreaming || this.mediaMixing.video.multistreaming === !0 ? this.mediaMixing.video.multistreaming = 1 : this.mediaMixing.video.multistreaming = 0, void 0 === this.mediaMixing.video.maxInput || null === this.mediaMixing.video.maxInput) this.mediaMixing.video.maxInput = 16;
        else if ("string" == typeof this.mediaMixing.video.maxInput) {
            if (this.mediaMixing.video.maxInput = parseInt(this.mediaMixing.video.maxInput, 10), isNaN(this.mediaMixing.video.maxInput) || this.mediaMixing.video.maxInput <= 0) return null
        } else if ("number" != typeof this.mediaMixing.video.maxInput || this.mediaMixing.video.maxInput <= 0) return null;
        if (void 0 === this.mediaMixing.video.resolution || null === this.mediaMixing.video.resolution || "" === this.mediaMixing.video.resolution) this.mediaMixing.video.resolution = "vga";
        else {
            if ("string" != typeof this.mediaMixing.video.resolution) return null;
            var e = this.mediaMixing.video.resolution.toLowerCase();
            if (-1 === meta.mediaMixing.video.resolution.indexOf(e)) return null;
            this.mediaMixing.video.resolution = e
        }
        if (void 0 === this.mediaMixing.video.bitrate || null === this.mediaMixing.video.bitrate) this.mediaMixing.video.bitrate = 0;
        else if ("string" == typeof this.mediaMixing.video.bitrate) {
            if (this.mediaMixing.video.bitrate = parseInt(this.mediaMixing.video.bitrate, 10), isNaN(this.mediaMixing.video.bitrate) || this.mediaMixing.video.bitrate < 0) return null
        } else if ("number" != typeof this.mediaMixing.video.bitrate || this.mediaMixing.video.bitrate < 0) return null;
        if (void 0 === this.mediaMixing.video.bkColor || null === this.mediaMixing.video.bkColor || "" === this.mediaMixing.video.bkColor) this.mediaMixing.video.bkColor = "black";
        else if ("string" != typeof this.mediaMixing.video.bkColor) {
            if (this.mediaMixing.video.bkColor.r = validateRGBValue(this.mediaMixing.video.bkColor.r), this.mediaMixing.video.bkColor.r < 0) return null;
            if (this.mediaMixing.video.bkColor.g = validateRGBValue(this.mediaMixing.video.bkColor.g), this.mediaMixing.video.bkColor.g < 0) return null;
            if (this.mediaMixing.video.bkColor.b = validateRGBValue(this.mediaMixing.video.bkColor.b), this.mediaMixing.video.bkColor.b < 0) return null
        } else {
            var t = this.mediaMixing.video.bkColor.toLowerCase();
            if (-1 === meta.mediaMixing.video.bkColor.indexOf(t)) return null;
            this.mediaMixing.video.bkColor = t
        }
        if (void 0 === this.mediaMixing.video.layout || null === this.mediaMixing.video.layout) this.mediaMixing.video.layout = defaultMediaMixing().video.layout;
        else {
            if ("object" != typeof this.mediaMixing.video.layout) return null;
            if (void 0 === this.mediaMixing.video.layout.base || null === this.mediaMixing.video.layout.base || "" === this.mediaMixing.video.layout.base) this.mediaMixing.video.layout.base = "fluid";
            else {
                if ("string" != typeof this.mediaMixing.video.layout.base) return null;
                var o = this.mediaMixing.video.layout.base.toLowerCase();
                if (-1 === meta.mediaMixing.video.layout.base.indexOf(o)) return null;
                this.mediaMixing.video.layout.base = o
            }
            if (void 0 === this.mediaMixing.video.layout.custom || null === this.mediaMixing.video.layout.custom || "" === this.mediaMixing.video.layout.custom) this.mediaMixing.video.layout.custom = [];
            else if ("string" == typeof this.mediaMixing.video.layout.custom) try {
                this.mediaMixing.video.layout.custom = JSON.parse(this.mediaMixing.video.layout.custom)
            } catch (i) {
                return null
            }
            if (!isTemplatesValid(this.mediaMixing.video.layout.custom)) return null;
            if ("void" === this.mediaMixing.video.layout.base && 0 === this.mediaMixing.video.layout.custom.length) return null
        }
    }
    return this
}, Room.create = function(i) {
    return new Room(i).validate()
}, Room.createDefault = function(i) {
    return Room.create({
        name: i,
        pin: "",
        mode: "hybrid",
        publishLimit: -1,
        userLimit: -1,
        enableMixing: 1,
        mediaMixing: defaultMediaMixing()
    })
}, Room.prototype.toString = function() {
    return JSON.stringify(this)
}, Room.genConfig = function(i) {
    var e, t = i.mediaMixing.video.layout.base,
        o = i.mediaMixing.video.maxInput || 16;
    e = "fluid" === t ? generateFluidTemplates(o) : "lecture" === t ? generateLectureTemplates(o) : "void" === t ? [] : generateFluidTemplates(o);
    var n = i.mediaMixing.video.layout.custom;
    return isTemplatesValid(n) && (log.info("apply custom layout templates"), n.map(function(i) {
        var t, o = i.region.length;
        for (var n in e)
            if (e.hasOwnProperty(n) && e[n].region.length >= o) {
                t = n;
                break
            }
        void 0 === t ? e.push(i) : e[t].region.length === o ? e.splice(t, 1, i) : e.splice(t, 0, i)
    })), {
        pin: i.pin || "",
        mode: i.mode,
        publishLimit: i.publishLimit,
        userLimit: i.userLimit,
        enableMixing: 1 === i.enableMixing,
        mediaMixing: {
            video: {
                avCoordinated: 1 === i.mediaMixing.video.avCoordinated,
                multistreaming: 1 === i.mediaMixing.video.multistreaming,
                maxInput: o,
                bitrate: i.mediaMixing.video.bitrate || 0,
                resolution: i.mediaMixing.video.resolution || "vga",
                bkColor: i.mediaMixing.video.bkColor || "black",
                layout: e
            },
            audio: null
        }
    }
}, Room.prototype.genConfig = function() {
    return Room.genConfig(this)
}, module.exports = Room;