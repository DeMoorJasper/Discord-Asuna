const prefix = require("../../config").prefix;

let checkPersonal = (user, callback) => {
    let channel = user.dmChannel;
    if (!channel) {
        user.createDM().then(dchannel => {
            callback(dchannel);
        });
        return;
    }
    callback(channel);
};

let sendPersonal = (user, content) => {
    checkPersonal(user, channel => {
        channel.send(content);
    });
};

let sendPersonalEmbed = (user, content, embed) => {
    checkPersonal(user, channel => {
        channel.send(content, {
            embed: embed
        });
    });
};

let checkPermission = (msg, callback) => {
    let PermissionsHandler = require("../Permissions/PermissionsHandler").PermissionsHandler;
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
        });
    });
};

let sendEmbed = (msg, content, embed) => {
    checkPermission(msg, () => {
        msg.channel.send(content, {
            embed: embed
        });
    });
};

let sendImage = (msg, content, url) => {
    checkPermission(msg, () => {
        msg.channel.send(content, {
            file: url
        });
    });
};

let sendMessage = (msg, content) => {
    checkPermission(msg, () => {
        msg.channel.send(content);
    });
};

let handleMessage = msg => {
    let content = msg.content.trim();
    if (content.length > 1 + prefix.length) {
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
        } catch (e) {
            let exCommand = require("./Commands/Help").Help;
            exCommand(msg);
            //console.log(`[COMMAND] ${command} - ${command.length} not found`);
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