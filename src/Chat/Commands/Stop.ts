import { ChatHandler } from '../ChatHandler';
import { Playlist } from '../../Voice/Playlist';
import { GuildHandler } from '../../Guild/GuildHandler';

export class Stop {
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
            if (!data.voiceChannel || !data.logChannel) {
                return this.chatHandler.sendMessage(msg, "Please configure voice channel first!");
            }
            this.playlist.stop(data);
            this.chatHandler.sendMessage(msg, "Song has been stopped.");
        });
    }
}