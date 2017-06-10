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
            console.log("playlist is empty.");
            data = [track];
        }
        savePlaylist(guild, data);
        callback(data);
    });
};

let play = (data, callback) => {
    let playlist = data.playlist;
    if (data && data.voiceChannel && playlist && playlist.length > 0) {
        let ytStream = YoutubeHandler.getAudioStream(playlist[0].url);
        let channel = VoiceHandler.getVoiceChannel(data.voiceChannel);
        if (channel) {
            VoiceHandler.joinChannel(channel, (connection) => {
                VoiceHandler.streamAudio(channel, ytStream, () => {
                    callback(`Streaming: ${playlist[0].url}`);
                    // TODO: Remove track from playlist?
                    data.Save();
                });
            });
        }
    }
};

let clearPlaylist = (data) => {

};

let Playlist = {
    addTrack: addTrack,
    getPlaylist: getPlaylist,
    play: play
};

exports.Playlist = Playlist;