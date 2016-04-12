"use strict";
var config = require("./../../../etc/woogeen_config");
config.nuve = config.nuve || {}, config.nuve.dataBaseURL = config.nuve.dataBaseURL || "localhost/nuvedb", config.nuve.superserviceID = config.nuve.superserviceID || "", config.nuve.testErizoController = config.nuve.testErizoController || "localhost:8080";
var databaseUrl = config.nuve.dataBaseURL,
    collections = ["rooms", "tokens", "services"];
exports.db = require("mongojs")(databaseUrl, collections), exports.superService = config.nuve.superserviceID, exports.nuveKey = require("crypto").randomBytes(64).toString("hex"), exports.testErizoController = config.nuve.testErizoController;