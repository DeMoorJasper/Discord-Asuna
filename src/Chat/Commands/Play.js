const ChatHandler = require("../ChatHandler").ChatHandler;
const Playlist = require("../../Voice/Playlist").Playlist;
let GuildHandler = require("../../Guild/GuildHandler").GuildHandler;

let Play = (msg) => {
    GuildHandler.getGuild(msg.guild.id, (data) => {
        Playlist.play(data);
    });
};

exports.Play = Play;