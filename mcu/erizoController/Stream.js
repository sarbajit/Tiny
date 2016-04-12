exports.Stream = function(t) {
    "use strict";
    var e = {},
        i = "",
        r = "",
        n = [];
    return e.getID = function() {
        return t.id
    }, e.getSocket = function() {
        return t.socket
    }, e.hasAudio = function() {
        return !!t.audio
    }, e.hasVideo = function() {
        return !!t.video
    }, e.hasData = function() {
        return !!t.data
    }, e.hasScreen = function() {
        return !!t.video && "screen" === t.video.device
    }, e.isMixed = function() {
        return !!t.video && "mcu" === t.video.device
    }, e.hasResolution = function(i) {
        if (e.isMixed() && t.video.resolutions instanceof Array && "object" == typeof i && null !== i)
            for (var r in t.video.resolutions)
                if (t.video.resolutions[r].width === i.width && t.video.resolutions[r].height === i.height) return !0;
        return !1
    }, e.getAttributes = function() {
        return t.attributes
    }, e.setAttributes = function(e) {
        t.attributes = e
    }, e.getDataSubscribers = function() {
        return n
    }, e.addDataSubscriber = function(t) {
        -1 === n.indexOf(t) && n.push(t)
    }, e.removeDataSubscriber = function(t) {
        var e = n.indexOf(t); - 1 !== e && n.splice(e, 1)
    }, e.getVideoRecorder = function() {
        return i
    }, e.getAudioRecorder = function() {
        return r
    }, e.setVideoRecorder = function(t) {
        i = t
    }, e.setAudioRecorder = function(t) {
        r = t
    }, e.getPublicStream = function() {
        return {
            id: t.id,
            audio: t.audio,
            video: t.video,
            data: t.data,
            from: t.from,
            attributes: t.attributes
        }
    }, e
};