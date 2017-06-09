const ChatHandler = require("../ChatHandler").ChatHandler;
const Playlist = require("../../Voice/Playlist").Playlist;

let Request = (msg) => {
    Playlist.addTrack(msg.guild.id, "https://www.youtube.com/watch?v=hC8CH0Z3L54");
    ChatHandler.sendMessage(msg, "Your track has been requested and added to the playlist.");
};

exports.Request = Request;