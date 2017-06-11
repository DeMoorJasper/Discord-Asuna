const prefix = require("../../config").prefix;
const PermissionsHandler = require("../Permissions/PermissionsHandler").PermissionsHandler;

let checkPersonal = (user, callback) => {
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
};

let sendPersonal = (user, content) => {
    checkPersonal(user, (channel) => {
        channel.send(content);
    });
};

let sendPersonalEmbed = (user, content, embed) => {
    checkPersonal(user, (channel) => {
        channel.send(content, {
            embed: embed
        }).catch((e) => {
            console.log(e);
        });
    });
};

let checkPermission = (msg, callback) => {
    let perm_send = PermissionsHandler.hasPermission(msg.channel, client.user, PermissionsHandler.permissionFlags.Text.send_messages);
    if (perm_send && (msg.channel.type === "text" || msg.channel.type === "dm")) {
        callback();
    } else {
        let dMsg = `I do not have permission to post a message in channel ${msg.channel.name} in [${msg.guild.name}]`;
        sendPersonal(msg.author, dMsg);
    }
};

let sendReply = (msg, callback) => {
    checkPermission(msg, () => {
        msg.channel.send(content, {
            reply: msg.author
        }).catch((e) => {
            console.log(e);
        });
    });
};

let sendEmbed = (msg, content, embed) => {
    let perm_embed = PermissionsHandler.hasPermission(msg.channel, client.user, PermissionsHandler.permissionFlags.Text.embed_links);
    if (!perm_embed) {
        return;
    }
    checkPermission(msg, () => {
        msg.channel.send(content, {
            embed: embed
        }).catch((e) => {
            console.log(e);
        });
    });
};

let sendImage = (msg, content, url) => {
    let perm_image = PermissionsHandler.hasPermission(msg.channel, client.user, PermissionsHandler.permissionFlags.Text.attach_files);
    if (!perm_image) {
        return;
    }
    checkPermission(msg, () => {
        msg.channel.send(content, {
            file: url
        }).catch((e) => {
            console.log(e);
        });
    });
};

let sendMessage = (msg, content) => {
    checkPermission(msg, () => {
        msg.channel.send(content).catch((e) => {
            console.log(e);
        });
    });
};

let handleMessage = (msg) => {
    let content = msg.content.trim();
    if (content.length > (1  + prefix.length)) {
        if (content.substring(0, 1) === prefix) {
            content = content.substring(prefix.length);
        } else if (msg.isMentioned(client.user)) {
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
            let loc = `./Commands/${command}`;
            let exCommand = require(loc)[command];
            exCommand(msg);
        } catch(e) {
            let exCommand = require("./Commands/Help").Help;
            exCommand(msg);
            console.log(e);
            return;
        }
    }
};

let ChatHandler = {
    handleMessage: handleMessage,
    sendMessage: sendMessage,
    sendPersonal: sendPersonal,
    sendEmbed: sendEmbed,
    sendReply: sendReply,
    sendImage: sendImage,
    sendPersonalEmbed: sendPersonalEmbed
};

exports.ChatHandler = ChatHandler;