const { MessageEmbed } = require("discord.js");
const { pray, viewChurch } = require("../../services/mongoService");

module.exports = async function church(msg) {
    let results = await viewChurch();
    if (results) {
        const prayerMessage = new MessageEmbed();
        prayerMessage.setTitle(' :church: Church of Degen :church: ');
        let message = `Welcome to the church of degen. \n`;
        message += `:angel: Embrace the degen, and the degen will embrace you :angel:\n`;
        message += `The church of degen is currently ${results.length} members strong`;
        let usersListMessages = [];
        for (let member of results) {
            usersListMessages.push(`${member.rank} <@${member.user}> : LVL ${member.prayers} \n`);
        }
        message += userListMessages.join('');
        prayerMessage.setDescription(message);
        msg.channel.send(prayerMessage);
    } else {
        console.log("error");
    }
}