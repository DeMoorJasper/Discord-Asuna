const PermissionsHandler = require("../Permissions/PermissionsHandler").PermissionsHandler;

const streamOptions = { seek: 0, volume: 1 };

let joinChannel = (channel, callback) => {
    let canConnect = PermissionsHandler.hasPermission(channel, client.user, PermissionsHandler.permissionFlags.Voice.connect);
    if (canConnect) {
        channel.join().then(connection => {
            connection.on("error", (e) => {
                console.log(e);
            });
            connection.on("failed", (e) => {
                console.log(e);
            })
            callback(connection);
        }).catch((e) => {
            console.log(e);
            callback(null);
        });
    } else {
        callback(null);
    }
};

let streamAudio = (channel, stream, callback, ended) => {
    let canStream = PermissionsHandler.hasPermission(channel, client.user, PermissionsHandler.permissionFlags.Voice.speak);
    if (canStream) {
        joinChannel(channel, (connection) => {
            if (connection != null) {
                let dispatcher = connection.playStream(stream, streamOptions);
                dispatcher.once('end', () => {
                    dispatcher.stream = undefined;
                    ended();
                });
                callback(dispatcher);
                return;
            }
            callback(null);
        });
    } else {
        callback(null);
    }
};

let getVoiceChannel = (channelid) => {
    let channel = client.channels.find("id", channelid);
    if (channel && channel.type === "voice") {
        return channel;
    }
    return undefined;
}

let VoiceHandler = {
    streamAudio: streamAudio,
    joinChannel: joinChannel,
    getVoiceChannel: getVoiceChannel
};

exports.VoiceHandler = VoiceHandler;