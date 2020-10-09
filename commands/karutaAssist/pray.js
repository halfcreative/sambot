const { pray } = require("../../services/mongoService");

module.exports = async function prayer(msg) {
    let results = await pray(msg.author);
    if (results.success) {
        msg.channel.send('Praise Craig! Praise Brian!');
        msg.channel.send(`You are now devotion level ${results.userPrayObj.prayers}`);
    } else {
        msg.channel.send(` ${msg.author}, you are praying too much. You must wait ${results.userPrayObj.lastPrayed / 1000} seconds before praying again`);
        msg.channel.send(`Your devotion level is ${results.userPrayObj.prayers}`);
    }
}