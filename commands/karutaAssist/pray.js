const { MessageEmbed } = require("discord.js");
const { pray } = require("../../services/mongoService");

module.exports = async function prayer(msg) {
    let results = await pray(msg.author);
    if (results.success) {
        msg.channel.send('Praise Craig! Praise Brian!');
        const prayerMessage = new MessageEmbed();
        prayerMessage.setTitle('Prayer Successful');
        let message = `You are now devotion level ${results.userPrayObj.prayers} \n`;
        if (results.rankUpgrade) {
            message += `Congats! You've achieved a new rank!`;
            message += `Your rank is now ${results.userPrayObj.rank}`;
        } else {
            message += `Your rank is ${results.userPrayObj.rank}`;
        }
        prayerMessage.setDescription(message);
        msg.channel.send(prayerMessage);
    } else {
        const now = Date.now();
        msg.channel.send(` ${msg.author}, you are praying too much. You must wait ${((results.userPrayObj.lastPrayed + 300000) - now) / 1000} seconds before praying again`);
        msg.channel.send(`Your devotion level is ${results.userPrayObj.prayers} and your rank is ${results.userPrayObj.rank}`);
    }
}