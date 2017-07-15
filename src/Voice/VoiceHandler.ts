const streamOptions = { seek: 0, volume: 1 };
import { PermissionsHandler } from '../Permissions/PermissionsHandler';

export class VoiceHandler {
    client: any;

    constructor(client) {
        this.client = client;
    }

    joinChannel = (channel, callback) => {
        let canConnect = PermissionsHandler.hasPermission(channel, this.client.user, PermissionsHandler.permissionFlags.Voice.connect);
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
    }

    streamAudio(channel, stream, callback, ended) {
        let canStream = PermissionsHandler.hasPermission(channel, this.client.user, PermissionsHandler.permissionFlags.Voice.speak);
        if (canStream) {
            this.joinChannel(channel, (connection) => {
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
    }

    getVoiceChannel(channelid) {
        let channel = this.client.channels.find("id", channelid);
        if (channel && channel.type === "voice") {
            return channel;
        }
        return undefined;
    }
}