const errors = require("../../utils/errors.js");
module.exports = {
    config: {
        name: "warn",
        aliases: []
    },
    run: async (bot, message, args) => {
        if (message.channel.type == "dm") return;
        if (!message.member.hasPermission("ADMINISTRATOR")) return;
        if (args[0] == "help") return message.channel.send("Usage: $warn <user> <reason>");
        let mutee = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!mutee) return message.channel.send("User not found.");
        if (mutee.id === bot.user.id) return errors.botuser(message, "warn");
        let reason = args.join(" ").slice(22);
        if (!reason) reason = "No reason was given."
        mutee.send(`You were warned in ${message.guild.name} for ${reason}`).catch(() => {

        });
        return message.channel.send(`${mutee} ***has been warned!***`);

    }
}