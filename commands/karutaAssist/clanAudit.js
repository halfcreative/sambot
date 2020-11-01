const { MessageEmbed } = require("discord.js");
const { getMemberContributions, currentAttackCycle } = require("../../services/mongoService");

module.exports = async function clanAudit(msg) {
    let clanMembers = await getMemberContributions(msg);
    let currentAttackCycleNumber = await currentAttackCycle();
    if (clanMembers) {
        const clanAuditMessage = new MessageEmbed();
        clanAuditMessage.setTitle('Clan Power Contributions');
        let message = `Showing the power contribution for each person during this attack cycle \n`;
        message += `Current Attack Cycle Number : ${currentAttackCycleNumber} \n`;
        let totalPower = 0;
        let userPowerMessages = [];
        for (let member of clanMembers) {
            if (member.attackCycle == currentAttackCycleNumber) {
                totalPower += member.totalAddedPower
                userPowerMessages.push(`<@${member.userId}> : ${member.totalAddedPower} \n`);
            }
        }
        message += `Total Clan Power Collected This Period : ${totalPower} \n`;
        message += userPowerMessages.join('');
        clanAuditMessage.setDescription(message);
        msg.channel.send(clanAuditMessage);
    } else {
        msg.channel.send('no work record');
    }
}