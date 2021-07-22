const { MessageEmbed } = require("discord.js");
const { pray } = require("../../services/mongoService");

module.exports = async function prayer(msg) {
    let results = await pray(msg.author);
    if (results.success) {
        const prayerMessage = new MessageEmbed();
        msg.channel.send('Praise Craig! Praise Bryan!');
        prayerMessage.setTitle(':pray: Prayer Successful :pray:');
        let message = `You are now devotion level ${results.userPrayObj.prayers} \n`;
        if (results.rankUpgrade) {
            message += `*notices your rank* OwO wHat's THIS???? You got a new rank UwU ! \n`;
            message += `Your rank is now ${results.userPrayObj.rank}\n`;
            message += `uwu owo uwu`;
        } else {
            message += `Your rank is ${results.userPrayObj.rank}`;
        }
        prayerMessage.setDescription(message);
        msg.channel.send(prayerMessage);
    } else {
        const prayerMessage = new MessageEmbed();
        const now = Date.now();
        prayerMessage.setTitle('Prayer Failed');
        let message = `${msg.author}, you are praying too much. You must wait ${((results.userPrayObj.lastPrayed + 300000) - now) / 1000} seconds before praying again \n`;
        message += `Your devotion level is ${results.userPrayObj.prayers} and your rank is ${results.userPrayObj.rank}`
        prayerMessage.setDescription(message);
        msg.channel.send(prayerMessage);
    }
}