const Discord = require("discord.js");

let hasPermission = (channel, member, permission) => {
    if (channel && member && permission) {
        if (channel.type === "dm") {
            return true;
        }
        if (channel.type === "text" || channel.type === "voice") {
            if (member.guild === undefined) {
                member = channel.guild.member(member);
            }
            return member.highestRole.hasPermission(permission);
        }
    } else {
        return false;
    }
};

let isAdmin = (channel, member) => {
    return hasPermission(channel, member, permissionFlags.General.administrator);
};

let permissionFlags = {
    Text: {
        add_reactions: "ADD_REACTIONS", // add new reactions to messages
        read_messages: "READ_MESSAGES",
        send_messages: "SEND_MESSAGES",
        send_tts_messages: "SEND_TTS_MESSAGES", // Text To Speech
        manage_messages: "MANAGE_MESSAGES", // delete messages and reactions
        embed_links: "EMBED_LINKS", // links posted will have a preview embedded
        attach_files: "ATTACH_FILES",
        read_history: "READ_MESSAGE_HISTORY", // view messages that were posted prior to opening Discord
        mention_everyone: "MENTION_EVERYONE",
        use_external_emojis: "USE_EXTERNAL_EMOJIS" // use emojis from different guilds
    },
    Voice: {
        connect: "CONNECT", // connect to a voice channel
        speak: "SPEAK", // speak in a voice channel
        mute: "MUTE_MEMBERS", // mute members across all voice channels
        deafen: "DEAFEN_MEMBERS", // deafen members across all voice channels
        move: "MOVE_MEMBERS", // move members between voice channels
        use_vad: "USE_VAD" // use voice activity detection
    },
    General: {
        administrator: "ADMINISTRATOR", // implicitly has all permissions, and bypasses all channel overwrites
        create_invites: "CREATE_INSTANT_INVITE",
        kick: "KICK_MEMBERS",
        ban: "BAN_MEMBERS",
        manage_channels: "MANAGE_CHANNELS", // edit and reorder channels
        manage_guild: "MANAGE_GUILD", // edit the guild information, region, etc.
        view_audit_log: "VIEW_AUDIT_LOG",
        change_nickname: "CHANGE_NICKNAME",
        manage_nicknames: "MANAGE_NICKNAMES", // change other members' nicknames
        manage_roles: "MANAGE_ROLES",
        webhooks: "MANAGE_WEBHOOKS",
        manage_emojis: "MANAGE_EMOJIS"
    }
}

let PermissionsHandler = {
    hasPermission: hasPermission,
    isAdmin: isAdmin,
    permissionFlags: permissionFlags
};

exports.PermissionsHandler = PermissionsHandler;