import { MessageEmbed } from "discord.js";
import { pray, viewChurch } from '../../services/mongoService.js';

module.exports = async function church(msg) {
    let results = await viewChurch();
    if (results) {
        const prayerMessage = new MessageEmbed();
        prayerMessage.setTitle(' :church: Church of Degen :church: ');
        let message = `Welcome to the church of degen. \n`;
        message += `:angel: Embrace the degen, and the degen will embrace you :angel:\n`;
        message += `Our faith is currently ${results.length} members strong\n`;
        let usersListMessages = [];
        for (let member of results) {
            usersListMessages.push(`**${member.rank}** <@${member.user}> : LVL ${member.prayers} \n`);
        }
        message += usersListMessages.join('');
        prayerMessage.setDescription(message);
        msg.channel.send(prayerMessage);
    } else {
        console.log("error");
    }
}