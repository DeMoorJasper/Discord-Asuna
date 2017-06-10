const ChatHandler = require("../ChatHandler").ChatHandler;
const Playlist = require("../../Voice/Playlist").Playlist;
let GuildHandler = require("../../Guild/GuildHandler").GuildHandler;

let Stop = (msg) => {
    GuildHandler.getGuild(msg.guild.id, (data) => {
        Playlist.stop(data);
        ChatHandler.sendMessage(msg, "Song has been stopped.");
    });
};

exports.Stop = Stop;