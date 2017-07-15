import { ChatHandler } from '../ChatHandler';
import { Playlist } from '../../Voice/Playlist';
import { GuildHandler } from '../../Guild/GuildHandler';

export class Clear {
    client: any;
    chatHandler: ChatHandler;
    playlist: Playlist;

    constructor(client) {
        this.client = client;
        this.chatHandler = new ChatHandler(client);
        this.playlist = new Playlist(client);
    }

    execute(msg) {
        GuildHandler.getGuild(msg.guild.id, (data) => {
            this.playlist.clearPlaylist(data);
            this.chatHandler.sendMessage(msg, "Playlist cleared, use the stop command to stop the current song.");
        });
    }
}