//(function () {
'use strict';
var localStream;

function getParameterByName(name) {
    name = name.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
        results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

var conference = Woogeen.ConferenceClient.create({});

var subscribeMix = getParameterByName('mix') || 'true';

window.onload = function () {
    join('Rank Demo')
}

function createToken(room, userName, role, callback) {
    var req = new XMLHttpRequest();
    var url = '/createToken/';
    var body = {
        room: room,
        username: userName,
        role: role
    };
    req.onreadystatechange = function() {
        if (req.readyState === 4) {
            callback(req.responseText);
        }
    };
    req.open('POST', url, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(body));
}

function createRoom(name, callback) {
    var req = new XMLHttpRequest();
    var url = '/createRoom/';
    var replaced = name.split(' ').join('-');
    var body = {
        name: replaced
    };
    req.onreadystatechange = function() {
        if (req.readyState === 4) {
            callback(req.responseText);
        }
    };
    req.open('POST', url, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(body));
}

function proceed(name) {
    if (name.trim() == '')
        alert('Please provide details');
    else {
        createRoom(name, function(res) {

            var response = JSON.parse(res);
            //              console.log(response._id);
            var roomDetails = {
                'id': response._id
            };
            localStorage.setItem('roomDetails', JSON.stringify(roomDetails));

            var share = document.getElementById('share-url');
            var shareHeading = document.createElement("H4");
            var text = document.createTextNode("Share your Room");
            shareHeading.appendChild(text);
            share.appendChild(shareHeading);

            shareHeading = document.createElement("H4");
            text = document.createTextNode("https://demo.rankconsultancy.in:3004/?room=" + response._id + "#meeting");
            shareHeading.appendChild(text);
            share.appendChild(shareHeading);

            document.getElementById("join-room").style.display = "block";
            document.getElementById("create-room").style.display = "none";
        });
    }
}

function join(name) {
    if (name.trim() == '')
        alert('Please provide details');
    else {
//        var retrievedRoom = localStorage.getItem('roomDetails');
        var roomId = '';
//        if (getParameterByName('room')) {
//            roomId = getParameterByName('room');
//        } else {
//            roomId = JSON.parse(retrievedRoom).id;
//        }
//        console.log('room id: ', roomId);

        createToken(roomId, name, 'presenter', function(response) {
            var token = response;

            conference.join(token, function(resp) {

                
                Woogeen.LocalStream.create({
                    video: {
                        device: 'camera',
                        resolution: 'hd720p'
                    },
                    audio: true
                }, function(err, stream) {
                    if (err) {
                        return L.Logger.error('create LocalStream failed:', err);
                    }
                    localStream = stream;

//                    document.getElementById('conf-page').click();

                    if (window.navigator.appVersion.indexOf('Trident') < 0) {
                        //localStream.show('myVideo');
                    }
                    if (window.navigator.appVersion.indexOf('Trident') > -1) {
                        var canvas = document.createElement('canvas');
                        canvas.width = 320;
                        canvas.height = 240;
                        canvas.setAttribute('autoplay', 'autoplay::autoplay');
                        document.getElementById('myVideo').appendChild(canvas);
                        attachMediaStream(canvas, localStream.mediaStream);
                    }
                    conference.publish(localStream, {
                        maxVideoBW: 300
                    }, function(st) {
                        L.Logger.info('stream published:', st.id());
                    }, function(err) {
                        L.Logger.error('publish failed:', err);
                    });
                });


                var streams = resp.streams;
                streams.map(function(stream) {
                    L.Logger.info('stream in conference:', stream.id());
                    trySubscribeStream(stream);
                });
                var users = resp.users;
                if (users instanceof Array) {
                    users.map(function(u) {
                        L.Logger.info('user in conference:', u);
                    });
                }
            }, function(err) {
                L.Logger.error('server connection failed:', err);
            });
        });




    }
}

function displayStream(stream, resolution) {
    var div = document.createElement('div');
    var streamId = stream.id();
    if (stream instanceof Woogeen.RemoteMixedStream) {
        resolution = resolution || {
            width: 640,
            height: 480
        };
    } else {
        resolution = resolution || {
            width: 320,
            height: 240
        };
    }
    if (!resolution.width || !resolution.height || resolution.width > 640) {
        resolution = {
            width: 640,
            height: 480
        };
    }



    div.setAttribute('style', 'width: ' + ($('#animatedModal').width() - 15) + 'px; height: ' + ($('#animatedModal').height() - 15) + 'px; margin: 0 auto;');
    div.setAttribute('id', 'stream' + streamId);
    div.setAttribute('class', 'remoteStream');

    var remoteVideo = document.getElementById("remoteVideo");
    while (remoteVideo.firstChild) {
        remoteVideo.removeChild(remoteVideo.firstChild);
    }

    remoteVideo.appendChild(div);
    if (window.navigator.appVersion.indexOf('Trident') < 0) {
        stream.show('stream' + streamId);
    } else {
        L.Logger.info('displayStream:', stream.id());
        var canvas = document.createElement('canvas');
        canvas.width = document.width; // resolution.width;
        canvas.height = document.height; //resolution.height;
        canvas.setAttribute('autoplay', 'autoplay::autoplay');
        div.appendChild(canvas);
        var ieStream = new ieMediaStream(stream.mediaStream.label);
        attachRemoteMediaStream(canvas, ieStream, stream.pcid);
    }
}


function trySubscribeStream(stream) {
    if (stream instanceof Woogeen.RemoteMixedStream) {
        stream.on('VideoLayoutChanged', function() {
            L.Logger.info('stream', stream.id(), 'VideoLayoutChanged');
        });

        L.Logger.info('subscribing:', stream.id());
        var resolutions = stream.resolutions();
        var videoOpt = true;
        var resolution;
        if (resolutions.length > 1) {
            resolution = resolutions[Math.floor(Math.random() * 10) % 2];
            videoOpt = {
                resolution: resolution
            };
            L.Logger.info('subscribe stream with option:', resolution);
        }
        conference.subscribe(stream, {
            video: videoOpt
        }, function() {
            L.Logger.info('subscribed:', stream.id());
            displayStream(stream, resolution);
        }, function(err) {
            L.Logger.error(stream.id(), 'subscribe failed:', err);
        });

    } else {
        ['VideoEnabled', 'AudioEnabled', 'VideoDisabled', 'AudioDisabled'].map(function(event_name) {
            stream.on(event_name, function() {
                L.Logger.info('stream', stream.id(), event_name);
            });
        });
        if (subscribeMix !== 'true' || stream.isScreen()) {
            L.Logger.info('subscribing:', stream.id());
            conference.subscribe(stream, function() {
                L.Logger.info('subscribed:', stream.id());
                displayStream(stream);
            }, function(err) {
                L.Logger.error(stream.id(), 'subscribe failed:', err);
            });
        } else {
            L.Logger.info('won`t subscribe', stream.id());
        }
    }
}

conference.onMessage(function(event) {
    L.Logger.info('Message Received:', event.msg);
});

conference.on('server-disconnected', function() {
    L.Logger.info('Server disconnected');
});

conference.on('stream-added', function(event) {
    var stream = event.stream;
    // if(stream.id() !== localStream.id()) return;
    L.Logger.info('stream added:', stream);
    var fromMe = false;
    for (var i in conference.localStreams) {
        if (conference.localStreams.hasOwnProperty(i)) {
            if (conference.localStreams[i].id() === stream.id()) {
                fromMe = true;
                break;
            }
        }
    }
    if (fromMe) {
        L.Logger.info('stream', stream.id(), 'is from me; will not be subscribed.');
        return;
    }
    trySubscribeStream(stream);
});

conference.on('stream-removed', function(event) {
    var stream = event.stream;
    L.Logger.info('stream removed: ', stream.id());
    var id = stream.elementId !== undefined ? stream.elementId : 'test' + stream.id();
    if (id !== undefined) {
        var element = document.getElementById(id);
        if (element) {
            document.body.removeChild(element);
        }
    }
});

conference.on('user-joined', function(event) {
    L.Logger.info('user joined:', event.user);
});

conference.on('user-left', function(event) {
    L.Logger.info('user left:', event.user);
});

//});