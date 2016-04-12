var Getopt=require("node-getopt"),spawn=require("child_process").spawn,config=require("./../../etc/woogeen_config");GLOBAL.config=config||{},GLOBAL.config.erizoAgent=GLOBAL.config.erizoAgent||{},GLOBAL.config.erizoAgent.maxProcesses=GLOBAL.config.erizoAgent.maxProcesses||1,GLOBAL.config.erizoAgent.prerunProcesses=GLOBAL.config.erizoAgent.prerunProcesses||1;var getopt=new Getopt([["r","rabbit-host=ARG","RabbitMQ Host"],["g","rabbit-port=ARG","RabbitMQ Port"],["l","logging-config-file=ARG","Logging Config File"],["M","maxProcesses=ARG","Stun Server URL"],["P","prerunProcesses=ARG","Default video Bandwidth"],["h","help","display this help"]]),myId="",myPurpose="general-use",myState=2,opt=getopt.parse(process.argv.slice(2));for(var prop in opt.options)if(opt.options.hasOwnProperty(prop)){var value=opt.options[prop];switch(prop){case"help":getopt.showHelp(),process.exit(0);break;case"rabbit-host":GLOBAL.config.rabbit=GLOBAL.config.rabbit||{},GLOBAL.config.rabbit.host=value;break;case"rabbit-port":GLOBAL.config.rabbit=GLOBAL.config.rabbit||{},GLOBAL.config.rabbit.port=value;break;case"logging-config-file":GLOBAL.config.logger=GLOBAL.config.logger||{},GLOBAL.config.logger.config_file=value;break;case"my-id":myId=value;break;default:GLOBAL.config.erizoAgent[prop]=value}}var logger=require("./../common/logger").logger,rpc=require("./../common/rpc"),log=logger.getLogger("ErizoAgent"),INTERVAL_TIME_KEEPALIVE=GLOBAL.config.erizoAgent.interval_time_keepAlive,BINDED_INTERFACE_NAME=GLOBAL.config.erizoAgent.networkInterface,childs=[],SEARCH_INTERVAL=5e3,idle_erizos=[],erizos=[],processes={},guid=function(){function e(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return function(){return e()+e()+"-"+e()+"-"+e()+"-"+e()+"-"+e()+e()+e()}}(),saveChild=function(e){childs.push(e)},removeChild=function(e){childs.push(e)},launchErizoJS=function(){console.log("Running process");var e=guid(),o=require("fs"),r=o.openSync("../../logs/erizo-"+e+".log","a"),i=o.openSync("../../logs/erizo-"+e+".log","a"),n=spawn("webrtc_mcu",["./../erizoJS/erizoJS.js",e],{detached:!0,stdio:["ignore",r,i]});n.unref(),n.on("close",function(o){var r=idle_erizos.indexOf(e),i=erizos.indexOf(e);r>-1?(idle_erizos.splice(r,1),launchErizoJS()):i>-1&&erizos.splice(i,1),delete processes[e],fillErizos()}),processes[e]=n,idle_erizos.push(e)},dropErizoJS=function(e,o){if(processes.hasOwnProperty(e)){var r=processes[e];r.kill(),delete processes[e];var i=erizos.indexOf(e);-1!==i&&erizos.splice(i,1);var n=idle_erizos.indexOf(e);return-1!==n&&idle_erizos.splice(n,1),o("callback","ok")}o("callback","not found")},fillErizos=function(){for(var e=idle_erizos.length;e<GLOBAL.config.erizoAgent.prerunProcesses;e++)launchErizoJS()},api={createErizoJS:function(e,o){try{var r=idle_erizos.shift();o("callback",r),erizos.length+idle_erizos.length+1>=GLOBAL.config.erizoAgent.maxProcesses?idle_erizos.push(r):erizos.push(r),fillErizos()}catch(i){console.log("Error in ErizoAgent:",i)}},deleteErizoJS:function(e,o){try{dropErizoJS(e,o)}catch(r){log.error("Error stopping ErizoJS")}}},privateIP,addToCloudHandler=function(e){"use strict";var o,r,i,n=require("os").networkInterfaces(),t=[];for(o in n)if(n.hasOwnProperty(o))for(r in n[o])n[o].hasOwnProperty(r)&&(i=n[o][r],"IPv4"!==i.family||i.internal||o!==BINDED_INTERFACE_NAME&&BINDED_INTERFACE_NAME||t.push(i.address));privateIP=t[0];var c=function(o){if(!(0>=o)){var r={ip:privateIP,purpose:myPurpose};rpc.callRpc("nuve","addNewErizoAgent",r,{callback:function(r){if("timeout"===r)return log.info("CloudHandler does not respond"),void setTimeout(function(){o-=1,c(o)},3e3);"error"==r&&log.info("Error in communication with cloudProvider"),privateIP=r.privateIP,myId=r.id,myState=2;var i=setInterval(function(){rpc.callRpc("nuve","keepAlive",myId,{callback:function(e){"whoareyou"===e&&(log.info("I don`t exist in cloudHandler. I`m going to be killed"),clearInterval(i),rpc.callRpc("nuve","killMe",privateIP,{callback:function(){}}))}})},INTERVAL_TIME_KEEPALIVE);e("callback")}})}};c(5)};rpc.connect(function(){"use strict";rpc.setPublicRPC(api),log.info("Adding agent to cloudhandler, purpose:",myPurpose),addToCloudHandler(function(){var e="ErizoAgent_"+myId;rpc.bind(e,function(){log.info("ErizoAgent rpcID:",e)}),fillErizos()})}),["SIGINT","SIGTERM"].map(function(e){process.on(e,function(){log.warn("Exiting on",e),process.exit()})}),process.on("exit",function(){Object.keys(processes).map(function(e){dropErizoJS(e,function(o,r){log.info("Terminate ErizoJS",e,r)})})});