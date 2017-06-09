let GuildHandler = require("../Guild/GuildHandler").GuildHandler;

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

let addTrack = (guild, url) => {
    let track = {url: url};
    getPlaylist(guild, (data) => {
        if (data) {
            data.push(track);
        } else {
            console.log("playlist is empty.");
            data = [track];
        }
        savePlaylist(guild, data);
    });
};

let Playlist = {
    addTrack: addTrack,
    getPlaylist: getPlaylist
};

exports.Playlist = Playlist;