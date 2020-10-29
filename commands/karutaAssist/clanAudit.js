const { MessageEmbed } = require("discord.js");
const { getMemberContributions } = require("../../services/mongoService");

module.exports = async function clanAudit(msg) {
    let clanMembers = await getMemberContributions(msg);
    if (clanMembers) {
        console.log(clanMembers);
        const clanAuditMessage = new MessageEmbed();
        clanAuditMessage.setTitle('Clan Power Contributions');
        let message = `Showing the power contribution for each person during this attack cycle \n`;
        let totalPower = 0;
        let userPowerMessages = [];
        for (let member of clanMembers) {
            totalPower += member.totalAddedPower
            userPowerMessages.push(`<@${member.userId}> : ${member.totalAddedPower} \n`);
        }
        message += `Total Clan Power Collected This Period : ${totalPower} \n`;
        message += userPowerMessages.join();
        clanAuditMessage.setDescription(message);
        msg.channel.send(clanAuditMessage);
    } else {
        msg.channel.send('no work record');
    }
}