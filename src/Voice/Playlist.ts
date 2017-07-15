import { GuildHandler } from '../Guild/GuildHandler';
import { VoiceHandler } from './VoiceHandler';
import { YoutubeHandler } from './YoutubeHandler';

export class Playlist {
    voiceHandler: VoiceHandler;

    constructor(client) {
        this.voiceHandler = new VoiceHandler(client);
    }

    getPlaylist(guild, callback) {
        GuildHandler.getGuild(guild, (data) => {
            if (data.playlist) {
                callback(data.playlist);
                return;
            }
            console.log(data);
            callback(null);
        });
    }

    savePlaylist(guild, playlist) {
        GuildHandler.getGuild(guild, (data) => {
            data.playlist = playlist;
            
            data.Save();
        });
    }

    addTrack(guild, url, callback) {
        let track = {url: url};
        this.getPlaylist(guild, (data) => {
            if (data) {
                data.push(track);
            } else {
                data = [track];
            }
            this.savePlaylist(guild, data);
            callback(data);
        });
    }

    playNext(data, callback) {
        if (data && data.voiceChannel && data.playlist && data.playlist.length > 0) {
            let ytStream = YoutubeHandler.getAudioStream(data.playlist[0].url);
            let channel = this.voiceHandler.getVoiceChannel(data.voiceChannel);
            if (channel) {
                this.voiceHandler.joinChannel(channel, (connection) => {
                    this.voiceHandler.streamAudio(channel, ytStream, () => {
                        callback(`Streaming: ${data.playlist[0].url}`);
                        data.playlist.splice(0, 1);
                        data.Save();
                    }, () => {
                        this.play(data, callback);
                    });
                });
            }
        }
    }

    play(data, callback) {
        if (this.resume(data)) {
            callback("Resumed audio");
            return;
        }
        this.playNext(data, callback);
    }

    skip = (data, callback) => {
        this.playNext(data, callback);
    }

    clearPlaylist(data) {
        if (data) {
            data.playlist = undefined;
            data.Save();
        }
    }

    getDispatcher(data) {
        if (data && data.voiceChannel) {
            let channel = this.voiceHandler.getVoiceChannel(data.voiceChannel);
            if (channel) {
                let connection = channel.connection;
                if (connection) {
                    return connection.dispatcher;
                }
            }
        }
        return null;
    }

    stop(data) {
        let dispatcher = this.getDispatcher(data);
        if (dispatcher) {
            dispatcher.end();
            return "stopped";
        }
        return null;
    }

    pause(data) {
        let dispatcher = this.getDispatcher(data);
        if (dispatcher) {
            dispatcher.pause();
            return "paused";
        }
        return null;
    }

    resume(data) {
        let dispatcher = this.getDispatcher(data);
        if (dispatcher) {
            dispatcher.resume();
            return "resumed";
        }
        return null;
    }
}