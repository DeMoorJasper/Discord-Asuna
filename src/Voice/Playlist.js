let GuildHandler = require("../Guild/GuildHandler").GuildHandler;
let YoutubeHandler = require("./YoutubeHandler").YoutubeHandler;
let VoiceHandler = require("./VoiceHandler").VoiceHandler;

let getPlaylist = (guild, callback) => {
    GuildHandler.getGuild(guild, (data) => {
        if (data.playlist) {
            callback(data.playlist);
            return;
        }
        console.log(data);
        callback(null);
    });
};

let savePlaylist = (guild, playlist) => {
    GuildHandler.getGuild(guild, (data) => {
        data.playlist = playlist;
        
        data.Save();
    });
};

let addTrack = (guild, url, callback) => {
    let track = {url: url};
    getPlaylist(guild, (data) => {
        if (data) {
            data.push(track);
        } else {
            data = [track];
        }
        savePlaylist(guild, data);
        callback(data);
    });
};

let playNext = (data, callback) => {
    if (data && data.voiceChannel && data.playlist && data.playlist.length > 0) {
        let ytStream = YoutubeHandler.getAudioStream(data.playlist[0].url);
        let channel = VoiceHandler.getVoiceChannel(data.voiceChannel);
        if (channel) {
            VoiceHandler.joinChannel(channel, (connection) => {
                VoiceHandler.streamAudio(channel, ytStream, () => {
                    callback(`Streaming: ${data.playlist[0].url}`);
                    data.playlist.splice(0, 1);
                    data.Save();
                }, () => {
                    play(data, callback);
                });
            });
        }
    }
}

let play = (data, callback) => {
    if (resume(data)) {
        callback("Resumed audio");
        return;
    }
    playNext(data, callback);
};

let skip = (data, callback) => {
    playNext(data, callback);
};

let clearPlaylist = (data) => {
    if (data) {
        data.playlist = undefined;
        data.Save();
    }
};

let getDispatcher = (data) => {
    if (data && data.voiceChannel) {
        let channel = VoiceHandler.getVoiceChannel(data.voiceChannel);
        if (channel) {
            let connection = channel.connection;
            if (connection) {
                return connection.dispatcher;
            }
        }
    }
    return null;
};

let stop = (data) => {
    let dispatcher = getDispatcher(data);
    if (dispatcher) {
        dispatcher.end();
        return "stopped";
    }
    return null;
};

let pause = (data) => {
    let dispatcher = getDispatcher(data);
    if (dispatcher) {
        dispatcher.pause();
        return "paused";
    }
    return null;
};

let resume = (data) => {
    let dispatcher = getDispatcher(data);
    if (dispatcher) {
        dispatcher.resume();
        return "resumed";
    }
    return null;
};

let Playlist = {
    addTrack: addTrack,
    getPlaylist: getPlaylist,
    play: play,
    clearPlaylist: clearPlaylist,
    stop: stop,
    pause: pause,
    resume: resume,
    skip: skip
};

exports.Playlist = Playlist;