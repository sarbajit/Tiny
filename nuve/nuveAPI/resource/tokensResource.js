var roomRegistry=require("./../mdb/roomRegistry"),tokenRegistry=require("./../mdb/tokenRegistry"),serviceRegistry=require("./../mdb/serviceRegistry"),dataBase=require("./../mdb/dataBase"),crypto=require("crypto"),cloudHandler=require("../cloudHandler"),logger=require("./../logger").logger,log=logger.getLogger("TokensResource"),currentService,currentRoom,doInit=function(e,r){"use strict";currentService=require("./../auth/nuveAuthenticator").service,serviceRegistry.getRoomForService(e,currentService,function(e){currentRoom=e,r()})},getTokenString=function(e,r){"use strict";var o=e+","+r.host,t=crypto.createHmac("sha256",dataBase.nuveKey).update(o).digest("hex"),n=new Buffer(t).toString("base64"),i={tokenId:e,host:r.host,secure:r.secure,signature:n},s=new Buffer(JSON.stringify(i)).toString("base64");return s},generateToken=function(e){"use strict";var r,o,t,n,i=require("./../auth/nuveAuthenticator").user,s=require("./../auth/nuveAuthenticator").role;if(void 0===i||""===i)return void e(void 0);if(t={},t.userName=i,t.room=currentRoom._id,t.role=s,t.service=currentService._id,t.creationDate=new Date,t.secure=!1,(currentRoom.p2p||"p2p"===currentRoom.mode)&&(t.p2p=!0),r=currentRoom._id,o=void 0,void 0!==currentService.testRoom&&(o=currentService.testRoom._id),o===r){if(void 0!==currentService.testToken)return t=currentService.testToken,log.info("TestToken already exists, sending it",t),n=getTokenString(t._id,t),void e(n);t.use=0,t.host=dataBase.testErizoController,log.info("Creating testToken"),tokenRegistry.addToken(t,function(r){t._id=r,currentService.testToken=t,serviceRegistry.updateService(currentService),n=getTokenString(r,t),e(n)})}else cloudHandler.getErizoControllerForRoom(currentRoom._id,function(r){return"timeout"===r?void e("error"):(t.secure=r.ssl,""!==r.hostname?t.host=r.hostname:t.host=r.ip,t.host+=":"+r.port,void tokenRegistry.addToken(t,function(r){var o=getTokenString(r,t);e(o)}))})};exports.create=function(e,r){"use strict";doInit(e.params.room,function(){return void 0===currentService?(log.info("Service not found"),void r.status(404).send("Service not found")):void 0===currentRoom?(log.info("Room ",e.params.room," does not exist"),void r.status(404).send("Room does not exist")):void generateToken(function(e){return void 0===e?void r.status(401).send("Name and role?"):"error"===e?void r.status(401).send("CloudHandler does not respond"):(log.info("Created token for room ",currentRoom._id,"and service ",currentService._id),void r.send(e))})})};