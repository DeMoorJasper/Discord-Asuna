const PermissionsHandler = require("../Permissions/PermissionsHandler").PermissionsHandler;

const streamOptions = { seek: 0, volume: 1 };

let joinChannel = (channel, callback) => {
    let canConnect = PermissionsHandler.hasPermission(channel, client.user, PermissionsHandler.permissionFlags.Voice.connect);
    if (canConnect) {
        channel.join().then(connection => {
            callback(connection);
        }).catch((e) => {
            console.log(e);
            callback(null);
        });
    } else {
        callback(null);
    }
};

let streamAudio = (channel, stream, callback) => {
    let canStream = PermissionsHandler.hasPermission(channel, client.user, PermissionsHandler.permissionFlags.Voice.speak);
    if (canStream) {
        joinChannel(channel, (connection) => {
            if (connection != null) {
                const dispatcher = connection.playStream(stream, streamOptions);
                callback(dispatcher);
                return;
            }
            callback(null);
        });
    } else {
        callback(null);
    }
};

let VoiceHandler = {
    streamAudio: streamAudio,
    joinChannel: joinChannel
};

exports.VoiceHandler = VoiceHandler;