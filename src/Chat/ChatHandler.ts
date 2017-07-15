const prefix = require("../../config").prefix;
import { PermissionsHandler } from '../Permissions/PermissionsHandler';

export class ChatHandler {
    client: any;

    constructor(client) {
        this.client = client;
    }

    checkPersonal(user, callback) {
        let channel = user.dmChannel;
        if (!channel) {
            user.createDM().then((dchannel) => {
                callback(dchannel);
            }).catch((e) => {
                console.log(e);
            });
            return;
        }
        callback(channel);
    }

    sendPersonal(user, content) {
        this.checkPersonal(user, (channel) => {
            channel.send(content);
        });
    }

    sendPersonalEmbed(user, content, embed) {
        this.checkPersonal(user, (channel) => {
            channel.send(content, {
                embed: embed
            }).catch((e) => {
                console.log(e);
            });
        });
    }

    checkPermission(msg, callback) {
        let perm_send = PermissionsHandler.hasPermission(msg.channel, this.client.user, PermissionsHandler.permissionFlags.Text.send_messages);
        
        if (perm_send && (msg.channel.type === "text" || msg.channel.type === "dm")) {
            callback();
        } else {
            let dMsg = `I do not have permission to post a message in channel ${msg.channel.name} in [${msg.guild.name}]`;
            this.sendPersonal(msg.author, dMsg);
        }
    }

    sendReply(msg, content, callback) {
        this.checkPermission(msg, () => {
            msg.channel.send(content, {
                reply: msg.author
            }).catch((e) => {
                console.log(e);
            });
        });
    }

    sendEmbed(msg, content, embed) {
        let perm_embed = PermissionsHandler.hasPermission(msg.channel, this.client.user, PermissionsHandler.permissionFlags.Text.embed_links);
        
        if (!perm_embed) {
            return;
        }

        this.checkPermission(msg, () => {
            msg.channel.send(content, {
                embed: embed
            }).catch((e) => {
                console.log(e);
            });
        });
    }

    sendImage(msg, content, url) {
        let perm_image = PermissionsHandler.hasPermission(msg.channel, this.client.user, PermissionsHandler.permissionFlags.Text.attach_files);

        if (!perm_image) {
            return;
        }

        this.checkPermission(msg, () => {
            msg.channel.send(content, {
                file: url
            }).catch((e) => {
                console.log(e);
            });
        });
    }

    sendMessage(msg, content) {
        this.checkPermission(msg, () => {
            msg.channel.send(content).catch((e) => {
                console.log(e);
            });
        });
    }

    handleMessage(msg) {
        let content = msg.content.trim();

        if (content.length > (1  + prefix.length)) {
            if (content.substring(0, 1) === prefix) {
                content = content.substring(prefix.length);
            } else if (msg.isMentioned(this.client.user)) {
                content = content.replace(/<(.*)>/g, "").trim();
            } else {
                return;
            }

            let TextUtils = require("../Utils/TextUtils").TextUtils;

            let command = content.toLowerCase();

            if (content.indexOf(" ") > 0) {
                command = content.substring(0, content.indexOf(" "));
            }

            command = TextUtils.capitalize(command);

            try {
                const loc = `./Commands/${command}`;
                const commandClass = require(loc);
                const commandInstance = new commandClass(this.client);
                commandInstance.execute(msg);
            } catch(e) {
                const commandClass = require('./Commands/Help');
                const commandInstance = new commandClass(this.client);
                commandInstance.execute(msg);
                console.log(e);
                return;
            }
        }
    }
}