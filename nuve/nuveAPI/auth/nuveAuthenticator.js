"use strict";
var superServiceId = require("./../mdb/dataBase").superService,
    serviceRegistry = require("./../mdb/serviceRegistry"),
    mauthParser = require("./mauthParser"),
    cipher = require("../../../common/cipher"),
    logger = require("./../logger").logger,
    log = logger.getLogger("NuveAuthenticator"),
    cache = {},
    checkTimestamp = function(e, t) {
        var r = e._id + "";
        if (r === superServiceId) return !0;
        var i, n, a = cache[r],
            s = new Date().getTime(),
            o = t.cnonce;
        return isNaN(s) ? (log.debug("Invalid timestamp:", t.timestamp), !1) : void 0 === a ? !0 : (i = new Date().getTime(), n = a.cnonce, i > s || i === s && n === o ? (log.info("Last timestamp: ", i, " and new: ", s), log.info("Last cnonce: ", n, " and new: ", o), !1) : !0)
    },
    checkSignature = function(e, t) {
        if ("HMAC_SHA256" !== e.signature_method) return !1;
        var r = mauthParser.calculateClientSignature(e, t);
        return r !== e.signature ? !1 : !0
    };
exports.authenticate = function(e, t, r) {
    var i, n = e.header("Authorization"),
        a = 'MAuth realm="http://marte3.dit.upm.es"';
    return void 0 === n ? (log.info("[Auth] MAuth header not presented"), void t.status(401).send({
        "WWW-Authenticate": a
    })) : (i = mauthParser.parseHeader(n), void serviceRegistry.getService(i.serviceid, function(e) {
        if (void 0 === e || null === e) return log.info("[Auth] Unknow service:", i.serviceid), void t.status(401).send({
            "WWW-Authenticate": a
        });
        var n = e.key;
        return e.encrypted === !0 && (n = cipher.decrypt(cipher.k, n)), checkSignature(i, n) ? (void 0 !== i.username && void 0 !== i.role && (exports.user = new Buffer(i.username, "base64").toString("utf8"), exports.role = i.role), cache[e._id + ""] = i, exports.service = e, r(), void 0) : (log.info("[Auth] Wrong credentials"), void t.status(401).send({
            "WWW-Authenticate": a
        }))
    }))
};