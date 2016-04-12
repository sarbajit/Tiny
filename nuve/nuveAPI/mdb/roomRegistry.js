var db = require("./dataBase").db,
    logger = require("./../logger").logger,
    log = logger.getLogger("RoomRegistry"),
    getRoom = exports.getRoom = function(o, r) {
        "use strict";
        db.rooms.findOne({
            _id: db.ObjectId(o)
        }, function(e, t) {
            void 0 === t && log.warn("Room ", o, " not found"), void 0 !== r && r(t)
        })
    },
    hasRoom = exports.hasRoom = function(o, r) {
        "use strict";
        getRoom(o, function(o) {
            r(void 0 === o ? !1 : !0)
        })
    };
exports.addRoom = function(o, r) {
    "use strict";
    db.rooms.save(o, function(o, e) {
        o && log.warn("MongoDB: Error adding room: ", o), r(e)
    })
}, exports.removeRoom = function(o) {
    "use strict";
    hasRoom(o, function(r) {
        r && db.rooms.remove({
            _id: db.ObjectId(o)
        }, function(o, r) {
            o && log.warn("MongoDB: Error romoving room: ", o)
        })
    })
};